/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
/**
 * InfoBoxAction renders an action in an info window {\@link InfoBox}
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
 *  `],
 *  template: `
 *    <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'">
 *        <x-info-box>
 *          <x-info-box-action [Label]="actionlabel" (ActionClicked)="actionClicked(this)"></x-info-box-action>
 *        </x-info-box>
 *      </x-map-marker>
 *    </x-map>
 *  `
 * })
 * ```
 *
 * @export
 */
export class InfoBoxActionDirective {
    constructor() {
        /**
         * Emits an event when the action has been clicked
         *
         * \@memberof InfoBoxActionDirective
         */
        this.ActionClicked = new EventEmitter();
    }
}
InfoBoxActionDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-info-box-action'
            },] },
];
InfoBoxActionDirective.propDecorators = {
    Label: [{ type: Input }],
    ActionClicked: [{ type: Output }]
};
if (false) {
    /**
     * The label to display on the action
     *
     * \@memberof InfoBoxActionDirective
     * @type {?}
     */
    InfoBoxActionDirective.prototype.Label;
    /**
     * Emits an event when the action has been clicked
     *
     * \@memberof InfoBoxActionDirective
     * @type {?}
     */
    InfoBoxActionDirective.prototype.ActionClicked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC1hY3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9pbmZvYm94LWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDdkUsTUFBTTs7Ozs7Ozs2QkFnQmtDLElBQUksWUFBWSxFQUFROzs7O1lBbkIvRCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7O29CQVFJLEtBQUs7NEJBUUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSW5mb0JveEFjdGlvbiByZW5kZXJzIGFuIGFjdGlvbiBpbiBhbiBpbmZvIHdpbmRvdyB7QGxpbmsgSW5mb0JveH1cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcE1hcmtlckRpcmVjdGl2ZSwgSW5mb0JveENvbXBvbmVudCwgSW5mb0JveEFjdGlvbkRpcmVjdGl2ZX0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5tYXAtY29udGFpbmVyIHsgaGVpZ2h0OiAzMDBweDsgfVxuICogIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8eC1tYXAgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW1pvb21dPVwiem9vbVwiPlxuICogICAgICA8eC1tYXAtbWFya2VyIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtMYWJlbF09XCInTSdcIj5cbiAqICAgICAgICA8eC1pbmZvLWJveD5cbiAqICAgICAgICAgIDx4LWluZm8tYm94LWFjdGlvbiBbTGFiZWxdPVwiYWN0aW9ubGFiZWxcIiAoQWN0aW9uQ2xpY2tlZCk9XCJhY3Rpb25DbGlja2VkKHRoaXMpXCI+PC94LWluZm8tYm94LWFjdGlvbj5cbiAqICAgICAgICA8L3gtaW5mby1ib3g+XG4gKiAgICAgIDwveC1tYXAtbWFya2VyPlxuICogICAgPC94LW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4cG9ydFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3gtaW5mby1ib3gtYWN0aW9uJ1xufSlcbmV4cG9ydCBjbGFzcyBJbmZvQm94QWN0aW9uRGlyZWN0aXZlIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsYWJlbCB0byBkaXNwbGF5IG9uIHRoZSBhY3Rpb25cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94QWN0aW9uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgYWN0aW9uIGhhcyBiZWVuIGNsaWNrZWRcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94QWN0aW9uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgQWN0aW9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG59XG4iXX0=