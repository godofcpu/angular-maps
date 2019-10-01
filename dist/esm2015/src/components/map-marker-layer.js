/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import { LayerService } from '../services/layer.service';
import { ClusterService } from '../services/cluster.service';
import { MapService } from '../services/map.service';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterLayerDirective } from './cluster-layer';
/** *
 * internal counter to use as ids for marker.
  @type {?} */
let layerId = 1000000;
/**
 * MapMarkerLayerDirective performantly renders a large set of map marker inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker-layer [MarkerOptions]="_markers"></x-map-marker-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class MapMarkerLayerDirective {
    /**
     * Creates an instance of MapMarkerLayerDirective.
     * \@memberof MapMarkerLayerDirective
     * @param {?} _markerService - Concreate implementation of a {\@link MarkerService}.
     * @param {?} _layerService - Concreate implementation of a {\@link LayerService}.
     * @param {?} _clusterService - Concreate implementation of a {\@link ClusterService}.
     * @param {?} _mapService - Concreate implementation of a {\@link MapService}.
     * @param {?} _zone - Concreate implementation of a {\@link NgZone} service.
     *
     */
    constructor(_markerService, _layerService, _clusterService, _mapService, _zone) {
        this._markerService = _markerService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._streaming = false;
        this._markers = new Array();
        this._markersLast = new Array();
        /**
         * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterClickAction = ClusterClickAction.ZoomIntoCluster;
        /**
         * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ClusterPlacementMode = ClusterPlacementMode.MeanValue;
        /**
         * Determines whether the layer clusters. This property can only be set on creation of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.EnableClustering = false;
        /**
         * Gets or sets the grid size to be used for clustering.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.GridSize = 150;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.ZIndex = 0;
        /**
         * Gets or sets whether the cluster should zoom in on click
         *
         * \@readonly
         * \@memberof MapMarkerLayerDirective
         */
        this.ZoomOnClick = true;
        /**
         * This event emitter gets emitted when the dynamic icon for a marker is being created.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks a marker in the layer.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.MarkerClick = new EventEmitter();
        /**
         * This event is fired when the user stops dragging a marker.
         *
         * \@memberof MapMarkerLayerDirective
         */
        this.DragEnd = new EventEmitter();
        this._id = layerId++;
    }
    /**
     * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
     * you cannot set a custom marker callback.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get CustomMarkerCallback() { return this._iconCreationCallback; }
    /**
     * @param {?} val
     * @return {?}
     */
    set CustomMarkerCallback(val) {
        if (this._useDynamicSizeMarker) {
            throw (new Error(`You cannot set a custom marker callback when UseDynamicSizeMarkers is set to true.
                    Set UseDynamicSizeMakers to false.`));
        }
        this._iconCreationCallback = val;
    }
    /**
     * Gets or sets the base size of dynamic markers in pixels. The actualy size of the dynamic marker is based on this.
     * See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerBaseSize() { return this._dynamicMarkerBaseSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerBaseSize(val) { this._dynamicMarkerBaseSize = val; }
    /**
     * Gets or sets the ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range. See {\@link UseDynamicSizeMarkers}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get DynamicMarkerRanges() { return this._dynamicMarkerRanges; }
    /**
     * @param {?} val
     * @return {?}
     */
    set DynamicMarkerRanges(val) { this._dynamicMarkerRanges = val; }
    /**
     *  IMarkerOptions array holding the marker info.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get MarkerOptions() { return this._markers; }
    /**
     * @param {?} val
     * @return {?}
     */
    set MarkerOptions(val) {
        if (this._streaming) {
            this._markersLast.push(...val.slice(0));
            this._markers.push(...val);
        }
        else {
            this._markers = val.slice(0);
        }
    }
    /**
     * Gets or sets the cluster styles
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get Styles() { return this._styles; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Styles(val) { this._styles = val; }
    /**
     * Sets whether to treat changes in the MarkerOptions as streams of new markers. In thsi mode, changing the
     * Array supplied in MarkerOptions will be incrementally drawn on the map as opposed to replace the markers on the map.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get TreatNewMarkerOptionsAsStream() { return this._streaming; }
    /**
     * @param {?} val
     * @return {?}
     */
    set TreatNewMarkerOptionsAsStream(val) { this._streaming = val; }
    /**
     * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
     * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get UseDynamicSizeMarkers() { return this._useDynamicSizeMarker; }
    /**
     * @param {?} val
     * @return {?}
     */
    set UseDynamicSizeMarkers(val) {
        this._useDynamicSizeMarker = val;
        if (val) {
            this._iconCreationCallback = (m, info) => {
                return ClusterLayerDirective.CreateDynamicSizeMarker(m.length, info, this._dynamicMarkerBaseSize, this._dynamicMarkerRanges);
            };
        }
    }
    /**
     * Gets the id of the marker layer.
     *
     * \@readonly
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Translates a geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    LocationToPixel(loc) {
        return this._markerService.LocationToPoint(loc);
    }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(() => {
            /** @type {?} */
            const fakeLayerDirective = {
                Id: this._id,
                Visible: this.Visible
            };
            if (!this.EnableClustering) {
                this._layerService.AddLayer(fakeLayerDirective);
                this._layerPromise = this._layerService.GetNativeLayer(fakeLayerDirective);
                this._service = this._layerService;
            }
            else {
                fakeLayerDirective.LayerOffset = this.LayerOffset;
                fakeLayerDirective.ZIndex = this.ZIndex;
                fakeLayerDirective.ClusteringEnabled = this.EnableClustering;
                fakeLayerDirective.ClusterPlacementMode = this.ClusterPlacementMode;
                fakeLayerDirective.GridSize = this.GridSize;
                fakeLayerDirective.ClusterClickAction = this.ClusterClickAction;
                fakeLayerDirective.IconInfo = this.ClusterIconInfo;
                fakeLayerDirective.CustomMarkerCallback = this.CustomMarkerCallback;
                fakeLayerDirective.UseDynamicSizeMarkers = this.UseDynamicSizeMarkers;
                this._clusterService.AddLayer(fakeLayerDirective);
                this._layerPromise = this._clusterService.GetNativeLayer(fakeLayerDirective);
                this._service = this._clusterService;
            }
            this._layerPromise.then(l => {
                l.SetVisible(this.Visible);
                if (this.MarkerOptions) {
                    this._zone.runOutsideAngular(() => this.UpdateMarkers());
                }
            });
        });
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._layerPromise.then(l => {
            l.Delete();
        });
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let shouldSetOptions = false;
        /** @type {?} */
        const o = {
            id: this._id
        };
        if (changes['MarkerOptions']) {
            this._zone.runOutsideAngular(() => {
                this.UpdateMarkers();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._zone.runOutsideAngular(() => {
                this._layerPromise.then(l => l.SetVisible(this.Visible));
            });
        }
        if (changes['EnableClustering'] && !changes['EnableClustering'].firstChange) {
            if ('StopClustering' in this._service) {
                o.clusteringEnabled = this.EnableClustering;
                shouldSetOptions = true;
            }
            else {
                throw (new Error('You cannot change EnableClustering after the layer has been created.'));
            }
        }
        if (changes['ClusterPlacementMode'] && !changes['ClusterPlacementMode'].firstChange && 'StopClustering' in this._service) {
            o.placementMode = this.ClusterPlacementMode;
            shouldSetOptions = true;
        }
        if (changes['GridSize'] && !changes['GridSize'].firstChange && 'StopClustering' in this._service) {
            o.gridSize = this.GridSize;
            shouldSetOptions = true;
        }
        if (changes['ClusterClickAction'] && !changes['ClusterClickAction'].firstChange && 'StopClustering' in this._service) {
            o.zoomOnClick = this.ClusterClickAction === ClusterClickAction.ZoomIntoCluster;
            shouldSetOptions = true;
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange) ||
            (changes['IconInfo'] && !changes['IconInfo'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if (shouldSetOptions) {
            this._zone.runOutsideAngular(() => {
                /** @type {?} */
                const fakeLayerDirective = { Id: this._id };
                this._layerPromise.then(l => l.SetOptions(o));
            });
        }
    }
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerLayerDirective
     * @return {?} - string representation of the marker id.
     */
    toString() { return 'MapMarkerLayer-' + this._id.toString(); }
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @param {?} m - the marker for which to add the event.
     *
     * @return {?}
     */
    AddEventListeners(m) {
        m.AddListener('click', (e) => this.MarkerClick.emit({
            Marker: m,
            Click: e,
            Location: this._markerService.GetCoordinatesFromClick(e),
            Pixels: this._markerService.GetPixelsFromClick(e)
        }));
        m.AddListener('dragend', (e) => this.DragEnd.emit({
            Marker: m,
            Click: e,
            Location: this._markerService.GetCoordinatesFromClick(e),
            Pixels: this._markerService.GetPixelsFromClick(e)
        }));
    }
    /**
     * Sets or updates the markers based on the marker options. This will place the markers on the map
     * and register the associated events.
     *
     * \@memberof MapMarkerLayerDirective
     * \@method
     * @return {?}
     */
    UpdateMarkers() {
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(l => {
            /** @type {?} */
            const markers = this._streaming ? this._markersLast.splice(0) : this._markers;
            /** @type {?} */
            const mp = this._service.CreateMarkers(markers, this.IconInfo);
            // set markers once promises are fullfilled.
            mp.then(m => {
                m.forEach(marker => {
                    this.AddEventListeners(marker);
                });
                this._streaming ? l.AddEntities(m) : l.SetEntities(m);
            });
        });
    }
}
MapMarkerLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-marker-layer'
            },] },
];
/** @nocollapse */
MapMarkerLayerDirective.ctorParameters = () => [
    { type: MarkerService },
    { type: LayerService },
    { type: ClusterService },
    { type: MapService },
    { type: NgZone }
];
MapMarkerLayerDirective.propDecorators = {
    ClusterClickAction: [{ type: Input }],
    ClusterIconInfo: [{ type: Input }],
    ClusterPlacementMode: [{ type: Input }],
    CustomMarkerCallback: [{ type: Input }],
    DynamicMarkerBaseSize: [{ type: Input }],
    DynamicMarkerRanges: [{ type: Input }],
    EnableClustering: [{ type: Input }],
    GridSize: [{ type: Input }],
    IconInfo: [{ type: Input }],
    LayerOffset: [{ type: Input }],
    MarkerOptions: [{ type: Input }],
    Styles: [{ type: Input }],
    TreatNewMarkerOptionsAsStream: [{ type: Input }],
    UseDynamicSizeMarkers: [{ type: Input }],
    Visible: [{ type: Input }],
    ZIndex: [{ type: Input }],
    ZoomOnClick: [{ type: Input }],
    DynamicMarkerCreated: [{ type: Output }],
    MarkerClick: [{ type: Output }],
    DragEnd: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MapMarkerLayerDirective.prototype._id;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._service;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._styles;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._iconCreationCallback;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._streaming;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markers;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markersLast;
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterClickAction;
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterIconInfo;
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ClusterPlacementMode;
    /**
     * Determines whether the layer clusters. This property can only be set on creation of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.EnableClustering;
    /**
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.GridSize;
    /**
     * Gets or sets the IconInfo to be used to create a custom marker images. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.IconInfo;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.LayerOffset;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZIndex;
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.ZoomOnClick;
    /**
     * This event emitter gets emitted when the dynamic icon for a marker is being created.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DynamicMarkerCreated;
    /**
     * This event emitter gets emitted when the user clicks a marker in the layer.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.MarkerClick;
    /**
     * This event is fired when the user stops dragging a marker.
     *
     * \@memberof MapMarkerLayerDirective
     * @type {?}
     */
    MapMarkerLayerDirective.prototype.DragEnd;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._layerService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._clusterService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._mapService;
    /** @type {?} */
    MapMarkerLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBb0QsTUFBTSxFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQVN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLeEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCdEIsTUFBTTs7Ozs7Ozs7Ozs7SUFpUEYsWUFDWSxnQkFDQSxlQUNBLGlCQUNBLGFBQ0E7UUFKQSxtQkFBYyxHQUFkLGNBQWM7UUFDZCxrQkFBYSxHQUFiLGFBQWE7UUFDYixvQkFBZSxHQUFmLGVBQWU7UUFDZixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSztxQ0E3T2UsS0FBSztzQ0FDSixFQUFFO29DQUNpQixJQUFJLEdBQUcsQ0FBaUI7WUFDeEUsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUM7WUFDOUIsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUM7WUFDaEMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdC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LEtBQUs7b0NBVUwsS0FBSztzQkFpQkwsS0FBSztxQkFPTCxLQUFLOzBCQVFMLEtBQUs7bUNBWUwsTUFBTTswQkFPTixNQUFNO3NCQU9OLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgU2ltcGxlQ2hhbmdlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyxcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElNYXJrZXJFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1ldmVudCc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcbmltcG9ydCB7IElNYXJrZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1pY29uLWluZm8nO1xuaW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBDbHVzdGVyQ2xpY2tBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1jbGljay1hY3Rpb24nO1xuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XG5pbXBvcnQgeyBDbHVzdGVyTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NsdXN0ZXItbGF5ZXInO1xuXG4vKipcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgbWFya2VyLlxuICovXG5sZXQgbGF5ZXJJZCA9IDEwMDAwMDA7XG5cbi8qKlxuICogTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUgcGVyZm9ybWFudGx5IHJlbmRlcnMgYSBsYXJnZSBzZXQgb2YgbWFwIG1hcmtlciBpbnNpZGUgYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgLm1hcC1jb250YWluZXIge1xuICogICAgIGhlaWdodDogMzAwcHg7XG4gKiAgIH1cbiAqIGBdLFxuICogdGVtcGxhdGU6IGBcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cbiAqICAgICAgPHgtbWFwLW1hcmtlci1sYXllciBbTWFya2VyT3B0aW9uc109XCJfbWFya2Vyc1wiPjwveC1tYXAtbWFya2VyLWxheWVyPlxuICogICA8L3gtbWFwPlxuICogYFxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1tYXJrZXItbGF5ZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbGF5ZXJQcm9taXNlOiBQcm9taXNlPExheWVyPjtcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBMYXllclNlcnZpY2U7XG4gICAgcHJpdmF0ZSBfc3R5bGVzOiBBcnJheTxJQ2x1c3Rlckljb25JbmZvPjtcbiAgICBwcml2YXRlIF91c2VEeW5hbWljU2l6ZU1hcmtlciA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IDE4O1xuICAgIHByaXZhdGUgX2R5bmFtaWNNYXJrZXJSYW5nZXM6IE1hcDxudW1iZXIsIHN0cmluZz4gPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPihbXG4gICAgICAgIFsxMCwgJ3JnYmEoMjAsIDE4MCwgMjAsIDAuNSknXSxcbiAgICAgICAgWzEwMCwgJ3JnYmEoMjU1LCAyMTAsIDQwLCAwLjUpJ10sXG4gICAgICAgIFtOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAsICdyZ2JhKDI1NSwgNDAsIDQwLCAwLjUpJ11cbiAgICBdKTtcbiAgICBwcml2YXRlIF9pY29uQ3JlYXRpb25DYWxsYmFjazogKG06IEFycmF5PE1hcmtlcj4sIGk6IElNYXJrZXJJY29uSW5mbykgPT4gc3RyaW5nO1xuICAgIHByaXZhdGUgX3N0cmVhbWluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX21hcmtlcnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiA9IG5ldyBBcnJheTxJTWFya2VyT3B0aW9ucz4oKTtcbiAgICBwcml2YXRlIF9tYXJrZXJzTGFzdDogQXJyYXk8SU1hcmtlck9wdGlvbnM+ID0gbmV3IEFycmF5PElNYXJrZXJPcHRpb25zPigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRoZSBDbHVzdGVyIENsaWNrIEFjdGlvbiB7QGxpbmsgQ2x1c3RlckNsaWNrQWN0aW9ufS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBDbHVzdGVyQ2xpY2tBY3Rpb246IENsdXN0ZXJDbGlja0FjdGlvbiA9ICBDbHVzdGVyQ2xpY2tBY3Rpb24uWm9vbUludG9DbHVzdGVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gU3VwcG9ydHMgZm9udC1iYXNlZCwgU1ZHLCBncmFwaGljcyBhbmQgbW9yZS5cbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgQ2x1c3Rlckljb25JbmZvOiBJTWFya2VySWNvbkluZm87XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGNsdXN0ZXIgcGxhY2VtZW50IG1vZGUuIHtAbGluayBDbHVzdGVyUGxhY2VtZW50TW9kZX1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpICBwdWJsaWMgQ2x1c3RlclBsYWNlbWVudE1vZGU6IENsdXN0ZXJQbGFjZW1lbnRNb2RlID0gQ2x1c3RlclBsYWNlbWVudE1vZGUuTWVhblZhbHVlO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjYWxsYmFjayBpbnZva2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gTm90ZSB0aGF0IHdoZW4ge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30gaXMgZW5hYmxlZCxcbiAgICAgKiB5b3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IEN1c3RvbU1hcmtlckNhbGxiYWNrKCk6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZyAgeyByZXR1cm4gdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2s7IH1cbiAgICAgICAgcHVibGljIHNldCBDdXN0b21NYXJrZXJDYWxsYmFjayh2YWw6IChtOiBBcnJheTxNYXJrZXI+LCBpOiBJTWFya2VySWNvbkluZm8pID0+IHN0cmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3coXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcihgWW91IGNhbm5vdCBzZXQgYSBjdXN0b20gbWFya2VyIGNhbGxiYWNrIHdoZW4gVXNlRHluYW1pY1NpemVNYXJrZXJzIGlzIHNldCB0byB0cnVlLlxuICAgICAgICAgICAgICAgICAgICBTZXQgVXNlRHluYW1pY1NpemVNYWtlcnMgdG8gZmFsc2UuYClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faWNvbkNyZWF0aW9uQ2FsbGJhY2sgPSB2YWw7XG4gICAgICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgYmFzZSBzaXplIG9mIGR5bmFtaWMgbWFya2VycyBpbiBwaXhlbHMuIFRoZSBhY3R1YWx5IHNpemUgb2YgdGhlIGR5bmFtaWMgbWFya2VyIGlzIGJhc2VkIG9uIHRoaXMuXG4gICAgICogU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlckJhc2VTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fZHluYW1pY01hcmtlckJhc2VTaXplOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlckJhc2VTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSByYW5nZXMgdG8gdXNlIHRvIGNhbGN1bGF0ZSBicmVha3BvaW50cyBhbmQgY29sb3JzIGZvciBkeW5hbWljIG1hcmtlcnMuXG4gICAgICogVGhlIG1hcCBjb250YWlucyBrZXkvdmFsdWUgcGFpcnMsIHdpdGggdGhlIGtleXMgYmVpbmdcbiAgICAgKiB0aGUgYnJlYWtwb2ludCBzaXplcyBhbmQgdGhlIHZhbHVlcyB0aGUgY29sb3JzIHRvIGJlIHVzZWQgZm9yIHRoZSBkeW5hbWljIG1hcmtlciBpbiB0aGF0IHJhbmdlLiBTZWUge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBEeW5hbWljTWFya2VyUmFuZ2VzKCk6IE1hcDxudW1iZXIsIHN0cmluZz4gIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXM7IH1cbiAgICAgICAgcHVibGljIHNldCBEeW5hbWljTWFya2VyUmFuZ2VzKHZhbDogTWFwPG51bWJlciwgc3RyaW5nPikgeyB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxheWVyIGNsdXN0ZXJzLiBUaGlzIHByb3BlcnR5IGNhbiBvbmx5IGJlIHNldCBvbiBjcmVhdGlvbiBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRW5hYmxlQ2x1c3RlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBncmlkIHNpemUgdG8gYmUgdXNlZCBmb3IgY2x1c3RlcmluZy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBHcmlkU2l6ZTogbnVtYmVyID0gMTUwO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBtYXJrZXIgaW1hZ2VzLiBTdXBwb3J0cyBmb250LWJhc2VkLCBTVkcsIGdyYXBoaWNzIGFuZCBtb3JlLlxuICAgICAqIFNlZSB7QGxpbmsgSU1hcmtlckljb25JbmZvfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBJY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGF5ZXJPZmZzZXQ6IElQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAgSU1hcmtlck9wdGlvbnMgYXJyYXkgaG9sZGluZyB0aGUgbWFya2VyIGluZm8uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IE1hcmtlck9wdGlvbnMoKTogQXJyYXk8SU1hcmtlck9wdGlvbnM+IHsgcmV0dXJuIHRoaXMuX21hcmtlcnM7IH1cbiAgICAgICAgcHVibGljIHNldCBNYXJrZXJPcHRpb25zKHZhbDogQXJyYXk8SU1hcmtlck9wdGlvbnM+KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RyZWFtaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vyc0xhc3QucHVzaCguLi52YWwuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaCguLi52YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VycyA9IHZhbC5zbGljZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHN0eWxlc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBTdHlsZXMoKTogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4geyByZXR1cm4gdGhpcy5fc3R5bGVzOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgU3R5bGVzKHZhbDogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz4pIHsgdGhpcy5fc3R5bGVzID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdG8gdHJlYXQgY2hhbmdlcyBpbiB0aGUgTWFya2VyT3B0aW9ucyBhcyBzdHJlYW1zIG9mIG5ldyBtYXJrZXJzLiBJbiB0aHNpIG1vZGUsIGNoYW5naW5nIHRoZVxuICAgICAqIEFycmF5IHN1cHBsaWVkIGluIE1hcmtlck9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBtYXJrZXJzIG9uIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IFRyZWF0TmV3TWFya2VyT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdNYXJrZXJPcHRpb25zQXNTdHJlYW0odmFsOiBib29sZWFuKSB7IHRoaXMuX3N0cmVhbWluZyA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gdXNlIGR5bmFtaWMgbWFya2Vycy4gRHluYW1pYyBtYXJrZXJzIGNoYW5nZSBpbiBzaXplIGFuZCBjb2xvciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZlxuICAgICAqIHBpbnMgaW4gdGhlIGNsdXN0ZXIuIElmIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgdGFrZSBwcmVjZW5kZW5jZSBvdmVyIGFueSBjdXN0b20gbWFya2VyIGNyZWF0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcjsgfVxuICAgICAgICBwdWJsaWMgc2V0IFVzZUR5bmFtaWNTaXplTWFya2Vycyh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZUR5bmFtaWNTaXplTWFya2VyID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gKG06IEFycmF5PE1hcmtlcj4sIGluZm86IElNYXJrZXJJY29uSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ2x1c3RlckxheWVyRGlyZWN0aXZlLkNyZWF0ZUR5bmFtaWNTaXplTWFya2VyKFxuICAgICAgICAgICAgICAgICAgICAgICAgbS5sZW5ndGgsIGluZm8sIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZSwgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWFya2VyIGxheWVyXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdGhlIGNsdXN0ZXIgc2hvdWxkIHpvb20gaW4gb24gY2xpY2tcbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBab29tT25DbGljazogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8vL1xuICAgIC8vLyBEZWxlZ2F0ZXNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgZHluYW1pYyBpY29uIGZvciBhIG1hcmtlciBpcyBiZWluZyBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHB1YmxpYyBEeW5hbWljTWFya2VyQ3JlYXRlZDogRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3MgYSBtYXJrZXIgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHB1YmxpYyBNYXJrZXJDbGljazogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyBhIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgRHJhZ0VuZDogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIG1hcmtlciBsYXllci5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmUuXG4gICAgICogQHBhcmFtIF9tYXJrZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcmtlclNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIExheWVyU2VydmljZX0uXG4gICAgICogQHBhcmFtIF9jbHVzdGVyU2VydmljZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBDbHVzdGVyU2VydmljZX0uXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfem9uZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBOZ1pvbmV9IHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfbWFya2VyU2VydmljZTogTWFya2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NsdXN0ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyBhIGdlbyBsb2NhdGlvbiB0byBhIHBpeGVsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBtYXAgdmlld3BvcnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gW2xvY10gLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyBhbiB7QGxpbmsgSVBvaW50fSByZXByZXNlbnRpbmcgdGhlIHBpeGVsIGNvb3JkaW5hdGVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIExvY2F0aW9uVG9QaXhlbChsb2M6IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KGxvYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGF5ZXJPcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmFrZUxheWVyRGlyZWN0aXZlOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgSWQgOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBWaXNpYmxlOiB0aGlzLlZpc2libGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXRoaXMuRW5hYmxlQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5BZGRMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSB0aGlzLl9sYXllclNlcnZpY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuTGF5ZXJPZmZzZXQgPSB0aGlzLkxheWVyT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5aSW5kZXggPSB0aGlzLlpJbmRleDtcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ2x1c3RlcmluZ0VuYWJsZWQgPSB0aGlzLkVuYWJsZUNsdXN0ZXJpbmc7XG4gICAgICAgICAgICAgICAgZmFrZUxheWVyRGlyZWN0aXZlLkNsdXN0ZXJQbGFjZW1lbnRNb2RlID0gdGhpcy5DbHVzdGVyUGxhY2VtZW50TW9kZTtcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuR3JpZFNpemUgPSB0aGlzLkdyaWRTaXplO1xuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5DbHVzdGVyQ2xpY2tBY3Rpb24gPSB0aGlzLkNsdXN0ZXJDbGlja0FjdGlvbjtcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuSWNvbkluZm8gPSB0aGlzLkNsdXN0ZXJJY29uSW5mbztcbiAgICAgICAgICAgICAgICBmYWtlTGF5ZXJEaXJlY3RpdmUuQ3VzdG9tTWFya2VyQ2FsbGJhY2sgPSB0aGlzLkN1c3RvbU1hcmtlckNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGZha2VMYXllckRpcmVjdGl2ZS5Vc2VEeW5hbWljU2l6ZU1hcmtlcnMgPSB0aGlzLlVzZUR5bmFtaWNTaXplTWFya2VycztcbiAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyU2VydmljZS5BZGRMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2NsdXN0ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IHRoaXMuX2NsdXN0ZXJTZXJ2aWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XG4gICAgICAgICAgICAgICAgbC5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTWFya2VyT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuVXBkYXRlTWFya2VycygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgbC5EZWxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAgICAgbGV0IHNob3VsZFNldE9wdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbzogSUNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjaGFuZ2VzWydNYXJrZXJPcHRpb25zJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlTWFya2VycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSAmJiAhY2hhbmdlc1snVmlzaWJsZSddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydFbmFibGVDbHVzdGVyaW5nJ10gJiYgIWNoYW5nZXNbJ0VuYWJsZUNsdXN0ZXJpbmcnXS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgaWYgKCdTdG9wQ2x1c3RlcmluZycgaW4gdGhpcy5fc2VydmljZSkge1xuICAgICAgICAgICAgICAgIG8uY2x1c3RlcmluZ0VuYWJsZWQgPSB0aGlzLkVuYWJsZUNsdXN0ZXJpbmc7XG4gICAgICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBFbmFibGVDbHVzdGVyaW5nIGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBjcmVhdGVkLicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snQ2x1c3RlclBsYWNlbWVudE1vZGUnXSAmJiAhY2hhbmdlc1snQ2x1c3RlclBsYWNlbWVudE1vZGUnXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIG8ucGxhY2VtZW50TW9kZSA9IHRoaXMuQ2x1c3RlclBsYWNlbWVudE1vZGU7XG4gICAgICAgICAgICBzaG91bGRTZXRPcHRpb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snR3JpZFNpemUnXSAmJiAhY2hhbmdlc1snR3JpZFNpemUnXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIG8uZ3JpZFNpemUgPSB0aGlzLkdyaWRTaXplO1xuICAgICAgICAgICAgc2hvdWxkU2V0T3B0aW9ucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJDbGlja0FjdGlvbiddICYmICFjaGFuZ2VzWydDbHVzdGVyQ2xpY2tBY3Rpb24nXS5maXJzdENoYW5nZSAmJiAnU3RvcENsdXN0ZXJpbmcnIGluIHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIG8uem9vbU9uQ2xpY2sgPSB0aGlzLkNsdXN0ZXJDbGlja0FjdGlvbiA9PT0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlcjtcbiAgICAgICAgICAgIHNob3VsZFNldE9wdGlvbnMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoY2hhbmdlc1snWkluZGV4J10gJiYgIWNoYW5nZXNbJ1pJbmRleCddLmZpcnN0Q2hhbmdlKSB8fFxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xheWVyT2Zmc2V0J10gJiYgIWNoYW5nZXNbJ0xheWVyT2Zmc2V0J10uZmlyc3RDaGFuZ2UpIHx8XG4gICAgICAgICAgICAoY2hhbmdlc1snSWNvbkluZm8nXSAmJiAhY2hhbmdlc1snSWNvbkluZm8nXS5maXJzdENoYW5nZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBaSW5kZXggb3IgTGF5ZXJPZmZzZXQgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFNldE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge0lkIDogdGhpcy5faWR9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4gbC5TZXRPcHRpb25zKG8pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTWFya2VyIElkLlxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXJrZXIgaWQuXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwTWFya2VyTGF5ZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbSAtIHRoZSBtYXJrZXIgZm9yIHdoaWNoIHRvIGFkZCB0aGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKG06IE1hcmtlcik6IHZvaWQge1xuICAgICAgICBtLkFkZExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1hcmtlckNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgICAgIE1hcmtlcjogbSxcbiAgICAgICAgICAgICAgICBDbGljazogZSxcbiAgICAgICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSxcbiAgICAgICAgICAgICAgICBQaXhlbHM6IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0UGl4ZWxzRnJvbUNsaWNrKGUpXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIG0uQWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIE1hcmtlcjogbSxcbiAgICAgICAgICAgICAgICBDbGljazogZSxcbiAgICAgICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSxcbiAgICAgICAgICAgICAgICBQaXhlbHM6IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0UGl4ZWxzRnJvbUNsaWNrKGUpXG4gICAgICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBvciB1cGRhdGVzIHRoZSBtYXJrZXJzIGJhc2VkIG9uIHRoZSBtYXJrZXIgb3B0aW9ucy4gVGhpcyB3aWxsIHBsYWNlIHRoZSBtYXJrZXJzIG9uIHRoZSBtYXBcbiAgICAgKiBhbmQgcmVnaXN0ZXIgdGhlIGFzc29jaWF0ZWQgZXZlbnRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckxheWVyRGlyZWN0aXZlXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHByaXZhdGUgVXBkYXRlTWFya2VycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyUHJvbWlzZSA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiA9IHRoaXMuX3N0cmVhbWluZyA/IHRoaXMuX21hcmtlcnNMYXN0LnNwbGljZSgwKSA6IHRoaXMuX21hcmtlcnM7XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgbWFya2Vyc1xuICAgICAgICAgICAgY29uc3QgbXA6IFByb21pc2U8QXJyYXk8TWFya2VyPj4gPSB0aGlzLl9zZXJ2aWNlLkNyZWF0ZU1hcmtlcnMobWFya2VycywgdGhpcy5JY29uSW5mbyk7XG5cbiAgICAgICAgICAgIC8vIHNldCBtYXJrZXJzIG9uY2UgcHJvbWlzZXMgYXJlIGZ1bGxmaWxsZWQuXG4gICAgICAgICAgICBtcC50aGVuKG0gPT4ge1xuICAgICAgICAgICAgICAgIG0uZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhtYXJrZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmVhbWluZyA/IGwuQWRkRW50aXRpZXMobSkgOiBsLlNldEVudGl0aWVzKG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19