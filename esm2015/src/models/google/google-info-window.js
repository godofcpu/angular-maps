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
export class GoogleInfoWindow {
    /**
     * Creates an instance of GoogleInfoWindow.
     * \@memberof GoogleInfoWindow
     * @param {?} _infoWindow - A {\@link GoogleMapTypes.InfoWindow} instance underlying the model.
     * @param {?} _mapService - An instance of the {\@link GoogleMapService}.
     */
    constructor(_infoWindow, _mapService) {
        this._infoWindow = _infoWindow;
        this._mapService = _mapService;
    }
    /**
     * Gets whether the info box is currently open.
     *
     * \@readonly
     * \@memberof InfoWGoogleInfoWindowindow
     * @return {?}
     */
    get IsOpen() {
        if (this._isOpen === true) {
            return true;
        }
        return false;
    }
    /**
     * Gets the underlying native object.
     *
     * \@property
     * \@readonly
     * @return {?}
     */
    get NativePrimitve() {
        return this._infoWindow;
    }
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
    AddListener(eventType, fn) {
        this._infoWindow.addListener(eventType, (e) => {
            if (eventType === 'closeclick') {
                this._isOpen = false;
            }
            fn(e);
        });
    }
    /**
     *
     * Closes the info window.
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?}
     */
    Close() {
        this._isOpen = false;
        this._infoWindow.close();
    }
    /**
     * Gets the position of the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @return {?} - The geo coordinates of the info window.
     *
     */
    GetPosition() {
        return GoogleConversions.TranslateLatLngObject(this._infoWindow.getPosition());
    }
    /**
     * Opens the info window
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?=} anchor
     * @return {?}
     */
    Open(anchor) {
        this._mapService.MapPromise.then(m => {
            this._isOpen = true;
            this._infoWindow.open(m, anchor);
        });
    }
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} options - The options to set. This object will be merged with the existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = GoogleConversions.TranslateInfoWindowOptions(options);
        this._infoWindow.setOptions(o);
    }
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoWindow
     * \@method
     * @param {?} position - Geo coordinates at which to anchor the info window.
     *
     * @return {?}
     */
    SetPosition(position) {
        /** @type {?} */
        const l = GoogleConversions.TranslateLocation(position);
        this._infoWindow.setPosition(l);
    }
}
if (false) {
    /** @type {?} */
    GoogleInfoWindow.prototype._isOpen;
    /** @type {?} */
    GoogleInfoWindow.prototype._infoWindow;
    /** @type {?} */
    GoogleInfoWindow.prototype._mapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7O0FBWTdFLE1BQU07Ozs7Ozs7SUFtQ0YsWUFBb0IsV0FBc0MsRUFBVSxXQUE2QjtRQUE3RSxnQkFBVyxHQUFYLFdBQVcsQ0FBMkI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7S0FBSzs7Ozs7Ozs7UUF6QjNGLE1BQU07UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O1FBU04sY0FBYztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7O0lBNEJyQixXQUFXLENBQUMsU0FBaUIsRUFBRSxFQUFZO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQUU7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBVUEsS0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFXdEIsV0FBVztRQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXNUUsSUFBSSxDQUFDLE1BQVk7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0EsVUFBVSxDQUFDLE9BQTJCOztRQUN6QyxNQUFNLENBQUMsR0FBcUMsaUJBQWlCLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBVzVCLFdBQVcsQ0FBQyxRQUFrQjs7UUFDakMsTUFBTSxDQUFDLEdBQWlDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztDQUV2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XG5pbXBvcnQgeyBHb29nbGVNYXBTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcyc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIGZvciBhIHtAbGluayBJbmZvV2luZG93fX0gbW9kZWwgZm9yIEdvb2dsZSBNYXBzLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZUluZm9XaW5kb3cgaW1wbGVtZW50cyBJbmZvV2luZG93IHtcblxuICAgIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgaW5mbyBib3ggaXMgY3VycmVudGx5IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgSW5mb1dHb29nbGVJbmZvV2luZG93aW5kb3dcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzT3BlbiA9PT0gdHJ1ZSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5kZXJseWluZyBuYXRpdmUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3c7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIGNvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZUluZm9XaW5kb3cuXG4gICAgICogQHBhcmFtIF9pbmZvV2luZG93IC0gQSB7QGxpbmsgR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd30gaW5zdGFuY2UgdW5kZXJseWluZyB0aGUgbW9kZWwuXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQW4gaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBHb29nbGVNYXBTZXJ2aWNlfS5cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luZm9XaW5kb3c6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3csIHByaXZhdGUgX21hcFNlcnZpY2U6IEdvb2dsZU1hcFNlcnZpY2UpIHsgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIEluZm9XaW5kb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgbGlzdGVuZXIgKGUuZy4gXCJjbGlja1wiKVxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5hZGRMaXN0ZW5lcihldmVudFR5cGUsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdjbG9zZWNsaWNrJykgeyB0aGlzLl9pc09wZW4gPSBmYWxzZTsgfVxuICAgICAgICAgICAgZm4oZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2xvc2VzIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvV2luZG93XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBDbG9zZSgpIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuY2xvc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UG9zaXRpb24oKTogSUxhdExvbmcge1xuICAgICAgICByZXR1cm4gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTGF0TG5nT2JqZWN0KHRoaXMuX2luZm9XaW5kb3cuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gW2FuY2hvcl0gLSBPcHRpb25hbCBBbmNob3IuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgT3BlbihhbmNob3I/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4obSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW5mb1dpbmRvdy5vcGVuKG0sIGFuY2hvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gc2V0LiBUaGlzIG9iamVjdCB3aWxsIGJlIG1lcmdlZCB3aXRoIHRoZSBleGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9XaW5kb3dcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHBvc2l0aW9uIC0gR2VvIGNvb3JkaW5hdGVzIGF0IHdoaWNoIHRvIGFuY2hvciB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb1dpbmRvd1xuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24ocG9zaXRpb246IElMYXRMb25nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3cuc2V0UG9zaXRpb24obCk7XG4gICAgfVxufVxuIl19