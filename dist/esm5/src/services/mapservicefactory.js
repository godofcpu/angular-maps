/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Implements a factory to create all the implementation specifc services for a map implementation
 *
 * @export
 * @abstract
 * @abstract
 */
var MapServiceFactory = /** @class */ (function () {
    function MapServiceFactory() {
    }
    MapServiceFactory.decorators = [
        { type: Injectable },
    ];
    return MapServiceFactory;
}());
export { MapServiceFactory };
if (false) {
    /**
     * Creates the map service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @return {?} - {\@link MapService} implementing a specific underlying map architecture.
     *
     */
    MapServiceFactory.prototype.Create = function () { };
    /**
     * Creates the cluster service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @return {?} - {\@link ClusterService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateClusterService = function (map) { };
    /**
     * Creates the info box service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} marker - {\@link MarkerService} implementation for thh underlying marker archticture.
     * @return {?} - {\@link InfoBoxService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateInfoBoxService = function (map, marker) { };
    /**
     * Creates the layer service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @return {?} - {\@link LayerService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateLayerService = function (map) { };
    /**
     * Creates the marker service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @param {?} clusters  - {\@link ClusterService} implementation for the underlying map architecture.
     * @return {?} - {\@link MarkerService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreateMarkerService = function (map, layers, clusters) { };
    /**
     * Creates the polygon service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreatePolygonService = function (map, layers) { };
    /**
     * Creates the polyline service.
     *
     * @abstract
     * \@memberof MapServiceFactory
     * @abstract
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    MapServiceFactory.prototype.CreatePolylineService = function (map, layers) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc2VydmljZWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7OztnQkFlMUMsVUFBVTs7NEJBZlg7O1NBZ0JzQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4vaW5mb2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4vbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9wb2x5Z29uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi9wb2x5bGluZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIGEgZmFjdG9yeSB0byBjcmVhdGUgYWxsIHRoZSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZjIHNlcnZpY2VzIGZvciBhIG1hcCBpbXBsZW1lbnRhdGlvblxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwU2VydmljZUZhY3Rvcnkge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbWFwIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRpbmcgYSBzcGVjaWZpYyB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGUoKTogTWFwU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVDbHVzdGVyU2VydmljZShtYXA6IE1hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGluZm8gYm94IHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXG4gICAgICogQHBhcmFtIG1hcmtlciAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFya2VyIGFyY2h0aWN0dXJlLlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIGFic3RyYWN0IENyZWF0ZUluZm9Cb3hTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbWFya2VyOiBNYXJrZXJTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXllciBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVMYXllclNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbWFya2VyIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqIEBwYXJhbSBjbHVzdGVycyAgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlTWFya2VyU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlLCBjbHVzdGVyczogQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWdvbiBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5Z29uU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVQb2x5Z29uU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBwb2x5bGluZSBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5bGluZVNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2U7XG5cbn1cbiJdfQ==