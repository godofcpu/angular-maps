/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { InfoBoxService } from '../services/infobox.service';
import { MapMarkerDirective } from './map-marker';
import { InfoBoxActionDirective } from './infobox-action';
/** *
 * internal counter to use as ids for multiple infoboxes.
  @type {?} */
var infoBoxId = 0;
/**
 * InfoBox renders a info window inside a {\@link MapMarkerDirective} or standalone.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective, InfoBoxComponent, InfoBoxActionDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .map-container { height: 300px; }
 * `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
 *        <x-info-box [DisableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *         </x-info-box>
 *       </x-map-marker>
 *     </x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
var InfoBoxComponent = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of InfoBoxComponent.
     * @param _infoBoxService - Concrete {@link InfoBoxService} implementation for underlying Map architecture.
     *
     * @memberof InfoBoxComponent
     */
    function InfoBoxComponent(_infoBoxService) {
        this._infoBoxService = _infoBoxService;
        this._infoBoxAddedToManager = false;
        this._id = (infoBoxId++).toString();
        /**
         * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
         *
         * \@memberof InfoBoxComponent
         */
        this.Modal = true;
        /**
         * Determines visibility of infobox
         *
         * \@memberof InfoBoxComponent
         */
        this.Visible = false;
        /**
         * Determines if other info boxes should be closed before opening this one
         *
         * \@memberof InfoBoxComponent
         */
        this.CloseInfoBoxesOnOpen = true;
        /**
         * Emits an event when the info window is closed.
         *
         * \@memberof InfoBoxComponent
         */
        this.InfoBoxClose = new EventEmitter();
    }
    Object.defineProperty(InfoBoxComponent.prototype, "HtmlContent", {
        get: /**
         * Gets the HTML content of the info box.
         *
         * \@readonly
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        function () {
            if (this._content.nativeElement && this._content.nativeElement.innerText && this._content.nativeElement.innerText.trim() !== '') {
                return this._content.nativeElement.outerHTML;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoBoxComponent.prototype, "Id", {
        get: /**
         * Gets the Id of the info box as a string.
         *
         * \@readonly
         * \@memberof InfoBoxComponent
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Closes the Infobox.
     *
     * \@memberof InfoBoxComponent
     * @return {?}
     */
    InfoBoxComponent.prototype.Close = /**
     * Closes the Infobox.
     *
     * \@memberof InfoBoxComponent
     * @return {?}
     */
    function () {
        var _this = this;
        return this._infoBoxService.Close(this).then(function () {
            _this.InfoBoxClose.emit(_this._id);
        });
    };
    /**
     * Called on after component view as been initialized. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    InfoBoxComponent.prototype.ngAfterViewInit = /**
     * Called on after component view as been initialized. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    function () {
        this._infoBoxService.AddInfoWindow(this);
        this._infoBoxAddedToManager = true;
        this.HandleEvents();
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    InfoBoxComponent.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._infoBoxAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.Latitude === 'number' &&
            typeof this.Longitude === 'number') {
            this._infoBoxService.SetPosition(this, {
                latitude: changes['latitude'].currentValue,
                longitude: changes['longitude'].currentValue
            });
        }
        this.SetInfoWindowOptions(changes);
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    InfoBoxComponent.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof Map
     * @return {?}
     */
    function () { this._infoBoxService.DeleteInfoWindow(this); };
    /**
     * Opens a closed info window.
     *
     * \@memberof InfoBoxComponent
     * @param {?=} loc
     * @return {?} - Promise that is fullfilled when the infobox has been opened.
     *
     */
    InfoBoxComponent.prototype.Open = /**
     * Opens a closed info window.
     *
     * \@memberof InfoBoxComponent
     * @param {?=} loc
     * @return {?} - Promise that is fullfilled when the infobox has been opened.
     *
     */
    function (loc) {
        return this._infoBoxService.Open(this, loc);
    };
    /**
     * Returns a string representation of the info box.
     *
     * \@memberof InfoBoxComponent
     * @return {?} - string representation of the info box.
     *
     */
    InfoBoxComponent.prototype.ToString = /**
     * Returns a string representation of the info box.
     *
     * \@memberof InfoBoxComponent
     * @return {?} - string representation of the info box.
     *
     */
    function () { return 'InfoBoxComponent-' + this._id; };
    /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    InfoBoxComponent.prototype.HandleEvents = /**
     * Delegate handling the map click events.
     *
     * \@memberof MapComponent
     * @return {?}
     */
    function () {
        var _this = this;
        this._infoBoxService.CreateEventObservable('infowindowclose', this).subscribe(function (e) {
            _this.InfoBoxClose.emit(_this._id);
        });
    };
    /**
     * Sets the info window options
     *
     * \@memberof InfoBoxComponent
     * @param {?} changes
     *
     * @return {?}
     */
    InfoBoxComponent.prototype.SetInfoWindowOptions = /**
     * Sets the info window options
     *
     * \@memberof InfoBoxComponent
     * @param {?} changes
     *
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var options = {};
        if (changes['title']) {
            options.title = this.Title;
        }
        if (changes['description']) {
            options.description = this.Description;
        }
        if (changes['disableAutoPan']) {
            options.disableAutoPan = this.DisableAutoPan;
        }
        if (changes['visible']) {
            options.visible = this.Visible;
        }
        if (changes['xOffset'] || changes['yOffset']) {
            if (options.pixelOffset == null) {
                options.pixelOffset = { x: 0, y: 0 };
            }
            options.pixelOffset.x = this.xOffset;
            options.pixelOffset.y = this.yOffset;
        }
        this._infoBoxService.SetOptions(this, options);
    };
    InfoBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'x-info-box',
                    template: "\n        <div #infoBoxContent class='info-box-content'>\n            <ng-content></ng-content>\n        </div>",
                    styles: ["\n        x-map .MicrosoftMap .Infobox .infobox-title { padding: 10px 10px 5px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-info { padding: 3px 10px 10px 10px }\n        x-map .MicrosoftMap .Infobox .infobox-actions { height: auto }\n    "],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    InfoBoxComponent.ctorParameters = function () { return [
        { type: InfoBoxService }
    ]; };
    InfoBoxComponent.propDecorators = {
        _content: [{ type: ViewChild, args: ['infoBoxContent',] }],
        InfoWindowActions: [{ type: ContentChildren, args: [InfoBoxActionDirective,] }],
        Latitude: [{ type: Input }],
        Longitude: [{ type: Input }],
        Title: [{ type: Input }],
        Description: [{ type: Input }],
        DisableAutoPan: [{ type: Input }],
        MaxWidth: [{ type: Input }],
        Modal: [{ type: Input }],
        HostMarker: [{ type: Input }],
        Visible: [{ type: Input }],
        xOffset: [{ type: Input }],
        yOffset: [{ type: Input }],
        CloseInfoBoxesOnOpen: [{ type: Input }],
        InfoBoxClose: [{ type: Output }]
    };
    return InfoBoxComponent;
}());
export { InfoBoxComponent };
if (false) {
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxAddedToManager;
    /** @type {?} */
    InfoBoxComponent.prototype._id;
    /**
     * HTML conent of the infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype._content;
    /**
     * Zero or more actions to show on the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoWindowActions;
    /**
     * The latitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Latitude;
    /**
     * The longitude position of the info window (only usefull if you use it ouside of a {\@link MapMarker}).
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Longitude;
    /**
     * The title to display in the info window
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Title;
    /**
     * The description to display in the info window.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Description;
    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.DisableAutoPan;
    /**
     *  Maximum width of the infowindow, regardless of content's width. This value is only considered
     *  if it is set before a call to open. To change the maximum width when changing content, call
     *  close, update maxWidth, and then open.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.MaxWidth;
    /**
     * Determine whether only one infobox can be open at a time. Note that ANY info box settings.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Modal;
    /**
     * Holds the marker that is the host of the info window (if available)
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.HostMarker;
    /**
     * Determines visibility of infobox
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.Visible;
    /**
     * Horizontal offset of the infobox from the host marker lat/long or the sepecified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.xOffset;
    /**
     * Vertical offset for the infobox from the host marker lat/long or the specified coordinates.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.yOffset;
    /**
     * Determines if other info boxes should be closed before opening this one
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.CloseInfoBoxesOnOpen;
    /**
     * Emits an event when the info window is closed.
     *
     * \@memberof InfoBoxComponent
     * @type {?}
     */
    InfoBoxComponent.prototype.InfoBoxClose;
    /** @type {?} */
    InfoBoxComponent.prototype._infoBoxService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2luZm9ib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBSzFELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0TGQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCwwQkFBb0IsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO3NDQXZKbEIsS0FBSzttQkFDaEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTs7Ozs7O3FCQW1FdEIsSUFBSTs7Ozs7O3VCQWNGLEtBQUs7Ozs7OztvQ0FxQlEsSUFBSTs7Ozs7OzRCQVdXLElBQUksWUFBWSxFQUFVO0tBcUN4QjswQkF6QjdDLHlDQUFXOzs7Ozs7Ozs7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5SCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEs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LENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUFFO1FBQzNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFBRTtZQUMxRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7OztnQkFyUnRELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLGlIQUdDO29CQUNYLE1BQU0sRUFBRSxDQUFDLHlQQUlSLENBQUM7b0JBQ0YsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7O2dCQWhEUSxjQUFjOzs7MkJBOERsQixTQUFTLFNBQUMsZ0JBQWdCO29DQU8xQixlQUFlLFNBQUMsc0JBQXNCOzJCQVF0QyxLQUFLOzRCQU9MLEtBQUs7d0JBT0wsS0FBSzs4QkFPTCxLQUFLO2lDQVFMLEtBQUs7MkJBU0wsS0FBSzt3QkFPTCxLQUFLOzZCQU9MLEtBQUs7MEJBT0wsS0FBSzswQkFPTCxLQUFLOzBCQU9MLEtBQUs7dUNBT0wsS0FBSzsrQkFXTCxNQUFNOzsyQkF6TFg7O1NBa0VhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2UsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSW5mb0JveFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmZvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwTWFya2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXAtbWFya2VyJztcbmltcG9ydCB7IEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2luZm9ib3gtYWN0aW9uJztcblxuLyoqXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG11bHRpcGxlIGluZm9ib3hlcy5cbiAqL1xubGV0IGluZm9Cb3hJZCA9IDA7XG5cbi8qKlxuICogSW5mb0JveCByZW5kZXJzIGEgaW5mbyB3aW5kb3cgaW5zaWRlIGEge0BsaW5rIE1hcE1hcmtlckRpcmVjdGl2ZX0gb3Igc3RhbmRhbG9uZS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZSwgSW5mb0JveENvbXBvbmVudCwgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDx4LW1hcC1tYXJrZXIgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW0xhYmVsXT1cIidNJ1wiPlxuICogICAgICAgIDx4LWluZm8tYm94IFtEaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XG4gKiAgICAgICAgICBIaSwgdGhpcyBpcyB0aGUgY29udGVudCBvZiB0aGUgPHN0cm9uZz5pbmZvIHdpbmRvdzwvc3Ryb25nPlxuICogICAgICAgICA8L3gtaW5mby1ib3g+XG4gKiAgICAgICA8L3gtbWFwLW1hcmtlcj5cbiAqICAgICA8L3gtbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAneC1pbmZvLWJveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjaW5mb0JveENvbnRlbnQgY2xhc3M9J2luZm8tYm94LWNvbnRlbnQnPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5gLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgeC1tYXAgLk1pY3Jvc29mdE1hcCAuSW5mb2JveCAuaW5mb2JveC10aXRsZSB7IHBhZGRpbmc6IDEwcHggMTBweCA1cHggMTBweCB9XG4gICAgICAgIHgtbWFwIC5NaWNyb3NvZnRNYXAgLkluZm9ib3ggLmluZm9ib3gtaW5mbyB7IHBhZGRpbmc6IDNweCAxMHB4IDEwcHggMTBweCB9XG4gICAgICAgIHgtbWFwIC5NaWNyb3NvZnRNYXAgLkluZm9ib3ggLmluZm9ib3gtYWN0aW9ucyB7IGhlaWdodDogYXV0byB9XG4gICAgYF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJbmZvQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2luZm9Cb3hBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAoaW5mb0JveElkKyspLnRvU3RyaW5nKCk7XG5cbiAgICAvKipcbiAgICAgKiBIVE1MIGNvbmVudCBvZiB0aGUgaW5mb2JveFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdpbmZvQm94Q29udGVudCcpIHByaXZhdGUgX2NvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvKipcbiAgICAgKiBaZXJvIG9yIG1vcmUgYWN0aW9ucyB0byBzaG93IG9uIHRoZSBpbmZvIHdpbmRvd1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKEluZm9Cb3hBY3Rpb25EaXJlY3RpdmUpIHB1YmxpYyBJbmZvV2luZG93QWN0aW9uczogUXVlcnlMaXN0PEluZm9Cb3hBY3Rpb25EaXJlY3RpdmU+O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93IChvbmx5IHVzZWZ1bGwgaWYgeW91IHVzZSBpdCBvdXNpZGUgb2YgYSB7QGxpbmsgTWFwTWFya2VyfSkuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXRpdHVkZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cgKG9ubHkgdXNlZnVsbCBpZiB5b3UgdXNlIGl0IG91c2lkZSBvZiBhIHtAbGluayBNYXBNYXJrZXJ9KS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIExvbmdpdHVkZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIHRvIGRpc3BsYXkgaW4gdGhlIGluZm8gd2luZG93XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBUaXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIHRvIGRpc3BsYXkgaW4gdGhlIGluZm8gd2luZG93LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRGVzY3JpcHRpb246IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgYXV0by1wYW4gb24gb3Blbi4gQnkgZGVmYXVsdCwgdGhlIGluZm8gd2luZG93IHdpbGwgcGFuIHRoZSBtYXAgc28gdGhhdCBpdCBpcyBmdWxseVxuICAgICAqIHZpc2libGUgd2hlbiBpdCBvcGVucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIERpc2FibGVBdXRvUGFuOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogIE1heGltdW0gd2lkdGggb2YgdGhlIGluZm93aW5kb3csIHJlZ2FyZGxlc3Mgb2YgY29udGVudCdzIHdpZHRoLiBUaGlzIHZhbHVlIGlzIG9ubHkgY29uc2lkZXJlZFxuICAgICAqICBpZiBpdCBpcyBzZXQgYmVmb3JlIGEgY2FsbCB0byBvcGVuLiBUbyBjaGFuZ2UgdGhlIG1heGltdW0gd2lkdGggd2hlbiBjaGFuZ2luZyBjb250ZW50LCBjYWxsXG4gICAgICogIGNsb3NlLCB1cGRhdGUgbWF4V2lkdGgsIGFuZCB0aGVuIG9wZW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBNYXhXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb25seSBvbmUgaW5mb2JveCBjYW4gYmUgb3BlbiBhdCBhIHRpbWUuIE5vdGUgdGhhdCBBTlkgaW5mbyBib3ggc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBNb2RhbCA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgbWFya2VyIHRoYXQgaXMgdGhlIGhvc3Qgb2YgdGhlIGluZm8gd2luZG93IChpZiBhdmFpbGFibGUpXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBIb3N0TWFya2VyOiBNYXBNYXJrZXJEaXJlY3RpdmU7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHZpc2liaWxpdHkgb2YgaW5mb2JveFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSG9yaXpvbnRhbCBvZmZzZXQgb2YgdGhlIGluZm9ib3ggZnJvbSB0aGUgaG9zdCBtYXJrZXIgbGF0L2xvbmcgb3IgdGhlIHNlcGVjaWZpZWQgY29vcmRpbmF0ZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB4T2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBWZXJ0aWNhbCBvZmZzZXQgZm9yIHRoZSBpbmZvYm94IGZyb20gdGhlIGhvc3QgbWFya2VyIGxhdC9sb25nIG9yIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB5T2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIG90aGVyIGluZm8gYm94ZXMgc2hvdWxkIGJlIGNsb3NlZCBiZWZvcmUgb3BlbmluZyB0aGlzIG9uZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgQ2xvc2VJbmZvQm94ZXNPbk9wZW4gPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIERlbGVnYXRlIGRlZmludGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGluZm8gd2luZG93IGlzIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XG4gICAgICovXG4gICAgQE91dHB1dCgpIHB1YmxpYyBJbmZvQm94Q2xvc2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zLlxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgSFRNTCBjb250ZW50IG9mIHRoZSBpbmZvIGJveC5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XG4gICAgICovXG4gICAgcHVibGljIGdldCBIdG1sQ29udGVudCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuX2NvbnRlbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQgJiYgdGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudC5uYXRpdmVFbGVtZW50Lm91dGVySFRNTDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgSWQgb2YgdGhlIGluZm8gYm94IGFzIGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZm9Cb3hDb21wb25lbnQuXG4gICAgICogQHBhcmFtIF9pbmZvQm94U2VydmljZSAtIENvbmNyZXRlIHtAbGluayBJbmZvQm94U2VydmljZX0gaW1wbGVtZW50YXRpb24gZm9yIHVuZGVybHlpbmcgTWFwIGFyY2hpdGVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94Q29tcG9uZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb0JveFNlcnZpY2U6IEluZm9Cb3hTZXJ2aWNlKSB7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBJbmZvYm94LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvQm94U2VydmljZS5DbG9zZSh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuSW5mb0JveENsb3NlLmVtaXQodGhpcy5faWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYWZ0ZXIgY29tcG9uZW50IHZpZXcgYXMgYmVlbiBpbml0aWFsaXplZC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwXG4gICAgICovXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5faW5mb0JveFNlcnZpY2UuQWRkSW5mb1dpbmRvdyh0aGlzKTtcbiAgICAgICAgdGhpcy5faW5mb0JveEFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5IYW5kbGVFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjaGFuZ2VzIHRvIHRoZSBkYXRhYm91ZCBwcm9wZXJ0aWVzIG9jY3VyLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gQ2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luZm9Cb3hBZGRlZFRvTWFuYWdlcikgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSAmJiB0eXBlb2YgdGhpcy5MYXRpdHVkZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLkxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLlNldFBvc2l0aW9uKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogY2hhbmdlc1snbGF0aXR1ZGUnXS5jdXJyZW50VmFsdWUsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBjaGFuZ2VzWydsb25naXR1ZGUnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuU2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIGNvbXBvbmVudCBkZXN0cnVjdGlvbi4gRnJlZXMgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBjb21wb25lbnQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHsgdGhpcy5faW5mb0JveFNlcnZpY2UuRGVsZXRlSW5mb1dpbmRvdyh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYSBjbG9zZWQgaW5mbyB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gW2xvY10gIC0ge0BsaW5rIElMYXRMb25nIH0gcmVwcmVzZW50aW5nIHBvc2l0aW9uIG9uIHdoaWNoIHRvIG9wZW4gdGhlIHdpbmRvdy5cbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gb3BlbmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgT3Blbihsb2M/OiBJTGF0TG9uZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb0JveFNlcnZpY2UuT3Blbih0aGlzLCBsb2MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZm8gYm94LlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZm8gYm94LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hDb21wb25lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgVG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdJbmZvQm94Q29tcG9uZW50LScgKyB0aGlzLl9pZDsgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIG1hcCBjbGljayBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQ29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBIYW5kbGVFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2luZm9Cb3hTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnaW5mb3dpbmRvd2Nsb3NlJywgdGhpcykuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5JbmZvQm94Q2xvc2UuZW1pdCh0aGlzLl9pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGluZm8gd2luZG93IG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveENvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgU2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMgPSB7fTtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RpdGxlJ10pIHsgb3B0aW9ucy50aXRsZSA9IHRoaXMuVGl0bGU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2Rlc2NyaXB0aW9uJ10pIHsgb3B0aW9ucy5kZXNjcmlwdGlvbiA9IHRoaXMuRGVzY3JpcHRpb247IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVBdXRvUGFuJ10pIHsgb3B0aW9ucy5kaXNhYmxlQXV0b1BhbiA9IHRoaXMuRGlzYWJsZUF1dG9QYW47IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkgeyBvcHRpb25zLnZpc2libGUgPSB0aGlzLlZpc2libGU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3hPZmZzZXQnXSB8fCBjaGFuZ2VzWyd5T2Zmc2V0J10pIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBpeGVsT2Zmc2V0ID09IG51bGwpIHsgb3B0aW9ucy5waXhlbE9mZnNldCA9IHsgeDogMCwgeTogMCB9OyB9XG4gICAgICAgICAgICBvcHRpb25zLnBpeGVsT2Zmc2V0LnggPSB0aGlzLnhPZmZzZXQ7XG4gICAgICAgICAgICBvcHRpb25zLnBpeGVsT2Zmc2V0LnkgPSB0aGlzLnlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5mb0JveFNlcnZpY2UuU2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG59XG4iXX0=