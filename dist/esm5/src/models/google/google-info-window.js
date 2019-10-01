/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GoogleConversions } from '../../services/google/google-conversions';
/**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
GoogleInfoWindow = /** @class */ (function () {
    ///
    /// constructor
    ///
    /**
     * Creates an instance of GoogleInfoWindow.
     * @param _infoWindow - A {@link GoogleMapTypes.InfoWindow} instance underlying the model.
     * @param _mapService - An instance of the {@link GoogleMapService}.
     * @memberof GoogleInfoWindow
     */
    function GoogleInfoWindow(_infoWindow, _mapService) {
        this._infoWindow = _infoWindow;
        this._mapService = _mapService;
    }
    Object.defineProperty(GoogleInfoWindow.prototype, "IsOpen", {
        get: /**
         * Gets whether the info box is currently open.
         *
         * \@readonly
         * \@memberof InfoWGoogleInfoWindowindow
         * @return {?}
         */
        function () {
            if (this._isOpen === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleInfoWindow.prototype, "NativePrimitve", {
        get: /**
         * Gets the underlying native object.
         *
         * \@property
         * \@readonly
         * @return {?}
         */
        function () {
            return this._infoWindow;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.AddListener = /**
     * Adds an event listener to the InfoWindow.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        this._infoWindow.addListener(eventType, function (e) {
            if (eventType === 'closeclick') {
                _this._isOpen = false;
            }
            fn(e);
        });
    };
    /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    GoogleInfoWindow.prototype.Close = /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    function () {
        this._isOpen = false;
        this._infoWindow.close();
    };
    /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    GoogleInfoWindow.prototype.GetPosition = /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    function () {
        return GoogleConversions.TranslateLatLngObject(this._infoWindow.getPosition());
    };
    /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    GoogleInfoWindow.prototype.Open = /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    function (anchor) {
        var _this = this;
        this._mapService.MapPromise.then(function (m) {
            _this._isOpen = true;
            _this._infoWindow.open(m, anchor);
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.SetOptions = /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = GoogleConversions.TranslateInfoWindowOptions(options);
        this._infoWindow.setOptions(o);
    };
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    GoogleInfoWindow.prototype.SetPosition = /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    function (position) {
        /** @type {?} */
        var l = GoogleConversions.TranslateLocation(position);
        this._infoWindow.setPosition(l);
    };
    return GoogleInfoWindow;
}());
/**
 * Concrete implementation for a {\@link InfoWindow}} model for Google Maps.
 *
 * @export
 */
export { GoogleInfoWindow };
if (false) {
    /** @type {?} */
    GoogleInfoWindow.prototype._isOpen;
    /** @type {?} */
    GoogleInfoWindow.prototype._infoWindow;
    /** @type {?} */
    GoogleInfoWindow.prototype._mapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0FBWTdFOzs7OztBQUFBO0lBeUJJLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7OztPQUtHO0lBQ0gsMEJBQW9CLFdBQXNDLEVBQVUsV0FBNkI7UUFBN0UsZ0JBQVcsR0FBWCxXQUFXLENBQTJCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0tBQUs7MEJBekIzRixvQ0FBTTs7Ozs7Ozs7O1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFBRTtZQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7OzswQkFTTiw0Q0FBYzs7Ozs7Ozs7O1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7SUE0QnJCLHNDQUFXOzs7Ozs7Ozs7O2NBQUMsU0FBaUIsRUFBRSxFQUFZOztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFNO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQUU7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVUEsZ0NBQUs7Ozs7Ozs7OztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFXdEIsc0NBQVc7Ozs7Ozs7OztRQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXNUUsK0JBQUk7Ozs7Ozs7O2NBQUMsTUFBWTs7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUM5QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVdBLHFDQUFVOzs7Ozs7Ozs7Y0FBQyxPQUEyQjs7UUFDekMsSUFBTSxDQUFDLEdBQXFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVc1QixzQ0FBVzs7Ozs7Ozs7O2NBQUMsUUFBa0I7O1FBQ2pDLElBQU0sQ0FBQyxHQUFpQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MkJBckl4QztJQXVJQyxDQUFBOzs7Ozs7QUF6SEQsNEJBeUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgR29vZ2xlQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IEdvb2dsZU1hcFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEge0BsaW5rIEluZm9XaW5kb3d9fSBtb2RlbCBmb3IgR29vZ2xlIE1hcHMuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlSW5mb1dpbmRvdyBpbXBsZW1lbnRzIEluZm9XaW5kb3cge1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBJbmZvV0dvb2dsZUluZm9XaW5kb3dpbmRvd1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5faXNPcGVuID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3cge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvdztcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gY29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlSW5mb1dpbmRvdy5cbiAgICAgKiBAcGFyYW0gX2luZm9XaW5kb3cgLSBBIHtAbGluayBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93fSBpbnN0YW5jZSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBBbiBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEdvb2dsZU1hcFNlcnZpY2V9LlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb1dpbmRvdzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvdywgcHJpdmF0ZSBfbWFwU2VydmljZTogR29vZ2xlTWFwU2VydmljZSkgeyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgSW5mb1dpbmRvdy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgZm9yIHdoaWNoIHRvIHJlZ2lzdGVyIHRoZSBsaXN0ZW5lciAoZS5nLiBcImNsaWNrXCIpXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93LmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2Nsb3NlY2xpY2snKSB7IHRoaXMuX2lzT3BlbiA9IGZhbHNlOyB9XG4gICAgICAgICAgICBmbihlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIENsb3NlKCkge1xuICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5jbG9zZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvd1xuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRQb3NpdGlvbigpOiBJTGF0TG9uZyB7XG4gICAgICAgIHJldHVybiBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMYXRMbmdPYmplY3QodGhpcy5faW5mb1dpbmRvdy5nZXRQb3NpdGlvbigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBbYW5jaG9yXSAtIE9wdGlvbmFsIEFuY2hvci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBPcGVuKGFuY2hvcj86IGFueSkge1xuICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbihtID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbmZvV2luZG93Lm9wZW4obSwgYW5jaG9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBzZXQuIFRoaXMgb2JqZWN0IHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIGV4aXN0aW5nIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVJbmZvV2luZG93T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IHBvc2l0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gLSBHZW8gY29vcmRpbmF0ZXMgYXQgd2hpY2ggdG8gYW5jaG9yIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihwb3NpdGlvbjogSUxhdExvbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbDogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5zZXRQb3NpdGlvbihsKTtcbiAgICB9XG59XG4iXX0=