/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Marker } from '../../models/marker';
import { GoogleConversions } from './google-conversions';
import { GoogleMarker } from '../../models/google/google-marker';
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Google Maps archtiecture. It serves
 * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Google Maps archtiecture. It serves
 * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
GoogleLayerBase = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of GoogleLayerBase.
     * @param _mapService - Concrete {@link MapService} implementation for Google Maps.
     * An instance of {@link GoogleMapService}.
     * @param _zone - NgZone instance to provide zone aware promises.
     *
     * @memberof GoogleLayerBase
     */
    function GoogleLayerBase(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
    }
    /**
     * Deletes the layer
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    GoogleLayerBase.prototype.DeleteLayer = /**
     * Deletes the layer
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    function (layer) {
        var _this = this;
        /** @type {?} */
        var l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then(function (l1) {
            return _this._zone.run(function () {
                l1.Delete();
                _this._layers.delete(layer.Id);
            });
        });
    };
    /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - MapLayerDirective component object or layer id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    GoogleLayerBase.prototype.GetNativeLayer = /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - MapLayerDirective component object or layer id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    function (layer) {
        /** @type {?} */
        var p = null;
        if (typeof (layer) === 'number') {
            p = this._layers.get(layer);
        }
        else {
            p = this._layers.get((/** @type {?} */ (layer)).Id);
        }
        return p;
    };
    /**
     * Creates a marker in the layer.
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    GoogleLayerBase.prototype.CreateMarker = /**
     * Creates a marker in the layer.
     *
     * \@memberof GoogleLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var mp = this._mapService.MapPromise;
        /** @type {?} */
        var lp = this._layers.get(layer);
        return Promise.all([mp, lp]).then(function (_a) {
            var _b = tslib_1.__read(_a, 2), map = _b[0], l = _b[1];
            /** @type {?} */
            var payload = function (x) {
                /** @type {?} */
                var marker = new google.maps.Marker(x);
                if (options.metadata) {
                    options.metadata.forEach(function (val, key) { return marker.Metadata.set(key, val); });
                }
                marker.setMap(map);
                /** @type {?} */
                var m = new GoogleMarker(marker);
                m.IsFirst = options.isFirst;
                m.IsLast = options.isLast;
                if (options.metadata) {
                    options.metadata.forEach(function (val, key) { return m.Metadata.set(key, val); });
                }
                l.AddEntity(m);
                return m;
            };
            /** @type {?} */
            var o = GoogleConversions.TranslateMarkerOptions(options);
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                var s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    o.icon = s;
                    return payload(o);
                }
                else {
                    return s.then(function (x) {
                        o.icon = x.icon;
                        return payload(o);
                    });
                }
            }
            else {
                return payload(o);
            }
        });
    };
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    GoogleLayerBase.prototype.CreateMarkers = /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof GoogleLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    function (options, markerIcon) {
        /** @type {?} */
        var payload = function (icon) {
            /** @type {?} */
            var markers = options.map(function (mo) {
                /** @type {?} */
                var o = GoogleConversions.TranslateMarkerOptions(mo);
                if (icon && icon !== '') {
                    o.icon = icon;
                }
                /** @type {?} */
                var pushpin = new google.maps.Marker(o);
                /** @type {?} */
                var marker = new GoogleMarker(pushpin);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach(function (val, key) { return marker.Metadata.set(key, val); });
                }
                return marker;
            });
            return markers;
        };
        /** @type {?} */
        var p = new Promise(function (resolve, reject) {
            if (markerIcon && markerIcon.markerType) {
                /** @type {?} */
                var s = Marker.CreateMarker(markerIcon);
                if (typeof (s) === 'string') {
                    resolve(payload(s));
                }
                else {
                    return s.then(function (x) {
                        resolve(payload(x.icon));
                    });
                }
            }
            else {
                resolve(payload(null));
            }
        });
        return p;
    };
    ///
    /// Protected methods
    ///
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * @param id - Layer Id.
     * @returns - A promise that when fullfilled contains the {@link Layer} model for the layer.
     *
     * @memberof GoogleLayerBase
     */
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof GoogleLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    GoogleLayerBase.prototype.GetLayerById = /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof GoogleLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    function (id) {
        /** @type {?} */
        var p;
        this._layers.forEach(function (l, k) { if (k === id) {
            p = l;
        } });
        return p;
    };
    return GoogleLayerBase;
}());
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Google Maps archtiecture. It serves
 * as the base class for basic layer ({\@link GoogleLayerService}) and cluster layer ({\@link GoogleClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
export { GoogleLayerBase };
if (false) {
    /** @type {?} */
    GoogleLayerBase.prototype._layers;
    /** @type {?} */
    GoogleLayerBase.prototype._mapService;
    /** @type {?} */
    GoogleLayerBase.prototype._zone;
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof GoogleLayerBase
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    GoogleLayerBase.prototype.AddLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7OztBQWFqRTs7Ozs7Ozs7O0FBQUE7SUFPSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gseUJBQXNCLFdBQXVCLEVBQVksS0FBYTtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFZLFVBQUssR0FBTCxLQUFLLENBQVE7S0FBSzs7Ozs7Ozs7O0lBMEJwRSxxQ0FBVzs7Ozs7Ozs7Y0FBQyxLQUF3Qjs7O1FBQ3ZDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQVM7WUFDcEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1osS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVdBLHdDQUFjOzs7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QUcsQ0FBQyxDQUFDO1NBQUUsRUFBRSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNaOzBCQTVNTDtJQThNQyxDQUFBOzs7Ozs7Ozs7O0FBdExELDJCQXNMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbGF5ZXInO1xuaW1wb3J0IHsgTWFya2VyVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcmtlci10eXBlLWlkJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBMYXllckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbWFwLWxheWVyJztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uL2xheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlTWFwU2VydmljZSB9IGZyb20gJy4vZ29vZ2xlLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi9nb29nbGUtY29udmVyc2lvbnMnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4vZ29vZ2xlLW1hcC10eXBlcyc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG4vKipcbiAqIFRoaXMgYWJzdHJhY3QgcGFydGlhbGx5IGltcGxlbWVudHMgdGhlIGNvbnRyYWN0IGZvciB0aGUge0BsaW5rIExheWVyU2VydmljZX1cbiAqIGFuZCB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGZvciB0aGUgR29vZ2xlIE1hcHMgYXJjaHRpZWN0dXJlLiBJdCBzZXJ2ZXNcbiAqIGFzIHRoZSBiYXNlIGNsYXNzIGZvciBiYXNpYyBsYXllciAoe0BsaW5rIEdvb2dsZUxheWVyU2VydmljZX0pIGFuZCBjbHVzdGVyIGxheWVyICh7QGxpbmsgR29vZ2xlQ2x1c3RlckxheWVyfSkuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHb29nbGVMYXllckJhc2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj47XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTGF5ZXJCYXNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgR29vZ2xlIE1hcHMuXG4gICAgICogQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfem9uZSAtIE5nWm9uZSBpbnN0YW5jZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJCYXNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGxheWVyIGhhcyBiZWVuIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XG4gICAgICAgIGlmIChsID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbDEuRGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllci5JZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgTGF5ZXIgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3Qgb3IgbGF5ZXIgaWQgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllciBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIExheWVyIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXROYXRpdmVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmV8bnVtYmVyKTogUHJvbWlzZTxMYXllcj4ge1xuICAgICAgICBsZXQgcDogUHJvbWlzZTxMYXllcj4gPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mKGxheWVyKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHAgPSB0aGlzLl9sYXllcnMuZ2V0KCg8TWFwTGF5ZXJEaXJlY3RpdmU+bGF5ZXIpLklkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWFya2VyIGluIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBJZCBvZiB0aGUgbGF5ZXIgaW4gd2hpY2ggdG8gY3JlYXRlIHRoZSBtYXJrZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gbW9kZWwgZm9yIHRoZSBjcmVhdGVkIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgY29uc3QgbXA6IFByb21pc2U8R29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwPiA9IHRoaXMuX21hcFNlcnZpY2UuTWFwUHJvbWlzZTtcbiAgICAgICAgY29uc3QgbHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5fbGF5ZXJzLmdldChsYXllcik7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFttcCwgbHBdKS50aGVuKChbbWFwLCBsXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9ICh4OiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zKTogR29vZ2xlTWFya2VyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHgpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1ldGFkYXRhKSB7IG9wdGlvbnMubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbSA9IG5ldyBHb29nbGVNYXJrZXIobWFya2VyKTtcbiAgICAgICAgICAgICAgICBtLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XG4gICAgICAgICAgICAgICAgbS5Jc0xhc3QgPSBvcHRpb25zLmlzTGFzdDtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHZhbDogYW55LCBrZXk6IHN0cmluZykgPT4gbS5NZXRhZGF0YS5zZXQoa2V5LCB2YWwpKTsgfVxuICAgICAgICAgICAgICAgIGwuQWRkRW50aXR5KG0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaWNvbkluZm8gJiYgb3B0aW9ucy5pY29uSW5mby5tYXJrZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIob3B0aW9ucy5pY29uSW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgby5pY29uID0gcztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQobyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5pY29uID0geC5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQobyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgbWFya2Vycy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgbWFya2VycyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBNYXJrZXIgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2Vycy5cbiAgICAgKiBAcGFyYW0gbWFya2VySWNvbiAtIE9wdGlvbmFsIGluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGN1c3RvbSBtYXJrZXJzLiBUaGlzIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgbWFya2Vycy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBNYXJrZXIgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVNYXJrZXJzKG9wdGlvbnM6IEFycmF5PElNYXJrZXJPcHRpb25zPiwgbWFya2VySWNvbj86IElNYXJrZXJJY29uSW5mbyk6IFByb21pc2U8QXJyYXk8TWFya2VyPj4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0gKGljb246IHN0cmluZyk6IEFycmF5PEdvb2dsZU1hcmtlcj4gPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFya2VyczogQXJyYXk8R29vZ2xlTWFya2VyPiA9IG9wdGlvbnMubWFwKG1vID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhtbyk7XG4gICAgICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycpIHsgby5pY29uID0gaWNvbjsgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHB1c2hwaW4gPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogR29vZ2xlTWFya2VyID0gbmV3IEdvb2dsZU1hcmtlcihwdXNocGluKTtcbiAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG1vLmlzRmlyc3Q7XG4gICAgICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG1vLmlzTGFzdDtcbiAgICAgICAgICAgICAgICBpZiAobW8ubWV0YWRhdGEpIHsgbW8ubWV0YWRhdGEuZm9yRWFjaCgodmFsOiBhbnksIGtleTogc3RyaW5nKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGtleSwgdmFsKSk7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWFya2VycztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxBcnJheTxNYXJrZXI+PiA9IG5ldyBQcm9taXNlPEFycmF5PE1hcmtlcj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtYXJrZXJJY29uICYmIG1hcmtlckljb24ubWFya2VyVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG1hcmtlckljb24pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocykgPT09ICdzdHJpbmcnKSB7IHJlc29sdmUocGF5bG9hZChzKSk7IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGF5bG9hZCh4Lmljb24pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSAocGF5bG9hZChudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxheWVyIGJhc2VkIG9uIGl0cyBpZC5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gaWQgLSBMYXllciBJZC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIExheWVyfSBtb2RlbCBmb3IgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyQmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRMYXllckJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+O1xuICAgICAgICB0aGlzLl9sYXllcnMuZm9yRWFjaCgobDogUHJvbWlzZTxMYXllcj4sIGs6IG51bWJlcikgPT4geyBpZiAoayA9PT0gaWQpIHsgcCA9IGw7IH0gfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxufVxuIl19