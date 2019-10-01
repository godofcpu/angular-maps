/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polyline Service abstract class for Google Maps.
 *
 * @export
 */
export class GooglePolylineService {
    /**
     * Creates an instance of GooglePolylineService.
     * \@memberof GooglePolylineService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link GoogleMapService} implementation is expected.
     * @param {?} _layerService - {\@link LayerService} instance.
     * The concrete {\@link GoogleLayerService} implementation is expected.
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
     * correcsponding layer.
     *
     * \@memberof GooglePolylineService
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
        const polylinePromise = this._mapService.CreatePolyline(o);
        this._polylines.set(polyline, polylinePromise);
    }
    /**
     * Registers an event delegate for a line.
     *
     * \@memberof GooglePolylineService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polyline - The {\@link MapPolylineDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polyline) {
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
     * \@memberof GooglePolylineService
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
        return m.then(l => {
            return this._zone.run(() => {
                /** @type {?} */
                const x = Array.isArray(l) ? l : [l];
                x.forEach(line => line.Delete());
                this._polylines.delete(polyline);
            });
        });
    }
    /**
     * Obtains geo coordinates for the line on the click location
     *
     * @abstract
     * \@memberof GooglePolylineService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked line.
     *
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
     * Obtains the polyline model for the line allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolylineService
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
     * \@memberof GooglePolylineService
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
     * \@memberof GooglePolylineService
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
GooglePolylineService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GooglePolylineService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GooglePolylineService.prototype._polylines;
    /** @type {?} */
    GooglePolylineService.prototype._mapService;
    /** @type {?} */
    GooglePolylineService.prototype._layerService;
    /** @type {?} */
    GooglePolylineService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlsaW5lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1wb2x5bGluZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQVFoRCxNQUFNOzs7Ozs7Ozs7O0lBcUJGLFlBQW9CLFdBQXVCLEVBQy9CLGVBQ0E7UUFGUSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUMvQixrQkFBYSxHQUFiLGFBQWE7UUFDYixVQUFLLEdBQUwsS0FBSzswQkFqQmIsSUFBSSxHQUFHLEVBQTJEO0tBaUJ4Qzs7Ozs7Ozs7OztJQWN2QixXQUFXLENBQUMsUUFBOEI7O1FBQzdDLE1BQU0sQ0FBQyxHQUFxQjtZQUN4QixFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDZixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVc7WUFDakMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO1lBQ3JDLFlBQVksRUFBRSxRQUFRLENBQUMsWUFBWTtZQUNuQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDckIs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RUFBQyxDQUFDLG1CQUM3RSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2FBQ3BELENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0osQ0FBQyxDQUFDLENBQUM7Ozs7WUEvS1gsVUFBVTs7OztZQVJGLFVBQVU7WUFDVixZQUFZO1lBUEEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBNYXBQb2x5bGluZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lJztcbmltcG9ydCB7IFBvbHlsaW5lU2VydmljZSB9IGZyb20gJy4uL3BvbHlsaW5lLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb2x5bGluZSBTZXJ2aWNlIGFic3RyYWN0IGNsYXNzIGZvciBHb29nbGUgTWFwcy5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVQb2x5bGluZVNlcnZpY2UgaW1wbGVtZW50cyBQb2x5bGluZVNlcnZpY2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX3BvbHlsaW5lczogTWFwPE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID1cbiAgICAgICAgbmV3IE1hcDxNYXBQb2x5bGluZURpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigpO1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZVBvbHlsaW5lU2VydmljZS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWVtYmVycyBhbmQgTWFya2VyU2VydmljZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIGEgbWFwLiBEZXBlbmRpbmcgb24gdGhlIHBvbHlsaW5lIGNvbnRleHQsIHRoZSBwb2x5bGluZSB3aWxsIGVpdGhlciBieSBhZGRlZCB0byB0aGUgbWFwIG9yIGFcbiAgICAgKiBjb3JyZWNzcG9uZGluZyBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogSVBvbHlsaW5lT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiBwb2x5bGluZS5JZCxcbiAgICAgICAgICAgIGNsaWNrYWJsZTogcG9seWxpbmUuQ2xpY2thYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBwb2x5bGluZS5EcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogcG9seWxpbmUuRWRpdGFibGUsXG4gICAgICAgICAgICBnZW9kZXNpYzogcG9seWxpbmUuR2VvZGVzaWMsXG4gICAgICAgICAgICBwYXRoOiBwb2x5bGluZS5QYXRoLFxuICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IHBvbHlsaW5lLlNob3dUb29sdGlwLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IHBvbHlsaW5lLlN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcG9seWxpbmUuU3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogcG9seWxpbmUuU3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgdGl0bGU6IHBvbHlsaW5lLlRpdGxlLFxuICAgICAgICAgICAgdmlzaWJsZTogcG9seWxpbmUuVmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogcG9seWxpbmUuekluZGV4LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwb2x5bGluZVByb21pc2U6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlUG9seWxpbmUobyk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQocG9seWxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBsaW5lLlxuICAgICAgKlxuICAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXG4gICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgZXZlbnQuXG4gICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICAqXG4gICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcbiAgICAgICovXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKHAgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkocCkgPyBwIDogW3BdO1xuICAgICAgICAgICAgICAgIHguZm9yRWFjaChsaW5lID0+IGxpbmUuQWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgICogRGVsZXRlcyBhIHBvbHlsaW5lLlxuICAgICAgKlxuICAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXG4gICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWxpbmUgaGFzIGJlZW4gZGVsZXRlZC5cbiAgICAgICpcbiAgICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxuICAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4obCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xuICAgICAgICAgICAgICAgIHguZm9yRWFjaChsaW5lID0+ICBsaW5lLkRlbGV0ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMuZGVsZXRlKHBvbHlsaW5lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgbGluZSBvbiB0aGUgY2xpY2sgbG9jYXRpb25cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTW91c2VFdmVudCB8IGFueSk6IElMYXRMb25nIHtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWUubGF0TG5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWUubGF0TG5nLmxhdCB8fCAhZS5sYXRMbmcubG5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sYXRMbmcubGF0KCksIGxvbmdpdHVkZTogZS5sYXRMbmcubG5nKCkgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIHRoZSBwb2x5bGluZSBtb2RlbCBmb3IgdGhlIGxpbmUgYWxsb3dpbmcgYWNjZXNzIHRvIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbmF0aWxpeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIFRoZSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IGZvciB3aGljaCB0byBvYnRhaW4gdGhlIHBvbHlsaW5lIG1vZGVsLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgUG9seWxpbmV9XG4gICAgICogaW1wbGVtZW50YXRpb24gb2YgdGhlIHVuZGVybHlpbmcgcGxhdGZvcm0uIEZvciBjb21wbGV4IHBhdGhzLCByZXR1cm5zIGFuIGFycmF5IG9mIHBvbHlsaW5lcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5bGluZVNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TmF0aXZlUG9seWxpbmUocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcG9seWxpbmUgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2x5bGluZSAtIHtAbGluayBNYXBQb2x5bGluZURpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gT3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZVxuICAgICAqIG9wdGlvbnMgYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBvcHRpb25zIGhhdmUgYmVlbiBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWxpbmVTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWxpbmU6IE1hcFBvbHlsaW5lRGlyZWN0aXZlLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KHBvbHlsaW5lKS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgY29uc3QgeDogQXJyYXk8UG9seWxpbmU+ID0gQXJyYXkuaXNBcnJheShsKSA/IGwgOiBbbF07XG4gICAgICAgICAgICB4LmZvckVhY2gobGluZSA9PiBsaW5lLlNldE9wdGlvbnMob3B0aW9ucykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBQb2x5bGluZSBwYXRoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9seWxpbmUgLSB7QGxpbmsgTWFwUG9seWxpbmVEaXJlY3RpdmV9IHRvIGJlIHVwZGF0ZWQuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgZnVsbGZpbGxlZCBvbmNlIHRoZSBwb2x5bGluZSBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlsaW5lU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBVcGRhdGVQb2x5bGluZShwb2x5bGluZTogTWFwUG9seWxpbmVEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQocG9seWxpbmUpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihsID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHg6IEFycmF5PFBvbHlsaW5lPiA9IEFycmF5LmlzQXJyYXkobCkgPyBsIDogW2xdO1xuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9XG4gICAgICAgICAgICAgICAgcG9seWxpbmUuUGF0aC5sZW5ndGggPiAwICYmIEFycmF5LmlzQXJyYXkocG9seWxpbmUuUGF0aFswXSkgPyA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wb2x5bGluZS5QYXRoIDpcbiAgICAgICAgICAgICAgICA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5bcG9seWxpbmUuUGF0aF07XG4gICAgICAgICAgICB4LmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHAubGVuZ3RoID4gaW5kZXgpIHsgbGluZS5TZXRQYXRoKHBbaW5kZXhdKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsKSAmJiBsLmxlbmd0aCA+IHAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbC5zcGxpY2UocC5sZW5ndGggLSAxKS5mb3JFYWNoKGxpbmUgPT4gbGluZS5EZWxldGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG4iXX0=