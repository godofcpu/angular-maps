/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
import { BingMapAPILoader, BingMapAPILoaderConfig } from './bing-map.api-loader.service';
import { BingInfoBoxService } from './bing-infobox.service';
import { BingMarkerService } from './bing-marker.service';
import { BingMapService } from './bing-map.service';
import { BingLayerService } from './bing-layer.service';
import { BingClusterService } from './bing-cluster.service';
import { BingPolygonService } from './bing-polygon.service';
import { BingPolylineService } from './bing-polyline.service';
/**
 * Implements a factory to create thre necessary Bing Maps V8 specific service instances.
 *
 * @export
 */
var BingMapServiceFactory = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMapServiceFactory.
     * @param _loader - {@link MapAPILoader} implementation for the Bing Map V8 provider.
     * @param _zone - NgZone object to implement zone aware promises.
     *
     * @memberof BingMapServiceFactory
     */
    function BingMapServiceFactory(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
    }
    /**
     * Creates the map service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
     *
     */
    BingMapServiceFactory.prototype.Create = /**
     * Creates the map service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @return {?} - {\@link MapService}. A concreted instance of the {\@link BingMapService}.
     *
     */
    function () {
        return new BingMapService(this._loader, this._zone);
    };
    /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    BingMapServiceFactory.prototype.CreateClusterService = /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    function (_mapService) {
        return new BingClusterService(_mapService, this._zone);
    };
    /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    BingMapServiceFactory.prototype.CreateInfoBoxService = /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    function (_mapService) {
        return new BingInfoBoxService(_mapService, this._zone);
    };
    /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    BingMapServiceFactory.prototype.CreateLayerService = /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    function (_mapService) {
        return new BingLayerService(_mapService, this._zone);
    };
    /**
     * Creates the marker service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
     *
     */
    BingMapServiceFactory.prototype.CreateMarkerService = /**
     * Creates the marker service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @param {?} _layerService
     * @param {?} _clusterService
     * @return {?} - {\@link MarkerService}. A concreted instance of the {\@link BingMarkerService}.
     *
     */
    function (_mapService, _layerService, _clusterService) {
        return new BingMarkerService(_mapService, _layerService, _clusterService, this._zone);
    };
    /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    BingMapServiceFactory.prototype.CreatePolygonService = /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new BingPolygonService(map, layers, this._zone);
    };
    /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    BingMapServiceFactory.prototype.CreatePolylineService = /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    function (map, layers) {
        return new BingPolylineService(map, layers, this._zone);
    };
    BingMapServiceFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapServiceFactory.ctorParameters = function () { return [
        { type: MapAPILoader },
        { type: NgZone }
    ]; };
    return BingMapServiceFactory;
}());
export { BingMapServiceFactory };
if (false) {
    /** @type {?} */
    BingMapServiceFactory.prototype._loader;
    /** @type {?} */
    BingMapServiceFactory.prototype._zone;
}
/**
 * Creates a new instance of a plaform specific MapServiceFactory.
 *
 * @export
 * @param {?} apiLoader - An {\@link MapAPILoader} instance. This is expected to the a {\@link BingMapAPILoader}.
 * @param {?} zone - An NgZone instance to provide zone aware promises.
 *
 * @return {?} -  A {\@link MapServiceFactory} instance.
 */
export function BingMapServiceFactoryFactory(apiLoader, zone) {
    return new BingMapServiceFactory(apiLoader, zone);
}
/**
 * Creates a new instance of a plaform specific MapLoaderFactory.
 *
 * @export
 * @return {?} - A {\@link MapAPILoader} instance.
 */
