/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * The abstract class represents the contract defintions for a polygon service to be implemented by an acutaly underlying
 * map architecture.
 *
 * @export
 * @abstract
 * @abstract
 */
export class PolygonService {
}
PolygonService.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    PolygonService.prototype.AddPolygon = function (polygon) { };
    /**
     * Registers an event delegate for a marker.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    PolygonService.prototype.CreateEventObservable = function (eventName, polygon) { };
    /**
     * Deletes a polygon.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    PolygonService.prototype.DeletePolygon = function (polygon) { };
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
    PolygonService.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    PolygonService.prototype.GetNativePolygon = function (polygon) { };
    /**
     * Set the polygon options.
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    PolygonService.prototype.SetOptions = function (polygon, options) { };
    /**
     * Updates the Polygon path
     *
     * @abstract
     * \@memberof PolygonService
     * @abstract
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    PolygonService.prototype.UpdatePolygon = function (polygon) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBZW5ELE1BQU07OztZQURMLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IE1hcFBvbHlnb25EaXJlY3RpdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL21hcC1wb2x5Z29uJztcblxuLyoqXG4gKiBUaGUgYWJzdHJhY3QgY2xhc3MgcmVwcmVzZW50cyB0aGUgY29udHJhY3QgZGVmaW50aW9ucyBmb3IgYSBwb2x5Z29uIHNlcnZpY2UgdG8gYmUgaW1wbGVtZW50ZWQgYnkgYW4gYWN1dGFseSB1bmRlcmx5aW5nXG4gKiBtYXAgYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9seWdvblNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgcG9seWdvbiB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5Z29uIGNvbnRleHQsIHRoZSBwb2x5Z29uIHdpbGwgZWl0aGVyIGJ5IGFkZGVkIHRvIHRoZSBtYXAgb3IgYVxuICAgKiBjb3JyZWNzcG9uZGluZyBsYXllci5cbiAgICpcbiAgICogQGFic3RyYWN0XG4gICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSB0byBiZSBhZGRlZC5cbiAgICpcbiAgICogQG1lbWJlcm9mIFBvbHlnb25TZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgQWRkUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogdm9pZDtcblxuICAvKipcbiAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBtYXJrZXIuXG4gICAgKlxuICAgICogQGFic3RyYWN0XG4gICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXG4gICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBldmVudC5cbiAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgKlxuICAgICogQG1lbWJlcm9mIFBvbHlnb25TZXJ2aWNlXG4gICAgKi9cbiAgcHVibGljIGFic3RyYWN0IENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD47XG5cbiAgLyoqXG4gICAgKiBEZWxldGVzIGEgcG9seWdvbi5cbiAgICAqXG4gICAgKiBAYWJzdHJhY3RcbiAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXG4gICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gZGVsZXRlZC5cbiAgICAqXG4gICAgKiBAbWVtYmVyb2YgUG9seWdvblNlcnZpY2VcbiAgICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXG4gICAqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cbiAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBNYXJrZXJTZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nO1xuXG4gIC8qKlxuICAgKiBPYnRhaW5zIHRoZSBwb2x5Z29uIG1vZGVsIGZvciB0aGUgcG9seWdvbiBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHBvbHlnb24gLSBUaGUge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlnb24gbW9kZWwuXG4gICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgUG9seWdvbn0gaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQb2x5Z29uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IEdldE5hdGl2ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8UG9seWdvbj47XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcG9seWdvbiBvcHRpb25zLlxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxuICAgKiBvcHRpb25zIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgUG9seWdvblNlcnZpY2VcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFBvbHlnb24gcGF0aFxuICAgKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5Z29uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQb2x5Z29uU2VydmljZVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IFVwZGF0ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD47XG5cbn1cbiJdfQ==