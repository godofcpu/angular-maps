/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class BingClusterService extends BingLayerBase {
    /**
     * Creates an instance of BingClusterService.
     * \@memberof BingClusterService
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Bing Maps V8. An instance of {\@link BingMapService}.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
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
    AddLayer(layer) {
        /** @type {?} */
        const options = {
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
            options.clusteredPinCallback = (pin) => { this.CreateClusterPushPin(pin, layer); };
        }
        if (layer.CustomMarkerCallback) {
            options.clusteredPinCallback = (pin) => { this.CreateCustomClusterPushPin(pin, layer); };
        }
        if (layer.SpiderClusterOptions) {
            options.spiderClusterOptions = layer.SpiderClusterOptions;
        }
        /** @type {?} */
        const layerPromise = this._mapService.CreateClusterLayer(options);
        (/** @type {?} */ (this._mapService)).MapPromise.then(m => {
            Microsoft.Maps.Events.addHandler(m, 'viewchangeend', (e) => {
                if (layer.ClusteringEnabled && m.getZoom() === 19) {
                    layerPromise.then((l) => {
                        l.SetOptions({ id: layer.Id, clusteringEnabled: false });
                    });
                }
                if (layer.ClusteringEnabled && m.getZoom() < 19) {
                    layerPromise.then((l) => {
                        if (!l.GetOptions().clusteringEnabled) {
                            l.SetOptions({ id: layer.Id, clusteringEnabled: true });
                        }
                    });
                }
            });
        });
        this._layers.set(layer.Id, layerPromise);
    }
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
    CreatePolygon(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
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
    CreatePolygons(layer, options) {
        throw (new Error('Polygons are not supported in clustering layers. You can only use markers.'));
    }
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
    CreatePolyline(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
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
    CreatePolylines(layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    }
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
    StartClustering(layer) {
        /** @type {?} */
        const l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.StartClustering();
            });
        });
    }
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
    StopClustering(layer) {
        /** @type {?} */
        const l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.StopClustering();
            });
        });
    }
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
    CreateClusterPushPin(cluster, layer) {
        this._layers.get(layer.Id).then((l) => {
            if (layer.IconInfo) {
                /** @type {?} */
                const o = {};
                /** @type {?} */
                const payload = (ico, info) => {
                    o.icon = ico;
                    o.anchor = new Microsoft.Maps.Point((info.size && info.markerOffsetRatio) ? (info.size.width * info.markerOffsetRatio.x) : 0, (info.size && info.markerOffsetRatio) ? (info.size.height * info.markerOffsetRatio.y) : 0);
                    cluster.setOptions(o);
                };
                /** @type {?} */
                const icon = Marker.CreateMarker(layer.IconInfo);
                if (typeof (icon) === 'string') {
                    payload(icon, layer.IconInfo);
                }
                else {
                    icon.then(x => {
                        payload(x.icon, x.iconInfo);
                    });
                }
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', (e) => this.ZoomIntoCluster(e));
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', (e) => this.ZoomIntoCluster(e));
                l.InitializeSpiderClusterSupport();
            }
        });
    }
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
    CreateCustomClusterPushPin(cluster, layer) {
        this._layers.get(layer.Id).then((l) => {
            /** @type {?} */
            const m = new Array();
            cluster.containedPushpins.forEach(p => {
                /** @type {?} */
                const marker = l.GetMarkerFromBingMarker(p);
                if (marker) {
                    m.push(marker);
                }
            });
            /** @type {?} */
            const iconInfo = { markerType: MarkerTypeId.None };
            /** @type {?} */
            const o = {};
            o.icon = layer.CustomMarkerCallback(m, iconInfo);
            if (o.icon !== '') {
                o.anchor = new Microsoft.Maps.Point((iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.width * iconInfo.markerOffsetRatio.x) : 0, (iconInfo.size && iconInfo.markerOffsetRatio) ? (iconInfo.size.height * iconInfo.markerOffsetRatio.y) : 0);
                if (iconInfo.textOffset) {
                    o.textOffset = new Microsoft.Maps.Point(iconInfo.textOffset.x, iconInfo.textOffset.y);
                }
                cluster.setOptions(o);
            }
            if (layer.ClusterClickAction === ClusterClickAction.ZoomIntoCluster) {
                Microsoft.Maps.Events.addHandler(cluster, 'click', (e) => this.ZoomIntoCluster(e));
            }
            if (layer.ClusterClickAction === ClusterClickAction.Spider) {
                Microsoft.Maps.Events.addHandler(cluster, 'dblclick', (e) => this.ZoomIntoCluster(e));
                l.InitializeSpiderClusterSupport();
            }
        });
    }
    /**
     * Zooms into the cluster on click so that the members of the cluster comfortable fit into the zommed area.
     *
     * \@memberof BingClusterService
     * @param {?} e - Mouse Event.
     *
     * @return {?}
     */
    ZoomIntoCluster(e) {
        /** @type {?} */
        const pin = /** @type {?} */ (e.target);
        if (pin && pin.containedPushpins) {
            /** @type {?} */
            let bounds;
            /** @type {?} */
            const locs = new Array();
            pin.containedPushpins.forEach(p => locs.push(p.getLocation()));
            bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
            // Zoom into the bounding box of the cluster.
            // Add a padding to compensate for the pixel area of the pushpins.
            (/** @type {?} */ (this._mapService)).MapPromise.then((m) => {
                m.setView({ bounds: bounds, padding: 75 });
            });
        }
    }
}
BingClusterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingClusterService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFVbEQsTUFBTSx5QkFBMEIsU0FBUSxhQUFhOzs7Ozs7OztJQWFqRCxZQUFZLFdBQXVCLEVBQUUsS0FBYTtRQUM5QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7Ozs7Ozs7SUFnQk0sUUFBUSxDQUFDLEtBQTRCOztRQUN4QyxNQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxvQkFBb0I7U0FDNUMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQUU7UUFDMUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7U0FBRTtRQUNuRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEdBQWtDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3JIO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxHQUFrQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMzSDtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1NBQUU7O1FBRTlGLE1BQU0sWUFBWSxHQUFtQixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xGLG1CQUFpQixJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN2RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFtQixFQUFFLEVBQUU7d0JBQ3RDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUM1RCxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBbUIsRUFBRSxFQUFFO3dCQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7NEJBQ3BDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3lCQUMzRDtxQkFDSixDQUFDLENBQUM7aUJBQ047YUFDSixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhdEMsYUFBYSxDQUFDLEtBQWEsRUFBRSxPQUF3QjtRQUN4RCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhN0YsY0FBYyxDQUFDLEtBQWEsRUFBRSxPQUErQjtRQUNoRSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYzdGLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBeUI7UUFDMUQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYTlGLGVBQWUsQ0FBQyxLQUFhLEVBQUUsT0FBZ0M7UUFDbEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWE5RixlQUFlLENBQUMsS0FBNEI7O1FBQy9DLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQW9CLEVBQUUsRUFBRTtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUN2QixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBYUEsY0FBYyxDQUFDLEtBQTRCOztRQUM5QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFvQixFQUFFLEVBQUU7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWlCQyxvQkFBb0IsQ0FBQyxPQUFzQyxFQUFFLEtBQTRCO1FBQzdGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFtQixFQUFFLEVBQUU7WUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQixNQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDOztnQkFDN0MsTUFBTSxPQUFPLEdBQWlELENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUNwRSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztvQkFDYixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQy9CLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1RixDQUFDO29CQUNGLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzdCLENBQUM7O2dCQUNGLE1BQU0sSUFBSSxHQUE4RCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUcsRUFBRSxDQUFDLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDL0IsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFpQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEg7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekQsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFpQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RILENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2FBQ3RDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQWNDLDBCQUEwQixDQUFDLE9BQXNDLEVBQUUsS0FBNEI7UUFDbkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQW1CLEVBQUUsRUFBRTs7WUFFcEQsTUFBTSxDQUFDLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7WUFDN0MsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2xDLE1BQU0sTUFBTSxHQUFXLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUFFO2FBQ2xDLENBQUMsQ0FBQzs7WUFDSCxNQUFNLFFBQVEsR0FBb0IsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUNwRSxNQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDL0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4RyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVHLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7Z0JBQ25ILE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFpQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEg7WUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDekQsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFpQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RILENBQUMsQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO2FBQ3RDO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVUMsZUFBZSxDQUFDLENBQWlDOztRQUNyRCxNQUFNLEdBQUcscUJBQWlFLENBQUMsQ0FBQyxNQUFNLEVBQUM7UUFDbkYsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7O1lBQy9CLElBQUksTUFBTSxDQUE4Qjs7WUFDeEMsTUFBTSxJQUFJLEdBQW1DLElBQUksS0FBSyxFQUEyQixDQUFDO1lBQ2xGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O1lBSXpELG1CQUFpQixJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQXFCLEVBQUUsRUFBRTtnQkFDekUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1NBQ047Ozs7WUFyUlIsVUFBVTs7OztZQVpGLFVBQVU7WUFkRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xuaW1wb3J0IHsgQmluZ0NsdXN0ZXJMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXInO1xuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9jbHVzdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0xheWVyQmFzZSB9IGZyb20gJy4vYmluZy1sYXllci1iYXNlJztcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4vYmluZy1jb252ZXJzaW9ucyc7XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBjb250cmFjdCBmb3IgYSAgQmluZyBNYXBzIFY4IHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmdDbHVzdGVyU2VydmljZSBleHRlbmRzIEJpbmdMYXllckJhc2UgaW1wbGVtZW50cyBDbHVzdGVyU2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgQmluZyBNYXBzIFY4LiBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gQ2x1c3RlckxheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllciB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXG4gICAgICogTGF5ZXJTZXJ2aWNlIGFuZCB0aGVuIHNlbGYgcmVnaXN0ZXIgb24gaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEFkZExheWVyKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IGxheWVyLklkLFxuICAgICAgICAgICAgdmlzaWJsZTogbGF5ZXIuVmlzaWJsZSxcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiBsYXllci5DbHVzdGVyaW5nRW5hYmxlZCxcbiAgICAgICAgICAgIHBsYWNlbWVudE1vZGU6IGxheWVyLkNsdXN0ZXJQbGFjZW1lbnRNb2RlXG4gICAgICAgIH07XG4gICAgICAgIGlmIChsYXllci5HcmlkU2l6ZSkgeyBvcHRpb25zLmdyaWRTaXplID0gbGF5ZXIuR3JpZFNpemU7IH1cbiAgICAgICAgaWYgKGxheWVyLkxheWVyT2Zmc2V0KSB7IG9wdGlvbnMubGF5ZXJPZmZzZXQgPSBsYXllci5MYXllck9mZnNldDsgfVxuICAgICAgICBpZiAobGF5ZXIuWkluZGV4KSB7IG9wdGlvbnMuekluZGV4ID0gbGF5ZXIuWkluZGV4OyB9XG4gICAgICAgIGlmIChsYXllci5JY29uSW5mbykge1xuICAgICAgICAgICAgb3B0aW9ucy5jbHVzdGVyZWRQaW5DYWxsYmFjayA9IChwaW46IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluKSA9PiB7IHRoaXMuQ3JlYXRlQ2x1c3RlclB1c2hQaW4ocGluLCBsYXllcik7IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLkN1c3RvbU1hcmtlckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBvcHRpb25zLmNsdXN0ZXJlZFBpbkNhbGxiYWNrID0gKHBpbjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pID0+IHsgdGhpcy5DcmVhdGVDdXN0b21DbHVzdGVyUHVzaFBpbihwaW4sIGxheWVyKTsgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIuU3BpZGVyQ2x1c3Rlck9wdGlvbnMpIHsgb3B0aW9ucy5zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IGxheWVyLlNwaWRlckNsdXN0ZXJPcHRpb25zOyB9XG5cbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlOiBQcm9taXNlPExheWVyPiA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlQ2x1c3RlckxheWVyKG9wdGlvbnMpO1xuICAgICAgICAoPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UpLk1hcFByb21pc2UudGhlbihtID0+IHtcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICd2aWV3Y2hhbmdlZW5kJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIuQ2x1c3RlcmluZ0VuYWJsZWQgJiYgbS5nZXRab29tKCkgPT09IDE5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyUHJvbWlzZS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsLlNldE9wdGlvbnMoeyBpZDogbGF5ZXIuSWQsIGNsdXN0ZXJpbmdFbmFibGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyaW5nRW5hYmxlZCAmJiBtLmdldFpvb20oKSA8IDE5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyUHJvbWlzZS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWwuR2V0T3B0aW9ucygpLmNsdXN0ZXJpbmdFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbC5TZXRPcHRpb25zKHsgaWQ6IGxheWVyLklkLCBjbHVzdGVyaW5nRW5hYmxlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBsYXllclByb21pc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5Z29uLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5Z29uLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWdvbiBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5Z29ucyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBsaW5lLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuIGFycmF5XG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWxpbmVzIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5bGluZXMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlsaW5lcyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHRoZSBpbml0aWFsIHNldCBvZiBlbnRpdGllc1xuICAgICAqIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgY2x1c3Rlci4gVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdGFydENsdXN0ZXJpbmcobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XG4gICAgICAgIGlmIChsID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogQmluZ0NsdXN0ZXJMYXllcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsMS5TdGFydENsdXN0ZXJpbmcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIENsdXN0ZXJMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFN0b3BDbHVzdGVyaW5nKGxheWVyOiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpO1xuICAgICAgICBpZiAobCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwudGhlbigobDE6IEJpbmdDbHVzdGVyTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbDEuU3RvcENsdXN0ZXJpbmcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkZWZhdWx0IGNsdXN0ZXIgcHVzaHBpbiBhcyBhIGNhbGxiYWNrIGZyb20gQmluZ01hcHMgd2hlbiBjbHVzdGVyaW5nIG9jY3Vycy4gVGhlIHtAbGluayBDbHVzdGVyTGF5ZXJEaXJlY3RpdmV9IG1vZGVsXG4gICAgICogY2FuIHByb3ZpZGUgYW4gSWNvbkluZm8gcHJvcGVydHkgdGhhdCB3b3VsZCBnb3Zlcm4gdGhlIGFwcGFyZW5hY2Ugb2YgdGhlIHBpbi4gVGhpcyBtZXRob2Qgd2lsbCBhc3NpZ24gdGhlIHNhbWUgcGluIHRvIGFsbFxuICAgICAqIGNsdXN0ZXJzIGluIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbHVzdGVyIC0gVGhlIGNsdXN0ZXIgZm9yIHdoaWNoIHRvIGNyZWF0ZSB0aGUgcHVzaHBpbi5cbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUge0BsaW5rIENsdXN0ZXJMYXllckRpcmVjdGl2ZX0gY29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBDcmVhdGVDbHVzdGVyUHVzaFBpbihjbHVzdGVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbiwgbGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XG4gICAgICAgICAgICBpZiAobGF5ZXIuSWNvbkluZm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkOiAoaWNvOiBzdHJpbmcsIGluZm86IElNYXJrZXJJY29uSW5mbykgPT4gdm9pZCA9IChpY28sIGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uaWNvbiA9IGljbztcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uYW5jaG9yID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmZvLnNpemUgJiYgaW5mby5tYXJrZXJPZmZzZXRSYXRpbykgPyAoaW5mby5zaXplLndpZHRoICogaW5mby5tYXJrZXJPZmZzZXRSYXRpby54KSA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGluZm8uc2l6ZSAmJiBpbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChpbmZvLnNpemUuaGVpZ2h0ICogaW5mby5tYXJrZXJPZmZzZXRSYXRpby55KSA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyLnNldE9wdGlvbnMobyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uOiBzdHJpbmd8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4gPSBNYXJrZXIuQ3JlYXRlTWFya2VyKGxheWVyLkljb25JbmZvKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGljb24pID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkKGljb24sIGxheWVyLkljb25JbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGljb24udGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQoeC5pY29uLCB4Lmljb25JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxheWVyLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3Rlcikge1xuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKGNsdXN0ZXIsICdjbGljaycsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHRoaXMuWm9vbUludG9DbHVzdGVyKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5TcGlkZXIpIHtcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihjbHVzdGVyLCAnZGJsY2xpY2snLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB0aGlzLlpvb21JbnRvQ2x1c3RlcihlKSk7XG4gICAgICAgICAgICAgICAgbC5Jbml0aWFsaXplU3BpZGVyQ2x1c3RlclN1cHBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBob29rIGZvciBjb25zdW1lcnMgdG8gcHJvdmlkZSBhIGN1c3RvbSBmdW5jdGlvbiB0byBjcmVhdGUgY2x1c3RlciBiaW5zIGZvciBhIGNsdXN0ZXIuIFRoaXMgaXMgcGFydGljdWFyaWx5IHVzZWZ1bFxuICAgICAqIGluIHNpdHVhdGlvbiB3aGVyZSB0aGUgcGluIHNob3VsZCBkaWZmZXIgdG8gcmVwcmVzZW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBwaW5zIGluIHRoZSBjbHVzdGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNsdXN0ZXIgLSBUaGUgY2x1c3RlciBmb3Igd2hpY2ggdG8gY3JlYXRlIHRoZSBwdXNocGluLlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSB7QGxpbmsgQ2x1c3RlckxheWVyRGlyZWN0aXZlfSBjb21wb25lbnRcbiAgICAgKiByZXByZXNlbnRpbmcgdGhlIGxheWVyLiBTZXQgdGhlIHtAbGluayBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUuQ3VzdG9tTWFya2VyQ2FsbGJhY2t9XG4gICAgICogcHJvcGVydHkgdG8gZGVmaW5lIHRoZSBjYWxsYmFjayBnZW5lcmF0aW5nIHRoZSBwaW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBDcmVhdGVDdXN0b21DbHVzdGVyUHVzaFBpbihjbHVzdGVyOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbiwgbGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyLklkKS50aGVuKChsOiBCaW5nQ2x1c3RlckxheWVyKSA9PiB7XG4gICAgICAgICAgICAvLyBhc3NlbWJsZSBtYXJrZXJzIGZvciBjYWxsYmFja1xuICAgICAgICAgICAgY29uc3QgbTogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XG4gICAgICAgICAgICBjbHVzdGVyLmNvbnRhaW5lZFB1c2hwaW5zLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFya2VyOiBNYXJrZXIgPSBsLkdldE1hcmtlckZyb21CaW5nTWFya2VyKHApO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIpIHsgbS5wdXNoKG1hcmtlcik7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgaWNvbkluZm86IElNYXJrZXJJY29uSW5mbyA9IHsgbWFya2VyVHlwZTogTWFya2VyVHlwZUlkLk5vbmUgfTtcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgby5pY29uID0gbGF5ZXIuQ3VzdG9tTWFya2VyQ2FsbGJhY2sobSwgaWNvbkluZm8pO1xuICAgICAgICAgICAgaWYgKG8uaWNvbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBvLmFuY2hvciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChcbiAgICAgICAgICAgICAgICAgICAgKGljb25JbmZvLnNpemUgJiYgaWNvbkluZm8ubWFya2VyT2Zmc2V0UmF0aW8pID8gKGljb25JbmZvLnNpemUud2lkdGggKiBpY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby54KSA6IDAsXG4gICAgICAgICAgICAgICAgICAgIChpY29uSW5mby5zaXplICYmIGljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChpY29uSW5mby5zaXplLmhlaWdodCAqIGljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLnkpIDogMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGljb25JbmZvLnRleHRPZmZzZXQpIHsgby50ZXh0T2Zmc2V0ID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KGljb25JbmZvLnRleHRPZmZzZXQueCwgaWNvbkluZm8udGV4dE9mZnNldC55KTsgfVxuICAgICAgICAgICAgICAgIGNsdXN0ZXIuc2V0T3B0aW9ucyhvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXllci5DbHVzdGVyQ2xpY2tBY3Rpb24gPT09IENsdXN0ZXJDbGlja0FjdGlvbi5ab29tSW50b0NsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihjbHVzdGVyLCAnY2xpY2snLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB0aGlzLlpvb21JbnRvQ2x1c3RlcihlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uU3BpZGVyKSB7XG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoY2x1c3RlciwgJ2RibGNsaWNrJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4gdGhpcy5ab29tSW50b0NsdXN0ZXIoZSkpO1xuICAgICAgICAgICAgICAgIGwuSW5pdGlhbGl6ZVNwaWRlckNsdXN0ZXJTdXBwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFpvb21zIGludG8gdGhlIGNsdXN0ZXIgb24gY2xpY2sgc28gdGhhdCB0aGUgbWVtYmVycyBvZiB0aGUgY2x1c3RlciBjb21mb3J0YWJsZSBmaXQgaW50byB0aGUgem9tbWVkIGFyZWEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAtIE1vdXNlIEV2ZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHByaXZhdGUgWm9vbUludG9DbHVzdGVyKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluPmUudGFyZ2V0O1xuICAgICAgICBpZiAocGluICYmIHBpbi5jb250YWluZWRQdXNocGlucykge1xuICAgICAgICAgICAgbGV0IGJvdW5kczogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb25SZWN0O1xuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpO1xuICAgICAgICAgICAgcGluLmNvbnRhaW5lZFB1c2hwaW5zLmZvckVhY2gocCA9PiBsb2NzLnB1c2gocC5nZXRMb2NhdGlvbigpKSk7XG4gICAgICAgICAgICBib3VuZHMgPSBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3QuZnJvbUxvY2F0aW9ucyhsb2NzKTtcblxuICAgICAgICAgICAgLy8gWm9vbSBpbnRvIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNsdXN0ZXIuXG4gICAgICAgICAgICAvLyBBZGQgYSBwYWRkaW5nIHRvIGNvbXBlbnNhdGUgZm9yIHRoZSBwaXhlbCBhcmVhIG9mIHRoZSBwdXNocGlucy5cbiAgICAgICAgICAgICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwU2VydmljZSkuTWFwUHJvbWlzZS50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgICAgICBtLnNldFZpZXcoeyBib3VuZHM6IGJvdW5kcywgcGFkZGluZzogNzUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19