export function BingMapLoaderFactory() {
    return new BingMapAPILoader(new BingMapAPILoaderConfig(), new WindowRef(), new DocumentRef());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU92RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7SUFVMUQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsK0JBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtLQUFLOzs7Ozs7OztJQWE5RCxzQ0FBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXakQsb0RBQW9COzs7Ozs7OztjQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsb0RBQW9COzs7Ozs7OztjQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsa0RBQWtCOzs7Ozs7OztjQUFDLFdBQTJCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQWFsRCxtREFBbUI7Ozs7Ozs7Ozs7Y0FBQyxXQUEyQixFQUNsRCxhQUErQixFQUFFLGVBQW1DO1FBQ3BFLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZbkYsb0RBQW9COzs7Ozs7Ozs7Y0FBQyxHQUFlLEVBQUUsTUFBb0I7UUFDN0QsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXBELHFEQUFxQjs7Ozs7Ozs7O2NBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBekcvRCxVQUFVOzs7O2dCQXJCRixZQUFZO2dCQUhBLE1BQU07O2dDQUEzQjs7U0F5QmEscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7O0FBc0hsQyxNQUFNLHVDQUF1QyxTQUF1QixFQUFFLElBQVk7SUFDOUUsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3JEOzs7Ozs7O0FBUUQsTUFBTTtJQUNGLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksc0JBQXNCLEVBQUUsRUFBRSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztDQUNqRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZUZhY3RvcnkgfSBmcm9tICcuLi9tYXBzZXJ2aWNlZmFjdG9yeSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwQVBJTG9hZGVyLCBXaW5kb3dSZWYsIERvY3VtZW50UmVmIH0gZnJvbSAnLi4vbWFwYXBpbG9hZGVyJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94U2VydmljZSB9IGZyb20gJy4uL2luZm9ib3guc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ01hcEFQSUxvYWRlciwgQmluZ01hcEFQSUxvYWRlckNvbmZpZyB9IGZyb20gJy4vYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdJbmZvQm94U2VydmljZSB9IGZyb20gJy4vYmluZy1pbmZvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ01hcmtlclNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0xheWVyU2VydmljZSB9IGZyb20gJy4vYmluZy1sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdDbHVzdGVyU2VydmljZSB9IGZyb20gJy4vYmluZy1jbHVzdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ1BvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLXBvbHlnb24uc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLXBvbHlsaW5lLnNlcnZpY2UnO1xuXG4vKipcbiAqIEltcGxlbWVudHMgYSBmYWN0b3J5IHRvIGNyZWF0ZSB0aHJlIG5lY2Vzc2FyeSBCaW5nIE1hcHMgVjggc3BlY2lmaWMgc2VydmljZSBpbnN0YW5jZXMuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ01hcFNlcnZpY2VGYWN0b3J5IGltcGxlbWVudHMgTWFwU2VydmljZUZhY3Rvcnkge1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeS5cbiAgICAgKiBAcGFyYW0gX2xvYWRlciAtIHtAbGluayBNYXBBUElMb2FkZXJ9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgQmluZyBNYXAgVjggcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIG9iamVjdCB0byBpbXBsZW1lbnQgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IE1hcEFQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwU2VydmljZUZhY3RvcnkgaW1wbGVtZW50YXRpb24uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXAgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlKCk6IE1hcFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmdNYXBTZXJ2aWNlKHRoaXMuX2xvYWRlciwgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgY2x1c3RlciBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdDbHVzdGVyU2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUNsdXN0ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSk6IENsdXN0ZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nQ2x1c3RlclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhoIGluZm8gYm94IHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJbmZvQm94U2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ0luZm9Cb3hTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlKTogSW5mb0JveFNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmdJbmZvQm94U2VydmljZShfbWFwU2VydmljZSwgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbGF5ZXIgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIExheWVyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ0xheWVyU2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUxheWVyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UpOiBMYXllclNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmdMYXllclNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG1hcmtlciBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBjbHVzdGVycyAgLSB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdDbHVzdGVyU2VydmljZX0uXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgTWFya2VyU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcmtlclNlcnZpY2V9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSxcbiAgICAgICAgX2xheWVyU2VydmljZTogQmluZ0xheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlOiBCaW5nQ2x1c3RlclNlcnZpY2UpOiBNYXJrZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nTWFya2VyU2VydmljZShfbWFwU2VydmljZSwgX2xheWVyU2VydmljZSwgX2NsdXN0ZXJTZXJ2aWNlLCB0aGlzLl96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBwb2x5Z29uIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIFBvbHlnb25TZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uU2VydmljZShtYXA6IE1hcFNlcnZpY2UsIGxheWVyczogTGF5ZXJTZXJ2aWNlKTogUG9seWdvblNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmdQb2x5Z29uU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWxpbmUgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoaCB1bmRlcmx5aW5nIG1hcCBhcmNodGljdHVyZS5cbiAgICAgKiBAcGFyYW0gbGF5ZXJzIC0ge0BsaW5rIExheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgUG9seWxpbmVTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZVNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlsaW5lU2VydmljZSB7XG4gICAgICAgIHJldHVybiBuZXcgQmluZ1BvbHlsaW5lU2VydmljZShtYXAsIGxheWVycywgdGhpcy5fem9uZSk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHBsYWZvcm0gc3BlY2lmaWMgTWFwU2VydmljZUZhY3RvcnkuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIGFwaUxvYWRlciAtIEFuIHtAbGluayBNYXBBUElMb2FkZXJ9IGluc3RhbmNlLiBUaGlzIGlzIGV4cGVjdGVkIHRvIHRoZSBhIHtAbGluayBCaW5nTWFwQVBJTG9hZGVyfS5cbiAqIEBwYXJhbSB6b25lIC0gQW4gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAqXG4gKiBAcmV0dXJucyAtICBBIHtAbGluayBNYXBTZXJ2aWNlRmFjdG9yeX0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCaW5nTWFwU2VydmljZUZhY3RvcnlGYWN0b3J5KGFwaUxvYWRlcjogTWFwQVBJTG9hZGVyLCB6b25lOiBOZ1pvbmUpOiBNYXBTZXJ2aWNlRmFjdG9yeSB7XG4gICAgcmV0dXJuIG5ldyBCaW5nTWFwU2VydmljZUZhY3RvcnkoYXBpTG9hZGVyLCB6b25lKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgcGxhZm9ybSBzcGVjaWZpYyBNYXBMb2FkZXJGYWN0b3J5LlxuICpcbiAqIEBleHBvcnRcbiAqIEByZXR1cm5zIC0gQSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJpbmdNYXBMb2FkZXJGYWN0b3J5KCk6IE1hcEFQSUxvYWRlciB7XG4gICAgcmV0dXJuIG5ldyBCaW5nTWFwQVBJTG9hZGVyKG5ldyBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnKCksIG5ldyBXaW5kb3dSZWYoKSwgbmV3IERvY3VtZW50UmVmKCkpO1xufVxuIl19