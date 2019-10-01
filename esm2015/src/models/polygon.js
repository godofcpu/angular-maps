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
export class Polygon {
    /**
     * Gets the polygon's center.
     * \@readonly
     * \@memberof Polygon
     * @return {?}
     */
    get Center() {
        if (this._center == null) {
            this._center = this.GetBoundingCenter();
        }
        return this._center;
    }
    /**
     * Gets the polygon's centroid.
     * \@readonly
     * \@memberof Polygon
     * @return {?}
     */
    get Centroid() {
        if (this._centroid == null) {
            this._centroid = this.GetPolygonCentroid();
        }
        return this._centroid;
    }
    /**
     * Gets the center of the polygons' bounding box.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - ILatLong object containing the center of the bounding box.
     */
    GetBoundingCenter() {
        /** @type {?} */
        let c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        let x1 = 90;
        /** @type {?} */
        let x2 = -90;
        /** @type {?} */
        let y1 = 180;
        /** @type {?} */
        let y2 = -180;
        /** @type {?} */
        const path = this.GetPaths();
        if (path) {
            path.forEach(inner => inner.forEach(p => {
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
            }));
            c.latitude = x1 + (x2 - x1) / 2;
            c.longitude = y1 + (y2 - y1) / 2;
        }
        else {
            c = null;
        }
        return c;
    }
    /**
     * Get the centroid of the polygon based on the polygon path.
     *
     * \@memberof Polygon
     * \@method
     * @protected
     * @return {?} - The centroid coordinates of the polygon.
     */
    GetPolygonCentroid() {
        /** @type {?} */
        let c = { latitude: 0, longitude: 0 };
        /** @type {?} */
        const path = this.GetPaths();
        /** @type {?} */
        const off = path[0][0];
        if (off != null) {
            /** @type {?} */
            let twicearea = 0;
            /** @type {?} */
            let x = 0;
            /** @type {?} */
            let y = 0;
            /** @type {?} */
            let p1;
            /** @type {?} */
            let p2;
            /** @type {?} */
            let f;
            for (let k = 0; k < path.length; k++) {
                for (let i = 0, j = path[k].length - 1; i < path[k].length; j = i++) {
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
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBLE1BQU07Ozs7Ozs7UUFnQlMsTUFBTTtRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7O1FBUWIsUUFBUTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzlDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7SUF5TmhCLGlCQUFpQjs7UUFDdkIsSUFBSSxDQUFDLEdBQWEsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzs7UUFDOUMsSUFBSSxFQUFFLEdBQVcsRUFBRSxDQUF3RDs7UUFBM0UsSUFBcUIsRUFBRSxHQUFXLENBQUMsRUFBRSxDQUFzQzs7UUFBM0UsSUFBdUMsRUFBRSxHQUFXLEdBQUcsQ0FBb0I7O1FBQTNFLElBQXlELEVBQUUsR0FBVyxDQUFDLEdBQUcsQ0FBQzs7UUFDM0UsTUFBTSxJQUFJLEdBQTJCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JB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UUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7WUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQzthQUN2QztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO2FBQy9CO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDWjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZGVmaW5pbmcgdGhlIGNvbnRyYWN0IGZvciBhIHBvbHlnb24gaW4gdGhlIGFyY2hpdGVjdHVyZSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvbHlnb24ge1xuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX2NlbnRyb2lkOiBJTGF0TG9uZztcbiAgICBwcm90ZWN0ZWQgX2NlbnRlcjogSUxhdExvbmc7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24ncyBjZW50ZXIuXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IENlbnRlcigpOiBJTGF0TG9uZyB7XG4gICAgICAgIGlmICh0aGlzLl9jZW50ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gdGhpcy5HZXRCb3VuZGluZ0NlbnRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWdvbidzIGNlbnRyb2lkLlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGdldCBDZW50cm9pZCgpOiBJTGF0TG9uZyB7XG4gICAgICAgIGlmICh0aGlzLl9jZW50cm9pZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IHRoaXMuR2V0UG9seWdvbkNlbnRyb2lkKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRyb2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXI7XG4gICAgcHVibGljIGFic3RyYWN0IHNldCBMYWJlbE1heFpvb20odmFsOiBudW1iZXIpO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgTGFiZWxNaW5ab29tKCk6IG51bWJlcjtcbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2V0IExhYmVsTWluWm9vbSh2YWw6IG51bWJlcik7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIG1ldGFkYXRhLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIGxhYmVsXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgU2hvd0xhYmVsKCk6IGJvb2xlYW47XG4gICAgcHVibGljIGFic3RyYWN0IHNldCBTaG93TGFiZWwodmFsOiBib29sZWFuKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBTaG93VG9vbHRpcCgpOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgdGl0bGUgb2ZmIHRoZSBwb2x5Z29uXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgVGl0bGUoKTogc3RyaW5nO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgVGl0bGUodmFsOiBzdHJpbmcpO1xuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlZCB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2dhYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXREcmFnZ2FibGUoKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0RWRpdGFibGUoKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgSUxhdExvbmcgb2JqZWN0cyBkZXNjcmliaW5nIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aHMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIEFycmF5IG9mIElMYXRMb25nIG9iamVjdHMgZGVzY3JpYmluZyBtdWx0aXBsZSBwb2x5Z29uIHBhdGhzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UGF0aHMoKTogQXJyYXk8QXJyYXk8SUxhdExvbmc+PjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldFZpc2libGUoKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlnb24gZHJhZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBpcyBlZGl0YWJsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBlZGl0YWJsZSAtIFRydWUgdG8gbWFrZSBwb2x5Z29uIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9seWdvbiBwYXRoLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHBhdGggLSBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHBvbHlnb24gcGF0aCBvciBwYXRocy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBwYXRocyBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9XG4gICAgICogKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aChzKS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBhdGhzKHBhdGhzOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHwgQXJyYXk8SUxhdExvbmc+KTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWdvbiB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjZW50ZXIgb2YgdGhlIHBvbHlnb25zJyBib3VuZGluZyBib3guXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIElMYXRMb25nIG9iamVjdCBjb250YWluaW5nIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIGJveC5cbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIEdldEJvdW5kaW5nQ2VudGVyKCk6IElMYXRMb25nIHtcbiAgICAgICAgbGV0IGM6IElMYXRMb25nID0ge2xhdGl0dWRlOiAwLCBsb25naXR1ZGU6IDB9O1xuICAgICAgICBsZXQgeDE6IG51bWJlciA9IDkwLCB4MjogbnVtYmVyID0gLTkwLCB5MTogbnVtYmVyID0gMTgwLCB5MjogbnVtYmVyID0gLTE4MDtcbiAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IHRoaXMuR2V0UGF0aHMoKTtcbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChpbm5lciA9PiBpbm5lci5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwLmxhdGl0dWRlIDwgeDEpIHsgeDEgPSBwLmxhdGl0dWRlOyB9XG4gICAgICAgICAgICAgICAgaWYgKHAubGF0aXR1ZGUgPiB4MikgeyB4MiA9IHAubGF0aXR1ZGU7IH1cbiAgICAgICAgICAgICAgICBpZiAocC5sb25naXR1ZGUgPCB5MSkgeyB5MSA9IHAubG9uZ2l0dWRlOyB9XG4gICAgICAgICAgICAgICAgaWYgKHAubG9uZ2l0dWRlID4geTIpIHsgeTIgPSBwLmxvbmdpdHVkZTsgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgYy5sYXRpdHVkZSA9IHgxICsgKHgyIC0geDEpIC8gMjtcbiAgICAgICAgICAgIGMubG9uZ2l0dWRlID0geTEgKyAoeTIgLSB5MSkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjZW50cm9pZCBvZiB0aGUgcG9seWdvbiBiYXNlZCBvbiB0aGUgcG9seWdvbiBwYXRoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgY2VudHJvaWQgY29vcmRpbmF0ZXMgb2YgdGhlIHBvbHlnb24uXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBHZXRQb2x5Z29uQ2VudHJvaWQoKTogSUxhdExvbmcge1xuICAgICAgICBsZXQgYzogSUxhdExvbmcgPSB7bGF0aXR1ZGU6IDAsIGxvbmdpdHVkZTogMH07XG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLkdldFBhdGhzKCk7XG4gICAgICAgIGNvbnN0IG9mZiA9IHBhdGhbMF1bMF07XG4gICAgICAgIGlmIChvZmYgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHR3aWNlYXJlYTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBsZXQgcDE6IElMYXRMb25nLCBwMjogSUxhdExvbmc7XG4gICAgICAgICAgICBsZXQgZjogbnVtYmVyO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBwYXRoLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSBwYXRoW2tdLmxlbmd0aCAtIDE7IGkgPCBwYXRoW2tdLmxlbmd0aDsgaiA9IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwMSA9IHBhdGhba11baV07XG4gICAgICAgICAgICAgICAgICAgIHAyID0gcGF0aFtrXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgZiA9IChwMS5sYXRpdHVkZSAtIG9mZi5sYXRpdHVkZSkgKiAocDIubG9uZ2l0dWRlIC0gb2ZmLmxvbmdpdHVkZSkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgKHAyLmxhdGl0dWRlIC0gb2ZmLmxhdGl0dWRlKSAqIChwMS5sb25naXR1ZGUgLSBvZmYubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgdHdpY2VhcmVhICs9IGY7XG4gICAgICAgICAgICAgICAgICAgIHggKz0gKHAxLmxhdGl0dWRlICsgcDIubGF0aXR1ZGUgLSAyICogb2ZmLmxhdGl0dWRlKSAqIGY7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gKHAxLmxvbmdpdHVkZSArIHAyLmxvbmdpdHVkZSAtIDIgKiBvZmYubG9uZ2l0dWRlKSAqIGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR3aWNlYXJlYSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGYgPSB0d2ljZWFyZWEgKiAzO1xuICAgICAgICAgICAgICAgIGMubGF0aXR1ZGUgPSB4IC8gZiArIG9mZi5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICBjLmxvbmdpdHVkZSA9IHkgLyBmICsgb2ZmLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGMubGF0aXR1ZGUgPSBvZmYubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgYy5sb25naXR1ZGUgPSBvZmYubG9uZ2l0dWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxufVxuIl19