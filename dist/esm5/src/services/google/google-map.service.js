/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GoogleMarkerClusterer } from '../../models/google/google-marker-clusterer';
import { GoogleInfoWindow } from '../../models/google/google-info-window';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapAPILoader } from '../mapapiloader';
import { MapTypeId } from '../../models/map-type-id';
import { Marker } from '../../models/marker';
import { MixinMapLabelWithOverlayView } from '../../models/google/google-label';
import { MixinCanvasOverlay } from '../../models/google/google-canvas-overlay';
import { GoogleCanvasOverlay } from '../../models/google/google-canvas-overlay';
import { GooglePolygon } from '../../models/google/google-polygon';
import { GooglePolyline } from '../../models/google/google-polyline';
import { GoogleConversions } from './google-conversions';
import { GoogleMarker } from '../../models/google/google-marker';
import { GoogleLayer } from '../../models/google/google-layer';
import { GoogleMapEventsLookup } from '../../models/google/google-events-lookup';
/**
 * Concrete implementation of the MapService abstract implementing a Google Maps provider
 *
 * @export
 */
var GoogleMapService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleMapService.
     * @param _loader MapAPILoader instance implemented for Google Maps. This instance will generally be injected.
     * @param _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     * @memberof GoogleMapService
     */
    function GoogleMapService(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    Object.defineProperty(GoogleMapService.prototype, "MapInstance", {
        get: /**
         * Gets the Google Map control instance underlying the implementation
         *
         * \@readonly
         * \@memberof GoogleMapService
         * @return {?}
         */
        function () { return this._mapInstance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMapService.prototype, "MapPromise", {
        get: /**
         * Gets a Promise for a Google Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
         * are not sure if and when the instance will be created.
         * \@readonly
         * \@memberof GoogleMapService
         * @return {?}
         */
        function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMapService.prototype, "MapSize", {
        get: /**
         * Gets the maps physical size.
         *
         * \@readonly
         * @abstract
         * \@memberof BingMapService
         * @return {?}
         */
        function () {
            if (this.MapInstance) {
                /** @type {?} */
                var el = this.MapInstance.getDiv();
                /** @type {?} */
                var s = { width: el.offsetWidth, height: el.offsetHeight };
                return s;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    GoogleMapService.prototype.CreateCanvasOverlay = /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    function (drawCallback) {
        return this._map.then(function (map) {
            /** @type {?} */
            var overlay = new GoogleCanvasOverlay(drawCallback);
            overlay.SetMap(map);
            return overlay;
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GoogleMapService.prototype.CreateClusterLayer = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function (map) {
            /** @type {?} */
            var updateOptions = false;
            /** @type {?} */
            var markerClusterer = new MarkerClusterer(map, [], options);
            /** @type {?} */
            var clusterLayer = new GoogleMarkerClusterer(markerClusterer);
            /** @type {?} */
            var o = {
                id: options.id
            };
            if (!options.visible) {
                o.visible = false;
                updateOptions = true;
            }
            if (!options.clusteringEnabled) {
                o.clusteringEnabled = false;
                updateOptions = true;
            }
            if (updateOptions) {
                clusterLayer.SetOptions(o);
            }
            return clusterLayer;
        });
    };
    /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    GoogleMapService.prototype.CreateInfoWindow = /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            /** @type {?} */
            var o = GoogleConversions.TranslateInfoWindowOptions(options);
            /** @type {?} */
            var infoWindow = new google.maps.InfoWindow(o);
            return new GoogleInfoWindow(infoWindow, _this);
        });
    };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    GoogleMapService.prototype.CreateLayer = /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    function (options) {
        var _this = this;
        return this._map.then(function (map) {
            return new GoogleLayer(map, _this, options.id);
        });
    };
    /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    GoogleMapService.prototype.CreateMap = /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    function (el, mapOptions) {
        var _this = this;
        return this._loader.Load().then(function () {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // execute map startup
            if (!mapOptions.mapTypeId == null) {
                mapOptions.mapTypeId = MapTypeId.hybrid;
            }
            if (_this._mapInstance != null) {
                _this.DisposeMap();
            }
            /** @type {?} */
            var o = GoogleConversions.TranslateOptions(mapOptions);
            /** @type {?} */
            var map = new google.maps.Map(el, o);
            if (mapOptions.bounds) {
                map.fitBounds(GoogleConversions.TranslateBounds(mapOptions.bounds));
            }
            _this._mapInstance = map;
            _this._mapResolver(map);
            return;
        });
    };
    /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    GoogleMapService.prototype.CreateMarker = /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    function (options) {
        if (options === void 0) { options = /** @type {?} */ ({}); }
        /** @type {?} */
        var payload = function (x, map) {
            /** @type {?} */
            var marker = new google.maps.Marker(x);
            /** @type {?} */
            var m = new GoogleMarker(marker);
            m.IsFirst = options.isFirst;
            m.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach(function (val, key) { return m.Metadata.set(key, val); });
            }
            marker.setMap(map);
            return m;
        };
        return this._map.then(function (map) {
            /** @type {?} */
            var o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                var s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o, map);
                }
                else {
                    return s.then(function (x) {
                        o.icon = x.icon;
                        return payload(o, map);
                    });
                }
            }
            else {
                return payload(o, map);
            }
        });
    };
    /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    GoogleMapService.prototype.CreatePolygon = /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    function (options) {
        return this._map.then(function (map) {
            /** @type {?} */
            var o = GoogleConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            var polygon = new google.maps.Polygon(o);
            polygon.setMap(map);
            /** @type {?} */
            var p = new GooglePolygon(polygon);
            if (options.metadata) {
                options.metadata.forEach(function (val, key) { return p.Metadata.set(key, val); });
            }
            if (options.title && options.title !== '') {
                p.Title = options.title;
            }
            if (options.showLabel != null) {
                p.ShowLabel = options.showLabel;
            }
            if (options.showTooltip != null) {
                p.ShowTooltip = options.showTooltip;
            }
            if (options.labelMaxZoom != null) {
                p.LabelMaxZoom = options.labelMaxZoom;
            }
            if (options.labelMinZoom != null) {
                p.LabelMinZoom = options.labelMinZoom;
            }
            return p;
        });
    };
    /**
     * Creates a polyline within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
     * which models the underlying native polyline.
     *
     */
    GoogleMapService.prototype.CreatePolyline = /**
     * Creates a polyline within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array therefore for complex paths)
     * which models the underlying native polyline.
     *
     */
    function (options) {
        /** @type {?} */
        var polyline;
        return this._map.then(function (map) {
            /** @type {?} */
            var o = GoogleConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                o.path = GoogleConversions.TranslatePaths(options.path)[0];
                polyline = new google.maps.Polyline(o);
                polyline.setMap(map);
                /** @type {?} */
                var pl_1 = new GooglePolyline(polyline);
                if (options.metadata) {
                    options.metadata.forEach(function (val, key) { return pl_1.Metadata.set(key, val); });
                }
                if (options.title && options.title !== '') {
                    pl_1.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl_1.ShowTooltip = options.showTooltip;
                }
                return pl_1;
            }
            else {
                /** @type {?} */
                var paths = GoogleConversions.TranslatePaths(options.path);
                /** @type {?} */
                var lines_1 = new Array();
                paths.forEach(function (p) {
                    o.path = p;
                    polyline = new google.maps.Polyline(o);
                    polyline.setMap(map);
                    /** @type {?} */
                    var pl = new GooglePolyline(polyline);
                    if (options.metadata) {
                        options.metadata.forEach(function (val, key) { return pl.Metadata.set(key, val); });
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines_1.push(pl);
                });
                return lines_1;
            }
        });
    };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    GoogleMapService.prototype.DeleteLayer = /**
     * Deletes a layer from the map.
     *
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        // return resolved promise as there is no conept of a custom layer in Google.
        return Promise.resolve();
    };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    GoogleMapService.prototype.DisposeMap = /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance = null;
            this._map = new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
    };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GoogleMapService.prototype.GetCenter = /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    function () {
        return this._map.then(function (map) {
            /** @type {?} */
            var center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.lat(),
                longitude: center.lng()
            });
        });
    };
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    GoogleMapService.prototype.GetBounds = /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    function () {
        return this._map.then(function (map) {
            /** @type {?} */
            var box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorthEast().lat(),
                maxLongitude: Math.max(box.getNorthEast().lng(), box.getSouthWest().lng()),
                minLatitude: box.getSouthWest().lat(),
                minLongitude: Math.min(box.getNorthEast().lng(), box.getSouthWest().lng()),
                center: { latitude: box.getCenter().lat(), longitude: box.getCenter().lng() },
                padding: 0
            });
        });
    };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GoogleMapService.prototype.GetZoom = /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    function () {
        return this._map.then(function (map) { return map.getZoom(); });
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    GoogleMapService.prototype.LocationToPoint = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    function (loc) {
        return this._map.then(function (m) {
            /** @type {?} */
            var crossesDateLine = false;
            /** @type {?} */
            var l = GoogleConversions.TranslateLocationObject(loc);
            /** @type {?} */
            var p = m.getProjection();
            /** @type {?} */
            var s = Math.pow(2, m.getZoom());
            /** @type {?} */
            var b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            /** @type {?} */
            var offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            /** @type {?} */
            var offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            /** @type {?} */
            var point = p.fromLatLngToPoint(l);
            return {
                x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                y: Math.floor((point.y - offsetY) * s)
            };
        });
    };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    GoogleMapService.prototype.LocationsToPoints = /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    function (locs) {
        return this._map.then(function (m) {
            /** @type {?} */
            var crossesDateLine = false;
            /** @type {?} */
            var p = m.getProjection();
            /** @type {?} */
            var s = Math.pow(2, m.getZoom());
            /** @type {?} */
            var b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            /** @type {?} */
            var offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            /** @type {?} */
            var offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            /** @type {?} */
            var l = locs.map(function (ll) {
                /** @type {?} */
                var l1 = GoogleConversions.TranslateLocationObject(ll);
                /** @type {?} */
                var point = p.fromLatLngToPoint(l1);
                return {
                    x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                    y: Math.floor((point.y - offsetY) * s)
                };
            });
            return l;
        });
    };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    GoogleMapService.prototype.SetCenter = /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    function (latLng) {
        return this._map.then(function (map) {
            /** @type {?} */
            var center = GoogleConversions.TranslateLocationObject(latLng);
            map.setCenter(center);
        });
    };
    /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    GoogleMapService.prototype.SetMapOptions = /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            /** @type {?} */
            var o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    GoogleMapService.prototype.SetViewOptions = /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) {
            if (options.bounds) {
                m.fitBounds(GoogleConversions.TranslateBounds(options.bounds));
            }
            /** @type {?} */
            var o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    GoogleMapService.prototype.SetZoom = /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    GoogleMapService.prototype.SubscribeToMapEvent = /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    function (eventName) {
        var _this = this;
        /** @type {?} */
        var googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(googleEventName, function (e) {
                    _this._zone.run(function () { return observer.next(e); });
                });
            });
        });
    };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    GoogleMapService.prototype.TriggerMapEvent = /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName, null); });
    };
    GoogleMapService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMapService.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return GoogleMapService;
}());
export { GoogleMapService };
if (false) {
    /** @type {?} */
    GoogleMapService.prototype._map;
    /** @type {?} */
    GoogleMapService.prototype._mapInstance;
    /** @type {?} */
    GoogleMapService.prototype._mapResolver;
    /** @type {?} */
    GoogleMapService.prototype._config;
    /** @type {?} */
    GoogleMapService.prototype._loader;
    /** @type {?} */
    GoogleMapService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFJaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7O0lBNEQ3RSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCwwQkFBb0IsT0FBcUIsRUFBVSxLQUFhO1FBQWhFLGlCQUtDO1FBTG1CLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQ25CLFVBQUMsT0FBZ0QsSUFBTyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQ3pGLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFxQixJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsTUFBTSxDQUFDO0tBQzVEOzBCQTFDVSx5Q0FBVzs7Ozs7Ozs7c0JBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7OzBCQVFuRSx3Q0FBVTs7Ozs7Ozs7c0JBQXdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OzBCQVNuRSxxQ0FBTzs7Ozs7Ozs7OztZQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFDbkIsSUFBTSxFQUFFLEdBQW1CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7O2dCQUNyRCxJQUFNLENBQUMsR0FBVSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDWjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFpQ1QsOENBQW1COzs7Ozs7OztjQUFDLFlBQWlEO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTZCOztZQUNoRCxJQUFNLE9BQU8sR0FBd0IsSUFBSSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDbEIsQ0FBQyxDQUFDOzs7Ozs7SUFXQSw2Q0FBa0I7Ozs7Y0FBQyxPQUF3QjtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUE2Qjs7WUFDaEQsSUFBSSxhQUFhLEdBQVksS0FBSyxDQUFDOztZQUNuQyxJQUFNLGVBQWUsR0FBbUMsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQzs7WUFDOUYsSUFBTSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7WUFDaEUsSUFBTSxDQUFDLEdBQW9CO2dCQUN2QixFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7YUFDakIsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1lBQ0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDdkIsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0EsMkNBQWdCOzs7Ozs7OztjQUFDLE9BQTRCOztRQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUE2Qjs7WUFDaEQsSUFBTSxDQUFDLEdBQXFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUNsRyxJQUFNLFVBQVUsR0FBOEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RSxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLENBQUM7U0FDakQsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0Esc0NBQVc7Ozs7Ozs7O2NBQUMsT0FBc0I7O1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTZCO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsRCxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWUEsb0NBQVM7Ozs7Ozs7OztjQUFDLEVBQWUsRUFBRSxVQUF1Qjs7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDOztZQUU1Qiw0QkFBNEIsRUFBRSxDQUFDO1lBQy9CLGtCQUFrQixFQUFFLENBQUM7O1lBR3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUFFO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCOztZQUNELElBQU0sQ0FBQyxHQUE4QixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7WUFDcEYsSUFBTSxHQUFHLEdBQTZCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2RTtZQUNELEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDO1NBQ1YsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0EsdUNBQVk7Ozs7Ozs7O2NBQUMsT0FBNEM7UUFBNUMsd0JBQUEsRUFBQSw0QkFBMEMsRUFBRSxDQUFBOztRQUM1RCxJQUFNLE9BQU8sR0FBRyxVQUFDLENBQStCLEVBQUUsR0FBNkI7O1lBQzNFLElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3pDLElBQU0sQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUM1QixDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRLEVBQUUsR0FBVyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7YUFBRTtZQUN4RyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDWixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7O1lBQ2hELElBQU0sQ0FBQyxHQUFpQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2xELElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzt3QkFDWCxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVlBLHdDQUFhOzs7Ozs7Ozs7Y0FBQyxPQUF3QjtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUE2Qjs7WUFDaEQsSUFBTSxDQUFDLEdBQWtDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUM1RixJQUFNLE9BQU8sR0FBMkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUVwQixJQUFNLENBQUMsR0FBa0IsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRLEVBQUUsR0FBVyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7YUFBRTtZQUN4RyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFBRTtZQUN2RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQUU7WUFDbkUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUFFO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxDQUFDLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7YUFBRTtZQUM1RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQUU7WUFDNUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBYUEseUNBQWM7Ozs7Ozs7Ozs7Y0FBQyxPQUF5Qjs7UUFDM0MsSUFBSSxRQUFRLENBQTBCO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTZCOztZQUNoRCxJQUFNLENBQUMsR0FBbUMsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUMsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O2dCQUVyQixJQUFNLElBQUUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRLEVBQUUsR0FBVyxJQUFLLE9BQUEsSUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7aUJBQUU7Z0JBQ3pHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFBRTtnQkFDeEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztpQkFBRTtnQkFDMUUsTUFBTSxDQUFDLElBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxDQUFDLENBQUM7O2dCQUNGLElBQU0sS0FBSyxHQUF3QyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDbEcsSUFBTSxPQUFLLEdBQW9CLElBQUksS0FBSyxFQUFZLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO29CQUNYLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNYLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztvQkFFckIsSUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBUSxFQUFFLEdBQVcsSUFBSyxPQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO3FCQUFFO29CQUN6RyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7cUJBQUU7b0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFBQyxFQUFFLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7cUJBQUU7b0JBQzFFLE9BQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2xCLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsT0FBSyxDQUFDO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0Esc0NBQVc7Ozs7Ozs7O2NBQUMsS0FBWTs7UUFFM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7Ozs7SUFRdEIscUNBQVU7Ozs7Ozs7O1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQTJCLFVBQUMsT0FBbUIsSUFBTyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoSDs7Ozs7Ozs7O0lBVUUsb0NBQVM7Ozs7Ozs7O1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7O1lBQ2hELElBQU0sTUFBTSxHQUEwQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxtQkFBVztnQkFDYixRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7YUFDMUIsRUFBQztTQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVUEsb0NBQVM7Ozs7Ozs7O1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7O1lBQ2hELElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QixNQUFNLG1CQUFPO2dCQUNULFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFO2dCQUNyQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUMxRSxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDckMsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUM3RSxPQUFPLEVBQUUsQ0FBQzthQUNiLEVBQUM7U0FDTCxDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLGtDQUFPOzs7Ozs7OztRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTZCLElBQUssT0FBQSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXJFLDBDQUFlOzs7Ozs7Ozs7Y0FBQyxHQUFhO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQTJCOztZQUM5QyxJQUFJLGVBQWUsR0FBWSxLQUFLLENBQUM7O1lBQ3JDLElBQU0sQ0FBQyxHQUEwQixpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDaEYsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDOztZQUM1QixJQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7WUFDM0MsSUFBTSxDQUFDLEdBQWdDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDNUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzthQUFFOztZQUc3RSxJQUFNLE9BQU8sR0FBVyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNoRSxJQUFNLE9BQU8sR0FBVyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNoRSxJQUFNLEtBQUssR0FBeUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQztnQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QyxDQUFDO1NBQ0wsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0EsNENBQWlCOzs7Ozs7OztjQUFDLElBQXFCO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQTJCOztZQUM5QyxJQUFJLGVBQWUsR0FBWSxLQUFLLENBQUM7O1lBQ3JDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7WUFDNUIsSUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7O1lBQzNDLElBQU0sQ0FBQyxHQUFnQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzVDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7YUFBRTs7WUFFN0UsSUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDaEUsSUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDaEUsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7O2dCQUNqQixJQUFNLEVBQUUsR0FBMEIsaUJBQWlCLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7O2dCQUNoRixJQUFNLEtBQUssR0FBeUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLENBQUM7b0JBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNGLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pDLENBQUM7YUFDTCxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ1osQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV0Esb0NBQVM7Ozs7Ozs7O2NBQUMsTUFBZ0I7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7O1lBQ2hELElBQU0sTUFBTSxHQUEwQixpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLHdDQUFhOzs7Ozs7OztjQUFDLE9BQW9CO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBMkI7O1lBQ3ZDLElBQU0sQ0FBQyxHQUE4QixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLHlDQUFjOzs7Ozs7OztjQUFDLE9BQW9CO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBMkI7WUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ2xFOztZQUNELElBQU0sQ0FBQyxHQUE4QixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdBLGtDQUFPOzs7Ozs7OztjQUFDLElBQVk7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkIsSUFBSyxPQUFBLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekUsOENBQW1COzs7Ozs7Ozs7Y0FBSSxTQUFpQjs7O1FBQzNDLElBQU0sZUFBZSxHQUFXLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBcUI7WUFDM0MsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUEyQjtnQkFDdkMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsVUFBQyxDQUFNO29CQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQSwwQ0FBZTs7Ozs7Ozs7Y0FBQyxTQUFpQjtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDOzs7Z0JBOWZuRixVQUFVOzs7O2dCQXpDRixZQUFZO2dCQUhBLE1BQU07OzJCQUYzQjs7U0ErQ2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgeyBHb29nbGVJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEFQSUxvYWRlciB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XG5pbXBvcnQgeyBHb29nbGVNYXBBUElMb2FkZXIsIEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1jbHVzdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUNsdXN0ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pY2x1c3Rlci1vcHRpb25zJztcbmltcG9ydCB7IElNYXBPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFwLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvaW50JztcbmltcG9ydCB7IElTaXplIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pc2l6ZSc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcC10eXBlLWlkJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1sYWJlbCc7XG5pbXBvcnQgeyBNaXhpbkNhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1jYW52YXMtb3ZlcmxheSc7XG5pbXBvcnQgeyBHb29nbGVDYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtY2FudmFzLW92ZXJsYXknO1xuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9jYW52YXMtb3ZlcmxheSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZm8td2luZG93JztcbmltcG9ydCB7IEdvb2dsZVBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1wb2x5Z29uJztcbmltcG9ydCB7IEdvb2dsZVBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWxpbmUnO1xuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuL2dvb2dsZS1jb252ZXJzaW9ucyc7XG5pbXBvcnQgeyBHb29nbGVNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXInO1xuaW1wb3J0IHsgR29vZ2xlTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1sYXllcic7XG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pYm94JztcbmltcG9ydCB7IEdvb2dsZU1hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWV2ZW50cy1sb29rdXAnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcblxuZGVjbGFyZSBjb25zdCBnb29nbGU6IGFueTtcbmRlY2xhcmUgY29uc3QgTWFya2VyQ2x1c3RlcmVyOiBhbnk7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIE1hcFNlcnZpY2UgYWJzdHJhY3QgaW1wbGVtZW50aW5nIGEgR29vZ2xlIE1hcHMgcHJvdmlkZXJcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBTZXJ2aWNlIGltcGxlbWVudHMgTWFwU2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgRGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICBwcml2YXRlIF9tYXA6IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPjtcbiAgICBwcml2YXRlIF9tYXBJbnN0YW5jZTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwO1xuICAgIHByaXZhdGUgX21hcFJlc29sdmVyOiAodmFsdWU/OiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBfY29uZmlnOiBHb29nbGVNYXBBUElMb2FkZXJDb25maWc7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgRGVmaW5pdGlvbnNcbiAgICAvLy9cblxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgR29vZ2xlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTWFwSW5zdGFuY2UoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHsgcmV0dXJuIHRoaXMuX21hcEluc3RhbmNlOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgUHJvbWlzZSBmb3IgYSBHb29nbGUgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb24uIFVzZSB0aGlzIGluc3RlYWQgb2Yge0BsaW5rIE1hcEluc3RhbmNlfSBpZiB5b3VcbiAgICAgKiBhcmUgbm90IHN1cmUgaWYgYW5kIHdoZW4gdGhlIGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTWFwUHJvbWlzZSgpOiBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD4geyByZXR1cm4gdGhpcy5fbWFwOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXBzIHBoeXNpY2FsIHNpemUuXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE1hcFNpemUoKTogSVNpemUge1xuICAgICAgICBpZiAodGhpcy5NYXBJbnN0YW5jZSkge1xuICAgICAgICAgICAgY29uc3QgZWw6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5NYXBJbnN0YW5jZS5nZXREaXYoKTtcbiAgICAgICAgICAgIGNvbnN0IHM6IElTaXplID0geyB3aWR0aDogZWwub2Zmc2V0V2lkdGgsIGhlaWdodDogZWwub2Zmc2V0SGVpZ2h0IH07XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFwU2VydmljZS5cbiAgICAgKiBAcGFyYW0gX2xvYWRlciBNYXBBUElMb2FkZXIgaW5zdGFuY2UgaW1wbGVtZW50ZWQgZm9yIEdvb2dsZSBNYXBzLiBUaGlzIGluc3RhbmNlIHdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxuICAgICAqIEBwYXJhbSBfem9uZSBOZ1pvbmUgb2JqZWN0IHRvIGVuYWJsZSB6b25lIGF3YXJlIHByb21pc2VzLiBUaGlzIHdpbGwgZ2VuZXJhbGx5IGJlIGluamVjdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IE1hcEFQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD4oXG4gICAgICAgICAgICAocmVzb2x2ZTogKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9jb25maWcgPSAoPEdvb2dsZU1hcEFQSUxvYWRlcj50aGlzLl9sb2FkZXIpLkNvbmZpZztcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2UgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2FudmFzIG92ZXJsYXkgbGF5ZXIgdG8gcGVyZm9ybSBjdXN0b20gZHJhd2luZyBvdmVyIHRoZSBtYXAgd2l0aCBvdXRcbiAgICAgKiBzb21lIG9mIHRoZSBvdmVyaGVhZCBhc3NvY2lhdGVkIHdpdGggZ29pbmcgdGhyb3VnaCB0aGUgTWFwIG9iamVjdHMuXG4gICAgICogQHBhcmFtIGRyYXdDYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbnZhcyBpcyByZWFkeSB0byBiZVxuICAgICAqIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtYXAgdmlldy5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgQ2FudmFzT3ZlcmxheX0gb2JqZWN0LlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUNhbnZhc092ZXJsYXkoZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZCk6IFByb21pc2U8Q2FudmFzT3ZlcmxheT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5OiBHb29nbGVDYW52YXNPdmVybGF5ID0gbmV3IEdvb2dsZUNhbnZhc092ZXJsYXkoZHJhd0NhbGxiYWNrKTtcbiAgICAgICAgICAgIG92ZXJsYXkuU2V0TWFwKG1hcCk7XG4gICAgICAgICAgICByZXR1cm4gb3ZlcmxheTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIG1hcCBjbHVzdGVyIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElDbHVzdGVyT3B0aW9uc30uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlQ2x1c3RlckxheWVyKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVwZGF0ZU9wdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlckNsdXN0ZXJlcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIFtdLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGNsdXN0ZXJMYXllciA9IG5ldyBHb29nbGVNYXJrZXJDbHVzdGVyZXIobWFya2VyQ2x1c3RlcmVyKTtcbiAgICAgICAgICAgIGNvbnN0IG86IElDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBpZDogb3B0aW9ucy5pZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgby52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBvLmNsdXN0ZXJpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXBkYXRlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGNsdXN0ZXJMYXllci5TZXRPcHRpb25zKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJMYXllcjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbmZvcm1hdGlvbiB3aW5kb3cgZm9yIGEgbWFwIHBvc2l0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gW29wdGlvbnNdIC0gSW5mb3dpbmRvdyBvcHRpb25zLiBTZWUge0BsaW5rIElJbmZvV2luZG93T3B0aW9uc31cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgSW5mb1dpbmRvd30gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVJbmZvV2luZG93KG9wdGlvbnM/OiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPEdvb2dsZUluZm9XaW5kb3c+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVJbmZvV2luZG93T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGluZm9XaW5kb3c6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhvKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29vZ2xlSW5mb1dpbmRvdyhpbmZvV2luZG93LCB0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hcCBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJTGF5ZXJPcHRpb25zfVxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuTGF5ZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgIHJldHVybiBuZXcgR29vZ2xlTGF5ZXIobWFwLCB0aGlzLCBvcHRpb25zLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hcCBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIGVsIC0gSFRNTCBlbGVtZW50IHRvIGhvc3QgdGhlIG1hcC5cbiAgICAgKiBAcGFyYW0gbWFwT3B0aW9ucyAtIE1hcCBvcHRpb25zXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgbWFwIGhhcyBiZWVuIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBJTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLkxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFwcGx5IG1peGluc1xuICAgICAgICAgICAgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldygpO1xuICAgICAgICAgICAgTWl4aW5DYW52YXNPdmVybGF5KCk7XG5cbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgbWFwIHN0YXJ0dXBcbiAgICAgICAgICAgIGlmICghbWFwT3B0aW9ucy5tYXBUeXBlSWQgPT0gbnVsbCkgeyBtYXBPcHRpb25zLm1hcFR5cGVJZCA9IE1hcFR5cGVJZC5oeWJyaWQ7IH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwb3NlTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlT3B0aW9ucyhtYXBPcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbCwgbyk7XG4gICAgICAgICAgICBpZiAobWFwT3B0aW9ucy5ib3VuZHMpIHtcbiAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUJvdW5kcyhtYXBPcHRpb25zLmJvdW5kcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBtYXA7XG4gICAgICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIG1hcCBtYXJrZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxuICAgICAqXG4gICAgICogQHBhcmFtIFtvcHRpb25zPTxJTWFya2VyT3B0aW9ucz57fV0gLSBPcHRpb25zIGZvciB0aGUgbWFya2VyLiBTZWUge0BsaW5rIElNYXJrZXJPcHRpb25zfS5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTWFya2VyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5QdXNoUGluIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihvcHRpb25zOiBJTWFya2VyT3B0aW9ucyA9IDxJTWFya2VyT3B0aW9ucz57fSk6IFByb21pc2U8TWFya2VyPiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoeDogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucywgbWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApOiBHb29nbGVNYXJrZXIgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih4KTtcbiAgICAgICAgICAgIGNvbnN0IG0gPSBuZXcgR29vZ2xlTWFya2VyKG1hcmtlcik7XG4gICAgICAgICAgICBtLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XG4gICAgICAgICAgICBtLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IG0uTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmljb25JbmZvICYmIG9wdGlvbnMuaWNvbkluZm8ubWFya2VyVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uaWNvbiA9IHM7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8sIG1hcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0geC5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQobywgbWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQobywgbWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBHb29nbGUgTWFwIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5Z29uLiBTZWUge0BsaW5rIElQb2x5Z29uT3B0aW9uc30uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlnb259IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvKTtcbiAgICAgICAgICAgIHBvbHlnb24uc2V0TWFwKG1hcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHA6IEdvb2dsZVBvbHlnb24gPSBuZXcgR29vZ2xlUG9seWdvbihwb2x5Z29uKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xhYmVsICE9IG51bGwpIHsgcC5TaG93TGFiZWwgPSBvcHRpb25zLnNob3dMYWJlbDsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNYXhab29tICE9IG51bGwpIHsgcC5MYWJlbE1heFpvb20gPSBvcHRpb25zLmxhYmVsTWF4Wm9vbTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNaW5ab29tICE9IG51bGwpIHsgcC5MYWJlbE1pblpvb20gPSBvcHRpb25zLmxhYmVsTWluWm9vbTsgfVxuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwb2x5bGluZSB3aXRoaW4gdGhlIEdvb2dsZSBNYXAgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlsaW5lLiBTZWUge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5bGluZX0gb2JqZWN0IChvciBhbiBhcnJheSB0aGVyZWZvcmUgZm9yIGNvbXBsZXggcGF0aHMpXG4gICAgICogd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xuICAgICAgICBsZXQgcG9seWxpbmU6IEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aFswXSkpIHtcbiAgICAgICAgICAgICAgICBvLnBhdGggPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGgpWzBdO1xuICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG8pO1xuICAgICAgICAgICAgICAgIHBvbHlsaW5lLnNldE1hcChtYXApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seWxpbmUpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwbC5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHBsLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG8ucGF0aCA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG8pO1xuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZS5zZXRNYXAobWFwKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbCA9IG5ldyBHb29nbGVQb2x5bGluZShwb2x5bGluZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBwbC5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwbC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChwbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgbGF5ZXIgZnJvbSB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gTGF5ZXIgdG8gZGVsZXRlLiBTZWUge0BsaW5rIExheWVyfS4gVGhpcyBtZXRob2QgZXhwZWN0cyB0aGUgR29vZ2xlIHNwZWNpZmljIExheWVyIG1vZGVsIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIHdoZW4gdGhlIGxheWVyIGhhcyBiZWVuIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGVMYXllcihsYXllcjogTGF5ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gcmV0dXJuIHJlc29sdmVkIHByb21pc2UgYXMgdGhlcmUgaXMgbm8gY29uZXB0IG9mIGEgY3VzdG9tIGxheWVyIGluIEdvb2dsZS5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBEaXNwb3NlTWFwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWFwID09IG51bGwgJiYgdGhpcy5fbWFwSW5zdGFuY2UgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMuX21hcEluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHsgdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGNlbnRlclxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgY2VudGVyLiBTZWUge0BsaW5rIElMYXRMb25nfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldENlbnRlcigpOiBQcm9taXNlPElMYXRMb25nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIDxJTGF0TG9uZz57XG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGNlbnRlci5sYXQoKSxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGNlbnRlci5sbmcoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgYm91bmRpbmcgYm94XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgZ2VvIGxvY2F0aW9uIG9mIHRoZSBib3VuZGluZyBib3guIFNlZSB7QGxpbmsgSUJveH0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRCb3VuZHMoKTogUHJvbWlzZTxJQm94PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybiA8SUJveD57XG4gICAgICAgICAgICAgICAgbWF4TGF0aXR1ZGU6IGJveC5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgICAgICAgICAgICBtYXhMb25naXR1ZGU6IE1hdGgubWF4KGJveC5nZXROb3J0aEVhc3QoKS5sbmcoKSwgYm94LmdldFNvdXRoV2VzdCgpLmxuZygpKSxcbiAgICAgICAgICAgICAgICBtaW5MYXRpdHVkZTogYm94LmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZTogTWF0aC5taW4oYm94LmdldE5vcnRoRWFzdCgpLmxuZygpLCBib3guZ2V0U291dGhXZXN0KCkubG5nKCkpLFxuICAgICAgICAgICAgICAgIGNlbnRlcjogeyBsYXRpdHVkZTogYm94LmdldENlbnRlcigpLmxhdCgpLCBsb25naXR1ZGU6IGJveC5nZXRDZW50ZXIoKS5sbmcoKSB9LFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHpvb20gbGV2ZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRab29tKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IG1hcC5nZXRab29tKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLiBUaGlzIHByb21pc2UgcmVzb2x2ZXMgdG8gbnVsbFxuICAgICAqIGlmIHRoZSBnb2UgY29vcmRpbmF0ZXMgYXJlIG5vdCBpbiB0aGUgdmlldyBwb3J0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BvaW50KGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNyb3NzZXNEYXRlTGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobG9jKTtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBtLmdldFByb2plY3Rpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGgucG93KDIsIG0uZ2V0Wm9vbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICBpZiAoYi5nZXRDZW50ZXIoKS5sbmcoKSA8IGIuZ2V0U291dGhXZXN0KCkubG5nKCkgIHx8XG4gICAgICAgICAgICAgICAgYi5nZXRDZW50ZXIoKS5sbmcoKSA+IGIuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpIHsgY3Jvc3Nlc0RhdGVMaW5lID0gdHJ1ZTsgfVxuXG5cbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFk6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXROb3J0aEVhc3QoKSkueTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFg6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXRTb3V0aFdlc3QoKSkueDtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50OiBHb29nbGVNYXBUeXBlcy5Qb2ludCA9IHAuZnJvbUxhdExuZ1RvUG9pbnQobCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IE1hdGguZmxvb3IoKHBvaW50LnggLSBvZmZzZXRYICsgKChjcm9zc2VzRGF0ZUxpbmUgJiYgcG9pbnQueCA8IG9mZnNldFgpID8gMjU2IDogMCkpICogcyksXG4gICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigocG9pbnQueSAtIG9mZnNldFkpICogcylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGEgY29udmVyc2lvbiBvZiBnZW8gY29vcmRpbmF0ZXMgdG8gcGl4ZWxzIG9uIHRoZSBtYXAgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2MgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIHRvIHRyYW5zbGF0ZS5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYW4ge0BsaW5rIElQb2ludH0gaW50ZXJmYWNlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgcGl4ZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIExvY2F0aW9uc1RvUG9pbnRzKGxvY3M6IEFycmF5PElMYXRMb25nPik6IFByb21pc2U8QXJyYXk8SVBvaW50Pj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNyb3NzZXNEYXRlTGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgcCA9IG0uZ2V0UHJvamVjdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgczogbnVtYmVyID0gTWF0aC5wb3coMiwgbS5nZXRab29tKCkpO1xuICAgICAgICAgICAgY29uc3QgYjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzID0gbS5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIGlmIChiLmdldENlbnRlcigpLmxuZygpIDwgYi5nZXRTb3V0aFdlc3QoKS5sbmcoKSAgfHxcbiAgICAgICAgICAgICAgICBiLmdldENlbnRlcigpLmxuZygpID4gYi5nZXROb3J0aEVhc3QoKS5sbmcoKSkgeyBjcm9zc2VzRGF0ZUxpbmUgPSB0cnVlOyB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFg6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXRTb3V0aFdlc3QoKSkueDtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFk6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXROb3J0aEVhc3QoKSkueTtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsb2NzLm1hcChsbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbDE6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludDogR29vZ2xlTWFwVHlwZXMuUG9pbnQgPSBwLmZyb21MYXRMbmdUb1BvaW50KGwxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKChwb2ludC54IC0gb2Zmc2V0WCArICgoY3Jvc3Nlc0RhdGVMaW5lICYmIHBvaW50LnggPCBvZmZzZXRYKSA/IDI1NiA6IDApKSAqIHMpLFxuICAgICAgICAgICAgICAgICAgICB5OiBNYXRoLmZsb29yKChwb2ludC55IC0gb2Zmc2V0WSkgKiBzKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDZW50ZXJzIHRoZSBtYXAgb24gYSBnZW8gbG9jYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvQ29vcmRpbmF0ZXMgYXJvdW5kIHdoaWNoIHRvIGNlbnRlciB0aGUgbWFwLiBTZWUge0BsaW5rIElMYXRMb25nfVxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgY2VudGVyIG9wZXJhdGlvbnMgaGFzIGJlZW4gY29tcGxldGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0Q2VudGVyKGxhdExuZzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VudGVyOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRMbmcpO1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBnZW5lcmljIG1hcCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldE1hcE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oKG06IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBtLnNldE9wdGlvbnMobyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldFZpZXdPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJvdW5kcykge1xuICAgICAgICAgICAgICAgIG0uZml0Qm91bmRzKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUJvdW5kcyhvcHRpb25zLmJvdW5kcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBtLnNldE9wdGlvbnMobyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB6b29tIC0gWm9vbSBsZXZlbCB0byBzZXQuXG4gICAgICogQHJldHVybnMgLSBBIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIHpvb20gb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0Wm9vbSh6b29tOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gbWFwLnNldFpvb20oem9vbSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHR5cGUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFN1YnNjcmliZVRvTWFwRXZlbnQ8RT4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEU+IHtcbiAgICAgICAgY29uc3QgZ29vZ2xlRXZlbnROYW1lOiBzdHJpbmcgPSBHb29nbGVNYXBFdmVudHNMb29rdXBbZXZlbnROYW1lXTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGdvb2dsZUV2ZW50TmFtZSwgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZSBvbiB0aGUgbWFwIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFRyaWdnZXJNYXBFdmVudChldmVudE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG0pID0+IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobSwgZXZlbnROYW1lLCBudWxsKSk7XG4gICAgfVxuXG59XG4iXX0=