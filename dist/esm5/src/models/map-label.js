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
var /**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
MapLabel = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new MapLabel
     * @param options Optional properties to set.
     */
    function MapLabel(options) {
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
    MapLabel.prototype.Delete = /**
     * Deletes the label from the map. This method does not atually delete the label itself, so
     * it can be readded to map later.
     * \@memberof MapLabel
     * \@method
     * @return {?}
     */
    function () {
        this.SetMap(null);
    };
    /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    MapLabel.prototype.Changed = /**
     * Delegate called when underlying properties change.
     *
     * \@memberof MapLabel
     * \@method
     * @param {?} prop - The property or properties that have changed.
     * @return {?}
     */
    function (prop) {
        /** @type {?} */
        var shouldRunDrawCanvas = false;
        /** @type {?} */
        var shouldRunDraw = false;
        if (!Array.isArray(prop)) {
            prop = [prop];
        }
        prop.forEach(function (p) {
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
    };
    ///
    /// Protected methods
    ///
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @returns - blank string if visible, 'hidden' if invisible.
     * @protected
     */
    /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    MapLabel.prototype.GetVisible = /**
     * Get the visibility of the label. Visibility depends on Zoom settings.
     * @protected
     * @return {?} - blank string if visible, 'hidden' if invisible.
     */
    function () {
        /** @type {?} */
        var minZoom = this.Get('minZoom');
        /** @type {?} */
        var maxZoom = this.Get('maxZoom');
        /** @type {?} */
        var hidden = this.Get('hidden');
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
        var mapZoom = this.GetMap().getZoom();
        if (mapZoom < minZoom || mapZoom > maxZoom) {
            return 'hidden';
        }
        return '';
    };
    /**
     * Draws the label to the canvas 2d context.
     * @memberof MapLabel
     * @method
     * @protected
     */
    /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    MapLabel.prototype.DrawCanvas = /**
     * Draws the label to the canvas 2d context.
     * \@memberof MapLabel
     * \@method
     * @protected
     * @return {?}
     */
    function () {
        if (!this._canvas) {
            return;
        }
        /** @type {?} */
        var style = this._canvas.style;
        style.zIndex = this.Get('zIndex');
        /** @type {?} */
        var ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.strokeStyle = this.Get('strokeColor');
        ctx.font = this.Get('fontSize') + 'px ' + this.Get('fontFamily');
        /** @type {?} */
        var backgroundColor = this.Get('backgroundColor');
        /** @type {?} */
        var strokeWeight = Number(this.Get('strokeWeight'));
        /** @type {?} */
        var text = this.Get('text');
        /** @type {?} */
        var textMeasure = ctx.measureText(text);
        /** @type {?} */
        var textWidth = textMeasure.width;
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
    };
    /**
     * Gets the appropriate margin-left for the canvas.
     * @param textWidth  - The width of the text, in pixels.
     * @returns - The margin-left, in pixels.
     * @protected
     * @method
     * @memberof MapLabel
     */
    /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    MapLabel.prototype.GetMarginLeft = /**
     * Gets the appropriate margin-left for the canvas.
     * @protected
     * \@method
     * \@memberof MapLabel
     * @param {?} textWidth  - The width of the text, in pixels.
     * @return {?} - The margin-left, in pixels.
     */
    function (textWidth) {
        switch (this.Get('align')) {
            case 'left': return 0;
            case 'right': return -textWidth;
        }
        return textWidth / -2;
    };
    /**
     * Called when the label is removed from the map.
     * @method
     * @protected
     * @memberof MapLabel
     */
    /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    MapLabel.prototype.OnRemove = /**
     * Called when the label is removed from the map.
     * \@method
     * @protected
     * \@memberof MapLabel
     * @return {?}
     */
    function () {
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    };
    return MapLabel;
}());
/**
 * Abstract base implementing a label to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export { MapLabel };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXAtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUFBO0lBZ0JJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7T0FHRztJQUNILGtCQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7Ozs7Ozs7O0lBWU0seUJBQU07Ozs7Ozs7O1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVVmLDBCQUFPOzs7Ozs7OztjQUFDLElBQTRCOztRQUN2QyxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs7UUFDaEMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUFFO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ1YsTUFBTSxDQUFD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QyxHQUFHLElBQUksQ0FBQztRQUN4RCxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMzQixLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7O0tBR2hDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ08sZ0NBQWE7Ozs7Ozs7O0lBQXZCLFVBQXdCLFNBQWlCO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssTUFBTSxFQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxPQUFPLEVBQUksTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN6QjtJQWFEOzs7OztPQUtHOzs7Ozs7OztJQUNPLDJCQUFROzs7Ozs7O0lBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRDtLQUNKO21CQTVQTDtJQTZQQyxDQUFBOzs7Ozs7OztBQXJQRCxvQkFxUEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XG5cbi8qKlxuICogQWJzdHJhY3QgYmFzZSBpbXBsZW1lbnRpbmcgYSBsYWJlbCB0byBiZSBwbGFjZWQgb24gdGhlIG1hcC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcExhYmVsIHtcbi8vIGV4cG9ydCBjbGFzcyBNYXBMYWJlbCBleHRlbmRzIE1pY3Jvc29mdC5NYXBzLkN1c3RvbU92ZXJsYXkge1xuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IGxhYmVsIHN0eWxlIGZvciB0aGUgcGxhdGZvcm1cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgRGVmYXVsdExhYmVsU3R5bGUoKTogSUxhYmVsT3B0aW9ucztcblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNYXBMYWJlbFxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbmFsIHByb3BlcnRpZXMgdG8gc2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAgICAgdGhpcy5TZXQoJ2ZvbnRGYW1pbHknLCAnc2Fucy1zZXJpZicpO1xuICAgICAgICB0aGlzLlNldCgnZm9udFNpemUnLCAxMik7XG4gICAgICAgIHRoaXMuU2V0KCdmb250Q29sb3InLCAnI2ZmZmZmZicpO1xuICAgICAgICB0aGlzLlNldCgnc3Ryb2tlV2VpZ2h0JywgNCk7XG4gICAgICAgIHRoaXMuU2V0KCdzdHJva2VDb2xvcicsICcjMDAwMDAwJyk7XG4gICAgICAgIHRoaXMuU2V0KCdhbGlnbicsICdjZW50ZXInKTtcbiAgICAgICAgdGhpcy5TZXRWYWx1ZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBsYWJlbCBmcm9tIHRoZSBtYXAuIFRoaXMgbWV0aG9kIGRvZXMgbm90IGF0dWFsbHkgZGVsZXRlIHRoZSBsYWJlbCBpdHNlbGYsIHNvXG4gICAgICogaXQgY2FuIGJlIHJlYWRkZWQgdG8gbWFwIGxhdGVyLlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldE1hcChudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB1bmRlcmx5aW5nIHByb3BlcnRpZXMgY2hhbmdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3AgLSBUaGUgcHJvcGVydHkgb3IgcHJvcGVydGllcyB0aGF0IGhhdmUgY2hhbmdlZC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIENoYW5nZWQocHJvcDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICBsZXQgc2hvdWxkUnVuRHJhd0NhbnZhcyA9IGZhbHNlO1xuICAgICAgICBsZXQgc2hvdWxkUnVuRHJhdyA9IGZhbHNlO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcCkpIHsgcHJvcCA9IFtwcm9wXTsgfVxuICAgICAgICBwcm9wLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHApIHtcbiAgICAgICAgICAgICAgICBjYXNlICdmb250RmFtaWx5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdmb250U2l6ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9udENvbG9yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJva2VXZWlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cm9rZUNvbG9yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhbGlnbic6XG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJ1bkRyYXdDYW52YXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYXhab29tJzpcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5ab29tJzpcbiAgICAgICAgICAgICAgICBjYXNlICdvZmZzZXQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICAgICAgY2FzZSAncG9zaXRpb24nOlxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSdW5EcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc2hvdWxkUnVuRHJhd0NhbnZhcykgeyB0aGlzLkRyYXdDYW52YXMoKTsgfVxuICAgICAgICBpZiAoc2hvdWxkUnVuRHJhdykgeyB0aGlzLkRyYXcoKTsgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIGEgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXkgLSBLZXkgc3BlY2lmeWluZyB0aGUgc2V0dGluZy5cbiAgICAgKiBAcmV0dXJucyAtIFRoZSB2YWx1ZSBvZiB0aGUgc2V0dGluZy5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldChrZXk6IHN0cmluZyk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEEgbmF0aXZlIG1hcCBvYmplY3QgZm9yIHRoZSB1bmRlcmx5aW5nIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnRpbmcgZGVyaXZhdGl2ZXMgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBhY3R1YWwgbmF0aXZlIG9iamVjdC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldE1hcCgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIGZvciBhIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IC0gS2V5IHNwZWNpZnlpbmcgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIHZhbCAtIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICogQG1lbWJlcm9mIE1hcExhYmVsXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXQoa2V5OiBzdHJpbmcsIHZhbDogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcCBmb3IgdGhlIGxhYmVsLiBTZXR0aW5ncyB0aGlzIHRvIG51bGwgcmVtb3ZlIHRoZSBsYWJlbCBmcm9tIGh0ZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFwIC0gQSBuYXRpdmUgbWFwIG9iamVjdCBmb3IgdGhlIHVuZGVybHlpbmcgaW1wbGVtZW50YXRpb24uIEltcGxlbWVudGluZyBkZXJpdmF0aXZlcyBzaG91bGQgcmV0dXJuIHRoZVxuICAgICAqIGFjdHVhbCBuYXRpdmUgb2JqZWN0LlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0TWFwKG1hcDogYW55KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgc2V0dGluZ3MgdG8gdGhlIG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgc2V0dGluZ3Mga2V5IHZhbHVlIHBhaXJzLlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VmFsdWVzKG9wdGlvbnM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGxhYmVsLiBWaXNpYmlsaXR5IGRlcGVuZHMgb24gWm9vbSBzZXR0aW5ncy5cbiAgICAgKiBAcmV0dXJucyAtIGJsYW5rIHN0cmluZyBpZiB2aXNpYmxlLCAnaGlkZGVuJyBpZiBpbnZpc2libGUuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRWaXNpYmxlKCkge1xuICAgICAgICBjb25zdCBtaW5ab29tOiBudW1iZXIgPSB0aGlzLkdldCgnbWluWm9vbScpO1xuICAgICAgICBjb25zdCBtYXhab29tOiBudW1iZXIgPSB0aGlzLkdldCgnbWF4Wm9vbScpO1xuICAgICAgICBjb25zdCBoaWRkZW46IGJvb2xlYW4gPSB0aGlzLkdldCgnaGlkZGVuJyk7XG5cbiAgICAgICAgaWYgKGhpZGRlbikge3JldHVybiAnaGlkZGVuJzsgfVxuICAgICAgICBpZiAobWluWm9vbSA9PT0gdW5kZWZpbmVkICYmIG1heFpvb20gPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gJyc7IH1cbiAgICAgICAgaWYgKCF0aGlzLkdldE1hcCgpKSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIGNvbnN0IG1hcFpvb206IG51bWJlciA9IHRoaXMuR2V0TWFwKCkuZ2V0Wm9vbSgpO1xuICAgICAgICBpZiAobWFwWm9vbSA8IG1pblpvb20gfHwgbWFwWm9vbSA+IG1heFpvb20pIHsgcmV0dXJuICdoaWRkZW4nOyB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgb24gdGhlIG1hcC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBEcmF3KCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgdG8gdGhlIGNhbnZhcyAyZCBjb250ZXh0LlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIERyYXdDYW52YXMgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbnZhcykgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IHRoaXMuX2NhbnZhcy5zdHlsZTtcbiAgICAgICAgc3R5bGUuekluZGV4ID0gdGhpcy5HZXQoJ3pJbmRleCcpO1xuXG4gICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5HZXQoJ3N0cm9rZUNvbG9yJyk7XG4gICAgICAgIGN0eC5mb250ID0gdGhpcy5HZXQoJ2ZvbnRTaXplJykgKyAncHggJyArIHRoaXMuR2V0KCdmb250RmFtaWx5Jyk7XG5cbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSB0aGlzLkdldCgnYmFja2dyb3VuZENvbG9yJyk7XG4gICAgICAgIGNvbnN0IHN0cm9rZVdlaWdodDogbnVtYmVyID0gTnVtYmVyKHRoaXMuR2V0KCdzdHJva2VXZWlnaHQnKSk7XG4gICAgICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9IHRoaXMuR2V0KCd0ZXh0Jyk7XG4gICAgICAgIGNvbnN0IHRleHRNZWFzdXJlOiBUZXh0TWV0cmljcyA9IGN0eC5tZWFzdXJlVGV4dCh0ZXh0KTtcbiAgICAgICAgY29uc3QgdGV4dFdpZHRoOiBudW1iZXIgPSB0ZXh0TWVhc3VyZS53aWR0aDtcbiAgICAgICAgaWYgKHRleHQgJiYgc3Ryb2tlV2VpZ2h0ICYmIHN0cm9rZVdlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3Ryb2tlV2VpZ2h0O1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHRleHQsIDQsIDQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IgJiYgYmFja2dyb3VuZENvbG9yICE9PSAnJykge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0ZXh0V2lkdGggKyA4LCAocGFyc2VJbnQoY3R4LmZvbnQsIDEwKSAqIDIpIC0gMik7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuR2V0KCdmb250Q29sb3InKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIDQsIDQpO1xuXG4gICAgICAgIHN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLkdldE1hcmdpbkxlZnQodGV4dFdpZHRoKSArICdweCc7XG4gICAgICAgIHN0eWxlLm1hcmdpblRvcCA9ICctMC40ZW0nO1xuICAgICAgICBzdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgICAgICAgLy8gQnJpbmcgYWN0dWFsIHRleHQgdG9wIGluIGxpbmUgd2l0aCBkZXNpcmVkIGxhdGl0dWRlLlxuICAgICAgICAgICAgLy8gQ2hlYXBlciB0aGFuIGNhbGN1bGF0aW5nIGhlaWdodCBvZiB0ZXh0LlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFwcHJvcHJpYXRlIG1hcmdpbi1sZWZ0IGZvciB0aGUgY2FudmFzLlxuICAgICAqIEBwYXJhbSB0ZXh0V2lkdGggIC0gVGhlIHdpZHRoIG9mIHRoZSB0ZXh0LCBpbiBwaXhlbHMuXG4gICAgICogQHJldHVybnMgLSBUaGUgbWFyZ2luLWxlZnQsIGluIHBpeGVscy5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRNYXJnaW5MZWZ0KHRleHRXaWR0aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLkdldCgnYWxpZ24nKSkge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6ICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOiAgIHJldHVybiAtdGV4dFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0V2lkdGggLyAtMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBjYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgYWRkZWQgdG8gdGhlIG1hcC4gR2VuZXJhdGVzIGFuZCBjb25maWd1cmVzXG4gICAgICogdGhlIGNhbnZhcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBMYWJlbFxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IE9uQWRkKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbGFiZWwgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXAuXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTWFwTGFiZWxcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgT25SZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMgJiYgdGhpcy5fY2FudmFzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==