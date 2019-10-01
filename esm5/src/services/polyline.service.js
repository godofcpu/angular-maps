/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a polyline service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
var PolylineService = /** @class */ (function () {
    function PolylineService() {
    }
    PolylineService.decorators = [
        { type: Injectable },
    ];
    return PolylineService;
}());
export { PolylineService };
if (false) {
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * correcsponding layer.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    PolylineService.prototype.AddPolyline = function (polyline) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    PolylineService.prototype.CreateEventObservable = function (eventName, polyline) { };
    /**
     * Deletes a polyline.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    PolylineService.prototype.DeletePolyline = function (polyline) { };
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    PolylineService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the polyline model for the polyline allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline} implementation (or an
     * array of polylines) for complex paths of the underlying platform.
     *
     */
    PolylineService.prototype.GetNativePolyline = function (polyline) { };
    /**
     * Set the polyline options.
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    PolylineService.prototype.SetOptions = function (polyline, options) { };
    /**
     * Updates the Polyline path
     *
     * @abstract
     * \@memberof PolylineService
     * @abstract
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    PolylineService.prototype.UpdatePolyline = function (polyline) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7O2dCQWNsRCxVQUFVOzswQkFkWDs7U0Flc0IsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IE1hcFBvbHlsaW5lRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9tYXAtcG9seWxpbmUnO1xuXG4vKipcbiAqIFRoZSBhYnN0cmFjdCBjbGFzcyByZXByZXNlbnRzIHRoZSBjb250cmFjdCBkZWZpbnRpb25zIGZvciBhIHBvbHlsaW5lIHNlcnZpY2UgdG8gYmUgaW1wbGVtZW50ZWQgYnkgYW4gYWN1dGFseSB1bmRlcmx5aW5nXG4gKiBtYXAgYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWxpbmVTZXJ2aWNlIHtcblxuICAvKipcbiAgICogQWRkcyBhIHBvbHlsaW5lIHRvIGEgbWFwLiBEZXBlbmRpbmcgb24gdGhlIHBvbHlsaW5lIGNvbnRleHQsIHRoZSBwb2x5bGluZSB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcbiAgICogY29ycmVjc3BvbmRpbmcgbGF5ZXIuXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IEFkZFBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbWFya2VyLlxuICAgICpcbiAgICAqIEBhYnN0cmFjdFxuICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxuICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cbiAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgKlxuICAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxuICAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD47XG5cbiAgLyoqXG4gICAgKiBEZWxldGVzIGEgcG9seWxpbmUuXG4gICAgKlxuICAgICogQGFic3RyYWN0XG4gICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXG4gICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIGRlbGV0ZWQuXG4gICAgKlxuICAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxuICAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBEZWxldGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBvbiB0aGUgY2xpY2sgbG9jYXRpb25cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxuICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cbiAgICpcbiAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSUxhdExvbmc7XG5cbiAgLyoqXG4gICAqIE9idGFpbnMgdGhlIHBvbHlsaW5lIG1vZGVsIGZvciB0aGUgcG9seWxpbmUgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlsaW5lIG1vZGVsLlxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIFBvbHlsaW5lfSBpbXBsZW1lbnRhdGlvbiAob3IgYW5cbiAgICogYXJyYXkgb2YgcG9seWxpbmVzKSBmb3IgY29tcGxleCBwYXRocyBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IEdldE5hdGl2ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PjtcblxuICAvKipcbiAgICogU2V0IHRoZSBwb2x5bGluZSBvcHRpb25zLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxuICAgKiBvcHRpb25zIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIG9wdGlvbnMgaGF2ZSBiZWVuIHNldC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBvbHlsaW5lU2VydmljZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgUG9seWxpbmUgcGF0aFxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQb2x5bGluZVNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG59XG4iXX0=