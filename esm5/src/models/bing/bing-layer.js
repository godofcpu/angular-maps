/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
BingLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof BingLayer
     */
    function BingLayer(_layer, _maps) {
        this._layer = _layer;
        this._maps = _maps;
        this._pendingEntities = new Array();
    }
    Object.defineProperty(BingLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof BingLayer
         * @return {?} Microsoft.Maps.Layer.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    BingLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
            fn(e);
        });
    };
    /**
     * Adds an entity to the layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.AddEntity = /**
     * Adds an entity to the layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity && entity.NativePrimitve) {
            if (this.GetVisible()) {
                this._layer.add(entity.NativePrimitve);
            }
            else {
                this._pendingEntities.push(entity);
            }
        }
    };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.AddEntities = /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        //
        // use eachSeries as opposed to _layer.add([]) to provide a non-blocking experience for larger data sets.
        //
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            eachSeries(tslib_1.__spread(entities), function (e, next) {
                if (_this.GetVisible()) {
                    _this._layer.add(e.NativePrimitve);
                }
                else {
                    _this._pendingEntities.push(e);
                }
                nextTick(function () { return next(); });
            });
        }
    };
    /**
     * Deletes the layer.
     *
     * \@memberof BingLayer
     * @return {?}
     */
    BingLayer.prototype.Delete = /**
     * Deletes the layer.
     *
     * \@memberof BingLayer
     * @return {?}
     */
    function () {
        this._maps.DeleteLayer(this);
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    BingLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        /** @type {?} */
        var o = {
            id: Number(this._layer.getId())
        };
        return o;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    BingLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._layer.getVisible();
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            this._layer.remove(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    BingLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing the entities to add to the cluster.
     * This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        //
        // we are using removal and add as opposed to set as for large number of objects it yields a non-blocking, smoother performance...
        //
        this._layer.setPrimitives([]);
        this.AddEntities(entities);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        this._layer.metadata.id = options.id.toString();
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    BingLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        this._layer.setVisible(visible);
        if (visible && this._pendingEntities.length > 0) {
            this.AddEntities(this._pendingEntities.splice(0));
        }
    };
    return BingLayer;
}());
/**
 * Concrete implementation of a map layer for the Bing Map Provider.
 *
 * @export
 */
