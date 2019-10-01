/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
InfoWindow = /** @class */ (function () {
    function InfoWindow() {
    }
    return InfoWindow;
}());
/**
 * @abstract
 */
export { InfoWindow };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7O0FBQUE7OztxQkFIQTtJQWlGQyxDQUFBOzs7O0FBOUVELHNCQThFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluZm9XaW5kb3cge1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBJc09wZW4oKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdW5kZXJseWluZyBuYXRpdmUgcHJpbWl0aXZlIG9mIHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBOYXRpdmVQcmltaXR2ZSgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dpbmRvd1xuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IENsb3NlKCk6IHZvaWQgO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBSZXR1cm5zIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0UG9zaXRpb24oKTogSUxhdExvbmc7XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IE9wZW4oKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluZm8gd2luZG93IG9wdGlvbnMgdG8gc2V0LiBUaGUgb3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIGFueSBleGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBHZW8gY29vcmRpbmF0ZXMgdG8gbW92ZSB0aGUgYW5jaG9yIG9mIHRoZSBpbmZvIHdpbmRvdyB0by5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvV2luZG93XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldFBvc2l0aW9uKHBvc2l0aW9uOiBJTGF0TG9uZyk6IHZvaWQ7XG59XG4iXX0=