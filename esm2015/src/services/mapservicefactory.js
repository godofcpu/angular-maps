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
export class MapServiceFactory {
}
MapServiceFactory.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwc2VydmljZWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvbWFwc2VydmljZWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBZ0IzQyxNQUFNOzs7WUFETCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4vbWFya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL2luZm9ib3guc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuL2xheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4vcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4vcG9seWxpbmUuc2VydmljZSc7XG5cbi8qKlxuICogSW1wbGVtZW50cyBhIGZhY3RvcnkgdG8gY3JlYXRlIGFsbCB0aGUgaW1wbGVtZW50YXRpb24gc3BlY2lmYyBzZXJ2aWNlcyBmb3IgYSBtYXAgaW1wbGVtZW50YXRpb25cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcFNlcnZpY2VGYWN0b3J5IHtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG1hcCBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50aW5nIGEgc3BlY2lmaWMgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlKCk6IE1hcFNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVyIHNlcnZpY2UuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlQ2x1c3RlclNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlKTogQ2x1c3RlclNlcnZpY2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBpbmZvIGJveCBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBtYXJrZXIgLSB7QGxpbmsgTWFya2VyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcmtlciBhcmNodGljdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJbmZvQm94U2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVJbmZvQm94U2VydmljZShtYXA6IE1hcFNlcnZpY2UsIG1hcmtlcjogTWFya2VyU2VydmljZSk6IEluZm9Cb3hTZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5ZXIgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlTGF5ZXJTZXJ2aWNlKG1hcDogTWFwU2VydmljZSk6IExheWVyU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG1hcmtlciBzZXJ2aWNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcGFyYW0gY2x1c3RlcnMgIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIGFic3RyYWN0IENyZWF0ZU1hcmtlclNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSwgY2x1c3RlcnM6IENsdXN0ZXJTZXJ2aWNlKTogTWFya2VyU2VydmljZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlnb24gc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWdvblNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgYWJzdHJhY3QgQ3JlYXRlUG9seWdvblNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWxpbmUgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWxpbmVTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIGFic3RyYWN0IENyZWF0ZVBvbHlsaW5lU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlO1xuXG59XG4iXX0=