/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Marker } from '../../models/marker';
import { MarkerTypeId } from '../../models/marker-type-id';
import { ClusterClickAction } from '../../models/cluster-click-action';
import { MapService } from '../map.service';
import { BingLayerBase } from './bing-layer-base';
/**
 * Implements the {\@link ClusterService} contract for a  Bing Maps V8 specific implementation.
 *
 * @export
 */
var BingClusterService = /** @class */ (function (_super) {
    tslib_1.__extends(BingClusterService, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingClusterService.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof BingClusterService
     */
    function BingClusterService(_mapService, _zone) {
        return _super.call(this, _mapService, _zone) || this;
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object.
     * Generally, MapLayer will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    BingClusterService.prototype.AddLayer = /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object.
     * Generally, MapLayer will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var options = {
            id: layer.Id,
            visible: layer.Visible,
            clusteringEnabled: layer.ClusteringEnabled,
            placementMode: layer.ClusterPlacementMode
        };
        if (layer.GridSize) {
            options.gridSize = layer.GridSize;
        }
        if (layer.LayerOffset) {
            options.layerOffset = layer.LayerOffset;
        }
        if (layer.ZIndex) {
            options.zIndex = layer.ZIndex;
        }
        if (layer.IconInfo) {
            options.clusteredPinCallback = function (pin) { _this.CreateClusterPushPin(pin, layer); };
        }
        if (layer.CustomMarkerCallback) {
            options.clusteredPinCallback = function (pin) { _this.CreateCustomClusterPushPin(pin, layer); };
        }
        if (layer.SpiderClusterOptions) {
            options.spiderClusterOptions = layer.SpiderClusterOptions;
        }
        /** @type {?} */
        var layerPromise = this._mapService.CreateClusterLayer(options);
        (/** @type {?} */ (this._mapService)).MapPromise.then(function (m) {
            Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) {
                if (layer.ClusteringEnabled && m.getZoom() === 19) {
                    layerPromise.then(function (l) {
                        l.SetOptions({ id: layer.Id, clusteringEnabled: false });
                    });
                }
                if (layer.ClusteringEnabled && m.getZoom() < 19) {
                    layerPromise.then(function (l) {
                        if (!l.GetOptions().clusteringEnabled) {
                            l.SetOptions({ id: layer.Id, clusteringEnabled: true });
                        }
                    });
                }
            });
        });
        this._layers.set(layer.Id, layerPromise);
    };
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    BingClusterService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    function (layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    };
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    BingClusterService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    function (layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    };
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    BingClusterService.prototype.CreatePolyline = /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    BingClusterService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    BingClusterService.prototype.StartClustering = /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.StartClustering();
            });
        });
    };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    BingClusterService.prototype.StopClustering = /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterService
     * @param {?} layer - ClusterLayerDirective component object for which to retrieve the layer.
     *
     * @return {?}
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.StopClustering();
            });
        });
    };
    /**
     * Creates the default cluster pushpin as a callback from BingMaps when clustering occurs. The {\@link ClusterLayerDirective} model
     * can provide an IconInfo property that would govern the apparenace of the pin. This method will assign the same pin to all
     * clusters in the layer.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component representing the layer.
     *
     * @return {?}
     */
    BingClusterService.prototype.CreateClusterPushPin = /**
     * Creates the default cluster pushpin as a callback from BingMaps when clustering occurs. The {\@link ClusterLayerDirective} model
     * can provide an IconInfo property that would govern the apparenace of the pin. This method will assign the same pin to all
     * clusters in the layer.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component representing the layer.
     *
     * @return {?}
     */
    function (cluster, layer) {
        var _this = this;
        this._layers.get(layer.Id).then(function (l) {
            if (layer.IconInfo) {
                /** @type {?} */
                var o_1 = {};
                /** @type {?} */
                var payload_1 = function (ico, info) {
                    o_1.icon = ico;
                    o_1.anchor = new Microsoft.Maps.Point((info.size && info.markerOffsetRatio) ? (info.size.width * info.markerOffsetRatio.x) : 0, (info.size && info.markerOffsetRatio) ? (info.size.height * info.markerOffsetRatio.y) : 0);
                    cluster.setOptions(o_1);
                };
                /** @type {?} */
                var icon = Marker.CreateMarker(layer.IconInfo);
                if (typeof (icon) === 'string') {
                    payload_1(icon, layer.IconInfo);
                }
                else {
                    icon.then(function (x) {
                        payload_1(x.icon, x.iconInfo);
                    });
                }
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                l.InitializeSpiderClusterSupport();
            }
        });
    };
    /**
     * Provides a hook for consumers to provide a custom function to create cluster bins for a cluster. This is particuarily useful
     * in situation where the pin should differ to represent information about the pins in the cluster.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component
     * representing the layer. Set the {\@link ClusterLayerDirective.CustomMarkerCallback}
     * property to define the callback generating the pin.
     *
     * @return {?}
     */
    BingClusterService.prototype.CreateCustomClusterPushPin = /**
     * Provides a hook for consumers to provide a custom function to create cluster bins for a cluster. This is particuarily useful
     * in situation where the pin should differ to represent information about the pins in the cluster.
     *
     * \@memberof BingClusterService
     * @param {?} cluster - The cluster for which to create the pushpin.
     * @param {?} layer - The {\@link ClusterLayerDirective} component
     * representing the layer. Set the {\@link ClusterLayerDirective.CustomMarkerCallback}
     * property to define the callback generating the pin.
     *
     * @return {?}
     */
    function (cluster, layer) {
        var _this = this;
        this._layers.get(layer.Id).then(function (l) {
            /** @type {?} */
            var m = new Array();
            cluster.containedPushpins.forEach(function (p) {
                /** @type {?} */
                var marker = l.GetMarkerFromBingMarker(p);
                if (marker) {
                    m.push(marker);
                }
            });
            /** @type {?} */
            var iconInfo = { markerType: MarkerTypeId.None };
            /** @type {?} */
            var o = {};
            o.icon = layer.CustomMarkerCallback(m, iconInfo);
            if (o.icon !== '') {
                o.anchor = new Microsoft.Maps.Point((iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.width * iconInfo.markerOffsetRatio.x) : 0, (iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.height * iconInfo.markerOffsetRatio.y) : 0);
                if (iconInfo.textOffset) {
                    o.textOffset = new Microsoft.Maps.Point(iconInfo.textOffset.x, iconInfo.textOffset.y);
                }
                cluster.setOptions(o);
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', function (e) { return _this.ZoomIntoCluster(e); });
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', function (e) { return _this.ZoomIntoCluster(e); });
                l.InitializeSpiderClusterSupport();
            }
        });
    };
    /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    BingClusterService.prototype.ZoomIntoCluster = /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var pin = /** @type {?} */ (e.target);
        if (pin && pin.containedPushpins) {
            /** @type {?} */
            var bounds_1 = void 0;
            /** @type {?} */
            var locs_1 = new Array();
            pin.containedPushpins.forEach(function (p) { return locs_1.push(p.getLocation()); });
            bounds_1 = Microsoft.Maps.LocationRect.fromLocations(locs_1);
            // Zoom into the bounding box of the cluster.
            // Add a padding to compensate for the pixel area of the pushpins.
            (/** @type {?} */ (this._mapService)).MapPromise.then(function (m) {
                m.setView({ bounds: bounds_1, padding: 75 });
            });
        }
    };
    BingClusterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingClusterService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingClusterService;
}(BingLayerBase));
export { BingClusterService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTW5ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU03QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztJQVVWLDhDQUFhO0lBRWpELEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7T0FNRztJQUNILDRCQUFZLFdBQXVCLEVBQUUsS0FBYTtlQUM5QyxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDO0tBQzVCOzs7Ozs7Ozs7Ozs7SUFnQk0scUNBQVE7Ozs7Ozs7Ozs7O2NBQUMsS0FBNEI7OztRQUN4QyxJQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDNUMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFDMUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdB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SUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBSSxDQUFDLENBQUM7OztZQUl6RCxtQkFBaUIsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFxQjtnQkFDckUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ047OztnQkFyUlIsVUFBVTs7OztnQkFaRixVQUFVO2dCQWRFLE1BQU07OzZCQUEzQjtFQTJCd0MsYUFBYTtTQUF4QyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XG5pbXBvcnQgeyBCaW5nQ2x1c3RlckxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jbHVzdGVyLWxheWVyJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nTGF5ZXJCYXNlIH0gZnJvbSAnLi9iaW5nLWxheWVyLWJhc2UnO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGNvbnRyYWN0IGZvciBhICBCaW5nIE1hcHMgVjggc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ0NsdXN0ZXJTZXJ2aWNlIGV4dGVuZHMgQmluZ0xheWVyQmFzZSBpbXBsZW1lbnRzIENsdXN0ZXJTZXJ2aWNlIHtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nQ2x1c3RlclNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JldGUge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciBCaW5nIE1hcHMgVjguIEFuIGluc3RhbmNlIG9mIHtAbGluayBCaW5nTWFwU2VydmljZX0uXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihfbWFwU2VydmljZTogTWFwU2VydmljZSwgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcihfbWFwU2VydmljZSwgX3pvbmUpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkTGF5ZXIobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogbGF5ZXIuSWQsXG4gICAgICAgICAgICB2aXNpYmxlOiBsYXllci5WaXNpYmxlLFxuICAgICAgICAgICAgY2x1c3RlcmluZ0VuYWJsZWQ6IGxheWVyLkNsdXN0ZXJpbmdFbmFibGVkLFxuICAgICAgICAgICAgcGxhY2VtZW50TW9kZTogbGF5ZXIuQ2x1c3RlclBsYWNlbWVudE1vZGVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxheWVyLkdyaWRTaXplKSB7IG9wdGlvbnMuZ3JpZFNpemUgPSBsYXllci5HcmlkU2l6ZTsgfVxuICAgICAgICBpZiAobGF5ZXIuTGF5ZXJPZmZzZXQpIHsgb3B0aW9ucy5sYXllck9mZnNldCA9IGxheWVyLkxheWVyT2Zmc2V0OyB9XG4gICAgICAgIGlmIChsYXllci5aSW5kZXgpIHsgb3B0aW9ucy56SW5kZXggPSBsYXllci5aSW5kZXg7IH1cbiAgICAgICAgaWYgKGxheWVyLkljb25JbmZvKSB7XG4gICAgICAgICAgICBvcHRpb25zLmNsdXN0ZXJlZFBpbkNhbGxiYWNrID0gKHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pID0+IHsgdGhpcy5DcmVhdGVDbHVzdGVyUHVzaFBpbihwaW4sIGxheWVyKTsgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIuQ3VzdG9tTWFya2VyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY2x1c3RlcmVkUGluQ2FsbGJhY2sgPSAocGluOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbikgPT4geyB0aGlzLkNyZWF0ZUN1c3RvbUNsdXN0ZXJQdXNoUGluKHBpbiwgbGF5ZXIpOyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5TcGlkZXJDbHVzdGVyT3B0aW9ucykgeyBvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zID0gbGF5ZXIuU3BpZGVyQ2x1c3Rlck9wdGlvbnM7IH1cblxuICAgICAgICBjb25zdCBsYXllclByb21pc2U6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9ucyk7XG4gICAgICAgICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwU2VydmljZSkuTWFwUHJvbWlzZS50aGVuKG0gPT4ge1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgJ3ZpZXdjaGFuZ2VlbmQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyaW5nRW5hYmxlZCAmJiBtLmdldFpvb20oKSA9PT0gMTkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJQcm9taXNlLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGwuU2V0T3B0aW9ucyh7IGlkOiBsYXllci5JZCwgY2x1c3RlcmluZ0VuYWJsZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJpbmdFbmFibGVkICYmIG0uZ2V0Wm9vbSgpIDwgMTkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJQcm9taXNlLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbC5HZXRPcHRpb25zKCkuY2x1c3RlcmluZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLlNldE9wdGlvbnMoeyBpZDogbGF5ZXIuSWQsIGNsdXN0ZXJpbmdFbmFibGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIuSWQsIGxheWVyUHJvbWlzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb24uXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5Z29ucyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xuICAgICAqIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbnMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWdvbiBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW4gYXJyYXlcbiAgICAgKiBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlsaW5lcy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgcG9seWxpbmVzIHRvIGJlIHVzZWQgaW4gYnVsa1xuICAgICAqIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWxpbmVzLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWxpbmVzLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlsaW5lIG1vZGVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVzKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0IG9mIGVudGl0aWVzXG4gICAgICogaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKTtcbiAgICAgICAgaWYgKGwgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsLnRoZW4oKGwxOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGwxLlN0YXJ0Q2x1c3RlcmluZygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gQ2x1c3RlckxheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU3RvcENsdXN0ZXJpbmcobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XG4gICAgICAgIGlmIChsID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsMS5TdG9wQ2x1c3RlcmluZygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGRlZmF1bHQgY2x1c3RlciBwdXNocGluIGFzIGEgY2FsbGJhY2sgZnJvbSBCaW5nTWFwcyB3aGVuIGNsdXN0ZXJpbmcgb2NjdXJzLiBUaGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZX0gbW9kZWxcbiAgICAgKiBjYW4gcHJvdmlkZSBhbiBJY29uSW5mbyBwcm9wZXJ0eSB0aGF0IHdvdWxkIGdvdmVybiB0aGUgYXBwYXJlbmFjZSBvZiB0aGUgcGluLiBUaGlzIG1ldGhvZCB3aWxsIGFzc2lnbiB0aGUgc2FtZSBwaW4gdG8gYWxsXG4gICAgICogY2x1c3RlcnMgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsdXN0ZXIgLSBUaGUgY2x1c3RlciBmb3Igd2hpY2ggdG8gY3JlYXRlIHRoZSBwdXNocGluLlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSB7QGxpbmsgQ2x1c3RlckxheWVyRGlyZWN0aXZlfSBjb21wb25lbnQgcmVwcmVzZW50aW5nIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIENyZWF0ZUNsdXN0ZXJQdXNoUGluKGNsdXN0ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluLCBsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChsYXllci5JY29uSW5mbykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IChpY286IHN0cmluZywgaW5mbzogSU1hcmtlckljb25JbmZvKSA9PiB2b2lkID0gKGljbywgaW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0gaWNvO1xuICAgICAgICAgICAgICAgICAgICAgICAgby5hbmNob3IgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZm8uc2l6ZSAmJiBpbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChpbmZvLnNpemUud2lkdGggKiBpbmZvLm1hcmtlck9mZnNldFJhdGlvLngpIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5mby5zaXplICYmIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGluZm8uc2l6ZS5oZWlnaHQgKiBpbmZvLm1hcmtlck9mZnNldFJhdGlvLnkpIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuc2V0T3B0aW9ucyhvKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb246IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9IE1hcmtlci5DcmVhdGVNYXJrZXIobGF5ZXIuSWNvbkluZm8pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoaWNvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWQoaWNvbiwgbGF5ZXIuSWNvbkluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbi50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCh4Lmljb24sIHguaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoY2x1c3RlciwgJ2NsaWNrJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4gdGhpcy5ab29tSW50b0NsdXN0ZXIoZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlNwaWRlcikge1xuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdkYmxjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcbiAgICAgICAgICAgICAgICBsLkluaXRpYWxpemVTcGlkZXJDbHVzdGVyU3VwcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGhvb2sgZm9yIGNvbnN1bWVycyB0byBwcm92aWRlIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjbHVzdGVyIGJpbnMgZm9yIGEgY2x1c3Rlci4gVGhpcyBpcyBwYXJ0aWN1YXJpbHkgdXNlZnVsXG4gICAgICogaW4gc2l0dWF0aW9uIHdoZXJlIHRoZSBwaW4gc2hvdWxkIGRpZmZlciB0byByZXByZXNlbnQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBpbnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2x1c3RlciAtIFRoZSBjbHVzdGVyIGZvciB3aGljaCB0byBjcmVhdGUgdGhlIHB1c2hwaW4uXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIHtAbGluayBDbHVzdGVyTGF5ZXJEaXJlY3RpdmV9IGNvbXBvbmVudFxuICAgICAqIHJlcHJlc2VudGluZyB0aGUgbGF5ZXIuIFNldCB0aGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5DdXN0b21NYXJrZXJDYWxsYmFja31cbiAgICAgKiBwcm9wZXJ0eSB0byBkZWZpbmUgdGhlIGNhbGxiYWNrIGdlbmVyYXRpbmcgdGhlIHBpbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIENyZWF0ZUN1c3RvbUNsdXN0ZXJQdXNoUGluKGNsdXN0ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluLCBsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpLnRoZW4oKGw6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIC8vIGFzc2VtYmxlIG1hcmtlcnMgZm9yIGNhbGxiYWNrXG4gICAgICAgICAgICBjb25zdCBtOiBBcnJheTxNYXJrZXI+ID0gbmV3IEFycmF5PE1hcmtlcj4oKTtcbiAgICAgICAgICAgIGNsdXN0ZXIuY29udGFpbmVkUHVzaHBpbnMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXI6IE1hcmtlciA9IGwuR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlcikgeyBtLnB1c2gobWFya2VyKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvID0geyBtYXJrZXJUeXBlOiBNYXJrZXJUeXBlSWQuTm9uZSB9O1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XG4gICAgICAgICAgICBvLmljb24gPSBsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjayhtLCBpY29uSW5mbyk7XG4gICAgICAgICAgICBpZiAoby5pY29uICE9PSAnJykge1xuICAgICAgICAgICAgICAgIG8uYW5jaG9yID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KFxuICAgICAgICAgICAgICAgICAgICAoaWNvbkluZm8uc2l6ZSAmJiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoaWNvbkluZm8uc2l6ZS53aWR0aCAqIGljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLngpIDogMCxcbiAgICAgICAgICAgICAgICAgICAgKGljb25JbmZvLnNpemUgJiYgaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGljb25JbmZvLnNpemUuaGVpZ2h0ICogaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8ueSkgOiAwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkluZm8udGV4dE9mZnNldCkgeyBvLnRleHRPZmZzZXQgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoaWNvbkluZm8udGV4dE9mZnNldC54LCBpY29uSW5mby50ZXh0T2Zmc2V0LnkpOyB9XG4gICAgICAgICAgICAgICAgY2x1c3Rlci5zZXRPcHRpb25zKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3Rlcikge1xuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5TcGlkZXIpIHtcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihjbHVzdGVyLCAnZGJsY2xpY2snLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB0aGlzLlpvb21JbnRvQ2x1c3RlcihlKSk7XG4gICAgICAgICAgICAgICAgbC5Jbml0aWFsaXplU3BpZGVyQ2x1c3RlclN1cHBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogWm9vbXMgaW50byB0aGUgY2x1c3RlciBvbiBjbGljayBzbyB0aGF0IHRoZSBtZW1iZXJzIG9mIHRoZSBjbHVzdGVyIGNvbWZvcnRhYmxlIGZpdCBpbnRvIHRoZSB6b21tZWQgYXJlYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgRXZlbnQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBab29tSW50b0NsdXN0ZXIoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4gPSA8TWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4+ZS50YXJnZXQ7XG4gICAgICAgIGlmIChwaW4gJiYgcGluLmNvbnRhaW5lZFB1c2hwaW5zKSB7XG4gICAgICAgICAgICBsZXQgYm91bmRzOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3Q7XG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XG4gICAgICAgICAgICBwaW4uY29udGFpbmVkUHVzaHBpbnMuZm9yRWFjaChwID0+IGxvY3MucHVzaChwLmdldExvY2F0aW9uKCkpKTtcbiAgICAgICAgICAgIGJvdW5kcyA9IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uUmVjdC5mcm9tTG9jYXRpb25zKGxvY3MpO1xuXG4gICAgICAgICAgICAvLyBab29tIGludG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY2x1c3Rlci5cbiAgICAgICAgICAgIC8vIEFkZCBhIHBhZGRpbmcgdG8gY29tcGVuc2F0ZSBmb3IgdGhlIHBpeGVsIGFyZWEgb2YgdGhlIHB1c2hwaW5zLlxuICAgICAgICAgICAgKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBTZXJ2aWNlKS5NYXBQcm9taXNlLnRoZW4oKG06IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xuICAgICAgICAgICAgICAgIG0uc2V0Vmlldyh7IGJvdW5kczogYm91bmRzLCBwYWRkaW5nOiA3NSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=