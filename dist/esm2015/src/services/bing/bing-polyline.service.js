/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Bing Maps V8.
 *
 * @export
 */
export class BingPolylineService {
    /**
     * Creates an instance of BingPolylineService.
     * \@memberof BingPolylineService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link BingMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link BingLayerService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polylines = new Map();
    }
    /**
     * Adds a polyline to a map. Depending on the polyline context, the polyline will either by added to the map or a
     * corresponding layer.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} to be added.
     *
     * @return {?}
     */
    AddPolyline(polyline) {
        /** @type {?} */
        const o = {
            id: polyline.Id,
            clickable: polyline.Clickable,
            draggable: polyline.Draggable,
            editable: polyline.Editable,
            geodesic: polyline.Geodesic,
            path: polyline.Path,
            showTooltip: polyline.ShowTooltip,
            strokeColor: polyline.StrokeColor,
            strokeOpacity: polyline.StrokeOpacity,
            strokeWeight: polyline.StrokeWeight,
            title: polyline.Title,
            visible: polyline.Visible,
            zIndex: polyline.zIndex,
        };
        /** @type {?} */
        let polylinePromise;
        if (polyline.InCustomLayer) {
            polylinePromise = this._layerService.CreatePolyline(polyline.LayerId, o);
        }
        else {
            polylinePromise = this._mapService.CreatePolyline(o);
        }
        this._polylines.set(polyline, polylinePromise);
    }
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof BingPolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polyline) {
        /** @type {?} */
        const b = new Subject();
        if (eventName === 'mousemove') {
            return b.asObservable();
        }
        if (eventName === 'rightclick') {
            return b.asObservable();
        }
        return Observable.create((observer) => {
            this._polylines.get(polyline).then(p => {
                /** @type {?} */
                const x = Array.isArray(p) ? p : [p];
                x.forEach(line => line.AddListener(eventName, (e) => this._zone.run(() => observer.next(e))));
            });
        });
    }
    /**
     * Deletes a polyline.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polyline has been deleted.
     *
     */
    DeletePolyline(polyline) {
        /** @type {?} */
        const m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                /** @type {?} */
                const x = Array.isArray(l) ? l : [l];
                x.forEach(line => line.Delete());
                this._polylines.delete(polyline);
            });
        });
    }
    /**
     * Obtains geo coordinates for the marker on the click location
     *
     * @abstract
     * \@memberof BingPolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.location) {
            return null;
        }
        return { latitude: e.location.latitude, longitude: e.location.longitude };
    }
    /**
     * Obtains the marker model for the marker allowing access to native implementation functionatiliy.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to obtain the polyline model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polyline}
     * implementation of the underlying platform. For complex paths, returns an array of polylines.
     *
     */
    GetNativePolyline(polyline) {
        return this._polylines.get(polyline);
    }
    /**
     * Set the polyline options.
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @param {?} options - {\@link IPolylineOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polyline options have been set.
     *
     */
    SetOptions(polyline, options) {
        return this._polylines.get(polyline).then(l => {
            /** @type {?} */
            const x = Array.isArray(l) ? l : [l];
            x.forEach(line => line.SetOptions(options));
        });
    }
    /**
     * Updates the Polyline path
     *
     * \@memberof BingPolylineService
     * @param {?} polyline - {\@link MapPolylineDirective} to be updated.
     * @return {?} - A promise fullfilled once the polyline has been updated.
     *
     */
    UpdatePolyline(polyline) {
        /** @type {?} */
        const m = this._polylines.get(polyline);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(l => this._zone.run(() => {
            /** @type {?} */
            const x = Array.isArray(l) ? l : [l];
            /** @type {?} */
            const p = polyline.Path.length > 0 && Array.isArray(polyline.Path[0]) ? /** @type {?} */ (polyline.Path) : /** @type {?} */ ([polyline.Path]);
            x.forEach((line, index) => {
                if (p.length > index) {
                    line.SetPath(p[index]);
                }
            });
            if (Array.isArray(l) && l.length > p.length) {
                l.splice(p.length - 1).forEach(line => line.Delete());
            }
        }));
    }
}
BingPolylineService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingPolylineService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    BingPolylineService.prototype._polylines;
    /** @type {?} */
    BingPolylineService.prototype._mapService;
    /** @type {?} */
    BingPolylineService.prototype._layerService;
    /** @type {?} */
    BingPolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU1yRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFRaEQsTUFBTTs7Ozs7Ozs7OztJQXFCRixZQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7MEJBakJqQixJQUFJLEdBQUcsRUFBMkQ7S0FrQmpFOzs7Ozs7Ozs7O0lBY00sV0FBVyxDQUFDLFFBQThCOztRQUM3QyxNQUFNLENBQUMsR0FBcUI7WUFDeEIsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO1lBQ2pDLGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYTtZQUNyQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVk7WUFDbkMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1lB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cmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBNYXBQb2x5bGluZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5bGluZSBTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBCaW5nIE1hcHMgVjguXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlsaW5lU2VydmljZSBpbXBsZW1lbnRzIFBvbHlsaW5lU2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfcG9seWxpbmVzOiBNYXA8TWFwUG9seWxpbmVEaXJlY3RpdmUsIFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPVxuICAgIG5ldyBNYXA8TWFwUG9seWxpbmVEaXJlY3RpdmUsIFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4oKTtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nUG9seWxpbmVTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIHtAbGluayBNYXBTZXJ2aWNlfSBpbnN0YW5jZS4gVGhlIGNvbmNyZXRlIHtAbGluayBCaW5nTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEJpbmdMYXllclNlcnZpY2V9IGltcGxlbWVudGF0aW9uIGlzIGV4cGVjdGVkLlxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBzdXBwb3J0IHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1lbWJlcnMgYW5kIE1hcmtlclNlcnZpY2UgaW1wbGVtZW50YXRpb25cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5bGluZSB0byBhIG1hcC4gRGVwZW5kaW5nIG9uIHRoZSBwb2x5bGluZSBjb250ZXh0LCB0aGUgcG9seWxpbmUgd2lsbCBlaXRoZXIgYnkgYWRkZWQgdG8gdGhlIG1hcCBvciBhXG4gICAgICogY29ycmVzcG9uZGluZyBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IElQb2x5bGluZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogcG9seWxpbmUuSWQsXG4gICAgICAgICAgICBjbGlja2FibGU6IHBvbHlsaW5lLkNsaWNrYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWxpbmUuRHJhZ2dhYmxlLFxuICAgICAgICAgICAgZWRpdGFibGU6IHBvbHlsaW5lLkVkaXRhYmxlLFxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBvbHlsaW5lLkdlb2Rlc2ljLFxuICAgICAgICAgICAgcGF0aDogcG9seWxpbmUuUGF0aCxcbiAgICAgICAgICAgIHNob3dUb29sdGlwOiBwb2x5bGluZS5TaG93VG9vbHRpcCxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5bGluZS5TdHJva2VDb2xvcixcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBvbHlsaW5lLlN0cm9rZU9wYWNpdHksXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IHBvbHlsaW5lLlN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5bGluZS5UaXRsZSxcbiAgICAgICAgICAgIHZpc2libGU6IHBvbHlsaW5lLlZpc2libGUsXG4gICAgICAgICAgICB6SW5kZXg6IHBvbHlsaW5lLnpJbmRleCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHBvbHlsaW5lUHJvbWlzZTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+O1xuICAgICAgICBpZiAocG9seWxpbmUuSW5DdXN0b21MYXllcikge1xuICAgICAgICAgICAgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlLkNyZWF0ZVBvbHlsaW5lKHBvbHlsaW5lLkxheWVySWQsIG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5bGluZShvKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb2x5bGluZXMuc2V0KHBvbHlsaW5lLCBwb2x5bGluZVByb21pc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGEgbGluZS5cbiAgICAgICpcbiAgICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxuICAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSBUaGUge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAgKlxuICAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxuICAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgY29uc3QgYjogU3ViamVjdDxUPiA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgICAgIGlmIChldmVudE5hbWUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5hc09ic2VydmFibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncmlnaHRjbGljaycpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vL1xuICAgICAgICAvLy8gbW91c2Vtb3ZlIGFuZCByaWdodGNsaWNrIGFyZSBub3Qgc3VwcG9ydGVkIGJ5IGJpbmcgcG9seWdvbnMuXG4gICAgICAgIC8vL1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSkudGhlbihwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB4OiBBcnJheTxQb2x5bGluZT4gPSBBcnJheS5pc0FycmF5KHApID8gcCA6IFtwXTtcbiAgICAgICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIERlbGV0ZXMgYSBwb2x5bGluZS5cbiAgICAgICpcbiAgICAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSBkZWxldGVkLlxuICAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIGRlbGV0ZWQuXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXG4gICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWxpbmUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XG4gICAgICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gIGxpbmUuRGVsZXRlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lcy5kZWxldGUocG9seWxpbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgb24gdGhlIGNsaWNrIGxvY2F0aW9uXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZSAtIFRoZSBtb3VzZSBldmVudC5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncyk6IElMYXRMb25nIHtcbiAgICAgICAgaWYgKCFlKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIGlmICghZS5sb2NhdGlvbikgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sb2NhdGlvbi5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBlLmxvY2F0aW9uLmxvbmdpdHVkZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgdGhlIG1hcmtlciBtb2RlbCBmb3IgdGhlIG1hcmtlciBhbGxvd2luZyBhY2Nlc3MgdG8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uYXRpbGl5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBvbHlsaW5lIC0gVGhlIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIG9idGFpbiB0aGUgcG9seWxpbmUgbW9kZWwuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBQb2x5bGluZX1cbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgdW5kZXJseWluZyBwbGF0Zm9ybS4gRm9yIGNvbXBsZXggcGF0aHMsIHJldHVybnMgYW4gYXJyYXkgb2YgcG9seWxpbmVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TmF0aXZlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcG9seWxpbmUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxuICAgICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRPcHRpb25zKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSkudGhlbihsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xuICAgICAgICAgICAgeC5mb3JFYWNoKGxpbmUgPT4gbGluZS5TZXRPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgUG9seWxpbmUgcGF0aFxuICAgICAqXG4gICAgICogQHBhcmFtIHBvbHlsaW5lIC0ge0BsaW5rIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSB0byBiZSB1cGRhdGVkLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFVwZGF0ZVBvbHlsaW5lKHBvbHlsaW5lOiBNYXBQb2x5bGluZURpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChwb2x5bGluZSk7XG4gICAgICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS50aGVuKGwgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XG4gICAgICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID1cbiAgICAgICAgICAgICAgICBwb2x5bGluZS5QYXRoLmxlbmd0aCA+IDAgJiYgQXJyYXkuaXNBcnJheShwb2x5bGluZS5QYXRoWzBdKSA/IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBvbHlsaW5lLlBhdGggOlxuICAgICAgICAgICAgICAgIDxBcnJheTxBcnJheTxJTGF0TG9uZz4+Pltwb2x5bGluZS5QYXRoXTtcbiAgICAgICAgICAgICB4LmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChwLmxlbmd0aCA+IGluZGV4KSB7IGxpbmUuU2V0UGF0aChwW2luZGV4XSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobCkgJiYgbC5sZW5ndGggPiBwLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGwuc3BsaWNlKHAubGVuZ3RoIC0gMSkuZm9yRWFjaChsaW5lID0+IGxpbmUuRGVsZXRlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxufVxuIl19