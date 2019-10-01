/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract class to implement map api. A concrete implementation should be created for each
 * Map provider supported (e.g. Bing, Goolge, ESRI)
 *
 * @export
 * @abstract
 * @abstract
 */
var MapService = /** @class */ (function () {
    function MapService() {
    }
    /**
     * Gets a random geo locations filling the bounding box.
     *
     * \@memberof MapService
     * @param {?} count - number of locations to return
     * @param {?} bounds  - bounding box.
     * @return {?} - Array of geo locations.
     */
    MapService.GetRandonLocations = /**
     * Gets a random geo locations filling the bounding box.
     *
     * \@memberof MapService
     * @param {?} count - number of locations to return
     * @param {?} bounds  - bounding box.
     * @return {?} - Array of geo locations.
     */
    function (count, bounds) {
        /** @type {?} */
        var a = [];
        /** @type {?} */
        var _getRandomLocation = function (b) {
            /** @type {?} */
            var lat = Math.random() * (b.maxLatitude - b.minLatitude) + b.minLatitude;
            /** @type {?} */
            var lng = 0;
            if (crossesDateLine) {
                lng = Math.random() * (b.minLongitude + 360 - b.maxLongitude) + b.maxLongitude;
                if (lng > 180) {
                    lng = lng - 360;
                }
            }
            else {
                lng = Math.random() * (b.maxLongitude - b.minLongitude) + b.minLongitude;
            }
            /** @type {?} */
            var p = { latitude: lat, longitude: lng };
            return p;
        };
        /** @type {?} */
        var crossesDateLine = false;
        if (bounds == null) {
            bounds = /** @type {?} */ ({
                maxLatitude: 360,
                minLatitude: 0,
                maxLongitude: 170,
                minLongitude: 0
            });
        }
        if (bounds.center.longitude < bounds.minLongitude || bounds.center.longitude > bounds.maxLongitude) {
            crossesDateLine = true;
        }
        if (!count || count <= 0) {
            return [_getRandomLocation(bounds)];
        }
        for (var r = 0; r < count; r++) {
            a.push(_getRandomLocation(bounds));
        }
        return a;
    };
    MapService.decorators = [
        { type: Injectable },
    ];
    return MapService;
}());
export { MapService };
if (false) {
    /**
     * Gets the Map control instance underlying the implementation
     *
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapInstance = function () { };
    /**
     * Gets a Promise for a Map control instance underlying the implementation. Use this instead of {\@link MapInstance} if you
     * are not sure if and when the instance will be created.
     * \@readonly
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapPromise = function () { };
    /**
     * Gets the maps physical size.
     *
     * \@readonly
     * @abstract
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.MapSize = function () { };
    /**
     * Creates a canvas overlay layer to perform custom drawing over the map with out
     * some of the overhead associated with going through the Map objects.
     * \@memberof MapService
     * @abstract
     * @abstract
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     * @return {?} - Promise of a {\@link CanvasOverlay} object.
     */
    MapService.prototype.CreateCanvasOverlay = function (drawCallback) { };
    /**
     * Creates a map cluster layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link IClusterOptions}.
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateClusterLayer = function (options) { };
    /**
     * Creates an information window for a map position
     *
     * \@memberof MapService
     * @abstract
     * @param {?=} options
     * @return {?} - Promise of a {\@link InfoWindow} object, which models the underlying natvie infobox object.
     *
     */
    MapService.prototype.CreateInfoWindow = function (options) { };
    /**
     * Creates a map layer within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the layer. See {\@link ILayerOptions}
     * @return {?} - Promise of a {\@link Layer} object, which models the underlying native layer object.
     *
     */
    MapService.prototype.CreateLayer = function (options) { };
    /**
     * Creates a map instance
     *
     * \@memberof MapService
     * @abstract
     * @param {?} el - HTML element to host the map.
     * @param {?} mapOptions - Map options
     * @return {?} - Promise fullfilled once the map has been created.
     *
     */
    MapService.prototype.CreateMap = function (el, mapOptions) { };
    /**
     * Creates a map marker within the map context
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options
     * @return {?} - Promise of a {\@link Marker} object, which models the underlying native pushpin object.
     *
     */
    MapService.prototype.CreateMarker = function (options) { };
    /**
     * Creates a polygon within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polygon. See {\@link IPolygonOptions}.
     * @return {?} - Promise of a {\@link Polygon} object, which models the underlying native polygon.
     *
     */
    MapService.prototype.CreatePolygon = function (options) { };
    /**
     * Creates a polyline within the map context
     *
     * @abstract
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options for the polyline. See {\@link IPolylineOptions}.
     * @return {?} - Promise of a {\@link Polyline} object (or an array thereof for complex paths),
     * which models the underlying native polyline.
     *
     */
    MapService.prototype.CreatePolyline = function (options) { };
    /**
     * Deletes a layer from the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} layer - Layer to delete. See {\@link Layer}.
     * @return {?} - Promise fullfilled when the layer has been removed.
     *
     */
    MapService.prototype.DeleteLayer = function (layer) { };
    /**
     * Dispaose the map and associated resoures.
     *
     * \@memberof MapService
     * @abstract
     * @return {?}
     */
    MapService.prototype.DisposeMap = function () { };
    /**
     * Gets the geo coordinates of the map bounds
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the bounding box of the screen. See {\@link IBox}.
     *
     */
    MapService.prototype.GetBounds = function () { };
    /**
     * Gets the geo coordinates of the map center
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the goe location of the center. See {\@link ILatLong}.
     *
     */
    MapService.prototype.GetCenter = function () { };
    /**
     * Gets the current zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @return {?} - A promise that when fullfilled contains the zoom level.
     *
     */
    MapService.prototype.GetZoom = function () { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} loc - The geo coordinates to translate.
     * @return {?} - Promise of an {\@link IPoint} interface representing the pixels. This promise resolves to null
     * if the goe coordinates are not in the view port.
     *
     */
    MapService.prototype.LocationToPoint = function (loc) { };
    /**
     * Provides a conversion of geo coordinates to pixels on the map control.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} locs
     * @return {?} - Promise of an {\@link IPoint} interface array representing the pixels.
     *
     */
    MapService.prototype.LocationsToPoints = function (locs) { };
    /**
     * Centers the map on a geo location.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} latLng - GeoCoordinates around which to center the map. See {\@link ILatLong}
     * @return {?} - Promise that is fullfilled when the center operations has been completed.
     *
     */
    MapService.prototype.SetCenter = function (latLng) { };
    /**
     * Sets the generic map options.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetMapOptions = function (options) { };
    /**
     * Sets the view options of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} options - Options to set.
     *
     * @return {?}
     */
    MapService.prototype.SetViewOptions = function (options) { };
    /**
     * Sets the zoom level of the map.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} zoom - Zoom level to set.
     * @return {?} - A Promise that is fullfilled once the zoom operation is complete.
     *
     */
    MapService.prototype.SetZoom = function (zoom) { };
    /**
     * Creates an event subscription
     *
     * \@memberof MapService
     * @abstract
     * @template E
     * @param {?} eventName - The name of the event (e.g. 'click')
     * @return {?} - An observable of tpye E that fires when the event occurs.
     *
     */
    MapService.prototype.SubscribeToMapEvent = function (eventName) { };
    /**
     * Triggers the given event name on the map instance.
     *
     * \@memberof MapService
     * @abstract
     * @param {?} eventName - Event to trigger.
     * @return {?} - A promise that is fullfilled once the event is triggered.
     *
     */
    MapService.prototype.TriggerMapEvent = function (eventName) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUVqQyw2QkFBa0I7Ozs7Ozs7O2NBQUMsS0FBYSxFQUFFLE1BQVk7O1FBQ3hELElBQU0sQ0FBQyxHQUFvQixFQUFFLENBQUM7O1FBQzlCLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxDQUFPOztZQUMvQixJQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDOztZQUNwRixJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFBRTthQUN0QztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2FBQzVFOztZQUNELElBQU0sQ0FBQyxHQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNaLENBQUM7O1FBQ0YsSUFBSSxlQUFlLEdBQVksS0FBSyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxxQkFBUztnQkFDN0IsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxDQUFDO2dCQUNkLFlBQVksRUFBRSxHQUFHO2dCQUNqQixZQUFZLEVBQUUsQ0FBQzthQUNsQixDQUFBLENBQUM7U0FDTDtRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDaEksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Z0JBMUVoQixVQUFVOztxQkExQlg7O1NBMkJzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcbmltcG9ydCB7IElMYXllck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXllci1vcHRpb25zJztcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJveCc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9tb2RlbHMvaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uL21vZGVscy9jYW52YXMtb3ZlcmxheSc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgdG8gaW1wbGVtZW50IG1hcCBhcGkuIEEgY29uY3JldGUgaW1wbGVtZW50YXRpb24gc2hvdWxkIGJlIGNyZWF0ZWQgZm9yIGVhY2hcbiAqIE1hcCBwcm92aWRlciBzdXBwb3J0ZWQgKGUuZy4gQmluZywgR29vbGdlLCBFU1JJKVxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwU2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIHByb3BlcnRpZXNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIE1hcCBjb250cm9sIGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIGltcGxlbWVudGF0aW9uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldCBNYXBJbnN0YW5jZSgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgUHJvbWlzZSBmb3IgYSBNYXAgY29udHJvbCBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBpbXBsZW1lbnRhdGlvbi4gVXNlIHRoaXMgaW5zdGVhZCBvZiB7QGxpbmsgTWFwSW5zdGFuY2V9IGlmIHlvdVxuICAgICAqIGFyZSBub3Qgc3VyZSBpZiBhbmQgd2hlbiB0aGUgaW5zdGFuY2Ugd2lsbCBiZSBjcmVhdGVkLlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0IE1hcFByb21pc2UoKTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFwcyBwaHlzaWNhbCBzaXplLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXQgTWFwU2l6ZSgpOiBJU2l6ZTtcblxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBTZXJ2aWNlIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJhbmRvbSBnZW8gbG9jYXRpb25zIGZpbGxpbmcgdGhlIGJvdW5kaW5nIGJveC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb3VudCAtIG51bWJlciBvZiBsb2NhdGlvbnMgdG8gcmV0dXJuXG4gICAgICogQHBhcmFtIGJvdW5kcyAgLSBib3VuZGluZyBib3guXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBnZW8gbG9jYXRpb25zLlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBHZXRSYW5kb25Mb2NhdGlvbnMoY291bnQ6IG51bWJlciwgYm91bmRzOiBJQm94KTogQXJyYXk8SUxhdExvbmc+IHtcbiAgICAgICAgY29uc3QgYTogQXJyYXk8SUxhdExvbmc+ID0gW107XG4gICAgICAgIGNvbnN0IF9nZXRSYW5kb21Mb2NhdGlvbiA9IChiOiBJQm94KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXQ6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiAoYi5tYXhMYXRpdHVkZSAtIGIubWluTGF0aXR1ZGUpICsgYi5taW5MYXRpdHVkZTtcbiAgICAgICAgICAgIGxldCBsbmc6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBpZiAoY3Jvc3Nlc0RhdGVMaW5lKSB7XG4gICAgICAgICAgICAgICAgbG5nID0gTWF0aC5yYW5kb20oKSAqIChiLm1pbkxvbmdpdHVkZSArIDM2MCAtIGIubWF4TG9uZ2l0dWRlKSArIGIubWF4TG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgIGlmIChsbmcgPiAxODApIHsgbG5nID0gbG5nIC0gMzYwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsbmcgPSBNYXRoLnJhbmRvbSgpICogKGIubWF4TG9uZ2l0dWRlIC0gYi5taW5Mb25naXR1ZGUpICsgYi5taW5Mb25naXR1ZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwOiBJTGF0TG9uZyA9IHsgbGF0aXR1ZGU6IGxhdCwgbG9uZ2l0dWRlOiBsbmcgfTtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY3Jvc3Nlc0RhdGVMaW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGJvdW5kcyA9PSBudWxsKSB7IGJvdW5kcyA9IDxJQm94PntcbiAgICAgICAgICAgICAgICBtYXhMYXRpdHVkZTogMzYwLFxuICAgICAgICAgICAgICAgIG1pbkxhdGl0dWRlOiAwLFxuICAgICAgICAgICAgICAgIG1heExvbmdpdHVkZTogMTcwLFxuICAgICAgICAgICAgICAgIG1pbkxvbmdpdHVkZTogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm91bmRzLmNlbnRlci5sb25naXR1ZGUgPCBib3VuZHMubWluTG9uZ2l0dWRlICB8fCBib3VuZHMuY2VudGVyLmxvbmdpdHVkZSA+IGJvdW5kcy5tYXhMb25naXR1ZGUpIHsgY3Jvc3Nlc0RhdGVMaW5lID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoIWNvdW50IHx8IGNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbX2dldFJhbmRvbUxvY2F0aW9uKGJvdW5kcyldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgY291bnQ7IHIrKykgeyBhLnB1c2goX2dldFJhbmRvbUxvY2F0aW9uKGJvdW5kcykpOyB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjYW52YXMgb3ZlcmxheSBsYXllciB0byBwZXJmb3JtIGN1c3RvbSBkcmF3aW5nIG92ZXIgdGhlIG1hcCB3aXRoIG91dFxuICAgICAqIHNvbWUgb2YgdGhlIG92ZXJoZWFkIGFzc29jaWF0ZWQgd2l0aCBnb2luZyB0aHJvdWdoIHRoZSBNYXAgb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gZHJhd0NhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FudmFzIGlzIHJlYWR5IHRvIGJlXG4gICAgICogcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBDYW52YXNPdmVybGF5fSBvYmplY3QuXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQ3JlYXRlQ2FudmFzT3ZlcmxheShkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKTogUHJvbWlzZTxDYW52YXNPdmVybGF5PjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgY2x1c3RlciBsYXllciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBsYXllci4gU2VlIHtAbGluayBJQ2x1c3Rlck9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBMYXllcn0gb2JqZWN0LCB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIGxheWVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlQ2x1c3RlckxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5mb3JtYXRpb24gd2luZG93IGZvciBhIG1hcCBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIFtvcHRpb25zXSAtIEluZm93aW5kb3cgb3B0aW9ucy4gU2VlIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9XG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGEge0BsaW5rIEluZm9XaW5kb3d9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdHZpZSBpbmZvYm94IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zPzogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTxJbmZvV2luZG93PjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgbGF5ZXIgd2l0aGluIHRoZSBtYXAgY29udGV4dFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgbGF5ZXIuIFNlZSB7QGxpbmsgSUxheWVyT3B0aW9uc31cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2Ugb2YgYSB7QGxpbmsgTGF5ZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBsYXllciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IENyZWF0ZUxheWVyKG9wdGlvbnM6IElMYXllck9wdGlvbnMpOiBQcm9taXNlPExheWVyPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXAgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbCAtIEhUTUwgZWxlbWVudCB0byBob3N0IHRoZSBtYXAuXG4gICAgICogQHBhcmFtIG1hcE9wdGlvbnMgLSBNYXAgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcCBoYXMgYmVlbiBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVNYXAoZWw6IEhUTUxFbGVtZW50LCBtYXBPcHRpb25zOiBJTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWFwIG1hcmtlciB3aXRoaW4gdGhlIG1hcCBjb250ZXh0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gW29wdGlvbnM9PElNYXJrZXJPcHRpb25zPnt9XSAtIE9wdGlvbnMgZm9yIHRoZSBtYXJrZXIuIFNlZSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBNYXJrZXJ9IG9iamVjdCwgd2hpY2ggbW9kZWxzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwdXNocGluIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlTWFya2VyKG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBvbHlnb24gd2l0aGluIHRoZSBtYXAgY29udGV4dFxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciB0aGUgcG9seWdvbi4gU2VlIHtAbGluayBJUG9seWdvbk9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5Z29ufSBvYmplY3QsIHdoaWNoIG1vZGVscyB0aGUgdW5kZXJseWluZyBuYXRpdmUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWdvbihvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBvbHlsaW5lIHdpdGhpbiB0aGUgbWFwIGNvbnRleHRcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIHBvbHlsaW5lLiBTZWUge0BsaW5rIElQb2x5bGluZU9wdGlvbnN9LlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSBvZiBhIHtAbGluayBQb2x5bGluZX0gb2JqZWN0IChvciBhbiBhcnJheSB0aGVyZW9mIGZvciBjb21wbGV4IHBhdGhzKSxcbiAgICAgKiB3aGljaCBtb2RlbHMgdGhlIHVuZGVybHlpbmcgbmF0aXZlIHBvbHlsaW5lLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVQb2x5bGluZShvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIGxheWVyIGZyb20gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIExheWVyIHRvIGRlbGV0ZS4gU2VlIHtAbGluayBMYXllcn0uXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgRGVsZXRlTGF5ZXIobGF5ZXI6IExheWVyKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIERpc3Bhb3NlIHRoZSBtYXAgYW5kIGFzc29jaWF0ZWQgcmVzb3VyZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IERpc3Bvc2VNYXAoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGJvdW5kc1xuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgc2NyZWVuLiBTZWUge0BsaW5rIElCb3h9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBHZXRCb3VuZHMoKTogUHJvbWlzZTxJQm94PjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgbWFwIGNlbnRlclxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGdvZSBsb2NhdGlvbiBvZiB0aGUgY2VudGVyLiBTZWUge0BsaW5rIElMYXRMb25nfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgR2V0Q2VudGVyKCk6IFByb21pc2U8SUxhdExvbmc+O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB6b29tIGxldmVsIG9mIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgem9vbSBsZXZlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgR2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj47XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy4gVGhpcyBwcm9taXNlIHJlc29sdmVzIHRvIG51bGxcbiAgICAgKiBpZiB0aGUgZ29lIGNvb3JkaW5hdGVzIGFyZSBub3QgaW4gdGhlIHZpZXcgcG9ydC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgTG9jYXRpb25Ub1BvaW50KGxvYzogSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD47XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBhIGNvbnZlcnNpb24gb2YgZ2VvIGNvb3JkaW5hdGVzIHRvIHBpeGVscyBvbiB0aGUgbWFwIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9jIC0gVGhlIGdlbyBjb29yZGluYXRlcyB0byB0cmFuc2xhdGUuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIG9mIGFuIHtAbGluayBJUG9pbnR9IGludGVyZmFjZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIHBpeGVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgTG9jYXRpb25zVG9Qb2ludHMobG9jczogQXJyYXk8SUxhdExvbmc+KTogUHJvbWlzZTxBcnJheTxJUG9pbnQ+PjtcblxuICAgIC8qKlxuICAgICAqIENlbnRlcnMgdGhlIG1hcCBvbiBhIGdlbyBsb2NhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW9Db29yZGluYXRlcyBhcm91bmQgd2hpY2ggdG8gY2VudGVyIHRoZSBtYXAuIFNlZSB7QGxpbmsgSUxhdExvbmd9XG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBjZW50ZXIgb3BlcmF0aW9ucyBoYXMgYmVlbiBjb21wbGV0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IFNldENlbnRlcihsYXRMbmc6IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGdlbmVyaWMgbWFwIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBTZXRNYXBPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZpZXcgb3B0aW9ucyBvZiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgU2V0Vmlld09wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHpvb20gLSBab29tIGxldmVsIHRvIHNldC5cbiAgICAgKiBAcmV0dXJucyAtIEEgUHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgb25jZSB0aGUgem9vbSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IFNldFpvb20oem9vbTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZXZlbnQgc3Vic2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChlLmcuICdjbGljaycpXG4gICAgICogQHJldHVybnMgLSBBbiBvYnNlcnZhYmxlIG9mIHRweWUgRSB0aGF0IGZpcmVzIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgU3Vic2NyaWJlVG9NYXBFdmVudDxFPihldmVudE5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8RT47XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZSBvbiB0aGUgbWFwIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIEV2ZW50IHRvIHRyaWdnZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIG9uY2UgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgVHJpZ2dlck1hcEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbn1cbiJdfQ==