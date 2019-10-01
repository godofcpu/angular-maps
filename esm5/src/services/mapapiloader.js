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
var MapAPILoader = /** @class */ (function () {
    function MapAPILoader() {
    }
    MapAPILoader.decorators = [
        { type: Injectable },
    ];
    return MapAPILoader;
}());
export { MapAPILoader };
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
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    Object.defineProperty(DocumentRef.prototype, "IsAvailable", {
        get: /**
         * Gets whether a document implementation is available. Generally will be true in the browser and false otherwise, unless there
         * there is a browser-less implementation in the current non-browser environment.
         *
         * \@readonly
         * \@memberof DocumentRef
         * @return {?}
         */
        function () {
            return !(typeof (document) === 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    DocumentRef.prototype.GetNativeDocument = /**
     * Returns the document object of the current environment.
     *
     * \@memberof DocumentRef
     * @return {?} - The document object.
     *
     */
    function () {
        if (typeof (document) === 'undefined') {
            return null;
        }
        return document;
    };
    DocumentRef.decorators = [
        { type: Injectable },
    ];
    return DocumentRef;
}());
export { DocumentRef };
/**
 * Window Reference service to assist with abstracting the availability of window. Needed for AOT and
 * Server Side rendering
 *
 * @export
 */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "IsAvailable", {
        get: /**
         * Gets whether a window implementation is available. Generally will be true in the browser and false otherwise, unless there
         * there is a browser-less implementation in the current non-browser environment.
         *
         * \@readonly
         * \@memberof WindowRef
         * @return {?}
         */
        function () {
            return !(typeof (window) === 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    WindowRef.prototype.GetNativeWindow = /**
     * Returns the window object of the current environment.
     *
     * \@memberof WindowRef
     * @return {?} - The window object.
     *
     */
    function () {
        if (typeof (window) === 'undefined') {
            return null;
        }
        return window;
    };
    WindowRef.decorators = [
        { type: Injectable },
    ];
    return WindowRef;
}());
export { WindowRef };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYXBpbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL21hcGFwaWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztnQkFTMUMsVUFBVTs7dUJBVFg7O1NBVXNCLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBOEJuQixvQ0FBVzs7Ozs7Ozs7OztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBVXpDLHVDQUFpQjs7Ozs7Ozs7UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQXpCdkIsVUFBVTs7c0JBOUJYOztTQStCYSxXQUFXOzs7Ozs7Ozs7OzBCQTRDVCxrQ0FBVzs7Ozs7Ozs7OztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBVXZDLG1DQUFlOzs7Ozs7OztRQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Z0JBekJyQixVQUFVOztvQkFqRVg7O1NBa0VhLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQWJzdHJhY3QgaW1wbGVtZW50YXRpb24uIFVTZWQgZm9yIGRlZmludGlvbiBvbmx5IGFuZCBhcyBhIGJhc2UgdG8gaW1wbGVtZW50IHlvdXJcbiAqIG93biBwcm92aWRlci5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hcEFQSUxvYWRlciB7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgbmVjZXNzYXJ5IHJlc291cmNlcyBmb3IgYSBnaXZlbiBtYXAgYXJjaGl0ZWN0dXJlLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIGZ1bGxmaWxsZWQgd2hlbiB0aGUgcmVzb3VyY2VzIGhhdmUgYmVlbiBsb2FkZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwQVBJTG9hZGVyXG4gICAgICovXG4gICAgYWJzdHJhY3QgTG9hZCgpOiBQcm9taXNlPHZvaWQ+O1xuXG59XG5cbi8qKlxuICogRG9jdW1lbnQgUmVmZXJlbmNlIHNlcnZpY2UgdG8gYXNzaXN0IHdpdGggYWJzdHJhY3RpbmcgdGhlIGF2YWlsYWJpbGl0eSBvZiBkb2N1bWVudC4gTmVlZGVkIGZvciBBT1QgYW5kXG4gKiBTZXJ2ZXIgU2lkZSByZW5kZXJpbmdcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb2N1bWVudFJlZiB7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgYSBkb2N1bWVudCBpbXBsZW1lbnRhdGlvbiBpcyBhdmFpbGFibGUuIEdlbmVyYWxseSB3aWxsIGJlIHRydWUgaW4gdGhlIGJyb3dzZXIgYW5kIGZhbHNlIG90aGVyd2lzZSwgdW5sZXNzIHRoZXJlXG4gICAgICogdGhlcmUgaXMgYSBicm93c2VyLWxlc3MgaW1wbGVtZW50YXRpb24gaW4gdGhlIGN1cnJlbnQgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgRG9jdW1lbnRSZWZcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0eXBlb2YgKGRvY3VtZW50KSA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRvY3VtZW50IG9iamVjdCBvZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGRvY3VtZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBEb2N1bWVudFJlZlxuICAgICAqL1xuICAgIHB1YmxpYyBHZXROYXRpdmVEb2N1bWVudCgpOiBhbnkge1xuICAgICAgICBpZiAodHlwZW9mIChkb2N1bWVudCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFdpbmRvdyBSZWZlcmVuY2Ugc2VydmljZSB0byBhc3Npc3Qgd2l0aCBhYnN0cmFjdGluZyB0aGUgYXZhaWxhYmlsaXR5IG9mIHdpbmRvdy4gTmVlZGVkIGZvciBBT1QgYW5kXG4gKiBTZXJ2ZXIgU2lkZSByZW5kZXJpbmdcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaW5kb3dSZWYge1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIGEgd2luZG93IGltcGxlbWVudGF0aW9uIGlzIGF2YWlsYWJsZS4gR2VuZXJhbGx5IHdpbGwgYmUgdHJ1ZSBpbiB0aGUgYnJvd3NlciBhbmQgZmFsc2Ugb3RoZXJ3aXNlLCB1bmxlc3MgdGhlcmVcbiAgICAgKiB0aGVyZSBpcyBhIGJyb3dzZXItbGVzcyBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgY3VycmVudCBub24tYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBXaW5kb3dSZWZcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElzQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB3aW5kb3cgb2JqZWN0IG9mIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgd2luZG93IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBXaW5kb3dSZWZcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TmF0aXZlV2luZG93KCk6IGFueSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbn1cblxuIl19