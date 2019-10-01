/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
var /**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
GoogleMapLabel = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleMapLabel, _super);
    ///
    /// Constructor
    ///
    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    function GoogleMapLabel(options) {
        var _this = this;
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 3;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        _this = _super.call(this, options) || this;
        return _this;
    }
    Object.defineProperty(GoogleMapLabel.prototype, "DefaultLabelStyle", {
        get: /**
         * Returns the default label style for the platform
         *
         * \@readonly
         * @abstract
         * \@memberof GoogleMapLabel
         * @return {?}
         */
        function () {
            return {
                fontSize: 12,
                fontFamily: 'sans-serif',
                fontColor: '#ffffff',
                strokeWeight: 3,
                strokeColor: '#000000'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    GoogleMapLabel.prototype.Get = /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    function (key) {
        return (/** @type {?} */ (this)).get(key);
    };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    GoogleMapLabel.prototype.GetMap = /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this)).getMap();
    };
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    GoogleMapLabel.prototype.Set = /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    function (key, val) {
        if (key === 'position' && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new google.maps.LatLng(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this)).set(key, val);
        }
    };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    GoogleMapLabel.prototype.SetMap = /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    function (map) {
        (/** @type {?} */ (this)).setMap(map);
    };
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    GoogleMapLabel.prototype.SetValues = /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    function (options) {
        for (var key in options) {
            if (key !== '') {
                if (key === 'position' && options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new google.maps.LatLng(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) === options[key]) {
                    delete options[key];
                }
            }
        }
        (/** @type {?} */ (this)).setValues(options);
    };
    ///
    /// Protected methods
    ///
    /**
     * Draws the label on the map.
     * @memberof GoogleMapLabel
     * @method
     * @protected
     */
    /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    GoogleMapLabel.prototype.Draw = /**
     * Draws the label on the map.
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var projection = (/** @type {?} */ (this)).getProjection();
        /** @type {?} */
        var visibility = this.GetVisible();
        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }
        if (!this._canvas) {
            // onAdd has not been called yet.
            return;
        }
        /** @type {?} */
        var style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        /** @type {?} */
        var offset = this.Get('offset');
        /** @type {?} */
        var latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!(latLng instanceof google.maps.LatLng)) {
            latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        }
        if (!offset) {
            offset = new google.maps.Point(0, 0);
        }
        /** @type {?} */
        var pos = projection.fromLatLngToDivPixel(latLng);
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    };
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * @memberof GoogleMapLabel
     * @method
     * @protected
     */
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    GoogleMapLabel.prototype.OnAdd = /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof GoogleMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        this._canvas = document.createElement('canvas');
        /** @type {?} */
        var style = this._canvas.style;
        style.position = 'absolute';
        /** @type {?} */
        var ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        this.DrawCanvas();
        /** @type {?} */
        var panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            panes.overlayLayer.appendChild(this._canvas);
            // 4: floatPane (infowindow)
            // 3: overlayMouseTarget (mouse events)
            // 2: markerLayer (marker images)
            // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
            // 0: mapPane (lowest pane above the map tiles)
        }
    };
    return GoogleMapLabel;
}(MapLabel));
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export { GoogleMapLabel };
/**
 * Helper function to extend the OverlayView into the MapLabel
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(GoogleMapLabel)
        .Extend(new google.maps.OverlayView)
        .Map('changed', 'Changed')
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'Draw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFVdkM7Ozs7O0FBQUE7SUFBb0MsMENBQVE7SUFtQnhDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7T0FHRztJQUNILHdCQUFZLE9BQStCO1FBQTNDLGlCQU1DO1FBTEcsT0FBTyxlQUFZLE9BQU8sZ0JBQWEsRUFBRSxDQUFDO1FBQzFDLE9BQU8sZ0JBQWEsT0FBTyxpQkFBYyxTQUFTLENBQUM7UUFDbkQsT0FBTyxtQkFBZ0IsT0FBTyxvQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sa0JBQWUsT0FBTyxtQkFBZ0IsU0FBUyxDQUFDO1FBQ3ZELFFBQUEsa0JBQU0sT0FBTyxDQUFDLFNBQUM7O0tBQ2xCOzBCQXhCVSw2Q0FBaUI7Ozs7Ozs7Ozs7WUFDeEIsTUFBTSxDQUFDO2dCQUNILFFBQVEsRUFBRSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLEVBQUUsU0FBUztnQkFDcEIsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxFQUFFLFNBQVM7YUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7OztJQStCQyw0QkFBRzs7Ozs7Ozs7Y0FBQyxHQUFXO1FBQ2xCLE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7OztJQVN6QiwrQkFBTTs7Ozs7Ozs7UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLDRCQUFHOzs7Ozs7Ozs7Y0FBQyxH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QyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7UUFDbEIsSUFBTSxLQUFLLEdBQUcsbUJBQU0sSUFBSSxFQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7O1NBTWhEO0tBQ0o7eUJBNUxMO0VBYW9DLFFBQVEsRUFnTDNDLENBQUE7Ozs7OztBQWhMRCwwQkFnTEM7Ozs7Ozs7O0FBVUQsTUFBTTtJQUVGLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQztTQUN2QixNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNuQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztTQUN6QixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztTQUNyQixHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztTQUNuQixHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tYXAtbGFiZWwnO1xuaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xuaW1wb3J0IHsgRXh0ZW5kZXIgfSBmcm9tICcuLi9leHRlbmRlcic7XG5cblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbi8qKlxuICogSW1wbGVtZW50cyBtYXAgYSBsYWJsZWQgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwTGFiZWwgZXh0ZW5kcyBNYXBMYWJlbCB7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxhYmVsIHN0eWxlIGZvciB0aGUgcGxhdGZvcm1cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBMYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG4gICAgICAgICAgICBmb250Q29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnIzAwMDAwMCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBwcm9wZXJ0aWVzIHRvIHNldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgICAgIG9wdGlvbnMuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplIHx8IDEyO1xuICAgICAgICBvcHRpb25zLmZvbnRDb2xvciA9IG9wdGlvbnMuZm9udENvbG9yIHx8ICcjZmZmZmZmJztcbiAgICAgICAgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSBvcHRpb25zLnN0cm9rZVdlaWdodCB8fCAzO1xuICAgICAgICBvcHRpb25zLnN0cm9rZUNvbG9yID0gb3B0aW9ucy5zdHJva2VDb2xvciB8fCAnIzAwMDAwMCc7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYSBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxuICAgICAqIEByZXR1cm5zIC0gVGhlIHZhbHVlIG9mIHRoZSBzZXR0aW5nLlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuICg8YW55PnRoaXMpLmdldChrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIEdldE1hcCgpOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAge1xuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAncG9zaXRpb24nICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiB2YWwuaGFzT3duUHJvcGVydHkoJ2xvbmdpdHVkZScpKSB7XG4gICAgICAgICAgICB2YWwgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHZhbC5sYXRpdHVkZSwgdmFsLmxvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgIT09IHZhbCkge1xuICAgICAgICAgICAgKDxhbnk+dGhpcykuc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcCBmb3IgdGhlIGxhYmVsLiBTZXR0aW5ncyB0aGlzIHRvIG51bGwgcmVtb3ZlIHRoZSBsYWJlbCBmcm9tIGh0ZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0gTWFwIHRvIGFzc29jaWF0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRNYXAobWFwOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXApOiB2b2lkIHtcbiAgICAgICAgKDxhbnk+dGhpcykuc2V0TWFwKG1hcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBzZXR0aW5ncyB0byB0aGUgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBzZXR0aW5ncyBrZXkgdmFsdWUgcGFpcnMuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWYWx1ZXMob3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIG9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnbGF0aXR1ZGUnKSAmJiAgb3B0aW9uc1trZXldLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCBvcHRpb25zW2tleV0ubGF0aXR1ZGUsICBvcHRpb25zW2tleV0ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgPT09IG9wdGlvbnNba2V5XSkgeyBkZWxldGUgb3B0aW9uc1trZXldOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKDxhbnk+dGhpcykuc2V0VmFsdWVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIG9uIHRoZSBtYXAuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgRHJhdygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9ICg8YW55PnRoaXMpLmdldFByb2plY3Rpb24oKTtcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eTogc3RyaW5nID0gdGhpcy5HZXRWaXNpYmxlKCk7XG4gICAgICAgIGlmICghcHJvamVjdGlvbikge1xuICAgICAgICAgICAgLy8gVGhlIG1hcCBwcm9qZWN0aW9uIGlzIG5vdCByZWFkeSB5ZXQgc28gZG8gbm90aGluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY2FudmFzKSB7XG4gICAgICAgICAgICAvLyBvbkFkZCBoYXMgbm90IGJlZW4gY2FsbGVkIHlldC5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcbiAgICAgICAgaWYgKHZpc2liaWxpdHkgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBsYWJlbCBpcyBub3QgdmlzaWJsZSwgZG9uJ3QgY2FsY3VsYXRlIHBvc2l0aW9ucyBldGMuXG4gICAgICAgICAgICBzdHlsZVsndmlzaWJpbGl0eSddID0gdmlzaWJpbGl0eTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXQ6IEdvb2dsZU1hcFR5cGVzLlBvaW50ID0gdGhpcy5HZXQoJ29mZnNldCcpO1xuICAgICAgICBsZXQgbGF0TG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmd8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCA9IHRoaXMuR2V0KCdwb3NpdGlvbicpO1xuICAgICAgICBpZiAoIWxhdExuZykgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCEobGF0TG5nIGluc3RhbmNlb2YgZ29vZ2xlLm1hcHMuTGF0TG5nKSkgeyBsYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdExuZy5sYXQsIGxhdExuZy5sbmcpOyB9XG4gICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKTsgfVxuXG4gICAgICAgIGNvbnN0IHBvcyA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwobGF0TG5nKTtcbiAgICAgICAgc3R5bGVbJ3RvcCddID0gKHBvcy55ICsgb2Zmc2V0LnkpICsgJ3B4JztcbiAgICAgICAgc3R5bGVbJ2xlZnQnXSA9IChwb3MueCArIG9mZnNldC54KSArICdweCc7XG4gICAgICAgIHN0eWxlWyd2aXNpYmlsaXR5J10gPSB2aXNpYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGNhbGxlZCB3aGVuIHRoZSBsYWJlbCBpcyBhZGRlZCB0byB0aGUgbWFwLiBHZW5lcmF0ZXMgYW5kIGNvbmZpZ3VyZXNcbiAgICAgKiB0aGUgY2FudmFzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgT25BZGQoKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuICAgICAgICB0aGlzLkRyYXdDYW52YXMoKTtcbiAgICAgICAgY29uc3QgcGFuZXMgPSAoPGFueT50aGlzKS5nZXRQYW5lcygpO1xuICAgICAgICBpZiAocGFuZXMpIHtcbiAgICAgICAgICAgIHBhbmVzLm92ZXJsYXlMYXllci5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgIC8vIDQ6IGZsb2F0UGFuZSAoaW5mb3dpbmRvdylcbiAgICAgICAgICAgICAgICAvLyAzOiBvdmVybGF5TW91c2VUYXJnZXQgKG1vdXNlIGV2ZW50cylcbiAgICAgICAgICAgICAgICAvLyAyOiBtYXJrZXJMYXllciAobWFya2VyIGltYWdlcylcbiAgICAgICAgICAgICAgICAvLyAxOiBvdmVybGF5TGF5ZXIgKHBvbHlnb25zLCBwb2x5bGluZXMsIGdyb3VuZCBvdmVybGF5cywgdGlsZSBsYXllciBvdmVybGF5cylcbiAgICAgICAgICAgICAgICAvLyAwOiBtYXBQYW5lIChsb3dlc3QgcGFuZSBhYm92ZSB0aGUgbWFwIHRpbGVzKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBleHRlbmQgdGhlIE92ZXJsYXlWaWV3IGludG8gdGhlIE1hcExhYmVsXG4gKlxuICogQGV4cG9ydFxuICogQG1ldGhvZFxuICovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKSB7XG5cbiAgICBuZXcgRXh0ZW5kZXIoR29vZ2xlTWFwTGFiZWwpXG4gICAgICAgIC5FeHRlbmQobmV3IGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KVxuICAgICAgICAuTWFwKCdjaGFuZ2VkJywgJ0NoYW5nZWQnKVxuICAgICAgICAuTWFwKCdvbkFkZCcsICdPbkFkZCcpXG4gICAgICAgIC5NYXAoJ2RyYXcnLCAnRHJhdycpXG4gICAgICAgIC5NYXAoJ29uUmVtb3ZlJywgJ09uUmVtb3ZlJyk7XG59XG4iXX0=