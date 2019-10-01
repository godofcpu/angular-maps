/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapLabel } from '../map-label';
import { Extender } from '../extender';
/** @type {?} */
let id = 0;
/**
 * Implements map a labled to be placed on the map.
 *
 * @export
 */
export class BingMapLabel extends MapLabel {
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof BingMapLabel
     * @return {?}
     */
    get DefaultLabelStyle() {
        return {
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontColor: '#ffffff',
            strokeWeight: 2,
            strokeColor: '#000000'
        };
    }
    /**
     * Creates a new MapLabel
     * @param {?} options Optional properties to set.
     */
    constructor(options) {
        options["fontSize"] = options["fontSize"] || 12;
        options["fontColor"] = options["fontColor"] || '#ffffff';
        options["strokeWeight"] = options["strokeWeight"] || 2;
        options["strokeColor"] = options["strokeColor"] || '#000000';
        super(options);
        (/** @type {?} */ (this))._options.beneathLabels = false;
    }
    /**
     * Gets the value of a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    Get(key) {
        return (/** @type {?} */ (this))[key];
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    GetMap() {
        if (typeof (/** @type {?} */ (this)).getMap === 'function') {
            return (/** @type {?} */ (this)).getMap();
        }
        return null;
    }
    /**
     * Set the value for a setting.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    Set(key, val) {
        if (key === 'position' && !val.hasOwnProperty('altitude') && val.hasOwnProperty('latitude') && val.hasOwnProperty('longitude')) {
            val = new Microsoft.Maps.Location(val.latitude, val.longitude);
        }
        if (this.Get(key) !== val) {
            (/** @type {?} */ (this))[key] = val;
            this.Changed(key);
        }
    }
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    SetMap(map) {
        /** @type {?} */
        const m = this.GetMap();
        if (map === m) {
            return;
        }
        if (m) {
            m.layers.remove(this);
        }
        if (map != null) {
            map.layers.insert(this);
        }
    }
    /**
     * Applies settings to the object
     *
     * \@memberof BingMapLabel
     * \@method
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    SetValues(options) {
        /** @type {?} */
        const p = new Array();
        for (const key in options) {
            if (key !== '') {
                if (key === 'position' && !options[key].hasOwnProperty('altitude') &&
                    options[key].hasOwnProperty('latitude') && options[key].hasOwnProperty('longitude')) {
                    options[key] = new Microsoft.Maps.Location(options[key].latitude, options[key].longitude);
                }
                if (this.Get(key) !== options[key]) {
                    (/** @type {?} */ (this))[key] = options[key];
                    p.push(key);
                }
            }
        }
        if (p.length > 0) {
            this.Changed(p);
        }
    }
    /**
     * Draws the label on the map.
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    Draw() {
        /** @type {?} */
        const visibility = this.GetVisible();
        /** @type {?} */
        const m = this.GetMap();
        if (!this._canvas) {
            return;
        }
        if (!m) {
            return;
        }
        /** @type {?} */
        const style = this._canvas.style;
        if (visibility !== '') {
            // label is not visible, don't calculate positions etc.
            style['visibility'] = visibility;
            return;
        }
        /** @type {?} */
        let offset = this.Get('offset');
        /** @type {?} */
        const latLng = this.Get('position');
        if (!latLng) {
            return;
        }
        if (!offset) {
            offset = new Microsoft.Maps.Point(0, 0);
        }
        /** @type {?} */
        const pos = /** @type {?} */ (m.tryLocationToPixel(latLng, Microsoft.Maps.PixelReference.control));
        style['top'] = (pos.y + offset.y) + 'px';
        style['left'] = (pos.x + offset.x) + 'px';
        style['visibility'] = visibility;
    }
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof BingMapLabel
     * \@method
     * @protected
     * @return {?}
     */
    OnAdd() {
        this._canvas = document.createElement('canvas');
        this._canvas.id = `xMapLabel${id++}`;
        /** @type {?} */
        const style = this._canvas.style;
        style.position = 'absolute';
        /** @type {?} */
        const ctx = this._canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        (/** @type {?} */ (this)).setHtmlElement(this._canvas);
    }
    /**
     * Delegate callled when the label is loaded
     * \@memberof BingMapLabel
     * \@method
     * @return {?}
     */
    OnLoad() {
        Microsoft.Maps.Events.addHandler(this.GetMap(), 'viewchange', () => {
            this.Changed('position');
        });
        this.DrawCanvas();
        this.Draw();
    }
}
/**
 * Helper function to extend the CustomOverlay into the MapLabel
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinMapLabelWithOverlayView() {
    new Extender(BingMapLabel)
        .Extend(new Microsoft.Maps.CustomOverlay())
        .Map('onAdd', 'OnAdd')
        .Map('onLoad', 'OnLoad')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRXZDLElBQUksRUFBRSxHQUFXLENBQUMsQ0FBQzs7Ozs7O0FBT25CLE1BQU0sbUJBQW9CLFNBQVEsUUFBUTs7Ozs7Ozs7O1FBUzNCLGlCQUFpQjtRQUN4QixNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFNBQVM7U0FDekIsQ0FBQzs7Ozs7O0lBV04sWUFBWSxPQUErQjtRQUN2QyxPQUFPLGVBQVksT0FBTyxnQkFBYSxFQUFFLENBQUM7UUFDMUMsT0FBTyxnQkFBYSxPQUFPLGlCQUFjLFNBQVMsQ0FBQztRQUNuRCxPQUFPLG1CQUFnQixPQUFPLG9CQUFpQixDQUFDLENBQUM7UUFDakQsT0FBTyxrQkFBZSxPQUFPLG1CQUFnQixTQUFTLENBQUM7UUFDdkQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsbUJBQU0sSUFBSSxFQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7S0FDOUM7Ozs7Ozs7OztJQWNNLEdBQUcsQ0FBQyxHQUFXO1FBQ2xCLE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JCLE1BQU07UUFDVCxFQUFFLENBQUMsQ0FBQyxPQUFPLG1CQUFNLElBQUksRUFBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLG1CQUFN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TyxFQUFFLE9BQU8sQ0FBQztTQUNyQixHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztTQUN2QixHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IElMYWJlbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYWJlbC1vcHRpb25zJztcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbWFwLWxhYmVsJztcbmltcG9ydCB7IEV4dGVuZGVyIH0gZnJvbSAnLi4vZXh0ZW5kZXInO1xuXG5sZXQgaWQ6IG51bWJlciA9IDA7XG5cbi8qKlxuICogSW1wbGVtZW50cyBtYXAgYSBsYWJsZWQgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgQmluZ01hcExhYmVsIGV4dGVuZHMgTWFwTGFiZWwge1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBsYWJlbCBzdHlsZSBmb3IgdGhlIHBsYXRmb3JtXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBEZWZhdWx0TGFiZWxTdHlsZSgpOiBJTGFiZWxPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICcjMDAwMDAwJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNYXBMYWJlbFxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgfHwgMTI7XG4gICAgICAgIG9wdGlvbnMuZm9udENvbG9yID0gb3B0aW9ucy5mb250Q29sb3IgfHwgJyNmZmZmZmYnO1xuICAgICAgICBvcHRpb25zLnN0cm9rZVdlaWdodCA9IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0IHx8IDI7XG4gICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJztcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgICg8YW55PnRoaXMpLl9vcHRpb25zLmJlbmVhdGhMYWJlbHMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIGEgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cbiAgICAgKiBAcmV0dXJucyAtIFRoZSB2YWx1ZSBvZiB0aGUgc2V0dGluZy5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBHZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcylba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TWFwKCk6IE1pY3Jvc29mdC5NYXBzLk1hcCB7XG4gICAgICAgIGlmICh0eXBlb2YgKDxhbnk+dGhpcykuZ2V0TWFwID09PSAnZnVuY3Rpb24nKSB7IHJldHVybiAoPGFueT50aGlzKS5nZXRNYXAoKTsgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGZvciBhIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IC0gS2V5IHNwZWNpZnlpbmcgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIHZhbCAtIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoa2V5ID09PSAncG9zaXRpb24nICYmICF2YWwuaGFzT3duUHJvcGVydHkoJ2FsdGl0dWRlJykgJiYgdmFsLmhhc093blByb3BlcnR5KCdsYXRpdHVkZScpICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSgnbG9uZ2l0dWRlJykpIHtcbiAgICAgICAgICAgIHZhbCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbih2YWwubGF0aXR1ZGUsIHZhbC5sb25naXR1ZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLkdldChrZXkpICE9PSB2YWwpIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMpW2tleV0gPSB2YWw7XG4gICAgICAgICAgICB0aGlzLkNoYW5nZWQoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcCBmb3IgdGhlIGxhYmVsLiBTZXR0aW5ncyB0aGlzIHRvIG51bGwgcmVtb3ZlIHRoZSBsYWJlbCBmcm9tIGh0ZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0gTWFwIHRvIGFzc29jaWF0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0TWFwKG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9IHRoaXMuR2V0TWFwKCk7XG4gICAgICAgIGlmIChtYXAgPT09IG0pIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICBtLmxheWVycy5yZW1vdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcCAhPSBudWxsKSB7XG4gICAgICAgICAgICBtYXAubGF5ZXJzLmluc2VydCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgc2V0dGluZ3MgdG8gdGhlIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgc2V0dGluZ3Mga2V5IHZhbHVlIHBhaXJzLlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIFNldFZhbHVlcyhvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHA6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb3NpdGlvbicgJiYgIW9wdGlvbnNba2V5XS5oYXNPd25Qcm9wZXJ0eSgnYWx0aXR1ZGUnKSAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0uaGFzT3duUHJvcGVydHkoJ2xhdGl0dWRlJykgJiYgb3B0aW9uc1trZXldLmhhc093blByb3BlcnR5KCdsb25naXR1ZGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24ob3B0aW9uc1trZXldLmxhdGl0dWRlLCBvcHRpb25zW2tleV0ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2V0KGtleSkgIT09IG9wdGlvbnNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoPGFueT50aGlzKVtrZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBwLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHAubGVuZ3RoID4gMCkgeyB0aGlzLkNoYW5nZWQocCk7IH1cbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIERyYXdzIHRoZSBsYWJlbCBvbiB0aGUgbWFwLlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBEcmF3KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5OiBzdHJpbmcgPSB0aGlzLkdldFZpc2libGUoKTtcbiAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gdGhpcy5HZXRNYXAoKTtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW52YXMpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICghbSkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSB0aGlzLl9jYW52YXMuc3R5bGU7XG4gICAgICAgIGlmICh2aXNpYmlsaXR5ICE9PSAnJykge1xuICAgICAgICAgICAgLy8gbGFiZWwgaXMgbm90IHZpc2libGUsIGRvbid0IGNhbGN1bGF0ZSBwb3NpdGlvbnMgZXRjLlxuICAgICAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2Zmc2V0OiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IHRoaXMuR2V0KCdvZmZzZXQnKTtcbiAgICAgICAgY29uc3QgbGF0TG5nOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IHRoaXMuR2V0KCdwb3NpdGlvbicpO1xuICAgICAgICBpZiAoIWxhdExuZykgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCFvZmZzZXQpIHsgb2Zmc2V0ID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KDAsIDApOyB9XG5cbiAgICAgICAgY29uc3QgcG9zOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IDxNaWNyb3NvZnQuTWFwcy5Qb2ludD5tLnRyeUxvY2F0aW9uVG9QaXhlbChcbiAgICAgICAgICAgIGxhdExuZyxcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xuICAgICAgICBzdHlsZVsndG9wJ10gPSAocG9zLnkgKyBvZmZzZXQueSkgKyAncHgnO1xuICAgICAgICBzdHlsZVsnbGVmdCddID0gKHBvcy54ICsgb2Zmc2V0LngpICsgJ3B4JztcbiAgICAgICAgc3R5bGVbJ3Zpc2liaWxpdHknXSA9IHZpc2liaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgY2FsbGVkIHdoZW4gdGhlIGxhYmVsIGlzIGFkZGVkIHRvIHRoZSBtYXAuIEdlbmVyYXRlcyBhbmQgY29uZmlndXJlc1xuICAgICAqIHRoZSBjYW52YXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgT25BZGQoKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMuaWQgPSBgeE1hcExhYmVsJHtpZCsrfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gdGhpcy5fY2FudmFzLnN0eWxlO1xuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG4gICAgICAgICg8YW55PnRoaXMpLnNldEh0bWxFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgY2FsbGxlZCB3aGVuIHRoZSBsYWJlbCBpcyBsb2FkZWRcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHByaXZhdGUgT25Mb2FkKCkge1xuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLkdldE1hcCgpLCAndmlld2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlZCgncG9zaXRpb24nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuRHJhd0NhbnZhcygpO1xuICAgICAgICB0aGlzLkRyYXcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGV4dGVuZCB0aGUgQ3VzdG9tT3ZlcmxheSBpbnRvIHRoZSBNYXBMYWJlbFxuICpcbiAqIEBleHBvcnRcbiAqIEBtZXRob2RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1peGluTWFwTGFiZWxXaXRoT3ZlcmxheVZpZXcoKSB7XG4gICAgbmV3IEV4dGVuZGVyKEJpbmdNYXBMYWJlbClcbiAgICAuRXh0ZW5kKG5ldyBNaWNyb3NvZnQuTWFwcy5DdXN0b21PdmVybGF5KCkpXG4gICAgLk1hcCgnb25BZGQnLCAnT25BZGQnKVxuICAgIC5NYXAoJ29uTG9hZCcsICdPbkxvYWQnKVxuICAgIC5NYXAoJ29uUmVtb3ZlJywgJ09uUmVtb3ZlJyk7XG59XG4iXX0=