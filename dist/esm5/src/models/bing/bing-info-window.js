/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
/**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
var /**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
BingInfoWindow = /** @class */ (function () {
    /**
     * Creates an instance of BingInfoWindow.
     * @param _infoBox - A {@link Microsoft.Maps.Infobox} instance underlying the model
     * @memberof BingInfoWindow
     */
    function BingInfoWindow(_infoBox) {
        this._infoBox = _infoBox;
        this._isOpen = false;
    }
    Object.defineProperty(BingInfoWindow.prototype, "IsOpen", {
        get: /**
         * Gets whether the info box is currently open.
         *
         * \@readonly
         * \@memberof BingInfoWindow
         * @return {?}
         */
        function () {
            if (this._infoBox && this._infoBox.getOptions().visible === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingInfoWindow.prototype, "NativePrimitve", {
        get: /**
         * Gets native primitve underlying the model.
         *
         * \@memberof BingInfoWindow
         * \@property
         * \@readonly
         * @return {?}
         */
        function () {
            return this._infoBox;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.AddListener = /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        Microsoft.Maps.Events.addHandler(this._infoBox, eventType, function (e) {
            if (e.eventName === 'infoboxChanged') {
                if (_this._infoBox.getOptions().visible === true) {
                    _this._isOpen = true;
                }
                else {
                    if (_this._infoBox.getOptions().visible === false && _this._isOpen === true) {
                        _this._isOpen = false;
                        fn(e);
                    }
                }
            }
            else {
                fn(e);
            }
        });
    };
    /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    BingInfoWindow.prototype.Close = /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        /** @type {?} */
        var o = {};
        o.visible = false;
        this._infoBox.setOptions(o);
    };
    /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    BingInfoWindow.prototype.GetPosition = /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    function () {
        /** @type {?} */
        var p = {
            latitude: this._infoBox.getLocation().latitude,
            longitude: this._infoBox.getLocation().longitude
        };
        return p;
    };
    /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    BingInfoWindow.prototype.Open = /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        /** @type {?} */
        var o = {};
        o.visible = true;
        this._infoBox.setOptions(o);
    };
    /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.SetOptions = /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = BingConversions.TranslateInfoBoxOptions(options);
        this._infoBox.setOptions(o);
    };
    /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    BingInfoWindow.prototype.SetPosition = /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    function (position) {
        /** @type {?} */
        var l = BingConversions.TranslateLocation(position);
        this._infoBox.setLocation(l);
    };
    return BingInfoWindow;
}());
/**
 * Concrete implementation of the {\@link InfoWindow} contract for the Bing Maps V8 map architecture.
 *
 * @export
 */
export { BingInfoWindow };
if (false) {
    /** @type {?} */
    BingInfoWindow.prototype._isOpen;
    /** @type {?} */
    BingInfoWindow.prototype._infoBox;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQU92RTs7Ozs7QUFBQTtJQTBCSTs7OztPQUlHO0lBQ0gsd0JBQW9CLFFBQWdDO1FBQWhDLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3hCOzBCQXZCVSxrQ0FBTTs7Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUNsRixNQUFNLENBQUMsS0FBSyxDQUFDOzs7OzswQkFVTiwwQ0FBYzs7Ozs7Ozs7OztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0lBcUJsQixvQ0FBVzs7Ozs7Ozs7OztjQUFDLFNBQWlCLEVBQUUsRUFBWTs7UUFDOUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQUMsQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTtnQkFDekUsSUFBSSxDQUFDLENBQUM7b0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEUsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7U0FDSixDQUFDLENBQUM7Ozs7Ozs7OztJQVNBLDhCQUFLOzs7Ozs7Ozs7UUFDUixJQUFNLENBQUMsR0FBbUMsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFVekIsb0NBQVc7Ozs7Ozs7OztRQUNkLElBQU0sQ0FBQyxHQUFhO1lBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVE7WUFDOUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUztTQUNuRCxDQUFDO1FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBU04sNkJBQUk7Ozs7Ozs7OztRQUNQLElBQU0sQ0FBQyxHQUFtQyxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLG1DQUFVOzs7Ozs7Ozs7Y0FBQyxPQUEyQjs7UUFDekMsSUFBTSxDQUFDLEdBQW1DLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekIsb0NBQVc7Ozs7Ozs7OztjQUFDLFFBQWtCOztRQUNqQyxJQUFNLENBQUMsR0FBNEIsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzt5QkF0SXJDO0lBd0lDLENBQUE7Ozs7OztBQTdIRCwwQkE2SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJbmZvV2luZG93IH0gZnJvbSAnLi4vaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUge0BsaW5rIEluZm9XaW5kb3d9IGNvbnRyYWN0IGZvciB0aGUgQmluZyBNYXBzIFY4IG1hcCBhcmNoaXRlY3R1cmUuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgQmluZ0luZm9XaW5kb3cgaW1wbGVtZW50cyBJbmZvV2luZG93IHtcblxuICAgIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgaW5mbyBib3ggaXMgY3VycmVudGx5IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3ggJiYgdGhpcy5faW5mb0JveC5nZXRPcHRpb25zKCkudmlzaWJsZSA9PT0gdHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBuYXRpdmUgcHJpbWl0dmUgdW5kZXJseWluZyB0aGUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IE1pY3Jvc29mdC5NYXBzLkluZm9ib3gge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb0JveDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdJbmZvV2luZG93LlxuICAgICAqIEBwYXJhbSBfaW5mb0JveCAtIEEge0BsaW5rIE1pY3Jvc29mdC5NYXBzLkluZm9ib3h9IGluc3RhbmNlIHVuZGVybHlpbmcgdGhlIG1vZGVsXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb0JveDogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCkge1xuICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBJbmZvV2luZG93LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9pbmZvQm94LCBldmVudFR5cGUsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5ldmVudE5hbWUgPT09ICdpbmZvYm94Q2hhbmdlZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5mb0JveC5nZXRPcHRpb25zKCkudmlzaWJsZSA9PT0gdHJ1ZSkgeyB0aGlzLl9pc09wZW4gPSB0cnVlOyB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSBmYWxzZSAmJiB0aGlzLl9pc09wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklJbmZvYm94T3B0aW9ucyA9IHt9O1xuICAgICAgICBvLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gUmV0dXJucyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIEdldFBvc2l0aW9uKCk6IElMYXRMb25nIHtcbiAgICAgICAgY29uc3QgcDogSUxhdExvbmcgPSB7XG4gICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5faW5mb0JveC5nZXRMb2NhdGlvbigpLmxhdGl0dWRlLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLl9pbmZvQm94LmdldExvY2F0aW9uKCkubG9uZ2l0dWRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgT3BlbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zID0ge307XG4gICAgICAgIG8udmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2luZm9Cb3guc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBJbmZvIHdpbmRvdyBvcHRpb25zIHRvIHNldC4gVGhlIG9wdGlvbnMgd2lsbCBiZSBtZXJnZWQgd2l0aCBhbnkgZXhpc3Rpbmcgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUluZm9Cb3hPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9pbmZvQm94LnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBHZW8gY29vcmRpbmF0ZXMgdG8gbW92ZSB0aGUgYW5jaG9yIG9mIHRoZSBpbmZvIHdpbmRvdyB0by5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24ocG9zaXRpb246IElMYXRMb25nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGw6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRMb2NhdGlvbihsKTtcbiAgICB9XG59XG4iXX0=