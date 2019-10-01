/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map.service';
import { BingMapEventsLookup } from '../../models/bing/bing-events-lookup';
/**
 * Concrete implementation of the {\@link InfoBoxService} contract for the Bing Maps V8 architecture.
 *
 * @export
 */
var BingInfoBoxService = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of BingInfoBoxService.
     * @param _mapService - Concrete {@link MapService} implementation for Bing Maps V8. An instance of {@link BingMapService}.
     * @param _zone - An instance of NgZone to provide zone aware promises.
     *
     * @memberof BingInfoBoxService
     */
    function BingInfoBoxService(_mapService, _zone) {
        this._mapService = _mapService;
        this._zone = _zone;
        this._boxes = new Map();
    }
    /**
     * Adds an info window to the map or layer.
     *
     * \@memberof BingInfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    BingInfoBoxService.prototype.AddInfoWindow = /**
     * Adds an info window to the map or layer.
     *
     * \@memberof BingInfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    function (info) {
        /** @type {?} */
        var options = {};
        if (typeof info.Latitude === 'number' && typeof info.Longitude === 'number') {
            options.position = {
                latitude: info.Latitude,
                longitude: info.Longitude
            };
        }
        if (typeof info.InfoWindowActions !== 'undefined' && info.InfoWindowActions.length > 0) {
            options.actions = [];
            info.InfoWindowActions.forEach(function (action) {
                options.actions.push({
                    label: action.Label,
                    eventHandler: function () { action.ActionClicked.emit(null); }
                });
            });
        }
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
        options.visible = info.Visible;
        /** @type {?} */
        var infoPromise = this._mapService.CreateInfoWindow(options);
        this._boxes.set(info, infoPromise);
    };
    /**
     * Closes an InfoBoxComponent that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    BingInfoBoxService.prototype.Close = /**
     * Closes an InfoBoxComponent that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (w) { return w.Close(); });
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
    BingInfoBoxService.prototype.CreateEventObservable = /**
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
        var eventNameTranslated = BingMapEventsLookup[eventName];
        return Observable.create(function (observer) {
            _this._boxes.get(infoComponent).then(function (b) {
                b.AddListener(eventNameTranslated, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    BingInfoBoxService.prototype.DeleteInfoWindow = /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    function (info) {
        var _this = this;
        /** @type {?} */
        var w = this._boxes.get(info);
        if (w == null) {
            return Promise.resolve();
        }
        return w.then(function (i) {
            return _this._zone.run(function () {
                i.Close();
                _this._boxes.delete(info);
            });
        });
    };
    /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    BingInfoBoxService.prototype.Open = /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    function (info, loc) {
        if (info.CloseInfoBoxesOnOpen || info.Modal) {
            // close all open info boxes.
            this._boxes.forEach(function (v, i) {
                if (info.Id !== i.Id) {
                    v.then(function (w) {
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
            if (info.Latitude && info.Longitude) {
                w.SetPosition({ latitude: info.Latitude, longitude: info.Longitude });
            }
            else if (loc) {
                w.SetPosition(loc);
            }
            else if (info.HostMarker) {
                w.SetPosition({ latitude: info.HostMarker.Latitude, longitude: info.HostMarker.Longitude });
            }
            w.Open();
        });
    };
    /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    BingInfoBoxService.prototype.SetOptions = /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    function (info, options) {
        return this._boxes.get(info).then(function (i) { return i.SetOptions(options); });
    };
    /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    BingInfoBoxService.prototype.SetPosition = /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    function (info) {
        return this._boxes.get(info).then(function (i) { return i.SetPosition({
            latitude: info.Latitude,
            longitude: info.Longitude
        }); });
    };
    BingInfoBoxService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingInfoBoxService.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    return BingInfoBoxService;
}());
export { BingInfoBoxService };
if (false) {
    /** @type {?} */
    BingInfoBoxService.prototype._boxes;
    /** @type {?} */
    BingInfoBoxService.prototype._mapService;
    /** @type {?} */
    BingInfoBoxService.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1pbmZvYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvYmluZy9iaW5nLWluZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQU01QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7SUFjdkUsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gsNEJBQW9CLFdBQXVCLEVBQVUsS0FBYTtRQUE5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7c0JBYkwsSUFBSSxHQUFHLEVBQXlDO0tBYXRDOzs7Ozs7Ozs7SUFTaEUsMENBQWE7Ozs7Ozs7O2NBQUMsSUFBc0I7O1FBQ3ZDLElBQU0sT0FBTyxHQUF1QixFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxRSxPQUFPLENBQUMsUUFBUSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzVCLENBQUM7U0FDTDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsT0FBTyxD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QUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBWXpFLHdDQUFXOzs7Ozs7Ozs7Y0FBQyxJQUFzQjtRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBYSxJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUMvRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUMsRUFIbUQsQ0FHbkQsQ0FBQyxDQUFDOzs7Z0JBak1YLFVBQVU7Ozs7Z0JBWEYsVUFBVTtnQkFQRSxNQUFNOzs2QkFBM0I7O1NBbUJhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5mb2JveC1hY3Rpb24nO1xuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9pbmZvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2luZm9ib3gnO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmluZ0luZm9XaW5kb3cgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWluZm8td2luZG93JztcbmltcG9ydCB7IEJpbmdNYXBFdmVudHNMb29rdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvYmluZy9iaW5nLWV2ZW50cy1sb29rdXAnO1xuXG4vKipcbiAqIENvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIHRoZSB7QGxpbmsgSW5mb0JveFNlcnZpY2V9IGNvbnRyYWN0IGZvciB0aGUgQmluZyBNYXBzIFY4IGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaW5nSW5mb0JveFNlcnZpY2UgaW1wbGVtZW50cyBJbmZvQm94U2VydmljZSB7XG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2JveGVzOiBNYXA8SW5mb0JveENvbXBvbmVudCwgUHJvbWlzZTxJbmZvV2luZG93Pj4gPSBuZXcgTWFwPEluZm9Cb3hDb21wb25lbnQsIFByb21pc2U8SW5mb1dpbmRvdz4+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ0luZm9Cb3hTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbWFwU2VydmljZSAtIENvbmNyZXRlIHtAbGluayBNYXBTZXJ2aWNlfSBpbXBsZW1lbnRhdGlvbiBmb3IgQmluZyBNYXBzIFY4LiBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgQmluZ01hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfem9uZSAtIEFuIGluc3RhbmNlIG9mIE5nWm9uZSB0byBwcm92aWRlIHpvbmUgYXdhcmUgcHJvbWlzZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0luZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gaW5mbyB3aW5kb3cgdG8gdGhlIG1hcCBvciBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zID0ge307XG4gICAgICAgIGlmICh0eXBlb2YgaW5mby5MYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm8uTG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogaW5mby5MYXRpdHVkZSxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgaW5mby5JbmZvV2luZG93QWN0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5mby5JbmZvV2luZG93QWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcHRpb25zLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGluZm8uSW5mb1dpbmRvd0FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uOiBJbmZvQm94QWN0aW9uRGlyZWN0aXZlKSA9PiB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYWN0aW9uLkxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI6ICgpID0+IHsgYWN0aW9uLkFjdGlvbkNsaWNrZWQuZW1pdChudWxsKTsgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8uSHRtbENvbnRlbnQgIT09ICcnKSB7XG4gICAgICAgICAgICBvcHRpb25zLmh0bWxDb250ZW50ID0gaW5mby5IdG1sQ29udGVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMudGl0bGUgPSBpbmZvLlRpdGxlO1xuICAgICAgICAgICAgb3B0aW9ucy5kZXNjcmlwdGlvbiA9IGluZm8uRGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8ueE9mZnNldCB8fCBpbmZvLnlPZmZzZXQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBpeGVsT2Zmc2V0ID09IG51bGwpIHsgb3B0aW9ucy5waXhlbE9mZnNldCA9IHsgeDogMCwgeTogMCB9OyB9XG4gICAgICAgICAgICBpZiAoaW5mby54T2Zmc2V0KSB7IG9wdGlvbnMucGl4ZWxPZmZzZXQueCA9IGluZm8ueE9mZnNldDsgfVxuICAgICAgICAgICAgaWYgKGluZm8ueU9mZnNldCkgeyBvcHRpb25zLnBpeGVsT2Zmc2V0LnkgPSBpbmZvLnlPZmZzZXQ7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMudmlzaWJsZSA9IGluZm8uVmlzaWJsZTtcbiAgICAgICAgY29uc3QgaW5mb1Byb21pc2UgPSB0aGlzLl9tYXBTZXJ2aWNlLkNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2JveGVzLnNldChpbmZvLCBpbmZvUHJvbWlzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFuIEluZm9Cb3hDb21wb25lbnQgdGhhdCBpcyBvcGVuLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gY2xvc2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIENsb3NlKGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3KSA9PiB3LkNsb3NlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBkZWxlZ2F0ZSBmb3IgYW4gaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlZ2lzdGVyIChlLmcuICdjbGljaycpXG4gICAgICogQHBhcmFtIGluZm9Db21wb25lbnQgLSBUaGUge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGZvciB3aGljaCB0byByZWdpc3RlciB0aGUgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSBPYnNlcnZhYmxlIGVtaXRpbmcgYW4gaW5zdGFuY2Ugb2YgVCBlYWNoIHRpbWUgdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGluZm9Db21wb25lbnQ6IEluZm9Cb3hDb21wb25lbnQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lVHJhbnNsYXRlZCA9IEJpbmdNYXBFdmVudHNMb29rdXBbZXZlbnROYW1lXTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2JveGVzLmdldChpbmZvQ29tcG9uZW50KS50aGVuKChiOiBJbmZvV2luZG93KSA9PiB7XG4gICAgICAgICAgICAgICAgYi5BZGRMaXN0ZW5lcihldmVudE5hbWVUcmFuc2xhdGVkLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYW4gaW5mb2JveC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIGRlbGV0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlSW5mb1dpbmRvdyhpbmZvOiBJbmZvQm94Q29tcG9uZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLl9ib3hlcy5nZXQoaW5mbyk7XG4gICAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdy50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGkuQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3hlcy5kZWxldGUoaW5mbyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYW4gaW5mb2JveCB0aGF0IGlzIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIG9wZW5lZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBPcGVuKGluZm86IEluZm9Cb3hDb21wb25lbnQsIGxvYz86IElMYXRMb25nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChpbmZvLkNsb3NlSW5mb0JveGVzT25PcGVuIHx8IGluZm8uTW9kYWwpIHtcbiAgICAgICAgICAgIC8vIGNsb3NlIGFsbCBvcGVuIGluZm8gYm94ZXMuXG4gICAgICAgICAgICB0aGlzLl9ib3hlcy5mb3JFYWNoKCh2OiBQcm9taXNlPEluZm9XaW5kb3c+LCBpOiBJbmZvQm94Q29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSWQgIT09IGkuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdi50aGVuKHcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHcuSXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdy5DbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKCh3KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGlmIChpbmZvLkh0bWxDb250ZW50ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaHRtbENvbnRlbnQgPSBpbmZvLkh0bWxDb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aXRsZSA9IGluZm8uVGl0bGU7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kZXNjcmlwdGlvbiA9IGluZm8uRGVzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3LlNldE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgICAgICAgIGlmIChpbmZvLkxhdGl0dWRlICYmIGluZm8uTG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbih7IGxhdGl0dWRlOiBpbmZvLkxhdGl0dWRlLCBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgLy8vXG4gICAgICAgICAgICAgICAgLy8vIHRoaXMgc2l0dWF0aW9uIGlzIHNwZWNpZmljYWxseSB1c2VkIGZvciBjbHVzdGVyIGxheWVycyB0aGF0IHVzZSBzcGlkZXJpbmcuXG4gICAgICAgICAgICAgICAgLy8vXG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbihsb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5mby5Ib3N0TWFya2VyKSB7XG4gICAgICAgICAgICAgICAgdy5TZXRQb3NpdGlvbih7IGxhdGl0dWRlOiBpbmZvLkhvc3RNYXJrZXIuTGF0aXR1ZGUsIGxvbmdpdHVkZTogaW5mby5Ib3N0TWFya2VyLkxvbmdpdHVkZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHcuT3BlbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBpbmZvYm94IG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gaW5mbyAtIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBjb21wb25lbnQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgaW5mb2JveC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHtAbGluayBJSW5mb1dpbmRvd09wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zIHRvIHNldC4gT3B0aW9ucyBwcm92aWRlZCBhcmVcbiAgICAgKiBtZXJnZWQgd2l0aCB0aGUgZXhpc3Rpbmcgb3B0aW9ucyBvZiB0aGUgdW5kZXJseWluZyBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IG9wdGlvbnMgaGF2ZSBiZWVuIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveGVzLmdldChpbmZvKS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLlNldE9wdGlvbnMob3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcG9zaXRpb24gb2YgdGhlIGluZm9ib3ggYmFzZWQgb24gdGhlIHByb3BlcnRpZXMgc2V0IG9uIHRoZSBJbmZvQm94IGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IHBvc2l0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm94ZXMuZ2V0KGluZm8pLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuU2V0UG9zaXRpb24oe1xuICAgICAgICAgICAgbGF0aXR1ZGU6IGluZm8uTGF0aXR1ZGUsXG4gICAgICAgICAgICBsb25naXR1ZGU6IGluZm8uTG9uZ2l0dWRlXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiJdfQ==