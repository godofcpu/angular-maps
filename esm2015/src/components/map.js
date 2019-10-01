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
export class MapComponent {
    /**
     * Creates an instance of MapComponent.
     *
     * \@memberof MapComponent
     * @param {?} _mapService - Concreted implementation of a map service for the underlying maps implementations.
     *                                   Generally provided via injections.
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
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
    /**
     * Get or sets the maximum and minimum bounding box for map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Box() { return this._box; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Box(val) { this._box = val; }
    /**
     * Gets or sets the latitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Latitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Latitude(value) {
        this._latitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets the longitude that sets the center of the map.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Longitude() { return this._longitude; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Longitude(value) {
        this._longitude = this.ConvertToDecimal(value);
        this.UpdateCenter();
    }
    /**
     * Gets or sets general map Options
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Options() { return this._options; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Options(val) { this._options = val; }
    /**
     * Gets or sets the zoom level of the map. The default value is `8`.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    get Zoom() { return this._zoom; }
    /**
     * @param {?} value
     * @return {?}
     */
    set Zoom(value) {
        this._zoom = this.ConvertToDecimal(value, 8);
        if (typeof this._zoom === 'number') {
            this._mapService.SetZoom(this._zoom);
        }
    }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnInit() {
        this.InitMapInstance(this._container.nativeElement);
        this.MapPromise.emit(this._mapService.MapPromise);
        this.MapService.emit(this._mapService);
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    ngOnDestroy() {
        this._mapService.DisposeMap();
    }
    /**
     * Triggers a resize event on the map instance.
     *
     * \@memberof MapComponent
     * @return {?} - A promise that gets resolved after the event was triggered.
     *
     */
    TriggerResize() {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => { return this._mapService.TriggerMapEvent('resize').then(() => resolve()); });
        });
    }
    /**
     * Converts a number-ish value to a number.
     *
     * \@memberof MapComponent
     * @param {?} value - The value to convert.
     * @param {?=} defaultValue
     * @return {?} - Converted number of the default.
     *
     */
    ConvertToDecimal(value, defaultValue = null) {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        else if (typeof value === 'number') {
            return /** @type {?} */ (value);
        }
        return defaultValue;
    }
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapClickEvents() {
        this._mapService.SubscribeToMapEvent('click').subscribe(e => {
            //
            // this is necessary since bing will treat a doubleclick first as two clicks...'
            this._clickTimeout = setTimeout(() => {
                this.MapClick.emit(/** @type {?} */ (e));
            }, 300);
        });
        this._mapService.SubscribeToMapEvent('dblclick').subscribe(e => {
            if (this._clickTimeout) {
                clearTimeout(/** @type {?} */ (this._clickTimeout));
            }
            this.MapDblClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('rightclick').subscribe(e => {
            this.MapRightClick.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseover').subscribe(e => {
            this.MapMouseOver.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mouseout').subscribe(e => {
            this.MapMouseOut.emit(/** @type {?} */ (e));
        });
        this._mapService.SubscribeToMapEvent('mousemove').subscribe(e => {
            this.MapMouseMove.emit(/** @type {?} */ (e));
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapBoundsChange() {
        this._mapService.SubscribeToMapEvent('boundschanged').subscribe(() => {
            this._mapService.GetBounds().then((bounds) => {
                this.BoundsChange.emit(bounds);
            });
        });
    }
    /**
     * Delegate handling map center change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapCenterChange() {
        this._mapService.SubscribeToMapEvent('centerchanged').subscribe(() => {
            this._mapService.GetCenter().then((center) => {
                if (this._latitude !== center.latitude || this._longitude !== center.longitude) {
                    this._latitude = center.latitude;
                    this._longitude = center.longitude;
                    this.CenterChange.emit(/** @type {?} */ ({ latitude: this._latitude, longitude: this._longitude }));
                }
            });
        });
    }
    /**
     * Delegate handling map zoom change events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    HandleMapZoomChange() {
        this._mapService.SubscribeToMapEvent('zoomchanged').subscribe(() => {
            this._mapService.GetZoom().then((z) => {
                if (this._zoom !== z) {
                    this._zoom = z;
                    this.ZoomChange.emit(z);
                }
            });
        });
    }
    /**
     * Initializes the map.
     *
     * \@memberof MapComponent
     * @param {?} el - Html elements which will host the map canvas.
     *
     * @return {?}
     */
    InitMapInstance(el) {
        this._zone.runOutsideAngular(() => {
            if (this._options.center == null) {
                this._options.center = { latitude: this._latitude, longitude: this._longitude };
            }
            if (this._options.zoom == null) {
                this._options.zoom = this._zoom;
            }
            if (this._options.mapTypeId == null) {
                this._options.mapTypeId = MapTypeId.hybrid;
            }
            if (this._box != null) {
                this._options.bounds = this._box;
            }
            this._mapPromise = this._mapService.CreateMap(el, this._options);
            this.HandleMapCenterChange();
            this.HandleMapBoundsChange();
            this.HandleMapZoomChange();
            this.HandleMapClickEvents();
        });
    }
    /**
     * Updates the map center based on the geo properties of the component.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    UpdateCenter() {
        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
            return;
        }
        this._mapService.SetCenter({
            latitude: this._latitude,
            longitude: this._longitude,
        });
    }
}
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
                template: `
        <div #container class='map-container-inner'></div>
        <div class='map-content'>
            <ng-content></ng-content>
        </div>
    `,
                styles: [`
        .map-container-inner { width: inherit; height: inherit; }
        .map-container-inner div { background-repeat: no-repeat; }
        .map-content { display:none; }
    `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFLWixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcURsRCxNQUFNOzs7Ozs7Ozs7SUF3TEYsWUFBb0IsV0FBdUIsRUFBVSxLQUFhO1FBQTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTswQkFuTDdDLENBQUM7eUJBQ0YsQ0FBQztxQkFDTCxDQUFDO3dCQUVlLEVBQUU7b0JBQ2IsSUFBSTsrQkFFNkMsSUFBSTs7Ozs7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TSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7OztBQVdoRixNQUFNLDhCQUE4QixDQUFvQixFQUFFLENBQWEsSUFBa0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7Ozs7Ozs7QUFVMUgsTUFBTSw0QkFBNEIsQ0FBb0IsSUFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7Ozs7Ozs7QUFhMUYsTUFBTSwrQkFBK0IsQ0FBb0IsRUFBRSxDQUFhLEVBQUUsQ0FBZSxFQUFFLENBQWlCO0lBQ3hHLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN6Qzs7Ozs7Ozs7Ozs7QUFZRCxNQUFNLGdDQUFnQyxDQUFvQixFQUFFLENBQWEsRUFBRSxDQUFlO0lBQ3RGLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZDOzs7Ozs7Ozs7OztBQVlELE1BQU0saUNBQWlDLENBQW9CLEVBQUUsQ0FBYSxFQUFFLENBQWU7SUFDdkYsTUFBTSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgU2ltcGxlQ2hhbmdlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXBzZXJ2aWNlZmFjdG9yeSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvaW5mb2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9seWdvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb2x5Z29uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9seWxpbmUuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJveCc7XG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuL21hcC1tYXJrZXInO1xuXG4vKipcbiAqIFJlbmRlcnMgYSBtYXAgYmFzZWQgb24gYSBnaXZlbiBwcm92aWRlci5cbiAqICoqSW1wb3J0YW50IG5vdGUqKjogVG8gYmUgYWJsZSBzZWUgYSBtYXAgaW4gdGhlIGJyb3dzZXIsIHlvdSBoYXZlIHRvIGRlZmluZSBhIGhlaWdodCBmb3IgdGhlIENTU1xuICogY2xhc3MgYG1hcC1jb250YWluZXJgLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj48L3gtbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAneC1tYXAnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1hcFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeV0sIHVzZUZhY3Rvcnk6IE1hcFNlcnZpY2VDcmVhdG9yIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTWFya2VyU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2UsIENsdXN0ZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogTWFya2VyU2VydmljZUZhY3RvcnkgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogSW5mb0JveFNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZSxcbiAgICAgICAgICAgICAgICBNYXJrZXJTZXJ2aWNlXSwgdXNlRmFjdG9yeTogSW5mb0JveFNlcnZpY2VGYWN0b3J5XG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTGF5ZXJTZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2VdLCB1c2VGYWN0b3J5OiBMYXllclNlcnZpY2VGYWN0b3J5IH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2x1c3RlclNlcnZpY2UsIGRlcHM6IFtNYXBTZXJ2aWNlRmFjdG9yeSwgTWFwU2VydmljZV0sIHVzZUZhY3Rvcnk6IENsdXN0ZXJTZXJ2aWNlRmFjdG9yeSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFBvbHlnb25TZXJ2aWNlLCBkZXBzOiBbTWFwU2VydmljZUZhY3RvcnksIE1hcFNlcnZpY2UsIExheWVyU2VydmljZV0sIHVzZUZhY3Rvcnk6IFBvbHlnb25TZXJ2aWNlRmFjdG9yeSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFBvbHlsaW5lU2VydmljZSwgZGVwczogW01hcFNlcnZpY2VGYWN0b3J5LCBNYXBTZXJ2aWNlLCBMYXllclNlcnZpY2VdLCB1c2VGYWN0b3J5OiBQb2x5bGluZVNlcnZpY2VGYWN0b3J5IH1cbiAgICBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBjbGFzcz0nbWFwLWNvbnRhaW5lci1pbm5lcic+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J21hcC1jb250ZW50Jz5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC5tYXAtY29udGFpbmVyLWlubmVyIHsgd2lkdGg6IGluaGVyaXQ7IGhlaWdodDogaW5oZXJpdDsgfVxuICAgICAgICAubWFwLWNvbnRhaW5lci1pbm5lciBkaXYgeyBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyB9XG4gICAgICAgIC5tYXAtY29udGVudCB7IGRpc3BsYXk6bm9uZTsgfVxuICAgIGBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlID0gMDtcbiAgICBwcml2YXRlIF9sYXRpdHVkZSA9IDA7XG4gICAgcHJpdmF0ZSBfem9vbSA9IDA7XG4gICAgcHJpdmF0ZSBfY2xpY2tUaW1lb3V0OiBudW1iZXIgfCBOb2RlSlMuVGltZXI7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSU1hcE9wdGlvbnMgPSB7fTtcbiAgICBwcml2YXRlIF9ib3g6IElCb3ggPSBudWxsO1xuICAgIHByaXZhdGUgX21hcFByb21pc2U6IFByb21pc2U8dm9pZD47XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXAtY29udGFpbmVyJykgcHVibGljIF9jb250YWluZXJDbGFzczogYm9vbGVhbiA9IHRydWU7XG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgcHJpdmF0ZSBfY29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFwTWFya2VyRGlyZWN0aXZlKSBwcml2YXRlIF9tYXJrZXJzOiBBcnJheTxNYXBNYXJrZXJEaXJlY3RpdmU+O1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0IG9yIHNldHMgdGhlIG1heGltdW0gYW5kIG1pbmltdW0gYm91bmRpbmcgYm94IGZvciBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IEJveCgpOiBJQm94IHsgcmV0dXJuIHRoaXMuX2JveDsgfVxuICAgIHB1YmxpYyBzZXQgQm94KHZhbDogSUJveCkgeyB0aGlzLl9ib3ggPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbGF0aXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgTGF0aXR1ZGUoKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2xvbmdpdHVkZTsgfVxuICAgIHB1YmxpYyBzZXQgTGF0aXR1ZGUodmFsdWU6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sYXRpdHVkZSA9IHRoaXMuQ29udmVydFRvRGVjaW1hbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsb25naXR1ZGUgdGhhdCBzZXRzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgTG9uZ2l0dWRlKCk6IG51bWJlciB8IHN0cmluZyB7IHJldHVybiB0aGlzLl9sb25naXR1ZGU7IH1cbiAgICBwdWJsaWMgc2V0IExvbmdpdHVkZSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xvbmdpdHVkZSA9IHRoaXMuQ29udmVydFRvRGVjaW1hbCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIGdlbmVyYWwgbWFwIE9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgT3B0aW9ucygpOiBJTWFwT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XG4gICAgcHVibGljIHNldCBPcHRpb25zKHZhbDogSU1hcE9wdGlvbnMpIHsgdGhpcy5fb3B0aW9ucyA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGA4YC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgWm9vbSgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5fem9vbTsgfVxuICAgIHB1YmxpYyBzZXQgWm9vbSh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3pvb20gPSB0aGlzLkNvbnZlcnRUb0RlY2ltYWwodmFsdWUsIDgpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3pvb20gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldFpvb20odGhpcy5fem9vbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJvdW5kaW5nIGJveCBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIEJvdW5kc0NoYW5nZTogRXZlbnRFbWl0dGVyPElCb3g+ID0gbmV3IEV2ZW50RW1pdHRlcjxJQm94PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBjZW50ZXIgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBDZW50ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJTGF0TG9uZz4gPSBuZXcgRXZlbnRFbWl0dGVyPElMYXRMb25nPigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXG4gICAgICogbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIE1hcENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIE1hcERibENsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgcmlnaHQtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBNYXBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBkb3VibGUtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgTWFwTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgc2VydmljZSBpcyBhdmFpbGFibGUgYW5kIHRoZSBtYXBzIGhhcyBiZWVuXG4gICAgICogSW5pdGlhbGl6ZWQgKGJ1dCBub3QgbmVjZXNzYXJpbHkgY3JlYXRlZCkuIEl0IGNvbnRhaW5zIGEgUHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCByZXR1cm5zXG4gICAgICogdGhlIG1haW4gbWFwIG9iamVjdCBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBNYXBQcm9taXNlOiBFdmVudEVtaXR0ZXI8UHJvbWlzZTxhbnk+PiA9IG5ldyBFdmVudEVtaXR0ZXI8UHJvbWlzZTxhbnk+PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWlpdGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCB6b29tIGNoYW5nZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBab29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8TnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBzZXJ2aWNlIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1hcHMgaGFzIGJlZW5cbiAgICAgKiBJbml0aWFsaXplZFxuICAgICAqIEBtZW1iZXJPZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBNYXBTZXJ2aWNlOiBFdmVudEVtaXR0ZXI8TWFwU2VydmljZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFNlcnZpY2U+KCk7XG5cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBDb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBtYXAgc2VydmljZSBmb3IgdGhlIHVuZGVybHlpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbnMuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9ucy5cbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIENvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuSW5pdE1hcEluc3RhbmNlKHRoaXMuX2NvbnRhaW5lci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5NYXBQcm9taXNlLmVtaXQodGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlKTtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmVtaXQodGhpcy5fbWFwU2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWFwUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXNbJ0JveCddKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JveCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU2V0Vmlld09wdGlvbnMoPElNYXBPcHRpb25zPntcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kczogdGhpcy5fYm94XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzWydPcHRpb25zJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlNldE1hcE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkRpc3Bvc2VNYXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIHJlc2l6ZSBldmVudCBvbiB0aGUgbWFwIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBUcmlnZ2VyUmVzaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBOb3RlOiBXaGVuIHdlIHdvdWxkIHRyaWdnZXIgdGhlIHJlc2l6ZSBldmVudCBhbmQgc2hvdyB0aGUgbWFwIGluIHRoZSBzYW1lIHR1cm4gKHdoaWNoIGlzIGFcbiAgICAgICAgLy8gY29tbW9uIGNhc2UgZm9yIHRyaWdnZXJpbmcgYSByZXNpemUgZXZlbnQpLCB0aGVuIHRoZSByZXNpemUgZXZlbnQgd291bGQgbm90XG4gICAgICAgIC8vIHdvcmsgKHRvIHNob3cgdGhlIG1hcCksIHNvIHdlIHRyaWdnZXIgdGhlIGV2ZW50IGluIGEgdGltZW91dC5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuVHJpZ2dlck1hcEV2ZW50KCdyZXNpemUnKS50aGVuKCgpID0+IHJlc29sdmUoKSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzLlxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBudW1iZXItaXNoIHZhbHVlIHRvIGEgbnVtYmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAgICogQHBhcmFtIFtkZWZhdWx0VmFsdWU9bnVsbF0gLSBEZWZhdWx0IHZhbHVlIHRvIHVzZSBpZiB0aGUgY29udmVyc2lvbiBjYW5ub3QgYmUgcGVyZm9ybWVkLlxuICAgICAqIEByZXR1cm5zIC0gQ29udmVydGVkIG51bWJlciBvZiB0aGUgZGVmYXVsdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBDb21wb25lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIENvbnZlcnRUb0RlY2ltYWwodmFsdWU6IHN0cmluZyB8IG51bWJlciwgZGVmYXVsdFZhbHVlOiBudW1iZXIgPSBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gPG51bWJlcj52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIHRoZSBtYXAgY2xpY2sgZXZlbnRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgSGFuZGxlTWFwQ2xpY2tFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcFNlcnZpY2UuU3Vic2NyaWJlVG9NYXBFdmVudDxhbnk+KCdjbGljaycpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBzaW5jZSBiaW5nIHdpbGwgdHJlYXQgYSBkb3VibGVjbGljayBmaXJzdCBhcyB0d28gY2xpY2tzLi4uJ1xuICAgICAgICAgICAgLy8vXG4gICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLk1hcENsaWNrLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ2RibGNsaWNrJykuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWNrVGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCg8Tm9kZUpTLlRpbWVyPnRoaXMuX2NsaWNrVGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLk1hcERibENsaWNrLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PigncmlnaHRjbGljaycpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgIHRoaXMuTWFwUmlnaHRDbGljay5lbWl0KDxNb3VzZUV2ZW50PmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TdWJzY3JpYmVUb01hcEV2ZW50PGFueT4oJ21vdXNlb3ZlcicpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgIHRoaXMuTWFwTW91c2VPdmVyLmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2VvdXQnKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICB0aGlzLk1hcE1vdXNlT3V0LmVtaXQoPE1vdXNlRXZlbnQ+ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8YW55PignbW91c2Vtb3ZlJykuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5NYXBNb3VzZU1vdmUuZW1pdCg8TW91c2VFdmVudD5lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIGNlbnRlciBjaGFuZ2UgZXZlbnRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgSGFuZGxlTWFwQm91bmRzQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2JvdW5kc2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRCb3VuZHMoKS50aGVuKChib3VuZHM6IElCb3gpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLkJvdW5kc0NoYW5nZS5lbWl0KGJvdW5kcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgbWFwIGNlbnRlciBjaGFuZ2UgZXZlbnRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ2NlbnRlcmNoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRDZW50ZXIoKS50aGVuKChjZW50ZXI6IElMYXRMb25nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhdGl0dWRlICE9PSBjZW50ZXIubGF0aXR1ZGUgfHwgdGhpcy5fbG9uZ2l0dWRlICE9PSBjZW50ZXIubG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhdGl0dWRlID0gY2VudGVyLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSBjZW50ZXIubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkNlbnRlckNoYW5nZS5lbWl0KDxJTGF0TG9uZz57IGxhdGl0dWRlOiB0aGlzLl9sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGhhbmRsaW5nIG1hcCB6b29tIGNoYW5nZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBIYW5kbGVNYXBab29tQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLlN1YnNjcmliZVRvTWFwRXZlbnQ8dm9pZD4oJ3pvb21jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuR2V0Wm9vbSgpLnRoZW4oKHo6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl96b29tICE9PSB6KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb20gPSB6O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLlpvb21DaGFuZ2UuZW1pdCh6KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbCAtIEh0bWwgZWxlbWVudHMgd2hpY2ggd2lsbCBob3N0IHRoZSBtYXAgY2FudmFzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgSW5pdE1hcEluc3RhbmNlKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNlbnRlciA9PSBudWxsKSB7IHRoaXMuX29wdGlvbnMuY2VudGVyID0geyBsYXRpdHVkZTogdGhpcy5fbGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5fbG9uZ2l0dWRlIH07IH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnpvb20gPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLnpvb20gPSB0aGlzLl96b29tOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5tYXBUeXBlSWQgPT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLm1hcFR5cGVJZCA9IE1hcFR5cGVJZC5oeWJyaWQ7IH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9ib3ggIT0gbnVsbCkgeyB0aGlzLl9vcHRpb25zLmJvdW5kcyA9IHRoaXMuX2JveDsgfVxuICAgICAgICAgICAgdGhpcy5fbWFwUHJvbWlzZSA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlTWFwKGVsLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcEJvdW5kc0NoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy5IYW5kbGVNYXBab29tQ2hhbmdlKCk7XG4gICAgICAgICAgICB0aGlzLkhhbmRsZU1hcENsaWNrRXZlbnRzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIG1hcCBjZW50ZXIgYmFzZWQgb24gdGhlIGdlbyBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBVcGRhdGVDZW50ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLl9sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5TZXRDZW50ZXIoe1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMuX2xhdGl0dWRlLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLl9sb25naXR1ZGUsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgY2x1c3RlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgQ2x1c3RlciBTZXJ2aWNlIGJhc2VkIG9uIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENsdXN0ZXJTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlIHsgcmV0dXJuIGYuQ3JlYXRlQ2x1c3RlclNlcnZpY2UobSk7IH1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgaW5mb2JveCBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXJrZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIEluZm9Cb3ggU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gSW5mb0JveFNlcnZpY2VGYWN0b3J5KGY6IE1hcFNlcnZpY2VGYWN0b3J5LCBtOiBNYXBTZXJ2aWNlLFxuICAgIG1hOiBNYXJrZXJTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVJbmZvQm94U2VydmljZShtLCBtYSk7IH1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbGF5ZXIgc2VydmljZSBpbnN0YW5jZS4gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvZiBjb25zdHJhaW50cyB3aXRoIEFPVCB0aGF0IGRvIG5vIGFsbG93XG4gKiB1cyB0byB1c2UgbGFtZGEgZnVuY3Rpb25zIGlubGluZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0gZiAtIFRoZSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIG0gLSBBIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIExheWVyIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExheWVyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UpOiBMYXllclNlcnZpY2UgeyByZXR1cm4gZi5DcmVhdGVMYXllclNlcnZpY2UobSk7IH1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgbWFwIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cbiAqIEByZXR1cm5zIC0gQSBjb25jcmV0ZSBpbnN0YW5jZSBvZiBhIE1hcFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1hcFNlcnZpY2VDcmVhdG9yKGY6IE1hcFNlcnZpY2VGYWN0b3J5KTogTWFwU2VydmljZSB7IHJldHVybiBmLkNyZWF0ZSgpOyB9XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBhIG1hcmtlciBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxuICogQHBhcmFtIGMgLSBBIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW5zdGFuY2UuXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBNYXJrZXIgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gTWFya2VyU2VydmljZUZhY3RvcnkoZjogTWFwU2VydmljZUZhY3RvcnksIG06IE1hcFNlcnZpY2UsIGw6IExheWVyU2VydmljZSwgYzogQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlIHtcbiAgICByZXR1cm4gZi5DcmVhdGVNYXJrZXJTZXJ2aWNlKG0sIGwsIGMpO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBwb2x5Z29uIHNlcnZpY2UgaW5zdGFuY2UuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugb2YgY29uc3RyYWludHMgd2l0aCBBT1QgdGhhdCBkbyBubyBhbGxvd1xuICogdXMgdG8gdXNlIGxhbWRhIGZ1bmN0aW9ucyBpbmxpbmUuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIGYgLSBUaGUge0BsaW5rIE1hcFNlcnZpY2VGYWN0b3J5fSBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSBtIC0gQSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuXG4gKiBAcGFyYW0gbCAtIEEge0BsaW5rIExheWVyU2VydmljZX0gaW5zdGFuY2UuXG4gKiBAcmV0dXJucyAtIEEgY29uY3JldGUgaW5zdGFuY2Ugb2YgYSBQb2x5Z29uIFNlcnZpY2UgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFBvbHlnb25TZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2Uge1xuICAgIHJldHVybiBmLkNyZWF0ZVBvbHlnb25TZXJ2aWNlKG0sIGwpO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgYSBwb2x5bGluZSBzZXJ2aWNlIGluc3RhbmNlLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzIHdpdGggQU9UIHRoYXQgZG8gbm8gYWxsb3dcbiAqIHVzIHRvIHVzZSBsYW1kYSBmdW5jdGlvbnMgaW5saW5lLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBmIC0gVGhlIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0gbSAtIEEge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICogQHBhcmFtIGwgLSBBIHtAbGluayBMYXllclNlcnZpY2V9IGluc3RhbmNlLlxuICogQHJldHVybnMgLSBBIGNvbmNyZXRlIGluc3RhbmNlIG9mIGEgUG9seWxpbmUgU2VydmljZSBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUG9seWxpbmVTZXJ2aWNlRmFjdG9yeShmOiBNYXBTZXJ2aWNlRmFjdG9yeSwgbTogTWFwU2VydmljZSwgbDogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlIHtcbiAgICByZXR1cm4gZi5DcmVhdGVQb2x5bGluZVNlcnZpY2UobSwgbCk7XG59XG4iXX0=