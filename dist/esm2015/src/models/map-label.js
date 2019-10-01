/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export class MapLabel {
    /**
     * Creates a new MapLabel
     * @param {?} options Optional properties to set.
     */
    constructor(options) {
        this.Set('fontFamily', 'sans-serif');
        this.Set('fontSize', 12);
        this.Set('fontColor', '#ffffff');
        this.Set('strokeWeight', 4);
        this.Set('strokeColor', '#000000');
        this.Set('align', 'center');
        this.SetValues(options);
    }
    /**
     * Deletes the label from the map. This method does not atually delete the label itself, so
     * it can be readded to map later.
     * \@memberof MapLabel
     * \@method
     * @return {?}
     */
    Delete() {
        this.SetMap(null);
    }
    /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    Changed(prop) {
        /** @type {?} */
        let shouldRunDrawCanvas = false;
        /** @type {?} */
        let shouldRunDraw = false;
        if (!Array.isArray(prop)) {
            prop = [prop];
        }
        prop.forEach(p => {
            switch (p) {
                case 'fontFamily':
                case 'fontSize':
                case 'fontColor':
                case 'strokeWeight':
                case 'strokeColor':
                case 'align':
                case 'text':
                    shouldRunDrawCanvas = true;
                    break;
                case 'maxZoom':
                case 'minZoom':
                case 'offset':
                case 'hidden':
                case 'position':
                    shouldRunDraw = true;
                    break;
            }
        });
        if (shouldRunDrawCanvas) {
            this.DrawCanvas();
        }
        if (shouldRunDraw) {
            this.Draw();
        }
    }
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    GetVisible() {
        /** @type {?} */
        const minZoom = this.Get('minZoom');
        /** @type {?} */
        const maxZoom = this.Get('maxZoom');
        /** @type {?} */
        const hidden = this.Get('hidden');
        if (hidden) {
            return 'hidden';
        }
        if (minZoom === undefined && maxZoom === undefined) {
            return '';
        }
        if (!this.GetMap()) {
            return '';
        }
        /** @type {?} */
        const mapZoom = this.GetMap().getZoom();
        if (mapZoom < minZoom || mapZoom > maxZoom) {
            return 'hidden';
        }
        return '';
    }
    /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    DrawCanvas() {
        if (!this._canvas) {
            return;
        }
        /** @type {?} */
        const style = this._canvas.style;
        style.zIndex = this.Get('zIndex');
        /** @type {?} */
        const ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.strokeStyle = this.Get('strokeColor');
        ctx.font = this.Get('fontSize') + 'px ' + this.Get('fontFamily');
        /** @type {?} */
        const backgroundColor = this.Get('backgroundColor');
        /** @type {?} */
        const strokeWeight = Number(this.Get('strokeWeight'));
        /** @type {?} */
        const text = this.Get('text');
        /** @type {?} */
        const textMeasure = ctx.measureText(text);
        /** @type {?} */
        const textWidth = textMeasure.width;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, 4, 4);
        }
        if (backgroundColor && backgroundColor !== '') {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, textWidth + 8, (parseInt(ctx.font, 10) * 2) - 2);
        }
        ctx.fillStyle = this.Get('fontColor');
        ctx.fillText(text, 4, 4);
        style.marginLeft = this.GetMarginLeft(textWidth) + 'px';
        style.marginTop = '-0.4em';
        style.pointerEvents = 'none';
        // Bring actual text top in line with desired latitude.
        // Cheaper than calculating height of text.
    }
    /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    GetMarginLeft(textWidth) {
        switch (this.Get('align')) {
            case 'left': return 0;
            case 'right': return -textWidth;
        }
        return textWidth / -2;
    }
    /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    OnRemove() {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    }
}
if (false) {
    /** @type {?} */
    MapLabel.prototype._canvas;
    /**
     * Returns the default label style for the platform
     *
     * \@readonly
     * @abstract
     * \@memberof MapLabel
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.DefaultLabelStyle = function () { };
    /**
     * Gets the value of a setting.
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} key - Key specifying the setting.
     * @return {?} - The value of the setting.
     */
    MapLabel.prototype.Get = function (key) { };
    /**
     * Gets the map associted with the label.
     *
     * \@memberof MapLabel
     * \@method
     * @abstract
     * @abstract
     * @return {?} - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     */
    MapLabel.prototype.GetMap = function () { };
    /**
     * Set the value for a setting.
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} key - Key specifying the setting.
     * @param {?} val - The value to set.
     * @return {?}
     */
    MapLabel.prototype.Set = function (key, val) { };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof MapLabel
     * \@method
     * @abstract
     * @param {?} map - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     * @return {?}
     */
    MapLabel.prototype.SetMap = function (map) { };
    /**
     * Applies settings to the object
     *
     * \@memberof MapLabel
     * @abstract
     * \@method
     * @abstract
     * @param {?} options - An object containing the settings key value pairs.
     * @return {?}
     */
    MapLabel.prototype.SetValues = function (options) { };
    /**
     * Draws the label on the map.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.Draw = function () { };
    /**
     * Delegate called when the label is added to the map. Generates and configures
     * the canvas.
     *
     * \@memberof MapLabel
     * \@method
     * @protected
     * @abstract
     * @abstract
     * @return {?}
     */
    MapLabel.prototype.OnAdd = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXAtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxNQUFNOzs7OztJQXdCRixZQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7O0lBWU0sTUFBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVZixPQUFPLENBQUMsSUFBNEI7O1FBQ3ZDLElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDOztRQUNoQyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtB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Q0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssTUFBTSxFQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxPQUFPLEVBQUksTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7SUFtQlMsUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckQ7S0FDSjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGJhc2UgaW1wbGVtZW50aW5nIGEgbGFiZWwgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBMYWJlbCB7XG4vLyBleHBvcnQgY2xhc3MgTWFwTGFiZWwgZXh0ZW5kcyBNaWNyb3NvZnQuTWFwcy5DdXN0b21PdmVybGF5IHtcbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJvdGVjdGVkIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCBsYWJlbCBzdHlsZSBmb3IgdGhlIHBsYXRmb3JtXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IERlZmF1bHRMYWJlbFN0eWxlKCk6IElMYWJlbE9wdGlvbnM7XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgTWFwTGFiZWxcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBwcm9wZXJ0aWVzIHRvIHNldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgICAgIHRoaXMuU2V0KCdmb250RmFtaWx5JywgJ3NhbnMtc2VyaWYnKTtcbiAgICAgICAgdGhpcy5TZXQoJ2ZvbnRTaXplJywgMTIpO1xuICAgICAgICB0aGlzLlNldCgnZm9udENvbG9yJywgJyNmZmZmZmYnKTtcbiAgICAgICAgdGhpcy5TZXQoJ3N0cm9rZVdlaWdodCcsIDQpO1xuICAgICAgICB0aGlzLlNldCgnc3Ryb2tlQ29sb3InLCAnIzAwMDAwMCcpO1xuICAgICAgICB0aGlzLlNldCgnYWxpZ24nLCAnY2VudGVyJyk7XG4gICAgICAgIHRoaXMuU2V0VmFsdWVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgbGFiZWwgZnJvbSB0aGUgbWFwLiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhdHVhbGx5IGRlbGV0ZSB0aGUgbGFiZWwgaXRzZWxmLCBzb1xuICAgICAqIGl0IGNhbiBiZSByZWFkZGVkIHRvIG1hcCBsYXRlci5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRNYXAobnVsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgY2FsbGVkIHdoZW4gdW5kZXJseWluZyBwcm9wZXJ0aWVzIGNoYW5nZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9wIC0gVGhlIHByb3BlcnR5IG9yIHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBDaGFuZ2VkKHByb3A6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICAgICAgbGV0IHNob3VsZFJ1bkRyYXdDYW52YXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNob3VsZFJ1bkRyYXcgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3ApKSB7IHByb3AgPSBbcHJvcF07IH1cbiAgICAgICAgcHJvcC5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udEZhbWlseSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udFNpemUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZvbnRDb2xvcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3Ryb2tlV2VpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJva2VDb2xvcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWxpZ24nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSdW5EcmF3Q2FudmFzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4Wm9vbSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluWm9vbSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnb2Zmc2V0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3Bvc2l0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUnVuRHJhdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHNob3VsZFJ1bkRyYXdDYW52YXMpIHsgdGhpcy5EcmF3Q2FudmFzKCk7IH1cbiAgICAgICAgaWYgKHNob3VsZFJ1bkRyYXcpIHsgdGhpcy5EcmF3KCk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IC0gS2V5IHNwZWNpZnlpbmcgdGhlIHNldHRpbmcuXG4gICAgICogQHJldHVybnMgLSBUaGUgdmFsdWUgb2YgdGhlIHNldHRpbmcuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXQoa2V5OiBzdHJpbmcpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBIG5hdGl2ZSBtYXAgb2JqZWN0IGZvciB0aGUgdW5kZXJseWluZyBpbXBsZW1lbnRhdGlvbi4gSW1wbGVtZW50aW5nIGRlcml2YXRpdmVzIHNob3VsZCByZXR1cm4gdGhlXG4gICAgICogYWN0dWFsIG5hdGl2ZSBvYmplY3QuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRNYXAoKTogYW55O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBmb3IgYSBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAtIEtleSBzcGVjaWZ5aW5nIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSB2YWwgLSBUaGUgdmFsdWUgdG8gc2V0LlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0KGtleTogc3RyaW5nLCB2YWw6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIEEgbmF0aXZlIG1hcCBvYmplY3QgZm9yIHRoZSB1bmRlcmx5aW5nIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnRpbmcgZGVyaXZhdGl2ZXMgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBhY3R1YWwgbmF0aXZlIG9iamVjdC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldE1hcChtYXA6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHNldHRpbmdzIHRvIHRoZSBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGtleSB2YWx1ZSBwYWlycy5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZhbHVlcyhvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogdm9pZDtcblxuICAgIC8vL1xuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBsYWJlbC4gVmlzaWJpbGl0eSBkZXBlbmRzIG9uIFpvb20gc2V0dGluZ3MuXG4gICAgICogQHJldHVybnMgLSBibGFuayBzdHJpbmcgaWYgdmlzaWJsZSwgJ2hpZGRlbicgaWYgaW52aXNpYmxlLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgR2V0VmlzaWJsZSgpIHtcbiAgICAgICAgY29uc3QgbWluWm9vbTogbnVtYmVyID0gdGhpcy5HZXQoJ21pblpvb20nKTtcbiAgICAgICAgY29uc3QgbWF4Wm9vbTogbnVtYmVyID0gdGhpcy5HZXQoJ21heFpvb20nKTtcbiAgICAgICAgY29uc3QgaGlkZGVuOiBib29sZWFuID0gdGhpcy5HZXQoJ2hpZGRlbicpO1xuXG4gICAgICAgIGlmIChoaWRkZW4pIHtyZXR1cm4gJ2hpZGRlbic7IH1cbiAgICAgICAgaWYgKG1pblpvb20gPT09IHVuZGVmaW5lZCAmJiBtYXhab29tID09PSB1bmRlZmluZWQpIHsgcmV0dXJuICcnOyB9XG4gICAgICAgIGlmICghdGhpcy5HZXRNYXAoKSkgeyByZXR1cm4gJyc7IH1cblxuICAgICAgICBjb25zdCBtYXBab29tOiBudW1iZXIgPSB0aGlzLkdldE1hcCgpLmdldFpvb20oKTtcbiAgICAgICAgaWYgKG1hcFpvb20gPCBtaW5ab29tIHx8IG1hcFpvb20gPiBtYXhab29tKSB7IHJldHVybiAnaGlkZGVuJzsgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIG9uIHRoZSBtYXAuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgRHJhdygpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIGxhYmVsIHRvIHRoZSBjYW52YXMgMmQgY29udGV4dC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBEcmF3Q2FudmFzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW52YXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSB0aGlzLl9jYW52YXMuc3R5bGU7XG4gICAgICAgIHN0eWxlLnpJbmRleCA9IHRoaXMuR2V0KCd6SW5kZXgnKTtcblxuICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuR2V0KCdzdHJva2VDb2xvcicpO1xuICAgICAgICBjdHguZm9udCA9IHRoaXMuR2V0KCdmb250U2l6ZScpICsgJ3B4ICcgKyB0aGlzLkdldCgnZm9udEZhbWlseScpO1xuXG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gdGhpcy5HZXQoJ2JhY2tncm91bmRDb2xvcicpO1xuICAgICAgICBjb25zdCBzdHJva2VXZWlnaHQ6IG51bWJlciA9IE51bWJlcih0aGlzLkdldCgnc3Ryb2tlV2VpZ2h0JykpO1xuICAgICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSB0aGlzLkdldCgndGV4dCcpO1xuICAgICAgICBjb25zdCB0ZXh0TWVhc3VyZTogVGV4dE1ldHJpY3MgPSBjdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIGNvbnN0IHRleHRXaWR0aDogbnVtYmVyID0gdGV4dE1lYXN1cmUud2lkdGg7XG4gICAgICAgIGlmICh0ZXh0ICYmIHN0cm9rZVdlaWdodCAmJiBzdHJva2VXZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdlaWdodDtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCA0LCA0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFja2dyb3VuZENvbG9yICYmIGJhY2tncm91bmRDb2xvciAhPT0gJycpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgdGV4dFdpZHRoICsgOCwgKHBhcnNlSW50KGN0eC5mb250LCAxMCkgKiAyKSAtIDIpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLkdldCgnZm9udENvbG9yJyk7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCA0LCA0KTtcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gdGhpcy5HZXRNYXJnaW5MZWZ0KHRleHRXaWR0aCkgKyAncHgnO1xuICAgICAgICBzdHlsZS5tYXJnaW5Ub3AgPSAnLTAuNGVtJztcbiAgICAgICAgc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgICAgIC8vIEJyaW5nIGFjdHVhbCB0ZXh0IHRvcCBpbiBsaW5lIHdpdGggZGVzaXJlZCBsYXRpdHVkZS5cbiAgICAgICAgICAgIC8vIENoZWFwZXIgdGhhbiBjYWxjdWxhdGluZyBoZWlnaHQgb2YgdGV4dC5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcHByb3ByaWF0ZSBtYXJnaW4tbGVmdCBmb3IgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gdGV4dFdpZHRoICAtIFRoZSB3aWR0aCBvZiB0aGUgdGV4dCwgaW4gcGl4ZWxzLlxuICAgICAqIEByZXR1cm5zIC0gVGhlIG1hcmdpbi1sZWZ0LCBpbiBwaXhlbHMuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgR2V0TWFyZ2luTGVmdCh0ZXh0V2lkdGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5HZXQoJ2FsaWduJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOiAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzogICByZXR1cm4gLXRleHRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dFdpZHRoIC8gLTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgY2FsbGVkIHdoZW4gdGhlIGxhYmVsIGlzIGFkZGVkIHRvIHRoZSBtYXAuIEdlbmVyYXRlcyBhbmQgY29uZmlndXJlc1xuICAgICAqIHRoZSBjYW52YXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBPbkFkZCgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGxhYmVsIGlzIHJlbW92ZWQgZnJvbSB0aGUgbWFwLlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICovXG4gICAgcHJvdGVjdGVkIE9uUmVtb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzICYmIHRoaXMuX2NhbnZhcy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=