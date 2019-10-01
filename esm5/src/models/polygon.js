/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
var /**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
Polygon = /** @class */ (function () {
    function Polygon() {
    }
    Object.defineProperty(Polygon.prototype, "Center", {
        get: /**
         * Gets the polygon's center.
         * \@readonly
         * \@memberof Polygon
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
    Object.defineProperty(Polygon.prototype, "Centroid", {
        get: /**
         * Gets the polygon's centroid.
         * \@readonly
         * \@memberof Polygon
         * @return {?}
         */
        function () {
            if (this._centroid == null) {
                this._centroid = this.GetPolygonCentroid();
            }
            return this._centroid;
        },
        enumerable: true,
        configurable: true
    });
    ///
    /// Protected methods
    ///
    /**
     * Gets the center of the polygons' bounding box.
     *
     * @returns - ILatLong object containing the center of the bounding box.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    Polygon.prototype.GetBoundingCenter = /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
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
        var path = this.GetPaths();
        if (path) {
            path.forEach(function (inner) { return inner.forEach(function (p) {
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
            }); });
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    };
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * @returns - The centroid coordinates of the polygon.
     * @memberof Polygon
     * @method
     * @protected
     */
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    Polygon.prototype.GetPolygonCentroid = /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    function () {
        /** @type {?} */
        var c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        var path = this.GetPaths();
        /** @type {?} */
        var off = path[0][0];
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
            for (var k = 0; k < path.length; k++) {
                for (var i = 0, j = path[k].length - 1; i < path[k].length; j = i++) {
                    p1 = path[k][i];
                    p2 = path[k][j];
                    f = (p1.latitude - off.latitude) * (p2.longitude - off.longitude) -
                        (p2.latitude - off.latitude) * (p1.longitude - off.longitude);
                    twicearea += f;
                    x += (p1.latitude + p2.latitude - 2 * off.latitude) * f;
                    y += (p1.longitude + p2.longitude - 2 * off.longitude) * f;
                }
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
    return Polygon;
}());
/**
 * Abstract class defining the contract for a polygon in the architecture specific implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export { Polygon };
if (false) {
    /** @type {?} */
    Polygon.prototype._centroid;
    /** @type {?} */
    Polygon.prototype._center;
    /**
     * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMaxZoom = function (val) { };
    /**
     * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.LabelMinZoom = function (val) { };
    /**
     * Gets the polygon metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Metadata = function () { };
    /**
     * Gets the native primitve implementing the polygon.
     *
     * \@readonly
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.NativePrimitve = function () { };
    /**
     * Gets or sets whether to show the label
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowLabel = function (val) { };
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.ShowTooltip = function (val) { };
    /**
     * Gets or sets the title off the polygon
     *
     * @abstract
     * \@memberof Polygon
     * \@property
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Title = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Polygon.prototype.Title = function (val) { };
    /**
     * Adds a delegate for an event.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    Polygon.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deleted the polygon.
     *
     * @abstract
     *
     * \@memberof Polygon
     * @abstract
     * @return {?}
     */
    Polygon.prototype.Delete = function () { };
    /**
     * Gets whether the polygon is draggable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    Polygon.prototype.GetDraggable = function () { };
    /**
     * Gets whether the polygon path can be edited.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    Polygon.prototype.GetEditable = function () { };
    /**
     * Gets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of ILatLong objects describing the polygon path.
     *
     */
    Polygon.prototype.GetPath = function () { };
    /**
     * Gets the polygon paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - Array of Array of ILatLong objects describing multiple polygon paths.
     *
     */
    Polygon.prototype.GetPaths = function () { };
    /**
     * Gets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    Polygon.prototype.GetVisible = function () { };
    /**
     * Sets whether the polygon is dragable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets wether the polygon path is editable.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetEditable = function (editable) { };
    /**
     * Sets the polygon options
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    Polygon.prototype.SetOptions = function (options) { };
    /**
     * Sets the polygon path.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    Polygon.prototype.SetPath = function (path) { };
    /**
     * Set the polygon path or paths.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    Polygon.prototype.SetPaths = function (paths) { };
    /**
     * Sets whether the polygon is visible.
     *
     * @abstract
     * \@memberof Polygon
     * @abstract
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    Polygon.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBOzs7Ozs7O0FBQUE7OzswQkFnQmUsMkJBQU07Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7OzBCQVFiLDZCQUFROzs7Ozs7OztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUM5QztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OztJQTZNMUIsR0FBRztJQUNILHFCQUFxQjtJQUNyQixHQUFHO0lBRUg7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ08sbUNBQWlCOzs7Ozs7OztJQUEzQjs7UUFDSSxJQUFJLENBQUMsR0FBYSxFQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDOztRQUM5QyxJQUFJLEVBQUUsR0FBVyxFQUFFLENBQXdEOztRQUEzRSxJQUFxQixFQUFFLEdBQVcsQ0FBQyxFQUFFLENBQXNDOztRQUEzRSxJQUF1QyxFQUFFLEdBQVcsR0FBRyxDQUFvQjs7UUFBM0UsSUFBeUQsRUFBRSxHQUFXLENBQUMsR0FBRyxDQUFDOztRQUMzRSxJQUFNLElBQUksR0FBMkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7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Q0FBQyxDQUFDO29CQUNsRSxTQUFTLElBQUksQ0FBQyxDQUFDO29CQUNmLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM5RDthQUNKO1lBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixDQUFDLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUMvQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ1o7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7a0JBalVMO0lBa1VDLENBQUE7Ozs7Ozs7O0FBelRELG1CQXlUQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGRlZmluaW5nIHRoZSBjb250cmFjdCBmb3IgYSBwb2x5Z29uIGluIHRoZSBhcmNoaXRlY3R1cmUgc3BlY2lmaWMgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb2x5Z29uIHtcbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJvdGVjdGVkIF9jZW50cm9pZDogSUxhdExvbmc7XG4gICAgcHJvdGVjdGVkIF9jZW50ZXI6IElMYXRMb25nO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uJ3MgY2VudGVyLlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGdldCBDZW50ZXIoKTogSUxhdExvbmcge1xuICAgICAgICBpZiAodGhpcy5fY2VudGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlciA9IHRoaXMuR2V0Qm91bmRpbmdDZW50ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24ncyBjZW50cm9pZC5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgQ2VudHJvaWQoKTogSUxhdExvbmcge1xuICAgICAgICBpZiAodGhpcy5fY2VudHJvaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSB0aGlzLkdldFBvbHlnb25DZW50cm9pZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50cm9pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBMYWJlbE1heFpvb20oKTogbnVtYmVyO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgTGFiZWxNYXhab29tKHZhbDogbnVtYmVyKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IExhYmVsTWluWm9vbSgpOiBudW1iZXI7XG4gICAgcHVibGljIGFic3RyYWN0IHNldCBMYWJlbE1pblpvb20odmFsOiBudW1iZXIpO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbik7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbik7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IFRpdGxlKCk6IHN0cmluZztcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IFRpdGxlKHZhbDogc3RyaW5nKTtcblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZWQgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IERlbGV0ZSgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBjYW4gYmUgZWRpdGVkLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldEVkaXRhYmxlKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIElMYXRMb25nIG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWdvbiBwYXRoLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGhzLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiBBcnJheSBvZiBJTGF0TG9uZyBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldFBhdGhzKCk6IEFycmF5PEFycmF5PElMYXRMb25nPj47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRWaXNpYmxlKCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYWtlIHRoZSBwb2x5Z29uIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWdvbiBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldE9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gcGF0aC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5Z29ucyBwYXRoLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gcGF0aHMgQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfVxuICAgICAqIChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQYXRocyhwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIHBvbHlnb24gdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcblxuICAgIC8vL1xuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2VudGVyIG9mIHRoZSBwb2x5Z29ucycgYm91bmRpbmcgYm94LlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBJTGF0TG9uZyBvYmplY3QgY29udGFpbmluZyB0aGUgY2VudGVyIG9mIHRoZSBib3VuZGluZyBib3guXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRCb3VuZGluZ0NlbnRlcigpOiBJTGF0TG9uZyB7XG4gICAgICAgIGxldCBjOiBJTGF0TG9uZyA9IHtsYXRpdHVkZTogMCwgbG9uZ2l0dWRlOiAwfTtcbiAgICAgICAgbGV0IHgxOiBudW1iZXIgPSA5MCwgeDI6IG51bWJlciA9IC05MCwgeTE6IG51bWJlciA9IDE4MCwgeTI6IG51bWJlciA9IC0xODA7XG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBwYXRoLmZvckVhY2goaW5uZXIgPT4gaW5uZXIuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocC5sYXRpdHVkZSA8IHgxKSB7IHgxID0gcC5sYXRpdHVkZTsgfVxuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlID4geDIpIHsgeDIgPSBwLmxhdGl0dWRlOyB9XG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlIDwgeTEpIHsgeTEgPSBwLmxvbmdpdHVkZTsgfVxuICAgICAgICAgICAgICAgIGlmIChwLmxvbmdpdHVkZSA+IHkyKSB7IHkyID0gcC5sb25naXR1ZGU7IH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGMubGF0aXR1ZGUgPSB4MSArICh4MiAtIHgxKSAvIDI7XG4gICAgICAgICAgICBjLmxvbmdpdHVkZSA9IHkxICsgKHkyIC0geTEpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY2VudHJvaWQgb2YgdGhlIHBvbHlnb24gYmFzZWQgb24gdGhlIHBvbHlnb24gcGF0aC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGNlbnRyb2lkIGNvb3JkaW5hdGVzIG9mIHRoZSBwb2x5Z29uLlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgR2V0UG9seWdvbkNlbnRyb2lkKCk6IElMYXRMb25nIHtcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5HZXRQYXRocygpO1xuICAgICAgICBjb25zdCBvZmYgPSBwYXRoWzBdWzBdO1xuICAgICAgICBpZiAob2ZmICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB0d2ljZWFyZWE6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgbGV0IHAxOiBJTGF0TG9uZywgcDI6IElMYXRMb25nO1xuICAgICAgICAgICAgbGV0IGY6IG51bWJlcjtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcGF0aC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gcGF0aFtrXS5sZW5ndGggLSAxOyBpIDwgcGF0aFtrXS5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcDEgPSBwYXRoW2tdW2ldO1xuICAgICAgICAgICAgICAgICAgICBwMiA9IHBhdGhba11bal07XG4gICAgICAgICAgICAgICAgICAgIGYgPSAocDEubGF0aXR1ZGUgLSBvZmYubGF0aXR1ZGUpICogKHAyLmxvbmdpdHVkZSAtIG9mZi5sb25naXR1ZGUpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIChwMi5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDEubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgIHR3aWNlYXJlYSArPSBmO1xuICAgICAgICAgICAgICAgICAgICB4ICs9IChwMS5sYXRpdHVkZSArIHAyLmxhdGl0dWRlIC0gMiAqIG9mZi5sYXRpdHVkZSkgKiBmO1xuICAgICAgICAgICAgICAgICAgICB5ICs9IChwMS5sb25naXR1ZGUgKyBwMi5sb25naXR1ZGUgLSAyICogb2ZmLmxvbmdpdHVkZSkgKiBmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0d2ljZWFyZWEgIT09IDApIHtcbiAgICAgICAgICAgICAgICBmID0gdHdpY2VhcmVhICogMztcbiAgICAgICAgICAgICAgICBjLmxhdGl0dWRlID0geCAvIGYgKyBvZmYubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSB5IC8gZiArIG9mZi5sb25naXR1ZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjLmxhdGl0dWRlID0gb2ZmLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgIGMubG9uZ2l0dWRlID0gb2ZmLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbn1cbiJdfQ==