export { BingLayer };
if (false) {
    /** @type {?} */
    BingLayer.prototype._pendingEntities;
    /** @type {?} */
    BingLayer.prototype._layer;
    /** @type {?} */
    BingLayer.prototype._maps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7OztBQWU3Qzs7Ozs7QUFBQTtJQW1CSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsbUJBQW9CLE1BQTRCLEVBQVUsS0FBaUI7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO2dDQTdCTCxJQUFJLEtBQUssRUFBc0M7S0E2QnJDOzBCQWhCckUscUNBQWM7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBK0JoQiwrQkFBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNULENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVBLDZCQUFTOzs7Ozs7OztjQUFDLE1BQTBDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7Ozs7Ozs7Ozs7O0lBV0UsK0JBQVc7Ozs7Ozs7OztjQUFDLFFBQW1EOzs7OztRQUlsRSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLFVBQVUsa0JBQUssUUFBUSxHQUFHLFVBQUMsQ0FBQyxFQUFFLElBQUk7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakM7Z0JBQ0QsUUFBUSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLENBQUMsQ0FBQzthQUMxQixDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7SUFRRSwwQkFBTTs7Ozs7OztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVMUIsOEJBQVU7Ozs7Ozs7OztRQUNiLElBQU0sQ0FBQyxHQUFrQjtZQUNyQixFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7OztJQVVOLDhCQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTdCLGdDQUFZOzs7Ozs7OztjQUFDLE1BQTBDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3Qzs7Ozs7Ozs7Ozs7SUFXRSwrQkFBVzs7Ozs7Ozs7O2NBQUMsUUFBd0U7Ozs7UUFJdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZeEIsOEJBQVU7Ozs7Ozs7OztjQUFDLE9BQXNCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTdDLDhCQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7O29CQXRNVDtJQXlNQyxDQUFBOzs7Ozs7QUExTEQscUJBMExDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWFjaFNlcmllcywgbmV4dFRpY2sgfSBmcm9tICdhc3luYyc7XG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uL3BvbHlsaW5lJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBtYXAgbGF5ZXIgZm9yIHRoZSBCaW5nIE1hcCBQcm92aWRlci5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5nTGF5ZXIgaW1wbGVtZW50cyBMYXllciB7XG5cbiAgICBwcml2YXRlIF9wZW5kaW5nRW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+ID0gbmV3IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmF0aXZlIHByaW1pdGl2ZSB1bmRlcm5lYXRoIHRoZSBhYnN0cmFjdGlvbiBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE1pY3Jvc29mdC5NYXBzLkxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmluZ0NsdXN0ZXJMYXllciBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyLiBOYXRpdmUgQmluZyBDbHVzdGVyIExheWVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIsIHByaXZhdGUgX21hcHM6IE1hcFNlcnZpY2UpIHsgfVxuXG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMsIExheWVyIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSBzdHJpbmcuIFR5cGUgb2YgZXZlbnQgdG8gYWRkIChjbGljaywgbW91c2VvdmVyLCBldGMpLiBZb3UgY2FuIHVzZSBhbnkgZXZlbnQgdGhhdCB0aGUgdW5kZXJseWluZyBuYXRpdmVcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fbGF5ZXIsIGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZCB7XG4gICAgICAgIGlmIChlbnRpdHkgJiYgZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5HZXRWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdFbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLilcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZCB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHVzZSBlYWNoU2VyaWVzIGFzIG9wcG9zZWQgdG8gX2xheWVyLmFkZChbXSkgdG8gcHJvdmlkZSBhIG5vbi1ibG9ja2luZyBleHBlcmllbmNlIGZvciBsYXJnZXIgZGF0YSBzZXRzLlxuICAgICAgICAvL1xuICAgICAgICBpZiAoZW50aXRpZXMgIT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KGVudGl0aWVzKSAmJiBlbnRpdGllcy5sZW5ndGggIT09IDAgKSB7XG4gICAgICAgICAgICBlYWNoU2VyaWVzKFsuLi5lbnRpdGllc10sIChlLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0VmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLmFkZChlLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdFbnRpdGllcy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiBuZXh0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXBzLkRlbGV0ZUxheWVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBJQ2x1c3Rlck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElMYXllck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBJTGF5ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IE51bWJlcih0aGlzLl9sYXllci5nZXRJZCgpKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEJvb2xlYW4uIFRydWUgaXMgdGhlIGxheWVyIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllci5nZXRWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgY2x1c3RlciBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBSZW1vdmVFbnRpdHkoZW50aXR5OiBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lKTogdm9pZCB7XG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlbW92ZShlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZW50aXRpZXMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+IGNvbnRhaW5pbmcgdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci5cbiAgICAgKiBUaGlzIHJlcGxhY2VzIGFueSBleGlzdGluZyBlbnRpdGllcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj58QXJyYXk8SW5mb1dpbmRvdz58QXJyYXk8UG9seWdvbj58QXJyYXk8UG9seWxpbmU+KTogdm9pZCB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHdlIGFyZSB1c2luZyByZW1vdmFsIGFuZCBhZGQgYXMgb3Bwb3NlZCB0byBzZXQgYXMgZm9yIGxhcmdlIG51bWJlciBvZiBvYmplY3RzIGl0IHlpZWxkcyBhIG5vbi1ibG9ja2luZywgc21vb3RoZXIgcGVyZm9ybWFuY2UuLi5cbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5fbGF5ZXIuc2V0UHJpbWl0aXZlcyhbXSk7XG4gICAgICAgIHRoaXMuQWRkRW50aXRpZXMoZW50aXRpZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBJQ2x1c3Rlck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUxheWVyT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sYXllci5tZXRhZGF0YS5pZCA9IG9wdGlvbnMuaWQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbHVzdGVyIGxheWVyIHZpc2liaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYXllci5zZXRWaXNpYmxlKHZpc2libGUpO1xuICAgICAgICBpZiAodmlzaWJsZSAmJiB0aGlzLl9wZW5kaW5nRW50aXRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5BZGRFbnRpdGllcyh0aGlzLl9wZW5kaW5nRW50aXRpZXMuc3BsaWNlKDApKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19