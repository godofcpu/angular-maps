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
export class BingMarker {
    /**
     * Creates an instance of BingMarker.
     * \@memberof BingMarker
     * @param {?} _pushpin - The {\@link Microsoft.Maps.Pushpin} underlying the model.
     * @param {?} _map - The context map.
     * @param {?} _layer - The context layer.
     *
     */
    constructor(_pushpin, _map, _layer) {
        this._pushpin = _pushpin;
        this._map = _map;
        this._layer = _layer;
        this._metadata = new Map();
        this._isFirst = false;
        this._isLast = true;
    }
    /**
     * Indicates that the marker is the first marker in a set.
     *
     * \@memberof Marker
     * @return {?}
     */
    get IsFirst() { return this._isFirst; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IsFirst(val) { this._isFirst = val; }
    /**
     * Indicates that the marker is the last marker in the set.
     *
     * \@memberof Marker
     * @return {?}
     */
    get IsLast() { return this._isLast; }
    /**
     * @param {?} val
     * @return {?}
     */
    set IsLast(val) { this._isLast = val; }
    /**
     * Gets the Location of the marker
     *
     * \@readonly
     * \@memberof BingMarker
     * @return {?}
     */
    get Location() {
        /** @type {?} */
        const l = this._pushpin.getLocation();
        return {
            latitude: l.latitude,
            longitude: l.longitude
        };
    }
    /**
     * Gets the marker metadata.
     *
     * \@readonly
     * \@memberof BingMarker
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the native primitve implementing the marker, in this case {\@link Microsoft.Maps.Pushpin}
     *
     * \@readonly
     * \@memberof BingMarker
     * @return {?}
     */
    get NativePrimitve() { return this._pushpin; }
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
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._pushpin, eventType, (e) => {
            fn(e);
        });
    }
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    DeleteMarker() {
        if (!this._map && !this._layer) {
            return;
        }
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
    }
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof BingMarker
     * @return {?}
     */
    GetLabel() {
        return this._pushpin.getText();
    }
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof BingMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._pushpin.getVisible();
    }
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    SetAnchor(anchor) {
        /** @type {?} */
        const o = {};
        o.anchor = new Microsoft.Maps.Point(anchor.x, anchor.y);
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        /** @type {?} */
        const o = {};
        o.draggable = draggable;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    SetIcon(icon) {
        /** @type {?} */
        const o = {};
        o.icon = icon;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    SetLabel(label) {
        /** @type {?} */
        const o = {};
        o.text = label;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    SetPosition(latLng) {
        /** @type {?} */
        const p = BingConversions.TranslateLocation(latLng);
        this._pushpin.setLocation(p);
    }
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof BingMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    SetTitle(title) {
        /** @type {?} */
        const o = {};
        o.title = title;
        this._pushpin.setOptions(o);
    }
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = BingConversions.TranslateMarkerOptions(options);
        this._pushpin.setOptions(o);
    }
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof Marker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        /** @type {?} */
        const o = {};
        o.visible = visible;
        this._pushpin.setOptions(o);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXJrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2JpbmcvYmluZy1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0FBT3ZFLE1BQU07Ozs7Ozs7OztJQXVFRixZQUFvQixRQUFnQyxFQUFZLElBQXdCLEVBQVksTUFBNEI7UUFBNUcsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQXNCO3lCQWxFMUYsSUFBSSxHQUFHLEVBQWU7d0JBQ3pDLEtBQUs7dUJBQ04sSUFBSTtLQWdFK0c7Ozs7Ozs7UUFyRDFILE9BQU8sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDMUMsT0FBTyxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztRQU81QyxNQUFNLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7O1FBQ3hDLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUTFDLFFBQVE7O1FBQ2YsTUFBTSxDQUFDLEdBQTRCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0QsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztTQUN6QixDQUFDOzs7Ozs7Ozs7UUFTSyxRQUFRLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7OztRQVFyRCxjQUFjLEtBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7O0lBNkJqRCxXQUFXLENB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Q0FBQztRQUNuRCxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Q0FHbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSU1hcmtlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXJrZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIE1hcmtlcn0gY29udHJhY3QgZm9yIHRoZSBCaW5nIE1hcHMgVjggbWFwIGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5nTWFya2VyIGltcGxlbWVudHMgTWFya2VyIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWZpbml0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaXNMYXN0ID0gdHJ1ZTtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgZmlyc3QgbWFya2VyIGluIGEgc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNGaXJzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzRmlyc3Q7IH1cbiAgICBwdWJsaWMgc2V0IElzRmlyc3QodmFsOiBib29sZWFuKSB7IHRoaXMuX2lzRmlyc3QgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGxhc3QgbWFya2VyIGluIHRoZSBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBJc0xhc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0xhc3Q7IH1cbiAgICBwdWJsaWMgc2V0IElzTGFzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNMYXN0ID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBMb2NhdGlvbiBvZiB0aGUgbWFya2VyXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTG9jYXRpb24oKTogSUxhdExvbmcge1xuICAgICAgICBjb25zdCBsOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IHRoaXMuX3B1c2hwaW4uZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiBsLmxhdGl0dWRlLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBsLmxvbmdpdHVkZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcmtlciBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBtYXJrZXIsIGluIHRoaXMgY2FzZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbn1cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fcHVzaHBpbjsgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXJrZXIuXG4gICAgICogQHBhcmFtIF9wdXNocGluIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5QdXNocGlufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cbiAgICAgKiBAcGFyYW0gX21hcCAtIFRoZSBjb250ZXh0IG1hcC5cbiAgICAgKiBAcGFyYW0gX2xheWVyIC0gVGhlIGNvbnRleHQgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3B1c2hwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIHByb3RlY3RlZCBfbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXAsIHByb3RlY3RlZCBfbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkxheWVyKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcHVzaHBpbiwgZXZlbnRUeXBlLCAoZSkgPT4ge1xuICAgICAgICAgICAgZm4oZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlTWFya2VyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX21hcCAmJiAhdGhpcy5fbGF5ZXIpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLl9sYXllcikgeyB0aGlzLl9sYXllci5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7IH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuZW50aXRpZXMucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWFya2VyIGxhYmVsXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIEdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wdXNocGluLmdldFRleHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2hwaW4uZ2V0VmlzaWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFuY2hvciBmb3IgdGhlIG1hcmtlci4gVXNlIHRoaXMgdG8gYWRqdXN0IHRoZSByb290IGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIHRvIGFjY29tb2RhdGUgdmFyaW91cyBtYXJrZXIgaW1hZ2Ugc2l6ZXMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gYW5jaG9yIC0gUG9pbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgYW5jaG9yLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0QW5jaG9yKGFuY2hvcjogSVBvaW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyA9IHt9O1xuICAgICAgICBvLmFuY2hvciA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChhbmNob3IueCwgYW5jaG9yLnkpO1xuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZHJhZ2dhYmlsaXR5IG9mIGEgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFyayB0aGUgbWFya2VyIGFzIGRyYWdnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgby5kcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpY29uIGZvciB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGljb24gLSBTdHJpbmcgY29udGFpbmluZyB0aGUgaWNvbiBpbiB2YXJpb3VzIGZvcm1zICh1cmwsIGRhdGEgdXJsLCBldGMuKVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0SWNvbihpY29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0ge307XG4gICAgICAgIG8uaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGFiZWwgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgbGFiZWwgdG8gc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0TGFiZWwobGFiZWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgby50ZXh0ID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvIGNvb3JkaW5hdGVzIHRvIHNldCB0aGUgbWFya2VyIHBvc2l0aW9uIHRvLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24obGF0TG5nOiBJTGF0TG9uZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihsYXRMbmcpO1xuICAgICAgICB0aGlzLl9wdXNocGluLnNldExvY2F0aW9uKHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciB0aXRsZS5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSB0aXRsZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSB0aXRsZSB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyB8IGFueSA9IHt9O1xuICAgICAgICBvLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuX3B1c2hwaW4uc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElNYXJrZXJPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgbWFya2VyIG9wdGlvbnMgdG8gc2V0LiBUaGUgc3VwcGxpZWQgb3B0aW9ucyBhcmVcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgdW5kZXJseWluZyBtYXJrZXIgb3B0aW9ucy5cbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zID0gIEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXJrZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wdXNocGluLnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIC0gVHJ1ZSB0byBzZXQgdGhlIG1hcmtlciB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgby52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgdGhpcy5fcHVzaHBpbi5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxufVxuIl19