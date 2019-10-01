/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoBoxService } from '../infobox.service';
import { MarkerService } from '../marker.service';
import { MapService } from '../map.service';
import { GoogleMapEventsLookup } from '../../models/google/google-events-lookup';
export class GoogleInfoBoxService extends InfoBoxService {
    /**
     * Creates an instance of GoogleInfoBoxService.
     * \@memberof GoogleInfoBoxService
     * @param {?} _mapService
     * @param {?} _markerService
     * @param {?} _zone
     *
     */
    constructor(_mapService, _markerService, _zone) {
        super();
        this._mapService = _mapService;
        this._markerService = _markerService;
        this._zone = _zone;
        this._boxes = new Map();
    }
    /**
     * Creates a new instance of an info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    AddInfoWindow(info) {
        /** @type {?} */
        const options = {};
        if (info.HtmlContent !== '') {
            options.htmlContent = info.HtmlContent;
        }
        else {
            options.title = info.Title;
            options.description = info.Description;
        }
        if (info.xOffset || info.yOffset) {
            if (options.pixelOffset == null) {
                options.pixelOffset = { x: 0, y: 0 };
            }
            if (info.xOffset) {
                options.pixelOffset.x = info.xOffset;
            }
            if (info.yOffset) {
                options.pixelOffset.y = info.yOffset;
            }
        }
        options.disableAutoPan = info.DisableAutoPan;
        options.visible = info.Visible;
        if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
            options.position = { latitude: info.Latitude, longitude: info.Longitude };
        }
        /** @type {?} */
        const infoWindowPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoWindowPromise);
    }
    /**
     * Closes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @return {?} -  A promise that is resolved when the info box is closed.
     *
     */
    Close(info) {
        return this._boxes.get(info).then(w => {
            w.Close();
        });
    }
    /**
     * Registers an event delegate for an info window.
     *
     * \@memberof GoogleInfoBoxService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    CreateEventObservable(eventName, infoComponent) {
        /** @type {?} */
        const googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create((observer) => {
            this._boxes.get(infoComponent).then((b) => {
                b.AddListener(googleEventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Deletes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    DeleteInfoWindow(info) {
        return Promise.resolve();
    }
    /**
     * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?=} loc
     * @return {?}
     */
    Open(info, loc) {
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes
            this._boxes.forEach((box, i) => {
                if (info.Id !== i.Id) {
                    box.then((w) => {
                        if (w.IsOpen) {
                            w.Close();
                            i.Close();
                        }
                    });
                }
            });
        }
        return this._boxes.get(info).then((w) => {
            /** @type {?} */
            const options = {};
            if (info.HtmlContent !== '') {
                options.htmlContent = info.HtmlContent;
            }
            else {
                options.title = info.Title;
                options.description = info.Description;
            }
            w.SetOptions(options);
            if (info.HostMarker != null) {
                return this._markerService.GetNativeMarker(info.HostMarker).then((marker) => {
                    return this._mapService.MapPromise.then((map) => (/** @type {?} */ (w)).Open((/** @type {?} */ (marker)).NativePrimitve));
                });
            }
            return this._mapService.MapPromise.then((map) => {
                if (loc) {
                    w.SetPosition(loc);
                }
                w.Open();
            });
        });
    }
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} options
     *
     * @return {?}
     */
    SetOptions(info, options) {
        return this._boxes.get(info).then((w) => {
            w.SetOptions(options);
        });
    }
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} latlng
     *
     * @return {?}
     */
    SetPosition(info, latlng) {
        this._boxes.get(info).then((w) => {
            w.SetPosition(latlng);
        });
        return Promise.resolve();
    }
}
GoogleInfoBoxService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleInfoBoxService.ctorParameters = () => [
    { type: MapService },
    { type: MarkerService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    GoogleInfoBoxService.prototype._boxes;
    /** @type {?} */
    GoogleInfoBoxService.prototype._mapService;
    /** @type {?} */
    GoogleInfoBoxService.prototype._markerService;
    /** @type {?} */
    GoogleInfoBoxService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm9ib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUk1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUdqRixNQUFNLDJCQUE0QixTQUFRLGNBQWM7Ozs7Ozs7OztJQW9CcEQsWUFBb0IsV0FBdUIsRUFDL0IsZ0JBQ0E7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUhRLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQy9CLG1CQUFjLEdBQWQsY0FBYztRQUNkLFVBQUssR0FBTCxLQUFLO3NCQWhCNEMsSUFBSSxHQUFHLEVBQStDO0tBa0JsSDs7Ozs7Ozs7O0lBU00sYUFBYSxDQUFDLElBQXNCOztRQUN2QyxNQUFNLE9BQU8sR0FBdUIsRUFBRSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFX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Q0FBQyxDQUFDO2lCQUN2SCxDQUFDLENBQUM7YUFDTjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDNUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0EsVUFBVSxDQUFDLElBQXNCLEVBQUUsT0FBMkI7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQW1CLEVBQUUsRUFBRTtZQUN0RCxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXQSxXQUFXLENBQUMsSUFBc0IsRUFBRSxNQUFnQjtRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7WUEzS2hDLFVBQVU7Ozs7WUFORixVQUFVO1lBRFYsYUFBYTtZQU5ELE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmZvYm94JztcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vaW5mb2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBHb29nbGVJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcbmltcG9ydCB7IEdvb2dsZU1hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWV2ZW50cy1sb29rdXAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlSW5mb0JveFNlcnZpY2UgZXh0ZW5kcyBJbmZvQm94U2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICBwcml2YXRlIF9ib3hlczogTWFwPEluZm9Cb3hDb21wb25lbnQsIFByb21pc2U8SW5mb1dpbmRvdz4+ID0gbmV3IE1hcDxJbmZvQm94Q29tcG9uZW50LCBQcm9taXNlPEdvb2dsZUluZm9XaW5kb3c+PigpO1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVJbmZvQm94U2VydmljZS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2VcbiAgICAgKiBAcGFyYW0gX21hcmtlclNlcnZpY2VcbiAgICAgKiBAcGFyYW0gX3pvbmVcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX21hcmtlclNlcnZpY2U6IE1hcmtlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkSW5mb1dpbmRvdyhpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xuICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XG4gICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5mby54T2Zmc2V0IHx8IGluZm8ueU9mZnNldCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGl4ZWxPZmZzZXQgPT0gbnVsbCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07IH1cbiAgICAgICAgICAgIGlmIChpbmZvLnhPZmZzZXQpIHsgb3B0aW9ucy5waXhlbE9mZnNldC54ID0gaW5mby54T2Zmc2V0OyB9XG4gICAgICAgICAgICBpZiAoaW5mby55T2Zmc2V0KSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQueSA9IGluZm8ueU9mZnNldDsgfVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuZGlzYWJsZUF1dG9QYW4gPSBpbmZvLkRpc2FibGVBdXRvUGFuO1xuICAgICAgICBvcHRpb25zLnZpc2libGUgPSBpbmZvLlZpc2libGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvLkxhdGl0dWRlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgaW5mby5Mb25naXR1ZGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBvcHRpb25zLnBvc2l0aW9uID0geyBsYXRpdHVkZTogaW5mby5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBpbmZvLkxvbmdpdHVkZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVJbmZvV2luZG93KG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9ib3hlcy5zZXQoaW5mbywgaW5mb1dpbmRvd1Byb21pc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHJldHVybnMgLSAgQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgaW5mbyBib3ggaXMgY2xvc2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENsb3NlKGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKHcgPT4ge1xuICAgICAgICAgICAgdy5DbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGFuIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxuICAgICAqIEBwYXJhbSBpbmZvQ29tcG9uZW50IC0gVGhlIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBpbmZvQ29tcG9uZW50OiBJbmZvQm94Q29tcG9uZW50KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IGdvb2dsZUV2ZW50TmFtZTogc3RyaW5nID0gR29vZ2xlTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9ib3hlcy5nZXQoaW5mb0NvbXBvbmVudCkudGhlbigoYjogSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgICAgIGIuQWRkTGlzdGVuZXIoZ29vZ2xlRXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGluZm8gd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZUluZm9XaW5kb3coaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93LiBXaW5kb3cgb3BlbnMgb24gYSBtYXJrZXIsIGlmIHN1cHBsaWVkLCBvciBhIHNwZWNpZmljIGxvY2F0aW9uIGlmIGdpdmVuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqIEBwYXJhbSBbbG9jXVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIE9wZW4oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbG9jPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKGluZm8uQ2xvc2VJbmZvQm94ZXNPbk9wZW4gfHwgaW5mby5Nb2RhbCkge1xuICAgICAgICAgICAgLy8gY2xvc2UgYWxsIG9wZW4gaW5mbyBib3hlc1xuICAgICAgICAgICAgdGhpcy5fYm94ZXMuZm9yRWFjaCgoYm94OiBQcm9taXNlPEluZm9XaW5kb3c+LCBpOiBJbmZvQm94Q29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSWQgIT09IGkuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm94LnRoZW4oKHcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3LklzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcuQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodzogR29vZ2xlSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zID0ge307XG4gICAgICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmh0bWxDb250ZW50ID0gaW5mby5IdG1sQ29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPSBpbmZvLlRpdGxlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGVzY3JpcHRpb24gPSBpbmZvLkRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdy5TZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGluZm8uSG9zdE1hcmtlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuR2V0TmF0aXZlTWFya2VyKGluZm8uSG9zdE1hcmtlcikudGhlbigobWFya2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobWFwKSA9PiAoPEdvb2dsZUluZm9XaW5kb3c+dykuT3BlbigoPEdvb2dsZU1hcmtlcj5tYXJrZXIpLk5hdGl2ZVByaW1pdHZlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4oKG1hcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsb2MpIHsgdy5TZXRQb3NpdGlvbihsb2MpOyB9XG4gICAgICAgICAgICAgICAgdy5PcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMoaW5mbzogSW5mb0JveENvbXBvbmVudCwgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodzogR29vZ2xlSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgdy5TZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gbGF0bG5nXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbGF0bG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodykgPT4ge1xuICAgICAgICAgICAgdy5TZXRQb3NpdGlvbihsYXRsbmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxufVxuIl19