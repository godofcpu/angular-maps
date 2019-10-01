/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
import { GoogleMapAPILoader, GoogleMapAPILoaderConfig } from './google-map-api-loader.service';
import { GoogleInfoBoxService } from './google-infobox.service';
import { GoogleMarkerService } from './google-marker.service';
import { GoogleMapService } from './google-map.service';
import { GoogleLayerService } from './google-layer.service';
import { GoogleClusterService } from './google-cluster.service';
import { GooglePolygonService } from './google-polygon.service';
import { GooglePolylineService } from './google-polyline.service';
/**
 * Implements a factory to create three necessary Google Maps specific service instances.
 *
 * @export
 */
var GoogleMapServiceFactory = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleMapServiceFactory.
     * @param _loader - {@link MapAPILoader} implementation for the Google Map provider.
     * @param _zone - NgZone object to implement zone aware promises.
     *
     * @memberof GoogleMapServiceFactory
     */
    function GoogleMapServiceFactory(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    /**
     * Creates the map service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
     *
     */
    GoogleMapServiceFactory.prototype.Create = /**
     * Creates the map service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link GoogleMapService}.
     *
     */
    function () {
        return new GoogleMapService(this._loader, this._zone);
    };
    /**
     * Creates the cluster service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateClusterService = /**
     * Creates the cluster service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link GoogleClusterService}.
     *
     */
    function (_mapService) {
        return new GoogleClusterService(_mapService, this._zone);
    };
    /**
     * Creates thh info box service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _markerService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateInfoBoxService = /**
     * Creates thh info box service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _markerService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link GoogleInfoBoxService}.
     *
     */
    function (_mapService, _markerService) {
        return new GoogleInfoBoxService(_mapService, _markerService, this._zone);
    };
    /**
     * Creates the layer service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateLayerService = /**
     * Creates the layer service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link GoogleLayerService}.
     *
     */
    function (_mapService) {
        return new GoogleLayerService(_mapService, this._zone);
    };
    /**
     * Creates the marker service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
     *
     */
    GoogleMapServiceFactory.prototype.CreateMarkerService = /**
     * Creates the marker service for the Google Maps implementation.
     *
     * \@memberof GoogleMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link GoogleMarkerService}.
     *
     */
    function (_mapService, _layerService, _clusterService) {
        return new GoogleMarkerService(_mapService, _layerService, _clusterService, this._zone);
    };
    /**
     * Creates the polygon service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    GoogleMapServiceFactory.prototype.CreatePolygonService = /**
     * Creates the polygon service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new GooglePolygonService(map, layers, this._zone);
    };
    /**
     * Creates the polyline service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    GoogleMapServiceFactory.prototype.CreatePolylineService = /**
     * Creates the polyline service for the Google Maps implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new GooglePolylineService(map, layers, this._zone);
    };
    GoogleMapServiceFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleMapServiceFactory.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return GoogleMapServiceFactory;
}());
export { GoogleMapServiceFactory };
if (false) {
    /** @type {?} */
    GoogleMapServiceFactory.prototype._map;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._mapResolver;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._loader;
    /** @type {?} */
    GoogleMapServiceFactory.prototype._zone;
}
/**
 *  Creates a new instance of a plaform specific MapServiceFactory.
 *
 * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link GoogleMapAPILoader}.
 * @param {?} zone - An NgZone instance to provide zone aware promises.
 *
 * @return {?} - A {\@link MapServiceFactory} instance.
 */
export function GoogleMapServiceFactoryFactory(apiLoader, zone) {
    return new GoogleMapServiceFactory(apiLoader, zone);
}
/**
 * Creates a new instance of a plaform specific MapLoaderFactory.
 *
 * @export
 * @return {?} - A {\@link MapAPILoader} instance.
 */
export function GoogleMapLoaderFactory() {
    return new GoogleMapAPILoader(new GoogleMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC5zZXJ2aWNlLmZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVV2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7OztJQVk5RCxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxpQ0FBb0IsT0FBcUIsRUFBVSxLQUFhO1FBQWhFLGlCQUdDO1FBSG1CLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQ0wsSUFBSSxPQUFPLENBQTJCLFVBQUMsT0FBbUIsSUFBTyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4Rzs7Ozs7Ozs7SUFhTSx3Q0FBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVduRCxzREFBb0I7Ozs7Ozs7O2NBQUMsV0FBdUI7UUFDL0MsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZdEQsc0RBQW9COzs7Ozs7Ozs7Y0FBQyxXQUF1QixFQUFFLGNBQTZCO1FBQzlFLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV3RFLG9EQUFrQjs7Ozs7Ozs7Y0FBQyxXQUF1QjtRQUM3QyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhcEQscURBQW1COzs7Ozs7Ozs7O2NBQUMsV0FBdUIsRUFBRSxhQUFpQyxFQUFFLGVBQXFDO1FBQ3hILE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZckYsc0RBQW9COzs7Ozs7Ozs7Y0FBQyxHQUFlLEVBQUUsTUFBb0I7UUFDN0QsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXRELHVEQUFxQjs7Ozs7Ozs7O2NBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBOUdqRSxVQUFVOzs7O2dCQXhCRixZQUFZO2dCQUhBLE1BQU07O2tDQUEzQjs7U0E0QmEsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEhwQyxNQUFNLHlDQUF5QyxTQUF1QixFQUFFLElBQVk7SUFDaEYsTUFBTSxDQUFDLElBQUksdUJBQXVCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3ZEOzs7Ozs7O0FBUUQsTUFBTTtJQUNGLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksd0JBQXdCLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztDQUNyRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuLi9tYXBzZXJ2aWNlZmFjdG9yeSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL2luZm9ib3guc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xuXG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuL2dvb2dsZS1tYXAtdHlwZXMnO1xuXG5pbXBvcnQgeyBHb29nbGVNYXBBUElMb2FkZXIsIEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1pbmZvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLW1hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZU1hcFNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBHb29nbGVMYXllclNlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZUNsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZVBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9nb29nbGUtcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZVBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLXBvbHlsaW5lLnNlcnZpY2UnO1xuXG4vKipcbiAqIEltcGxlbWVudHMgYSBmYWN0b3J5IHRvIGNyZWF0ZSB0aHJlZSBuZWNlc3NhcnkgR29vZ2xlIE1hcHMgc3BlY2lmaWMgc2VydmljZSBpbnN0YW5jZXMuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50cyBNYXBTZXJ2aWNlRmFjdG9yeSB7XG4gICAgcHJpdmF0ZSBfbWFwOiBQcm9taXNlPEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcD47XG4gICAgcHJpdmF0ZSBfbWFwUmVzb2x2ZXI6ICh2YWx1ZT86IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCkgPT4gdm9pZDtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeS5cbiAgICAgKiBAcGFyYW0gX2xvYWRlciAtIHtAbGluayBNYXBBUElMb2FkZXJ9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgR29vZ2xlIE1hcCBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgb2JqZWN0IHRvIGltcGxlbWVudCB6b25lIGF3YXJlIHByb21pc2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLl9tYXAgPVxuICAgICAgICAgICAgbmV3IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50YXRpb24uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXAgc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlKCk6IE1hcFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEdvb2dsZU1hcFNlcnZpY2UodGhpcy5fbG9hZGVyLCB0aGlzLl96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBjbHVzdGVyIHNlcnZpY2UgZm9yIHRoZSBHb29nbGUgTWFwcyBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0uXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVDbHVzdGVyU2VydmljZShfbWFwU2VydmljZTogTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVDbHVzdGVyU2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGggaW5mbyBib3ggc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfS5cbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcmtlclNlcnZpY2V9LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIEluZm9Cb3hTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVJbmZvQm94U2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgR29vZ2xlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2UsIF9tYXJrZXJTZXJ2aWNlLCB0aGlzLl96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBsYXllciBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIExheWVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG1hcmtlciBzZXJ2aWNlIGZvciB0aGUgR29vZ2xlIE1hcHMgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVMYXllclNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBjbHVzdGVycyAgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZUNsdXN0ZXJTZXJ2aWNlfS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXJrZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXJrZXJTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBfbGF5ZXJTZXJ2aWNlOiBHb29nbGVMYXllclNlcnZpY2UsIF9jbHVzdGVyU2VydmljZTogR29vZ2xlQ2x1c3RlclNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVNYXJrZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlLCBfbGF5ZXJTZXJ2aWNlLCBfY2x1c3RlclNlcnZpY2UsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlnb24gc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5Z29uU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvblNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVQb2x5Z29uU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWxpbmUgc2VydmljZSBmb3IgdGhlIEdvb2dsZSBNYXBzIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5bGluZVNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWxpbmVTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHb29nbGVQb2x5bGluZVNlcnZpY2UobWFwLCBsYXllcnMsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxufVxuXG4vKipcbiAqICBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgcGxhZm9ybSBzcGVjaWZpYyBNYXBTZXJ2aWNlRmFjdG9yeS5cbiAqXG4gKiBAcGFyYW0gYXBpTG9hZGVyIC0gQW4ge0BsaW5rIE1hcEFQSUxvYWRlcn0gaW5zdGFuY2UuIFRoaXMgaXMgZXhwZWN0ZWQgdG8gdGhlIGEge0BsaW5rIEdvb2dsZU1hcEFQSUxvYWRlcn0uXG4gKiBAcGFyYW0gem9uZSAtIEFuIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gKlxuICogQHJldHVybnMgLSBBIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVNYXBTZXJ2aWNlRmFjdG9yeUZhY3RvcnkoYXBpTG9hZGVyOiBNYXBBUElMb2FkZXIsIHpvbmU6IE5nWm9uZSk6IE1hcFNlcnZpY2VGYWN0b3J5IHtcbiAgICByZXR1cm4gbmV3IEdvb2dsZU1hcFNlcnZpY2VGYWN0b3J5KGFwaUxvYWRlciwgem9uZSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHBsYWZvcm0gc3BlY2lmaWMgTWFwTG9hZGVyRmFjdG9yeS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcmV0dXJucyAtIEEge0BsaW5rIE1hcEFQSUxvYWRlcn0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBHb29nbGVNYXBMb2FkZXJGYWN0b3J5KCk6IE1hcEFQSUxvYWRlciB7XG4gICAgcmV0dXJuIG5ldyBHb29nbGVNYXBBUElMb2FkZXIobmV3IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZygpLCBuZXcgV2luZG93UmVmKCksIG5ldyBEb2N1bWVudFJlZigpKTtcbn1cbiJdfQ==