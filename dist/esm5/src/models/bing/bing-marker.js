/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
/**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
var /**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
BingMarker = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingMarker.
     * @param _pushpin - The {@link Microsoft.Maps.Pushpin} underlying the model.
     * @param _map - The context map.
     * @param _layer - The context layer.
     *
     * @memberof BingMarker
     */
    function BingMarker(_pushpin, _map, _layer) {
        this._pushpin = _pushpin;
        this._map = _map;
        this._layer = _layer;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    Object.defineProperty(BingMarker.prototype, "IsFirst", {
        get: /**
         * Indicates that the marker is the first marker in a set.
         *
         * \@memberof Marker
         * @return {?}
         */
        function () { return this._isFirst; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._isFirst = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMarker.prototype, "IsLast", {
        get: /**
         * Indicates that the marker is the last marker in the set.
         *
         * \@memberof Marker
         * @return {?}
         */
        function () { return this._isLast; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._isLast = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMarker.prototype, "Location", {
        get: /**
         * Gets the Location of the marker
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () {
            /** @type {?} */
            var l = this._pushpin.getLocation();
            return {
                latitude: l.latitude,
                longitude: l.longitude
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMarker.prototype, "Metadata", {
        get: /**
         * Gets the marker metadata.
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingMarker.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
         *
         * \@readonly
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._pushpin; },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    BingMarker.prototype.AddListener = /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._pushpin, eventType, function (e) {
            fn(e);
        });
    };
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    BingMarker.prototype.DeleteMarker = /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    function () {
        if (!this._map && !this._layer) {
            return;
        }
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
    };
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    BingMarker.prototype.GetLabel = /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    function () {
        return this._pushpin.getText();
    };
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    BingMarker.prototype.GetVisible = /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    function () {
        return this._pushpin.getVisible();
    };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    BingMarker.prototype.SetAnchor = /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    function (anchor) {
        /** @type {?} */
        var o = {};
        o.anchor = new Microsoft.Maps.Point(anchor.x, anchor.y);
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    BingMarker.prototype.SetDraggable = /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        /** @type {?} */
        var o = {};
        o.draggable = draggable;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    BingMarker.prototype.SetIcon = /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    function (icon) {
        /** @type {?} */
        var o = {};
        o.icon = icon;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    BingMarker.prototype.SetLabel = /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    function (label) {
        /** @type {?} */
        var o = {};
        o.text = label;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    BingMarker.prototype.SetPosition = /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    function (latLng) {
        /** @type {?} */
        var p = BingConversions.TranslateLocation(latLng);
        this._pushpin.setLocation(p);
    };
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    BingMarker.prototype.SetTitle = /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    function (title) {
        /** @type {?} */
        var o = {};
        o.title = title;
        this._pushpin.setOptions(o);
    };
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    BingMarker.prototype.SetOptions = /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = BingConversions.TranslateMarkerOptions(options);
        this._pushpin.setOptions(o);
    };
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    BingMarker.prototype.SetVisible = /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        /** @type {?} */
        var o = {};
        o.visible = visible;
        this._pushpin.setOptions(o);
    };
    return BingMarker;
}());
/**
 * Concrete implementation of the {\@link Marker} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
export { BingMarker };
if (false) {
    /** @type {?} */
    BingMarker.prototype._metadata;
    /** @type {?} */
    BingMarker.prototype._isFirst;
    /** @type {?} */
    BingMarker.prototype._isLast;
    /** @type {?} */
    BingMarker.prototype._pushpin;
    /** @type {?} */
    BingMarker.prototype._map;
    /** @type {?} */
    BingMarker.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2JpbmcvYmluZy1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBT3ZFOzs7OztBQUFBO0lBMkRJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7Ozs7O09BT0c7SUFDSCxvQkFBb0IsUUFBZ0MsRUFBWSxJQUF3QixFQUFZLE1BQTRCO1FBQTVHLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBb0I7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFzQjt5QkFsRTFGLElBQUksR0FBRyxFQUFlO3dCQUN6QyxLQUFLO3VCQUNOLElBQUk7S0FnRStHOzBCQXJEMUgsK0JBQU87Ozs7Ozs7c0JBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O2tCQUNsQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7MEJBTzVDLDhCQUFNOzs7Ozs7O3NCQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7OztrQkFDakMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7OzBCQVExQyxnQ0FBUTs7Ozs7Ozs7OztZQUNmLElBQU0sQ0FBQyxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9ELE1BQU0sQ0FBQztnQkFDSCxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7Z0JBQ3BCLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUzthQUN6QixDQUFDOzs7OzswQkFTSyxnQ0FBUTs7Ozs7Ozs7c0JBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVFyRCxzQ0FBYzs7Ozs7Ozs7c0JBQVUs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QUFlLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVekIsK0JBQVU7Ozs7Ozs7O2NBQUMsT0FBZ0I7O1FBQzlCLElBQU0sQ0FBQyxHQUF5QyxFQUFFLENBQUM7UUFDbkQsQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O3FCQXZQcEM7SUEwUEMsQ0FBQTs7Ozs7O0FBOU9ELHNCQThPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgTWFya2VyfSBjb250cmFjdCBmb3IgdGhlIEJpbmcgTWFwcyBWOCBtYXAgYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmdNYXJrZXIgaW1wbGVtZW50cyBNYXJrZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlZmluaXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pc0xhc3QgPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgbWFya2VyIGlzIHRoZSBmaXJzdCBtYXJrZXIgaW4gYSBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBJc0ZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNGaXJzdDsgfVxuICAgIHB1YmxpYyBzZXQgSXNGaXJzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gdGhlIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzTGFzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzTGFzdDsgfVxuICAgIHB1YmxpYyBzZXQgSXNMYXN0KHZhbDogYm9vbGVhbikgeyB0aGlzLl9pc0xhc3QgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIExvY2F0aW9uIG9mIHRoZSBtYXJrZXJcbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBMb2NhdGlvbigpOiBJTGF0TG9uZyB7XG4gICAgICAgIGNvbnN0IGw6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gdGhpcy5fcHVzaHBpbi5nZXRMb2NhdGlvbigpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IGwubGF0aXR1ZGUsXG4gICAgICAgICAgICBsb25naXR1ZGU6IGwubG9uZ2l0dWRlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFya2VyIG1ldGFkYXRhLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT4geyByZXR1cm4gdGhpcy5fbWV0YWRhdGE7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hdGl2ZSBwcmltaXR2ZSBpbXBsZW1lbnRpbmcgdGhlIG1hcmtlciwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5QdXNocGlufVxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueSB7IHJldHVybiB0aGlzLl9wdXNocGluOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ01hcmtlci5cbiAgICAgKiBAcGFyYW0gX3B1c2hwaW4gLSBUaGUge0BsaW5rIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW59IHVuZGVybHlpbmcgdGhlIG1vZGVsLlxuICAgICAqIEBwYXJhbSBfbWFwIC0gVGhlIGNvbnRleHQgbWFwLlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHVzaHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiwgcHJvdGVjdGVkIF9tYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCwgcHJvdGVjdGVkIF9sYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIpIHsgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wdXNocGluLCBldmVudFR5cGUsIChlKSA9PiB7XG4gICAgICAgICAgICBmbihlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fbWFwICYmICF0aGlzLl9sYXllcikgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7IHRoaXMuX2xheWVyLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTsgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5lbnRpdGllcy5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbGFiZWxcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2hwaW4uZ2V0VGV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgbWFya2VyIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIG1hcmtlciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaHBpbi5nZXRWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYW5jaG9yIGZvciB0aGUgbWFya2VyLiBVc2UgdGhpcyB0byBhZGp1c3QgdGhlIHJvb3QgbG9jYXRpb24gZm9yIHRoZSBtYXJrZXIgdG8gYWNjb21vZGF0ZSB2YXJpb3VzIG1hcmtlciBpbWFnZSBzaXplcy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBhbmNob3IgLSBQb2ludCBjb29yZGluYXRlcyBmb3IgdGhlIG1hcmtlciBhbmNob3IuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRBbmNob3IoYW5jaG9yOiBJUG9pbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XG4gICAgICAgIG8uYW5jaG9yID0gbmV3IE1pY3Jvc29mdC5NYXBzLlBvaW50KGFuY2hvci54LCBhbmNob3IueSk7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkcmFnZ2FiaWxpdHkgb2YgYSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYXJrIHRoZSBtYXJrZXIgYXMgZHJhZ2dhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xuICAgICAgICBvLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGljb24gZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gaWNvbiAtIFN0cmluZyBjb250YWluaW5nIHRoZSBpY29uIGluIHZhcmlvdXMgZm9ybXMgKHVybCwgZGF0YSB1cmwsIGV0Yy4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRJY29uKGljb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgby5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYWJlbCAtIFN0cmluZyBjb250YWluaW5nIHRoZSBsYWJlbCB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRMYWJlbChsYWJlbDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xuICAgICAgICBvLnRleHQgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW8gY29vcmRpbmF0ZXMgdG8gc2V0IHRoZSBtYXJrZXIgcG9zaXRpb24gdG8uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihsYXRMbmc6IElMYXRMb25nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHA6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKGxhdExuZyk7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0TG9jYXRpb24ocCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHRpdGxlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHRpdGxlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIHRpdGxlIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldFRpdGxlKHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zIHwgYW55ID0ge307XG4gICAgICAgIG8udGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgb3B0aW9ucyB0byBzZXQuIFRoZSBzdXBwbGllZCBvcHRpb25zIGFyZVxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSB1bmRlcmx5aW5nIG1hcmtlciBvcHRpb25zLlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSAgQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgbWFya2VyIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyB8IGFueSA9IHt9O1xuICAgICAgICBvLnZpc2libGUgPSB2aXNpYmxlO1xuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG59XG4iXX0=