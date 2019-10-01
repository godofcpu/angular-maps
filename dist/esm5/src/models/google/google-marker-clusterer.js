/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { GoogleMarker } from './google-marker';
import { Marker } from '../marker';
import { ClusterPlacementMode } from '../cluster-placement-mode';
import { timer } from 'rxjs';
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
GoogleMarkerClusterer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof GoogleMarkerClusterer
     */
    function GoogleMarkerClusterer(_layer) {
        this._layer = _layer;
        this._isClustering = true;
        this._markerLookup = new Map();
        this._markers = new Array();
        this._pendingMarkers = new Array();
        this._mapclicks = 0;
        this._currentZoom = 0;
        this._visible = true;
    }
    Object.defineProperty(GoogleMarkerClusterer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof GoogleMarkerClusterer
         * @return {?} GoogleMapTypes.MarkerClusterer.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        throw (new Error('Events are not supported on Google Cluster Layers. You can still add events to individual markers.'));
    };
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        /** @type {?} */
        var isMarker = entity instanceof Marker;
        isMarker = entity instanceof GoogleMarker || isMarker;
        if (isMarker) {
            entity.NativePrimitve.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering && this._visible) {
                this._layer.addMarker(entity.NativePrimitve);
                this._markers.push(entity);
            }
            else {
                this._pendingMarkers.push(entity);
            }
            this._markerLookup.set(entity.NativePrimitve, entity);
        }
        if (isMarker) {
            if (entity.IsLast) {
                this.StartClustering();
            }
        }
    };
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.AddEntities = /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            /** @type {?} */
            var e = entities.map(function (p) {
                _this._markerLookup.set(p.NativePrimitve, p);
                p.NativePrimitve.setMap(null);
                // remove the marker from the map as the clusterer will control marker visibility.
                return p.NativePrimitve;
            });
            if (this._isClustering && this._visible) {
                this._layer.addMarkers(e);
                (_a = this._markers).push.apply(_a, tslib_1.__spread(entities));
            }
            else {
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                (_b = this._pendingMarkers).push.apply(_b, tslib_1.__spread(entities));
            }
        }
        var _a, _b;
    };
    /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.Delete = /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    function () {
        this._layer.getMarkers().forEach(function (m) {
            m.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
    };
    /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    GoogleMarkerClusterer.prototype.GetMarkerFromGoogleMarker = /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    function (pin) {
        /** @type {?} */
        var m = this._markerLookup.get(pin);
        return m;
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GoogleMarkerClusterer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        /** @type {?} */
        var options = {
            id: 0,
            gridSize: this._layer.getGridSize(),
            clusteringEnabled: this._layer.getGridSize() === 0,
            maxZoom: this._layer.getMaxZoom(),
            minimumClusterSize: this._layer.getMinClusterSize(),
            placementMode: this._layer.isAverageCenter() ? ClusterPlacementMode.MeanValue : ClusterPlacementMode.FirstPin,
            visible: this._visible,
            zoomOnClick: this._layer.isZoomOnClick(),
            styles: this._layer.getStyles()
        };
        return options;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GoogleMarkerClusterer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._visible;
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve && entity.Location) {
            /** @type {?} */
            var j = this._markers.indexOf(entity);
            /** @type {?} */
            var k = this._pendingMarkers.indexOf(entity);
            if (j > -1) {
                this._markers.splice(j, 1);
            }
            if (k > -1) {
                this._pendingMarkers.splice(k, 1);
            }
            if (this._isClustering) {
                this._layer.removeMarker(entity.NativePrimitve);
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        this._layer.getMarkers().forEach(function (m) {
            m.setMap(null);
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        /** @type {?} */
        var p = new Array();
        entities.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                e.NativePrimitve.setMap(null);
                _this._markerLookup.set(e.NativePrimitve, e);
                if (_this._visible) {
                    _this._markers.push(e);
                    p.push(e.NativePrimitve);
                }
                else {
                    _this._pendingMarkers.push(e);
                }
            }
        });
        this._layer.addMarkers(p);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        if (options.placementMode != null) {
            throw (new Error('GoogleMarkerClusterer: PlacementMode option cannot be set after initial creation.'));
        }
        if (options.zoomOnClick != null) {
            throw (new Error('GoogleMarkerClusterer: ZoomOnClick option cannot be set after initial creation.'));
        }
        if (options.callback != null) { }
        if (options.clusteringEnabled != null) {
            this._layer.setMinClusterSize(options.clusteringEnabled ? 1 : 10000000);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.gridSize != null && (options.clusteringEnabled == null || options.clusteringEnabled)) {
            this._layer.setGridSize(options.gridSize);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.maxZoom != null) {
            this._layer.setMaxZoom(options.maxZoom);
        }
        if (options.minimumClusterSize != null) {
            this._layer.setMinClusterSize(options.minimumClusterSize);
        }
        if (options.styles != null) {
            this._layer.setStyles(options.styles);
        }
        if (options.visible != null) {
            this.SetVisible(options.visible);
        }
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        /** @type {?} */
        var map = visible ? this._layer.getMap() : null;
        if (!visible) {
            this._layer.resetViewport(true);
        }
        else {
            /** @type {?} */
            var p_1 = new Array();
            if (this._pendingMarkers.length > 0) {
                this._pendingMarkers.forEach(function (e) {
                    if (e.NativePrimitve && e.Location) {
                        p_1.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.addMarkers(p_1);
                this._markers = this._markers.concat(this._pendingMarkers.splice(0));
            }
            else {
                this._layer.redraw();
            }
        }
        this._visible = visible;
    };
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    GoogleMarkerClusterer.prototype.StartClustering = /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._isClustering) {
            return;
        }
        if (this._visible) {
            /** @type {?} */
            var p_2 = new Array();
            this._markers.forEach(function (e) {
                if (e.NativePrimitve && e.Location) {
                    p_2.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._pendingMarkers.forEach(function (e) {
                if (e.NativePrimitve && e.Location) {
                    p_2.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._layer.addMarkers(p_2);
            this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        }
        if (!this._visible) {
            // only add the markers if the layer is visible. Otherwise, keep them pending. They would be added once the
            // layer is set to visible.
            timer(0).subscribe(function () {
                _this._layer.resetViewport(true);
            });
        }
        this._isClustering = true;
    };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     *
     */
    GoogleMarkerClusterer.prototype.StopClustering = /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     *
     */
    function () {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    };
    return GoogleMarkerClusterer;
}());
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
export { GoogleMarkerClusterer };
if (false) {
    /** @type {?} */
    GoogleMarkerClusterer.prototype._isClustering;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markerLookup;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._pendingMarkers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._mapclicks;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._currentZoom;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._visible;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7OztBQU83Qjs7Ozs7QUFBQTtJQTRCSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsK0JBQW9CLE1BQXNDO1FBQXRDLFdBQU0sR0FBTixNQUFNLENBQWdDOzZCQW5DbEMsSUFBSTs2QkFDZ0MsSUFBSSxHQUFHLEVBQWlDO3dCQUNsRSxJQUFJLEtBQUssRUFBVTsrQkFDWixJQUFJLEtBQUssRUFBVTswQkFDL0IsQ0FBQzs0QkFDQyxDQUFDO3dCQUNKLElBQUk7S0E2QitCOzBCQWhCcEQsaURBQWM7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JoQiwyQ0FBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0dBQW9HLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZckgseUNBQVM7Ozs7Ozs7Ozs7Y0FBQyxNQUFjOztRQUMzQixJQUFJLFFBQVEsR0FBWSxNQUFNLFlBQVksTUFBTSxDQUFDO1FBQ2pELFFBQVEsR0FBRyxNQUFNLFlBQVksWUFBWSxJQUFJLFFBQVEsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMs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SUFhdkIsOENBQWM7Ozs7Ozs7Ozs7O1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs7Z0NBM1duQztJQTZXQyxDQUFBOzs7Ozs7QUE5VkQsaUNBOFZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi9nb29nbGUtbWFya2VyJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcbmltcG9ydCB7IENsdXN0ZXJQbGFjZW1lbnRNb2RlIH0gZnJvbSAnLi4vY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgY2x1c3RlcmluZyBsYXllciBmb3IgdGhlIEdvb2dsZSBNYXAgUHJvdmlkZXIuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgTGF5ZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2lzQ2x1c3RlcmluZyA9IHRydWU7XG4gICAgcHJpdmF0ZSBfbWFya2VyTG9va3VwOiBNYXA8R29vZ2xlTWFwVHlwZXMuTWFya2VyLCBNYXJrZXI+ID0gbmV3IE1hcDxHb29nbGVNYXBUeXBlcy5NYXJrZXIsIE1hcmtlcj4oKTtcbiAgICBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxNYXJrZXI+ID0gbmV3IEFycmF5PE1hcmtlcj4oKTtcbiAgICBwcml2YXRlIF9wZW5kaW5nTWFya2VyczogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XG4gICAgcHJpdmF0ZSBfbWFwY2xpY2tzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2N1cnJlbnRab29tOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBHb29nbGVNYXJrZXJDbHVzdGVyZXIgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gX2xheWVyIEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlci4gTmF0aXZlIEdvb2dsZSBNYXBzIE1hcmtlciBDbHVzdGVyZXIgc3VwcG9ydGluZyB0aGUgY2x1c3RlciBsYXllci5cbiAgICAgKiBAcGFyYW0gX21hcHMgTWFwU2VydmljZS4gTWFwU2VydmljZSBpbXBsZW1lbnRhdGlvbiB0byBsZXZlcmFnZSBmb3IgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xheWVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIpIHsgfVxuXG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMsIExheWVyIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSBzdHJpbmcuIFR5cGUgb2YgZXZlbnQgdG8gYWRkIChjbGljaywgbW91c2VvdmVyLCBldGMpLiBZb3UgY2FuIHVzZSBhbnkgZXZlbnQgdGhhdCB0aGUgdW5kZXJseWluZyBuYXRpdmVcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignRXZlbnRzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIEdvb2dsZSBDbHVzdGVyIExheWVycy4gWW91IGNhbiBzdGlsbCBhZGQgZXZlbnRzIHRvIGluZGl2aWR1YWwgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uIGFzIGl0IHdpbGxcbiAgICAgKiB0cmlnZ2VyIGEgcmVjYWx1YXRpb24gb2YgdGhlIGNsdXN0ZXJzIChhbmQgYXNzb2NpYXRlZCBtYXJrZXJzIGlmIGFwcHJvcHJpdGUpIGZvclxuICAgICAqIGVhY2ggaW52b2NhdGlvbi4gSWYgeW91IHVzZSB0aGlzIG1ldGhvZCB0byBhZGQgbWFueSBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyLCB1c2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyLiBFbnRpdHkgdG8gYWRkIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XG4gICAgICAgIGxldCBpc01hcmtlcjogYm9vbGVhbiA9IGVudGl0eSBpbnN0YW5jZW9mIE1hcmtlcjtcbiAgICAgICAgaXNNYXJrZXIgPSBlbnRpdHkgaW5zdGFuY2VvZiBHb29nbGVNYXJrZXIgfHwgaXNNYXJrZXI7XG4gICAgICAgIGlmIChpc01hcmtlcikge1xuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIG1hcmtlciBmcm9tIHRoZSBtYXAgYXMgdGhlIGNsdXN0ZXJlciB3aWxsIGNvbnRyb2wgbWFya2VyIHZpc2liaWxpdHkuXG4gICAgICAgICAgICBpZiAoZW50aXR5LklzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BDbHVzdGVyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSAmJiBlbnRpdHkuTG9jYXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcgJiYgdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcihlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlbnRpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaChlbnRpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChlbnRpdHkuTmF0aXZlUHJpbWl0dmUsIGVudGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTWFya2VyKSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LklzTGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRDbHVzdGVyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIG1hcmtlcnMgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj4uIEVudGl0aWVzIHRvIGFkZCB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIEFkZEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+KTogdm9pZCB7XG4gICAgICAgIGlmIChlbnRpdGllcyAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpICYmIGVudGl0aWVzLmxlbmd0aCAhPT0gMCApIHtcbiAgICAgICAgICAgIGNvbnN0IGU6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4gPSBlbnRpdGllcy5tYXAocCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChwLk5hdGl2ZVByaW1pdHZlLCBwKTtcbiAgICAgICAgICAgICAgICBwLk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxuICAgICAgICAgICAgICAgIHJldHVybiBwLk5hdGl2ZVByaW1pdHZlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nICYmIHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaCguLi5lbnRpdGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBsYXllciBpcyBub3QgdmlzaWJsZSwgYWx3YXlzIGFkZCB0byBwZW5kaW5nTWFya2Vycy4gU2V0dGluZyB0aGUgbGF5ZXIgdG8gdmlzaWJsZSBsYXRlclxuICAgICAgICAgICAgICAgIC8vIHdpbGwgcmVuZGVyIHRoZSBtYXJrZXJzIGFwcHJvcHJpYXRlbHlcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGNsdXN0ZXJpbmcgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbGF5ZXIuZ2V0TWFya2VycygpLmZvckVhY2gobSA9PiB7XG4gICAgICAgICAgICBtLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIG1hcmtlciBmcm9tIHRoZSBtYXAgYXMgdGhlIGNsdXN0ZXJlciB3aWxsIGNvbnRyb2wgbWFya2VyIHZpc2liaWxpdHkuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllci5jbGVhck1hcmtlcnMoKTtcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhYnN0cmFjdCBtYXJrZXIgdXNlZCB0byB3cmFwIHRoZSBHb29nbGUgTWFya2VyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgTWFya2VyLiBUaGUgYWJzdHJhY3QgbWFya2VyIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHB1c2hwaW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIEdldE1hcmtlckZyb21Hb29nbGVNYXJrZXIocGluOiBHb29nbGVNYXBUeXBlcy5NYXJrZXIpOiBNYXJrZXIge1xuICAgICAgICBjb25zdCBtOiBNYXJrZXIgPSB0aGlzLl9tYXJrZXJMb29rdXAuZ2V0KHBpbik7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBJQ2x1c3Rlck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElDbHVzdGVyT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgZ3JpZFNpemU6IHRoaXMuX2xheWVyLmdldEdyaWRTaXplKCksXG4gICAgICAgICAgICBjbHVzdGVyaW5nRW5hYmxlZDogdGhpcy5fbGF5ZXIuZ2V0R3JpZFNpemUoKSA9PT0gMCxcbiAgICAgICAgICAgIG1heFpvb206IHRoaXMuX2xheWVyLmdldE1heFpvb20oKSxcbiAgICAgICAgICAgIG1pbmltdW1DbHVzdGVyU2l6ZTogdGhpcy5fbGF5ZXIuZ2V0TWluQ2x1c3RlclNpemUoKSxcbiAgICAgICAgICAgIHBsYWNlbWVudE1vZGU6IHRoaXMuX2xheWVyLmlzQXZlcmFnZUNlbnRlcigpID8gQ2x1c3RlclBsYWNlbWVudE1vZGUuTWVhblZhbHVlIDogQ2x1c3RlclBsYWNlbWVudE1vZGUuRmlyc3RQaW4sXG4gICAgICAgICAgICB2aXNpYmxlOiB0aGlzLl92aXNpYmxlLFxuICAgICAgICAgICAgem9vbU9uQ2xpY2s6IHRoaXMuX2xheWVyLmlzWm9vbU9uQ2xpY2soKSxcbiAgICAgICAgICAgIHN0eWxlczogdGhpcy5fbGF5ZXIuZ2V0U3R5bGVzKClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlciBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUgJiYgZW50aXR5LkxvY2F0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBqOiBudW1iZXIgPSB0aGlzLl9tYXJrZXJzLmluZGV4T2YoZW50aXR5KTtcbiAgICAgICAgICAgIGNvbnN0IGs6IG51bWJlciA9IHRoaXMuX3BlbmRpbmdNYXJrZXJzLmluZGV4T2YoZW50aXR5KTtcbiAgICAgICAgICAgIGlmIChqID4gLTEpIHsgdGhpcy5fbWFya2Vycy5zcGxpY2UoaiwgMSk7IH1cbiAgICAgICAgICAgIGlmIChrID4gLTEpIHsgdGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKGssIDEpOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVtb3ZlTWFya2VyKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuZGVsZXRlKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPiBjb250YWluaW5nXG4gICAgICogdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci4gVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFNldEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xheWVyLmdldE1hcmtlcnMoKS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgbS5zZXRNYXAobnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllci5jbGVhck1hcmtlcnMoKTtcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKTtcbiAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmNsZWFyKCk7XG5cbiAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+KCk7XG4gICAgICAgIGVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZS5OYXRpdmVQcmltaXR2ZSwgZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgICAgICBwLnB1c2goZS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMocCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBJQ2x1c3Rlck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUNsdXN0ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGlmIChvcHRpb25zLnBsYWNlbWVudE1vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKCdHb29nbGVNYXJrZXJDbHVzdGVyZXI6IFBsYWNlbWVudE1vZGUgb3B0aW9uIGNhbm5vdCBiZSBzZXQgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbi4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuem9vbU9uQ2xpY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cobmV3IEVycm9yKCdHb29nbGVNYXJrZXJDbHVzdGVyZXI6IFpvb21PbkNsaWNrIG9wdGlvbiBjYW5ub3QgYmUgc2V0IGFmdGVyIGluaXRpYWwgY3JlYXRpb24uJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrICE9IG51bGwpIHt9XG4gICAgICAgIGlmIChvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnNldE1pbkNsdXN0ZXJTaXplKG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQgPyAxIDogMTAwMDAwMDApO1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVzZXRWaWV3cG9ydCgpO1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZ3JpZFNpemUgIT0gbnVsbCAmJiAob3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA9PSBudWxsIHx8IG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRHcmlkU2l6ZShvcHRpb25zLmdyaWRTaXplKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlc2V0Vmlld3BvcnQoKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm1heFpvb20gIT0gbnVsbCkgeyB0aGlzLl9sYXllci5zZXRNYXhab29tKG9wdGlvbnMubWF4Wm9vbSk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMubWluaW11bUNsdXN0ZXJTaXplICE9IG51bGwpIHsgdGhpcy5fbGF5ZXIuc2V0TWluQ2x1c3RlclNpemUob3B0aW9ucy5taW5pbXVtQ2x1c3RlclNpemUpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLnN0eWxlcyAhPSBudWxsKSB7IHRoaXMuX2xheWVyLnNldFN0eWxlcyhvcHRpb25zLnN0eWxlcyk7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMudmlzaWJsZSAhPSBudWxsKSB7IHRoaXMuU2V0VmlzaWJsZShvcHRpb25zLnZpc2libGUpOyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZpc2libGUgQm9vbGVhbiB0cnVlIHRvIG1ha2UgdGhlIGxheWVyIHZpc2libGUsIGZhbHNlIHRvIGhpZGUgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAgPSB2aXNpYmxlID8gdGhpcy5fbGF5ZXIuZ2V0TWFwKCkgOiBudWxsO1xuICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nTWFya2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcC5wdXNoKDxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ZS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKHApO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMgPSB0aGlzLl9tYXJrZXJzLmNvbmNhdCh0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdG8gYWN0dWFsbHkgY2x1c3RlciB0aGUgZW50aXRpZXMgaW4gYSBjbHVzdGVyIGxheWVyLiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHRoZSBpbml0aWFsIHNldCBvZiBlbnRpdGllc1xuICAgICAqIGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgY2x1c3Rlci4gVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+KCk7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBwLnB1c2goPEdvb2dsZU1hcFR5cGVzLk1hcmtlcj5lLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBwLnB1c2goPEdvb2dsZU1hcFR5cGVzLk1hcmtlcj5lLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZE1hcmtlcnMocCk7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJzID0gdGhpcy5fbWFya2Vycy5jb25jYXQodGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gb25seSBhZGQgdGhlIG1hcmtlcnMgaWYgdGhlIGxheWVyIGlzIHZpc2libGUuIE90aGVyd2lzZSwga2VlcCB0aGVtIHBlbmRpbmcuIFRoZXkgd291bGQgYmUgYWRkZWQgb25jZSB0aGVcbiAgICAgICAgICAgIC8vIGxheWVyIGlzIHNldCB0byB2aXNpYmxlLlxuICAgICAgICAgICAgdGltZXIoMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNDbHVzdGVyaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFN0b3BDbHVzdGVyaW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzQ2x1c3RlcmluZykgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5faXNDbHVzdGVyaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIl19