/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Marker } from '../../models/marker';
import { BingMarker } from '../../models/bing/bing-marker';
import { BingConversions } from './bing-conversions';
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
BingLayerBase = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingLayerBase.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     *
     * @memberof BingLayerBase
     */
    function BingLayerBase(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Creates a marker in the layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    BingLayerBase.prototype.CreateMarker = /**
     * Creates a marker in the layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - The Id of the layer in which to create the marker.
     * @param {?} options - {\@link IMarkerOptions} object containing the marker properties.
     * @return {?} - A promise that when fullfilled contains the {\@link Marker} model for the created marker.
     *
     */
    function (layer, options) {
        /** @type {?} */
        var payload = function (icon, l) {
            /** @type {?} */
            var loc = BingConversions.TranslateLocation(options.position);
            /** @type {?} */
            var o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            /** @type {?} */
            var pushpin = new Microsoft.Maps.Pushpin(loc, o);
            /** @type {?} */
            var marker = new BingMarker(pushpin, null, l.NativePrimitve);
            marker.IsFirst = options.isFirst;
            marker.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
            }
            l.AddEntity(marker);
            return marker;
        };
        /** @type {?} */
        var p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error("Layer with id " + layer + " not found in Layer Map"));
        }
        return p.then(function (l) {
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                var s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, l));
                }
                else {
                    return s.then(function (x) {
                        return (payload(x.icon, l));
                    });
                }
            }
            else {
                return (payload(null, l));
            }
        });
    };
    /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof BingLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    BingLayerBase.prototype.CreateMarkers = /**
     * Creates an array of unbound markers. Use this method to create arrays of markers to be used in bulk
     * operations.
     *
     * \@memberof BingLayerBase
     * @param {?} options - Marker options defining the markers.
     * @param {?=} markerIcon - Optional information to generate custom markers. This will be applied to all markers.
     * @return {?} - A promise that when fullfilled contains the an arrays of the Marker models.
     *
     */
    function (options, markerIcon) {
        /** @type {?} */
        var payload = function (icon, op) {
            /** @type {?} */
            var markers = op.map(function (mo) {
                /** @type {?} */
                var s;
                /** @type {?} */
                var o = BingConversions.TranslateMarkerOptions(mo);
                if (icon && icon !== '') {
                    s = icon;
                }
                else if (o.icon) {
                    s = o.icon;
                }
                if (o.icon) {
                    delete o.icon;
                }
                /** @type {?} */
                var loc = BingConversions.TranslateLocation(mo.position);
                /** @type {?} */
                var pushpin = new Microsoft.Maps.Pushpin(loc, o);
                /** @type {?} */
                var img = Marker.GetImageForMarker(s);
                if (img != null) {
                    (/** @type {?} */ (pushpin)).image = img;
                }
                /** @type {?} */
                var marker = new BingMarker(pushpin, null, null);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach(function (v, k) { return marker.Metadata.set(k, v); });
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
                    resolve(payload(s, options));
                }
                else {
                    return s.then(function (x) {
                        resolve(payload(x.icon, options));
                    });
                }
            }
            else {
                resolve(payload(null, options));
            }
        });
        return p;
    };
    /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    BingLayerBase.prototype.DeleteLayer = /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
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
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    BingLayerBase.prototype.GetNativeLayer = /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
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
     * @memberof BingLayerBase
     */
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    BingLayerBase.prototype.GetLayerById = /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
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
    return BingLayerBase;
}());
/**
 * This abstract partially implements the contract for the {\@link LayerService}
 * and {\@link ClusterService} for the Bing Maps V8 archtiecture. It serves
 * as the base class for basic layer ({\@link BingLayerService}) and cluster layer ({\@link BingClusterLayer}).
 *
 * @export
 * @abstract
 * @abstract
 */
