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
export class GoogleMarker {
    /**
     * Creates an instance of GoogleMarker.
     * \@memberof GoogleMarker
     * @param {?} _marker
     *
     */
    constructor(_marker) {
        this._marker = _marker;
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
     * @abstract
     * \@memberof BingMarker
     * @return {?}
     */
    get NativePrimitve() { return this._marker; }
    /**
     * Gets the Location of the marker
     *
     * \@readonly
     * @abstract
     * \@memberof BingMarker
     * @return {?}
     */
    get Location() {
        /** @type {?} */
        const l = this._marker.getPosition();
        return {
            latitude: l.lat(),
            longitude: l.lng()
        };
    }
    /**
     * Adds an event listener to the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        this._marker.addListener(eventType, fn);
    }
    /**
     * Deletes the marker.
     *
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    DeleteMarker() {
        this._marker.setMap(null);
    }
    /**
     * Gets the marker label
     *
     * \@memberof GoogleMarker
     * @return {?}
     */
    GetLabel() {
        return this._marker.getLabel().text;
    }
    /**
     * Gets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @return {?} - True if the marker is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._marker.getVisible();
    }
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * \@memberof GoogleMarker
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    SetAnchor(anchor) {
        // not implemented
        // TODO: we need to switch the model to complex icons for google to
        // support anchors, sizes and origins.
        // https://developers.google.com/maps/documentation/javascript/markers
    }
    /**
     * Sets the draggability of a marker.
     *
     * \@memberof GoogleMarker
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        this._marker.setDraggable(draggable);
    }
    /**
     * Sets the icon for the marker.
     *
     * \@memberof GoogleMarker
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    SetIcon(icon) {
        this._marker.setIcon(icon);
    }
    /**
     * Sets the marker label.
     *
     * \@memberof GoogleMarker
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    SetLabel(label) {
        this._marker.setLabel(label);
    }
    /**
     * Sets the marker position.
     *
     * \@memberof GoogleMarker
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    SetPosition(latLng) {
        /** @type {?} */
        const p = GoogleConversions.TranslateLocationObject(latLng);
        this._marker.setPosition(p);
    }
    /**
     * Sets the marker title.
     *
     * \@memberof GoogleMarker
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    SetTitle(title) {
        this._marker.setTitle(title);
    }
    /**
     * Sets the marker options.
     *
     * \@memberof GoogleMarker
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = GoogleConversions.TranslateMarkerOptions(options);
        this._marker.setOptions(o);
    }
    /**
     * Sets whether the marker is visible.
     *
     * \@memberof GoogleMarker
     * @param {?} visible - True to set the marker visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._marker.setVisible(visible);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvZ29vZ2xlL2dvb2dsZS1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7QUFXN0UsTUFBTTs7Ozs7OztJQXVFRixZQUFvQixPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1Qjt5QkFsRVosSUFBSSxHQUFHLEVBQWU7d0JBQ3pDLEtBQUs7dUJBQ04sSUFBSTtLQWdFaUM7Ozs7Ozs7UUFyRDVDLE9BQU8sS0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFDMUMsT0FBTyxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztRQU81QyxNQUFNLEtBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7O1FBQ3hDLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7Ozs7O1FBUTFDLFFBQVEsS0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7OztRQVNyRCxjQUFjLEtBQTRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7UUFTOUQsUUFBUTs7UUFDZixNQUFNLENBQUMsR0FBMEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1RCxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNqQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtTQUNyQixDQUFDOzs7Ozs7Ozs7OztJQTJCQyxXQUFXLENBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU3JDLFlBQVk7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRdkIsUUFBUTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0lBVWpDLFVBQVU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQVU5QixTQUFTLENBQUMsTUFBVzs7Ozs7Ozs7Ozs7Ozs7SUFjckIsWUFBWSxDQUFDLFNBQWtCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVWxDLE9BQU8sQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXhCLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVTFCLFdBQVcsQ0FBQyxNQUFnQjs7UUFDL0IsTUFBTSxDQUFDLEdBQTBCLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVXpCLFFBQVEsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVcxQixVQUFVLENBQUMsT0FBdUI7O1FBQ3JDLE1BQU0sQ0FBQyxHQUFpQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztJQVV4QixVQUFVLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7O0NBR3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21hcmtlcic7XG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIHtAbGluayBNYXJrZXJ9IGNvbnRyYWN0IGZvciB0aGUgR29vZ2xlIE1hcHMgbWFwIGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBHb29nbGVNYXJrZXIgaW1wbGVtZW50cyBNYXJrZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaXNMYXN0ID0gdHJ1ZTtcblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgcHJvcGVydGllc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgZmlyc3QgbWFya2VyIGluIGEgc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNGaXJzdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzRmlyc3Q7IH1cbiAgICBwdWJsaWMgc2V0IElzRmlyc3QodmFsOiBib29sZWFuKSB7IHRoaXMuX2lzRmlyc3QgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoZSBtYXJrZXIgaXMgdGhlIGxhc3QgbWFya2VyIGluIHRoZSBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGdldCBJc0xhc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0xhc3Q7IH1cbiAgICBwdWJsaWMgc2V0IElzTGFzdCh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faXNMYXN0ID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgbWFya2VyLCBpbiB0aGlzIGNhc2Uge0BsaW5rIE1pY3Jvc29mdC5NYXBzLlB1c2hwaW59XG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuTWFya2VyIHsgcmV0dXJuIHRoaXMuX21hcmtlcjsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgTG9jYXRpb24gb2YgdGhlIG1hcmtlclxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IExvY2F0aW9uKCk6IElMYXRMb25nIHtcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gdGhpcy5fbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsYXRpdHVkZTogbC5sYXQoKSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbC5sbmcoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvcnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFya2VyLlxuICAgICAqIEBwYXJhbSBfbWFya2VyXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFya2VyOiBHb29nbGVNYXBUeXBlcy5NYXJrZXIpIHsgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcmtlci5hZGRMaXN0ZW5lcihldmVudFR5cGUsIGZuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlTWFya2VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcmtlciBsYWJlbFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyLmdldExhYmVsKCkudGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBtYXJrZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyLmdldFZpc2libGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbmNob3IgZm9yIHRoZSBtYXJrZXIuIFVzZSB0aGlzIHRvIGFkanVzdCB0aGUgcm9vdCBsb2NhdGlvbiBmb3IgdGhlIG1hcmtlciB0byBhY2NvbW9kYXRlIHZhcmlvdXMgbWFya2VyIGltYWdlIHNpemVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFuY2hvciAtIFBvaW50IGNvb3JkaW5hdGVzIGZvciB0aGUgbWFya2VyIGFuY2hvci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0QW5jaG9yKGFuY2hvcjogYW55KTogdm9pZCB7XG4gICAgICAgIC8vIG5vdCBpbXBsZW1lbnRlZFxuICAgICAgICAvLyBUT0RPOiB3ZSBuZWVkIHRvIHN3aXRjaCB0aGUgbW9kZWwgdG8gY29tcGxleCBpY29ucyBmb3IgZ29vZ2xlIHRvXG4gICAgICAgIC8vIHN1cHBvcnQgYW5jaG9ycywgc2l6ZXMgYW5kIG9yaWdpbnMuXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L21hcmtlcnNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkcmFnZ2FiaWxpdHkgb2YgYSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYXJrIHRoZSBtYXJrZXIgYXMgZHJhZ2dhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGljb24gZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWNvbiAtIFN0cmluZyBjb250YWluaW5nIHRoZSBpY29uIGluIHZhcmlvdXMgZm9ybXMgKHVybCwgZGF0YSB1cmwsIGV0Yy4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldEljb24oaWNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRJY29uKGljb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYWJlbCAtIFN0cmluZyBjb250YWluaW5nIHRoZSBsYWJlbCB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldExhYmVsKGxhYmVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF0TG5nIC0gR2VvIGNvb3JkaW5hdGVzIHRvIHNldCB0aGUgbWFya2VyIHBvc2l0aW9uIHRvLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihsYXRMbmc6IElMYXRMb25nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHA6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxhdExuZyk7XG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRQb3NpdGlvbihwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgdGl0bGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGl0bGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgdGl0bGUgdG8gc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRUaXRsZSh0aXRsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFya2VyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJTWFya2VyT3B0aW9uc30gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcmtlciBvcHRpb25zIHRvIHNldC4gVGhlIHN1cHBsaWVkIG9wdGlvbnMgYXJlXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIHVuZGVybHlpbmcgbWFya2VyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX21hcmtlci5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0aGUgbWFya2VyIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBtYXJrZXIgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFya2VyLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgfVxuXG59XG4iXX0=