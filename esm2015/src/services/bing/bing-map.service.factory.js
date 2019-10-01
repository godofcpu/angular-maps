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
export class BingMapServiceFactory {
    /**
     * Creates an instance of BingMapServiceFactory.
     * \@memberof BingMapServiceFactory
     * @param {?} _loader - {\@link MapAPILoader} implementation for the Bing Map V8 provider.
     * @param {?} _zone - NgZone object to implement zone aware promises.
     *
     */
    constructor(_loader, _zone) {
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
    Create() {
        return new BingMapService(this._loader, this._zone);
    }
    /**
     * Creates the cluster service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link ClusterService}. A concreted instance of the {\@link BingClusterService}.
     *
     */
    CreateClusterService(_mapService) {
        return new BingClusterService(_mapService, this._zone);
    }
    /**
     * Creates thh info box service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link InfoBoxService}. A concreted instance of the {\@link BingInfoBoxService}.
     *
     */
    CreateInfoBoxService(_mapService) {
        return new BingInfoBoxService(_mapService, this._zone);
    }
    /**
     * Creates the layer service for the Bing Maps V8 implementation.
     *
     * \@memberof BingMapServiceFactory
     * @param {?} _mapService
     * @return {?} - {\@link LayerService}. A concreted instance of the {\@link BingLayerService}.
     *
     */
    CreateLayerService(_mapService) {
        return new BingLayerService(_mapService, this._zone);
    }
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
    CreateMarkerService(_mapService, _layerService, _clusterService) {
        return new BingMarkerService(_mapService, _layerService, _clusterService, this._zone);
    }
    /**
     * Creates the polygon service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolygonService} implementation for the underlying map architecture.
     *
     */
    CreatePolygonService(map, layers) {
        return new BingPolygonService(map, layers, this._zone);
    }
    /**
     * Creates the polyline service for the Bing Maps V8 implementation.
     *
     * \@memberof MapServiceFactory
     * @param {?} map - {\@link MapService} implementation for thh underlying map archticture.
     * @param {?} layers - {\@link LayerService} implementation for the underlying map architecture.
     * @return {?} - {\@link PolylineService} implementation for the underlying map architecture.
     *
     */
    CreatePolylineService(map, layers) {
        return new BingPolylineService(map, layers, this._zone);
    }
}
BingMapServiceFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapServiceFactory.ctorParameters = () => [
    { type: MapAPILoader },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU92RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQVE5RCxNQUFNOzs7Ozs7OztJQWFGLFlBQW9CLE9BQXFCLEVBQVUsS0FBYTtRQUE1QyxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtLQUFLOzs7Ozs7OztJQWE5RCxNQUFNO1FBQ1QsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV2pELG9CQUFvQixDQUFDLFdBQTJCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXcEQsb0JBQW9CLENBQUMsV0FBMkI7UUFDbkQsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdwRCxrQkFBa0IsQ0FBQyxXQUEyQjtRQUNqRCxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFhbEQsbUJBQW1CLENBQUMsV0FBMkIsRUFDbEQsYUFBK0IsRUFBRSxlQUFtQztRQUNwRSxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWW5GLG9CQUFvQixDQUFDLEdBQWUsRUFBRSxNQUFvQjtRQUM3RCxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFZcEQscUJBQXFCLENBQUMsR0FBZSxFQUFFLE1BQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBekcvRCxVQUFVOzs7O1lBckJGLFlBQVk7WUFIQSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7OztBQStJM0IsTUFBTSx1Q0FBdUMsU0FBdUIsRUFBRSxJQUFZO0lBQzlFLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNyRDs7Ozs7OztBQVFELE1BQU07SUFDRixNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLHNCQUFzQixFQUFFLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7Q0FDakciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi4vbWFwc2VydmljZWZhY3RvcnknO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XG5pbXBvcnQgeyBNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbWFya2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9pbmZvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyU2VydmljZSB9IGZyb20gJy4uL2NsdXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3BvbHlnb24uc2VydmljZSc7XG5pbXBvcnQgeyBQb2x5bGluZVNlcnZpY2UgfSBmcm9tICcuLi9wb2x5bGluZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdNYXBBUElMb2FkZXIsIEJpbmdNYXBBUElMb2FkZXJDb25maWcgfSBmcm9tICcuL2JpbmctbWFwLmFwaS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuL2JpbmctaW5mb2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdNYXJrZXJTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdMYXllclNlcnZpY2UgfSBmcm9tICcuL2JpbmctbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nQ2x1c3RlclNlcnZpY2UgfSBmcm9tICcuL2JpbmctY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdQb2x5Z29uU2VydmljZSB9IGZyb20gJy4vYmluZy1wb2x5Z29uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ1BvbHlsaW5lU2VydmljZSB9IGZyb20gJy4vYmluZy1wb2x5bGluZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIGEgZmFjdG9yeSB0byBjcmVhdGUgdGhyZSBuZWNlc3NhcnkgQmluZyBNYXBzIFY4IHNwZWNpZmljIHNlcnZpY2UgaW5zdGFuY2VzLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeSBpbXBsZW1lbnRzIE1hcFNlcnZpY2VGYWN0b3J5IHtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwU2VydmljZUZhY3RvcnkuXG4gICAgICogQHBhcmFtIF9sb2FkZXIgLSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIEJpbmcgTWFwIFY4IHByb3ZpZGVyLlxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBvYmplY3QgdG8gaW1wbGVtZW50IHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9hZGVyOiBNYXBBUElMb2FkZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcFNlcnZpY2VGYWN0b3J5IGltcGxlbWVudGF0aW9uLlxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbWFwIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZSgpOiBNYXBTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nTWFwU2VydmljZSh0aGlzLl9sb2FkZXIsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGNsdXN0ZXIgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nQ2x1c3RlclNlcnZpY2V9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVDbHVzdGVyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UpOiBDbHVzdGVyU2VydmljZSB7XG4gICAgICAgIHJldHVybiBuZXcgQmluZ0NsdXN0ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlLCB0aGlzLl96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoaCBpbmZvIGJveCBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTWFwU2VydmljZX0uXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdJbmZvQm94U2VydmljZX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcFNlcnZpY2VGYWN0b3J5XG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZUluZm9Cb3hTZXJ2aWNlKF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSk6IEluZm9Cb3hTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nSW5mb0JveFNlcnZpY2UoX21hcFNlcnZpY2UsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGxheWVyIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBMYXllclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBTZXJ2aWNlRmFjdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVMYXllclNlcnZpY2UoX21hcFNlcnZpY2U6IEJpbmdNYXBTZXJ2aWNlKTogTGF5ZXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nTGF5ZXJTZXJ2aWNlKF9tYXBTZXJ2aWNlLCB0aGlzLl96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBtYXJrZXIgc2VydmljZSBmb3IgdGhlIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXAgLSB7QGxpbmsgTWFwU2VydmljZX0uIEEgY29uY3JldGVkIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfS5cbiAgICAgKiBAcGFyYW0gY2x1c3RlcnMgIC0ge0BsaW5rIENsdXN0ZXJTZXJ2aWNlfS4gQSBjb25jcmV0ZWQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBCaW5nQ2x1c3RlclNlcnZpY2V9LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIE1hcmtlclNlcnZpY2V9LiBBIGNvbmNyZXRlZCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEJpbmdNYXJrZXJTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyU2VydmljZShfbWFwU2VydmljZTogQmluZ01hcFNlcnZpY2UsXG4gICAgICAgIF9sYXllclNlcnZpY2U6IEJpbmdMYXllclNlcnZpY2UsIF9jbHVzdGVyU2VydmljZTogQmluZ0NsdXN0ZXJTZXJ2aWNlKTogTWFya2VyU2VydmljZSB7XG4gICAgICAgIHJldHVybiBuZXcgQmluZ01hcmtlclNlcnZpY2UoX21hcFNlcnZpY2UsIF9sYXllclNlcnZpY2UsIF9jbHVzdGVyU2VydmljZSwgdGhpcy5fem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgcG9seWdvbiBzZXJ2aWNlIGZvciB0aGUgQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhoIHVuZGVybHlpbmcgbWFwIGFyY2h0aWN0dXJlLlxuICAgICAqIEBwYXJhbSBsYXllcnMgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHVuZGVybHlpbmcgbWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBQb2x5Z29uU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvblNlcnZpY2UobWFwOiBNYXBTZXJ2aWNlLCBsYXllcnM6IExheWVyU2VydmljZSk6IFBvbHlnb25TZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaW5nUG9seWdvblNlcnZpY2UobWFwLCBsYXllcnMsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHBvbHlsaW5lIHNlcnZpY2UgZm9yIHRoZSBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGggdW5kZXJseWluZyBtYXAgYXJjaHRpY3R1cmUuXG4gICAgICogQHBhcmFtIGxheWVycyAtIHtAbGluayBMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGZvciB0aGUgdW5kZXJseWluZyBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIFBvbHlsaW5lU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHRoZSB1bmRlcmx5aW5nIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwU2VydmljZUZhY3RvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVTZXJ2aWNlKG1hcDogTWFwU2VydmljZSwgbGF5ZXJzOiBMYXllclNlcnZpY2UpOiBQb2x5bGluZVNlcnZpY2Uge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmdQb2x5bGluZVNlcnZpY2UobWFwLCBsYXllcnMsIHRoaXMuX3pvbmUpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBwbGFmb3JtIHNwZWNpZmljIE1hcFNlcnZpY2VGYWN0b3J5LlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBhcGlMb2FkZXIgLSBBbiB7QGxpbmsgTWFwQVBJTG9hZGVyfSBpbnN0YW5jZS4gVGhpcyBpcyBleHBlY3RlZCB0byB0aGUgYSB7QGxpbmsgQmluZ01hcEFQSUxvYWRlcn0uXG4gKiBAcGFyYW0gem9uZSAtIEFuIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gKlxuICogQHJldHVybnMgLSAgQSB7QGxpbmsgTWFwU2VydmljZUZhY3Rvcnl9IGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQmluZ01hcFNlcnZpY2VGYWN0b3J5RmFjdG9yeShhcGlMb2FkZXI6IE1hcEFQSUxvYWRlciwgem9uZTogTmdab25lKTogTWFwU2VydmljZUZhY3Rvcnkge1xuICAgIHJldHVybiBuZXcgQmluZ01hcFNlcnZpY2VGYWN0b3J5KGFwaUxvYWRlciwgem9uZSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHBsYWZvcm0gc3BlY2lmaWMgTWFwTG9hZGVyRmFjdG9yeS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcmV0dXJucyAtIEEge0BsaW5rIE1hcEFQSUxvYWRlcn0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCaW5nTWFwTG9hZGVyRmFjdG9yeSgpOiBNYXBBUElMb2FkZXIge1xuICAgIHJldHVybiBuZXcgQmluZ01hcEFQSUxvYWRlcihuZXcgQmluZ01hcEFQSUxvYWRlckNvbmZpZygpLCBuZXcgV2luZG93UmVmKCksIG5ldyBEb2N1bWVudFJlZigpKTtcbn1cbiJdfQ==