/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
Polyline = /** @class */ (function () {
    function Polyline() {
    }
    Object.defineProperty(Polyline.prototype, "Center", {
        get: /**
         * Gets the polyline's center.
         * \@readonly
         * \@memberof Polyline
         * @return {?}
         */
        function () {
            if (this._center == null) {
                this._center = this.GetBoundingCenter();
            }
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Polyline.prototype, "Centroid", {
        get: /**
         * Gets the polyline's centroid.
         * \@readonly
         * \@memberof Polyline
         * @return {?}
         */
        function () {
            if (this._centroid == null) {
                this._centroid = this.GetPolylineCentroid();
            }
            return this._centroid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the centroid of the polyline based on the a path.
     *
     * \@memberof Polyline
     * \@method
     * @param {?} path - the path for which to generate the centroid
     * @return {?} - The centroid coordinates of the polyline.
     */
    Polyline.GetPolylineCentroid = /**
     * Get the centroid of the polyline based on the a path.
     *
     * \@memberof Polyline
     * \@method
     * @param {?} path - the path for which to generate the centroid
     * @return {?} - The centroid coordinates of the polyline.
     */
    function (path) {
        /** @type {?} */
        var c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        var off = path[0];
        if (off != null) {
            /** @type {?} */
            var twicearea = 0;
            /** @type {?} */
            var x = 0;
            /** @type {?} */
            var y = 0;
            /** @type {?} */
            var p1 = void 0;
            /** @type {?} */
            var p2 = void 0;
            /** @type {?} */
            var f = void 0;
            for (var i = 0, j = path.length - 1; i < path.length; j = i++) {
                p1 = path[i];
                p2 = path[j];
                f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                    (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                twicearea += f;
                x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
            }
            if (twicearea !== 0) {
                f = twicearea * 3;
                c.latitude = x / f + off.latitude;
                c.longitude = y / f + off.longitude;
            }
            else {
                c.latitude = off.latitude;
                c.longitude = off.longitude;
            }
        }
        else {
            c = null;
        }
        return c;
    };
    ///
    /// Protected methods
    ///
    /**
     * Gets the center of the polyline' bounding box.
     *
     * @returns - {@link ILatLong} object containing the center of the bounding box.
     * @memberof Polyline
     * @method
     * @protected
     */
    /**
     * Gets the center of the polyline' bounding box.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
     */
    Polyline.prototype.GetBoundingCenter = /**
     * Gets the center of the polyline' bounding box.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - {\@link ILatLong} object containing the center of the bounding box.
     */
    function () {
        /** @type {?} */
        var c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        var x1 = 90;
        /** @type {?} */
        var x2 = -90;
        /** @type {?} */
        var y1 = 180;
        /** @type {?} */
        var y2 = -180;
        /** @type {?} */
        var path = this.GetPath();
        if (path) {
            path.forEach(function (p) {
                if (p.latitude < x1) {
                    x1 = p.latitude;
                }
                if (p.latitude > x2) {
                    x2 = p.latitude;
                }
                if (p.longitude < y1) {
                    y1 = p.longitude;
                }
                if (p.longitude > y2) {
                    y2 = p.longitude;
                }
            });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    };
    /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * @returns - The centroid coordinates of the polyline.
     * @memberof Polyline
     * @method
     * @protected
     */
    /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polyline.
     */
    Polyline.prototype.GetPolylineCentroid = /**
     * Get the centroid of the polyline based on the polyline path.
     *
     * \@memberof Polyline
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polyline.
     */
    function () {
        /** @type {?} */
        var path = this.GetPath();
        /** @type {?} */
        var c = Polyline.GetPolylineCentroid(path);
        return c;
    };
    return Polyline;
}());
/**
 * Abstract class defining the contract for a polyline in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Polyline };
if (false) {
    /** @type {?} */
    Polyline.prototype._centroid;
    /** @type {?} */
    Polyline.prototype._center;
    /**
     * Gets the native primitve implementing the polyline.
     *
     * \@readonly
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.NativePrimitve = function () { };
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polylin
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Metadata = function () { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polyline
     *
     * @abstract
     * \@memberof Polyline
     * \@property
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polyline.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     *
     * @return {?}
     */
    Polyline.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polyline.
     *
     * @abstract
     *
     * \@memberof Polyline
     * @abstract
     * @return {?}
     */
    Polyline.prototype.Delete = function () { };
    /**
     * Gets whether the polyline is draggable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    Polyline.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polyline path can be edited.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polyline.prototype.GetEditable = function () { };
    /**
     * Gets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polyline path.
     *
     */
    Polyline.prototype.GetPath = function () { };
    /**
     * Gets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    Polyline.prototype.GetVisible = function () { };
    /**
     * Sets whether the polyline is dragable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polyline path is editable.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polyline options
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polyline.prototype.SetOptions = function (options) { };
    /**
     * Sets the polyline path.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    Polyline.prototype.SetPath = function (path) { };
    /**
     * Sets whether the polyline is visible.
     *
     * @abstract
     * \@memberof Polyline
     * @abstract
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    Polyline.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL3BvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFBQTs7OzBCQWdCZSw0QkFBTTs7Ozs7Ozs7WUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDM0M7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7MEJBUWIsOEJBQVE7Ozs7Ozs7O1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQy9DO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFvRFosNEJBQW1COzs7Ozs7OztjQUFDLElBQXFCOztRQUNuRCxJQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDOztRQUM5QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQ2QsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDOztZQUMxQixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7O1lBQ2xCLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQzs7WUFDbEIsSUFBSSxFQUFFLFVBQXlCOztZQUEvQixJQUFrQixFQUFFLFVBQVc7O1lBQy9CLElBQUksQ0FBQyxVQUFTO1lBRWQsR0FBRyxDQUFD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QyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFBRTtnQkFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUFFO2FBQzlDLENBQUMsQ0FBQztZQUNILENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjtJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7OztJQUNPLHNDQUFtQjs7Ozs7Ozs7SUFBN0I7O1FBQ0ksSUFBTSxJQUFJLEdBQW9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7UUFDN0MsSUFBTSxDQUFDLEdBQWMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjttQkEzUkw7SUE2UkMsQ0FBQTs7Ozs7Ozs7QUFwUkQsb0JBb1JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBkZWZpbmluZyB0aGUgY29udHJhY3QgZm9yIGEgcG9seWxpbmUgaW4gdGhlIGFyY2hpdGVjdHVyZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvbHlsaW5lIHtcbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJvdGVjdGVkIF9jZW50cm9pZDogSUxhdExvbmc7XG4gICAgcHJvdGVjdGVkIF9jZW50ZXI6IElMYXRMb25nO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSdzIGNlbnRlci5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IENlbnRlcigpOiBJTGF0TG9uZyB7XG4gICAgICAgIGlmICh0aGlzLl9jZW50ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gdGhpcy5HZXRCb3VuZGluZ0NlbnRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWxpbmUncyBjZW50cm9pZC5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IENlbnRyb2lkKCk6IElMYXRMb25nIHtcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRyb2lkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NlbnRyb2lkID0gdGhpcy5HZXRQb2x5bGluZUNlbnRyb2lkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRyb2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIHBvbHlsaW5lLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHdoZXRoZXIgdG8gc2hvdyB0aGUgdG9vbHRpcFxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBTaG93VG9vbHRpcCgpOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5bGluZVxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBUaXRsZSgpOiBzdHJpbmc7XG4gICAgcHVibGljIGFic3RyYWN0IHNldCBUaXRsZSh2YWw6IHN0cmluZyk7XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2VudHJvaWQgb2YgdGhlIHBvbHlsaW5lIGJhc2VkIG9uIHRoZSBhIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIHRoZSBwYXRoIGZvciB3aGljaCB0byBnZW5lcmF0ZSB0aGUgY2VudHJvaWRcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBjZW50cm9pZCBjb29yZGluYXRlcyBvZiB0aGUgcG9seWxpbmUuXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgR2V0UG9seWxpbmVDZW50cm9pZChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiBJTGF0TG9uZyB7XG4gICAgICAgIGxldCBjOiBJTGF0TG9uZyA9IHtsYXRpdHVkZTogMCwgbG9uZ2l0dWRlOiAwfTtcbiAgICAgICAgY29uc3Qgb2ZmID0gcGF0aFswXTtcbiAgICAgICAgaWYgKG9mZiAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgdHdpY2VhcmVhOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBwMTogSUxhdExvbmcsIHAyOiBJTGF0TG9uZztcbiAgICAgICAgICAgIGxldCBmOiBudW1iZXI7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gcGF0aC5sZW5ndGggLSAxOyBpIDwgcGF0aC5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgICAgICAgICBwMSA9IHBhdGhbaV07XG4gICAgICAgICAgICAgICAgcDIgPSBwYXRoW2pdO1xuICAgICAgICAgICAgICAgIGYgPSAocDEubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAyLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpIC1cbiAgICAgICAgICAgICAgICAgICAgKHAyLmxhdGl0dWRlIC0gb2ZmLmxhdGl0dWRlKSAqIChwMS5sb25naXR1ZGUgLSBvZmYubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICB0d2ljZWFyZWEgKz0gZjtcbiAgICAgICAgICAgICAgICB4ICs9IChwMS5sYXRpdHVkZSArIHAyLmxhdGl0dWRlIC0gMiAqIG9mZi5sYXRpdHVkZSkgKiBmO1xuICAgICAgICAgICAgICAgIHkgKz0gKHAxLmxvbmdpdHVkZSArIHAyLmxvbmdpdHVkZSAtIDIgKiBvZmYubG9uZ2l0dWRlKSAqIGY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHdpY2VhcmVhICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgZiA9IHR3aWNlYXJlYSAqIDM7XG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHggLyBmICsgb2ZmLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geSAvIGYgKyBvZmYubG9uZ2l0dWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYy5sYXRpdHVkZSA9IG9mZi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICBjLmxvbmdpdHVkZSA9IG9mZi5sb25naXR1ZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlZCB0aGUgcG9seWxpbmUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBEZWxldGUoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgaXMgZHJhZ2dhYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5bGluZSBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldERyYWdnYWJsZSgpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGNhbiBiZSBlZGl0ZWQuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldEVkaXRhYmxlKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5bGluZSBwYXRoLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBJTGF0TG9uZyBvYmplY3RzIGRlc2NyaWJpbmcgdGhlIHBvbHlsaW5lIHBhdGguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWxpbmUgZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGlzIGVkaXRhYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlsaW5lIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb2x5bGluZSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuIFRoZSBvcHRpb25zIGFyZSBtZXJnZWQgd2l0aCBodGUgb25lc1xuICAgICAqIGFscmVhZHkgb24gdGhlIHVuZGVybHlpbmcgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIHBhdGguXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWxpbmVzIHBhdGguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWxpbmUgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNlbnRlciBvZiB0aGUgcG9seWxpbmUnIGJvdW5kaW5nIGJveC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgY2VudGVyIG9mIHRoZSBib3VuZGluZyBib3guXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgR2V0Qm91bmRpbmdDZW50ZXIoKTogSUxhdExvbmcge1xuICAgICAgICBsZXQgYzogSUxhdExvbmcgPSB7bGF0aXR1ZGU6IDAsIGxvbmdpdHVkZTogMH07XG4gICAgICAgIGxldCB4MTogbnVtYmVyID0gOTAsIHgyOiBudW1iZXIgPSAtOTAsIHkxOiBudW1iZXIgPSAxODAsIHkyOiBudW1iZXIgPSAtMTgwO1xuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSB0aGlzLkdldFBhdGgoKTtcbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocC5sYXRpdHVkZSA8IHgxKSB7IHgxID0gcC5sYXRpdHVkZTsgfVxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlID4geDIpIHsgeDIgPSBwLmxhdGl0dWRlOyB9XG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlIDwgeTEpIHsgeTEgPSBwLmxvbmdpdHVkZTsgfVxuICAgICAgICAgICAgICAgIGlmIChwLmxvbmdpdHVkZSA+IHkyKSB7IHkyID0gcC5sb25naXR1ZGU7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHgxICsgKHgyIC0geDEpIC8gMjtcbiAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geTEgKyAoeTIgLSB5MSkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWxpbmUgYmFzZWQgb24gdGhlIHBvbHlsaW5lIHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSBjZW50cm9pZCBjb29yZGluYXRlcyBvZiB0aGUgcG9seWxpbmUuXG4gICAgICogQG1lbWJlcm9mIFBvbHlsaW5lXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgR2V0UG9seWxpbmVDZW50cm9pZCgpOiBJTGF0TG9uZyB7XG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IHRoaXMuR2V0UGF0aCgpO1xuICAgICAgICBjb25zdCBjOiBJTGF0TG9uZyAgPSBQb2x5bGluZS5HZXRQb2x5bGluZUNlbnRyb2lkKHBhdGgpO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbn1cbiJdfQ==