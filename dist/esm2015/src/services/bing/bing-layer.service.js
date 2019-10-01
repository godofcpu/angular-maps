/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { BingPolygon } from '../../models/bing/bing-polygon';
import { BingPolyline } from '../../models/bing/bing-polyline';
import { MapService } from '../map.service';
import { BingLayerBase } from './bing-layer-base';
import { BingConversions } from './bing-conversions';
/**
 * Implements the {\@link LayerService} contract for a  Bing Maps V8 specific implementation.
 *
 * @export
 */
export class BingLayerService extends BingLayerBase {
    /**
     * Creates an instance of BingLayerService.
     * \@memberof BingLayerService
     * @param {?} _mapService - Instance of the Bing Maps Service. Will generally be injected.
     * @param {?} _zone - NgZone instance to provide zone aware promises.
     *
     */
    constructor(_mapService, _zone) {
        super(_mapService, _zone);
    }
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    AddLayer(layer) {
        /** @type {?} */
        const layerPromise = this._mapService.CreateLayer({ id: layer.Id });
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(l => l.SetVisible(layer.Visible));
    }
    /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    CreatePolygon(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            /** @type {?} */
            const locs = BingConversions.TranslatePaths(options.paths);
            /** @type {?} */
            const o = BingConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            const poly = new Microsoft.Maps.Polygon(locs, o);
            /** @type {?} */
            const polygon = new BingPolygon(poly, /** @type {?} */ (this._mapService), l.NativePrimitve);
            if (options.metadata) {
                options.metadata.forEach((v, k) => polygon.Metadata.set(k, v));
            }
            if (options.title && options.title !== '') {
                polygon.Title = options.title;
            }
            if (options.showLabel != null) {
                polygon.ShowLabel = options.showLabel;
            }
            if (options.showTooltip != null) {
                polygon.ShowTooltip = options.showTooltip;
            }
            if (options.labelMaxZoom != null) {
                polygon.LabelMaxZoom = options.labelMaxZoom;
            }
            if (options.labelMinZoom != null) {
                polygon.LabelMinZoom = options.labelMinZoom;
            }
            l.AddEntity(polygon);
            return polygon;
        });
    }
    /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
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
                    const locs = BingConversions.TranslatePaths(o.paths);
                    /** @type {?} */
                    const op = BingConversions.TranslatePolygonOptions(o);
                    /** @type {?} */
                    const poly = new Microsoft.Maps.Polygon(locs, op);
                    /** @type {?} */
                    const polygon = new BingPolygon(poly, /** @type {?} */ (this._mapService), l.NativePrimitve);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach((v, k) => polygon.Metadata.set(k, v));
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
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the line.
     * @param {?} options - Polyline options defining the line.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polyline (or an array
     * of polygons for complex paths) model.
     *
     */
    CreatePolyline(layer, options) {
        /** @type {?} */
        const p = this.GetLayerById(layer);
        /** @type {?} */
        let polyline;
        /** @type {?} */
        let line;
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            /** @type {?} */
            const locs = BingConversions.TranslatePaths(options.path);
            /** @type {?} */
            const o = BingConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                line = new BingPolyline(polyline, this._mapService.MapInstance, l.NativePrimitve);
                l.AddEntity(line);
                if (options.metadata) {
                    options.metadata.forEach((v, k) => line.Metadata.set(k, v));
                }
                if (options.title && options.title !== '') {
                    line.Title = options.title;
                }
                if (options.showTooltip != null) {
                    line.ShowTooltip = options.showTooltip;
                }
                return line;
            }
            else {
                /** @type {?} */
                const lines = new Array();
                locs.forEach(x => {
                    polyline = new Microsoft.Maps.Polyline(x, o);
                    line = new BingPolyline(polyline, this._mapService.MapInstance, l.NativePrimitve);
                    l.AddEntity(line);
                    if (options.metadata) {
                        options.metadata.forEach((v, k) => line.Metadata.set(k, v));
                    }
                    if (options.title && options.title !== '') {
                        line.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        line.ShowTooltip = options.showTooltip;
                    }
                    lines.push(line);
                });
                return lines;
            }
        });
    }
    /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
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
                    const locs = BingConversions.TranslatePaths(o.path);
                    /** @type {?} */
                    const op = BingConversions.TranslatePolylineOptions(o);
                    if (locs && locs.length > 0 && !Array.isArray(locs[0])) {
                        /** @type {?} */
                        const poly = new Microsoft.Maps.Polyline(locs[0], op);
                        /** @type {?} */
                        const polyline = new BingPolyline(poly, this._mapService.MapInstance, l.NativePrimitve);
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
                        const lines = new Array();
                        locs.forEach(x => {
                            /** @type {?} */
                            const poly = new Microsoft.Maps.Polyline(x, op);
                            /** @type {?} */
                            const polyline = new BingPolyline(poly, this._mapService.MapInstance, l.NativePrimitve);
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
BingLayerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingLayerService.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFRckQsTUFBTSx1QkFBd0IsU0FBUSxhQUFhOzs7Ozs7OztJQWEvQyxZQUFZLFdBQXVCLEVBQUUsS0FBYTtRQUM5QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdCOzs7Ozs7Ozs7Ozs7SUFZTSxRQUFRLENBQUMsS0FBd0I7O1FBQ3BDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQWNqRCxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQXdCOztRQUN4RCxNQUFNLENBQUMsR0FBbUIs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Q0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUFFOzRCQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7NkJBQUU7NEJBQzNELEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3hCLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO3FCQUNoQjtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEIsQ0FBQyxDQUFDOzs7O1lBckxWLFVBQVU7Ozs7WUFaRixVQUFVO1lBYkUsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvcG9seWdvbic7XG5pbXBvcnQgeyBQb2x5bGluZSB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5bGluZSc7XG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1tYXJrZXInO1xuaW1wb3J0IHsgQmluZ1BvbHlnb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlnb24nO1xuaW1wb3J0IHsgQmluZ1BvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JpbmcvYmluZy1wb2x5bGluZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4vYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nTGF5ZXJCYXNlIH0gZnJvbSAnLi9iaW5nLWxheWVyLWJhc2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi9iaW5nLWNvbnZlcnNpb25zJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIHRoZSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfSBjb250cmFjdCBmb3IgYSAgQmluZyBNYXBzIFY4IHNwZWNpZmljIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmdMYXllclNlcnZpY2UgZXh0ZW5kcyBCaW5nTGF5ZXJCYXNlIGltcGxlbWVudHMgTGF5ZXJTZXJ2aWNlIHtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTGF5ZXJTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIEluc3RhbmNlIG9mIHRoZSBCaW5nIE1hcHMgU2VydmljZS4gV2lsbCBnZW5lcmFsbHkgYmUgaW5qZWN0ZWQuXG4gICAgICogQHBhcmFtIF96b25lIC0gTmdab25lIGluc3RhbmNlIHRvIHByb3ZpZGUgem9uZSBhd2FyZSBwcm9taXNlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIF96b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoX21hcFNlcnZpY2UsIF96b25lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGF5ZXIgdG8gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QuXG4gICAgICogR2VuZXJhbGx5LCBNYXBMYXllckRpcmVjdGl2ZSB3aWxsIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlXG4gICAgICogTGF5ZXJTZXJ2aWNlIGFuZCB0aGVuIHNlbGYgcmVnaXN0ZXIgb24gaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGF5ZXJQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVMYXllcih7IGlkOiBsYXllci5JZCB9KTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllci5JZCwgbGF5ZXJQcm9taXNlKTtcbiAgICAgICAgbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldFZpc2libGUobGF5ZXIuVmlzaWJsZSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb24uXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGluc3RhbmNlIG9mIHRoZSBQb2x5Z29uIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBQcm9taXNlPFBvbHlnb24+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aHMpO1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbihsb2NzLCBvKTtcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IFBvbHlnb24gPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlnb24uTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHtwb2x5Z29uLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xhYmVsICE9IG51bGwpIHsgcG9seWdvbi5TaG93TGFiZWwgPSBvcHRpb25zLnNob3dMYWJlbDsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd1Rvb2x0aXAgIT0gbnVsbCkgeyBwb2x5Z29uLlNob3dUb29sdGlwID0gb3B0aW9ucy5zaG93VG9vbHRpcDsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNYXhab29tICE9IG51bGwpIHsgcG9seWdvbi5MYWJlbE1heFpvb20gPSBvcHRpb25zLmxhYmVsTWF4Wm9vbTsgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubGFiZWxNaW5ab29tICE9IG51bGwpIHsgcG9seWdvbi5MYWJlbE1pblpvb20gPSBvcHRpb25zLmxhYmVsTWluWm9vbTsgfVxuICAgICAgICAgICAgbC5BZGRFbnRpdHkocG9seWdvbik7XG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIHBvbHlnb25zLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5Z29ucyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlnb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5Z29uIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlnb25zLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBhcnJheXMgb2YgdGhlIFBvbHlnb24gbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWdvbnMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlnb25PcHRpb25zPik6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uczogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4gPSBuZXcgUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlzOiBBcnJheTxCaW5nUG9seWdvbj4gPSBvcHRpb25zLm1hcChvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvLnBhdGhzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3A6IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMobyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWdvbihsb2NzLCBvcCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlnb246IEJpbmdQb2x5Z29uID0gbmV3IEJpbmdQb2x5Z29uKHBvbHksIDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBTZXJ2aWNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWdvbi5UaXRsZSA9IG8udGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5Z29uLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlnb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29ucztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBvbHlsaW5lIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBsaW5lLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gUG9seWxpbmUgb3B0aW9ucyBkZWZpbmluZyB0aGUgbGluZS5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlsaW5lIChvciBhbiBhcnJheVxuICAgICAqIG9mIHBvbHlnb25zIGZvciBjb21wbGV4IHBhdGhzKSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZVBvbHlsaW5lKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBQcm9taXNlPFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4ge1xuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcbiAgICAgICAgbGV0IHBvbHlsaW5lOiBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZTtcbiAgICAgICAgbGV0IGxpbmU6IFBvbHlsaW5lO1xuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvcHRpb25zLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wYXRoICYmIG9wdGlvbnMucGF0aC5sZW5ndGggPiAwICYmICFBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aFswXSkpIHtcbiAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShsb2NzWzBdLCBvKTtcbiAgICAgICAgICAgICAgICBsaW5lID0gbmV3IEJpbmdQb2x5bGluZShwb2x5bGluZSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgbC5BZGRFbnRpdHkobGluZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IGxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICYmIG9wdGlvbnMudGl0bGUgIT09ICcnKSB7bGluZS5UaXRsZSA9IG9wdGlvbnMudGl0bGU7IH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IGxpbmUuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lczogQXJyYXk8UG9seWxpbmU+ID0gbmV3IEFycmF5PFBvbHlsaW5lPigpO1xuICAgICAgICAgICAgICAgIGxvY3MuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUoeCwgbyk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICAgICAgbC5BZGRFbnRpdHkobGluZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHtsaW5lLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IGxpbmUuU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWxpbmVzLiBVc2UgdGhpcyBtZXRob2QgdG8gY3JlYXRlIGFycmF5cyBvZiBwb2x5bGluZXMgdG8gYmUgdXNlZCBpbiBidWxrXG4gICAgICogb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBpZCBvZiB0aGUgbGF5ZXIgdG8gd2hpY2ggdG8gYWRkIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBwb2x5bGluZXMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWxpbmUgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmVzKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiB7XG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9seWxpbmVzOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+ID0gbmV3IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlzOiBBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+ID0gb3B0aW9ucy5tYXAobyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMoby5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3A6IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jcyAmJiBsb2NzLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkobG9jc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHk6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKGxvY3NbMF0sIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvbHlsaW5lOiBCaW5nUG9seWxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHksIHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHsgcG9seWxpbmUuVGl0bGUgPSBvLnRpdGxlOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2x5bGluZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NzLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZSh4LCBvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWxpbmU6IEJpbmdQb2x5bGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8ubWV0YWRhdGEpIHsgby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBwb2x5bGluZS5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8udGl0bGUgJiYgby50aXRsZSAhPT0gJycpIHtwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHBvbHlsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwb2x5cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5bGluZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19