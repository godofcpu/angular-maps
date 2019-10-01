/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class InfoWindow {
}
if (false) {
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.IsOpen = function () { };
    /**
     * Get the underlying native primitive of the implementation.
     *
     * \@readonly
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener to the info window.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    InfoWindow.prototype.AddListener = function (eventType, fn) { };
    /**
     * Closes the info window.
     *
     * @abstract
     *
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.Close = function () { };
    /**
     * Gets the position of the info window.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @return {?} - Returns the geo coordinates of the info window.
     *
     */
    InfoWindow.prototype.GetPosition = function () { };
    /**
     * Opens the info window.
     *
     * @abstract
     *
     * \@memberof InfoWindow
     * @abstract
     * @return {?}
     */
    InfoWindow.prototype.Open = function () { };
    /**
     * Sets the info window options.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    InfoWindow.prototype.SetOptions = function (options) { };
    /**
     * Sets the info window position.
     *
     * @abstract
     * \@memberof InfoWindow
     * @abstract
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    InfoWindow.prototype.SetPosition = function (position) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxNQUFNO0NBOEVMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5mb1dpbmRvdyB7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIGluZm8gYm94IGlzIGN1cnJlbnRseSBvcGVuLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IElzT3BlbigpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBwcmltaXRpdmUgb2YgdGhlIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQ2xvc2UoKTogdm9pZCA7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIFJldHVybnMgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRQb3NpdGlvbigpOiBJTGF0TG9uZztcblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgT3BlbigpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gSW5mbyB3aW5kb3cgb3B0aW9ucyB0byBzZXQuIFRoZSBvcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggYW55IGV4aXN0aW5nIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiAtIEdlbyBjb29yZGluYXRlcyB0byBtb3ZlIHRoZSBhbmNob3Igb2YgdGhlIGluZm8gd2luZG93IHRvLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UG9zaXRpb24ocG9zaXRpb246IElMYXRMb25nKTogdm9pZDtcbn1cbiJdfQ==