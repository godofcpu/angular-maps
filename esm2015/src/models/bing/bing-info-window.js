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
export class BingInfoWindow {
    /**
     * Creates an instance of BingInfoWindow.
     * \@memberof BingInfoWindow
     * @param {?} _infoBox - A {\@link Microsoft.Maps.Infobox} instance underlying the model
     */
    constructor(_infoBox) {
        this._infoBox = _infoBox;
        this._isOpen = false;
    }
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * \@memberof BingInfoWindow
     * @return {?}
     */
    get IsOpen() {
        if (this._infoBox && this._infoBox.getOptions().visible === true) {
            return true;
        }
        return false;
    }
    /**
     * Gets native primitve underlying the model.
     *
     * \@memberof BingInfoWindow
     * \@property
     * \@readonly
     * @return {?}
     */
    get NativePrimitve() {
        return this._infoBox;
    }
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
    AddListener(eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._infoBox, eventType, (e) => {
            if (e.eventName === 'infoboxChanged') {
                if (this._infoBox.getOptions().visible === true) {
                    this._isOpen = true;
                }
                else {
                    if (this._infoBox.getOptions().visible === false && this._isOpen === true) {
                        this._isOpen = false;
                        fn(e);
                    }
                }
            }
            else {
                fn(e);
            }
        });
    }
    /**
     * Closes the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    Close() {
        /** @type {?} */
        const o = {};
        o.visible = false;
        this._infoBox.setOptions(o);
    }
    /**
     * Gets the position of the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?} - Returns the geo coordinates of the info window.
     */
    GetPosition() {
        /** @type {?} */
        const p = {
            latitude: this._infoBox.getLocation().latitude,
            longitude: this._infoBox.getLocation().longitude
        };
        return p;
    }
    /**
     * Opens the info window.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @return {?}
     */
    Open() {
        /** @type {?} */
        const o = {};
        o.visible = true;
        this._infoBox.setOptions(o);
    }
    /**
     * Sets the info window options.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} options - Info window options to set. The options will be merged with any existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = BingConversions.TranslateInfoBoxOptions(options);
        this._infoBox.setOptions(o);
    }
    /**
     * Sets the info window position.
     *
     * \@memberof BingInfoWindow
     * \@method
     * @param {?} position - Geo coordinates to move the anchor of the info window to.
     *
     * @return {?}
     */
    SetPosition(position) {
        /** @type {?} */
        const l = BingConversions.TranslateLocation(position);
        this._infoBox.setLocation(l);
    }
}
if (false) {
    /** @type {?} */
    BingInfoWindow.prototype._isOpen;
    /** @type {?} */
    BingInfoWindow.prototype._infoBox;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvLXdpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQU92RSxNQUFNOzs7Ozs7SUErQkYsWUFBb0IsUUFBZ0M7UUFBaEMsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDeEI7Ozs7Ozs7O1FBdkJVLE1BQU07UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDbEYsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7OztRQVVOLGNBQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7OztJQXFCbEIsV0FBVyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTtnQkFDekUsSUFBSSxDQUFDLENBQUM7b0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Q7U0FDSixDQUFDLENBQUM7Ozs7Ozs7OztJQVNBLEtBQUs7O1FBQ1IsTUFBTSxDQUFDLEdBQW1DLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXpCLFdBQVc7O1FBQ2QsTUFBTSxDQUFDLEdBQWE7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUTtZQUM5QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTO1NBQ25ELENBQUM7UUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUFTTixJQUFJOztRQUNQLE1BQU0sQ0FBQyxHQUFtQyxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV3pCLFVBQVUsQ0FBQyxPQUEyQjs7UUFDekMsTUFBTSxDQUFDLEdBQW1DLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXekIsV0FBVyxDQUFDLFFBQWtCOztRQUNqQyxNQUFNLENBQUMsR0FBNEIsZUFBZSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztDQUVwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgSW5mb1dpbmRvd30gY29udHJhY3QgZm9yIHRoZSBCaW5nIE1hcHMgVjggbWFwIGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5nSW5mb1dpbmRvdyBpbXBsZW1lbnRzIEluZm9XaW5kb3cge1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBpbmZvIGJveCBpcyBjdXJyZW50bHkgb3Blbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5faW5mb0JveCAmJiB0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSB0cnVlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG5hdGl2ZSBwcmltaXR2ZSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuSW5mb2JveCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvQm94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ0luZm9XaW5kb3cuXG4gICAgICogQHBhcmFtIF9pbmZvQm94IC0gQSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuSW5mb2JveH0gaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgbW9kZWxcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9XaW5kb3dcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmZvQm94OiBNaWNyb3NvZnQuTWFwcy5JbmZvYm94KSB7XG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIEluZm9XaW5kb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX2luZm9Cb3gsIGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmV2ZW50TmFtZSA9PT0gJ2luZm9ib3hDaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94LmdldE9wdGlvbnMoKS52aXNpYmxlID09PSB0cnVlKSB7IHRoaXMuX2lzT3BlbiA9IHRydWU7IH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3guZ2V0T3B0aW9ucygpLnZpc2libGUgPT09IGZhbHNlICYmIHRoaXMuX2lzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBDbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zID0ge307XG4gICAgICAgIG8udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbmZvQm94LnNldE9wdGlvbnMobyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBSZXR1cm5zIHRoZSBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgICAqIEBtZW1iZXJvZiBCaW5nSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UG9zaXRpb24oKTogSUxhdExvbmcge1xuICAgICAgICBjb25zdCBwOiBJTGF0TG9uZyA9IHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLl9pbmZvQm94LmdldExvY2F0aW9uKCkubGF0aXR1ZGUsXG4gICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuX2luZm9Cb3guZ2V0TG9jYXRpb24oKS5sb25naXR1ZGVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBPcGVuKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgPSB7fTtcbiAgICAgICAgby52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faW5mb0JveC5zZXRPcHRpb25zKG8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluZm8gd2luZG93IG9wdGlvbnMgdG8gc2V0LiBUaGUgb3B0aW9ucyB3aWxsIGJlIG1lcmdlZCB3aXRoIGFueSBleGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JSW5mb2JveE9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luZm9Cb3guc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiAtIEdlbyBjb29yZGluYXRlcyB0byBtb3ZlIHRoZSBhbmNob3Igb2YgdGhlIGluZm8gd2luZG93IHRvLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQb3NpdGlvbihwb3NpdGlvbjogSUxhdExvbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLl9pbmZvQm94LnNldExvY2F0aW9uKGwpO1xuICAgIH1cbn1cbiJdfQ==