export { BingLayerBase };
if (false) {
    /** @type {?} */
    BingLayerBase.prototype._layers;
    /** @type {?} */
    BingLayerBase.prototype._mapService;
    /** @type {?} */
    BingLayerBase.prototype._zone;
    /**
     * Adds a layer to the map.
     *
     * @abstract
     * \@memberof BingLayerBase
     * @abstract
     * @param {?} layer - MapLayerDirective component object.
     * Generally, MapLayerDirective will be injected with an instance of the
     * LayerService and then self register on initialization.
     *
     * @return {?}
     */
    BingLayerBase.prototype.AddLayer = function (layer) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQVVyRDs7Ozs7Ozs7O0FBQUE7SUFRSSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7T0FLRztJQUNILHVCQUFzQixXQUF1QixFQUFZLEtBQWE7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO3VCQVpyQixJQUFJLEdBQUcsRUFBMEI7S0FZUDs7Ozs7Ozs7OztJQTJCcEUsb0NBQVk7Ozs7Ozs7OztjQUFDLEtBQWEsRUFBRSxPQUF1Qjs7UUFDdEQsSUFBTSxPQUFPLEdBQUcsVUFBQyxJQUFZLEVBQUUsQ0FBUTs7WUFDbkMsSUFBTSxHQUFHLEdBQTRCLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBQ3pGLElBQU0sQ0FBQyxHQUFtQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUYsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQUU7O1lBQzNDLElBQU0sT0FBTyxHQUEyQixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDM0UsSUFBTSxNQUFNLEdBQWUsSUFBSSxVQUFV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S0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFvQixLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RDtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7O0lBR2IsR0FBRztJQUNILHFCQUFxQjtJQUNyQixHQUFHO0lBRUg7Ozs7Ozs7O09BUUc7Ozs7Ozs7Ozs7SUFDTyxvQ0FBWTs7Ozs7Ozs7O0lBQXRCLFVBQXVCLEVBQVU7O1FBQzdCLElBQUksQ0FBQyxDQUFpQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQWlCLEVBQUUsQ0FBUyxJQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjt3QkE1TUw7SUE4TUMsQ0FBQTs7Ozs7Ozs7OztBQXpMRCx5QkF5TEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyJztcbmltcG9ydCB7IEJpbmdNYXJrZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLW1hcmtlcic7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXJUeXBlSWQgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWFya2VyLXR5cGUtaWQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcExheWVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tYXAtbGF5ZXInO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4vYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuL2JpbmctY29udmVyc2lvbnMnO1xuXG4vKipcbiAqIFRoaXMgYWJzdHJhY3QgcGFydGlhbGx5IGltcGxlbWVudHMgdGhlIGNvbnRyYWN0IGZvciB0aGUge0BsaW5rIExheWVyU2VydmljZX1cbiAqIGFuZCB7QGxpbmsgQ2x1c3RlclNlcnZpY2V9IGZvciB0aGUgQmluZyBNYXBzIFY4IGFyY2h0aWVjdHVyZS4gSXQgc2VydmVzXG4gKiBhcyB0aGUgYmFzZSBjbGFzcyBmb3IgYmFzaWMgbGF5ZXIgKHtAbGluayBCaW5nTGF5ZXJTZXJ2aWNlfSkgYW5kIGNsdXN0ZXIgbGF5ZXIgKHtAbGluayBCaW5nQ2x1c3RlckxheWVyfSkuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCaW5nTGF5ZXJCYXNlIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIHByb3RlY3RlZCBfbGF5ZXJzOiBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4gPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZTxMYXllcj4+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ0xheWVyQmFzZS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmV0ZSB7QGxpbmsgTWFwU2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIEJpbmcgTWFwcyBWOC4gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEJpbmdNYXBTZXJ2aWNlfS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLCBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsYXllciB0byB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxheWVyIC0gTWFwTGF5ZXJEaXJlY3RpdmUgY29tcG9uZW50IG9iamVjdC5cbiAgICAgKiBHZW5lcmFsbHksIE1hcExheWVyRGlyZWN0aXZlIHdpbGwgYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGVcbiAgICAgKiBMYXllclNlcnZpY2UgYW5kIHRoZW4gc2VsZiByZWdpc3RlciBvbiBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWFya2VyIGluIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIFRoZSBJZCBvZiB0aGUgbGF5ZXIgaW4gd2hpY2ggdG8gY3JlYXRlIHRoZSBtYXJrZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUge0BsaW5rIE1hcmtlcn0gbW9kZWwgZm9yIHRoZSBjcmVhdGVkIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcihsYXllcjogbnVtYmVyLCBvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IFByb21pc2U8TWFya2VyPiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoaWNvbjogc3RyaW5nLCBsOiBMYXllcik6IEJpbmdNYXJrZXIgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihvcHRpb25zLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycpIHsgby5pY29uID0gaWNvbjsgfVxuICAgICAgICAgICAgY29uc3QgcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IG5ldyBNaWNyb3NvZnQuTWFwcy5QdXNocGluKGxvYywgbyk7XG4gICAgICAgICAgICBjb25zdCBtYXJrZXI6IEJpbmdNYXJrZXIgPSBuZXcgQmluZ01hcmtlcihwdXNocGluLCBudWxsLCBsLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgIG1hcmtlci5Jc0ZpcnN0ID0gb3B0aW9ucy5pc0ZpcnN0O1xuICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG9wdGlvbnMuaXNMYXN0O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWV0YWRhdGEpIHsgb3B0aW9ucy5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgbC5BZGRFbnRpdHkobWFya2VyKTtcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHA6IFByb21pc2U8TGF5ZXI+ID0gdGhpcy5HZXRMYXllckJ5SWQobGF5ZXIpO1xuICAgICAgICBpZiAocCA9PSBudWxsKSB7IHRocm93IChuZXcgRXJyb3IoYExheWVyIHdpdGggaWQgJHtsYXllcn0gbm90IGZvdW5kIGluIExheWVyIE1hcGApKTsgfVxuICAgICAgICByZXR1cm4gcC50aGVuKChsOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaWNvbkluZm8gJiYgb3B0aW9ucy5pY29uSW5mby5tYXJrZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIob3B0aW9ucy5pY29uSW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuKHBheWxvYWQocywgbCkpOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzLnRoZW4oeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ocGF5bG9hZCh4Lmljb24sIGwpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChwYXlsb2FkKG51bGwsIGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmJvdW5kIG1hcmtlcnMuIFVzZSB0aGlzIG1ldGhvZCB0byBjcmVhdGUgYXJyYXlzIG9mIG1hcmtlcnMgdG8gYmUgdXNlZCBpbiBidWxrXG4gICAgICogb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTWFya2VyIG9wdGlvbnMgZGVmaW5pbmcgdGhlIG1hcmtlcnMuXG4gICAgICogQHBhcmFtIG1hcmtlckljb24gLSBPcHRpb25hbCBpbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBjdXN0b20gbWFya2Vycy4gVGhpcyB3aWxsIGJlIGFwcGxpZWQgdG8gYWxsIG1hcmtlcnMuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIGFuIGFycmF5cyBvZiB0aGUgTWFya2VyIG1vZGVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIENyZWF0ZU1hcmtlcnMob3B0aW9uczogQXJyYXk8SU1hcmtlck9wdGlvbnM+LCBtYXJrZXJJY29uPzogSU1hcmtlckljb25JbmZvKTogUHJvbWlzZTxBcnJheTxNYXJrZXI+PiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSAoaWNvbjogc3RyaW5nLCBvcDogQXJyYXk8SU1hcmtlck9wdGlvbnM+KTogQXJyYXk8QmluZ01hcmtlcj4gPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFya2VyczogQXJyYXk8QmluZ01hcmtlcj4gPSBvcC5tYXAobW8gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMobW8pO1xuICAgICAgICAgICAgICAgIGlmIChpY29uICYmIGljb24gIT09ICcnICkgeyBzID0gaWNvbjsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG8uaWNvbikge1xuICAgICAgICAgICAgICAgICAgICBzID0gby5pY29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoby5pY29uKSB7IGRlbGV0ZSBvLmljb247IH1cbiAgICAgICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG1vLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwdXNocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gbmV3IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4obG9jLCBvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBNYXJrZXIuR2V0SW1hZ2VGb3JNYXJrZXIocyk7XG4gICAgICAgICAgICAgICAgaWYgKGltZyAhPSBudWxsKSB7ICg8YW55PnB1c2hwaW4pLmltYWdlID0gaW1nOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXI6IEJpbmdNYXJrZXIgPSBuZXcgQmluZ01hcmtlcihwdXNocGluLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICBtYXJrZXIuSXNGaXJzdCA9IG1vLmlzRmlyc3Q7XG4gICAgICAgICAgICAgICAgbWFya2VyLklzTGFzdCA9IG1vLmlzTGFzdDtcbiAgICAgICAgICAgICAgICBpZiAobW8ubWV0YWRhdGEpIHsgbW8ubWV0YWRhdGEuZm9yRWFjaCgodiwgaykgPT4gbWFya2VyLk1ldGFkYXRhLnNldChrLCB2KSk7IH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbWFya2VycztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxBcnJheTxNYXJrZXI+PiA9IG5ldyBQcm9taXNlPEFycmF5PE1hcmtlcj4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtYXJrZXJJY29uICYmIG1hcmtlckljb24ubWFya2VyVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBNYXJrZXIuQ3JlYXRlTWFya2VyKG1hcmtlckljb24pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocykgPT09ICdzdHJpbmcnKSB7IHJlc29sdmUocGF5bG9hZChzLCBvcHRpb25zKSk7IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGF5bG9hZCh4Lmljb24sIG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXlsb2FkKG51bGwsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGxheWVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGxheWVyIGhhcyBiZWVuIHJlbW92ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGVMYXllcihsYXllcjogTWFwTGF5ZXJEaXJlY3RpdmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIuSWQpO1xuICAgICAgICBpZiAobCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwudGhlbigobDE6IExheWVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGwxLkRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIuSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIExheWVyIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0IG9yIExheWVyIElkIGZvciB3aGljaCB0byByZXRyaWV2ZSB0aGUgbGF5ZXIgbW9kZWwuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIHJlc29sdmVkIGNvbnRhaW5zIHRoZSBMYXllciBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIEdldE5hdGl2ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZXxudW1iZXIpOiBQcm9taXNlPExheWVyPiB7XG4gICAgICAgIGxldCBwOiBQcm9taXNlPExheWVyPiA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YobGF5ZXIpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcCA9IHRoaXMuX2xheWVycy5nZXQobGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcCA9IHRoaXMuX2xheWVycy5nZXQoKDxNYXBMYXllckRpcmVjdGl2ZT5sYXllcikuSWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbGF5ZXIgYmFzZWQgb24gaXRzIGlkLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBwYXJhbSBpZCAtIExheWVyIElkLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTGF5ZXJ9IG1vZGVsIGZvciB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0xheWVyQmFzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRMYXllckJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+O1xuICAgICAgICB0aGlzLl9sYXllcnMuZm9yRWFjaCgobDogUHJvbWlzZTxMYXllcj4sIGs6IG51bWJlcikgPT4geyBpZiAoayA9PT0gaWQpIHsgcCA9IGw7IH0gfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxufVxuIl19