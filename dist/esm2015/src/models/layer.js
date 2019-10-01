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
export class Layer {
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWFBLE1BQU07Q0FtSUwiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuL21hcmtlcic7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi9wb2x5bGluZSc7XG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi9pbmZvLXdpbmRvdyc7XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgY29udHJhY3QgZm9yIGEgbWFwIGxheWVyIGltcGxlbWVudGF0aW9uLiBEZXJpdmluZyBwcm92aWRlcnMgc2hvdWxkIGltcGxlbWVudHMgdGhpcyBhYnN0cmFjdFxuICogdG8gcHJvdmlkZSBjb25jcmV0ZSBsYXllciBmdW5jdGlvbmFsaXR5IGZvciB0aGUgbWFwLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGF5ZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbGF5ZXIgaW4gdGhlIHVuZGVybHlpbmcgcHJvdmlkZXIgKHN1Y2ggYXNcbiAgICAgKiBNaWNyb3NvZnQuTWFwcy5MYXllcikuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kcywgTGF5ZXIgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHN0cmluZy4gVHlwZSBvZiBldmVudCB0byBhZGQgKGNsaWNrLCBtb3VzZW92ZXIsIGV0YykuIFlvdSBjYW4gdXNlIGFueSBldmVudCB0aGF0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZVxuICAgICAqIGxheWVyIHN1cHBvcnRzLlxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqIHRoZXNlIGNvbmNlcHRzLCBpbnN0ZWFkLCB0aGUgYXBwcm9wcmlhdGUgYWJzdHJhY3QgbW9kZWwgY2xhc3NlcyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIGVhY2ggcHJvdmlkZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZS4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkRW50aXR5KGVudGl0eTogTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqIHRoaXNlIGNvbmNlcHRzLCBpbnN0ZWFkLCB0aGUgYXBwcm9wcmlhdGUgYWJzdHJhY3QgbW9kZWwgY2xhc3NlcyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIGVhY2ggcHJvdmlkZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRFbnRpdGllcyhlbnRpdHk6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZSgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGxheWVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0T3B0aW9ucygpOiBJTGF5ZXJPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaXMgdGhlIGxheWVyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XG5cbiAgICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgY2x1c3RlciBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLikgSW1wbGVtZW50YXRpb25zIG9mIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgZXhwZWN0IG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZlxuICAgICAqIHRoaXNlIGNvbmNlcHRzLCBpbnN0ZWFkLCB0aGUgYXBwcm9wcmlhdGUgYWJzdHJhY3QgbW9kZWwgY2xhc3NlcyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgZm9yIGVhY2ggcHJvdmlkZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBSZW1vdmVFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZDtcblxuICAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXG4gICAgICogYXMgbWFya2VyLCBpbmZvd2luZG93LCBwb2x5bGluZSwgcG9seWdvbiwgZXRjLi4pIEltcGxlbWVudGF0aW9ucyBvZiB0aGlzIG1ldGhvZCBzaG91bGQgbm90IGV4cGVjdCBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2ZcbiAgICAgKiB0aGlzZSBjb25jZXB0cywgaW5zdGVhZCwgdGhlIGFwcHJvcHJpYXRlIGFic3RyYWN0IG1vZGVsIGNsYXNzZXMgc2hvdWxkIGJlIGltcGxlbWVudGVkIGZvciBlYWNoIHByb3ZpZGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4gY29udGFpbmluZyB0aGUgZW50aXRpZXMgdG8gYWRkIHRvIHRoZSBjbHVzdGVyLlxuICAgICAqIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIExheWVyXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+fEFycmF5PEluZm9XaW5kb3c+fEFycmF5PFBvbHlnb24+fEFycmF5PFBvbHlsaW5lPik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciB0aGUgY2x1c3RlciBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIElDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBMYXllclxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgY2x1c3RlciBsYXllciB2aXNpYmlsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZpc2libGUgQm9vbGVhbiB0cnVlIHRvIG1ha2UgdGhlIGxheWVyIHZpc2libGUsIGZhbHNlIHRvIGhpZGUgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcblxufVxuIl19