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
var layerId = 0;
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
var MapLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapLayerDirective.
     * @param _layerService - Concreted implementation of a layer service for the underlying maps implementations.
     * Generally provided via injections.
     * @param _containerRef - Reference to the container hosting the map canvas. Generally provided via injection.
     *
     * @memberof MapLayerDirective
     */
    function MapLayerDirective(_layerService, _containerRef) {
        this._layerService = _layerService;
        this._containerRef = _containerRef;
        this._visible = true;
        this._addedToManager = false;
        this._id = layerId++;
    }
    Object.defineProperty(MapLayerDirective.prototype, "Visible", {
        ///
        /// Property declarations
        ///
        /**
         * Gets or sets the layer visibility.
         *
         * @memberof MapLayerDirective
         */
        get: /**
         * Gets or sets the layer visibility.
         *
         * \@memberof MapLayerDirective
         * @return {?}
         */
        function () { return this._visible; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._visible = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLayerDirective.prototype, "Id", {
        get: /**
         * Gets the layer id.
         *
         * \@readonly
         * \@memberof MapLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnInit = /**
     * Called on Component initialization. Part of ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    function () {
        this._containerRef.element.nativeElement.attributes['layerId'] = this._id.toString();
        this._layerService.AddLayer(this);
        this._addedToManager = true;
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapLayerDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['Visible']) {
            this._layerService.GetNativeLayer(this).then(function (l) {
                l.SetVisible(!l.GetVisible());
            });
        }
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    MapLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapLayerDirective
     * @return {?}
     */
    function () {
        this._layerService.DeleteLayer(this);
    };
    MapLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-layer'
                },] },
    ];
    /** @nocollapse */
    MapLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: ViewContainerRef }
    ]; };
    MapLayerDirective.propDecorators = {
        _markers: [{ type: ContentChildren, args: [MapMarkerDirective,] }],
        Visible: [{ type: Input }]
    };
    return MapLayerDirective;
}());
export { MapLayerDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUNkLGVBQWUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUtsRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0VaLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7O09BT0c7SUFDSCwyQkFBc0IsYUFBMkIsRUFBWSxhQUErQjtRQUF0RSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFZLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjt3QkF2Q3ZFLElBQUk7K0JBQ0csS0FBSztRQXVDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztLQUN4QjtJQTFCRCxzQkFDZSxzQ0FBTztRQVZ0QixHQUFHO1FBQ0gseUJBQXlCO1FBQ3pCLEdBQUc7UUFFSDs7OztXQUlHOzs7Ozs7O1FBQ0gsY0FDb0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs7Ozs7a0JBQ3BDLEdBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7O09BREE7MEJBU2hELGlDQUFFOzs7Ozs7OztzQkFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7OztJQTJCbkMsb0NBQVE7Ozs7Ozs7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7SUFVekIsdUNBQVc7Ozs7Ozs7O2NBQUMsT0FBNkM7UUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7SUFTRSx1Q0FBVzs7Ozs7Ozs7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O2dCQXpGNUMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO2lCQUMxQjs7OztnQkFyQ1EsWUFBWTtnQkFETyxnQkFBZ0I7OzsyQkFnRHZDLGVBQWUsU0FBQyxrQkFBa0I7MEJBV2xDLEtBQUs7OzRCQTVEVjs7U0F3Q2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIFNpbXBsZUNoYW5nZSxcbiAgICBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcE1hcmtlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWFwLW1hcmtlcic7XG5cbi8qKlxuICogaW50ZXJuYWwgY291bnRlciB0byB1c2UgYXMgaWRzIGZvciBtdWx0aXBsZSBsYXllcnMuXG4gKi9cbmxldCBsYXllcklkID0gMDtcblxuLyoqXG4gKiBNYXBMYXllckRpcmVjdGl2ZSBjcmVhdGVzIGEgbGF5ZXIgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgLm1hcC1jb250YWluZXIge1xuICogICAgIGhlaWdodDogMzAwcHg7XG4gKiAgIH1cbiAqIGBdLFxuICogdGVtcGxhdGU6IGBcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09J2xhdCcgW0xvbmdpdHVkZV09J2xuZycgW1pvb21dPSd6b29tJz5cbiAqICAgICA8eC1tYXAtbGF5ZXIgW1Zpc2libGVdPSd2aXNpYmxlJz5cbiAqICAgICAgICAgPHgtbWFwLW1hcmtlciBbTGF0aXR1ZGVdPSdsYXQnIFtMb25naXR1ZGVdPSdsbmcnIFtMYWJlbF09JydNJyc+PC94LW1hcC1tYXJrZXI+XG4gKiAgICAgPC94LW1hcC1sYXllcj5cbiAqICAgPC94LW1hcD5cbiAqIGBcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAneC1tYXAtbGF5ZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hcExheWVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJvdGVjdGVkIF92aXNpYmxlID0gdHJ1ZTtcbiAgICBwcm90ZWN0ZWQgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgcHJvdGVjdGVkIF9pZDogbnVtYmVyO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNYXBNYXJrZXJEaXJlY3RpdmUpIHByb3RlY3RlZCBfbWFya2VyczogQXJyYXk8TWFwTWFya2VyRGlyZWN0aXZlPjtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbGF5ZXIgdmlzaWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgVmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Zpc2libGU7IH1cbiAgICAgICAgcHVibGljIHNldCBWaXNpYmxlKHZhbDogYm9vbGVhbikgeyB0aGlzLl92aXNpYmxlID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsYXllciBpZC5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwTGF5ZXJEaXJlY3RpdmUuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmV0ZWQgaW1wbGVtZW50YXRpb24gb2YgYSBsYXllciBzZXJ2aWNlIGZvciB0aGUgdW5kZXJseWluZyBtYXBzIGltcGxlbWVudGF0aW9ucy5cbiAgICAgKiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbnMuXG4gICAgICogQHBhcmFtIF9jb250YWluZXJSZWYgLSBSZWZlcmVuY2UgdG8gdGhlIGNvbnRhaW5lciBob3N0aW5nIHRoZSBtYXAgY2FudmFzLiBHZW5lcmFsbHkgcHJvdmlkZWQgdmlhIGluamVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsIHByb3RlY3RlZCBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIENvbXBvbmVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10gPSB0aGlzLl9pZC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjaGFuZ2VzIHRvIHRoZSBkYXRhYm91ZCBwcm9wZXJ0aWVzIG9jY3VyLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkdldE5hdGl2ZUxheWVyKHRoaXMpLnRoZW4obCA9PiB7XG4gICAgICAgICAgICAgICAgbC5TZXRWaXNpYmxlKCFsLkdldFZpc2libGUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcExheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuRGVsZXRlTGF5ZXIodGhpcyk7XG4gICAgfVxufVxuIl19