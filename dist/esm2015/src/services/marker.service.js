/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a marker service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
export class MarkerService {
}
MarkerService.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     *
     * @return {?}
     */
    MarkerService.prototype.AddMarker = function (marker) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarker} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    MarkerService.prototype.CreateEventObservable = function (eventName, marker) { };
    /**
     * Deletes a marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     *
     */
    MarkerService.prototype.DeleteMarker = function (marker) { };
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
    MarkerService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     *
     */
    MarkerService.prototype.GetNativeMarker = function (marker) { };
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     *
     */
    MarkerService.prototype.GetPixelsFromClick = function (e) { };
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} target - Either a {\@link MapMarkerDirective} or a {\@link ILatLong}
     * for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarkerDirective or ILatLong relative to the map canvas.
     *
     */
    MarkerService.prototype.LocationToPoint = function (target) { };
    /**
     * Updates the anchor position for the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} maker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     *
     */
    MarkerService.prototype.UpdateAnchor = function (maker) { };
    /**
     * Updates whether the marker is draggable.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     *
     */
    MarkerService.prototype.UpdateDraggable = function (marker) { };
    /**
     * Updates the Icon on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     *
     */
    MarkerService.prototype.UpdateIcon = function (marker) { };
    /**
     * Updates the label on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     *
     */
    MarkerService.prototype.UpdateLabel = function (marker) { };
    /**
     * Updates the geo coordinates for the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     *
     */
    MarkerService.prototype.UpdateMarkerPosition = function (marker) { };
    /**
     * Updates the title on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     *
     */
    MarkerService.prototype.UpdateTitle = function (marker) { };
    /**
     * Updates the visibility on the marker.
     *
     * @abstract
     * \@memberof MarkerService
     * @abstract
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the visibility has been updated.
     *
     */
    MarkerService.prototype.UpdateVisible = function (marker) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQWVuRCxNQUFNOzs7WUFETCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL21hcC1tYXJrZXInO1xuXG4vKipcbiAqIFRoZSBhYnN0cmFjdCBjbGFzcyByZXByZXNlbnRzIHRoZSBjb250cmFjdCBkZWZpbnRpb25zIGZvciBhIG1hcmtlciBzZXJ2aWNlIHRvIGJlIGltcGxlbWVudGVkIGJ5IGFuIGFjdXRhbHkgdW5kZXJseWluZ1xuICogbWFwIGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcmtlclNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG1hcmtlci4gRGVwZW5kaW5nIG9uIHRoZSBtYXJrZXIgY29udGV4dCwgdGhlIG1hcmtlciB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGEgY29ycmVjc3BvbmRpbmcgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXG4gICAgICogQHBhcmFtIG1hcmtlciAtIFRoZSB7QGxpbmsgTWFwTWFya2VyfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPjtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0ge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcmtlciBoYXMgYmVlbiBkZWxldGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRDb29yZGluYXRlc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50fCBhbnkpOiBJTGF0TG9uZztcblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgdGhlIG1hcmtlciBtb2RlbCBmb3IgdGhlIG1hcmtlciBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcmtlciAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gb2J0YWluIHRoZSBtYXJrZXIgbW9kZWwuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBNYXJrZXJ9IGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0TmF0aXZlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTxNYXJrZXI+O1xuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIHBpeGVsIGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIHBpeGVscyBvZiB0aGUgbWFya2VyIG9uIHRoZSBtYXAgY2FudmFzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGl4ZWxzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnR8IGFueSk6IElQb2ludDtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IC0gRWl0aGVyIGEge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb3IgYSB7QGxpbmsgSUxhdExvbmd9XG4gICAgICogZm9yIHRoZSBiYXNpcyBvZiB0cmFuc2xhdGlvbi5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyBhIHtAbGluayBJUG9pbnR9XG4gICAgICogd2l0aCB0aGUgcGl4ZWwgY29vcmRpbmF0ZXMgb2YgdGhlIE1hcE1hcmtlckRpcmVjdGl2ZSBvciBJTGF0TG9uZyByZWxhdGl2ZSB0byB0aGUgbWFwIGNhbnZhcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IExvY2F0aW9uVG9Qb2ludCh0YXJnZXQ6IE1hcE1hcmtlckRpcmVjdGl2ZSB8IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgYW5jaG9yIHBvc2l0aW9uIGZvciB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGFuY2hvci5cbiAgICAgKiBBbmNob3IgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGFuY2hvciBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlQW5jaG9yKG1ha2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgZHJhZ2FiaWxpdHkuXG4gICAgICogRHJhZ2FiaWxpdHkgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIG1hcmtlciBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlRHJhZ2dhYmxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIEljb24gb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBpY29uLlxuICAgICAqIEljb24gaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGljb24gaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZUljb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgbGFiZWwgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBsYWJlbC5cbiAgICAgKiBMYWJlbCBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGFiZWwgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZUxhYmVsKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBjb29yZGluYXRlcy5cbiAgICAgKiBDb29yZGluYXRlIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlTWFya2VyUG9zaXRpb24obWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdGl0bGUgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSB0aXRsZS5cbiAgICAgKiBUaXRsZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgdGl0bGUgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZVRpdGxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZpc2liaWxpdHkgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSB2aXNpYmlsaXR5LlxuICAgICAqIFZpc2liaWxpdHkgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHZpc2liaWxpdHkgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZVZpc2libGUobWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+O1xuXG59XG4iXX0=