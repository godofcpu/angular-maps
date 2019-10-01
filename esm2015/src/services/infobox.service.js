/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * This class defines the contract for an InfoBoxService. Each Map Architecture provider is expected the furnish a concrete implementation.
 *
 * @export
 * @abstract
 * @abstract
 */
export class InfoBoxService {
}
InfoBoxService.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Adds an info window to the map or layer.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     *
     * @return {?}
     */
    InfoBoxService.prototype.AddInfoWindow = function (info) { };
    /**
     * Closes an infobox that is open.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been closed.
     *
     */
    InfoBoxService.prototype.Close = function (info) { };
    /**
     * Subscribe to events on the infowindow.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @template T
     * @param {?} event
     * @param {?} infoBoxComponent
     * @return {?} - Observable emiting an instance of T each time the event occurs.
     *
     */
    InfoBoxService.prototype.CreateEventObservable = function (event, infoBoxComponent) { };
    /**
     * Deletes an infobox.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @return {?} - A promise that is fullfilled when the infobox has been deleted.
     *
     */
    InfoBoxService.prototype.DeleteInfoWindow = function (info) { };
    /**
     * Opens an infobox that is closed.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} loc
     * @return {?} - A promise that is fullfilled when the infobox has been opened.
     *
     */
    InfoBoxService.prototype.Open = function (info, loc) { };
    /**
     * Sets the infobox options.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?} options - {\@link IInfoWindowOptions} object containing the options to set. Options provided are
     * merged with the existing options of the underlying infobox.
     * @return {?} - A promise that is fullfilled when the infobox options have been updated.
     *
     */
    InfoBoxService.prototype.SetOptions = function (info, options) { };
    /**
     * Set the position of the infobox based on the properties set on the InfoBox component.
     *
     * @abstract
     * \@memberof InfoBoxService
     * @abstract
     * @param {?} info - {\@link InfoBoxComponent} component object representing the infobox.
     * @param {?=} latlng - The position to set
     * @return {?} - A promise that is fullfilled when the infobox position has been updated.
     *
     */
    InfoBoxService.prototype.SetPosition = function (info, latlng) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb2JveC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2luZm9ib3guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFjM0MsTUFBTTs7O1lBREwsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2luZm9ib3gnO1xuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL21vZGVscy9pbmZvLXdpbmRvdyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYW4gSW5mb0JveFNlcnZpY2UuIEVhY2ggTWFwIEFyY2hpdGVjdHVyZSBwcm92aWRlciBpcyBleHBlY3RlZCB0aGUgZnVybmlzaCBhIGNvbmNyZXRlIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5mb0JveFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBpbmZvIHdpbmRvdyB0byB0aGUgbWFwIG9yIGxheWVyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBBZGRJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFuIGluZm9ib3ggdGhhdCBpcyBvcGVuLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCBpcyBmdWxsZmlsbGVkIHdoZW4gdGhlIGluZm9ib3ggaGFzIGJlZW4gY2xvc2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgQ2xvc2UoaW5mbzogSW5mb0JveENvbXBvbmVudCk6IFByb21pc2U8dm9pZD47XG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdG8gZXZlbnRzIG9uIHRoZSBpbmZvd2luZG93LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZWdpc3RlciAoZS5nLiAnY2xpY2snKVxuICAgICAqIEBwYXJhbSBpbmZvQ29tcG9uZW50IC0gVGhlIHtAbGluayBJbmZvQm94Q29tcG9uZW50fSBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm5zIC0gT2JzZXJ2YWJsZSBlbWl0aW5nIGFuIGluc3RhbmNlIG9mIFQgZWFjaCB0aW1lIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBDcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnQ6IHN0cmluZywgaW5mb0JveENvbXBvbmVudDogSW5mb0JveENvbXBvbmVudCk6IE9ic2VydmFibGU8VD47XG5cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYW4gaW5mb2JveC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIGRlbGV0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSW5mb0JveFNlcnZpY2VcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBEZWxldGVJbmZvV2luZG93KGluZm86IEluZm9Cb3hDb21wb25lbnQpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYW4gaW5mb2JveCB0aGF0IGlzIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBpbmZvIC0ge0BsaW5rIEluZm9Cb3hDb21wb25lbnR9IGNvbXBvbmVudCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBpbmZvYm94LlxuICAgICAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsbGZpbGxlZCB3aGVuIHRoZSBpbmZvYm94IGhhcyBiZWVuIG9wZW5lZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJbmZvQm94U2VydmljZVxuICAgICAqL1xuICAgIGFic3RyYWN0IE9wZW4oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbG9jPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgaW5mb2JveCBvcHRpb25zLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUluZm9XaW5kb3dPcHRpb25zfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucyB0byBzZXQuIE9wdGlvbnMgcHJvdmlkZWQgYXJlXG4gICAgICogbWVyZ2VkIHdpdGggdGhlIGV4aXN0aW5nIG9wdGlvbnMgb2YgdGhlIHVuZGVybHlpbmcgaW5mb2JveC5cbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBvcHRpb25zIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgU2V0T3B0aW9ucyhpbmZvOiBJbmZvQm94Q29tcG9uZW50LCBvcHRpb25zOiBJSW5mb1dpbmRvd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgaW5mb2JveCBiYXNlZCBvbiB0aGUgcHJvcGVydGllcyBzZXQgb24gdGhlIEluZm9Cb3ggY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGluZm8gLSB7QGxpbmsgSW5mb0JveENvbXBvbmVudH0gY29tcG9uZW50IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGluZm9ib3guXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIFRoZSBwb3NpdGlvbiB0byBzZXRcbiAgICAgKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGxmaWxsZWQgd2hlbiB0aGUgaW5mb2JveCBwb3NpdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEluZm9Cb3hTZXJ2aWNlXG4gICAgICovXG4gICAgYWJzdHJhY3QgU2V0UG9zaXRpb24oaW5mbzogSW5mb0JveENvbXBvbmVudCwgbGF0bG5nPzogSUxhdExvbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG59XG4iXX0=