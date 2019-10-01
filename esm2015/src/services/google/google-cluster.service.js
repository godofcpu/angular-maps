/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Marker } from '../../models/marker';
import { MarkerTypeId } from '../../models/marker-type-id';
import { ClusterClickAction } from '../../models/cluster-click-action';
import { MapService } from '../map.service';
import { GoogleLayerBase } from './google-layer-base';
export class GoogleClusterService extends GoogleLayerBase {
    /**
     * Creates an instance of GoogleClusterService.
     * \@memberof GoogleClusterService
     * @param {?} _mapService
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
        this._layers = new Map();
        this._layerStyles = new Map();
    }
    /**
     * Creates the cluster icon from the styles
     *
     * \@memberof GoogleClusterService
     * @param {?} styles
     * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
     * containing the hydrated cluster icons.
     */
    static CreateClusterIcons(styles) {
        /** @type {?} */
        const i = new Promise((resolve, reject) => {
            /** @type {?} */
            const pa = new Array();
            styles.forEach((style, index) => {
                if (style.iconInfo) {
                    /** @type {?} */
                    const s = Marker.CreateMarker(style.iconInfo);
                    if (typeof (s) === 'string') {
                        style.url = s;
                        if (style.width == null) {
                            style.width = style.iconInfo.size.width;
                            style.height = style.iconInfo.size.height;
                        }
                        if (style.iconInfo.markerOffsetRatio && style.iconInfo.size && style.anchor == null) {
                            /** @type {?} */
                            const o = style.iconInfo;
                            style.anchor = [
                                o.size.width * o.markerOffsetRatio.x,
                                o.size.height * o.markerOffsetRatio.y
                            ];
                        }
                        delete style.iconInfo;
                    }
                    else {
                        s.then(x => {
                            style.url = x.icon;
                            if (style.width == null) {
                                style.width = x.iconInfo.size.width;
                                style.height = x.iconInfo.size.height;
                            }
                            if (x.iconInfo.markerOffsetRatio && x.iconInfo.size && style.anchor == null) {
                                /** @type {?} */
                                const o = x.iconInfo;
                                style.anchor = [
                                    o.size.width * o.markerOffsetRatio.x,
                                    o.size.height * o.markerOffsetRatio.y
                                ];
                            }
                            delete style.iconInfo;
                        });
                        pa.push(s);
                    }
                }
            });
            if (pa.length === 0) {
                resolve(styles);
            }
            else {
                Promise.all(pa).then(() => {
                    resolve(styles);
                });
            }
        });
        return i;
    }
    /**
     * Adds the cluster layer to the map
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    AddLayer(layer) {
        /** @type {?} */
        const options = {
            id: layer.Id,
            visible: layer.Visible,
            clusteringEnabled: layer.ClusteringEnabled,
            zoomOnClick: layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster
        };
        if (layer.GridSize) {
            options.gridSize = layer.GridSize;
        }
        if (layer.MinimumClusterSize) {
            options.minimumClusterSize = layer.MinimumClusterSize;
        }
        if (layer.Styles) {
            options.styles = layer.Styles;
        }
        if (layer.UseDynamicSizeMarkers) {
            options.styles = null;
            // do not to attempt to setup styles here as the dynamic call back will generate them.
        }
        else {
            options.styles = [{
                    height: 30,
                    width: 35,
                    textColor: 'white',
                    textSize: 11,
                    backgroundPosition: 'center',
                    iconInfo: {
                        markerType: MarkerTypeId.FontMarker,
                        fontName: 'FontAwesome',
                        fontSize: 30,
                        color: 'green',
                        text: '\uF111'
                    }
                }];
        }
        /** @type {?} */
        const dynamicClusterCallback = (markers, numStyles, clusterer) => {
            /** @type {?} */
            const styles = this._layerStyles.get(layer.Id);
            /** @type {?} */
            const iconInfo = {
                markerType: MarkerTypeId.None
            };
            /** @type {?} */
            const icon = layer.CustomMarkerCallback(/** @type {?} */ (markers), iconInfo);
            styles[0] = {
                url: `\"data:image/svg+xml;utf8,${icon}\"`,
                height: iconInfo.size.height,
                width: iconInfo.size.width,
                textColor: 'white',
                textSize: 11,
                backgroundPosition: 'center',
            };
            return {
                text: markers.length.toString(),
                index: 1
            };
        };
        /** @type {?} */
        const resetStyles = (clusterer) => {
            if (this._layerStyles.has(layer.Id)) {
                this._layerStyles.get(layer.Id).splice(0);
            }
            else {
                /** @type {?} */
                const styles = new Array();
                styles.push({});
                this._layerStyles.set(layer.Id, styles);
                clusterer.setStyles(styles);
                // this is important for dynamic styles as the pointer to this array gets passed
                // around key objects in the clusterer. Therefore, it must be initialized here in order for
                // updates to the styles to be visible.
                // also, we need to add at least one style to prevent the default styles from being picked up.
            }
        };
        /** @type {?} */
        const layerPromise = this._mapService.CreateClusterLayer(options);
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(l => {
            /** @type {?} */
            const clusterer = /** @type {?} */ (l.NativePrimitve);
            if (options.styles) {
                /** @type {?} */
                const s = GoogleClusterService.CreateClusterIcons(options.styles);
                s.then(x => {
                    clusterer.setStyles(/** @type {?} */ (x));
                });
            }
            else {
                resetStyles(clusterer);
                this._mapService.MapPromise.then((m) => {
                    m.addListener('zoom_changed', () => {
                        resetStyles(clusterer);
                    });
                });
                clusterer.setCalculator((m, n) => {
                    return dynamicClusterCallback(m, n, clusterer);
                });
            }
        });
    }
    /**
     * Create a marker in the cluster
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    CreateMarker(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            return this._mapService.CreateMarker(options)
                .then((marker) => {
                marker.IsFirst = options.isFirst;
                marker.IsLast = options.isLast;
                l.AddEntity(marker);
                return marker;
            });
        });
    }
    /**
     * Starts the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StartClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Stops the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    StopClustering(layer) {
        return Promise.resolve();
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    CreatePolygons(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
}
GoogleClusterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleClusterService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GoogleClusterService.prototype._layers;
    /** @type {?} */
    GoogleClusterService.prototype._layerStyles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUd2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBUXRELE1BQU0sMkJBQTRCLFNBQVEsZUFBZTs7Ozs7OztJQWlGckQsWUFBWSxXQUF1QixFQUFFLEtBQWE7UUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzt1QkE3RW1CLElBQUksR0FBRyxFQUEwQjs0QkFDUixJQUFJLEdBQUcsRUFBOEM7S0E2RTlIOzs7Ozs7Ozs7SUEvRE0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQStCOztRQUM1RCxNQUFNLENBQUMsR0FBcUMsSUFBSSxPQUFPLENBQTBCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUNqRyxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssRUFBc0QsQ0FBQztZQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7b0JBQ2pCLE1BQU0sQ0FBQyxHQUE4RCxNQUFNLENBQUMsWUFBWSxDQUFDLEtB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Ozs7SUFhN0YsY0FBYyxDQUFDLEtBQWEsRUFBRSxPQUErQjtRQUNoRSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYzdGLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBeUI7UUFDMUQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYTlGLGVBQWUsQ0FBQyxLQUFhLEVBQUUsT0FBZ0M7UUFDbEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7OztZQXpSeEcsVUFBVTs7OztZQVJGLFVBQVU7WUFSRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlTGF5ZXJCYXNlIH0gZnJvbSAnLi9nb29nbGUtbGF5ZXItYmFzZSc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVDbHVzdGVyU2VydmljZSBleHRlbmRzIEdvb2dsZUxheWVyQmFzZSBpbXBsZW1lbnRzIENsdXN0ZXJTZXJ2aWNlIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX2xheWVyczogTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+ID0gbmV3IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PigpO1xuICAgIHByb3RlY3RlZCBfbGF5ZXJTdHlsZXM6IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+ID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gU3RhdGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgaWNvbiBmcm9tIHRoZSBzdHlsZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHlsZXNcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIGFuIEFycmF5IG9mIElDbHVzdGVySWNvbkluZm8gb2JqZWN0c1xuICAgICAqIGNvbnRhaW5pbmcgdGhlIGh5ZHJhdGVkIGNsdXN0ZXIgaWNvbnMuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVDbHVzdGVySWNvbnMoc3R5bGVzOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPik6IFByb21pc2U8QXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4+IHtcbiAgICAgICAgY29uc3QgaTogUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGEgPSBuZXcgQXJyYXk8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4+KCk7XG4gICAgICAgICAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmljb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHM6IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9IE1hcmtlci5DcmVhdGVNYXJrZXIoc3R5bGUuaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0gcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS53aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBzdHlsZS5pY29uSW5mby5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9IHN0eWxlLmljb25JbmZvLnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvICYmIHN0eWxlLmljb25JbmZvLnNpemUgJiYgc3R5bGUuYW5jaG9yID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBJTWFya2VySWNvbkluZm8gPSBzdHlsZS5pY29uSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5hbmNob3IgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uc2l6ZS53aWR0aCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRoZW4oeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0geC5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS53aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0geC5pY29uSW5mby5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSB4Lmljb25JbmZvLnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbyAmJiB4Lmljb25JbmZvLnNpemUgJiYgc3R5bGUuYW5jaG9yID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbzogSU1hcmtlckljb25JbmZvID0geC5pY29uSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuYW5jaG9yID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLndpZHRoICogby5tYXJrZXJPZmZzZXRSYXRpby54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhLnB1c2gocyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwYS5sZW5ndGggPT09IDApIHsgcmVzb2x2ZShzdHlsZXMpOyB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwYSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3R5bGVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvcnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlXG4gICAgICogQHBhcmFtIF96b25lXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjbHVzdGVyIGxheWVyIHRvIHRoZSBtYXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiBsYXllci5JZCxcbiAgICAgICAgICAgIHZpc2libGU6IGxheWVyLlZpc2libGUsXG4gICAgICAgICAgICBjbHVzdGVyaW5nRW5hYmxlZDogbGF5ZXIuQ2x1c3RlcmluZ0VuYWJsZWQsXG4gICAgICAgICAgICB6b29tT25DbGljazogbGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyXG4gICAgICAgIH07XG4gICAgICAgIGlmIChsYXllci5HcmlkU2l6ZSkgeyBvcHRpb25zLmdyaWRTaXplID0gbGF5ZXIuR3JpZFNpemU7IH1cbiAgICAgICAgaWYgKGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZSkgeyBvcHRpb25zLm1pbmltdW1DbHVzdGVyU2l6ZSA9IGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZTsgfVxuICAgICAgICBpZiAobGF5ZXIuU3R5bGVzKSB7IG9wdGlvbnMuc3R5bGVzID0gbGF5ZXIuU3R5bGVzOyB9XG4gICAgICAgIGlmIChsYXllci5Vc2VEeW5hbWljU2l6ZU1hcmtlcnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGVzID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0byBhdHRlbXB0IHRvIHNldHVwIHN0eWxlcyBoZXJlIGFzIHRoZSBkeW5hbWljIGNhbGwgYmFjayB3aWxsIGdlbmVyYXRlIHRoZW0uXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlcyA9IFt7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMzUsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHRleHRTaXplOiAxMSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGljb25JbmZvOiB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclR5cGU6IE1hcmtlclR5cGVJZC5Gb250TWFya2VyLFxuICAgICAgICAgICAgICAgICAgICBmb250TmFtZTogJ0ZvbnRBd2Vzb21lJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1xcdUYxMTEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZHluYW1pY0NsdXN0ZXJDYWxsYmFjayA9IChtYXJrZXJzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcixcbiAgICAgICAgICAgIGNsdXN0ZXJlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyKSA9PiB7XG4gICAgICAgICAgICAvLyBkeW5hbWljYWxseSBlbnN1cmUgdGhhdCB0aGUgbmVjZXNzYXJ5IHN0eWxlIGZvciB0aGlzIGNsdXN0ZXIgaWNvbiBleGlzdHMgYW5kXG4gICAgICAgICAgICAvLyB0aGUgY2x1c3RlcmVyIGlzIGFscmVhZHkgaG9va2VkIHVwIHRvIHRoZSBzdHlsZXMgYXJyYXkgdmlhIHBvaW50ZXIsIHNvIHdlIG9ubHlcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBzdHlsZS4gU2luY2UgdGhlIGNsdXN0ZXJlciByZS1yZW5kZXJzIGEgY2x1c3RlciBpY29uIGlzIHRoZVxuICAgICAgICAgICAgLy8gdGhlIG1hcmtlciBjb3VudCBjaGFuZ2VzLCB3ZSB3aWxsIG9ubHkgbmVlZCB0byByZXRhaW4gdGhlIGN1cnJlbnQgaWNvbiBhcyBvcHBvc2VkXG4gICAgICAgICAgICAvLyB0byBhbGwgY2x1c3RlciBpY29uLlxuICAgICAgICAgICAgY29uc3Qgc3R5bGVzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+ID0gdGhpcy5fbGF5ZXJTdHlsZXMuZ2V0KGxheWVyLklkKTtcbiAgICAgICAgICAgIGNvbnN0IGljb25JbmZvOiBJTWFya2VySWNvbkluZm8gPSB7XG4gICAgICAgICAgICAgICAgbWFya2VyVHlwZTogTWFya2VyVHlwZUlkLk5vbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBpY29uOiBzdHJpbmcgPSBsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjayg8YW55Pm1hcmtlcnMsIGljb25JbmZvKTtcbiAgICAgICAgICAgIHN0eWxlc1swXSA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IGBcXFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJHtpY29ufVxcXCJgLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaWNvbkluZm8uc2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGljb25JbmZvLnNpemUud2lkdGgsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHRleHRTaXplOiAxMSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dDogbWFya2Vycy5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBpbmRleDogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzZXRTdHlsZXMgPSAoY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXllclN0eWxlcy5oYXMobGF5ZXIuSWQpKSB7IHRoaXMuX2xheWVyU3R5bGVzLmdldChsYXllci5JZCkuc3BsaWNlKDApOyB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXM6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuQ2x1c3RlclN0eWxlPigpO1xuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclN0eWxlcy5zZXQobGF5ZXIuSWQsIHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgY2x1c3RlcmVyLnNldFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCBmb3IgZHluYW1pYyBzdHlsZXMgYXMgdGhlIHBvaW50ZXIgdG8gdGhpcyBhcnJheSBnZXRzIHBhc3NlZFxuICAgICAgICAgICAgICAgICAgICAvLyBhcm91bmQga2V5IG9iamVjdHMgaW4gdGhlIGNsdXN0ZXJlci4gVGhlcmVmb3JlLCBpdCBtdXN0IGJlIGluaXRpYWxpemVkIGhlcmUgaW4gb3JkZXIgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZXMgdG8gdGhlIHN0eWxlcyB0byBiZSB2aXNpYmxlLlxuICAgICAgICAgICAgICAgICAgICAvLyBhbHNvLCB3ZSBuZWVkIHRvIGFkZCBhdCBsZWFzdCBvbmUgc3R5bGUgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBzdHlsZXMgZnJvbSBiZWluZyBwaWNrZWQgdXAuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIuSWQsIGxheWVyUHJvbWlzZSk7XG4gICAgICAgIGxheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIgPSA8R29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyPmwuTmF0aXZlUHJpbWl0dmU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzICA9IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlLkNyZWF0ZUNsdXN0ZXJJY29ucyhvcHRpb25zLnN0eWxlcyk7XG4gICAgICAgICAgICAgICAgcy50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyZXIuc2V0U3R5bGVzKDxBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+PngpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZXMoY2x1c3RlcmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoJ3pvb21fY2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGVzKGNsdXN0ZXJlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNsdXN0ZXJlci5zZXRDYWxjdWxhdG9yKChtLCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkeW5hbWljQ2x1c3RlckNhbGxiYWNrKG0sIG4sIGNsdXN0ZXJlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1hcmtlciBpbiB0aGUgY2x1c3RlclxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG5cbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcmtlcihvcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKChtYXJrZXI6IE1hcmtlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG9wdGlvbnMuaXNGaXJzdDtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xuICAgICAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShtYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIGNsdXN0ZXJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdGFydENsdXN0ZXJpbmcobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgdGhlIGNsdXN0ZXJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW5cbiAgICAgKiBhcnJheSBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXG4gICAgICogb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxufVxuIl19