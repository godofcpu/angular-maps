/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract class to to define the layer service contract. Must be realized by implementing provider.
 *
 * @export
 * @abstract
 * @abstract
 */
export class LayerService {
}
LayerService.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    LayerService.prototype.AddLayer = function (layer) { };
    /**
     * Adds a marker to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the marker.
     * @param {?} options - Marker options defining the marker.
     * @return {?} - A promise that when fullfilled contains the an instance of the Marker model.
     *
     */
    LayerService.prototype.CreateMarker = function (layer, options) { };
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    LayerService.prototype.CreateMarkers = function (options, markerIcon) { };
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polygon options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    LayerService.prototype.CreatePolygon = function (layer, options) { };
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    LayerService.prototype.CreatePolygons = function (layer, options) { };
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the marker.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an
     * array of polylines for complex paths) model.
     *
     */
    LayerService.prototype.CreatePolyline = function (layer, options) { };
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    LayerService.prototype.CreatePolylines = function (layer, options) { };
    /**
     * Deletes the layer
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    LayerService.prototype.DeleteLayer = function (layer) { };
    /**
     * Returns the Layer model represented by this layer.
     *
     * @abstract
     * \@memberof LayerService
     * @abstract
     * @param {?} layer - MapLayerDirective component object or MapLayerId for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    LayerService.prototype.GetNativeLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQWtCbkQsTUFBTTs7O1lBREwsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9tb2RlbHMvcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyB0byB0byBkZWZpbmUgdGhlIGxheWVyIHNlcnZpY2UgY29udHJhY3QuIE11c3QgYmUgcmVhbGl6ZWQgYnkgaW1wbGVtZW50aW5nIHByb3ZpZGVyLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBtYXJrZXIgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIG1hcmtlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE1hcmtlciBvcHRpb25zIGRlZmluaW5nIHRoZSBtYXJrZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBNYXJrZXIgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBtYXJrZXJzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBtYXJrZXJzIHRvIGJlIHVzZWQgaW4gYnVsa1xuICAgICAqIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE1hcmtlciBvcHRpb25zIGRlZmluaW5nIHRoZSBtYXJrZXJzLlxuICAgICAqIEBwYXJhbSBtYXJrZXJJY29uIC0gT3B0aW9uYWwgaW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgY3VzdG9tIG1hcmtlcnMuIFRoaXMgd2lsbCBiZSBhcHBsaWVkIHRvIGFsbCBtYXJrZXJzLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIE1hcmtlciBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IENyZWF0ZU1hcmtlcnMob3B0aW9uczogQXJyYXk8SU1hcmtlck9wdGlvbnM+LCBtYXJrZXJJY29uPzogSU1hcmtlckljb25JbmZvKTogUHJvbWlzZTxBcnJheTxNYXJrZXI+PjtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBsaW5lLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWdvbiBvcHRpb25zIGRlZmluaW5nIHRoZSBsaW5lLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWdvbiBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj47XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBtYXJrZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5bGluZSAob3IgYW5cbiAgICAgKiBhcnJheSBvZiBwb2x5bGluZXMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXG4gICAgICogb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZXMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXJcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIExheWVyIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IG9yIE1hcExheWVySWQgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllciBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIExheWVyIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXROYXRpdmVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmV8bnVtYmVyKTogUHJvbWlzZTxMYXllcj47XG59XG4iXX0=