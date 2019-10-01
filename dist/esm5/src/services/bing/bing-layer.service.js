/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var BingLayerService = /** @class */ (function (_super) {
    tslib_1.__extends(BingLayerService, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingLayerService.
     * @param _mapService - Instance of the Bing Maps Service. Will generally be injected.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof BingLayerService
     */
    function BingLayerService(_mapService, _zone) {
        return _super.call(this, _mapService, _zone) || this;
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
    BingLayerService.prototype.AddLayer = /**
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
    function (layer) {
        /** @type {?} */
        var layerPromise = this._mapService.CreateLayer({ id: layer.Id });
        this._layers.set(layer.Id, layerPromise);
        layerPromise.then(function (l) { return l.SetVisible(layer.Visible); });
    };
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
    BingLayerService.prototype.CreatePolygon = /**
     * Adds a polygon to the layer.
     *
     * @abstract
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygon.
     * @return {?} - A promise that when fullfilled contains the an instance of the Polygon model.
     *
     */
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var locs = BingConversions.TranslatePaths(options.paths);
            /** @type {?} */
            var o = BingConversions.TranslatePolygonOptions(options);
            /** @type {?} */
            var poly = new Microsoft.Maps.Polygon(locs, o);
            /** @type {?} */
            var polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
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
    };
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
    BingLayerService.prototype.CreatePolygons = /**
     * Creates an array of unbound polygons. Use this method to create arrays of polygons to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polygon.
     * @param {?} options - Polygon options defining the polygons.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polygon models.
     *
     */
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var polygons = new Promise(function (resolve, reject) {
                /** @type {?} */
                var polys = options.map(function (o) {
                    /** @type {?} */
                    var locs = BingConversions.TranslatePaths(o.paths);
                    /** @type {?} */
                    var op = BingConversions.TranslatePolygonOptions(o);
                    /** @type {?} */
                    var poly = new Microsoft.Maps.Polygon(locs, op);
                    /** @type {?} */
                    var polygon = new BingPolygon(poly, /** @type {?} */ (_this._mapService), l.NativePrimitve);
                    if (o.title && o.title !== '') {
                        polygon.Title = o.title;
                    }
                    if (o.metadata) {
                        o.metadata.forEach(function (v, k) { return polygon.Metadata.set(k, v); });
                    }
                    return polygon;
                });
                resolve(polys);
            });
            return polygons;
        });
    };
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
    BingLayerService.prototype.CreatePolyline = /**
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
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var p = this.GetLayerById(layer);
        /** @type {?} */
        var polyline;
        /** @type {?} */
        var line;
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var locs = BingConversions.TranslatePaths(options.path);
            /** @type {?} */
            var o = BingConversions.TranslatePolylineOptions(options);
            if (options.path && options.path.length > 0 && !Array.isArray(options.path[0])) {
                polyline = new Microsoft.Maps.Polyline(locs[0], o);
                line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                l.AddEntity(line);
                if (options.metadata) {
                    options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
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
                var lines_1 = new Array();
                locs.forEach(function (x) {
                    polyline = new Microsoft.Maps.Polyline(x, o);
                    line = new BingPolyline(polyline, _this._mapService.MapInstance, l.NativePrimitve);
                    l.AddEntity(line);
                    if (options.metadata) {
                        options.metadata.forEach(function (v, k) { return line.Metadata.set(k, v); });
                    }
                    if (options.title && options.title !== '') {
                        line.Title = options.title;
                    }
                    if (options.showTooltip != null) {
                        line.ShowTooltip = options.showTooltip;
                    }
                    lines_1.push(line);
                });
                return lines_1;
            }
        });
    };
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
    BingLayerService.prototype.CreatePolylines = /**
     * Creates an array of unbound polylines. Use this method to create arrays of polylines to be used in bulk
     * operations.
     *
     * \@memberof BingLayerService
     * @param {?} layer - The id of the layer to which to add the polylines.
     * @param {?} options - Polyline options defining the polylines.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Polyline models.
     *
     */
    function (layer, options) {
        var _this = this;
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            /** @type {?} */
            var polylines = new Promise(function (resolve, reject) {
                /** @type {?} */
                var polys = options.map(function (o) {
                    /** @type {?} */
                    var locs = BingConversions.TranslatePaths(o.path);
                    /** @type {?} */
                    var op = BingConversions.TranslatePolylineOptions(o);
                    if (locs && locs.length > 0 && !Array.isArray(locs[0])) {
                        /** @type {?} */
                        var poly = new Microsoft.Maps.Polyline(locs[0], op);
                        /** @type {?} */
                        var polyline_1 = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                        if (o.title && o.title !== '') {
                            polyline_1.Title = o.title;
                        }
                        if (o.metadata) {
                            o.metadata.forEach(function (v, k) { return polyline_1.Metadata.set(k, v); });
                        }
                        return polyline_1;
                    }
                    else {
                        /** @type {?} */
                        var lines_2 = new Array();
                        locs.forEach(function (x) {
                            /** @type {?} */
                            var poly = new Microsoft.Maps.Polyline(x, op);
                            /** @type {?} */
                            var polyline = new BingPolyline(poly, _this._mapService.MapInstance, l.NativePrimitve);
                            if (o.metadata) {
                                o.metadata.forEach(function (v, k) { return polyline.Metadata.set(k, v); });
                            }
                            if (o.title && o.title !== '') {
                                polyline.Title = o.title;
                            }
                            lines_2.push(polyline);
                        });
                        return lines_2;
                    }
                });
                resolve(polys);
            });
            return polylines;
        });
    };
    BingLayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingLayerService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingLayerService;
}(BingLayerBase));
export { BingLayerService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUcvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztJQVFmLDRDQUFhO0lBRS9DLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7T0FNRztJQUNILDBCQUFZLFdBQXVCLEVBQUUsS0FBYTtlQUM5QyxrQkFBTSxXQUFXLEVBQUUsS0FBSyxDQUFDO0tBQzVCOzs7Ozs7Ozs7Ozs7SUFZTSxtQ0FBUTs7Ozs7Ozs7Ozs7Y0FBQyxLQUF3Qjs7UUFDcEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBY2pELHdDQUFhOzs7Ozs7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QyxDQUFDO2dDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDOzZCQUFFOzRCQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FBQSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7NkJBQUU7NEJBQzNELE9BQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3hCLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsT0FBSyxDQUFDO3FCQUNoQjtpQkFDSixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDcEIsQ0FBQyxDQUFDOzs7Z0JBckxWLFVBQVU7Ozs7Z0JBWkYsVUFBVTtnQkFiRSxNQUFNOzsyQkFBM0I7RUEwQnNDLGFBQWE7U0FBdEMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BvbHlsaW5lJztcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XG5pbXBvcnQgeyBCaW5nUG9seWdvbiB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctcG9seWdvbic7XG5pbXBvcnQgeyBCaW5nUG9seWxpbmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1sYXllcic7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdMYXllckJhc2UgfSBmcm9tICcuL2JpbmctbGF5ZXItYmFzZSc7XG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xuXG4vKipcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBMYXllclNlcnZpY2V9IGNvbnRyYWN0IGZvciBhICBCaW5nIE1hcHMgVjggc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ0xheWVyU2VydmljZSBleHRlbmRzIEJpbmdMYXllckJhc2UgaW1wbGVtZW50cyBMYXllclNlcnZpY2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdMYXllclNlcnZpY2UuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gSW5zdGFuY2Ugb2YgdGhlIEJpbmcgTWFwcyBTZXJ2aWNlLiBXaWxsIGdlbmVyYWxseSBiZSBpbmplY3RlZC5cbiAgICAgKiBAcGFyYW0gX3pvbmUgLSBOZ1pvbmUgaW5zdGFuY2UgdG8gcHJvdmlkZSB6b25lIGF3YXJlIHByb21pc2VzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihfbWFwU2VydmljZTogTWFwU2VydmljZSwgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcihfbWFwU2VydmljZSwgX3pvbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIEFkZExheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBsYXllclByb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUxheWVyKHsgaWQ6IGxheWVyLklkIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLklkLCBsYXllclByb21pc2UpO1xuICAgICAgICBsYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZShsYXllci5WaXNpYmxlKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbi5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFBvbHlnb24gbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29uKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IFByb21pc2U8UG9seWdvbj4ge1xuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxvY3M6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUGF0aHMob3B0aW9ucy5wYXRocyk7XG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG8pO1xuICAgICAgICAgICAgY29uc3QgcG9seWdvbjogUG9seWdvbiA9IG5ldyBCaW5nUG9seWdvbihwb2x5LCA8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwU2VydmljZSwgbC5OYXRpdmVQcmltaXR2ZSk7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWdvbi5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykge3BvbHlnb24uVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGFiZWwgIT0gbnVsbCkgeyBwb2x5Z29uLlNob3dMYWJlbCA9IG9wdGlvbnMuc2hvd0xhYmVsOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zaG93VG9vbHRpcCAhPSBudWxsKSB7IHBvbHlnb24uU2hvd1Rvb2x0aXAgPSBvcHRpb25zLnNob3dUb29sdGlwOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1heFpvb20gIT0gbnVsbCkgeyBwb2x5Z29uLkxhYmVsTWF4Wm9vbSA9IG9wdGlvbnMubGFiZWxNYXhab29tOyB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sYWJlbE1pblpvb20gIT0gbnVsbCkgeyBwb2x5Z29uLkxhYmVsTWluWm9vbSA9IG9wdGlvbnMubGFiZWxNaW5ab29tOyB9XG4gICAgICAgICAgICBsLkFkZEVudGl0eShwb2x5Z29uKTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgcG9seWdvbnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlnb25zIHRvIGJlIHVzZWQgaW4gYnVsa1xuICAgICAqIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBUaGUgaWQgb2YgdGhlIGxheWVyIHRvIHdoaWNoIHRvIGFkZCB0aGUgcG9seWdvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlnb24gb3B0aW9ucyBkZWZpbmluZyB0aGUgcG9seWdvbnMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgUG9seWdvbiBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5Z29ucyhsYXllcjogbnVtYmVyLCBvcHRpb25zOiBBcnJheTxJUG9seWdvbk9wdGlvbnM+KTogUHJvbWlzZTxBcnJheTxQb2x5Z29uPj4ge1xuICAgICAgICBjb25zdCBwOiBQcm9taXNlPExheWVyPiA9IHRoaXMuR2V0TGF5ZXJCeUlkKGxheWVyKTtcbiAgICAgICAgaWYgKHAgPT0gbnVsbCkgeyB0aHJvdyAobmV3IEVycm9yKGBMYXllciB3aXRoIGlkICR7bGF5ZXJ9IG5vdCBmb3VuZCBpbiBMYXllciBNYXBgKSk7IH1cbiAgICAgICAgcmV0dXJuIHAudGhlbigobDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb25zOiBQcm9taXNlPEFycmF5PFBvbHlnb24+PiA9IG5ldyBQcm9taXNlPEFycmF5PFBvbHlnb24+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9seXM6IEFycmF5PEJpbmdQb2x5Z29uPiA9IG9wdGlvbnMubWFwKG8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG8ucGF0aHMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uKGxvY3MsIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWdvbjogQmluZ1BvbHlnb24gPSBuZXcgQmluZ1BvbHlnb24ocG9seSwgPEJpbmdNYXBTZXJ2aWNlPnRoaXMuX21hcFNlcnZpY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoby50aXRsZSAmJiBvLnRpdGxlICE9PSAnJykgeyBwb2x5Z29uLlRpdGxlID0gby50aXRsZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlnb24uTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBvbHlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb25zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcG9seWxpbmUgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIGxpbmUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBQb2x5bGluZSBvcHRpb25zIGRlZmluaW5nIHRoZSBsaW5lLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSBhbiBpbnN0YW5jZSBvZiB0aGUgUG9seWxpbmUgKG9yIGFuIGFycmF5XG4gICAgICogb2YgcG9seWdvbnMgZm9yIGNvbXBsZXggcGF0aHMpIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllclNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlUG9seWxpbmUobGF5ZXI6IG51bWJlciwgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyk6IFByb21pc2U8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+PiB7XG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xuICAgICAgICBsZXQgcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lO1xuICAgICAgICBsZXQgbGluZTogUG9seWxpbmU7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NzOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBhdGhzKG9wdGlvbnMucGF0aCk7XG4gICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGggJiYgb3B0aW9ucy5wYXRoLmxlbmd0aCA+IDAgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoWzBdKSkge1xuICAgICAgICAgICAgICAgIHBvbHlsaW5lID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKGxvY3NbMF0sIG8pO1xuICAgICAgICAgICAgICAgIGxpbmUgPSBuZXcgQmluZ1BvbHlsaW5lKHBvbHlsaW5lLCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShsaW5lKTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbGluZS5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGl0bGUgJiYgb3B0aW9ucy50aXRsZSAhPT0gJycpIHtsaW5lLlRpdGxlID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgbGluZS5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzOiBBcnJheTxQb2x5bGluZT4gPSBuZXcgQXJyYXk8UG9seWxpbmU+KCk7XG4gICAgICAgICAgICAgICAgbG9jcy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZSA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZSh4LCBvKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seWxpbmUsIHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2UsIGwuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgICAgICBsLkFkZEVudGl0eShsaW5lKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IGxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAmJiBvcHRpb25zLnRpdGxlICE9PSAnJykge2xpbmUuVGl0bGUgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNob3dUb29sdGlwICE9IG51bGwpIHsgbGluZS5TaG93VG9vbHRpcCA9IG9wdGlvbnMuc2hvd1Rvb2x0aXA7IH1cbiAgICAgICAgICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5ib3VuZCBwb2x5bGluZXMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIHBvbHlsaW5lcyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIGlkIG9mIHRoZSBsYXllciB0byB3aGljaCB0byBhZGQgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFBvbHlsaW5lIG9wdGlvbnMgZGVmaW5pbmcgdGhlIHBvbHlsaW5lcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBQb2x5bGluZSBtb2RlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyU2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVQb2x5bGluZXMobGF5ZXI6IG51bWJlciwgb3B0aW9uczogQXJyYXk8SVBvbHlsaW5lT3B0aW9ucz4pOiBQcm9taXNlPEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4+IHtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb2x5bGluZXM6IFByb21pc2U8QXJyYXk8UG9seWxpbmV8QXJyYXk8UG9seWxpbmU+Pj4gPSBuZXcgUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9seXM6IEFycmF5PFBvbHlsaW5lfEFycmF5PFBvbHlsaW5lPj4gPSBvcHRpb25zLm1hcChvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jczogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQYXRocyhvLnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcDogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2x5bGluZU9wdGlvbnMobyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NzICYmIGxvY3MubGVuZ3RoID4gMCAmJiAhQXJyYXkuaXNBcnJheShsb2NzWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUgPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUobG9jc1swXSwgb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9seWxpbmU6IEJpbmdQb2x5bGluZSA9IG5ldyBCaW5nUG9seWxpbmUocG9seSwgdGhpcy5fbWFwU2VydmljZS5NYXBJbnN0YW5jZSwgbC5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby50aXRsZSAmJiBvLnRpdGxlICE9PSAnJykgeyBwb2x5bGluZS5UaXRsZSA9IG8udGl0bGU7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLm1ldGFkYXRhKSB7IG8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gcG9seWxpbmUuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZXM6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY3MuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5ID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lKHgsIG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2x5bGluZTogQmluZ1BvbHlsaW5lID0gbmV3IEJpbmdQb2x5bGluZShwb2x5LCB0aGlzLl9tYXBTZXJ2aWNlLk1hcEluc3RhbmNlLCBsLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5tZXRhZGF0YSkgeyBvLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IHBvbHlsaW5lLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby50aXRsZSAmJiBvLnRpdGxlICE9PSAnJykge3BvbHlsaW5lLlRpdGxlID0gby50aXRsZTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzLnB1c2gocG9seWxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBvbHlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHBvbHlsaW5lcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=