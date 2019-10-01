/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapAPILoader } from '../mapapiloader';
import { BingConversions } from './bing-conversions';
import { Marker } from '../../models/marker';
import { BingMarker } from '../../models/bing/bing-marker';
import { BingLayer } from '../../models/bing/bing-layer';
import { BingClusterLayer } from '../../models/bing/bing-cluster-layer';
import { BingInfoWindow } from '../../models/bing/bing-info-window';
import { BingPolygon } from '../../models/bing/bing-polygon';
import { BingPolyline } from '../../models/bing/bing-polyline';
import { MixinMapLabelWithOverlayView } from '../../models/bing/bing-label';
import { MixinCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingCanvasOverlay } from '../../models/bing/bing-canvas-overlay';
import { BingMapEventsLookup } from '../../models/bing/bing-events-lookup';
/**
 * Concrete implementation of the MapService abstract implementing a Bin Map V8 provider
 *
 * @export
 */
export class BingMapService {
    /**
     * Creates an instance of BingMapService.
     * \@memberof BingMapService
     * @param {?} _loader MapAPILoader instance implemented for Bing Maps. This instance will generally be injected.
     * @param {?} _zone NgZone object to enable zone aware promises. This will generally be injected.
     *
     */
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._modules = new Map();
        this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        this._config = (/** @type {?} */ (this._loader)).Config;
    }
    /**
     * Gets an array of loaded Bong modules.
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get LoadedModules() { return this._modules; }
    /**
     * Gets the Bing Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof BingMapService
     * @return {?}
     */
    get MapInstance() { return this._mapInstance; }
    /**
     * Gets a Promise for a Bing Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof BingMapService
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
            const s = { width: this.MapInstance.getWidth(), height: this.MapInstance.getHeight() };
            return s;
        }
        return null;
    }
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof BingMapService
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    CreateCanvasOverlay(drawCallback) {
        return this._map.then((map) => {
            /** @type {?} */
            const overlay = new BingCanvasOverlay(drawCallback);
            map.layers.insert(overlay);
            return overlay;
        });
    }
    /**
     * Creates a Bing map cluster layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.ClusterLayer object.
     *
     */
    CreateClusterLayer(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const p = new Promise(resolve => {
                this.LoadModule('Microsoft.Maps.Clustering', () => {
                    /** @type {?} */
                    const o = BingConversions.TranslateClusterOptions(options);
                    /** @type {?} */
                    const layer = new Microsoft.Maps.ClusterLayer(new Array(), o);
                    /** @type {?} */
                    let bl;
                    map.layers.insert(layer);
                    bl = new BingClusterLayer(layer, this);
                    bl.SetOptions(options);
                    resolve(bl);
                });
            });
            return p;
        });
    }
    /**
     * Creates an information window for a map position
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying Microsoft.Maps.Infobox object.
     *
     */
    CreateInfoWindow(options) {
        return this._map.then((map) => {
            /** @type {?} */
            let loc;
            if (options.position == null) {
                loc = map.getCenter();
            }
            else {
                loc = new Microsoft.Maps.Location(options.position.latitude, options.position.longitude);
            }
            /** @type {?} */
            const infoBox = new Microsoft.Maps.Infobox(loc, BingConversions.TranslateInfoBoxOptions(options));
            infoBox.setMap(map);
            return new BingInfoWindow(infoBox);
        });
    }
    /**
     * Creates a map layer within the map context
     *
     * \@memberof BingMapService
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying Microsoft.Maps.Layer object.
     *
     */
    CreateLayer(options) {
        return this._map.then((map) => {
            /** @type {?} */
            const layer = new Microsoft.Maps.Layer(options.id.toString());
            map.layers.insert(layer);
            return new BingLayer(layer, this);
        });
    }
    /**
     * Creates a map instance
     *
     * \@memberof BingMapService
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
            // map startup...
            if (this._mapInstance != null) {
                this.DisposeMap();
            }
            /** @type {?} */
            const o = BingConversions.TranslateLoadOptions(mapOptions);
            if (!o.credentials) {
                o.credentials = this._config.apiKey;
            }
            /** @type {?} */
            const map = new Microsoft.Maps.Map(el, o);
            this._mapInstance = map;
            this._mapResolver(map);
        });
    }
    /**
     * Creates a Bing map marker within the map context
     *
     * \@memberof BingMapService
     * @param {?=} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying Microsoft.Maps.PushPin object.
     *
     */
    CreateMarker(options = /** @type {?} */ ({})) {
        /** @type {?} */
        const payload = (icon, map) => {
            /** @type {?} */
            const loc = BingConversions.TranslateLocation(options.position);
            /** @type {?} */
            const o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            /** @type {?} */
            const pushpin = new Microsoft.Maps.Pushpin(loc, o);
            /** @type {?} */
            const marker = new BingMarker(pushpin, map, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => marker.Metadata.set(k, v));
            }
            map.entities.push(pushpin);
            return marker;
        };
        return this._map.then((map) => {
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                const s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, map));
                }
                else {
                    return s.then(x => {
                        return (payload(x.icon, map));
                    });
                }
            }
            else {
                return (payload(null, map));
            }
        });
    }
    /**
     * Creates a polygon within the Bing Maps V8 map context
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
            const locs = BingConversions.TranslatePaths(options.paths);
            /** @type {?} */
            const o = BingConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            const poly = new Microsoft.Maps.Polygon(locs, o);
            map.entities.push(poly);
            /** @type {?} */
            const p = new BingPolygon(poly, this, null);
            if (options.metadata) {
                options.metadata.forEach((v, k) => p.Metadata.set(k, v));
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
            if (options.editable) {
                p.SetEditable(options.editable);
            }
            return p;
        });
    }
    /**
     * Creates a polyline within the Bing Maps V8 map context
     *
     * @abstract
     * \@memberof MapService
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polygon.
     *
     */
    CreatePolyline(options) {
        /** @type {?} */
        let polyline;
        return this._map.then((map) => {
            /** @type {?} */
            const o = BingConversions.TranslatePolylineOptions(options);
            /** @type {?} */
            const locs = BingConversions.TranslatePaths(options.path);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                map.entities.push(polyline);
                /** @type {?} */
                const pl = new BingPolyline(polyline, map, null);
                if (options.metadata) {
                    options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
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
                const lines = new Array();
                locs.forEach(p => {
                    polyline = new Microsoft.Maps.Polyline(p, o);
                    map.entities.push(polyline);
                    /** @type {?} */
                    const pl = new BingPolyline(polyline, map, null);
                    if (options.metadata) {
                        options.metadata.forEach((v, k) => pl.Metadata.set(k, v));
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
     * \@memberof BingMapService
     * @param {?} layer - Layer to delete. See {\@link Layer}. This method expects the Bing specific Layer model implementation.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        return this._map.then((map) => {
            map.layers.remove(layer.NativePrimitve);
        });
    }
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof BingMapService
     * @return {?}
     */
    DisposeMap() {
        if (this._map == null && this._mapInstance == null) {
            return;
        }
        if (this._mapInstance != null) {
            this._mapInstance.dispose();
            this._mapInstance = null;
            this._map = new Promise((resolve) => { this._mapResolver = resolve; });
        }
    }
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    GetCenter() {
        return this._map.then((map) => {
            /** @type {?} */
            const center = map.getCenter();
            return /** @type {?} */ ({
                latitude: center.latitude,
                longitude: center.longitude
            });
        });
    }
    /**
     * Gets the geo coordinates of the map bounding box
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the goe location of the bounding box. See {\@link IBox}.
     *
     */
    GetBounds() {
        return this._map.then((map) => {
            /** @type {?} */
            const box = map.getBounds();
            return /** @type {?} */ ({
                maxLatitude: box.getNorth(),
                maxLongitude: box.crossesInternationalDateLine() ? box.getWest() : box.getEast(),
                minLatitude: box.getSouth(),
                minLongitude: box.crossesInternationalDateLine() ? box.getEast() : box.getWest(),
                center: { latitude: box.center.latitude, longitude: box.center.longitude },
                padding: 0
            });
        });
    }
    /**
     * Gets a shared or private instance of the map drawing tools.
     *
     * \@memberof BingMapService
     * @param {?=} useSharedInstance
     * @return {?} - Promise that when resolved containst an instance of the drawing tools.
     */
    GetDrawingTools(useSharedInstance = true) {
        return new Promise((resolve, reject) => {
            this.LoadModuleInstance('Microsoft.Maps.DrawingTools', useSharedInstance).then((o) => {
                resolve(o);
            });
        });
    }
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof BingMapService
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    GetZoom() {
        return this._map.then((map) => map.getZoom());
    }
    /**
     * Loads a module into the Map.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?} callback - Callback to call once loading is complete.
     * @return {?}
     */
    LoadModule(moduleName, callback) {
        if (this._modules.has(moduleName)) {
            callback();
        }
        else {
            Microsoft.Maps.loadModule(moduleName, () => {
                this._modules.set(moduleName, null);
                callback();
            });
        }
    }
    /**
     * Loads a module into the Map and delivers and instance of the module payload.
     *
     * \@method
     * \@memberof BingMapService
     * @param {?} moduleName - The module to load.
     * @param {?=} useSharedInstance
     * @return {?}
     */
    LoadModuleInstance(moduleName, useSharedInstance = true) {
        /** @type {?} */
        const s = moduleName.substr(moduleName.lastIndexOf('.') + 1);
        if (this._modules.has(moduleName)) {
            /** @type {?} */
            let o = null;
            if (!useSharedInstance) {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
            }
            else if (this._modules.get(moduleName) != null) {
                o = this._modules.get(moduleName);
            }
            else {
                o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                this._modules.set(moduleName, o);
            }
            return Promise.resolve(o);
        }
        else {
            return new Promise((resolve, reject) => {
                try {
                    Microsoft.Maps.loadModule(moduleName, () => {
                        /** @type {?} */
                        const o = new (/** @type {?} */ (Microsoft.Maps))[s](this._mapInstance);
                        if (useSharedInstance) {
                            this._modules.set(moduleName, o);
                        }
                        else {
                            this._modules.set(moduleName, null);
                        }
                        resolve(o);
                    });
                }
                catch (e) {
                    reject('Could not load module or create instance.');
                }
            });
        }
    }
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof BingMapService
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    LocationToPoint(loc) {
        return this._map.then((m) => {
            /** @type {?} */
            const l = BingConversions.TranslateLocation(loc);
            /** @type {?} */
            const p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            if (p != null) {
                return { x: p.x, y: p.y };
            }
            return null;
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
            const l = locs.map(loc => BingConversions.TranslateLocation(loc));
            /** @type {?} */
            const p = /** @type {?} */ (m.tryLocationToPixel(l, Microsoft.Maps.PixelReference.control));
            return p ? p : new Array();
        });
    }
    /**
     * Centers the map on a geo location.
     *
     * \@memberof BingMapService
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    SetCenter(latLng) {
        return this._map.then((map) => map.setView({
            center: BingConversions.TranslateLocation(latLng)
        }));
    }
    /**
     * Sets the generic map options.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetMapOptions(options) {
        this._map.then((m) => {
            /** @type {?} */
            const o = BingConversions.TranslateOptions(options);
            m.setOptions(o);
        });
    }
    /**
     * Sets the view options of the map.
     *
     * \@memberof BingMapService
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    SetViewOptions(options) {
        this._map.then((m) => {
            /** @type {?} */
            const o = BingConversions.TranslateViewOptions(options);
            m.setView(o);
        });
    }
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof BingMapService
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    SetZoom(zoom) {
        return this._map.then((map) => map.setView({
            zoom: zoom
        }));
    }
    /**
     * Creates an event subscription
     *
     * \@memberof BingMapService
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    SubscribeToMapEvent(eventName) {
        /** @type {?} */
        const eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._map.then((m) => {
                Microsoft.Maps.Events.addHandler(m, eventNameTranslated, (e) => {
                    this._zone.run(() => observer.next(e));
                });
            });
        });
    }
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof BingMapService
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    TriggerMapEvent(eventName) {
        return this._map.then((m) => Microsoft.Maps.Events.invoke(m, eventName, null));
    }
}
BingMapService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapService.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    BingMapService.prototype._map;
    /** @type {?} */
    BingMapService.prototype._mapInstance;
    /** @type {?} */
    BingMapService.prototype._mapResolver;
    /** @type {?} */
    BingMapService.prototype._config;
    /** @type {?} */
    BingMapService.prototype._modules;
    /** @type {?} */
    BingMapService.prototype._loader;
    /** @type {?} */
    BingMapService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBWSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFLN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQWUxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBUTNFLE1BQU07Ozs7Ozs7O0lBaUVGLFlBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFB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QixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQSxPQUFPLENBQUMsSUFBWTtRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzNELElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0QsbUJBQW1CLENBQUksU0FBaUI7O1FBQzNDLE1BQU0sbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFxQixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFxQixFQUFFLEVBQUU7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQSxlQUFlLENBQUMsU0FBaUI7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7O1lBdmpCdEYsVUFBVTs7OztZQXZDRixZQUFZO1lBSkEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEFQSUxvYWRlciB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XG5pbXBvcnQgeyBCaW5nTWFwQVBJTG9hZGVyLCBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi9iaW5nLW1hcC5hcGktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZm8td2luZG93JztcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBCaW5nTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWxheWVyJztcbmltcG9ydCB7IEJpbmdDbHVzdGVyTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWNsdXN0ZXItbGF5ZXInO1xuaW1wb3J0IHsgQmluZ0luZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93JztcbmltcG9ydCB7IEJpbmdQb2x5Z29uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1wb2x5Z29uJztcbmltcG9ydCB7IEJpbmdQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWxpbmUnO1xuaW1wb3J0IHsgTWl4aW5NYXBMYWJlbFdpdGhPdmVybGF5VmlldyB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbGFiZWwnO1xuaW1wb3J0IHsgTWl4aW5DYW52YXNPdmVybGF5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1jYW52YXMtb3ZlcmxheSc7XG5pbXBvcnQgeyBCaW5nQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctY2FudmFzLW92ZXJsYXknO1xuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uLy4uL21vZGVscy9jYW52YXMtb3ZlcmxheSc7XG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSVNpemUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lzaXplJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBJQm94IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pYm94JztcblxuaW1wb3J0IHsgQmluZ01hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctZXZlbnRzLWxvb2t1cCc7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIE1hcFNlcnZpY2UgYWJzdHJhY3QgaW1wbGVtZW50aW5nIGEgQmluIE1hcCBWOCBwcm92aWRlclxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmdNYXBTZXJ2aWNlIGltcGxlbWVudHMgTWFwU2VydmljZSB7XG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIERlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPE1pY3Jvc29mdC5NYXBzLk1hcD47XG4gICAgcHJpdmF0ZSBfbWFwSW5zdGFuY2U6IE1pY3Jvc29mdC5NYXBzLk1hcDtcbiAgICBwcml2YXRlIF9tYXBSZXNvbHZlcjogKHZhbHVlPzogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgX2NvbmZpZzogQmluZ01hcEFQSUxvYWRlckNvbmZpZztcbiAgICBwcml2YXRlIF9tb2R1bGVzOiBNYXA8c3RyaW5nLCBPYmplY3Q+ID0gbmV3IE1hcDxzdHJpbmcsIE9iamVjdD4oKTtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBEZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBhcnJheSBvZiBsb2FkZWQgQm9uZyBtb2R1bGVzLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGdldCBMb2FkZWRNb2R1bGVzKCk6IE1hcDxzdHJpbmcsIE9iamVjdD4geyByZXR1cm4gdGhpcy5fbW9kdWxlczsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQmluZyBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvblxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGdldCBNYXBJbnN0YW5jZSgpOiBNaWNyb3NvZnQuTWFwcy5NYXAgeyByZXR1cm4gdGhpcy5fbWFwSW5zdGFuY2U7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBQcm9taXNlIGZvciBhIEJpbmcgTWFwIGNvbnRyb2wgaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgaW1wbGVtZW50YXRpb24uIFVzZSB0aGlzIGluc3RlYWQgb2Yge0BsaW5rIE1hcEluc3RhbmNlfSBpZiB5b3VcbiAgICAgKiBhcmUgbm90IHN1cmUgaWYgYW5kIHdoZW4gdGhlIGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZC5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5NYXA+IHsgcmV0dXJuIHRoaXMuX21hcDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGdldCBNYXBTaXplKCk6IElTaXplIHtcbiAgICAgICAgaWYgKHRoaXMuTWFwSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHM6IElTaXplID0geyB3aWR0aDogdGhpcy5NYXBJbnN0YW5jZS5nZXRXaWR0aCgpLCBoZWlnaHQ6IHRoaXMuTWFwSW5zdGFuY2UuZ2V0SGVpZ2h0KCkgfTtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwU2VydmljZS5cbiAgICAgKiBAcGFyYW0gX2xvYWRlciBNYXBBUElMb2FkZXIgaW5zdGFuY2UgaW1wbGVtZW50ZWQgZm9yIEJpbmcgTWFwcy4gVGhpcyBpbnN0YW5jZSB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKiBAcGFyYW0gX3pvbmUgTmdab25lIG9iamVjdCB0byBlbmFibGUgem9uZSBhd2FyZSBwcm9taXNlcy4gVGhpcyB3aWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvYWRlcjogTWFwQVBJTG9hZGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xuICAgICAgICB0aGlzLl9jb25maWcgPSAoPEJpbmdNYXBBUElMb2FkZXI+dGhpcy5fbG9hZGVyKS5Db25maWc7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhcyBvdmVybGF5IGxheWVyIHRvIHBlcmZvcm0gY3VzdG9tIGRyYXdpbmcgb3ZlciB0aGUgbWFwIHdpdGggb3V0XG4gICAgICogc29tZSBvZiB0aGUgb3ZlcmhlYWQgYXNzb2NpYXRlZCB3aXRoIGdvaW5nIHRocm91Z2ggdGhlIE1hcCBvYmplY3RzLlxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIENhbnZhc092ZXJsYXl9IG9iamVjdC5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXk6IEJpbmdDYW52YXNPdmVybGF5ID0gbmV3IEJpbmdDYW52YXNPdmVybGF5KGRyYXdDYWxsYmFjayk7XG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChvdmVybGF5KTtcbiAgICAgICAgICAgIHJldHVybiBvdmVybGF5O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQmluZyBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJQ2x1c3Rlck9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVDbHVzdGVyTGF5ZXIob3B0aW9uczogSUNsdXN0ZXJPcHRpb25zKTogUHJvbWlzZTxMYXllcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IG5ldyBQcm9taXNlPExheWVyPihyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRNb2R1bGUoJ01pY3Jvc29mdC5NYXBzLkNsdXN0ZXJpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUNsdXN0ZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXllcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllcihuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4oKSwgbyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibDogQmluZ0NsdXN0ZXJMYXllcjtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmxheWVycy5pbnNlcnQobGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBibCA9IG5ldyBCaW5nQ2x1c3RlckxheWVyKGxheWVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYmwuU2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShibCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluZm9ybWF0aW9uIHdpbmRvdyBmb3IgYSBtYXAgcG9zaXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBbb3B0aW9uc10gLSBJbmZvd2luZG93IG9wdGlvbnMuIFNlZSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfVxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBJbmZvV2luZG93fSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5JbmZvYm94IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVJbmZvV2luZG93KG9wdGlvbnM/OiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPEluZm9XaW5kb3c+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb247XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbG9jID0gbWFwLmdldENlbnRlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2MgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbi5sYXRpdHVkZSwgb3B0aW9ucy5wb3NpdGlvbi5sb25naXR1ZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5mb0JveDogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5JbmZvYm94KGxvYywgQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUluZm9Cb3hPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgICAgIGluZm9Cb3guc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmdJbmZvV2luZG93KGluZm9Cb3gpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWFwIGxheWVyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGxheWVyLiBTZWUge0BsaW5rIElMYXllck9wdGlvbnN9XG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIExheWVyfSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBNaWNyb3NvZnQuTWFwcy5MYXllciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTGF5ZXIob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxheWVyKG9wdGlvbnMuaWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydChsYXllcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpbmdMYXllcihsYXllciwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcCBoYXMgYmVlbiBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZU1hcChlbDogSFRNTEVsZW1lbnQsIG1hcE9wdGlvbnM6IElNYXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuTG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYXBwbHkgbWl4aW5zXG4gICAgICAgICAgICBNaXhpbk1hcExhYmVsV2l0aE92ZXJsYXlWaWV3KCk7XG4gICAgICAgICAgICBNaXhpbkNhbnZhc092ZXJsYXkoKTtcblxuICAgICAgICAgICAgLy8gbWFwIHN0YXJ0dXAuLi5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5EaXNwb3NlTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9hZE9wdGlvbnMobWFwT3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIW8uY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBvLmNyZWRlbnRpYWxzID0gdGhpcy5fY29uZmlnLmFwaUtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5NYXAoZWwsIG8pO1xuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBtYXA7XG4gICAgICAgICAgICB0aGlzLl9tYXBSZXNvbHZlcihtYXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQmluZyBtYXAgbWFya2VyIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBbb3B0aW9ucz08SU1hcmtlck9wdGlvbnM+e31dIC0gT3B0aW9ucyBmb3IgdGhlIG1hcmtlci4gU2VlIHtAbGluayBJTWFya2VyT3B0aW9uc30uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIE1hcmtlcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgTWljcm9zb2Z0Lk1hcHMuUHVzaFBpbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zID0gPElNYXJrZXJPcHRpb25zPnt9KTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKTogQmluZ01hcmtlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMucG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJykgeyBvLmljb24gPSBpY29uOyB9XG4gICAgICAgICAgICBjb25zdCBwdXNocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gbmV3IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4obG9jLCBvKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG1hcCwgbnVsbCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IG1hcmtlci5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwdXNocGluKTtcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmljb25JbmZvICYmIG9wdGlvbnMuaWNvbkluZm8ubWFya2VyVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG9wdGlvbnMuaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHMpID09PSAnc3RyaW5nJykgeyByZXR1cm4gKHBheWxvYWQocywgbWFwKSk7IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocGF5bG9hZCh4Lmljb24sIG1hcCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBheWxvYWQobnVsbCwgbWFwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwb2x5Z29uIHdpdGhpbiB0aGUgQmluZyBNYXBzIFY4IG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5Z29uLiBTZWUge0BsaW5rIElQb2x5Z29uT3B0aW9uc30uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIFBvbHlnb259IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGhzKTtcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbihsb2NzLCBvKTtcbiAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHkpO1xuXG4gICAgICAgICAgICBjb25zdCBwID0gbmV3IEJpbmdQb2x5Z29uKHBvbHksIHRoaXMsIG51bGwpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7IHAuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGFiZWwgIT0gbnVsbCkgeyBwLlNob3dMYWJlbCA9IG9wdGlvbnMuc2hvd0xhYmVsOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHAuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1heFpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWF4Wm9vbSA9IG9wdGlvbnMubGFiZWxNYXhab29tOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1pblpvb20gIT0gbnVsbCkgeyBwLkxhYmVsTWluWm9vbSA9IG9wdGlvbnMubGFiZWxNaW5ab29tOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGl0YWJsZSkgeyBwLlNldEVkaXRhYmxlKG9wdGlvbnMuZWRpdGFibGUpOyB9XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBvbHlsaW5lIHdpdGhpbiB0aGUgQmluZyBNYXBzIFY4IG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBwb2x5bGluZS4gU2VlIHtAbGluayBJUG9seWxpbmVPcHRpb25zfS5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgUG9seWxpbmV9IG9iamVjdCAob3IgYW4gYXJyYXkgdGhlcmVvZiBmb3IgY29tcGxleCBwYXRocyksXG4gICAgICogd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUob3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmUgfCBBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgbGV0IHBvbHlsaW5lOiBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aFswXSkpIHtcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShsb2NzWzBdLCBvKTtcbiAgICAgICAgICAgICAgICBtYXAuZW50aXRpZXMucHVzaChwb2x5bGluZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwbCA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIG1hcCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwbC5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHsgcGwuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwbC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xuICAgICAgICAgICAgICAgIGxvY3MuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUocCwgbyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5lbnRpdGllcy5wdXNoKHBvbHlsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbCA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIG1hcCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcGwuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykgeyBwbC5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwbC5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChwbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgbGF5ZXIgZnJvbSB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gTGF5ZXIgdG8gZGVsZXRlLiBTZWUge0BsaW5rIExheWVyfS4gVGhpcyBtZXRob2QgZXhwZWN0cyB0aGUgQmluZyBzcGVjaWZpYyBMYXllciBtb2RlbCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSBsYXllciBoYXMgYmVlbiByZW1vdmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBMYXllcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XG4gICAgICAgICAgICBtYXAubGF5ZXJzLnJlbW92ZShsYXllci5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgRGlzcG9zZU1hcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcCA9PSBudWxsICYmIHRoaXMuX21hcEluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWFwSW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWFwSW5zdGFuY2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXAgY2VudGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgZ29lIGxvY2F0aW9uIG9mIHRoZSBjZW50ZXIuIFNlZSB7QGxpbmsgSUxhdExvbmd9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldENlbnRlcigpOiBQcm9taXNlPElMYXRMb25nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIHJldHVybiA8SUxhdExvbmc+e1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjZW50ZXIubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjZW50ZXIubG9uZ2l0dWRlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIG1hcCBib3VuZGluZyBib3hcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBnb2UgbG9jYXRpb24gb2YgdGhlIGJvdW5kaW5nIGJveC4gU2VlIHtAbGluayBJQm94fS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRCb3VuZHMoKTogUHJvbWlzZTxJQm94PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybiA8SUJveD57XG4gICAgICAgICAgICAgICAgbWF4TGF0aXR1ZGU6IGJveC5nZXROb3J0aCgpLFxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogYm94LmNyb3NzZXNJbnRlcm5hdGlvbmFsRGF0ZUxpbmUoKSA/IGJveC5nZXRXZXN0KCkgOiBib3guZ2V0RWFzdCgpLFxuICAgICAgICAgICAgICAgIG1pbkxhdGl0dWRlOiBib3guZ2V0U291dGgoKSxcbiAgICAgICAgICAgICAgICBtaW5Mb25naXR1ZGU6IGJveC5jcm9zc2VzSW50ZXJuYXRpb25hbERhdGVMaW5lKCkgPyBib3guZ2V0RWFzdCgpIDogYm94LmdldFdlc3QoKSxcbiAgICAgICAgICAgICAgICBjZW50ZXI6IHsgbGF0aXR1ZGU6IGJveC5jZW50ZXIubGF0aXR1ZGUsIGxvbmdpdHVkZTogYm94LmNlbnRlci5sb25naXR1ZGUgfSxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgc2hhcmVkIG9yIHByaXZhdGUgaW5zdGFuY2Ugb2YgdGhlIG1hcCBkcmF3aW5nIHRvb2xzLlxuICAgICAqXG4gICAgICogQHBhcmFtIFt1c2VTaGFyZWRJbnN0YW5jZT10cnVlXSAtIFNldCB0byBmYWxzZSB0byBjcmVhdGUgYSBwcml2YXRlIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnN0IGFuIGluc3RhbmNlIG9mIHRoZSBkcmF3aW5nIHRvb2xzLlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXREcmF3aW5nVG9vbHMgKHVzZVNoYXJlZEluc3RhbmNlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8TWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuTG9hZE1vZHVsZUluc3RhbmNlKCdNaWNyb3NvZnQuTWFwcy5EcmF3aW5nVG9vbHMnLCB1c2VTaGFyZWRJbnN0YW5jZSkudGhlbigobzogTWljcm9zb2Z0Lk1hcHMuRHJhd2luZ1Rvb2xzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB6b29tIGxldmVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldFpvb20oKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCkgPT4gbWFwLmdldFpvb20oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSBtb2R1bGUgaW50byB0aGUgTWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZHVsZU5hbWUgLSBUaGUgbW9kdWxlIHRvIGxvYWQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gQ2FsbGJhY2sgdG8gY2FsbCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUuXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBMb2FkTW9kdWxlKG1vZHVsZU5hbWU6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vZHVsZXMuaGFzKG1vZHVsZU5hbWUpKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMubG9hZE1vZHVsZShtb2R1bGVOYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSBtb2R1bGUgaW50byB0aGUgTWFwIGFuZCBkZWxpdmVycyBhbmQgaW5zdGFuY2Ugb2YgdGhlIG1vZHVsZSBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZHVsZU5hbWUgLSBUaGUgbW9kdWxlIHRvIGxvYWQuXG4gICAgICogQHBhcmFtIHVzZVNoYXJlZEluc3RhbmNlLSBVc2UgYSBzaGFyZWQgaW5zdGFuY2UgaWYgdHJ1ZSwgY3JlYXRlIGEgbmV3IGluc3RhbmNlIGlmIGZhbHNlLlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgTG9hZE1vZHVsZUluc3RhbmNlKG1vZHVsZU5hbWU6IHN0cmluZywgdXNlU2hhcmVkSW5zdGFuY2U6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxPYmplY3Q+IHtcbiAgICAgICAgY29uc3Qgczogc3RyaW5nID0gbW9kdWxlTmFtZS5zdWJzdHIobW9kdWxlTmFtZS5sYXN0SW5kZXhPZignLicpICsgMSk7XG4gICAgICAgIGlmICh0aGlzLl9tb2R1bGVzLmhhcyhtb2R1bGVOYW1lKSkge1xuICAgICAgICAgICAgbGV0IG86IGFueSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIXVzZVNoYXJlZEluc3RhbmNlKSAge1xuICAgICAgICAgICAgICAgIG8gPSBuZXcgKDxhbnk+TWljcm9zb2Z0Lk1hcHMpW3NdKHRoaXMuX21hcEluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX21vZHVsZXMuZ2V0KG1vZHVsZU5hbWUpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvID0gdGhpcy5fbW9kdWxlcy5nZXQobW9kdWxlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvID0gbmV3ICg8YW55Pk1pY3Jvc29mdC5NYXBzKVtzXSh0aGlzLl9tYXBJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kdWxlcy5zZXQobW9kdWxlTmFtZSwgbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPE9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMubG9hZE1vZHVsZShtb2R1bGVOYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG8gPSBuZXcgKDxhbnk+TWljcm9zb2Z0Lk1hcHMpW3NdKHRoaXMuX21hcEluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVNoYXJlZEluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVzLnNldChtb2R1bGVOYW1lLCBvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZXMuc2V0KG1vZHVsZU5hbWUsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0NvdWxkIG5vdCBsb2FkIG1vZHVsZSBvciBjcmVhdGUgaW5zdGFuY2UuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy4gVGhpcyBwcm9taXNlIHJlc29sdmVzIHRvIG51bGxcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBMb2NhdGlvblRvUG9pbnQobG9jOiBJTGF0TG9uZyk6IFByb21pc2U8SVBvaW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsb2MpO1xuICAgICAgICAgICAgY29uc3QgcDogTWljcm9zb2Z0Lk1hcHMuUG9pbnQgPSA8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+bS50cnlMb2NhdGlvblRvUGl4ZWwobCwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XG4gICAgICAgICAgICBpZiAocCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogcC54LCB5OiBwLnkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBMb2NhdGlvbnNUb1BvaW50cyhsb2NzOiBBcnJheTxJTGF0TG9uZz4pOiBQcm9taXNlPEFycmF5PElQb2ludD4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsb2NzLm1hcChsb2MgPT4gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxvYykpO1xuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+ID0gPEFycmF5PE1pY3Jvc29mdC5NYXBzLlBvaW50Pj5tLnRyeUxvY2F0aW9uVG9QaXhlbChsLFxuICAgICAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xuICAgICAgICAgICAgcmV0dXJuIHAgPyBwIDogbmV3IEFycmF5PElQb2ludD4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgbWFwIG9uIGEgZ2VvIGxvY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlb0Nvb3JkaW5hdGVzIGFyb3VuZCB3aGljaCB0byBjZW50ZXIgdGhlIG1hcC4gU2VlIHtAbGluayBJTGF0TG9uZ31cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGNlbnRlciBvcGVyYXRpb25zIGhhcyBiZWVuIGNvbXBsZXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRDZW50ZXIobGF0TG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiBtYXAuc2V0Vmlldyh7XG4gICAgICAgICAgICBjZW50ZXI6IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsYXRMbmcpXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBnZW5lcmljIG1hcCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21hcC50aGVuKChtOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBtLnNldE9wdGlvbnMobyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWaWV3T3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JVmlld09wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlVmlld09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBtLnNldFZpZXcobyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB6b29tIC0gWm9vbSBsZXZlbCB0byBzZXQuXG4gICAgICogQHJldHVybnMgLSBBIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIHpvb20gb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApID0+IG1hcC5zZXRWaWV3KHtcbiAgICAgICAgICAgIHpvb206IHpvb21cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHRweWUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTdWJzY3JpYmVUb01hcEV2ZW50PEU+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxFPiB7XG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZVRyYW5zbGF0ZWQgPSBCaW5nTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEU+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXAudGhlbigobTogTWljcm9zb2Z0Lk1hcHMuTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobSwgZXZlbnROYW1lVHJhbnNsYXRlZCwgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZSBvbiB0aGUgbWFwIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBUcmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtKSA9PiBNaWNyb3NvZnQuTWFwcy5FdmVudHMuaW52b2tlKG0sIGV2ZW50TmFtZSwgbnVsbCkpO1xuICAgIH1cblxufVxuIl19