/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
Layer = /** @class */ (function () {
    function Layer() {
    }
    return Layer;
}());
/**
 * Defines the contract for a map layer implementation. Deriving providers should implements this abstract
 * to provide concrete layer functionality for the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Layer };
if (false) {
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - An object representing the native implementation of the layer in the underlying provider (such as
     * Microsoft.Maps.Layer).
     *
     */
    Layer.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    Layer.prototype.AddListener = function (eventType, fn) { };
    /**
     * Adds an entity to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * these concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    Layer.prototype.AddEntity = function (entity) { };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity
     * @return {?}
     */
    Layer.prototype.AddEntities = function (entity) { };
    /**
     * Deletes the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?}
     */
    Layer.prototype.Delete = function () { };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - The layer options.
     *
     */
    Layer.prototype.GetOptions = function () { };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @return {?} - True is the layer is visible, false otherwise.
     *
     */
    Layer.prototype.GetVisible = function () { };
    /**
     * Removes an entity from the cluster layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    Layer.prototype.RemoveEntity = function (entity) { };
    /**
     * Sets the entities for the cluster layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..) Implementations of this method should not expect native implementation of
     * thise concepts, instead, the appropriate abstract model classes should be implemented for each provider
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    Layer.prototype.SetEntities = function (entities) { };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof Layer
     * @abstract
     * @abstract
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    Layer.prototype.SetOptions = function (options) { };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @abstract
     * @abstract
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    Layer.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7OztBQUFBOzs7Z0JBYkE7SUFnSkMsQ0FBQTs7Ozs7Ozs7O0FBbklELGlCQW1JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4vbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL3BvbHlnb24nO1xuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuL3BvbHlsaW5lJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuL2luZm8td2luZG93JztcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYSBtYXAgbGF5ZXIgaW1wbGVtZW50YXRpb24uIERlcml2aW5nIHByb3ZpZGVycyBzaG91bGQgaW1wbGVtZW50cyB0aGlzIGFic3RyYWN0XG4gKiB0byBwcm92aWRlIGNvbmNyZXRlIGxheWVyIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBtYXAuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMYXllciB7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmF0aXZlIHByaW1pdGl2ZSB1bmRlcm5lYXRoIHRoZSBhYnN0cmFjdGlvbiBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsYXllciBpbiB0aGUgdW5kZXJseWluZyBwcm92aWRlciAoc3VjaCBhc1xuICAgICAqIE1pY3Jvc29mdC5NYXBzLkxheWVyKS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55O1xuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uLiBIYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLiBFbnRpdGllcyBpbiB0aGlzIGNvbnRleHQgc2hvdWxkIGJlIG1vZGVsIGFic3RyYWN0aW9ucyBvZiBjb25jZXJlZCBtYXAgZnVuY3Rpb25hbGl0eSAoc3VjaFxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXG4gICAgICogdGhlc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lLiBFbnRpdHkgdG8gYWRkIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBudW1iZXIgb2YgZW50aXRpZXMgdG8gdGhlIGxheWVyLiBFbnRpdGllcyBpbiB0aGlzIGNvbnRleHQgc2hvdWxkIGJlIG1vZGVsIGFic3RyYWN0aW9ucyBvZiBjb25jZXJlZCBtYXAgZnVuY3Rpb25hbGl0eSAoc3VjaFxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXG4gICAgICogdGhpc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZEVudGl0aWVzKGVudGl0eTogQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgbGF5ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRPcHRpb25zKCk6IElMYXllck9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldFZpc2libGUoKTogYm9vbGVhbjtcblxuICAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLiBFbnRpdGllcyBpbiB0aGlzIGNvbnRleHQgc2hvdWxkIGJlIG1vZGVsIGFic3RyYWN0aW9ucyBvZiBjb25jZXJlZCBtYXAgZnVuY3Rpb25hbGl0eSAoc3VjaFxuICAgICAqIGFzIG1hcmtlciwgaW5mb3dpbmRvdywgcG9seWxpbmUsIHBvbHlnb24sIGV0Yy4uKSBJbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBleHBlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mXG4gICAgICogdGhpc2UgY29uY2VwdHMsIGluc3RlYWQsIHRoZSBhcHByb3ByaWF0ZSBhYnN0cmFjdCBtb2RlbCBjbGFzc2VzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBmb3IgZWFjaCBwcm92aWRlclxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lIEVudGl0eSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUpOiB2b2lkO1xuXG4gICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqIHRoaXNlIGNvbmNlcHRzLCBpbnN0ZWFkLCB0aGUgYXBwcm9wcmlhdGUgYWJzdHJhY3QgbW9kZWwgY2xhc3NlcyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIGVhY2ggcHJvdmlkZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+fEFycmF5PEluZm9XaW5kb3c+fEFycmF5PFBvbHlnb24+fEFycmF5PFBvbHlsaW5lPiBjb250YWluaW5nIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuXG4gICAgICogVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIGxheWVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMob3B0aW9uczogSUxheWVyT3B0aW9ucyk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbHVzdGVyIGxheWVyIHZpc2liaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xuXG59XG4iXX0=