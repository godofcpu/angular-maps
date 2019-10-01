/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
/**
 * Concrete implementation of the Polygon Service abstract class for Google Maps.
 *
 * @export
 */
export class GooglePolygonService {
    /**
     * Creates an instance of GooglePolygonService.
     * \@memberof GooglePolygonService
     * @param {?} _mapService - {\@link MapService} instance. The concrete {\@link GoogleMapService} implementation is expected.
     * @param {?} _layerService - {\@link GoogleLayerService} instance.
     * The concrete {\@link GoogleLayerService} implementation is expected.
     * @param {?} _zone - NgZone instance to support zone aware promises.
     *
     */
    constructor(_mapService, _layerService, _zone) {
        this._mapService = _mapService;
        this._layerService = _layerService;
        this._zone = _zone;
        this._polygons = new Map();
    }
    /**
     * Adds a polygon to a map. Depending on the polygon context, the polygon will either by added to the map or a
     * correcsponding layer.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} to be added.
     *
     * @return {?}
     */
    AddPolygon(polygon) {
        /** @type {?} */
        const o = {
            id: polygon.Id,
            clickable: polygon.Clickable,
            draggable: polygon.Draggable,
            editable: polygon.Editable,
            fillColor: polygon.FillColor,
            fillOpacity: polygon.FillOpacity,
            geodesic: polygon.Geodesic,
            labelMaxZoom: polygon.LabelMaxZoom,
            labelMinZoom: polygon.LabelMinZoom,
            paths: polygon.Paths,
            showLabel: polygon.ShowLabel,
            showTooltip: polygon.ShowTooltip,
            strokeColor: polygon.StrokeColor,
            strokeOpacity: polygon.StrokeOpacity,
            strokeWeight: polygon.StrokeWeight,
            title: polygon.Title,
            visible: polygon.Visible,
            zIndex: polygon.zIndex,
        };
        /** @type {?} */
        const polygonPromise = this._mapService.CreatePolygon(o);
        this._polygons.set(polygon, polygonPromise);
    }
    /**
     * Registers an event delegate for a polygon.
     *
     * \@memberof GooglePolygonService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, polygon) {
        return Observable.create((observer) => {
            this._polygons.get(polygon).then((p) => {
                p.AddListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes a polygon.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be deleted.
     * @return {?} - A promise fullfilled once the polygon has been deleted.
     *
     */
    DeletePolygon(polygon) {
        /** @type {?} */
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.Delete();
                this._polygons.delete(polygon);
            });
        });
    }
    /**
     * Obtains geo coordinates for the polygon on the click location
     *
     * @abstract
     * \@memberof GooglePolygonService
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     *
     */
    GetCoordinatesFromClick(e) {
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    }
    /**
     * Obtains the polygon model for the polygon allowing access to native implementation functionatiliy.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - The {\@link MapPolygonDirective} for which to obtain the polygon model.
     * @return {?} - A promise that when fullfilled contains the {\@link Polygon} implementation of the underlying platform.
     *
     */
    GetNativePolygon(polygon) {
        return this._polygons.get(polygon);
    }
    /**
     * Set the polygon options.
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @param {?} options - {\@link IPolygonOptions} object containing the options. Options will be merged with the
     * options already on the underlying object.
     * @return {?} - A promise fullfilled once the polygon options have been set.
     *
     */
    SetOptions(polygon, options) {
        return this._polygons.get(polygon).then((l) => { l.SetOptions(options); });
    }
    /**
     * Updates the Polygon path
     *
     * \@memberof GooglePolygonService
     * @param {?} polygon - {\@link MapPolygonDirective} to be updated.
     * @return {?} - A promise fullfilled once the polygon has been updated.
     *
     */
    UpdatePolygon(polygon) {
        /** @type {?} */
        const m = this._polygons.get(polygon);
        if (m == null || polygon.Paths == null || !Array.isArray(polygon.Paths) || polygon.Paths.length === 0) {
            return Promise.resolve();
        }
        return m.then((l) => {
            if (Array.isArray(polygon.Paths[0])) {
                l.SetPaths(polygon.Paths);
            }
            else {
                l.SetPath(/** @type {?} */ (polygon.Paths));
            }
        });
    }
}
GooglePolygonService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GooglePolygonService.ctorParameters = () => [
    { type: MapService },
    { type: LayerService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GooglePolygonService.prototype._polygons;
    /** @type {?} */
    GooglePolygonService.prototype._mapService;
    /** @type {?} */
    GooglePolygonService.prototype._layerService;
    /** @type {?} */
    GooglePolygonService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLXBvbHlnb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUs1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFPaEQsTUFBTTs7Ozs7Ozs7OztJQW9CRixZQUFvQixXQUF1QixFQUMvQixlQUNBO1FBRlEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isa0JBQWEsR0FBYixhQUFhO1FBQ2IsVUFBSyxHQUFMLEtBQUs7eUJBakIrQyxJQUFJLEdBQUcsRUFBeUM7S0FrQi9HOzs7Ozs7Ozs7O0lBY00sVUFBVSxDQUFDLE9BQTRCOztRQUMxQyxNQUFNLENBQUMsR0FBb0I7WUFDdkIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztZQUM1QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ2xDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1lBQzVCLFdB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LENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUU7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxPQUFPLG1CQUFrQixPQUFPLENBQUMsS0FBSyxFQUFDLENBQUM7YUFDN0M7U0FDSixDQUFDLENBQUM7Ozs7WUFqS1YsVUFBVTs7OztZQVBGLFVBQVU7WUFDVixZQUFZO1lBUEEsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IE1hcFBvbHlnb25EaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvbHlnb24gU2VydmljZSBhYnN0cmFjdCBjbGFzcyBmb3IgR29vZ2xlIE1hcHMuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlUG9seWdvblNlcnZpY2UgaW1wbGVtZW50cyBQb2x5Z29uU2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfcG9seWdvbnM6IE1hcDxNYXBQb2x5Z29uRGlyZWN0aXZlLCBQcm9taXNlPFBvbHlnb24+PiA9IG5ldyBNYXA8TWFwUG9seWdvbkRpcmVjdGl2ZSwgUHJvbWlzZTxQb2x5Z29uPj4oKTtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVQb2x5Z29uU2VydmljZS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSB7QGxpbmsgTWFwU2VydmljZX0gaW5zdGFuY2UuIFRoZSBjb25jcmV0ZSB7QGxpbmsgR29vZ2xlTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSB7QGxpbmsgR29vZ2xlTGF5ZXJTZXJ2aWNlfSBpbnN0YW5jZS5cbiAgICAgKiBUaGUgY29uY3JldGUge0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0gaW1wbGVtZW50YXRpb24gaXMgZXhwZWN0ZWQuXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHN1cHBvcnQgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uU2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2xheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1lbWJlcnMgYW5kIE1hcmtlclNlcnZpY2UgaW1wbGVtZW50YXRpb25cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHRvIGEgbWFwLiBEZXBlbmRpbmcgb24gdGhlIHBvbHlnb24gY29udGV4dCwgdGhlIHBvbHlnb24gd2lsbCBlaXRoZXIgYnkgYWRkZWQgdG8gdGhlIG1hcCBvciBhXG4gICAgICogY29ycmVjc3BvbmRpbmcgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgYWRkZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkUG9seWdvbihwb2x5Z29uOiBNYXBQb2x5Z29uRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IElQb2x5Z29uT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiBwb2x5Z29uLklkLFxuICAgICAgICAgICAgY2xpY2thYmxlOiBwb2x5Z29uLkNsaWNrYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcG9seWdvbi5EcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogcG9seWdvbi5FZGl0YWJsZSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogcG9seWdvbi5GaWxsQ29sb3IsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogcG9seWdvbi5GaWxsT3BhY2l0eSxcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBwb2x5Z29uLkdlb2Rlc2ljLFxuICAgICAgICAgICAgbGFiZWxNYXhab29tOiBwb2x5Z29uLkxhYmVsTWF4Wm9vbSxcbiAgICAgICAgICAgIGxhYmVsTWluWm9vbTogcG9seWdvbi5MYWJlbE1pblpvb20sXG4gICAgICAgICAgICBwYXRoczogcG9seWdvbi5QYXRocyxcbiAgICAgICAgICAgIHNob3dMYWJlbDogcG9seWdvbi5TaG93TGFiZWwsXG4gICAgICAgICAgICBzaG93VG9vbHRpcDogcG9seWdvbi5TaG93VG9vbHRpcCxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwb2x5Z29uLlN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcG9seWdvbi5TdHJva2VPcGFjaXR5LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwb2x5Z29uLlN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgIHRpdGxlOiBwb2x5Z29uLlRpdGxlLFxuICAgICAgICAgICAgdmlzaWJsZTogcG9seWdvbi5WaXNpYmxlLFxuICAgICAgICAgICAgekluZGV4OiBwb2x5Z29uLnpJbmRleCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcG9seWdvblByb21pc2U6IFByb21pc2U8UG9seWdvbj4gPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZVBvbHlnb24obyk7XG4gICAgICAgIHRoaXMuX3BvbHlnb25zLnNldChwb2x5Z29uLCBwb2x5Z29uUHJvbWlzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYSBwb2x5Z29uLlxuICAgICAgKlxuICAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0gVGhlIHtAbGluayBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAgKiBAcmV0dXJucyAtIE9ic2VydmFibGUgZW1pdGluZyBhbiBpbnN0YW5jZSBvZiBUIGVhY2ggdGltZSB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAgKlxuICAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcbiAgICAgICovXG4gICAgcHVibGljIENyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgcG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IE9ic2VydmFibGU8VD4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pLnRoZW4oKHA6IFBvbHlnb24pID0+IHtcbiAgICAgICAgICAgICAgICBwLkFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgICogRGVsZXRlcyBhIHBvbHlnb24uXG4gICAgICAqXG4gICAgICAqIEBwYXJhbSBwb2x5Z29uIC0ge0BsaW5rIE1hcFBvbHlnb25EaXJlY3RpdmV9IHRvIGJlIGRlbGV0ZWQuXG4gICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIGZ1bGxmaWxsZWQgb25jZSB0aGUgcG9seWdvbiBoYXMgYmVlbiBkZWxldGVkLlxuICAgICAgKlxuICAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblNlcnZpY2VcbiAgICAgICovXG4gICAgcHVibGljIERlbGV0ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsLkRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zLmRlbGV0ZShwb2x5Z29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgcG9seWdvbiBvbiB0aGUgY2xpY2sgbG9jYXRpb25cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBlIC0gVGhlIG1vdXNlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBjb250YWluaW5nIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNsaWNrZWQgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGU6IE1vdXNlRXZlbnQgfCBhbnkpOiBJTGF0TG9uZyB7XG4gICAgICAgIHJldHVybiB7IGxhdGl0dWRlOiBlLmxhdExuZy5sYXQoKSwgbG9uZ2l0dWRlOiBlLmxhdExuZy5sbmcoKSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgdGhlIHBvbHlnb24gbW9kZWwgZm9yIHRoZSBwb2x5Z29uIGFsbG93aW5nIGFjY2VzcyB0byBuYXRpdmUgaW1wbGVtZW50YXRpb24gZnVuY3Rpb25hdGlsaXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9seWdvbiAtIFRoZSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gZm9yIHdoaWNoIHRvIG9idGFpbiB0aGUgcG9seWdvbiBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIFBvbHlnb259IGltcGxlbWVudGF0aW9uIG9mIHRoZSB1bmRlcmx5aW5nIHBsYXRmb3JtLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEdldE5hdGl2ZVBvbHlnb24ocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSk6IFByb21pc2U8UG9seWdvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcG9seWdvbiBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJUG9seWdvbk9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBPcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlXG4gICAgICogb3B0aW9ucyBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gb3B0aW9ucyBoYXZlIGJlZW4gc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25TZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMocG9seWdvbjogTWFwUG9seWdvbkRpcmVjdGl2ZSwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbikudGhlbigobDogUG9seWdvbikgPT4geyBsLlNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIFBvbHlnb24gcGF0aFxuICAgICAqXG4gICAgICogQHBhcmFtIHBvbHlnb24gLSB7QGxpbmsgTWFwUG9seWdvbkRpcmVjdGl2ZX0gdG8gYmUgdXBkYXRlZC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSBmdWxsZmlsbGVkIG9uY2UgdGhlIHBvbHlnb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBVcGRhdGVQb2x5Z29uKHBvbHlnb246IE1hcFBvbHlnb25EaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCB8fCBwb2x5Z29uLlBhdGhzID09IG51bGwgfHwgIUFycmF5LmlzQXJyYXkocG9seWdvbi5QYXRocykgfHwgcG9seWdvbi5QYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwb2x5Z29uLlBhdGhzWzBdKSkge1xuICAgICAgICAgICAgICAgIGwuU2V0UGF0aHMocG9seWdvbi5QYXRocyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5wb2x5Z29uLlBhdGhzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=