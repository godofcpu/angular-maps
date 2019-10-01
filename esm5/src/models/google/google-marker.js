/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
/**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
var /**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
GoogleMarker = /** @class */ (function () {
    ///
    /// Constructors
    ///
    /**
     * Creates an instance of GoogleMarker.
     * @param _marker
     *
     * @memberof GoogleMarker
     */
    function GoogleMarker(_marker) {
        this._marker = _marker;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    Object.defineProperty(GoogleMarker.prototype, "IsFirst", {
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
    Object.defineProperty(GoogleMarker.prototype, "IsLast", {
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
    Object.defineProperty(GoogleMarker.prototype, "Metadata", {
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
    Object.defineProperty(GoogleMarker.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
         *
         * \@readonly
         * @abstract
         * \@memberof BingMarker
         * @return {?}
         */
        function () { return this._marker; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleMarker.prototype, "Location", {
        get: /**
         * Gets the Location of the marker
         *
         * \@readonly
         * @abstract
         * \@memberof BingMarker
         * @return {?}
         */
        function () {
            /** @type {?} */
            var l = this._marker.getPosition();
            return {
                latitude: l.lat(),
                longitude: l.lng()
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    GoogleMarker.prototype.AddListener = /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        this._marker.addListener(eventType, fn);
    };
    /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GoogleMarker.prototype.DeleteMarker = /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    function () {
        this._marker.setMap(null);
    };
    /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GoogleMarker.prototype.GetLabel = /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    function () {
        return this._marker.getLabel().text;
    };
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GoogleMarker.prototype.GetVisible = /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    function () {
        return this._marker.getVisible();
    };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetAnchor = /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    function (anchor) {
        // not implemented
        // TODO: we need to switch the model to complex icons for google to
        // support anchors, sizes and origins.
        // https://developers.google.com/maps/documentation/javascript/markers
    };
    /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetDraggable = /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        this._marker.setDraggable(draggable);
    };
    /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetIcon = /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    function (icon) {
        this._marker.setIcon(icon);
    };
    /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetLabel = /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    function (label) {
        this._marker.setLabel(label);
    };
    /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetPosition = /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    function (latLng) {
        /** @type {?} */
        var p = GoogleConversions.TranslateLocationObject(latLng);
        this._marker.setPosition(p);
    };
    /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetTitle = /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    function (title) {
        this._marker.setTitle(title);
    };
    /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetOptions = /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = GoogleConversions.TranslateMarkerOptions(options);
        this._marker.setOptions(o);
    };
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    GoogleMarker.prototype.SetVisible = /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._marker.setVisible(visible);
    };
    return GoogleMarker;
}());
/**
 * Concrete implementation of the {\@link Marker} contract for the Google Maps map architecture.
 *
 * @export
 */
export { GoogleMarker };
if (false) {
    /** @type {?} */
    GoogleMarker.prototype._metadata;
    /** @type {?} */
    GoogleMarker.prototype._isFirst;
    /** @type {?} */
    GoogleMarker.prototype._isLast;
    /** @type {?} */
    GoogleMarker.prototype._marker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFXN0U7Ozs7O0FBQUE7SUE2REksR0FBRztJQUNILGdCQUFnQjtJQUNoQixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCxzQkFBb0IsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7eUJBbEVaLElBQUksR0FBRyxFQUFlO3dCQUN6QyxLQUFLO3VCQUNOLElBQUk7S0FnRWlDOzBCQXJENUMsaUNBQU87Ozs7Ozs7c0JBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O2tCQUNsQyxHQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7MEJBTzVDLGdDQUFNOzs7Ozs7O3NCQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7OztrQkFDakMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7OzBCQVExQyxrQ0FBUTs7Ozs7Ozs7c0JBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7OzBCQVNyRCx3Q0FBYzs7Ozs7Ozs7O3NCQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7OzswQkFTOUQsa0NBQVE7Ozs7Ozs7Ozs7O1lBQ2YsSUFBTSxDQUFDLEdBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDO2dCQUNILFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUNqQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTthQUNyQixDQUFDOzs7Ozs7Ozs7Ozs7OztJQTJCQyxrQ0FBVzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JDLG1DQUFZOzs7Ozs7OztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztJQVF2QiwrQkFBUTs7Ozs7OztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0lBVWpDLGlDQUFVOzs7Ozs7OztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVTlCLGdDQUFTOzs7Ozs7OztjQUFDLE1BQVc7Ozs7Ozs7Ozs7Ozs7O0lBY3JCLG1DQUFZOzs7Ozs7OztjQUFDLFNBQWtCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVWxDLDhCQUFPOzs7Ozs7OztjQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFVeEIsK0JBQVE7Ozs7Ozs7O2NBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVUxQixrQ0FBVzs7Ozs7Ozs7Y0FBQyxNQUFnQjs7UUFDL0IsSUFBTSxDQUFDLEdBQTBCLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXpCLCtCQUFROzs7Ozs7OztjQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBVzFCLGlDQUFVOzs7Ozs7Ozs7Y0FBQyxPQUF1Qjs7UUFDckMsSUFBTSxDQUFDLEdBQWlDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXhCLGlDQUFVOzs7Ozs7OztjQUFDLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzt1QkE3TnpDO0lBZ09DLENBQUE7Ozs7OztBQXJORCx3QkFxTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbWFya2VyJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIE1hcmtlcn0gY29udHJhY3QgZm9yIHRoZSBHb29nbGUgTWFwcyBtYXAgYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcmtlciBpbXBsZW1lbnRzIE1hcmtlciB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pc0xhc3QgPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBwcm9wZXJ0aWVzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgbWFya2VyIGlzIHRoZSBmaXJzdCBtYXJrZXIgaW4gYSBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBJc0ZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNGaXJzdDsgfVxuICAgIHB1YmxpYyBzZXQgSXNGaXJzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IHZhbDsgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gdGhlIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzTGFzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzTGFzdDsgfVxuICAgIHB1YmxpYyBzZXQgSXNMYXN0KHZhbDogYm9vbGVhbikgeyB0aGlzLl9pc0xhc3QgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcmtlciBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBtYXJrZXIsIGluIHRoaXMgY2FzZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbn1cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXIgeyByZXR1cm4gdGhpcy5fbWFya2VyOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBMb2NhdGlvbiBvZiB0aGUgbWFya2VyXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTG9jYXRpb24oKTogSUxhdExvbmcge1xuICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSB0aGlzLl9tYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsLmxhdCgpLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsLmxuZygpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVNYXJrZXIuXG4gICAgICogQHBhcmFtIF9tYXJrZXJcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZXI6IEdvb2dsZU1hcFR5cGVzLk1hcmtlcikgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgZm4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGVNYXJrZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFya2VyIGxhYmVsXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIEdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXIuZ2V0TGFiZWwoKS50ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgbWFya2VyIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIG1hcmtlciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXIuZ2V0VmlzaWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFuY2hvciBmb3IgdGhlIG1hcmtlci4gVXNlIHRoaXMgdG8gYWRqdXN0IHRoZSByb290IGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIHRvIGFjY29tb2RhdGUgdmFyaW91cyBtYXJrZXIgaW1hZ2Ugc2l6ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYW5jaG9yIC0gUG9pbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgYW5jaG9yLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRBbmNob3IoYW5jaG9yOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgLy8gbm90IGltcGxlbWVudGVkXG4gICAgICAgIC8vIFRPRE86IHdlIG5lZWQgdG8gc3dpdGNoIHRoZSBtb2RlbCB0byBjb21wbGV4IGljb25zIGZvciBnb29nbGUgdG9cbiAgICAgICAgLy8gc3VwcG9ydCBhbmNob3JzLCBzaXplcyBhbmQgb3JpZ2lucy5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvbWFya2Vyc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRyYWdnYWJpbGl0eSBvZiBhIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1hcmsgdGhlIG1hcmtlciBhcyBkcmFnZ2FibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaWNvbiBmb3IgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpY29uIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGljb24gaW4gdmFyaW91cyBmb3JtcyAodXJsLCBkYXRhIHVybCwgZXRjLilcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0SWNvbihpY29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldEljb24oaWNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFya2VyIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhYmVsIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGxhYmVsIHRvIHNldC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0TGFiZWwobGFiZWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0TGFiZWwobGFiZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRMbmcgLSBHZW8gY29vcmRpbmF0ZXMgdG8gc2V0IHRoZSBtYXJrZXIgcG9zaXRpb24gdG8uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldFBvc2l0aW9uKGxhdExuZzogSUxhdExvbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0TG5nKTtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldFBvc2l0aW9uKHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciB0aXRsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0aXRsZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSB0aXRsZSB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldFRpdGxlKHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldFRpdGxlKHRpdGxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElNYXJrZXJPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgbWFya2VyIG9wdGlvbnMgdG8gc2V0LiBUaGUgc3VwcGxpZWQgb3B0aW9ucyBhcmVcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgdW5kZXJseWluZyBtYXJrZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIG1hcmtlciB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0VmlzaWJsZSh2aXNpYmxlKTtcbiAgICB9XG5cbn1cbiJdfQ==