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
import { GoogleLayerBase } from './google-layer-base';
var GoogleClusterService = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleClusterService, _super);
    ///
    /// Constructors
    ///
    /**
     * Creates an instance of GoogleClusterService.
     * @param _mapService
     * @param _zone
     * @memberof GoogleClusterService
     */
    function GoogleClusterService(_mapService, _zone) {
        var _this = _super.call(this, _mapService, _zone) || this;
        _this._layers = new Map();
        _this._layerStyles = new Map();
        return _this;
    }
    /**
     * Creates the cluster icon from the styles
     *
     * \@memberof GoogleClusterService
     * @param {?} styles
     * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
     * containing the hydrated cluster icons.
     */
    GoogleClusterService.CreateClusterIcons = /**
     * Creates the cluster icon from the styles
     *
     * \@memberof GoogleClusterService
     * @param {?} styles
     * @return {?} - Promise that when resolved contains an Array of IClusterIconInfo objects
     * containing the hydrated cluster icons.
     */
    function (styles) {
        /** @type {?} */
        var i = new Promise(function (resolve, reject) {
            /** @type {?} */
            var pa = new Array();
            styles.forEach(function (style, index) {
                if (style.iconInfo) {
                    /** @type {?} */
                    var s = Marker.CreateMarker(style.iconInfo);
                    if (typeof (s) === 'string') {
                        style.url = s;
                        if (style.width == null) {
                            style.width = style.iconInfo.size.width;
                            style.height = style.iconInfo.size.height;
                        }
                        if (style.iconInfo.markerOffsetRatio && style.iconInfo.size && style.anchor == null) {
                            /** @type {?} */
                            var o = style.iconInfo;
                            style.anchor = [
                                o.size.width * o.markerOffsetRatio.x,
                                o.size.height * o.markerOffsetRatio.y
                            ];
                        }
                        delete style.iconInfo;
                    }
                    else {
                        s.then(function (x) {
                            style.url = x.icon;
                            if (style.width == null) {
                                style.width = x.iconInfo.size.width;
                                style.height = x.iconInfo.size.height;
                            }
                            if (x.iconInfo.markerOffsetRatio && x.iconInfo.size && style.anchor == null) {
                                /** @type {?} */
                                var o = x.iconInfo;
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
                Promise.all(pa).then(function () {
                    resolve(styles);
                });
            }
        });
        return i;
    };
    /**
     * Adds the cluster layer to the map
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    GoogleClusterService.prototype.AddLayer = /**
     * Adds the cluster layer to the map
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var options = {
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
        var dynamicClusterCallback = function (markers, numStyles, clusterer) {
            /** @type {?} */
            var styles = _this._layerStyles.get(layer.Id);
            /** @type {?} */
            var iconInfo = {
                markerType: MarkerTypeId.None
            };
            /** @type {?} */
            var icon = layer.CustomMarkerCallback(/** @type {?} */ (markers), iconInfo);
            styles[0] = {
                url: "\"data:image/svg+xml;utf8," + icon + "\"",
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
        var resetStyles = function (clusterer) {
            if (_this._layerStyles.has(layer.Id)) {
                _this._layerStyles.get(layer.Id).splice(0);
            }
            else {
                /** @type {?} */
                var styles = new Array();
                styles.push({});
                _this._layerStyles.set(layer.Id, styles);
                clusterer.setStyles(styles);
                // this is important for dynamic styles as the pointer to this array gets passed
                // around key objects in the clusterer. Therefore, it must be initialized here in order for
                // updates to the styles to be visible.
                // also, we need to add at least one style to prevent the default styles from being picked up.
            }
        };
        /** @type {?} */
        var layerPromise = this._mapService.CreateClusterLayer(options);
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(function (l) {
            /** @type {?} */
            var clusterer = /** @type {?} */ (l.NativePrimitve);
            if (options.styles) {
                /** @type {?} */
                var s = GoogleClusterService.CreateClusterIcons(options.styles);
                s.then(function (x) {
                    clusterer.setStyles(/** @type {?} */ (x));
                });
            }
            else {
                resetStyles(clusterer);
                _this._mapService.MapPromise.then(function (m) {
                    m.addListener('zoom_changed', function () {
                        resetStyles(clusterer);
                    });
                });
                clusterer.setCalculator(function (m, n) {
                    return dynamicClusterCallback(m, n, clusterer);
                });
            }
        });
    };
    /**
     * Create a marker in the cluster
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    GoogleClusterService.prototype.CreateMarker = /**
     * Create a marker in the cluster
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            return _this._mapService.CreateMarker(options)
                .then(function (marker) {
                marker.IsFirst = options.isFirst;
                marker.IsLast = options.isLast;
                l.AddEntity(marker);
                return marker;
            });
        });
    };
    /**
     * Starts the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    GoogleClusterService.prototype.StartClustering = /**
     * Starts the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        return Promise.resolve();
    };
    /**
     * Stops the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    GoogleClusterService.prototype.StopClustering = /**
     * Stops the clustering
     *
     * \@memberof GoogleClusterService
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        return Promise.resolve();
    };
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
    GoogleClusterService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleClusterService
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
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    GoogleClusterService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
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
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polygons for complex paths) model.
     *
     */
    GoogleClusterService.prototype.CreatePolyline = /**
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
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
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
    GoogleClusterService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleClusterService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        throw (new Error('Polylines are not supported in clustering layers. You can only use markers.'));
    };
    GoogleClusterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleClusterService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return GoogleClusterService;
}(GoogleLayerBase));
export { GoogleClusterService };
if (false) {
    /** @type {?} */
    GoogleClusterService.prototype._layers;
    /** @type {?} */
    GoogleClusterService.prototype._layerStyles;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNsdXN0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFRWixnREFBZTtJQXVFckQsR0FBRztJQUNILGdCQUFnQjtJQUNoQixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCw4QkFBWSxXQUF1QixFQUFFLEtBQWE7UUFBbEQsWUFDSSxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDLFNBQzVCO3dCQTlFZ0QsSUFBSSxHQUFHLEVBQTBCOzZCQUNSLElBQUksR0FBRyxFQUE4Qzs7S0E2RTlIOzs7Ozs7Ozs7SUEvRGEsdUNBQWtCOzs7Ozs7OztjQUFDLE1BQStCOztRQUM1RCxJQUFNLENBQUMsR0FBcUMsSUFBSSxPQUFPLENBQTBCLFVBQUMsT0FBTyxFQUFFLE1BQU07O1lBQzdGLElBQU0sRUFBRSxHQUFHLElBQUksS0FBSyxFQUFzRCxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztnQkFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O29CQUNqQixJQUFNLENBQUMsR0FBOEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pHLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUN4QyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt5QkFDN0M7d0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7OzRCQUNsRixJQUFNLENBQUMsR0FBb0IsS0FBSyxDQUFDLFFBQVEsQ0FBQzs0QkFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBRztnQ0FDWCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQ0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBQ3hDLENBQUM7eUJBQ0w7d0JBQ0QsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLENBQUMsQ0FBQzt3QkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzs0QkFDSixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBQ3BDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzZCQUN6Qzs0QkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0NBQzFFLElBQU0sQ0FBQyxHQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDO2dDQUN0QyxLQUFLLENBQUMsTUFBTSxHQUFHO29DQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29DQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQ0FDeEMsQ0FBQzs2QkFDTDs0QkFDRCxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7eUJBQ3pCLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNkO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUFFO1lBQ3pDLElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25CLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBdUJOLHVDQUFROzs7Ozs7O2NBQUMsS0FBNEI7OztRQUN4QyxJQUFNLE9BQU8sR0FBb0I7WUFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUI7WUFDMUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxrQkFBa0IsQ0FBQyxlQUFlO1NBQy9FLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUFFO1FBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1NBQUU7UUFDeEYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FBRTtRQUNwRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztTQUV6QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNkLE1BQU0sRUFBRSxFQUFFO29CQUNWLEtBQUssRUFBRSxFQUFFO29CQUNULFNBQVMsRUFBRSxPQUFPO29CQUNsQixRQUFRLEVBQUUsRUFBRTtvQkFDWixrQkFBa0IsRUFBRSxRQUFRO29CQUM1QixRQUFRLEVBQUU7d0JBQ04sVUFBVSxFQUFFLFlBQVksQ0FBQyxVQUFVO3dCQUNuQyxRQUFRLEVBQUUsYUFBYTt3QkFDdkIsUUFBUSxFQUFFLEVBQUU7d0JBQ1osS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLFFBQVE7cUJBQ2pCO2lCQUNKLENBQUMsQ0FBQztTQUNOOztRQUNELElBQU0sc0JBQXNCLEdBQUcsVUFBQyxPQUFxQyxFQUFFLFNBQWlCLEVBQ3BGLFNBQXlDOztZQU16QyxJQUFNLE1BQU0sR0FBdUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUNuRixJQUFNLFFBQVEsR0FBb0I7Z0JBQzlCLFVBQVUsRUFBRSxZQUFZLENBQUMsSUFBSTthQUNoQyxDQUFDOztZQUNGLElBQU0sSUFBSSxHQUFXLEtBQUssQ0FBQyxvQkFBb0IsbUJBQU0sT0FBTyxHQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDUixHQUFHLEVBQUUsK0JBQTZCLElBQUksT0FBSTtnQkFDMUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDNUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFDMUIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGtCQUFrQixFQUFFLFFBQVE7YUFDL0IsQ0FBQztZQUNGLE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQztTQUNMLENBQUM7O1FBQ0YsSUFBTSxXQUFXLEdBQUcsVUFBQyxTQUF5QztZQUMxRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtZQUNuRixJQUFJLENBQUMsQ0FBQzs7Z0JBQ0YsSUFBTSxNQUFNLEdBQXVDLElBQUksS0FBSyxFQUErQixDQUFDO2dCQUM1RixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OzthQUsvQjtTQUNKLENBQUM7O1FBRUYsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDOztZQUNmLElBQU0sU0FBUyxxQkFBbUUsQ0FBQyxDQUFDLGNBQWMsRUFBQztZQUNuRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2pCLElBQU0sQ0FBQyxHQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7b0JBQ0osU0FBUyxDQUFDLFNBQVMsbUJBQXFDLENBQUMsRUFBQyxDQUFDO2lCQUM5RCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBMkI7b0JBQ3pELENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO3dCQUMxQixXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzFCLENBQUMsQ0FBQztpQkFDTixDQUFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO29CQUN6QixNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDbEQsQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVQSwyQ0FBWTs7Ozs7Ozs7Y0FBQyxLQUFhLEVBQUUsT0FBdUI7OztRQUN0RCxJQUFNLENBQUMsR0FBbUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQkFBaUIsS0FBSyw0QkFBeUIsQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUV0RixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVE7WUFDbkIsTUFBTSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztpQkFDeEMsSUFBSSxDQUFDLFVBQUMsTUFBYztnQkFDakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDakIsQ0FBQyxDQUFDO1NBQ1YsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFTQSw4Q0FBZTs7Ozs7OztjQUFDLEtBQTRCO1FBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7Ozs7OztJQVN0Qiw2Q0FBYzs7Ozs7OztjQUFDLEtBQTRCO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztJQWF0Qiw0Q0FBYTs7Ozs7Ozs7OztjQUFDLEtBQWEsRUFBRSxPQUF3QjtRQUN4RCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhN0YsNkNBQWM7Ozs7Ozs7Ozs7Y0FBQyxLQUFhLEVBQUUsT0FBK0I7UUFDaEUsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztJQWM3Riw2Q0FBYzs7Ozs7Ozs7Ozs7Y0FBQyxLQUFhLEVBQUUsT0FBeUI7UUFDMUQsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYTlGLDhDQUFlOzs7Ozs7Ozs7O2NBQUMsS0FBYSxFQUFFLE9BQWdDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDLENBQUM7OztnQkF6UnhHLFVBQVU7Ozs7Z0JBUkYsVUFBVTtnQkFSRSxNQUFNOzsrQkFKM0I7RUFxQjBDLGVBQWU7U0FBNUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsi77u/aW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xuaW1wb3J0IHsgQ2x1c3RlckNsaWNrQWN0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NsdXN0ZXItY2xpY2stYWN0aW9uJztcbmltcG9ydCB7IENsdXN0ZXJMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2x1c3Rlci1sYXllcic7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlTGF5ZXJCYXNlIH0gZnJvbSAnLi9nb29nbGUtbGF5ZXItYmFzZSc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVDbHVzdGVyU2VydmljZSBleHRlbmRzIEdvb2dsZUxheWVyQmFzZSBpbXBsZW1lbnRzIENsdXN0ZXJTZXJ2aWNlIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX2xheWVyczogTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+ID0gbmV3IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PigpO1xuICAgIHByb3RlY3RlZCBfbGF5ZXJTdHlsZXM6IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+ID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gU3RhdGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgaWNvbiBmcm9tIHRoZSBzdHlsZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdHlsZXNcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIGFuIEFycmF5IG9mIElDbHVzdGVySWNvbkluZm8gb2JqZWN0c1xuICAgICAqIGNvbnRhaW5pbmcgdGhlIGh5ZHJhdGVkIGNsdXN0ZXIgaWNvbnMuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVDbHVzdGVySWNvbnMoc3R5bGVzOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPik6IFByb21pc2U8QXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4+IHtcbiAgICAgICAgY29uc3QgaTogUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxJQ2x1c3Rlckljb25JbmZvPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGEgPSBuZXcgQXJyYXk8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4+KCk7XG4gICAgICAgICAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmljb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHM6IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiA9IE1hcmtlci5DcmVhdGVNYXJrZXIoc3R5bGUuaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0gcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS53aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBzdHlsZS5pY29uSW5mby5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmhlaWdodCA9IHN0eWxlLmljb25JbmZvLnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvICYmIHN0eWxlLmljb25JbmZvLnNpemUgJiYgc3R5bGUuYW5jaG9yID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvOiBJTWFya2VySWNvbkluZm8gPSBzdHlsZS5pY29uSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5hbmNob3IgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uc2l6ZS53aWR0aCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRoZW4oeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudXJsID0geC5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS53aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndpZHRoID0geC5pY29uSW5mby5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5oZWlnaHQgPSB4Lmljb25JbmZvLnNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeC5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpbyAmJiB4Lmljb25JbmZvLnNpemUgJiYgc3R5bGUuYW5jaG9yID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbzogSU1hcmtlckljb25JbmZvID0geC5pY29uSW5mbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuYW5jaG9yID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLndpZHRoICogby5tYXJrZXJPZmZzZXRSYXRpby54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5zaXplLmhlaWdodCAqIG8ubWFya2VyT2Zmc2V0UmF0aW8ueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3R5bGUuaWNvbkluZm87XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhLnB1c2gocyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwYS5sZW5ndGggPT09IDApIHsgcmVzb2x2ZShzdHlsZXMpOyB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwYSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3R5bGVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvcnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlXG4gICAgICogQHBhcmFtIF96b25lXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjbHVzdGVyIGxheWVyIHRvIHRoZSBtYXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiBsYXllci5JZCxcbiAgICAgICAgICAgIHZpc2libGU6IGxheWVyLlZpc2libGUsXG4gICAgICAgICAgICBjbHVzdGVyaW5nRW5hYmxlZDogbGF5ZXIuQ2x1c3RlcmluZ0VuYWJsZWQsXG4gICAgICAgICAgICB6b29tT25DbGljazogbGF5ZXIuQ2x1c3RlckNsaWNrQWN0aW9uID09PSBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyXG4gICAgICAgIH07XG4gICAgICAgIGlmIChsYXllci5HcmlkU2l6ZSkgeyBvcHRpb25zLmdyaWRTaXplID0gbGF5ZXIuR3JpZFNpemU7IH1cbiAgICAgICAgaWYgKGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZSkgeyBvcHRpb25zLm1pbmltdW1DbHVzdGVyU2l6ZSA9IGxheWVyLk1pbmltdW1DbHVzdGVyU2l6ZTsgfVxuICAgICAgICBpZiAobGF5ZXIuU3R5bGVzKSB7IG9wdGlvbnMuc3R5bGVzID0gbGF5ZXIuU3R5bGVzOyB9XG4gICAgICAgIGlmIChsYXllci5Vc2VEeW5hbWljU2l6ZU1hcmtlcnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3R5bGVzID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGRvIG5vdCB0byBhdHRlbXB0IHRvIHNldHVwIHN0eWxlcyBoZXJlIGFzIHRoZSBkeW5hbWljIGNhbGwgYmFjayB3aWxsIGdlbmVyYXRlIHRoZW0uXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLnN0eWxlcyA9IFt7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMzUsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHRleHRTaXplOiAxMSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGljb25JbmZvOiB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlclR5cGU6IE1hcmtlclR5cGVJZC5Gb250TWFya2VyLFxuICAgICAgICAgICAgICAgICAgICBmb250TmFtZTogJ0ZvbnRBd2Vzb21lJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDMwLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1xcdUYxMTEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZHluYW1pY0NsdXN0ZXJDYWxsYmFjayA9IChtYXJrZXJzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcixcbiAgICAgICAgICAgIGNsdXN0ZXJlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyKSA9PiB7XG4gICAgICAgICAgICAvLyBkeW5hbWljYWxseSBlbnN1cmUgdGhhdCB0aGUgbmVjZXNzYXJ5IHN0eWxlIGZvciB0aGlzIGNsdXN0ZXIgaWNvbiBleGlzdHMgYW5kXG4gICAgICAgICAgICAvLyB0aGUgY2x1c3RlcmVyIGlzIGFscmVhZHkgaG9va2VkIHVwIHRvIHRoZSBzdHlsZXMgYXJyYXkgdmlhIHBvaW50ZXIsIHNvIHdlIG9ubHlcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBzdHlsZS4gU2luY2UgdGhlIGNsdXN0ZXJlciByZS1yZW5kZXJzIGEgY2x1c3RlciBpY29uIGlzIHRoZVxuICAgICAgICAgICAgLy8gdGhlIG1hcmtlciBjb3VudCBjaGFuZ2VzLCB3ZSB3aWxsIG9ubHkgbmVlZCB0byByZXRhaW4gdGhlIGN1cnJlbnQgaWNvbiBhcyBvcHBvc2VkXG4gICAgICAgICAgICAvLyB0byBhbGwgY2x1c3RlciBpY29uLlxuICAgICAgICAgICAgY29uc3Qgc3R5bGVzOiBBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+ID0gdGhpcy5fbGF5ZXJTdHlsZXMuZ2V0KGxheWVyLklkKTtcbiAgICAgICAgICAgIGNvbnN0IGljb25JbmZvOiBJTWFya2VySWNvbkluZm8gPSB7XG4gICAgICAgICAgICAgICAgbWFya2VyVHlwZTogTWFya2VyVHlwZUlkLk5vbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBpY29uOiBzdHJpbmcgPSBsYXllci5DdXN0b21NYXJrZXJDYWxsYmFjayg8YW55Pm1hcmtlcnMsIGljb25JbmZvKTtcbiAgICAgICAgICAgIHN0eWxlc1swXSA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IGBcXFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJHtpY29ufVxcXCJgLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaWNvbkluZm8uc2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGljb25JbmZvLnNpemUud2lkdGgsXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHRleHRTaXplOiAxMSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dDogbWFya2Vycy5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBpbmRleDogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzZXRTdHlsZXMgPSAoY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXllclN0eWxlcy5oYXMobGF5ZXIuSWQpKSB7IHRoaXMuX2xheWVyU3R5bGVzLmdldChsYXllci5JZCkuc3BsaWNlKDApOyB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXM6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkNsdXN0ZXJTdHlsZT4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuQ2x1c3RlclN0eWxlPigpO1xuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKHt9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclN0eWxlcy5zZXQobGF5ZXIuSWQsIHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgY2x1c3RlcmVyLnNldFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCBmb3IgZHluYW1pYyBzdHlsZXMgYXMgdGhlIHBvaW50ZXIgdG8gdGhpcyBhcnJheSBnZXRzIHBhc3NlZFxuICAgICAgICAgICAgICAgICAgICAvLyBhcm91bmQga2V5IG9iamVjdHMgaW4gdGhlIGNsdXN0ZXJlci4gVGhlcmVmb3JlLCBpdCBtdXN0IGJlIGluaXRpYWxpemVkIGhlcmUgaW4gb3JkZXIgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZXMgdG8gdGhlIHN0eWxlcyB0byBiZSB2aXNpYmxlLlxuICAgICAgICAgICAgICAgICAgICAvLyBhbHNvLCB3ZSBuZWVkIHRvIGFkZCBhdCBsZWFzdCBvbmUgc3R5bGUgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBzdHlsZXMgZnJvbSBiZWluZyBwaWNrZWQgdXAuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIuSWQsIGxheWVyUHJvbWlzZSk7XG4gICAgICAgIGxheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2x1c3RlcmVyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIgPSA8R29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyPmwuTmF0aXZlUHJpbWl0dmU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzICA9IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlLkNyZWF0ZUNsdXN0ZXJJY29ucyhvcHRpb25zLnN0eWxlcyk7XG4gICAgICAgICAgICAgICAgcy50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyZXIuc2V0U3R5bGVzKDxBcnJheTxHb29nbGVNYXBUeXBlcy5DbHVzdGVyU3R5bGU+PngpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzZXRTdHlsZXMoY2x1c3RlcmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoJ3pvb21fY2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0U3R5bGVzKGNsdXN0ZXJlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNsdXN0ZXJlci5zZXRDYWxjdWxhdG9yKChtLCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkeW5hbWljQ2x1c3RlckNhbGxiYWNrKG0sIG4sIGNsdXN0ZXJlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1hcmtlciBpbiB0aGUgY2x1c3RlclxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG5cbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcmtlcihvcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKChtYXJrZXI6IE1hcmtlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG9wdGlvbnMuaXNGaXJzdDtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xuICAgICAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShtYXJrZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIGNsdXN0ZXJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdGFydENsdXN0ZXJpbmcobGF5ZXI6IENsdXN0ZXJMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgdGhlIGNsdXN0ZXJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllclxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDbHVzdGVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZyhsYXllcjogQ2x1c3RlckxheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignUG9seWdvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb25zKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlnb25zIGFyZSBub3Qgc3VwcG9ydGVkIGluIGNsdXN0ZXJpbmcgbGF5ZXJzLiBZb3UgY2FuIG9ubHkgdXNlIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgbGluZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIGxpbmUuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW5cbiAgICAgKiBhcnJheSBvZiBwb2x5Z29ucyBmb3IgY29tcGxleCBwYXRocykgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2x1c3RlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1BvbHlsaW5lcyBhcmUgbm90IHN1cHBvcnRlZCBpbiBjbHVzdGVyaW5nIGxheWVycy4gWW91IGNhbiBvbmx5IHVzZSBtYXJrZXJzLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXG4gICAgICogb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdQb2x5bGluZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gY2x1c3RlcmluZyBsYXllcnMuIFlvdSBjYW4gb25seSB1c2UgbWFya2Vycy4nKSk7XG4gICAgfVxufVxuIl19