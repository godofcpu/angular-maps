/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { GoogleLayer } from '../../models/google/google-layer';
import { GooglePolygon } from '../../models/google/google-polygon';
import { GooglePolyline } from '../../models/google/google-polyline';
import { GoogleLayerBase } from './google-layer-base';
import { MapService } from '../map.service';
import { GoogleConversions } from './google-conversions';
/**
 * Implements the {\@link LayerService} contract for a Google Maps specific implementation.
 *
 * @export
 */
export class GoogleLayerService extends GoogleLayerBase {
    /**
     * Creates an instance of GoogleLayerService.
     * \@memberof GoogleLayerService
     * @param {?} _mapService - Instance of the Google Maps Service. Will generally be injected.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
        this._layers = new Map();
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    AddLayer(layer) {
        /** @type {?} */
        const p = new Promise((resolve, reject) => {
            this._mapService.MapPromise.then(m => {
                /** @type {?} */
                const l = new GoogleLayer(m, this._mapService, layer.Id);
                l.SetVisible(layer.Visible);
                resolve(l);
            });
        });
        this._layers.set(layer.Id, p);
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        /** @type {?} */
        const p = this._mapService.CreatePolygon(options);
        /** @type {?} */
        const l = this._layers.get(layer);
        Promise.all([p, l]).then(x => x[1].AddEntity(x[0]));
        return p;
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    CreatePolygons(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            /** @type {?} */
            const polygons = new Promise((resolve, reject) => {
                /** @type {?} */
                const polys = options.map(o => {
                    /** @type {?} */
                    const op = GoogleConversions.TranslatePolygonOptions(o);
                    /** @type {?} */
                    const poly = new google.maps.Polygon(op);
                    /** @type {?} */
                    const polygon = new GooglePolygon(poly);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach((val, key) => polygon.Metadata.set(key, val));
                    }
                    return polygon;
                });
                resolve(polys);
            });
            return polygons;
        });
    }
    /**
     * Adds a polyline to the layer.
     *
     * @abstract
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polyline.
     * @param {?} options - Polyline options defining the polyline.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        /** @type {?} */
        const p = this._mapService.CreatePolyline(options);
        /** @type {?} */
        const l = this._layers.get(layer);
        Promise.all([p, l]).then(x => {
            /** @type {?} */
            const p1 = Array.isArray(x[0]) ? /** @type {?} */ (x[0]) : [/** @type {?} */ (x[0])];
            for (const p2 of p1) {
                x[1].AddEntity(p2);
            }
        });
        return p;
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    CreatePolylines(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            /** @type {?} */
            const polylines = new Promise((resolve, reject) => {
                /** @type {?} */
                const polys = options.map(o => {
                    /** @type {?} */
                    const op = GoogleConversions.TranslatePolylineOptions(o);
                    if (o.path && o.path.length > 0 && !Array.isArray(o.path[0])) {
                        op.path = GoogleConversions.TranslatePaths(o.path)[0];
                        /** @type {?} */
                        const poly = new google.maps.Polyline(op);
                        /** @type {?} */
                        const polyline = new GooglePolyline(poly);
                        if (o.title && o.title !== '') {
                            polyline.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach((v, k) => polyline.Metadata.set(k, v));
                        }
                        return polyline;
                    }
                    else {
                        /** @type {?} */
                        const paths = GoogleConversions.TranslatePaths(o.path);
                        /** @type {?} */
                        const lines = new Array();
                        paths.forEach(x => {
                            op.path = x;
                            /** @type {?} */
                            const poly = new google.maps.Polyline(op);
                            /** @type {?} */
                            const polyline = new GooglePolyline(poly);
                            if (o.metadata) {
                                o.metadata.forEach((v, k) => polyline.Metadata.set(k, v));
                            }
                            if (o.title && o.title !== '') {
                                polyline.Title = o.title;
                            }
                            lines.push(polyline);
                        });
                        return lines;
                    }
                });
                resolve(polys);
            });
            return polylines;
        });
    }
}
GoogleLayerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleLayerService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GoogleLayerService.prototype._layers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUdyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFXekQsTUFBTSx5QkFBMEIsU0FBUSxlQUFlOzs7Ozs7OztJQWtCbkQsWUFBWSxXQUF1QixFQUFFLEtBQWE7UUFDOUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQzt1QkFkbUIsSUFBSSxHQUFHLEVBQTBCO0tBZWpGOzs7Ozs7Ozs7Ozs7SUFZTSxRQUFRLENBQUMsS0FBd0I7O1FBQ3BDLE1BQU0sQ0FBQyxHQUFtQixJQUFJLE9BQU8sQ0FBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7O2dCQUNqQyxNQUFNLENBQUMsR0FBZ0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUss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Q0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7OzRCQUMxQyxNQUFNLFFBQVEsR0FBbUIsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQUU7NEJBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUFBLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQzs2QkFBRTs0QkFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDeEIsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNwQixDQUFDLENBQUM7Ozs7WUFqS1YsVUFBVTs7OztZQVhGLFVBQVU7WUFkRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBHb29nbGVMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWxheWVyJztcbmltcG9ydCB7IEdvb2dsZVBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1wb2x5Z29uJztcbmltcG9ydCB7IEdvb2dsZVBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWxpbmUnO1xuaW1wb3J0IHsgTWFwTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1sYXllcic7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZUxheWVyQmFzZSB9IGZyb20gJy4vZ29vZ2xlLWxheWVyLWJhc2UnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIExheWVyU2VydmljZX0gY29udHJhY3QgZm9yIGEgR29vZ2xlIE1hcHMgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlTGF5ZXJTZXJ2aWNlIGV4dGVuZHMgR29vZ2xlTGF5ZXJCYXNlIGltcGxlbWVudHMgTGF5ZXJTZXJ2aWNlICB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgRGVjbGFyYXRpb25zLlxuICAgIC8vL1xuICAgIHByb3RlY3RlZCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4gPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTGF5ZXJTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIEluc3RhbmNlIG9mIHRoZSBHb29nbGUgTWFwcyBTZXJ2aWNlLiBXaWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgaW5zdGFuY2UgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBfem9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKF9tYXBTZXJ2aWNlLCBfem9uZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxuICAgICAqIEdlbmVyYWxseSwgTWFwTGF5ZXJEaXJlY3RpdmUgd2lsbCBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZVxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSBuZXcgUHJvbWlzZTxMYXllcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4obSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbDogR29vZ2xlTGF5ZXIgPSBuZXcgR29vZ2xlTGF5ZXIobSwgdGhpcy5fbWFwU2VydmljZSwgbGF5ZXIuSWQpO1xuICAgICAgICAgICAgICAgIGwuU2V0VmlzaWJsZShsYXllci5WaXNpYmxlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlnb24obGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxQb2x5Z29uPiB7XG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8UG9seWdvbj4gPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZVBvbHlnb24ob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGw6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5fbGF5ZXJzLmdldChsYXllcik7XG4gICAgICAgIFByb21pc2UuYWxsKFtwLCBsXSkudGhlbih4ID0+IHhbMV0uQWRkRW50aXR5KHhbMF0pKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xuICAgICAgICAvL1xuICAgICAgICAvLyBOb3RlOiB3ZSBhdHRlbXB0ZWQgdXNpbmcgZGF0YS5Qb2x5Z29ucyBpbiBhbiBhdHRlbXB0IHRvIGltcHJvdmUgcGVyZm9ybWFuY2UsIGJ1dCBlaXRoZXIgZGF0YS5Qb2x5Z29uXG4gICAgICAgIC8vIG9yIGRhdGEuTXVsdGlQb2x5Z29uIGFjdHVhbGx5IG9wZXJhdGUgc2lnbmlmaWNhbnRseSBzbG93ZXIgdGhhbiBnZW5lcmF0aW5nIHRoZSBwb2x5Z29ucyB0aGlzIHdheS5cbiAgICAgICAgLy8gdGhlIHNsb3duZXNzIGluIGdvb2dsZSBhcyBvcHBvc2VkIHRvIGJpbmcgcHJvYmFibHkgY29tZXMgZnJvbSB0aGUgcG9pbnQgcmVkdWN0aW9uIGFsZ29yaXRobSB1c2VzLlxuICAgICAgICAvLyBTaWduaWdpY2FudCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudHMgbWlnaHQgYmUgcG9zc2libGUgaW4gZ29vZ2xlIHdoZW4gdXNpbmcgYSBwaXhlbCBiYXNlZCByZWR1Y3Rpb24gYWxnb3JpdGhtXG4gICAgICAgIC8vIHByaW9yIHRvIHNldHRpbmcgdGhlIHBvbHlnb24gcGF0aC4gVGhpcyB3aWxsIGxvd2VyIHRvIHByb2Nlc3Npbmcgb3ZlcmhlYWQgb2YgdGhlIGdvb2dsZSBhbGdvcml0aG0gKHdpdGggaXMgRG91Z2xhcy1QZXVja2VyXG4gICAgICAgIC8vIGFuZCByYXRoZXIgY29tcHV0ZSBpbnRlbnNpdmUpXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9seWdvbnM6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWdvbj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb2x5czogQXJyYXk8R29vZ2xlUG9seWdvbj4gPSBvcHRpb25zLm1hcChvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3A6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMobyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvcCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IEdvb2dsZVBvbHlnb24gPSBuZXcgR29vZ2xlUG9seWdvbihwb2x5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWdvbi5UaXRsZSA9IG8udGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2YWw6IGFueSwga2V5OiBzdHJpbmcpID0+IHBvbHlnb24uTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlnb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29ucztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuIGFycmF5XG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZShsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+ID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVQb2x5bGluZShvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcbiAgICAgICAgUHJvbWlzZS5hbGwoW3AsIGxdKS50aGVuKHggPT4ge1xuICAgICAgICAgICAgY29uc3QgcDE6IEFycmF5PFBvbHlsaW5lPiA9ICBBcnJheS5pc0FycmF5KHhbMF0pID8gPEFycmF5PFBvbHlsaW5lPj54WzBdIDogWzxQb2x5bGluZT54WzBdXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcDIgb2YgcDEpIHt4WzFdLkFkZEVudGl0eShwMik7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5bGluZXMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlsaW5lcyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lcyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4ge1xuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lczogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiA9IG5ldyBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb2x5czogQXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiA9IG9wdGlvbnMubWFwKG8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5wYXRoICYmIG8ucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG8ucGF0aFswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wLnBhdGggPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvLnBhdGgpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmUgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUob3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWxpbmU6IEdvb2dsZVBvbHlsaW5lID0gbmV3IEdvb2dsZVBvbHlsaW5lKHBvbHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWxpbmUuVGl0bGUgPSBvLnRpdGxlOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2x5bGluZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhzOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG8ucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcC5wYXRoID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5ID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5bGluZTogR29vZ2xlUG9seWxpbmUgPSBuZXcgR29vZ2xlUG9seWxpbmUocG9seSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5bGluZS5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHtwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHBvbHlsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5bGluZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19