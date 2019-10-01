/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapMarkerDirective } from '../../components/map-marker';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
import { ClusterService } from '../cluster.service';
import { GoogleConversions } from './google-conversions';
/**
 * Concrete implementation of the MarkerService abstract class for Google.
 *
 * @export
 */
export class GoogleMarkerService {
    /**
     * Creates an instance of GoogleMarkerService.
     * \@memberof GoogleMarkerService
     * @param {?} _mapService - {\@link MapService} instance.
     * The concrete {\@link GoogleMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link GoogleLayerService} implementation is expected.
     * @param {?} _clusterService - {\@link ClusterService} instance.
     * The concrete {\@link GoogleClusterService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _clusterService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._clusterService = _clusterService;
        this._zone = _zone;
        this._markers = new Map();
    }
    /**
     * Adds a marker. Depending on the marker context, the marker will either by added to the map or a correcsponding layer.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} to be added.
     * @return {?}
     */
    AddMarker(marker) {
        /** @type {?} */
        const o = {
            anchor: marker.Anchor,
            position: { latitude: marker.Latitude, longitude: marker.Longitude },
            title: marker.Title,
            label: marker.Label,
            draggable: marker.Draggable,
            icon: marker.IconUrl,
            iconInfo: marker.IconInfo,
            width: marker.Width,
            height: marker.Height,
            isFirst: marker.IsFirstInSet,
            isLast: marker.IsLastInSet
        };
        /** @type {?} */
        let markerPromise = null;
        if (marker.InClusterLayer) {
            markerPromise = this._clusterService.CreateMarker(marker.LayerId, o);
        }
        else if (marker.InCustomLayer) {
            markerPromise = this._layerService.CreateMarker(marker.LayerId, o);
        }
        else {
            markerPromise = this._mapService.CreateMarker(o);
        }
        this._markers.set(marker, markerPromise);
        if (marker.IconInfo) {
            markerPromise.then((m) => {
                // update iconInfo to provide hook to do post icon creation activities and
                // also re-anchor the marker
                marker.DynamicMarkerCreated.emit(o.iconInfo);
                /** @type {?} */
                const p = {
                    x: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.width * o.iconInfo.markerOffsetRatio.x) : 0,
                    y: (o.iconInfo.size && o.iconInfo.markerOffsetRatio) ? (o.iconInfo.size.height * o.iconInfo.markerOffsetRatio.y) : 0,
                };
                m.SetAnchor(p);
            });
        }
    }
    /**
     * Registers an event delegate for a marker.
     *
     * \@memberof GoogleMarkerService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} marker - The {\@link MapMarkerDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     */
    CreateEventObservable(eventName, marker) {
        return Observable.create((observer) => {
            this._markers.get(marker).then((m) => {
                m.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - {\@link MapMarkerDirective} to be deleted.
     * @return {?} - A promise fullfilled once the marker has been deleted.
     */
    DeleteMarker(marker) {
        /** @type {?} */
        const m = this._markers.get(marker);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((ma) => {
            if (marker.InClusterLayer) {
                this._clusterService.GetNativeLayer(marker.LayerId).then(l => { l.RemoveEntity(ma); });
            }
            if (marker.InCustomLayer) {
                this._layerService.GetNativeLayer(marker.LayerId).then(l => { l.RemoveEntity(ma); });
            }
            return this._zone.run(() => {
                ma.DeleteMarker();
                this._markers.delete(marker);
            });
        });
    }
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    }
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker - The {\@link MapMarkerDirective} for which to obtain the marker model.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} implementation of the underlying platform.
     */
    GetNativeMarker(marker) {
        return this._markers.get(marker);
    }
    /**
     * Obtains the marker pixel location for the marker on the click location
     *
     * \@memberof GoogleMarkerService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the pixels of the marker on the map canvas.
     */
    GetPixelsFromClick(e) {
        if (!e || !e.latLng || !e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        if (this._mapService.MapInstance == null) {
            return null;
        }
        /** @type {?} */
        let crossesDateLine = false;
        /** @type {?} */
        const m = this._mapService.MapInstance;
        /** @type {?} */
        const p = m.getProjection();
        /** @type {?} */
        const s = Math.pow(2, m.getZoom());
        /** @type {?} */
        const b = m.getBounds();
        if (b.getCenter().lng() < b.getSouthWest().lng() ||
            b.getCenter().lng() > b.getNorthEast().lng()) {
            crossesDateLine = true;
        }
        /** @type {?} */
        const offsetY = p.fromLatLngToPoint(b.getNorthEast()).y;
        /** @type {?} */
        const offsetX = p.fromLatLngToPoint(b.getSouthWest()).x;
        /** @type {?} */
        const point = p.fromLatLngToPoint(e.latLng);
        return {
            x: Math.floor((point.x - offsetX + ((crossesDateLine && point.x < offsetX) ? 256 : 0)) * s),
            y: Math.floor((point.y - offsetY) * s)
        };
    }
    /**
     * Converts a geo location to a pixel location relative to the map canvas.
     *
     * \@memberof GoogleMarkerService
     * @param {?} target - Either a {\@link MapMarkerDirective}
     * or a {\@link ILatLong} for the basis of translation.
     * @return {?} - A promise that when fullfilled contains a {\@link IPoint}
     * with the pixel coordinates of the MapMarker or ILatLong relative to the map canvas.
     */
    LocationToPoint(target) {
        if (target == null) {
            return Promise.resolve(null);
        }
        if (target instanceof MapMarkerDirective) {
            return this._markers.get(target).then((m) => {
                /** @type {?} */
                const l = m.Location;
                /** @type {?} */
                const p = this._mapService.LocationToPoint(l);
                return p;
            });
        }
        return this._mapService.LocationToPoint(target);
    }
    /**
     * Updates the anchor position for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the anchor position has been updated.
     */
    UpdateAnchor(marker) {
        return this._markers.get(marker).then((m) => {
            m.SetAnchor(marker.Anchor);
        });
    }
    /**
     * Updates whether the marker is draggable.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the marker has been updated.
     */
    UpdateDraggable(marker) {
        return this._markers.get(marker).then((m) => m.SetDraggable(marker.Draggable));
    }
    /**
     * Updates the Icon on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the icon information has been updated.
     */
    UpdateIcon(marker) {
        return this._markers.get(marker).then((m) => {
            if (marker.IconInfo) {
                /** @type {?} */
                const x = {
                    position: { latitude: marker.Latitude, longitude: marker.Longitude },
                    iconInfo: marker.IconInfo
                };
                /** @type {?} */
                const o = GoogleConversions.TranslateMarkerOptions(x);
                m.SetIcon(o.icon);
                marker.DynamicMarkerCreated.emit(x.iconInfo);
            }
            else {
                m.SetIcon(marker.IconUrl);
            }
        });
    }
    /**
     * Updates the label on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the label has been updated.
     */
    UpdateLabel(marker) {
        return this._markers.get(marker).then((m) => { m.SetLabel(marker.Label); });
    }
    /**
     * Updates the geo coordinates for the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the position has been updated.
     */
    UpdateMarkerPosition(marker) {
        return this._markers.get(marker).then((m) => m.SetPosition({
            latitude: marker.Latitude,
            longitude: marker.Longitude
        }));
    }
    /**
     * Updates the title on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    UpdateTitle(marker) {
        return this._markers.get(marker).then((m) => m.SetTitle(marker.Title));
    }
    /**
     * Updates the visibility on the marker.
     *
     * \@memberof GoogleMarkerService
     * @param {?} marker
     * @return {?} - A promise that is fullfilled when the title has been updated.
     */
    UpdateVisible(marker) {
        return this._markers.get(marker).then((m) => m.SetVisible(marker.Visible));
    }
}
GoogleMarkerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMarkerService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: ClusterService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GoogleMarkerService.prototype._markers;
    /** @type {?} */
    GoogleMarkerService.prototype._mapService;
    /** @type {?} */
    GoogleMarkerService.prototype._layerService;
    /** @type {?} */
    GoogleMarkerService.prototype._clusterService;
    /** @type {?} */
    GoogleMarkerService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBbUIsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFRekQsTUFBTTs7Ozs7Ozs7Ozs7OztJQXVCRixZQUFvQixXQUF1QixFQUMvQixlQUNBLGlCQUNBO1FBSFEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2Isb0JBQWUsR0FBZixlQUFlO1FBQ2YsVUFBSyxHQUFMLEtBQUs7d0JBckI0QyxJQUFJLEdBQUcsRUFBdUM7S0FzQjFHOzs7Ozs7OztJQVFNLFNBQVMsQ0FBQyxNQUEwQjs7UUFDdkMsTUFBTSxDQUFDLEdBQW1CO1lBQ3RCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNwRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFNBQVMsRUFB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QUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVzVFLGFBQWEsQ0FBQyxNQUEwQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7O1lBbFQxRixVQUFVOzs7O1lBWEYsVUFBVTtZQUNWLFlBQVk7WUFDWixjQUFjO1lBVkYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBNYXBNYXJrZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1tYXJrZXInO1xuaW1wb3J0IHsgTWFya2VyU2VydmljZSB9IGZyb20gJy4uL21hcmtlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2x1c3Rlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBNYXJrZXJTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBHb29nbGUuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFya2VyU2VydmljZSBpbXBsZW1lbnRzIE1hcmtlclNlcnZpY2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX21hcmtlcnM6IE1hcDxNYXBNYXJrZXJEaXJlY3RpdmUsIFByb21pc2U8TWFya2VyPj4gPSBuZXcgTWFwPE1hcE1hcmtlckRpcmVjdGl2ZSwgUHJvbWlzZTxNYXJrZXI+PigpO1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZU1hcmtlclNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0ge0BsaW5rIE1hcFNlcnZpY2V9IGluc3RhbmNlLlxuICAgICAqIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF9jbHVzdGVyU2VydmljZSAtIHtAbGluayBDbHVzdGVyU2VydmljZX0gaW5zdGFuY2UuXG4gICAgICogVGhlIGNvbmNyZXRlIHtAbGluayBHb29nbGVDbHVzdGVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NsdXN0ZXJTZXJ2aWNlOiBDbHVzdGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG1hcmtlci4gRGVwZW5kaW5nIG9uIHRoZSBtYXJrZXIgY29udGV4dCwgdGhlIG1hcmtlciB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGEgY29ycmVjc3BvbmRpbmcgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEFkZE1hcmtlcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBJTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogbWFya2VyLkFuY2hvcixcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IGxhdGl0dWRlOiBtYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogbWFya2VyLkxvbmdpdHVkZSB9LFxuICAgICAgICAgICAgdGl0bGU6IG1hcmtlci5UaXRsZSxcbiAgICAgICAgICAgIGxhYmVsOiBtYXJrZXIuTGFiZWwsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IG1hcmtlci5EcmFnZ2FibGUsXG4gICAgICAgICAgICBpY29uOiBtYXJrZXIuSWNvblVybCxcbiAgICAgICAgICAgIGljb25JbmZvOiBtYXJrZXIuSWNvbkluZm8sXG4gICAgICAgICAgICB3aWR0aDogbWFya2VyLldpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBtYXJrZXIuSGVpZ2h0LFxuICAgICAgICAgICAgaXNGaXJzdDogbWFya2VyLklzRmlyc3RJblNldCxcbiAgICAgICAgICAgIGlzTGFzdDogbWFya2VyLklzTGFzdEluU2V0XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY3JlYXRlIG1hcmtlciB2aWEgcHJvbWlzZS5cbiAgICAgICAgbGV0IG1hcmtlclByb21pc2U6IFByb21pc2U8TWFya2VyPiA9IG51bGw7XG4gICAgICAgIGlmIChtYXJrZXIuSW5DbHVzdGVyTGF5ZXIpIHtcbiAgICAgICAgICAgIG1hcmtlclByb21pc2UgPSB0aGlzLl9jbHVzdGVyU2VydmljZS5DcmVhdGVNYXJrZXIobWFya2VyLkxheWVySWQsIG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hcmtlci5JbkN1c3RvbUxheWVyKSB7XG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZU1hcmtlcihtYXJrZXIuTGF5ZXJJZCwgbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVNYXJrZXIobyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYXJrZXJzLnNldChtYXJrZXIsIG1hcmtlclByb21pc2UpO1xuICAgICAgICBpZiAobWFya2VyLkljb25JbmZvKSB7XG4gICAgICAgICAgICBtYXJrZXJQcm9taXNlLnRoZW4oKG06IE1hcmtlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpY29uSW5mbyB0byBwcm92aWRlIGhvb2sgdG8gZG8gcG9zdCBpY29uIGNyZWF0aW9uIGFjdGl2aXRpZXMgYW5kXG4gICAgICAgICAgICAgICAgLy8gYWxzbyByZS1hbmNob3IgdGhlIG1hcmtlclxuICAgICAgICAgICAgICAgIG1hcmtlci5EeW5hbWljTWFya2VyQ3JlYXRlZC5lbWl0KG8uaWNvbkluZm8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IElQb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogKG8uaWNvbkluZm8uc2l6ZSAmJiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChvLmljb25JbmZvLnNpemUud2lkdGggKiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvLngpIDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogKG8uaWNvbkluZm8uc2l6ZSAmJiBvLmljb25JbmZvLm1hcmtlck9mZnNldFJhdGlvKSA/IChvLmljb25JbmZvLnNpemUuaGVpZ2h0ICogby5pY29uSW5mby5tYXJrZXJPZmZzZXRSYXRpby55KSA6IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtLlNldEFuY2hvcihwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGRlbGVnYXRlIGZvciBhIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVnaXN0ZXIgKGUuZy4gJ2NsaWNrJylcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xuICAgICAgICAgICAgICAgIG0uQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0ge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gdG8gYmUgZGVsZXRlZC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIG1hcmtlciBoYXMgYmVlbiBkZWxldGVkLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZU1hcmtlcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oKG1hOiBNYXJrZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DbHVzdGVyTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbHVzdGVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXJrZXIuSW5DdXN0b21MYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihtYXJrZXIuTGF5ZXJJZCkudGhlbihsID0+IHsgbC5SZW1vdmVFbnRpdHkobWEpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWEuRGVsZXRlTWFya2VyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5kZWxldGUobWFya2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIGdlbyBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBvbiB0aGUgY2xpY2sgbG9jYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlLmxhdExuZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlLmxhdExuZy5sYXQgfHwgIWUubGF0TG5nLmxuZykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbGF0aXR1ZGU6IGUubGF0TG5nLmxhdCgpLCBsb25naXR1ZGU6IGUubGF0TG5nLmxuZygpIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIG1vZGVsIGZvciB0aGUgbWFya2VyIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFya2VyIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIG1hcmtlciBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TmF0aXZlTWFya2VyKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyB0aGUgbWFya2VyIHBpeGVsIGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIG9uIHRoZSBjbGljayBsb2NhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIHBpeGVscyBvZiB0aGUgbWFya2VyIG9uIHRoZSBtYXAgY2FudmFzLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldFBpeGVsc0Zyb21DbGljayhlOiBNb3VzZUV2ZW50IHwgYW55KTogSVBvaW50IHtcbiAgICAgICAgaWYgKCFlIHx8ICFlLmxhdExuZyB8fCAhZS5sYXRMbmcubGF0IHx8ICFlLmxhdExuZy5sbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNyb3NzZXNEYXRlTGluZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgcCA9IG0uZ2V0UHJvamVjdGlvbigpO1xuICAgICAgICBjb25zdCBzOiBudW1iZXIgPSBNYXRoLnBvdygyLCBtLmdldFpvb20oKSk7XG4gICAgICAgIGNvbnN0IGI6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kcyA9IG0uZ2V0Qm91bmRzKCk7XG4gICAgICAgIGlmIChiLmdldENlbnRlcigpLmxuZygpIDwgYi5nZXRTb3V0aFdlc3QoKS5sbmcoKSAgfHxcbiAgICAgICAgICAgIGIuZ2V0Q2VudGVyKCkubG5nKCkgPiBiLmdldE5vcnRoRWFzdCgpLmxuZygpKSB7IGNyb3NzZXNEYXRlTGluZSA9IHRydWU7IH1cblxuICAgICAgICBjb25zdCBvZmZzZXRZOiBudW1iZXIgPSBwLmZyb21MYXRMbmdUb1BvaW50KGIuZ2V0Tm9ydGhFYXN0KCkpLnk7XG4gICAgICAgIGNvbnN0IG9mZnNldFg6IG51bWJlciA9IHAuZnJvbUxhdExuZ1RvUG9pbnQoYi5nZXRTb3V0aFdlc3QoKSkueDtcbiAgICAgICAgY29uc3QgcG9pbnQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gcC5mcm9tTGF0TG5nVG9Qb2ludChlLmxhdExuZyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBNYXRoLmZsb29yKChwb2ludC54IC0gb2Zmc2V0WCArICgoY3Jvc3Nlc0RhdGVMaW5lICYmIHBvaW50LnggPCBvZmZzZXRYKSA/IDI1NiA6IDApKSAqIHMpLFxuICAgICAgICAgICAgeTogTWF0aC5mbG9vcigocG9pbnQueSAtIG9mZnNldFkpICogcylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGdlbyBsb2NhdGlvbiB0byBhIHBpeGVsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBtYXAgY2FudmFzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCAtIEVpdGhlciBhIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9XG4gICAgICogb3IgYSB7QGxpbmsgSUxhdExvbmd9IGZvciB0aGUgYmFzaXMgb2YgdHJhbnNsYXRpb24uXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYSB7QGxpbmsgSVBvaW50fVxuICAgICAqIHdpdGggdGhlIHBpeGVsIGNvb3JkaW5hdGVzIG9mIHRoZSBNYXBNYXJrZXIgb3IgSUxhdExvbmcgcmVsYXRpdmUgdG8gdGhlIG1hcCBjYW52YXMuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BvaW50KHRhcmdldDogTWFwTWFya2VyRGlyZWN0aXZlIHwgSUxhdExvbmcpOiBQcm9taXNlPElQb2ludD4ge1xuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1hcE1hcmtlckRpcmVjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KHRhcmdldCkudGhlbigobTogTWFya2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSBtLkxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IFByb21pc2U8SVBvaW50PiA9IHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KHRhcmdldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgYW5jaG9yIHBvc2l0aW9uIGZvciB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIGFuY2hvci5cbiAgICAgKiBBbmNob3IgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGFuY2hvciBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFVwZGF0ZUFuY2hvcihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHtcbiAgICAgICAgICAgIG0uU2V0QW5jaG9yKG1hcmtlci5BbmNob3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBkcmFnZ2FibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSBkcmFnYWJpbGl0eS5cbiAgICAgKiBEcmFnYWJpbGl0eSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbWFya2VyIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgVXBkYXRlRHJhZ2dhYmxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5TZXREcmFnZ2FibGUobWFya2VyLkRyYWdnYWJsZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIEljb24gb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBpY29uLiBJY29uIGluZm9ybWF0aW9uIGlzIHByZXNlbnRcbiAgICAgKiBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGljb24gaW5mb3JtYXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBVcGRhdGVJY29uKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcmtlci5JY29uSW5mbykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHg6IElNYXJrZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogeyBsYXRpdHVkZTogbWFya2VyLkxhdGl0dWRlLCBsb25naXR1ZGU6IG1hcmtlci5Mb25naXR1ZGUgfSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbkluZm86IG1hcmtlci5JY29uSW5mb1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMoeCk7XG4gICAgICAgICAgICAgICAgbS5TZXRJY29uKG8uaWNvbik7XG4gICAgICAgICAgICAgICAgbWFya2VyLkR5bmFtaWNNYXJrZXJDcmVhdGVkLmVtaXQoeC5pY29uSW5mbyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG0uU2V0SWNvbihtYXJrZXIuSWNvblVybCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgbGFiZWwgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAtIFRoZSB7QGxpbmsgTWFwTWFya2VyRGlyZWN0aXZlfSBvYmplY3QgZm9yIHdoaWNoIHRvIHVwYXRlIHRoZSBsYWJlbC5cbiAgICAgKiBMYWJlbCBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGFiZWwgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBVcGRhdGVMYWJlbChtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IHsgbS5TZXRMYWJlbChtYXJrZXIuTGFiZWwpOyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgY29vcmRpbmF0ZXMuXG4gICAgICogQ29vcmRpbmF0ZSBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSB1bmRlcmx5aW5nIHtAbGluayBNYXJrZXJ9IG1vZGVsIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgcG9zaXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBVcGRhdGVNYXJrZXJQb3NpdGlvbihtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKFxuICAgICAgICAgICAgKG06IE1hcmtlcikgPT4gbS5TZXRQb3NpdGlvbih7XG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IG1hcmtlci5MYXRpdHVkZSxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IG1hcmtlci5Mb25naXR1ZGVcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB0aXRsZSBvbiB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIC0gVGhlIHtAbGluayBNYXBNYXJrZXJEaXJlY3RpdmV9IG9iamVjdCBmb3Igd2hpY2ggdG8gdXBhdGUgdGhlIHRpdGxlLlxuICAgICAqIFRpdGxlIGluZm9ybWF0aW9uIGlzIHByZXNlbnQgaW4gdGhlIHVuZGVybHlpbmcge0BsaW5rIE1hcmtlcn0gbW9kZWwgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSB0aXRsZSBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFVwZGF0ZVRpdGxlKG1hcmtlcjogTWFwTWFya2VyRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oKG06IE1hcmtlcikgPT4gbS5TZXRUaXRsZShtYXJrZXIuVGl0bGUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2aXNpYmlsaXR5IG9uIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gLSBUaGUge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb2JqZWN0IGZvciB3aGljaCB0byB1cGF0ZSB0aGUgdGl0bGUuXG4gICAgICogVGl0bGUgaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgdW5kZXJseWluZyB7QGxpbmsgTWFya2VyfSBtb2RlbCBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIHRpdGxlIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgVXBkYXRlVmlzaWJsZShtYXJrZXI6IE1hcE1hcmtlckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKChtOiBNYXJrZXIpID0+IG0uU2V0VmlzaWJsZShtYXJrZXIuVmlzaWJsZSkpO1xuICAgIH1cblxufVxuIl19