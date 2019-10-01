/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, ViewChild, ContentChildren, Input, Output, ElementRef, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { MapServiceFactory } from '../services/mapservicefactory';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { InfoBoxService } from '../services/infobox.service';
import { LayerService } from '../services/layer.service';
import { PolygonService } from '../services/polygon.service';
import { PolylineService } from '../services/polyline.service';
import { ClusterService } from '../services/cluster.service';
import { MapTypeId } from '../models/map-type-id';
import { MapMarkerDirective } from './map-marker';
/**
 * Renders a map based on a given provider.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map',
 *  styles: [`
 *    .map-container { height: 300px; }
 * `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom"></x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var MapComponent = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapComponent.
     *
     * @param _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @memberof MapComponent
     */
    function MapComponent(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._longitude = 0;
        this._latitude = 0;
        this._zoom = 0;
        this._options = {};
        this._box = null;
        this._containerClass = true;
        /**
         * This event emitter is fired when the map bounding box changes.
         *
         * \@memberof MapComponent
         */
        this.BoundsChange = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         *
         * \@memberof MapComponent
         */
        this.CenterChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapDblClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOver = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseOut = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         *
         * \@memberof MapComponent
         */
        this.MapMouseMove = new EventEmitter();
        /**
         * The event emitter is fired when the map service is available and the maps has been
         * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
         * the main map object of the underlying platform.
         *
         * \@memberof MapComponent
         */
        this.MapPromise = new EventEmitter();
        /**
         * This event emiiter is fired when the map zoom changes
         *
         * \@memberof MapComponent
         */
        this.ZoomChange = new EventEmitter();
        /**
         * This event emitter is fired when the map service is available and the maps has been
         * Initialized
         * \@memberOf MapComponent
         */
        this.MapService = new EventEmitter();
    }
    Object.defineProperty(MapComponent.prototype, "Box", {
        ///
        /// Property declarations
        ///
        /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Get or sets the maximum and minimum bounding box for map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._box; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._box = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Latitude", {
        /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the latitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._latitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Longitude", {
        /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the longitude that sets the center of the map.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._longitude; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._longitude = this.ConvertToDecimal(value);
            this.UpdateCenter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Options", {
        /**
         * Gets or sets general map Options
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets general map Options
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._options; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._options = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "Zoom", {
        /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * @memberof MapComponent
         */
        get: /**
         * Gets or sets the zoom level of the map. The default value is `8`.
         *
         * \@memberof MapComponent
         * @return {?}
         */
        function () { return this._zoom; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._zoom = this.ConvertToDecimal(value, 8);
            if (typeof this._zoom === 'number') {
                this._mapService.SetZoom(this._zoom);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnInit = /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this.InitMapInstance(this._container.nativeElement);
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapComponent.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (this._mapPromise) {
            if (changes['Box']) {
                if (this._box != null) {
                    this._mapService.SetViewOptions(/** @type {?} */ ({
                        bounds: this._box
                    }));
                }
            }
            if (changes['Options']) {
                this._mapService.SetMapOptions(this._options);
            }
        }
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        this._mapService.DisposeMap();
    };
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    MapComponent.prototype.TriggerResize = /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    function () {
        var _this = this;
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () { return _this._mapService.TriggerMapEvent('resize').then(function () { return resolve(); }); });
        });
    };
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    MapComponent.prototype.ConvertToDecimal = /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    function (value, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    };
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapClickEvents = /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('click').subscribe(function (e) {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            ///
            _this._clickTimeout = setTimeout(function () {
                _this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(function (e) {
            if (_this._clickTimeout) {
                clearTimeout(/** @type {?} */ (_this._clickTimeout));
            }
            _this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(function (e) {
            _this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(function (e) {
            _this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(function (e) {
            _this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(function (e) {
            _this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapBoundsChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(function () {
            _this._mapService.GetBounds().then(function (bounds) {
                _this.BoundsChange.emit(bounds);
            });
        });
    };
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapCenterChange = /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(function () {
            _this._mapService.GetCenter().then(function (center) {
                if (_this._latitude !== center.latitude || _this._longitude !== center.longitude) {
                    _this._latitude = center.latitude;
                    _this._longitude = center.longitude;
                    _this.CenterChange.emit(/** @type {?} */ ({ latitude: _this._latitude, longitude: _this._longitude }));
                }
            });
        });
    };
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.HandleMapZoomChange = /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(function () {
            _this._mapService.GetZoom().then(function (z) {
                if (_this._zoom !== z) {
                    _this._zoom = z;
                    _this.ZoomChange.emit(z);
                }
            });
        });
    };
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    MapComponent.prototype.InitMapInstance = /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    function (el) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            if (_this._options.center == null) {
                _this._options.center = { latitude: _this._latitude, longitude: _this._longitude };
            }
            if (_this._options.zoom == null) {
                _this._options.zoom = _this._zoom;
            }
            if (_this._options.mapTypeId == null) {
                _this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (_this._box != null) {
                _this._options.bounds = _this._box;
            }
            _this._mapPromise = _this._mapService.CreateMap(el, _this._options);
            _this.HandleMapCenterChange();
            _this.HandleMapBoundsChange();
            _this.HandleMapZoomChange();
            _this.HandleMapClickEvents();
        });
    };
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    MapComponent.prototype.UpdateCenter = /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    };
    MapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'x-map',
                    providers: [
                        { provide: MapService, deps: [MapServiceFactory], useFactory: MapServiceCreator },
                        { provide: MarkerService, deps: [MapServiceFactory, MapService, LayerService, ClusterService], useFactory: MarkerServiceFactory },
                        {
                            provide: InfoBoxService, deps: [MapServiceFactory, MapService,
                                MarkerService], useFactory: InfoBoxServiceFactory
                        },
                        { provide: LayerService, deps: [MapServiceFactory, MapService], useFactory: LayerServiceFactory },
                        { provide: ClusterService, deps: [MapServiceFactory, MapService], useFactory: ClusterServiceFactory },
                        { provide: PolygonService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolygonServiceFactory },
                        { provide: PolylineService, deps: [MapServiceFactory, MapService, LayerService], useFactory: PolylineServiceFactory }
                    ],
                    template: "\n        <div #container class='map-container-inner'></div>\n        <div class='map-content'>\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        .map-container-inner { width: inherit; height: inherit; }\n        .map-container-inner div { background-repeat: no-repeat; }\n        .map-content { display:none; }\n    "],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    MapComponent.propDecorators = {
        _containerClass: [{ type: HostBinding, args: ['class.map-container',] }],
        _container: [{ type: ViewChild, args: ['container',] }],
        _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
        Box: [{ type: Input }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Options: [{ type: Input }],
        Zoom: [{ type: Input }],
        BoundsChange: [{ type: Output }],
        CenterChange: [{ type: Output }],
        MapClick: [{ type: Output }],
        MapDblClick: [{ type: Output }],
        MapRightClick: [{ type: Output }],
        MapMouseOver: [{ type: Output }],
        MapMouseOut: [{ type: Output }],
        MapMouseMove: [{ type: Output }],
        MapPromise: [{ type: Output }],
        ZoomChange: [{ type: Output }],
        MapService: [{ type: Output }]
    };
    return MapComponent;
}());
export { MapComponent };
if (false) {
    /** @type {?} */
    MapComponent.prototype._longitude;
    /** @type {?} */
    MapComponent.prototype._latitude;
    /** @type {?} */
    MapComponent.prototype._zoom;
    /** @type {?} */
    MapComponent.prototype._clickTimeout;
    /** @type {?} */
    MapComponent.prototype._options;
    /** @type {?} */
    MapComponent.prototype._box;
    /** @type {?} */
    MapComponent.prototype._mapPromise;
    /** @type {?} */
    MapComponent.prototype._containerClass;
    /** @type {?} */
    MapComponent.prototype._container;
    /** @type {?} */
    MapComponent.prototype._markers;
    /**
     * This event emitter is fired when the map bounding box changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.BoundsChange;
    /**
     * This event emitter is fired when the map center changes.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.CenterChange;
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapDblClick;
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapRightClick;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOver;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseOut;
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapMouseMove;
    /**
     * The event emitter is fired when the map service is available and the maps has been
     * Initialized (but not necessarily created). It contains a Promise that when fullfilled returns
     * the main map object of the underlying platform.
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapPromise;
    /**
     * This event emiiter is fired when the map zoom changes
     *
     * \@memberof MapComponent
     * @type {?}
     */
    MapComponent.prototype.ZoomChange;
    /**
     * This event emitter is fired when the map service is available and the maps has been
     * Initialized
     * \@memberOf MapComponent
     * @type {?}
     */
    MapComponent.prototype.MapService;
    /** @type {?} */
    MapComponent.prototype._mapService;
    /** @type {?} */
    MapComponent.prototype._zone;
}
/**
 * Factory function to generate a cluster service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Cluster Service based on the underlying map architecture
 */
export function ClusterServiceFactory(f, m) { return f.CreateClusterService(m); }
/**
 * Factory function to generate a infobox service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} ma
 * @return {?} - A concrete instance of a InfoBox Service based on the underlying map architecture.
 */
export function InfoBoxServiceFactory(f, m, ma) { return f.CreateInfoBoxService(m, ma); }
/**
 * Factory function to generate a layer service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @return {?} - A concrete instance of a Layer Service based on the underlying map architecture.
 */
export function LayerServiceFactory(f, m) { return f.CreateLayerService(m); }
/**
 * Factory function to generate a map service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @return {?} - A concrete instance of a MapService based on the underlying map architecture.
 */
export function MapServiceCreator(f) { return f.Create(); }
/**
 * Factory function to generate a marker service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @param {?} c - A {\@link ClusterService} instance.
 * @return {?} - A concrete instance of a Marker Service based on the underlying map architecture.
 */
export function MarkerServiceFactory(f, m, l, c) {
    return f.CreateMarkerService(m, l, c);
}
/**
 * Factory function to generate a polygon service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polygon Service based on the underlying map architecture.
 */
export function PolygonServiceFactory(f, m, l) {
    return f.CreatePolygonService(m, l);
}
/**
 * Factory function to generate a polyline service instance. This is necessary because of constraints with AOT that do no allow
 * us to use lamda functions inline.
 *
 * @export
 * @param {?} f - The {\@link MapServiceFactory} implementation.
 * @param {?} m - A {\@link MapService} instance.
 * @param {?} l - A {\@link LayerService} instance.
 * @return {?} - A concrete instance of a Polyline Service based on the underlying map architecture.
 */
export function PolylineServiceFactory(f, m, l) {
    return f.CreatePolylineService(m, l);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtPOUMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsc0JBQW9CLFdBQXVCLEVBQVUsS0FBYTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7MEJBbkw3QyxDQUFDO3lCQUNGLENBQUM7cUJBQ0wsQ0FBQzt3QkFFZSxFQUFF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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZZekIsTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLElBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7QUFZaEksTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLEVBQ3JFLEVBQWlCLElBQW9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7Ozs7Ozs7QUFXaEYsTUFBTSw4QkFBOEIsQ0FBb0IsRUFBRSxDQUFhLElBQWtCLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7O0FBVTFILE1BQU0sNEJBQTRCLENBQW9CLElBQWdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7O0FBYTFGLE1BQU0sK0JBQStCLENBQW9CLEVBQUUsQ0FBYSxFQUFFLENBQWUsRUFBRSxDQUFpQjtJQUN4RyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDekM7Ozs7Ozs7Ozs7O0FBWUQsTUFBTSxnQ0FBZ0MsQ0FBb0IsRUFBRSxDQUFhLEVBQUUsQ0FBZTtJQUN0RixNQUFNLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2Qzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGlDQUFpQyxDQUFvQixFQUFFLENBQWEsRUFBRSxDQUFlO0lBQ3ZGLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi4vc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnknO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZm9ib3guc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jbHVzdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lib3gnO1xuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXBUeXBlSWQgfSBmcm9tICcuLi9tb2RlbHMvbWFwLXR5cGUtaWQnO1xuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcblxuLyoqXG4gKiBSZW5kZXJzIGEgbWFwIGJhc2VkIG9uIGEgZ2l2ZW4gcHJvdmlkZXIuXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZSBDU1NcbiAqIGNsYXNzIGBtYXAtY29udGFpbmVyYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+PC94LW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3gtbWFwJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNYXBTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnldLCB1c2VGYWN0b3J5OiBNYXBTZXJ2aWNlQ3JlYXRvciB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1hcmtlclNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBDbHVzdGVyU2VydmljZV0sIHVzZUZhY3Rvcnk6IE1hcmtlclNlcnZpY2VGYWN0b3J5IH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEluZm9Cb3hTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgTWFya2VyU2VydmljZV0sIHVzZUZhY3Rvcnk6IEluZm9Cb3hTZXJ2aWNlRmFjdG9yeVxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IExheWVyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTGF5ZXJTZXJ2aWNlRmFjdG9yeSB9LFxuICAgICAgICB7IHByb3ZpZGU6IENsdXN0ZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2VdLCB1c2VGYWN0b3J5OiBDbHVzdGVyU2VydmljZUZhY3RvcnkgfSxcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5Z29uU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5Z29uU2VydmljZUZhY3RvcnkgfSxcbiAgICAgICAgeyBwcm92aWRlOiBQb2x5bGluZVNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSwgTGF5ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogUG9seWxpbmVTZXJ2aWNlRmFjdG9yeSB9XG4gICAgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgY2xhc3M9J21hcC1jb250YWluZXItaW5uZXInPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdtYXAtY29udGVudCc+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciB7IHdpZHRoOiBpbmhlcml0OyBoZWlnaHQ6IGluaGVyaXQ7IH1cbiAgICAgICAgLm1hcC1jb250YWluZXItaW5uZXIgZGl2IHsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxuICAgICAgICAubWFwLWNvbnRlbnQgeyBkaXNwbGF5Om5vbmU7IH1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2xvbmdpdHVkZSA9IDA7XG4gICAgcHJpdmF0ZSBfbGF0aXR1ZGUgPSAwO1xuICAgIHByaXZhdGUgX3pvb20gPSAwO1xuICAgIHByaXZhdGUgX2NsaWNrVGltZW91dDogbnVtYmVyIHwgTm9kZUpTLlRpbWVyO1xuICAgIHByaXZhdGUgX29wdGlvbnM6IElNYXBPcHRpb25zID0ge307XG4gICAgcHJpdmF0ZSBfYm94OiBJQm94ID0gbnVsbDtcbiAgICBwcml2YXRlIF9tYXBQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MubWFwLWNvbnRhaW5lcicpIHB1YmxpYyBfY29udGFpbmVyQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHByaXZhdGUgX2NvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1hcE1hcmtlckRpcmVjdGl2ZSkgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8TWFwTWFya2VyRGlyZWN0aXZlPjtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldCBvciBzZXRzIHRoZSBtYXhpbXVtIGFuZCBtaW5pbXVtIGJvdW5kaW5nIGJveCBmb3IgbWFwLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBCb3goKTogSUJveCB7IHJldHVybiB0aGlzLl9ib3g7IH1cbiAgICBwdWJsaWMgc2V0IEJveCh2YWw6IElCb3gpIHsgdGhpcy5fYm94ID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGxhdGl0dWRlIHRoYXQgc2V0cyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IExhdGl0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cbiAgICBwdWJsaWMgc2V0IExhdGl0dWRlKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbG9uZ2l0dWRlIHRoYXQgc2V0cyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IExvbmdpdHVkZSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlOyB9XG4gICAgcHVibGljIHNldCBMb25naXR1ZGUodmFsdWU6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUpO1xuICAgICAgICB0aGlzLlVwZGF0ZUNlbnRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyBnZW5lcmFsIG1hcCBPcHRpb25zXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IE9wdGlvbnMoKTogSU1hcE9wdGlvbnMgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxuICAgIHB1YmxpYyBzZXQgT3B0aW9ucyh2YWw6IElNYXBPcHRpb25zKSB7IHRoaXMuX29wdGlvbnMgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgOGAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IFpvb20oKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3pvb207IH1cbiAgICBwdWJsaWMgc2V0IFpvb20odmFsdWU6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl96b29tID0gdGhpcy5Db252ZXJ0VG9EZWNpbWFsKHZhbHVlLCA4KTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl96b29tID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRab29tKHRoaXMuX3pvb20pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBib3VuZGluZyBib3ggY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBCb3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQm94PiA9IG5ldyBFdmVudEVtaXR0ZXI8SUJveD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgQ2VudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SUxhdExvbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTGF0TG9uZz4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2sgb24gYVxuICAgICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBNYXBDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBNYXBEYmxDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIHJpZ2h0LWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIE1hcFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIE1hcE1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIE1hcE1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIHNlcnZpY2UgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWFwcyBoYXMgYmVlblxuICAgICAqIEluaXRpYWxpemVkIChidXQgbm90IG5lY2Vzc2FyaWx5IGNyZWF0ZWQpLiBJdCBjb250YWlucyBhIFByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgcmV0dXJuc1xuICAgICAqIHRoZSBtYWluIG1hcCBvYmplY3Qgb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwUHJvbWlzZTogRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4gPSBuZXcgRXZlbnRFbWl0dGVyPFByb21pc2U8YW55Pj4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1paXRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgem9vbSBjaGFuZ2VzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgWm9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPE51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPE51bWJlcj4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgc2VydmljZSBpcyBhdmFpbGFibGUgYW5kIHRoZSBtYXBzIGhhcyBiZWVuXG4gICAgICogSW5pdGlhbGl6ZWRcbiAgICAgKiBAbWVtYmVyT2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwU2VydmljZTogRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBTZXJ2aWNlPigpO1xuXG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwQ29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JldGVkIGltcGxlbWVudGF0aW9uIG9mIGEgbWFwIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHMgaW1wbGVtZW50YXRpb25zLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb24uIFBhcnQgb2YgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLkluaXRNYXBJbnN0YW5jZSh0aGlzLl9jb250YWluZXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuTWFwUHJvbWlzZS5lbWl0KHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZSk7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5lbWl0KHRoaXMuX21hcFNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcFByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzWydCb3gnXSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ib3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldFZpZXdPcHRpb25zKDxJTWFwT3B0aW9ucz57XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZHM6IHRoaXMuX2JveFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hhbmdlc1snT3B0aW9ucyddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRNYXBPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5EaXNwb3NlTWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYSByZXNpemUgZXZlbnQgb24gdGhlIG1hcCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgVHJpZ2dlclJlc2l6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxuICAgICAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLlRyaWdnZXJNYXBFdmVudCgncmVzaXplJykudGhlbigoKSA9PiByZXNvbHZlKCkpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kcy5cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgbnVtYmVyLWlzaCB2YWx1ZSB0byBhIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICAgICAqIEBwYXJhbSBbZGVmYXVsdFZhbHVlPW51bGxdIC0gRGVmYXVsdCB2YWx1ZSB0byB1c2UgaWYgdGhlIGNvbnZlcnNpb24gY2Fubm90IGJlIHBlcmZvcm1lZC5cbiAgICAgKiBAcmV0dXJucyAtIENvbnZlcnRlZCBudW1iZXIgb2YgdGhlIGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBDb252ZXJ0VG9EZWNpbWFsKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGRlZmF1bHRWYWx1ZTogbnVtYmVyID0gbnVsbCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIDxudW1iZXI+dmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyB0aGUgbWFwIGNsaWNrIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIEhhbmRsZU1hcENsaWNrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignY2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3Nhcnkgc2luY2UgYmluZyB3aWxsIHRyZWF0IGEgZG91YmxlY2xpY2sgZmlyc3QgYXMgdHdvIGNsaWNrcy4uLidcbiAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5NYXBDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdkYmxjbGljaycpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoPE5vZGVKUy5UaW1lcj50aGlzLl9jbGlja1RpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5NYXBEYmxDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ3JpZ2h0Y2xpY2snKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICB0aGlzLk1hcFJpZ2h0Q2xpY2suZW1pdCg8TW91c2VFdmVudD5lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdtb3VzZW92ZXInKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlT3Zlci5lbWl0KDxNb3VzZUV2ZW50PmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlb3V0Jykuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU91dC5lbWl0KDxNb3VzZUV2ZW50PmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlbW92ZScpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VNb3ZlLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCBjZW50ZXIgY2hhbmdlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIEhhbmRsZU1hcEJvdW5kc0NoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdib3VuZHNjaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Qm91bmRzKCkudGhlbigoYm91bmRzOiBJQm94KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5Cb3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCBjZW50ZXIgY2hhbmdlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIEhhbmRsZU1hcENlbnRlckNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCdjZW50ZXJjaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Q2VudGVyKCkudGhlbigoY2VudGVyOiBJTGF0TG9uZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXRpdHVkZSAhPT0gY2VudGVyLmxhdGl0dWRlIHx8IHRoaXMuX2xvbmdpdHVkZSAhPT0gY2VudGVyLmxvbmdpdHVkZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXRpdHVkZSA9IGNlbnRlci5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gY2VudGVyLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DZW50ZXJDaGFuZ2UuZW1pdCg8SUxhdExvbmc+eyBsYXRpdHVkZTogdGhpcy5fbGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyBtYXAgem9vbSBjaGFuZ2UgZXZlbnRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgSGFuZGxlTWFwWm9vbUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PHZvaWQ+KCd6b29tY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldFpvb20oKS50aGVuKCh6OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fem9vbSAhPT0geikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b29tID0gejtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ab29tQ2hhbmdlLmVtaXQoeik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWwgLSBIdG1sIGVsZW1lbnRzIHdoaWNoIHdpbGwgaG9zdCB0aGUgbWFwIGNhbnZhcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIEluaXRNYXBJbnN0YW5jZShlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jZW50ZXIgPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLmNlbnRlciA9IHsgbGF0aXR1ZGU6IHRoaXMuX2xhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMuX2xvbmdpdHVkZSB9OyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy56b29tID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy56b29tID0gdGhpcy5fem9vbTsgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWFwVHlwZUlkID09IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5tYXBUeXBlSWQgPSBNYXBUeXBlSWQuaHlicmlkOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fYm94ICE9IG51bGwpIHsgdGhpcy5fb3B0aW9ucy5ib3VuZHMgPSB0aGlzLl9ib3g7IH1cbiAgICAgICAgICAgIHRoaXMuX21hcFByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZU1hcChlbCwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcENlbnRlckNoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBCb3VuZHNDaGFuZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwWm9vbUNoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBDbGlja0V2ZW50cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBtYXAgY2VudGVyIGJhc2VkIG9uIHRoZSBnZW8gcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgVXBkYXRlQ2VudGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5fbG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Q2VudGVyKHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGNsdXN0ZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIENsdXN0ZXIgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDbHVzdGVyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZUNsdXN0ZXJTZXJ2aWNlKG0pOyB9XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGluZm9ib3ggc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFya2VyU2VydmljZX0gaW5zdGFuY2UuXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBJbmZvQm94IFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEluZm9Cb3hTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSxcbiAgICBtYTogTWFya2VyU2VydmljZSk6IEluZm9Cb3hTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlSW5mb0JveFNlcnZpY2UobSwgbWEpOyB9XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGxheWVyIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBMYXllciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMYXllclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlTGF5ZXJTZXJ2aWNlKG0pOyB9XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcCBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBNYXBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNYXBTZXJ2aWNlQ3JlYXRvcihmOiBNYXBTZXJ2aWNlRmFjdG9yeSk6IE1hcFNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGUoKTsgfVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBtYXJrZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEBwYXJhbSBjIC0gQSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGluc3RhbmNlLlxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgTWFya2VyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1hcmtlclNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLCBsOiBMYXllclNlcnZpY2UsIGM6IENsdXN0ZXJTZXJ2aWNlKTogTWFya2VyU2VydmljZSB7XG4gICAgcmV0dXJuIGYuQ3JlYXRlTWFya2VyU2VydmljZShtLCBsLCBjKTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcG9seWdvbiBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgUG9seWdvbiBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQb2x5Z29uU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlIHtcbiAgICByZXR1cm4gZi5DcmVhdGVQb2x5Z29uU2VydmljZShtLCBsKTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcG9seWxpbmUgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEBwYXJhbSBsIC0gQSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIFBvbHlsaW5lIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBvbHlsaW5lU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSk6IFBvbHlsaW5lU2VydmljZSB7XG4gICAgcmV0dXJuIGYuQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG0sIGwpO1xufVxuIl19