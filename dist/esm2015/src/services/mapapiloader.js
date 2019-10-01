/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Abstract implementation. USed for defintion only and as a base to implement your
 * own provider.
 *
 * @export
 * @abstract
 * @abstract
 */
export class MapAPILoader {
}
MapAPILoader.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * Loads the necessary resources for a given map architecture.
     *
     * @abstract
     * \@memberof MapAPILoader
     * @abstract
     * @return {?} - Promise fullfilled when the resources have been loaded.
     *
     */
    MapAPILoader.prototype.Load = function () { };
}
/**
 * Document Reference service to assist with abstracting the availability of document. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
export class DocumentRef {
    /**
     * Gets whether a document implementation is available. Generally will be true in the browser and false otherwise, unless there
     * there is a browser-less implementation in the current non-browser environment.
     *
     * \@readonly
     * \@memberof DocumentRef
     * @return {?}
     */
    get IsAvailable() {
        return !(typeof (document) === 'undefined');
    }
    /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    GetNativeDocument() {
        if (typeof (document) === 'undefined') {
            return null;
        }
        return document;
    }
}
DocumentRef.decorators = [
    { type: Injectable },
];
/**
 * Window Reference service to assist with abstracting the availability of window. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
export class WindowRef {
    /**
     * Gets whether a window implementation is available. Generally will be true in the browser and false otherwise, unless there
     * there is a browser-less implementation in the current non-browser environment.
     *
     * \@readonly
     * \@memberof WindowRef
     * @return {?}
     */
    get IsAvailable() {
        return !(typeof (window) === 'undefined');
    }
    /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    GetNativeWindow() {
        if (typeof (window) === 'undefined') {
            return null;
        }
        return window;
    }
}
WindowRef.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYXBpbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL21hcGFwaWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBVTNDLE1BQU07OztZQURMLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JYLE1BQU07Ozs7Ozs7OztRQVNTLFdBQVc7UUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7Ozs7Ozs7OztJQVV6QyxpQkFBaUI7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7OztZQXpCdkIsVUFBVTs7Ozs7Ozs7QUFvQ1gsTUFBTTs7Ozs7Ozs7O1FBU1MsV0FBVztRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBVXZDLGVBQWU7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7OztZQXpCckIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBYnN0cmFjdCBpbXBsZW1lbnRhdGlvbi4gVVNlZCBmb3IgZGVmaW50aW9uIG9ubHkgYW5kIGFzIGEgYmFzZSB0byBpbXBsZW1lbnQgeW91clxuICogb3duIHByb3ZpZGVyLlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWFwQVBJTG9hZGVyIHtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBuZWNlc3NhcnkgcmVzb3VyY2VzIGZvciBhIGdpdmVuIG1hcCBhcmNoaXRlY3R1cmUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyAtIFByb21pc2UgZnVsbGZpbGxlZCB3aGVuIHRoZSByZXNvdXJjZXMgaGF2ZSBiZWVuIGxvYWRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBMb2FkKCk6IFByb21pc2U8dm9pZD47XG5cbn1cblxuLyoqXG4gKiBEb2N1bWVudCBSZWZlcmVuY2Ugc2VydmljZSB0byBhc3Npc3Qgd2l0aCBhYnN0cmFjdGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mIGRvY3VtZW50LiBOZWVkZWQgZm9yIEFPVCBhbmRcbiAqIFNlcnZlciBTaWRlIHJlbmRlcmluZ1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvY3VtZW50UmVmIHtcblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciBhIGRvY3VtZW50IGltcGxlbWVudGF0aW9uIGlzIGF2YWlsYWJsZS4gR2VuZXJhbGx5IHdpbGwgYmUgdHJ1ZSBpbiB0aGUgYnJvd3NlciBhbmQgZmFsc2Ugb3RoZXJ3aXNlLCB1bmxlc3MgdGhlcmVcbiAgICAgKiB0aGVyZSBpcyBhIGJyb3dzZXItbGVzcyBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgY3VycmVudCBub24tYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBEb2N1bWVudFJlZlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHR5cGVvZiAoZG9jdW1lbnQpID09PSAndW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZG9jdW1lbnQgb2JqZWN0IG9mIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgZG9jdW1lbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIERvY3VtZW50UmVmXG4gICAgICovXG4gICAgcHVibGljIEdldE5hdGl2ZURvY3VtZW50KCk6IGFueSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGRvY3VtZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICB9XG59XG5cbi8qKlxuICogV2luZG93IFJlZmVyZW5jZSBzZXJ2aWNlIHRvIGFzc2lzdCB3aXRoIGFic3RyYWN0aW5nIHRoZSBhdmFpbGFiaWxpdHkgb2Ygd2luZG93LiBOZWVkZWQgZm9yIEFPVCBhbmRcbiAqIFNlcnZlciBTaWRlIHJlbmRlcmluZ1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpbmRvd1JlZiB7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgYSB3aW5kb3cgaW1wbGVtZW50YXRpb24gaXMgYXZhaWxhYmxlLiBHZW5lcmFsbHkgd2lsbCBiZSB0cnVlIGluIHRoZSBicm93c2VyIGFuZCBmYWxzZSBvdGhlcndpc2UsIHVubGVzcyB0aGVyZVxuICAgICAqIHRoZXJlIGlzIGEgYnJvd3Nlci1sZXNzIGltcGxlbWVudGF0aW9uIGluIHRoZSBjdXJyZW50IG5vbi1icm93c2VyIGVudmlyb25tZW50LlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIFdpbmRvd1JlZlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKHR5cGVvZiAod2luZG93KSA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHdpbmRvdyBvYmplY3Qgb2YgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRoZSB3aW5kb3cgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFdpbmRvd1JlZlxuICAgICAqL1xuICAgIHB1YmxpYyBHZXROYXRpdmVXaW5kb3coKTogYW55IHtcbiAgICAgICAgaWYgKHR5cGVvZiAod2luZG93KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxufVxuXG4iXX0=