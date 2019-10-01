/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ClusterPlacementMode } from '../models/cluster-placement-mode';
import { ClusterClickAction } from '../models/cluster-click-action';
import { ClusterService } from '../services/cluster.service';
import { MapLayerDirective } from './map-layer';
/**
 *
 * Creates a cluster layer on a {\@link MapComponent}.
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
 *   <x-map [Latitude]='lat' [Longitude]='lng' [Zoom]='zoom'>
 *     <x-cluster-layer [Visible]='visible'>
 *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
 *     </x-cluster-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class ClusterLayerDirective extends MapLayerDirective {
    /**
     * Creates an instance of ClusterLayerDirective.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} _layerService - Concreted implementation of a cluster layer service for the underlying maps
     * implementations. Generally provided via injections.
     * @param {?} _containerRef - A reference to the view container of the layer. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        super(_layerService, _containerRef);
        this._clusteringEnabled = true;
        this._clusterPlacementMode = ClusterPlacementMode.MeanValue;
        this._clusterClickAction = ClusterClickAction.ZoomIntoCluster;
        this._useDynamicSizeMarker = false;
        this._dynamicMarkerBaseSize = 18;
        this._dynamicMarkerRanges = new Map([
            [10, 'rgba(20, 180, 20, 0.5)'],
            [100, 'rgba(255, 210, 40, 0.5)'],
            [Number.MAX_SAFE_INTEGER, 'rgba(255, 40, 40, 0.5)']
        ]);
        this._zoomOnClick = true;
    }
    /**
     * Gets or sets the the Cluster Click Action {\@link ClusterClickAction}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterClickAction() { return this._clusterClickAction; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterClickAction(val) { this._clusterClickAction = val; }
    /**
     * Gets or sets whether the clustering layer enables clustering. When set to false, the layer
     * behaves like a generic layer. This is handy if you want to prevent clustering at certain zoom levels.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusteringEnabled() { return this._clusteringEnabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusteringEnabled(val) { this._clusteringEnabled = val; }
    /**
     * Gets or sets the cluster placement mode. {\@link ClusterPlacementMode}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ClusterPlacementMode() { return this._clusterPlacementMode; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ClusterPlacementMode(val) { this._clusterPlacementMode = val; }
    /**
     * Gets or sets the callback invoked to create a custom cluster marker. Note that when {\@link UseDynamicSizeMarkers} is enabled,
     * you cannot set a custom marker callback.
     *
     * \@memberof ClusterLayerDirective
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
     * Gets or sets the grid size to be used for clustering.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get GridSize() { return this._gridSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set GridSize(val) { this._gridSize = val; }
    /**
     * Gets or sets the IconInfo to be used to create a custom cluster marker. Supports font-based, SVG, graphics and more.
     * See {\@link IMarkerIconInfo}.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get IconInfo() { return this._iconInfo; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IconInfo(val) { this._iconInfo = val; }
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get LayerOffset() { return this._layerOffset; }
    /**
     * @param {?} val
     * @return {?}
     */
    set LayerOffset(val) { this._layerOffset = val; }
    /**
     * Gets or sets the minimum pins required to form a cluster
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get MinimumClusterSize() { return this._minimumClusterSize; }
    /**
     * @param {?} val
     * @return {?}
     */
    set MinimumClusterSize(val) { this._minimumClusterSize = val; }
    /**
     * Gets or sets the options for spider clustering behavior. See {\@link ISpiderClusterOptions}
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get SpiderClusterOptions() { return this._spiderClusterOptions; }
    /**
     * @param {?} val
     * @return {?}
     */
    set SpiderClusterOptions(val) { this._spiderClusterOptions = val; }
    /**
     * Gets or sets the cluster styles
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get Styles() { return this._styles; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Styles(val) { this._styles = val; }
    /**
     * Gets or sets whether to use dynamic markers. Dynamic markers change in size and color depending on the number of
     * pins in the cluster. If set to true, this will take precendence over any custom marker creation.
     *
     * \@memberof ClusterLayerDirective
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
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZIndex() { return this._zIndex; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZIndex(val) { this._zIndex = val; }
    /**
     * Gets or sets whether the cluster should zoom in on click
     *
     * \@readonly
     * \@memberof ClusterLayerDirective
     * @return {?}
     */
    get ZoomOnClick() { return this._zoomOnClick; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ZoomOnClick(val) { this._zoomOnClick = val; }
    /**
     * Creates the dynamic size marker to be used for cluster markers if UseDynamicSizeMarkers is set to true.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} size - The number of markers in the cluster.
     * @param {?} info  - The icon info to be used. This will be hydrated with
     * the actualy dimensions of the created markers and is used by the underlying model/services
     * to correctly offset the marker for correct positioning.
     * @param {?} baseMarkerSize - The base size for dynmic markers.
     * @param {?} ranges - The ranges to use to calculate breakpoints and colors for dynamic markers.
     * The map contains key/value pairs, with the keys being
     * the breakpoint sizes and the values the colors to be used for the dynamic marker in that range.
     * @return {?} - An string containing the SVG for the marker.
     *
     */
    static CreateDynamicSizeMarker(size, info, baseMarkerSize, ranges) {
        /** @type {?} */
        const mr = baseMarkerSize;
        /** @type {?} */
        const outline = mr * 0.35;
        /** @type {?} */
        const total = size;
        /** @type {?} */
        const r = Math.log(total) / Math.log(10) * 5 + mr;
        /** @type {?} */
        const d = r * 2;
        /** @type {?} */
        let fillColor;
        ranges.forEach((v, k) => {
            if (total <= k && !fillColor) {
                fillColor = v;
            }
        });
        if (!fillColor) {
            fillColor = 'rgba(20, 180, 20, 0.5)';
        }
        /** @type {?} */
        const svg = [`<svg xmlns='http://www.w3.org/2000/svg' width='${d}' height='${d}'>`,
            `<circle cx='${r}' cy='${r}' r='${r}' fill='${fillColor}'/>`,
            `<circle cx='${r}' cy='${r}' r='${r - outline}' fill='${fillColor}'/>`,
            `</svg>`];
        info.size = { width: d, height: d };
        info.markerOffsetRatio = { x: 0.5, y: 0.5 };
        info.textOffset = { x: 0, y: r - 8 };
        return svg.join('');
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof ClusterLayerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['ClusterClickAction']) {
            throw (new Error('You cannot change the ClusterClickAction after the layer has been added to the layerservice.'));
        }
        /** @type {?} */
        const options = { id: this._id };
        if (changes['ClusteringEnabled']) {
            options.clusteringEnabled = this._clusteringEnabled;
        }
        if (changes['GridSize']) {
            options.gridSize = this._gridSize;
        }
        if (changes['LayerOffset']) {
            options.layerOffset = this._layerOffset;
        }
        if (changes['SpiderClusterOptions']) {
            options.spiderClusterOptions = this._spiderClusterOptions;
        }
        if (changes['ZIndex']) {
            options.zIndex = this._zIndex;
        }
        if (changes['Visible']) {
            options.visible = this._visible;
        }
        this._layerService.GetNativeLayer(this).then((l) => {
            l.SetOptions(options);
        });
    }
}
ClusterLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-cluster-layer'
            },] },
];
/** @nocollapse */
ClusterLayerDirective.ctorParameters = () => [
    { type: ClusterService },
    { type: ViewContainerRef }
];
ClusterLayerDirective.propDecorators = {
    ClusterClickAction: [{ type: Input }],
    ClusteringEnabled: [{ type: Input }],
    ClusterPlacementMode: [{ type: Input }],
    CustomMarkerCallback: [{ type: Input }],
    DynamicMarkerBaseSize: [{ type: Input }],
    DynamicMarkerRanges: [{ type: Input }],
    GridSize: [{ type: Input }],
    IconInfo: [{ type: Input }],
    LayerOffset: [{ type: Input }],
    MinimumClusterSize: [{ type: Input }],
    SpiderClusterOptions: [{ type: Input }],
    Styles: [{ type: Input }],
    UseDynamicSizeMarkers: [{ type: Input }],
    ZIndex: [{ type: Input }],
    ZoomOnClick: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    ClusterLayerDirective.prototype._clusteringEnabled;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterPlacementMode;
    /** @type {?} */
    ClusterLayerDirective.prototype._clusterClickAction;
    /** @type {?} */
    ClusterLayerDirective.prototype._spiderClusterOptions;
    /** @type {?} */
    ClusterLayerDirective.prototype._zIndex;
    /** @type {?} */
    ClusterLayerDirective.prototype._gridSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._layerOffset;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconInfo;
    /** @type {?} */
    ClusterLayerDirective.prototype._minimumClusterSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._styles;
    /** @type {?} */
    ClusterLayerDirective.prototype._useDynamicSizeMarker;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerBaseSize;
    /** @type {?} */
    ClusterLayerDirective.prototype._dynamicMarkerRanges;
    /** @type {?} */
    ClusterLayerDirective.prototype._zoomOnClick;
    /** @type {?} */
    ClusterLayerDirective.prototype._iconCreationCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2NsdXN0ZXItbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQ0csS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBSXBFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNoRCxNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7Ozs7OztJQWtQeEQsWUFBWSxhQUE2QixFQUFFLGFBQStCO1FBQ3RFLEtBQUssQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7a0NBOU9YLElBQUk7cUNBQ3FCLG9CQUFvQixDQUFDLFNBQVM7bUNBQ2xDLGtCQUFrQixDQUFDLGVBQWU7cUNBUXBELEtBQUs7c0NBQ0osRUFBRTtvQ0FDaUIsSUFBSSxHQUFHLENBQWlCO1lBQ3hFLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDO1lBQzlCLENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDO1lBQ2hDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFHLHdCQUF3QixDQUFDO1NBQ3ZELENBQUM7NEJBQ3FCLElBQUk7S0E4TjFCOzs7Ozs7O0lBbE5ELElBQ2Usa0JBQWtCLEtBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRTs7Ozs7UUFDOUUsa0JBQWtCLENBQUMsR0FBdUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFD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TCxLQUFLO3FCQVVMLEtBQUs7b0NBVUwsS0FBSztxQkFpQkwsS0FBSzswQkFVTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNsdXN0ZXJJY29uSW5mbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsXG4gICAgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcbmltcG9ydCB7IENsdXN0ZXJDbGlja0FjdGlvbiB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLWNsaWNrLWFjdGlvbic7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbGF5ZXInO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGEgY2x1c3RlciBsYXllciBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAubWFwLWNvbnRhaW5lciB7XG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgfVxuICogYF0sXG4gKiB0ZW1wbGF0ZTogYFxuICogICA8eC1tYXAgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbWm9vbV09J3pvb20nPlxuICogICAgIDx4LWNsdXN0ZXItbGF5ZXIgW1Zpc2libGVdPSd2aXNpYmxlJz5cbiAqICAgICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtMYWJlbF09JydNJyc+PC94LW1hcC1tYXJrZXI+XG4gKiAgICAgPC94LWNsdXN0ZXItbGF5ZXI+XG4gKiAgIDwveC1tYXA+XG4gKiBgXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4cG9ydFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3gtY2x1c3Rlci1sYXllcidcbn0pXG5leHBvcnQgY2xhc3MgQ2x1c3RlckxheWVyRGlyZWN0aXZlIGV4dGVuZHMgTWFwTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9jbHVzdGVyaW5nRW5hYmxlZCA9IHRydWU7XG4gICAgcHJpdmF0ZSBfY2x1c3RlclBsYWNlbWVudE1vZGU6IENsdXN0ZXJQbGFjZW1lbnRNb2RlID0gQ2x1c3RlclBsYWNlbWVudE1vZGUuTWVhblZhbHVlO1xuICAgIHByaXZhdGUgX2NsdXN0ZXJDbGlja0FjdGlvbjogQ2x1c3RlckNsaWNrQWN0aW9uID0gQ2x1c3RlckNsaWNrQWN0aW9uLlpvb21JbnRvQ2x1c3RlcjtcbiAgICBwcml2YXRlIF9zcGlkZXJDbHVzdGVyT3B0aW9uczogSVNwaWRlckNsdXN0ZXJPcHRpb25zO1xuICAgIHByaXZhdGUgX3pJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2dyaWRTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbGF5ZXJPZmZzZXQ6IElQb2ludDtcbiAgICBwcml2YXRlIF9pY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xuICAgIHByaXZhdGUgX21pbmltdW1DbHVzdGVyU2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX3N0eWxlczogQXJyYXk8SUNsdXN0ZXJJY29uSW5mbz47XG4gICAgcHJpdmF0ZSBfdXNlRHluYW1pY1NpemVNYXJrZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyQmFzZVNpemUgPSAxODtcbiAgICBwcml2YXRlIF9keW5hbWljTWFya2VyUmFuZ2VzOiBNYXA8bnVtYmVyLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZz4oW1xuICAgICAgICBbMTAsICdyZ2JhKDIwLCAxODAsIDIwLCAwLjUpJ10sXG4gICAgICAgIFsxMDAsICdyZ2JhKDI1NSwgMjEwLCA0MCwgMC41KSddLFxuICAgICAgICBbTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgLCAncmdiYSgyNTUsIDQwLCA0MCwgMC41KSddXG4gICAgXSk7XG4gICAgcHJpdmF0ZSBfem9vbU9uQ2xpY2sgPSB0cnVlO1xuICAgIHByaXZhdGUgX2ljb25DcmVhdGlvbkNhbGxiYWNrOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmc7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVmaW50aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aGUgQ2x1c3RlciBDbGljayBBY3Rpb24ge0BsaW5rIENsdXN0ZXJDbGlja0FjdGlvbn0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBDbHVzdGVyQ2xpY2tBY3Rpb24oKTogQ2x1c3RlckNsaWNrQWN0aW9uICB7IHJldHVybiB0aGlzLl9jbHVzdGVyQ2xpY2tBY3Rpb247IH1cbiAgICAgICAgcHVibGljIHNldCBDbHVzdGVyQ2xpY2tBY3Rpb24odmFsOiBDbHVzdGVyQ2xpY2tBY3Rpb24pIHsgdGhpcy5fY2x1c3RlckNsaWNrQWN0aW9uID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGUgY2x1c3RlcmluZyBsYXllciBlbmFibGVzIGNsdXN0ZXJpbmcuIFdoZW4gc2V0IHRvIGZhbHNlLCB0aGUgbGF5ZXJcbiAgICAgKiBiZWhhdmVzIGxpa2UgYSBnZW5lcmljIGxheWVyLiBUaGlzIGlzIGhhbmR5IGlmIHlvdSB3YW50IHRvIHByZXZlbnQgY2x1c3RlcmluZyBhdCBjZXJ0YWluIHpvb20gbGV2ZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgQ2x1c3RlcmluZ0VuYWJsZWQoKTogYm9vbGVhbiAgeyByZXR1cm4gdGhpcy5fY2x1c3RlcmluZ0VuYWJsZWQ7IH1cbiAgICAgICAgcHVibGljIHNldCBDbHVzdGVyaW5nRW5hYmxlZCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fY2x1c3RlcmluZ0VuYWJsZWQgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgY2x1c3RlciBwbGFjZW1lbnQgbW9kZS4ge0BsaW5rIENsdXN0ZXJQbGFjZW1lbnRNb2RlfVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgQ2x1c3RlclBsYWNlbWVudE1vZGUoKTogQ2x1c3RlclBsYWNlbWVudE1vZGUgIHsgcmV0dXJuIHRoaXMuX2NsdXN0ZXJQbGFjZW1lbnRNb2RlOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgQ2x1c3RlclBsYWNlbWVudE1vZGUodmFsOiBDbHVzdGVyUGxhY2VtZW50TW9kZSkgeyB0aGlzLl9jbHVzdGVyUGxhY2VtZW50TW9kZSA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjYWxsYmFjayBpbnZva2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gTm90ZSB0aGF0IHdoZW4ge0BsaW5rIFVzZUR5bmFtaWNTaXplTWFya2Vyc30gaXMgZW5hYmxlZCxcbiAgICAgKiB5b3UgY2Fubm90IHNldCBhIGN1c3RvbSBtYXJrZXIgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBDdXN0b21NYXJrZXJDYWxsYmFjaygpOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcgIHsgcmV0dXJuIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgQ3VzdG9tTWFya2VyQ2FsbGJhY2sodmFsOiAobTogQXJyYXk8TWFya2VyPiwgaTogSU1hcmtlckljb25JbmZvKSA9PiBzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlcikge1xuICAgICAgICAgICAgICAgIHRocm93KFxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYFlvdSBjYW5ub3Qgc2V0IGEgY3VzdG9tIG1hcmtlciBjYWxsYmFjayB3aGVuIFVzZUR5bmFtaWNTaXplTWFya2VycyBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgICAgICAgICAgICAgICAgU2V0IFVzZUR5bmFtaWNTaXplTWFrZXJzIHRvIGZhbHNlLmApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ljb25DcmVhdGlvbkNhbGxiYWNrID0gdmFsO1xuICAgICAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIGJhc2Ugc2l6ZSBvZiBkeW5hbWljIG1hcmtlcnMgaW4gcGl4ZWxzLiBUaGUgYWN0dWFseSBzaXplIG9mIHRoZSBkeW5hbWljIG1hcmtlciBpcyBiYXNlZCBvbiB0aGlzLlxuICAgICAqIFNlZSB7QGxpbmsgVXNlRHluYW1pY1NpemVNYXJrZXJzfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSgpOiBudW1iZXIgIHsgcmV0dXJuIHRoaXMuX2R5bmFtaWNNYXJrZXJCYXNlU2l6ZTsgfVxuICAgICAgICBwdWJsaWMgc2V0IER5bmFtaWNNYXJrZXJCYXNlU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxuICAgICAqIFRoZSBtYXAgY29udGFpbnMga2V5L3ZhbHVlIHBhaXJzLCB3aXRoIHRoZSBrZXlzIGJlaW5nXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS4gU2VlIHtAbGluayBVc2VEeW5hbWljU2l6ZU1hcmtlcnN9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgRHluYW1pY01hcmtlclJhbmdlcygpOiBNYXA8bnVtYmVyLCBzdHJpbmc+ICB7IHJldHVybiB0aGlzLl9keW5hbWljTWFya2VyUmFuZ2VzOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgRHluYW1pY01hcmtlclJhbmdlcyh2YWw6IE1hcDxudW1iZXIsIHN0cmluZz4pIHsgdGhpcy5fZHluYW1pY01hcmtlclJhbmdlcyA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBncmlkIHNpemUgdG8gYmUgdXNlZCBmb3IgY2x1c3RlcmluZy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBDbHVzdGVyTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IEdyaWRTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fZ3JpZFNpemU7IH1cbiAgICAgICAgcHVibGljIHNldCBHcmlkU2l6ZSh2YWw6IG51bWJlcikgeyB0aGlzLl9ncmlkU2l6ZSA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBJY29uSW5mbyB0byBiZSB1c2VkIHRvIGNyZWF0ZSBhIGN1c3RvbSBjbHVzdGVyIG1hcmtlci4gU3VwcG9ydHMgZm9udC1iYXNlZCwgU1ZHLCBncmFwaGljcyBhbmQgbW9yZS5cbiAgICAgKiBTZWUge0BsaW5rIElNYXJrZXJJY29uSW5mb30uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBJY29uSW5mbygpOiBJTWFya2VySWNvbkluZm8gIHsgcmV0dXJuIHRoaXMuX2ljb25JbmZvOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgSWNvbkluZm8odmFsOiBJTWFya2VySWNvbkluZm8pIHsgdGhpcy5faWNvbkluZm8gPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyBBbiBvZmZzZXQgYXBwbGllZCB0byB0aGUgcG9zaXRpb25pbmcgb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgTGF5ZXJPZmZzZXQoKTogSVBvaW50ICB7IHJldHVybiB0aGlzLl9sYXllck9mZnNldDsgfVxuICAgICAgICBwdWJsaWMgc2V0IExheWVyT2Zmc2V0KHZhbDogSVBvaW50KSB7IHRoaXMuX2xheWVyT2Zmc2V0ID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gcGlucyByZXF1aXJlZCB0byBmb3JtIGEgY2x1c3RlclxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgTWluaW11bUNsdXN0ZXJTaXplKCk6IG51bWJlciAgeyByZXR1cm4gdGhpcy5fbWluaW11bUNsdXN0ZXJTaXplOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgTWluaW11bUNsdXN0ZXJTaXplKHZhbDogbnVtYmVyKSB7IHRoaXMuX21pbmltdW1DbHVzdGVyU2l6ZSA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBvcHRpb25zIGZvciBzcGlkZXIgY2x1c3RlcmluZyBiZWhhdmlvci4gU2VlIHtAbGluayBJU3BpZGVyQ2x1c3Rlck9wdGlvbnN9XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBTcGlkZXJDbHVzdGVyT3B0aW9ucygpOiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgeyByZXR1cm4gdGhpcy5fc3BpZGVyQ2x1c3Rlck9wdGlvbnM7IH1cbiAgICAgICAgcHVibGljIHNldCBTcGlkZXJDbHVzdGVyT3B0aW9ucyh2YWw6IElTcGlkZXJDbHVzdGVyT3B0aW9ucykgeyB0aGlzLl9zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBjbHVzdGVyIHN0eWxlc1xuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgU3R5bGVzKCk6IEFycmF5PElDbHVzdGVySWNvbkluZm8+IHsgcmV0dXJuIHRoaXMuX3N0eWxlczsgfVxuICAgICAgICBwdWJsaWMgc2V0IFN0eWxlcyh2YWw6IEFycmF5PElDbHVzdGVySWNvbkluZm8+KSB7IHRoaXMuX3N0eWxlcyA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gdXNlIGR5bmFtaWMgbWFya2Vycy4gRHluYW1pYyBtYXJrZXJzIGNoYW5nZSBpbiBzaXplIGFuZCBjb2xvciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZlxuICAgICAqIHBpbnMgaW4gdGhlIGNsdXN0ZXIuIElmIHNldCB0byB0cnVlLCB0aGlzIHdpbGwgdGFrZSBwcmVjZW5kZW5jZSBvdmVyIGFueSBjdXN0b20gbWFya2VyIGNyZWF0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgVXNlRHluYW1pY1NpemVNYXJrZXJzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdXNlRHluYW1pY1NpemVNYXJrZXI7IH1cbiAgICAgICAgcHVibGljIHNldCBVc2VEeW5hbWljU2l6ZU1hcmtlcnModmFsOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VEeW5hbWljU2l6ZU1hcmtlciA9IHZhbDtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pY29uQ3JlYXRpb25DYWxsYmFjayA9IChtOiBBcnJheTxNYXJrZXI+LCBpbmZvOiBJTWFya2VySWNvbkluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENsdXN0ZXJMYXllckRpcmVjdGl2ZS5DcmVhdGVEeW5hbWljU2l6ZU1hcmtlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIG0ubGVuZ3RoLCBpbmZvLCB0aGlzLl9keW5hbWljTWFya2VyQmFzZVNpemUsIHRoaXMuX2R5bmFtaWNNYXJrZXJSYW5nZXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuIElmIG5vdCB1c2VkLCBsYXllcnMgZ2V0IHN0YWNrZWQgaW4gdGhlIG9yZGVyIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBaSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3pJbmRleDsgfVxuICAgICAgICBwdWJsaWMgc2V0IFpJbmRleCh2YWw6IG51bWJlcikgeyB0aGlzLl96SW5kZXggPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoZSBjbHVzdGVyIHNob3VsZCB6b29tIGluIG9uIGNsaWNrXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBab29tT25DbGljaygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3pvb21PbkNsaWNrOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgWm9vbU9uQ2xpY2sodmFsOiBib29sZWFuKSB7IHRoaXMuX3pvb21PbkNsaWNrID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkeW5hbWljIHNpemUgbWFya2VyIHRvIGJlIHVzZWQgZm9yIGNsdXN0ZXIgbWFya2VycyBpZiBVc2VEeW5hbWljU2l6ZU1hcmtlcnMgaXMgc2V0IHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIFRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3Rlci5cbiAgICAgKiBAcGFyYW0gaW5mbyAgLSBUaGUgaWNvbiBpbmZvIHRvIGJlIHVzZWQuIFRoaXMgd2lsbCBiZSBoeWRyYXRlZCB3aXRoXG4gICAgICogdGhlIGFjdHVhbHkgZGltZW5zaW9ucyBvZiB0aGUgY3JlYXRlZCBtYXJrZXJzIGFuZCBpcyB1c2VkIGJ5IHRoZSB1bmRlcmx5aW5nIG1vZGVsL3NlcnZpY2VzXG4gICAgICogdG8gY29ycmVjdGx5IG9mZnNldCB0aGUgbWFya2VyIGZvciBjb3JyZWN0IHBvc2l0aW9uaW5nLlxuICAgICAqIEBwYXJhbSBiYXNlTWFya2VyU2l6ZSAtIFRoZSBiYXNlIHNpemUgZm9yIGR5bm1pYyBtYXJrZXJzLlxuICAgICAqIEBwYXJhbSByYW5nZXMgLSBUaGUgcmFuZ2VzIHRvIHVzZSB0byBjYWxjdWxhdGUgYnJlYWtwb2ludHMgYW5kIGNvbG9ycyBmb3IgZHluYW1pYyBtYXJrZXJzLlxuICAgICAqIFRoZSBtYXAgY29udGFpbnMga2V5L3ZhbHVlIHBhaXJzLCB3aXRoIHRoZSBrZXlzIGJlaW5nXG4gICAgICogdGhlIGJyZWFrcG9pbnQgc2l6ZXMgYW5kIHRoZSB2YWx1ZXMgdGhlIGNvbG9ycyB0byBiZSB1c2VkIGZvciB0aGUgZHluYW1pYyBtYXJrZXIgaW4gdGhhdCByYW5nZS5cbiAgICAgKiBAcmV0dXJucyAtIEFuIHN0cmluZyBjb250YWluaW5nIHRoZSBTVkcgZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVEeW5hbWljU2l6ZU1hcmtlcihzaXplOiBudW1iZXIsIGluZm86IElNYXJrZXJJY29uSW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VNYXJrZXJTaXplOiBudW1iZXIsIHJhbmdlczogTWFwPG51bWJlciwgc3RyaW5nPik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG1yOiBudW1iZXIgPSBiYXNlTWFya2VyU2l6ZTtcbiAgICAgICAgY29uc3Qgb3V0bGluZTogbnVtYmVyID0gbXIgKiAwLjM1O1xuICAgICAgICBjb25zdCB0b3RhbDogbnVtYmVyID0gc2l6ZTtcbiAgICAgICAgY29uc3QgcjogbnVtYmVyID0gTWF0aC5sb2codG90YWwpIC8gTWF0aC5sb2coMTApICogNSArIG1yO1xuICAgICAgICBjb25zdCBkOiBudW1iZXIgPSByICogMjtcbiAgICAgICAgbGV0IGZpbGxDb2xvcjogc3RyaW5nO1xuICAgICAgICByYW5nZXMuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAgICAgaWYgKHRvdGFsIDw9IGsgJiYgIWZpbGxDb2xvcikgeyBmaWxsQ29sb3IgPSB2OyB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZpbGxDb2xvcikgeyBmaWxsQ29sb3IgPSAncmdiYSgyMCwgMTgwLCAyMCwgMC41KSc7IH1cblxuICAgICAgICAvLyBDcmVhdGUgYW4gU1ZHIHN0cmluZyBvZiB0d28gY2lyY2xlcywgb25lIG9uIHRvcCBvZiB0aGUgb3RoZXIsIHdpdGggdGhlIHNwZWNpZmllZCByYWRpdXMgYW5kIGNvbG9yLlxuICAgICAgICBjb25zdCBzdmc6IEFycmF5PGFueT4gPSBbYDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nJHtkfScgaGVpZ2h0PScke2R9Jz5gLFxuICAgICAgICAgICAgYDxjaXJjbGUgY3g9JyR7cn0nIGN5PScke3J9JyByPScke3J9JyBmaWxsPScke2ZpbGxDb2xvcn0nLz5gLFxuICAgICAgICAgICAgYDxjaXJjbGUgY3g9JyR7cn0nIGN5PScke3J9JyByPScke3IgLSBvdXRsaW5lfScgZmlsbD0nJHtmaWxsQ29sb3J9Jy8+YCxcbiAgICAgICAgICAgIGA8L3N2Zz5gXTtcbiAgICAgICAgaW5mby5zaXplID0geyB3aWR0aDogZCwgaGVpZ2h0OiBkIH07XG4gICAgICAgIGluZm8ubWFya2VyT2Zmc2V0UmF0aW8gPSB7IHg6IDAuNSwgeTogMC41IH07XG4gICAgICAgIGluZm8udGV4dE9mZnNldCA9IHsgeDogMCwgeTogciAtIDggfTtcbiAgICAgICAgcmV0dXJuIHN2Zy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ2x1c3RlckxheWVyRGlyZWN0aXZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyIGxheWVyIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHNcbiAgICAgKiBpbXBsZW1lbnRhdGlvbnMuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9ucy5cbiAgICAgKiBAcGFyYW0gX2NvbnRhaW5lclJlZiAtIEEgcmVmZXJlbmNlIHRvIHRoZSB2aWV3IGNvbnRhaW5lciBvZiB0aGUgbGF5ZXIuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9sYXllclNlcnZpY2U6IENsdXN0ZXJTZXJ2aWNlLCBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKF9sYXllclNlcnZpY2UsIF9jb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIENsdXN0ZXJMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJDbGlja0FjdGlvbiddKSB7XG4gICAgICAgICAgICB0aHJvdyAoXG4gICAgICAgICAgICAgICAgbmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSB0aGUgQ2x1c3RlckNsaWNrQWN0aW9uIGFmdGVyIHRoZSBsYXllciBoYXMgYmVlbiBhZGRlZCB0byB0aGUgbGF5ZXJzZXJ2aWNlLicpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUNsdXN0ZXJPcHRpb25zID0geyBpZDogdGhpcy5faWQgfTtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ0NsdXN0ZXJpbmdFbmFibGVkJ10pIHsgb3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCA9IHRoaXMuX2NsdXN0ZXJpbmdFbmFibGVkOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydHcmlkU2l6ZSddKSB7IG9wdGlvbnMuZ3JpZFNpemUgPSB0aGlzLl9ncmlkU2l6ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snTGF5ZXJPZmZzZXQnXSkgeyBvcHRpb25zLmxheWVyT2Zmc2V0ID0gdGhpcy5fbGF5ZXJPZmZzZXQ7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1NwaWRlckNsdXN0ZXJPcHRpb25zJ10pIHsgb3B0aW9ucy5zcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHRoaXMuX3NwaWRlckNsdXN0ZXJPcHRpb25zOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydaSW5kZXgnXSkgeyBvcHRpb25zLnpJbmRleCA9IHRoaXMuX3pJbmRleDsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7IG9wdGlvbnMudmlzaWJsZSA9IHRoaXMuX3Zpc2libGU7IH1cblxuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIodGhpcykudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGwuU2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=