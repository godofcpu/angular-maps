/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ContentChildren, Input, ViewContainerRef } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapMarkerDirective } from './map-marker';
/** *
 * internal counter to use as ids for multiple layers.
  @type {?} */
let layerId = 0;
/**
 * MapLayerDirective creates a layer on a {\@link MapComponent}.
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
 *     <x-map-layer [Visible]='visible'>
 *         <x-map-marker [Latitude]='lat' [Longitude]='lng' [Label]=''M''></x-map-marker>
 *     </x-map-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class MapLayerDirective {
    /**
     * Creates an instance of MapLayerDirective.
     * \@memberof MapLayerDirective
     * @param {?} _layerService - Concreted implementation of a layer service for the underlying maps implementations.
     * Generally provided via injections.
     * @param {?} _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
     *
     */
    constructor(_layerService, _containerRef) {
        this._layerService = _layerService;
        this._containerRef = _containerRef;
        this._visible = true;
        this._addedToManager = false;
        this._id = layerId++;
    }
    /**
     * Gets or sets the layer visibility.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Visible() { return this._visible; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Visible(val) { this._visible = val; }
    /**
     * Gets the layer id.
     *
     * \@readonly
     * \@memberof MapLayerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnInit() {
        this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
        this._layerService.AddLayer(this);
        this._addedToManager = true;
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['Visible']) {
            this._layerService.GetNativeLayer(this).then(l => {
                l.SetVisible(!l.GetVisible());
            });
        }
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._layerService.DeleteLayer(this);
    }
}
MapLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-layer'
            },] },
];
/** @nocollapse */
MapLayerDirective.ctorParameters = () => [
    { type: LayerService },
    { type: ViewContainerRef }
];
MapLayerDirective.propDecorators = {
    _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
    Visible: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MapLayerDirective.prototype._visible;
    /** @type {?} */
    MapLayerDirective.prototype._addedToManager;
    /** @type {?} */
    MapLayerDirective.prototype._id;
    /** @type {?} */
    MapLayerDirective.prototype._markers;
    /** @type {?} */
    MapLayerDirective.prototype._layerService;
    /** @type {?} */
    MapLayerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUNkLGVBQWUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUtsRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ2hCLE1BQU07Ozs7Ozs7OztJQTRDRixZQUFzQixhQUEyQixFQUFZLGFBQStCO1FBQXRFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVksa0JBQWEsR0FBYixhQUFhLENBQWtCO3dCQXZDdkUsSUFBSTsrQkFDRyxLQUFLO1FBdUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0tBQ3hCOzs7Ozs7O0lBMUJELElBQ2UsT0FBTyxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Ozs7O1FBQzVDLE9BQU8sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUWhELEVBQUUsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQTJCbkMsUUFBUTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7OztJQVV6QixXQUFXLENBQUMsT0FBNkM7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM3QyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDakMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7OztJQVNFLFdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztZQXpGNUMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2FBQzFCOzs7O1lBckNRLFlBQVk7WUFETyxnQkFBZ0I7Ozt1QkFnRHZDLGVBQWUsU0FBQyxrQkFBa0I7c0JBV2xDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgU2ltcGxlQ2hhbmdlLFxuICAgIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcblxuLyoqXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG11bHRpcGxlIGxheWVycy5cbiAqL1xubGV0IGxheWVySWQgPSAwO1xuXG4vKipcbiAqIE1hcExheWVyRGlyZWN0aXZlIGNyZWF0ZXMgYSBsYXllciBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge01hcENvbXBvbmVudCwgTWFwTWFya2VyRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAubWFwLWNvbnRhaW5lciB7XG4gKiAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgfVxuICogYF0sXG4gKiB0ZW1wbGF0ZTogYFxuICogICA8eC1tYXAgW0xhdGl0dWRlXT0nbGF0JyBbTG9uZ2l0dWRlXT0nbG5nJyBbWm9vbV09J3pvb20nPlxuICogICAgIDx4LW1hcC1sYXllciBbVmlzaWJsZV09J3Zpc2libGUnPlxuICogICAgICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW0xhYmVsXT0nJ00nJz48L3gtbWFwLW1hcmtlcj5cbiAqICAgICA8L3gtbWFwLWxheWVyPlxuICogICA8L3gtbWFwPlxuICogYFxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1sYXllcidcbn0pXG5leHBvcnQgY2xhc3MgTWFwTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX3Zpc2libGUgPSB0cnVlO1xuICAgIHByb3RlY3RlZCBfYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICBwcm90ZWN0ZWQgX2lkOiBudW1iZXI7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1hcE1hcmtlckRpcmVjdGl2ZSkgcHJvdGVjdGVkIF9tYXJrZXJzOiBBcnJheTxNYXBNYXJrZXJEaXJlY3RpdmU+O1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBsYXllciB2aXNpYmlsaXR5LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBWaXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlzaWJsZTsgfVxuICAgICAgICBwdWJsaWMgc2V0IFZpc2libGUodmFsOiBib29sZWFuKSB7IHRoaXMuX3Zpc2libGUgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxheWVyIGlkLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBMYXllckRpcmVjdGl2ZS5cbiAgICAgKiBAcGFyYW0gX2xheWVyU2VydmljZSAtIENvbmNyZXRlZCBpbXBsZW1lbnRhdGlvbiBvZiBhIGxheWVyIHNlcnZpY2UgZm9yIHRoZSB1bmRlcmx5aW5nIG1hcHMgaW1wbGVtZW50YXRpb25zLlxuICAgICAqIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9ucy5cbiAgICAgKiBAcGFyYW0gX2NvbnRhaW5lclJlZiAtIFJlZmVyZW5jZSB0byB0aGUgY29udGFpbmVyIGhvc3RpbmcgdGhlIG1hcCBjYW52YXMuIEdlbmVyYWxseSBwcm92aWRlZCB2aWEgaW5qZWN0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSwgcHJvdGVjdGVkIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgdGhpcy5faWQgPSBsYXllcklkKys7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gQ29tcG9uZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXNbJ2xheWVySWQnXSA9IHRoaXMuX2lkLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5BZGRMYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIodGhpcykudGhlbihsID0+IHtcbiAgICAgICAgICAgICAgICBsLlNldFZpc2libGUoIWwuR2V0VmlzaWJsZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5EZWxldGVMYXllcih0aGlzKTtcbiAgICB9XG59XG4iXX0=