/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoBoxService } from '../infobox.service';
import { MarkerService } from '../marker.service';
import { MapService } from '../map.service';
import { GoogleMapEventsLookup } from '../../models/google/google-events-lookup';
var GoogleInfoBoxService = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleInfoBoxService, _super);
    ///
    /// Constructors
    ///
    /**
     * Creates an instance of GoogleInfoBoxService.
     * @param _mapService
     * @param _markerService
     * @param _zone
     *
     * @memberof GoogleInfoBoxService
     */
    function GoogleInfoBoxService(_mapService, _markerService, _zone) {
        var _this = _super.call(this) || this;
        _this._mapService = _mapService;
        _this._markerService = _markerService;
        _this._zone = _zone;
        _this._boxes = new Map();
        return _this;
    }
    /**
     * Creates a new instance of an info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.AddInfoWindow = /**
     * Creates a new instance of an info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    function (info) {
        /** @type {?} */
        var options = {};
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
        var infoWindowPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoWindowPromise);
    };
    /**
     * Closes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @return {?} -  A promise that is resolved when the info box is closed.
     *
     */
    GoogleInfoBoxService.prototype.Close = /**
     * Closes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @return {?} -  A promise that is resolved when the info box is closed.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (w) {
            w.Close();
        });
    };
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
    GoogleInfoBoxService.prototype.CreateEventObservable = /**
     * Registers an event delegate for an info window.
     *
     * \@memberof GoogleInfoBoxService
     * @template T
     * @param {?} eventName - The name of the event to register (e.g. 'click')
     * @param {?} infoComponent - The {\@link InfoBoxComponent} for which to register the event.
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    function (eventName, infoComponent) {
        var _this = this;
        /** @type {?} */
        var googleEventName = GoogleMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._boxes.get(infoComponent).then(function (b) {
                b.AddListener(googleEventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.DeleteInfoWindow = /**
     * Deletes the info window
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     *
     * @return {?}
     */
    function (info) {
        return Promise.resolve();
    };
    /**
     * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?=} loc
     * @return {?}
     */
    GoogleInfoBoxService.prototype.Open = /**
     * Opens the info window. Window opens on a marker, if supplied, or a specific location if given
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?=} loc
     * @return {?}
     */
    function (info, loc) {
        var _this = this;
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes
            this._boxes.forEach(function (box, i) {
                if (info.Id !== i.Id) {
                    box.then(function (w) {
                        if (w.IsOpen) {
                            w.Close();
                            i.Close();
                        }
                    });
                }
            });
        }
        return this._boxes.get(info).then(function (w) {
            /** @type {?} */
            var options = {};
            if (info.HtmlContent !== '') {
                options.htmlContent = info.HtmlContent;
            }
            else {
                options.title = info.Title;
                options.description = info.Description;
            }
            w.SetOptions(options);
            if (info.HostMarker != null) {
                return _this._markerService.GetNativeMarker(info.HostMarker).then(function (marker) {
                    return _this._mapService.MapPromise.then(function (map) { return (/** @type {?} */ (w)).Open((/** @type {?} */ (marker)).NativePrimitve); });
                });
            }
            return _this._mapService.MapPromise.then(function (map) {
                if (loc) {
                    w.SetPosition(loc);
                }
                w.Open();
            });
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} options
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.SetOptions = /**
     * Sets the info window options
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} options
     *
     * @return {?}
     */
    function (info, options) {
        return this._boxes.get(info).then(function (w) {
            w.SetOptions(options);
        });
    };
    /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} latlng
     *
     * @return {?}
     */
    GoogleInfoBoxService.prototype.SetPosition = /**
     * Sets the info window position
     *
     * \@memberof GoogleInfoBoxService
     * @param {?} info
     * @param {?} latlng
     *
     * @return {?}
     */
    function (info, latlng) {
        this._boxes.get(info).then(function (w) {
            w.SetPosition(latlng);
        });
        return Promise.resolve();
    };
    GoogleInfoBoxService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GoogleInfoBoxService.ctorParameters = function () { return [
        { type: MapService },
        { type: MarkerService },
        { type: NgZone }
    ]; };
    return GoogleInfoBoxService;
}(InfoBoxService));
export { GoogleInfoBoxService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWluZm9ib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0lBR3ZDLGdEQUFjO0lBUXBELEdBQUc7SUFDSCxnQkFBZ0I7SUFDaEIsR0FBRztJQUVIOzs7Ozs7O09BT0c7SUFDSCw4QkFBb0IsV0FBdUIsRUFDL0IsZ0JBQ0E7UUFGWixZQUdJLGlCQUFPLFNBQ1Y7UUFKbUIsaUJBQVcsR0FBWCxXQUFXLENBQVk7UUFDL0Isb0JBQWMsR0FBZCxjQUFjO1FBQ2QsV0FBSyxHQUFMLEtBQUs7dUJBaEI0QyxJQUFJLEdBQUcsRUFBK0M7O0tBa0JsSDs7Ozs7Ozs7O0lBU00sNENBQWE7Ozs7Ozs7O2NBQUMsSUFBc0I7O1FBQ3ZDLElBQU0sT0FBTyxHQUF1QixFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lB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LENBQUMsY0FBYyxDQUFDLEVBQWpFLENBQWlFLENBQUMsQ0FBQztpQkFDdkgsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDeEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV0EseUNBQVU7Ozs7Ozs7OztjQUFDLElBQXNCLEVBQUUsT0FBMkI7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQW1CO1lBQ2xELENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVdBLDBDQUFXOzs7Ozs7Ozs7Y0FBQyxJQUFzQixFQUFFLE1BQWdCO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Z0JBM0toQyxVQUFVOzs7O2dCQU5GLFVBQVU7Z0JBRFYsYUFBYTtnQkFORCxNQUFNOzsrQkFBM0I7RUFjMEMsY0FBYztTQUEzQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbmZvYm94JztcbmltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IEluZm9Cb3hTZXJ2aWNlIH0gZnJvbSAnLi4vaW5mb2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBHb29nbGVJbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgR29vZ2xlTWFya2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyJztcbmltcG9ydCB7IEdvb2dsZU1hcEV2ZW50c0xvb2t1cCB9IGZyb20gJy4uLy4uL21vZGVscy9nb29nbGUvZ29vZ2xlLWV2ZW50cy1sb29rdXAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlSW5mb0JveFNlcnZpY2UgZXh0ZW5kcyBJbmZvQm94U2VydmljZSB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICBwcml2YXRlIF9ib3hlczogTWFwPEluZm9Cb3hDb21wb25lbnQsIFByb21pc2U8SW5mb1dpbmRvdz4+ID0gbmV3IE1hcDxJbmZvQm94Q29tcG9uZW50LCBQcm9taXNlPEdvb2dsZUluZm9XaW5kb3c+PigpO1xuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHb29nbGVJbmZvQm94U2VydmljZS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2VcbiAgICAgKiBAcGFyYW0gX21hcmtlclNlcnZpY2VcbiAgICAgKiBAcGFyYW0gX3pvbmVcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX21hcmtlclNlcnZpY2U6IE1hcmtlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkSW5mb1dpbmRvdyhpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyA9IHt9O1xuICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XG4gICAgICAgICAgICBvcHRpb25zLmRlc2NyaXB0aW9uID0gaW5mby5EZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5mby54T2Zmc2V0IHx8IGluZm8ueU9mZnNldCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGl4ZWxPZmZzZXQgPT0gbnVsbCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07IH1cbiAgICAgICAgICAgIGlmIChpbmZvLnhPZmZzZXQpIHsgb3B0aW9ucy5waXhlbE9mZnNldC54ID0gaW5mby54T2Zmc2V0OyB9XG4gICAgICAgICAgICBpZiAoaW5mby55T2Zmc2V0KSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQueSA9IGluZm8ueU9mZnNldDsgfVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuZGlzYWJsZUF1dG9QYW4gPSBpbmZvLkRpc2FibGVBdXRvUGFuO1xuICAgICAgICBvcHRpb25zLnZpc2libGUgPSBpbmZvLlZpc2libGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvLkxhdGl0dWRlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgaW5mby5Mb25naXR1ZGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBvcHRpb25zLnBvc2l0aW9uID0geyBsYXRpdHVkZTogaW5mby5MYXRpdHVkZSwgbG9uZ2l0dWRlOiBpbmZvLkxvbmdpdHVkZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwU2VydmljZS5DcmVhdGVJbmZvV2luZG93KG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9ib3hlcy5zZXQoaW5mbywgaW5mb1dpbmRvd1Byb21pc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgaW5mbyB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHJldHVybnMgLSAgQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgaW5mbyBib3ggaXMgY2xvc2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENsb3NlKGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKHcgPT4ge1xuICAgICAgICAgICAgdy5DbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgZGVsZWdhdGUgZm9yIGFuIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxuICAgICAqIEBwYXJhbSBpbmZvQ29tcG9uZW50IC0gVGhlIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgQ3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBpbmZvQ29tcG9uZW50OiBJbmZvQm94Q29tcG9uZW50KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIGNvbnN0IGdvb2dsZUV2ZW50TmFtZTogc3RyaW5nID0gR29vZ2xlTWFwRXZlbnRzTG9va3VwW2V2ZW50TmFtZV07XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9ib3hlcy5nZXQoaW5mb0NvbXBvbmVudCkudGhlbigoYjogSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgICAgIGIuQWRkTGlzdGVuZXIoZ29vZ2xlRXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGluZm8gd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZUluZm9XaW5kb3coaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGluZm8gd2luZG93LiBXaW5kb3cgb3BlbnMgb24gYSBtYXJrZXIsIGlmIHN1cHBsaWVkLCBvciBhIHNwZWNpZmljIGxvY2F0aW9uIGlmIGdpdmVuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqIEBwYXJhbSBbbG9jXVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIE9wZW4oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbG9jPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKGluZm8uQ2xvc2VJbmZvQm94ZXNPbk9wZW4gfHwgaW5mby5Nb2RhbCkge1xuICAgICAgICAgICAgLy8gY2xvc2UgYWxsIG9wZW4gaW5mbyBib3hlc1xuICAgICAgICAgICAgdGhpcy5fYm94ZXMuZm9yRWFjaCgoYm94OiBQcm9taXNlPEluZm9XaW5kb3c+LCBpOiBJbmZvQm94Q29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSWQgIT09IGkuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm94LnRoZW4oKHcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3LklzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcuQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodzogR29vZ2xlSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zID0ge307XG4gICAgICAgICAgICBpZiAoaW5mby5IdG1sQ29udGVudCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmh0bWxDb250ZW50ID0gaW5mby5IdG1sQ29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPSBpbmZvLlRpdGxlO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGVzY3JpcHRpb24gPSBpbmZvLkRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdy5TZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGluZm8uSG9zdE1hcmtlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuR2V0TmF0aXZlTWFya2VyKGluZm8uSG9zdE1hcmtlcikudGhlbigobWFya2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBTZXJ2aWNlLk1hcFByb21pc2UudGhlbigobWFwKSA9PiAoPEdvb2dsZUluZm9XaW5kb3c+dykuT3BlbigoPEdvb2dsZU1hcmtlcj5tYXJrZXIpLk5hdGl2ZVByaW1pdHZlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwU2VydmljZS5NYXBQcm9taXNlLnRoZW4oKG1hcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsb2MpIHsgdy5TZXRQb3NpdGlvbihsb2MpOyB9XG4gICAgICAgICAgICAgICAgdy5PcGVuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mbyB3aW5kb3cgb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMoaW5mbzogSW5mb0JveENvbXBvbmVudCwgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodzogR29vZ2xlSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICAgICAgdy5TZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvIHdpbmRvdyBwb3NpdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gbGF0bG5nXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbGF0bG5nOiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLl9ib3hlcy5nZXQoaW5mbykudGhlbigodykgPT4ge1xuICAgICAgICAgICAgdy5TZXRQb3NpdGlvbihsYXRsbmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxufVxuIl19