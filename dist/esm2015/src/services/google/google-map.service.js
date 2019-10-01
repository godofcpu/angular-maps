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
export class GoogleMapService {
    /**
     * Creates an instance of GoogleMapService.
     * \@memberof GoogleMapService
     * @param {?} _loader MapAPILoader instance implemented for Google Maps. This instance will generally be injected.
     * @param {?} _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    /**
     * Gets the Google Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof GoogleMapService
     * @return {?}
     */
    get MapInstance() { return this._mapInstance; }
    /**
     * Gets a Promise for a Google Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof GoogleMapService
     * @return {?}
     */
    get MapPromise() { return this._map; }
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof BingMapService
     * @return {?}
     */
    get MapSize() {
        if (this.MapInstance) {
            /** @type {?} */
            const el = this.MapInstance.getDiv();
            /** @type {?} */
            const s = { width: el.offsetWidth, height: el.offsetHeight };
            return s;
        }
        return null;
    }
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof GoogleMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    CreateCanvasOverlay(drawCallback) {
        return this._map.then((map) => {
            /** @type {?} */
            const overlay = new GoogleCanvasOverlay(drawCallback);
            overlay.SetMap(map);
            return overlay;
        });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    CreateClusterLayer(options) {
        return this._map.then((map) => {
            /** @type {?} */
            let updateOptions = false;
            /** @type {?} */
            const markerClusterer = new MarkerClusterer(map, [], options);
            /** @type {?} */
            const clusterLayer = new GoogleMarkerClusterer(markerClusterer);
            /** @type {?} */
            const o = {
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
    }
    /**
     * Creates an information window for a map position
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    CreateInfoWindow(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const o = GoogleConversions.TranslateInfoWindowOptions(options);
            /** @type {?} */
            const infoWindow = new google.maps.InfoWindow(o);
            return new GoogleInfoWindow(infoWindow, this);
        });
    }
    /**
     * Creates a map layer within the map context
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    CreateLayer(options) {
        return this._map.then((map) => {
            return new GoogleLayer(map, this, options.id);
        });
    }
    /**
     * Creates a map instance
     *
     * \@memberof GoogleMapService
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    CreateMap(el, mapOptions) {
        return this._loader.Load().then(() => {
            // apply mixins
            MixinMapLabelWithOverlayView();
            MixinCanvasOverlay();
            // execute map startup
            if (!mapOptions.mapTypeId == null) {
                mapOptions.mapTypeId = MapTypeId.hybrid;
            }
            if (this._mapInstance != null) {
                this.DisposeMap();
            }
            /** @type {?} */
            const o = GoogleConversions.TranslateOptions(mapOptions);
            /** @type {?} */
            const map = new google.maps.Map(el, o);
            if (mapOptions.bounds) {
                map.fitBounds(GoogleConversions.TranslateBounds(mapOptions.bounds));
            }
            this._mapInstance = map;
            this._mapResolver(map);
            return;
        });
    }
    /**
     * Creates a Google map marker within the map context
     *
     * \@memberof GoogleMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    CreateMarker(options = /** @type {?} */ ({})) {
        /** @type {?} */
        const payload = (x, map) => {
            /** @type {?} */
            const marker = new google.maps.Marker(x);
            /** @type {?} */
            const m = new GoogleMarker(marker);
            m.IsFirst = options.isFirst;
            m.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach((val, key) => m.Metadata.set(key, val));
            }
            marker.setMap(map);
            return m;
        };
        return this._map.then((map) => {
            /** @type {?} */
            const o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                const s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o, map);
                }
                else {
                    return s.then(x => {
                        o.icon = x.icon;
                        return payload(o, map);
                    });
                }
            }
            else {
                return payload(o, map);
            }
        });
    }
    /**
     * Creates a polygon within the Google Map map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    CreatePolygon(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const o = GoogleConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            const polygon = new google.maps.Polygon(o);
            polygon.setMap(map);
            /** @type {?} */
            const p = new GooglePolygon(polygon);
            if (options.metadata) {
                options.metadata.forEach((val, key) => p.Metadata.set(key, val));
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
    }
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
    CreatePolyline(options) {
        /** @type {?} */
        let polyline;
        return this._map.then((map) => {
            /** @type {?} */
            const o = GoogleConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                o.path = GoogleConversions.TranslatePaths(options.path)[0];
                polyline = new google.maps.Polyline(o);
                polyline.setMap(map);
                /** @type {?} */
                const pl = new GooglePolyline(polyline);
                if (options.metadata) {
                    options.metadata.forEach((val, key) => pl.Metadata.set(key, val));
                }
                if (options.title && options.title !== '') {
                    pl.Title = options.title;
                }
                if (options.showTooltip != null) {
                    pl.ShowTooltip = options.showTooltip;
                }
                return pl;
            }
            else {
                /** @type {?} */
                const paths = GoogleConversions.TranslatePaths(options.path);
                /** @type {?} */
                const lines = new Array();
                paths.forEach(p => {
                    o.path = p;
                    polyline = new google.maps.Polyline(o);
                    polyline.setMap(map);
                    /** @type {?} */
                    const pl = new GooglePolyline(polyline);
                    if (options.metadata) {
                        options.metadata.forEach((val, key) => pl.Metadata.set(key, val));
                    }
                    if (options.title && options.title !== '') {
                        pl.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        pl.ShowTooltip = options.showTooltip;
                    }
                    lines.push(pl);
                });
                return lines;
            }
        });
    }
    /**
     * Deletes a layer from the map.
     *
     * \@memberof GoogleMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Google specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        // return resolved promise as there is no conept of a custom layer in Google.
        return Promise.resolve();
    }
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof GoogleMapService
     * @return {?}
     */
    DisposeMap() {
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance = null;
            this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        }
    }
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GetCenter() {
        return this._map.then((map) => {
            /** @type {?} */
            const center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.lat(),
                longitude: center.lng()
            });
        });
    }
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the geo location of the bounding box. See {\@link IBox}.
     *
     */
    GetBounds() {
        return this._map.then((map) => {
            /** @type {?} */
            const box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorthEast().lat(),
                maxLongitude: Math.max(box.getNorthEast().lng(), box.getSouthWest().lng()),
                minLatitude: box.getSouthWest().lat(),
                minLongitude: Math.min(box.getNorthEast().lng(), box.getSouthWest().lng()),
                center: { latitude: box.getCenter().lat(), longitude: box.getCenter().lng() },
                padding: 0
            });
        });
    }
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GetZoom() {
        return this._map.then((map) => map.getZoom());
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof GoogleMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    LocationToPoint(loc) {
        return this._map.then((m) => {
            /** @type {?} */
            let crossesDateLine = false;
            /** @type {?} */
            const l = GoogleConversions.TranslateLocationObject(loc);
            /** @type {?} */
            const p = m.getProjection();
            /** @type {?} */
            const s = Math.pow(2, m.getZoom());
            /** @type {?} */
            const b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            /** @type {?} */
            const offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            /** @type {?} */
            const offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            /** @type {?} */
            const point = p.fromLatLngToPoint(l);
            return {
                x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                y: Math.floor((point.y - offsetY) * s)
            };
        });
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    LocationsToPoints(locs) {
        return this._map.then((m) => {
            /** @type {?} */
            let crossesDateLine = false;
            /** @type {?} */
            const p = m.getProjection();
            /** @type {?} */
            const s = Math.pow(2, m.getZoom());
            /** @type {?} */
            const b = m.getBounds();
            if (b.getCenter().lng() < b.getSouthWest().lng() ||
                b.getCenter().lng() > b.getNorthEast().lng()) {
                crossesDateLine = true;
            }
            /** @type {?} */
            const offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
            /** @type {?} */
            const offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
            /** @type {?} */
            const l = locs.map(ll => {
                /** @type {?} */
                const l1 = GoogleConversions.TranslateLocationObject(ll);
                /** @type {?} */
                const point = p.fromLatLngToPoint(l1);
                return {
                    x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
                    y: Math.floor((point.y - offsetY) * s)
                };
            });
            return l;
        });
    }
    /**
     * Centers the map on a geo location.
     *
     * \@memberof GoogleMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    SetCenter(latLng) {
        return this._map.then((map) => {
            /** @type {?} */
            const center = GoogleConversions.TranslateLocationObject(latLng);
            map.setCenter(center);
        });
    }
    /**
     * Sets the generic map options.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetMapOptions(options) {
        this._map.then((m) => {
            /** @type {?} */
            const o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the view options of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetViewOptions(options) {
        this._map.then((m) => {
            if (options.bounds) {
                m.fitBounds(GoogleConversions.TranslateBounds(options.bounds));
            }
            /** @type {?} */
            const o = GoogleConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof GoogleMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    SetZoom(zoom) {
        return this._map.then((map) => map.setZoom(zoom));
    }
    /**
     * Creates an event subscription
     *
     * \@memberof GoogleMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of type E that fires when the event occurs.
     *
     */
    SubscribeToMapEvent(eventName) {
        /** @type {?} */
        const googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._map.then((m) => {
                m.addListener(googleEventName, (e) => {
                    this._zone.run(() => observer.next(e));
                });
            });
        });
    }
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof GoogleMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    TriggerMapEvent(eventName) {
        return this._map.then((m) => google.maps.event.trigger(m, eventName, null));
    }
}
GoogleMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapService.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBYy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFJaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFZakYsTUFBTTs7Ozs7Ozs7SUEyREYsWUFB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IjpbImltcG9ydCB7IEdvb2dsZU1hcmtlckNsdXN0ZXJlciB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXInO1xuaW1wb3J0IHsgR29vZ2xlSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93JztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBBUElMb2FkZXIgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xuaW1wb3J0IHsgR29vZ2xlTWFwQVBJTG9hZGVyLCBHb29nbGVNYXBBUElMb2FkZXJDb25maWcgfSBmcm9tICcuL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXNpemUnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbGFiZWwnO1xuaW1wb3J0IHsgTWl4aW5DYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtY2FudmFzLW92ZXJsYXknO1xuaW1wb3J0IHsgR29vZ2xlQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWNhbnZhcy1vdmVybGF5JztcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBHb29nbGVQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbic7XG5pbXBvcnQgeyBHb29nbGVQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLXBvbHlsaW5lJztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcbmltcG9ydCB7IEdvb2dsZUxheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbGF5ZXInO1xuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWJveCc7XG5pbXBvcnQgeyBHb29nbGVNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1ldmVudHMtbG9va3VwJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XG5cbmRlY2xhcmUgY29uc3QgZ29vZ2xlOiBhbnk7XG5kZWNsYXJlIGNvbnN0IE1hcmtlckNsdXN0ZXJlcjogYW55O1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXBTZXJ2aWNlIGFic3RyYWN0IGltcGxlbWVudGluZyBhIEdvb2dsZSBNYXBzIHByb3ZpZGVyXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwU2VydmljZSBpbXBsZW1lbnRzIE1hcFNlcnZpY2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIERlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD47XG4gICAgcHJpdmF0ZSBfbWFwSW5zdGFuY2U6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcDtcbiAgICBwcml2YXRlIF9tYXBSZXNvbHZlcjogKHZhbHVlPzogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgX2NvbmZpZzogR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IERlZmluaXRpb25zXG4gICAgLy8vXG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvblxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE1hcEluc3RhbmNlKCk6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCB7IHJldHVybiB0aGlzLl9tYXBJbnN0YW5jZTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIFByb21pc2UgZm9yIGEgR29vZ2xlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uLiBVc2UgdGhpcyBpbnN0ZWFkIG9mIHtAbGluayBNYXBJbnN0YW5jZX0gaWYgeW91XG4gICAgICogYXJlIG5vdCBzdXJlIGlmIGFuZCB3aGVuIHRoZSBpbnN0YW5jZSB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+IHsgcmV0dXJuIHRoaXMuX21hcDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGdldCBNYXBTaXplKCk6IElTaXplIHtcbiAgICAgICAgaWYgKHRoaXMuTWFwSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsOiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuTWFwSW5zdGFuY2UuZ2V0RGl2KCk7XG4gICAgICAgICAgICBjb25zdCBzOiBJU2l6ZSA9IHsgd2lkdGg6IGVsLm9mZnNldFdpZHRoLCBoZWlnaHQ6IGVsLm9mZnNldEhlaWdodCB9O1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZU1hcFNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9sb2FkZXIgTWFwQVBJTG9hZGVyIGluc3RhbmNlIGltcGxlbWVudGVkIGZvciBHb29nbGUgTWFwcy4gVGhpcyBpbnN0YW5jZSB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKiBAcGFyYW0gX3pvbmUgTmdab25lIG9iamVjdCB0byBlbmFibGUgem9uZSBhd2FyZSBwcm9taXNlcy4gVGhpcyB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+KFxuICAgICAgICAgICAgKHJlc29sdmU6IChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gKDxHb29nbGVNYXBBUElMb2FkZXI+dGhpcy5fbG9hZGVyKS5Db25maWc7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhcyBvdmVybGF5IGxheWVyIHRvIHBlcmZvcm0gY3VzdG9tIGRyYXdpbmcgb3ZlciB0aGUgbWFwIHdpdGggb3V0XG4gICAgICogc29tZSBvZiB0aGUgb3ZlcmhlYWQgYXNzb2NpYXRlZCB3aXRoIGdvaW5nIHRocm91Z2ggdGhlIE1hcCBvYmplY3RzLlxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIENhbnZhc092ZXJsYXl9IG9iamVjdC5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjazogKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpID0+IHZvaWQpOiBQcm9taXNlPENhbnZhc092ZXJsYXk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheTogR29vZ2xlQ2FudmFzT3ZlcmxheSA9IG5ldyBHb29nbGVDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjayk7XG4gICAgICAgICAgICBvdmVybGF5LlNldE1hcChtYXApO1xuICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQ3JlYXRlcyBhIEdvb2dsZSBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJQ2x1c3Rlck9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJMYXllcihvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBtYXJrZXJDbHVzdGVyZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlckNsdXN0ZXJlciA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCBbXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBjbHVzdGVyTGF5ZXIgPSBuZXcgR29vZ2xlTWFya2VyQ2x1c3RlcmVyKG1hcmtlckNsdXN0ZXJlcik7XG4gICAgICAgICAgICBjb25zdCBvOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IG9wdGlvbnMuaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIG8udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgby5jbHVzdGVyaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9wdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjbHVzdGVyTGF5ZXIuU2V0T3B0aW9ucyhvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjbHVzdGVyTGF5ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5mb3JtYXRpb24gd2luZG93IGZvciBhIG1hcCBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIFtvcHRpb25zXSAtIEluZm93aW5kb3cgb3B0aW9ucy4gU2VlIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9XG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIEluZm9XaW5kb3d9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkluZm9ib3ggb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zPzogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxHb29nbGVJbmZvV2luZG93PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBpbmZvV2luZG93OiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3cobyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvb2dsZUluZm9XaW5kb3coaW5mb1dpbmRvdywgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUxheWVyT3B0aW9uc31cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIE1pY3Jvc29mdC5NYXBzLkxheWVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgICByZXR1cm4gbmV3IEdvb2dsZUxheWVyKG1hcCwgdGhpcywgb3B0aW9ucy5pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcCBoYXMgYmVlbiBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFwKGVsOiBIVE1MRWxlbWVudCwgbWFwT3B0aW9uczogSU1hcE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5Mb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBhcHBseSBtaXhpbnNcbiAgICAgICAgICAgIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKTtcbiAgICAgICAgICAgIE1peGluQ2FudmFzT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICAvLyBleGVjdXRlIG1hcCBzdGFydHVwXG4gICAgICAgICAgICBpZiAoIW1hcE9wdGlvbnMubWFwVHlwZUlkID09IG51bGwpIHsgbWFwT3B0aW9ucy5tYXBUeXBlSWQgPSBNYXBUeXBlSWQuaHlicmlkOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwSW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuRGlzcG9zZU1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMobWFwT3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWwsIG8pO1xuICAgICAgICAgICAgaWYgKG1hcE9wdGlvbnMuYm91bmRzKSB7XG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVCb3VuZHMobWFwT3B0aW9ucy5ib3VuZHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21hcEluc3RhbmNlID0gbWFwO1xuICAgICAgICAgICAgdGhpcy5fbWFwUmVzb2x2ZXIobWFwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdvb2dsZSBtYXAgbWFya2VyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBbb3B0aW9ucz08SU1hcmtlck9wdGlvbnM+e31dIC0gT3B0aW9ucyBmb3IgdGhlIG1hcmtlci4gU2VlIHtAbGluayBJTWFya2VyT3B0aW9uc30uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIE1hcmtlcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuUHVzaFBpbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXIob3B0aW9uczogSU1hcmtlck9wdGlvbnMgPSA8SU1hcmtlck9wdGlvbnM+e30pOiBQcm9taXNlPE1hcmtlcj4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gKHg6IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMsIG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKTogR29vZ2xlTWFya2VyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoeCk7XG4gICAgICAgICAgICBjb25zdCBtID0gbmV3IEdvb2dsZU1hcmtlcihtYXJrZXIpO1xuICAgICAgICAgICAgbS5Jc0ZpcnN0ID0gb3B0aW9ucy5pc0ZpcnN0O1xuICAgICAgICAgICAgbS5Jc0xhc3QgPSBvcHRpb25zLmlzTGFzdDtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtLk1ldGFkYXRhLnNldChrZXksIHZhbCkpOyB9XG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gTWFya2VyLkNyZWF0ZU1hcmtlcihvcHRpb25zLmljb25JbmZvKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBvLmljb24gPSBzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZChvLCBtYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uaWNvbiA9IHguaWNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8sIG1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8sIG1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwb2x5Z29uIHdpdGhpbiB0aGUgR29vZ2xlIE1hcCBtYXAgY29udGV4dFxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWdvbi4gU2VlIHtAbGluayBJUG9seWdvbk9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5Z29ufSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24ob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlnb24obyk7XG4gICAgICAgICAgICBwb2x5Z29uLnNldE1hcChtYXApO1xuXG4gICAgICAgICAgICBjb25zdCBwOiBHb29nbGVQb2x5Z29uID0gbmV3IEdvb2dsZVBvbHlnb24ocG9seWdvbik7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gcC5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dMYWJlbCAhPSBudWxsKSB7IHAuU2hvd0xhYmVsID0gb3B0aW9ucy5zaG93TGFiZWw7IH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWF4Wm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNYXhab29tID0gb3B0aW9ucy5sYWJlbE1heFpvb207IH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxhYmVsTWluWm9vbSAhPSBudWxsKSB7IHAuTGFiZWxNaW5ab29tID0gb3B0aW9ucy5sYWJlbE1pblpvb207IH1cbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcG9seWxpbmUgd2l0aGluIHRoZSBHb29nbGUgTWFwIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5bGluZS4gU2VlIHtAbGluayBJUG9seWxpbmVPcHRpb25zfS5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWxpbmV9IG9iamVjdCAob3IgYW4gYXJyYXkgdGhlcmVmb3JlIGZvciBjb21wbGV4IHBhdGhzKVxuICAgICAqIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWxpbmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgbGV0IHBvbHlsaW5lOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aCAmJiBvcHRpb25zLnBhdGgubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhbMF0pKSB7XG4gICAgICAgICAgICAgICAgby5wYXRoID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRoKVswXTtcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvKTtcbiAgICAgICAgICAgICAgICBwb2x5bGluZS5zZXRNYXAobWFwKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBsID0gbmV3IEdvb2dsZVBvbHlsaW5lKHBvbHlsaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gcGwuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBsLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhzOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvLnBhdGggPSBwO1xuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvKTtcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUuc2V0TWFwKG1hcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGwgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seWxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gcGwuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcGwuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgcGwuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIExheWVyIHRvIGRlbGV0ZS4gU2VlIHtAbGluayBMYXllcn0uIFRoaXMgbWV0aG9kIGV4cGVjdHMgdGhlIEdvb2dsZSBzcGVjaWZpYyBMYXllciBtb2RlbCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlTGF5ZXIobGF5ZXI6IExheWVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIHJldHVybiByZXNvbHZlZCBwcm9taXNlIGFzIHRoZXJlIGlzIG5vIGNvbmVwdCBvZiBhIGN1c3RvbSBsYXllciBpbiBHb29nbGUuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwYW9zZSB0aGUgbWFwIGFuZCBhc3NvY2lhdGVkIHJlc291cmVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgRGlzcG9zZU1hcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCA9PSBudWxsICYmIHRoaXMuX21hcEluc3RhbmNlID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBJbnN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgUHJvbWlzZTxHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXA+KChyZXNvbHZlOiAoKSA9PiB2b2lkKSA9PiB7IHRoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBjZW50ZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGNlbnRlci4gU2VlIHtAbGluayBJTGF0TG9uZ30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRDZW50ZXIoKTogUHJvbWlzZTxJTGF0TG9uZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIHJldHVybiA8SUxhdExvbmc+e1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjZW50ZXIubGF0KCksXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjZW50ZXIubG5nKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGJvdW5kaW5nIGJveFxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdlbyBsb2NhdGlvbiBvZiB0aGUgYm91bmRpbmcgYm94LiBTZWUge0BsaW5rIElCb3h9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0Qm91bmRzKCk6IFByb21pc2U8SUJveD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBtYXAuZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm4gPElCb3g+e1xuICAgICAgICAgICAgICAgIG1heExhdGl0dWRlOiBib3guZ2V0Tm9ydGhFYXN0KCkubGF0KCksXG4gICAgICAgICAgICAgICAgbWF4TG9uZ2l0dWRlOiBNYXRoLm1heChib3guZ2V0Tm9ydGhFYXN0KCkubG5nKCksIGJveC5nZXRTb3V0aFdlc3QoKS5sbmcoKSksXG4gICAgICAgICAgICAgICAgbWluTGF0aXR1ZGU6IGJveC5nZXRTb3V0aFdlc3QoKS5sYXQoKSxcbiAgICAgICAgICAgICAgICBtaW5Mb25naXR1ZGU6IE1hdGgubWluKGJveC5nZXROb3J0aEVhc3QoKS5sbmcoKSwgYm94LmdldFNvdXRoV2VzdCgpLmxuZygpKSxcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0aXR1ZGU6IGJveC5nZXRDZW50ZXIoKS5sYXQoKSwgbG9uZ2l0dWRlOiBib3guZ2V0Q2VudGVyKCkubG5nKCkgfSxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiBtYXAuZ2V0Wm9vbSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy4gVGhpcyBwcm9taXNlIHJlc29sdmVzIHRvIG51bGxcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIExvY2F0aW9uVG9Qb2ludChsb2M6IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxvYyk7XG4gICAgICAgICAgICBjb25zdCBwID0gbS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnBvdygyLCBtLmdldFpvb20oKSk7XG4gICAgICAgICAgICBjb25zdCBiOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHMgPSBtLmdldEJvdW5kcygpO1xuICAgICAgICAgICAgaWYgKGIuZ2V0Q2VudGVyKCkubG5nKCkgPCBiLmdldFNvdXRoV2VzdCgpLmxuZygpICB8fFxuICAgICAgICAgICAgICAgIGIuZ2V0Q2VudGVyKCkubG5nKCkgPiBiLmdldE5vcnRoRWFzdCgpLmxuZygpKSB7IGNyb3NzZXNEYXRlTGluZSA9IHRydWU7IH1cblxuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0Tm9ydGhFYXN0KCkpLnk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0U291dGhXZXN0KCkpLng7XG4gICAgICAgICAgICBjb25zdCBwb2ludDogR29vZ2xlTWFwVHlwZXMuUG9pbnQgPSBwLmZyb21MYXRMbmdUb1BvaW50KGwpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKChwb2ludC54IC0gb2Zmc2V0WCArICgoY3Jvc3Nlc0RhdGVMaW5lICYmIHBvaW50LnggPCBvZmZzZXRYKSA/IDI1NiA6IDApKSAqIHMpLFxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IoKHBvaW50LnkgLSBvZmZzZXRZKSAqIHMpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBMb2NhdGlvbnNUb1BvaW50cyhsb2NzOiBBcnJheTxJTGF0TG9uZz4pOiBQcm9taXNlPEFycmF5PElQb2ludD4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGxldCBjcm9zc2VzRGF0ZUxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBtLmdldFByb2plY3Rpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHM6IG51bWJlciA9IE1hdGgucG93KDIsIG0uZ2V0Wm9vbSgpKTtcbiAgICAgICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XG4gICAgICAgICAgICBpZiAoYi5nZXRDZW50ZXIoKS5sbmcoKSA8IGIuZ2V0U291dGhXZXN0KCkubG5nKCkgIHx8XG4gICAgICAgICAgICAgICAgYi5nZXRDZW50ZXIoKS5sbmcoKSA+IGIuZ2V0Tm9ydGhFYXN0KCkubG5nKCkpIHsgY3Jvc3Nlc0RhdGVMaW5lID0gdHJ1ZTsgfVxuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRYOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0U291dGhXZXN0KCkpLng7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRZOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0Tm9ydGhFYXN0KCkpLnk7XG4gICAgICAgICAgICBjb25zdCBsID0gbG9jcy5tYXAobGwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwxOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gcC5mcm9tTGF0TG5nVG9Qb2ludChsMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcigocG9pbnQueCAtIG9mZnNldFggKyAoKGNyb3NzZXNEYXRlTGluZSAmJiBwb2ludC54IDwgb2Zmc2V0WCkgPyAyNTYgOiAwKSkgKiBzKSxcbiAgICAgICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcigocG9pbnQueSAtIG9mZnNldFkpICogcylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgbWFwIG9uIGEgZ2VvIGxvY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlb0Nvb3JkaW5hdGVzIGFyb3VuZCB3aGljaCB0byBjZW50ZXIgdGhlIG1hcC4gU2VlIHtAbGluayBJTGF0TG9uZ31cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGNlbnRlciBvcGVyYXRpb25zIGhhcyBiZWVuIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldENlbnRlcihsYXRMbmc6IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0TG5nKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIoY2VudGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZ2VuZXJpYyBtYXAgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgbS5zZXRPcHRpb25zKG8pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2aWV3IG9wdGlvbnMgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ib3VuZHMpIHtcbiAgICAgICAgICAgICAgICBtLmZpdEJvdW5kcyhHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVCb3VuZHMob3B0aW9ucy5ib3VuZHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgbS5zZXRPcHRpb25zKG8pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gem9vbSAtIFpvb20gbGV2ZWwgdG8gc2V0LlxuICAgICAqIEByZXR1cm5zIC0gQSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSB6b29tIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApID0+IG1hcC5zZXRab29tKHpvb20pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoZS5nLiAnY2xpY2snKVxuICAgICAqIEByZXR1cm5zIC0gQW4gb2JzZXJ2YWJsZSBvZiB0eXBlIEUgdGhhdCBmaXJlcyB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPiB7XG4gICAgICAgIGNvbnN0IGdvb2dsZUV2ZW50TmFtZTogc3RyaW5nID0gR29vZ2xlTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEU+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXAudGhlbigobTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgbS5hZGRMaXN0ZW5lcihnb29nbGVFdmVudE5hbWUsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgdGhlIGdpdmVuIGV2ZW50IG5hbWUgb24gdGhlIG1hcCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBFdmVudCB0byB0cmlnZ2VyLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCBvbmNlIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBUcmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtKSA9PiBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG0sIGV2ZW50TmFtZSwgbnVsbCkpO1xuICAgIH1cblxufVxuIl19