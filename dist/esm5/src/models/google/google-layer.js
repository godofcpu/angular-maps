/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
GoogleLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * @param _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof GoogleLayer
     */
    function GoogleLayer(_layer, _maps, _id) {
        this._layer = _layer;
        this._maps = _maps;
        this._id = _id;
        this._entities = new Array();
        this._visible = true;
    }
    Object.defineProperty(GoogleLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer. Google does not have the concept of a custom layer,
         * so we are returning the Map as the native object because it hosts all the markers.
         *
         * \@memberof GoogleLayer
         * @return {?} GoogleMapTypes.GoogleMap.
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
     * \@memberof GoogleLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        throw (new Error('Events are not supported on Google Layers. You can still add events to individual markers.'));
    };
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleLAyer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleLAyer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            this._entities.push(entity);
            entity.NativePrimitve.setVisible(this._visible);
            entity.NativePrimitve.setMap(this.NativePrimitve);
        }
    };
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.AddEntities = /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            (_a = this._entities).push.apply(_a, tslib_1.__spread(entities));
            eachSeries(tslib_1.__spread(entities), function (e, next) {
                e.NativePrimitve.setVisible(_this._visible);
                e.NativePrimitve.setMap(_this.NativePrimitve);
                nextTick(function () { return next(); });
            });
        }
        var _a;
    };
    /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    GoogleLayer.prototype.Delete = /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    function () {
        eachSeries(this._entities.splice(0), function (e, next) {
            e.NativePrimitve.setMap(null);
            nextTick(function () { return next(); });
        });
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    GoogleLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    function () {
        /** @type {?} */
        var options = {
            id: this._id
        };
        return options;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GoogleLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._visible;
    };
    /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.RemoveEntity = /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve) {
            /** @type {?} */
            var j = this._entities.indexOf(entity);
            if (j > -1) {
                this._entities.splice(j, 1);
            }
            entity.NativePrimitve.setMap(null);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        this.Delete();
        this.AddEntities(entities);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        this._id = options.id;
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    GoogleLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        eachSeries(tslib_1.__spread(this._entities), function (e, next) {
            e.NativePrimitve.setVisible(visible);
            nextTick(function () { return next(); });
        });
        this._visible = visible;
    };
    return GoogleLayer;
}());
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
export { GoogleLayer };
if (false) {
    /** @type {?} */
    GoogleLayer.prototype._entities;
    /** @type {?} */
    GoogleLayer.prototype._visible;
    /** @type {?} */
    GoogleLayer.prototype._layer;
    /** @type {?} */
    GoogleLayer.prototype._maps;
    /** @type {?} */
    GoogleLayer.prototype._id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7OztBQWlCN0M7Ozs7O0FBQUE7SUF3QkksR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7Ozs7T0FPRztJQUNILHFCQUFvQixNQUFnQyxFQUFVLEtBQWlCLEVBQVUsR0FBVztRQUFoRixXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFRO3lCQS9CckMsSUFBSSxLQUFLLEVBQXNDO3dCQUNsRixJQUFJO0tBOEJ5RTswQkFoQjlGLHVDQUFjOzs7Ozs7Ozs7O1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUErQmhCLGlDQUFXOzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQVk3RywrQkFBUzs7Ozs7Ozs7OztjQUFDLE1BQWdEO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDckQ7Ozs7Ozs7Ozs7O0lBV0UsaUNBQVc7Ozs7Ozs7OztjQUFDLFFBQW1EOztRQUNsRSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUEsS0FBQSxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsSUFBSSw0QkFBSSxRQUFRLEdBQUU7WUFDakMsVUFBVSxrQkFBSyxRQUFRLEdBQUcsVUFBQyxDQUFDLEVBQUUsSUFBSTtnQkFDOUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7OztJQVFFLDRCQUFNOzs7Ozs7O1FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsQ0FBQyxFQUFFLElBQUk7WUFDekMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsUUFBUSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLGdDQUFVOzs7Ozs7Ozs7UUFDYixJQUFNLE9BQU8sR0FBa0I7WUFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7OztJQVVaLGdDQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7O0lBVWxCLGtDQUFZOzs7Ozs7OztjQUFDLE1BQWdEO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUN4QixJQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQzVDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDOzs7Ozs7Ozs7OztJQVdFLGlDQUFXOzs7Ozs7Ozs7Y0FBQyxRQUE4RTtRQUM3RixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd4QixnQ0FBVTs7Ozs7Ozs7O2NBQUMsT0FBc0I7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVW5CLGdDQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLFVBQVUsa0JBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFDLENBQUMsRUFBRSxJQUFJO1lBQ3BDLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O3NCQXRNaEM7SUF5TUMsQ0FBQTs7Ozs7O0FBeExELHVCQXdMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVhY2hTZXJpZXMsIG5leHRUaWNrIH0gZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi9nb29nbGUtbWFya2VyJztcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL2xheWVyJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL3BvbHlnb24nO1xuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9wb2x5bGluZSc7XG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIGEgbGF5ZXIgZm9yIHRoZSBHb29nbGUgTWFwIFByb3ZpZGVyLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZUxheWVyIGltcGxlbWVudHMgTGF5ZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2VudGl0aWVzOiBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPiA9IG5ldyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPigpO1xuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuIEdvb2dsZSBkb2VzIG5vdCBoYXZlIHRoZSBjb25jZXB0IG9mIGEgY3VzdG9tIGxheWVyLFxuICAgICAqIHNvIHdlIGFyZSByZXR1cm5pbmcgdGhlIE1hcCBhcyB0aGUgbmF0aXZlIG9iamVjdCBiZWNhdXNlIGl0IGhvc3RzIGFsbCB0aGUgbWFya2Vycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9sYXllciBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIuIE5hdGl2ZSBHb29nbGUgTWFwcyBNYXJrZXIgQ2x1c3RlcmVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xheWVyOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAsIHByaXZhdGUgX21hcHM6IE1hcFNlcnZpY2UsIHByaXZhdGUgX2lkOiBudW1iZXIpIHsgfVxuXG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMsIExheWVyIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSBzdHJpbmcuIFR5cGUgb2YgZXZlbnQgdG8gYWRkIChjbGljaywgbW91c2VvdmVyLCBldGMpLiBZb3UgY2FuIHVzZSBhbnkgZXZlbnQgdGhhdCB0aGUgdW5kZXJseWluZyBuYXRpdmVcbiAgICAgKiBsYXllciBzdXBwb3J0cy5cbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24uIEhhbmRsZXIgdG8gY2FsbCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdFdmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gR29vZ2xlIExheWVycy4gWW91IGNhbiBzdGlsbCBhZGQgZXZlbnRzIHRvIGluZGl2aWR1YWwgbWFya2Vycy4nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbnRpdHkgdG8gdGhlIGxheWVyLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uIGFzIGl0IHdpbGxcbiAgICAgKiB0cmlnZ2VyIGEgcmVjYWx1YXRpb24gb2YgdGhlIGNsdXN0ZXJzIChhbmQgYXNzb2NpYXRlZCBtYXJrZXJzIGlmIGFwcHJvcHJpdGUpIGZvclxuICAgICAqIGVhY2ggaW52b2NhdGlvbi4gSWYgeW91IHVzZSB0aGlzIG1ldGhvZCB0byBhZGQgbWFueSBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyLCB1c2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgTWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZS4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTEF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyIHwgSW5mb1dpbmRvdyB8IFBvbHlnb24gfCBQb2x5bGluZSk6IHZvaWQge1xuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKTtcbiAgICAgICAgICAgIGVudGl0eS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAodGhpcy5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbnVtYmVyIG9mIGVudGl0aWVzIHRvIHRoZSBsYXllci4gRW50aXRpZXMgaW4gdGhpcyBjb250ZXh0IHNob3VsZCBiZSBtb2RlbCBhYnN0cmFjdGlvbnMgb2YgY29uY2VyZWQgbWFwIGZ1bmN0aW9uYWxpdHkgKHN1Y2hcbiAgICAgKiBhcyBtYXJrZXIsIGluZm93aW5kb3csIHBvbHlsaW5lLCBwb2x5Z29uLCBldGMuLilcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lPi4gRW50aXRpZXMgdG8gYWRkIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMQXllclxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXMucHVzaCguLi5lbnRpdGllcyk7XG4gICAgICAgICAgICBlYWNoU2VyaWVzKFsuLi5lbnRpdGllc10sIChlLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgZS5OYXRpdmVQcmltaXR2ZS5zZXRWaXNpYmxlKHRoaXMuX3Zpc2libGUpO1xuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyIGFuYmQgdGhlIG1hcmtlcnMgaW4gaXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICBlYWNoU2VyaWVzKHRoaXMuX2VudGl0aWVzLnNwbGljZSgwKSwgKGUsIG5leHQpID0+IHtcbiAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4gbmV4dCgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIElMYXllck9wdGlvbnMuIFRoZSBsYXllciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIEdldE9wdGlvbnMoKTogSUxheWVyT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5faWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBlbnRpdHkgZnJvbSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUgRW50aXR5IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgUmVtb3ZlRW50aXR5KGVudGl0eTogTWFya2VyIHwgSW5mb1dpbmRvdyB8IFBvbHlnb24gfCBQb2x5bGluZSk6IHZvaWQge1xuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKSB7XG4gICAgICAgICAgICBjb25zdCBqOiBudW1iZXIgPSB0aGlzLl9lbnRpdGllcy5pbmRleE9mKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoaiA+IC0xKSB7IHRoaXMuX2VudGl0aWVzLnNwbGljZShqLCAxKTsgfVxuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGVudGl0aWVzIGZvciB0aGUgY2x1c3RlciBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+fEFycmF5PEluZm9XaW5kb3c+fEFycmF5PFBvbHlnb24+fEFycmF5PFBvbHlsaW5lPiBjb250YWluaW5nXG4gICAgICogdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci4gVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4gfCBBcnJheTxJbmZvV2luZG93PiB8IEFycmF5PFBvbHlnb24+IHwgQXJyYXk8UG9seWxpbmU+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuRGVsZXRlKCk7XG4gICAgICAgIHRoaXMuQWRkRW50aXRpZXMoZW50aXRpZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUxheWVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBsYXllciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faWQgPSBvcHRpb25zLmlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGVhY2hTZXJpZXMoWy4uLnRoaXMuX2VudGl0aWVzXSwgKGUsIG5leHQpID0+IHtcbiAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICB9XG5cbn1cbiJdfQ==