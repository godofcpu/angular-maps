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
export class BingLayerBase {
    /**
     * Creates an instance of BingLayerBase.
     * \@memberof BingLayerBase
     * @param {?} _mapService - Concrete {\@link MapService} implementation for Bing Maps V8. An instance of {\@link BingMapService}.
     *
     * @param {?} _zone
     */
    constructor(_mapService, _zone) {
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
    CreateMarker(layer, options) {
        /** @type {?} */
        const payload = (icon, l) => {
            /** @type {?} */
            const loc = BingConversions.TranslateLocation(options.position);
            /** @type {?} */
            const o = BingConversions.TranslateMarkerOptions(options);
            if (icon && icon !== '') {
                o.icon = icon;
            }
            /** @type {?} */
            const pushpin = new Microsoft.Maps.Pushpin(loc, o);
            /** @type {?} */
            const marker = new BingMarker(pushpin, null, l.NativePrimitve);
            marker.IsFirst = options.isFirst;
            marker.IsLast = options.isLast;
            if (options.metadata) {
                options.metadata.forEach((v, k) => marker.Metadata.set(k, v));
            }
            l.AddEntity(marker);
            return marker;
        };
        /** @type {?} */
        const p = this.GetLayerById(layer);
        if (p == null) {
            throw (new Error(`Layer with id ${layer} not found in Layer Map`));
        }
        return p.then((l) => {
            if (options.iconInfo && options.iconInfo.markerType) {
                /** @type {?} */
                const s = Marker.CreateMarker(options.iconInfo);
                if (typeof (s) === 'string') {
                    return (payload(s, l));
                }
                else {
                    return s.then(x => {
                        return (payload(x.icon, l));
                    });
                }
            }
            else {
                return (payload(null, l));
            }
        });
    }
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
    CreateMarkers(options, markerIcon) {
        /** @type {?} */
        const payload = (icon, op) => {
            /** @type {?} */
            const markers = op.map(mo => {
                /** @type {?} */
                let s;
                /** @type {?} */
                const o = BingConversions.TranslateMarkerOptions(mo);
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
                const loc = BingConversions.TranslateLocation(mo.position);
                /** @type {?} */
                const pushpin = new Microsoft.Maps.Pushpin(loc, o);
                /** @type {?} */
                const img = Marker.GetImageForMarker(s);
                if (img != null) {
                    (/** @type {?} */ (pushpin)).image = img;
                }
                /** @type {?} */
                const marker = new BingMarker(pushpin, null, null);
                marker.IsFirst = mo.isFirst;
                marker.IsLast = mo.isLast;
                if (mo.metadata) {
                    mo.metadata.forEach((v, k) => marker.Metadata.set(k, v));
                }
                return marker;
            });
            return markers;
        };
        /** @type {?} */
        const p = new Promise((resolve, reject) => {
            if (markerIcon && markerIcon.markerType) {
                /** @type {?} */
                const s = Marker.CreateMarker(markerIcon);
                if (typeof (s) === 'string') {
                    resolve(payload(s, options));
                }
                else {
                    return s.then(x => {
                        resolve(payload(x.icon, options));
                    });
                }
            }
            else {
                resolve(payload(null, options));
            }
        });
        return p;
    }
    /**
     * Deletes the layer
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object for which to retrieve the layer.
     * @return {?} - A promise that is fullfilled when the layer has been removed.
     *
     */
    DeleteLayer(layer) {
        /** @type {?} */
        const l = this._layers.get(layer.Id);
        if (l == null) {
            return Promise.resolve();
        }
        return l.then((l1) => {
            return this._zone.run(() => {
                l1.Delete();
                this._layers.delete(layer.Id);
            });
        });
    }
    /**
     * Returns the Layer model represented by this layer.
     *
     * \@memberof BingLayerBase
     * @param {?} layer - MapLayerDirective component object or Layer Id for which to retrieve the layer model.
     * @return {?} - A promise that when resolved contains the Layer model.
     *
     */
    GetNativeLayer(layer) {
        /** @type {?} */
        let p = null;
        if (typeof (layer) === 'number') {
            p = this._layers.get(layer);
        }
        else {
            p = this._layers.get((/** @type {?} */ (layer)).Id);
        }
        return p;
    }
    /**
     * Gets the layer based on its id.
     *
     * @protected
     * \@memberof BingLayerBase
     * @param {?} id - Layer Id.
     * @return {?} - A promise that when fullfilled contains the {\@link Layer} model for the layer.
     *
     */
    GetLayerById(id) {
        /** @type {?} */
        let p;
        this._layers.forEach((l, k) => { if (k === id) {
            p = l;
        } });
        return p;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYXllci1iYXNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1sYXllci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBTzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7OztBQVVyRCxNQUFNOzs7Ozs7OztJQWtCRixZQUFzQixXQUF1QixFQUFZLEtBQWE7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFRO3VCQVpyQixJQUFJLEdBQUcsRUFBMEI7S0FZUDs7Ozs7Ozs7OztJQTJCcEUsWUFBWSxDQUFDLEtBQWEsRUFBRSxPQUF1Qjs7UUFDdEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsQ0FBUSxFQUFjLEVBQUU7O1lBQ25ELE1BQU0sR0FBRyxHQUE0QixlQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUN6RixNQUFNLENBQUMsR0FBbUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUFFOztZQUMzQyxNQUFNLE9BQU8sR0FBMkIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBQzNFLE1BQU0sTUFBTSxHQUFlLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FB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LENBQUM7WUFDN0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW9CLEtBQUssRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFnQkgsWUFBWSxDQUFDLEVBQVU7O1FBQzdCLElBQUksQ0FBQyxDQUFpQjtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQWlCLEVBQUUsQ0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRSxFQUFFLENBQUMsQ0FBQztRQUNyRixNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgQmluZ01hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9iaW5nL2JpbmctbWFya2VyJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xheWVyJztcbmltcG9ydCB7IE1hcmtlclR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXItdHlwZS1pZCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwTGF5ZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL21hcC1sYXllcic7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdNYXBTZXJ2aWNlIH0gZnJvbSAnLi9iaW5nLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4vYmluZy1jb252ZXJzaW9ucyc7XG5cbi8qKlxuICogVGhpcyBhYnN0cmFjdCBwYXJ0aWFsbHkgaW1wbGVtZW50cyB0aGUgY29udHJhY3QgZm9yIHRoZSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfVxuICogYW5kIHtAbGluayBDbHVzdGVyU2VydmljZX0gZm9yIHRoZSBCaW5nIE1hcHMgVjggYXJjaHRpZWN0dXJlLiBJdCBzZXJ2ZXNcbiAqIGFzIHRoZSBiYXNlIGNsYXNzIGZvciBiYXNpYyBsYXllciAoe0BsaW5rIEJpbmdMYXllclNlcnZpY2V9KSBhbmQgY2x1c3RlciBsYXllciAoe0BsaW5rIEJpbmdDbHVzdGVyTGF5ZXJ9KS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJpbmdMYXllckJhc2Uge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgcHJvdGVjdGVkIF9sYXllcnM6IE1hcDxudW1iZXIsIFByb21pc2U8TGF5ZXI+PiA9IG5ldyBNYXA8bnVtYmVyLCBQcm9taXNlPExheWVyPj4oKTtcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTGF5ZXJCYXNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgQmluZyBNYXBzIFY4LiBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsIHByb3RlY3RlZCBfem9uZTogTmdab25lKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxheWVyIHRvIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBNYXBMYXllckRpcmVjdGl2ZSBjb21wb25lbnQgb2JqZWN0LlxuICAgICAqIEdlbmVyYWxseSwgTWFwTGF5ZXJEaXJlY3RpdmUgd2lsbCBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZVxuICAgICAqIExheWVyU2VydmljZSBhbmQgdGhlbiBzZWxmIHJlZ2lzdGVyIG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXJrZXIgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxheWVyIC0gVGhlIElkIG9mIHRoZSBsYXllciBpbiB3aGljaCB0byBjcmVhdGUgdGhlIG1hcmtlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTWFya2VyT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcmtlciBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgd2hlbiBmdWxsZmlsbGVkIGNvbnRhaW5zIHRoZSB7QGxpbmsgTWFya2VyfSBtb2RlbCBmb3IgdGhlIGNyZWF0ZWQgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VyKGxheWVyOiBudW1iZXIsIG9wdGlvbnM6IElNYXJrZXJPcHRpb25zKTogUHJvbWlzZTxNYXJrZXI+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIGw6IExheWVyKTogQmluZ01hcmtlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2M6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMucG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoaWNvbiAmJiBpY29uICE9PSAnJykgeyBvLmljb24gPSBpY29uOyB9XG4gICAgICAgICAgICBjb25zdCBwdXNocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gbmV3IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4obG9jLCBvKTtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG51bGwsIGwuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgbWFya2VyLklzRmlyc3QgPSBvcHRpb25zLmlzRmlyc3Q7XG4gICAgICAgICAgICBtYXJrZXIuSXNMYXN0ID0gb3B0aW9ucy5pc0xhc3Q7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tZXRhZGF0YSkgeyBvcHRpb25zLm1ldGFkYXRhLmZvckVhY2goKHYsIGspID0+IG1hcmtlci5NZXRhZGF0YS5zZXQoaywgdikpOyB9XG4gICAgICAgICAgICBsLkFkZEVudGl0eShtYXJrZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcDogUHJvbWlzZTxMYXllcj4gPSB0aGlzLkdldExheWVyQnlJZChsYXllcik7XG4gICAgICAgIGlmIChwID09IG51bGwpIHsgdGhyb3cgKG5ldyBFcnJvcihgTGF5ZXIgd2l0aCBpZCAke2xheWVyfSBub3QgZm91bmQgaW4gTGF5ZXIgTWFwYCkpOyB9XG4gICAgICAgIHJldHVybiBwLnRoZW4oKGw6IExheWVyKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pY29uSW5mbyAmJiBvcHRpb25zLmljb25JbmZvLm1hcmtlclR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gTWFya2VyLkNyZWF0ZU1hcmtlcihvcHRpb25zLmljb25JbmZvKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyByZXR1cm4ocGF5bG9hZChzLCBsKSk7IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMudGhlbih4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybihwYXlsb2FkKHguaWNvbiwgbCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBheWxvYWQobnVsbCwgbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuYm91bmQgbWFya2Vycy4gVXNlIHRoaXMgbWV0aG9kIHRvIGNyZWF0ZSBhcnJheXMgb2YgbWFya2VycyB0byBiZSB1c2VkIGluIGJ1bGtcbiAgICAgKiBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBNYXJrZXIgb3B0aW9ucyBkZWZpbmluZyB0aGUgbWFya2Vycy5cbiAgICAgKiBAcGFyYW0gbWFya2VySWNvbiAtIE9wdGlvbmFsIGluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGN1c3RvbSBtYXJrZXJzLiBUaGlzIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgbWFya2Vycy5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gZnVsbGZpbGxlZCBjb250YWlucyB0aGUgYW4gYXJyYXlzIG9mIHRoZSBNYXJrZXIgbW9kZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlTWFya2VycyhvcHRpb25zOiBBcnJheTxJTWFya2VyT3B0aW9ucz4sIG1hcmtlckljb24/OiBJTWFya2VySWNvbkluZm8pOiBQcm9taXNlPEFycmF5PE1hcmtlcj4+IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IChpY29uOiBzdHJpbmcsIG9wOiBBcnJheTxJTWFya2VyT3B0aW9ucz4pOiBBcnJheTxCaW5nTWFya2VyPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXJrZXJzOiBBcnJheTxCaW5nTWFya2VyPiA9IG9wLm1hcChtbyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHM6IHN0cmluZztcbiAgICAgICAgICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhtbyk7XG4gICAgICAgICAgICAgICAgaWYgKGljb24gJiYgaWNvbiAhPT0gJycgKSB7IHMgPSBpY29uOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoby5pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSBvLmljb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvLmljb24pIHsgZGVsZXRlIG8uaWNvbjsgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24obW8ucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHB1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MsIG8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IE1hcmtlci5HZXRJbWFnZUZvck1hcmtlcihzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW1nICE9IG51bGwpIHsgKDxhbnk+cHVzaHBpbikuaW1hZ2UgPSBpbWc7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlcjogQmluZ01hcmtlciA9IG5ldyBCaW5nTWFya2VyKHB1c2hwaW4sIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgIG1hcmtlci5Jc0ZpcnN0ID0gbW8uaXNGaXJzdDtcbiAgICAgICAgICAgICAgICBtYXJrZXIuSXNMYXN0ID0gbW8uaXNMYXN0O1xuICAgICAgICAgICAgICAgIGlmIChtby5tZXRhZGF0YSkgeyBtby5tZXRhZGF0YS5mb3JFYWNoKCh2LCBrKSA9PiBtYXJrZXIuTWV0YWRhdGEuc2V0KGssIHYpKTsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtYXJrZXJzO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwOiBQcm9taXNlPEFycmF5PE1hcmtlcj4+ID0gbmV3IFByb21pc2U8QXJyYXk8TWFya2VyPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1hcmtlckljb24gJiYgbWFya2VySWNvbi5tYXJrZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IE1hcmtlci5DcmVhdGVNYXJrZXIobWFya2VySWNvbik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihzKSA9PT0gJ3N0cmluZycpIHsgcmVzb2x2ZShwYXlsb2FkKHMsIG9wdGlvbnMpKTsgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcy50aGVuKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXlsb2FkKHguaWNvbiwgb3B0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBheWxvYWQobnVsbCwgb3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgbGF5ZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllci5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgbGF5ZXIgaGFzIGJlZW4gcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZUxheWVyKGxheWVyOiBNYXBMYXllckRpcmVjdGl2ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5fbGF5ZXJzLmdldChsYXllci5JZCk7XG4gICAgICAgIGlmIChsID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbC50aGVuKChsMTogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbDEuRGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllci5JZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgTGF5ZXIgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXllciAtIE1hcExheWVyRGlyZWN0aXZlIGNvbXBvbmVudCBvYmplY3Qgb3IgTGF5ZXIgSWQgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRoZSBsYXllciBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIExheWVyIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdMYXllckJhc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TmF0aXZlTGF5ZXIobGF5ZXI6IE1hcExheWVyRGlyZWN0aXZlfG51bWJlcik6IFByb21pc2U8TGF5ZXI+IHtcbiAgICAgICAgbGV0IHA6IFByb21pc2U8TGF5ZXI+ID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZihsYXllcikgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBwID0gdGhpcy5fbGF5ZXJzLmdldChsYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwID0gdGhpcy5fbGF5ZXJzLmdldCgoPE1hcExheWVyRGlyZWN0aXZlPmxheWVyKS5JZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsYXllciBiYXNlZCBvbiBpdHMgaWQuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHBhcmFtIGlkIC0gTGF5ZXIgSWQuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgdGhlIHtAbGluayBMYXllcn0gbW9kZWwgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTGF5ZXJCYXNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIEdldExheWVyQnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxMYXllcj4ge1xuICAgICAgICBsZXQgcDogUHJvbWlzZTxMYXllcj47XG4gICAgICAgIHRoaXMuX2xheWVycy5mb3JFYWNoKChsOiBQcm9taXNlPExheWVyPiwgazogbnVtYmVyKSA9PiB7IGlmIChrID09PSBpZCkgeyBwID0gbDsgfSB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG59XG4iXX0=