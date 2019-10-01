/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
/** @enum {number} */
var ScriptProtocol = {
    HTTP: 0,
    HTTPS: 1,
    AUTO: 2,
};
export { ScriptProtocol };
ScriptProtocol[ScriptProtocol.HTTP] = 'HTTP';
ScriptProtocol[ScriptProtocol.HTTPS] = 'HTTPS';
ScriptProtocol[ScriptProtocol.AUTO] = 'AUTO';
/**
 * Bing Maps V8 specific loader configuration to be used with the {\@link BingMapAPILoader}
 *
 * @export
 */
var BingMapAPILoaderConfig = /** @class */ (function () {
    function BingMapAPILoaderConfig() {
        this.apiKey = '';
        this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
        this.protocol = ScriptProtocol.HTTPS;
        this.branch = '';
    }
    BingMapAPILoaderConfig.decorators = [
        { type: Injectable },
    ];
    return BingMapAPILoaderConfig;
}());
export { BingMapAPILoaderConfig };
if (false) {
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.apiKey;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.hostAndPath;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.protocol;
    /** @type {?} */
    BingMapAPILoaderConfig.prototype.branch;
}
/** *
 * Default loader configuration.
  @type {?} */
var DEFAULT_CONFIGURATION = new BingMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
var BingMapAPILoader = /** @class */ (function (_super) {
    tslib_1.__extends(BingMapAPILoader, _super);
    /**
     * Creates an instance of BingMapAPILoader.
     * @param _config  - The loader configuration.
     * @param _windowRef - An instance of {@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param _documentRef - An instance of {@link DocumentRef}.
     * Necessary because Bing Map V8 interacts with the document object.
     *
     * @memberof BingMapAPILoader
     */
    function BingMapAPILoader(_config, _windowRef, _documentRef) {
        var _this = _super.call(this) || this;
        _this._config = _config;
        _this._windowRef = _windowRef;
        _this._documentRef = _documentRef;
        if (_this._config === null || _this._config === undefined) {
            _this._config = DEFAULT_CONFIGURATION;
        }
        return _this;
    }
    Object.defineProperty(BingMapAPILoader.prototype, "Config", {
        get: /**
         * Gets the loader configuration.
         *
         * \@readonly
         * \@memberof BingMapAPILoader
         * @return {?}
         */
        function () { return this._config; },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof BingMapAPILoader
     * @return {?}
     */
    BingMapAPILoader.prototype.Load = /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof BingMapAPILoader
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        /** @type {?} */
        var script = this._documentRef.GetNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        /** @type {?} */
        var callbackName = "angular2bingmaps" + new Date().getMilliseconds();
        script.src = this.GetScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            (/** @type {?} */ (_this._windowRef.GetNativeWindow()))[callbackName] = function () {
                resolve();
            };
            script.onerror = function (error) { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    };
    /**
     * Gets the Bing Map V8 scripts url for injections into the header.
     *
     * \@memberof BingMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
     * @return {?} - The url to be used to load the Bing Map scripts.
     *
     */
    BingMapAPILoader.prototype.GetScriptSrc = /**
     * Gets the Bing Map V8 scripts url for injections into the header.
     *
     * \@memberof BingMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
     * @return {?} - The url to be used to load the Bing Map scripts.
     *
     */
    function (callbackName) {
        /** @type {?} */
        var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
        /** @type {?} */
        var protocol;
        switch (protocolType) {
            case ScriptProtocol.AUTO:
                protocol = '';
                break;
            case ScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case ScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        /** @type {?} */
        var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
        /** @type {?} */
        var queryParams = {
            callback: callbackName
        };
        if (this._config.branch !== '') {
            queryParams['branch'] = this._config.branch;
        }
        /** @type {?} */
        var params = Object.keys(queryParams)
            .map(function (k, i) {
            /** @type {?} */
            var param = (i === 0) ? '?' : '&';
            return param += k + "=" + queryParams[k];
        })
            .join('');
        return protocol + "//" + hostAndPath + params;
    };
    BingMapAPILoader.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BingMapAPILoader.ctorParameters = function () { return [
        { type: BingMapAPILoaderConfig, decorators: [{ type: Optional }] },
        { type: WindowRef },
        { type: DocumentRef }
    ]; };
    return BingMapAPILoader;
}(MapAPILoader));
export { BingMapAPILoader };
if (false) {
    /** @type {?} */
    BingMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    BingMapAPILoader.prototype._config;
    /** @type {?} */
    BingMapAPILoader.prototype._windowRef;
    /** @type {?} */
    BingMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztJQVNuRSxPQUFJO0lBQ0osUUFBSztJQUNMLE9BQUk7Ozs4QkFGSixJQUFJOzhCQUNKLEtBQUs7OEJBQ0wsSUFBSTs7Ozs7Ozs7c0JBY0ssRUFBRTsyQkFLRyxrQ0FBa0M7d0JBS3JCLGNBQWMsQ0FBQyxLQUFLO3NCQUt0QyxFQUFFOzs7Z0JBckJkLFVBQVU7O2lDQXBCWDs7U0FxQmEsc0JBQXNCOzs7Ozs7Ozs7Ozs7OztBQTBCbkMsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7Ozs7Ozs7SUFRckIsNENBQVk7SUFtQjlDOzs7Ozs7OztPQVFHO0lBQ0gsMEJBQWlDLE9BQStCLEVBQVUsVUFBcUIsRUFBVSxZQUF5QjtRQUFsSSxZQUNJLGlCQUFPLFNBSVY7UUFMZ0MsYUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFBVSxnQkFBVSxHQUFWLFVBQVUsQ0FBVztRQUFVLGtCQUFZLEdBQVosWUFBWSxDQUFhO1FBRTlILEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLEtBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1NBQ3hDOztLQUNKOzBCQWhCVSxvQ0FBTTs7Ozs7Ozs7c0JBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7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QVcsR0FBRyxNQUFRLENBQUM7OztnQkE1R3JELFVBQVU7Ozs7Z0JBNkJtQyxzQkFBc0IsdUJBQWxELFFBQVE7Z0JBbEZILFNBQVM7Z0JBQUUsV0FBVzs7MkJBRDdDO0VBdURzQyxZQUFZO1NBQXJDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBBUElMb2FkZXIsIFdpbmRvd1JlZiwgRG9jdW1lbnRSZWYgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xuXG4vKipcbiAqIFByb3RvY29sIGVudW1lcmF0aW9uXG4gKlxuICogQGV4cG9ydFxuICogQGVudW0ge251bWJlcn1cbiAqL1xuZXhwb3J0IGVudW0gU2NyaXB0UHJvdG9jb2wge1xuICAgIEhUVFAsXG4gICAgSFRUUFMsXG4gICAgQVVUT1xufVxuXG4vKipcbiAqIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBsb2FkZXIgY29uZmlndXJhdGlvbiB0byBiZSB1c2VkIHdpdGggdGhlIHtAbGluayBCaW5nTWFwQVBJTG9hZGVyfVxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbmdNYXBBUElMb2FkZXJDb25maWcgIHtcblxuICAgIC8vL1xuICAgIC8vLyBBUEkga2V5IGZvciBiaW5nIG1hcHNcbiAgICAvLy9cbiAgICBhcGlLZXkgPSAnJztcblxuICAgIC8vL1xuICAgIC8vLyBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cbiAgICAvLy9cbiAgICBob3N0QW5kUGF0aCA9ICd3d3cuYmluZy5jb20vYXBpL21hcHMvbWFwY29udHJvbCc7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvdG9jb2wgdXNlZCBmb3IgdGhlIGA8c2NyaXB0PmAgdGFnLlxuICAgIC8vL1xuICAgIHByb3RvY29sOiBTY3JpcHRQcm90b2NvbCA9IFNjcmlwdFByb3RvY29sLkhUVFBTO1xuXG4gICAgLy8vXG4gICAgLy8vIFRoZSBicmFuY2ggdG8gYmUgdXNlZC4gTGVhdmUgZW1wdHkgZm9yIHByb2R1Y3Rpb24uIFVzZSBleHBlcmltZW50YWxcbiAgICAvLy9cbiAgICBicmFuY2ggPSAnJztcbn1cblxuLyoqXG4gKiBEZWZhdWx0IGxvYWRlciBjb25maWd1cmF0aW9uLlxuICovXG5jb25zdCBERUZBVUxUX0NPTkZJR1VSQVRJT04gPSBuZXcgQmluZ01hcEFQSUxvYWRlckNvbmZpZygpO1xuXG4vKipcbiAqIEJpbmcgTWFwcyBWOCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHtAbGluayBNYXBBUElMb2FkZXJ9IHNlcnZpY2UuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ01hcEFQSUxvYWRlciBleHRlbmRzIE1hcEFQSUxvYWRlciB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVmaW50aXRpb25zLlxuICAgIC8vL1xuICAgIHByaXZhdGUgX3NjcmlwdExvYWRpbmdQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9ucy5cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IENvbmZpZygpOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnIHsgcmV0dXJuIHRoaXMuX2NvbmZpZzsgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCaW5nTWFwQVBJTG9hZGVyLlxuICAgICAqIEBwYXJhbSBfY29uZmlnICAtIFRoZSBsb2FkZXIgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gX3dpbmRvd1JlZiAtIEFuIGluc3RhbmNlIG9mIHtAbGluayBXaW5kb3dSZWZ9LiBOZWNlc3NhcnkgYmVjYXVzZSBCaW5nIE1hcCBWOCBpbnRlcmFjdHMgd2l0aCB0aGUgd2luZG93IG9iamVjdC5cbiAgICAgKiBAcGFyYW0gX2RvY3VtZW50UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIERvY3VtZW50UmVmfS5cbiAgICAgKiBOZWNlc3NhcnkgYmVjYXVzZSBCaW5nIE1hcCBWOCBpbnRlcmFjdHMgd2l0aCB0aGUgZG9jdW1lbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggQE9wdGlvbmFsKCkgcHJpdmF0ZSBfY29uZmlnOiBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnLCBwcml2YXRlIF93aW5kb3dSZWY6IFdpbmRvd1JlZiwgcHJpdmF0ZSBfZG9jdW1lbnRSZWY6IERvY3VtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICh0aGlzLl9jb25maWcgPT09IG51bGwgfHwgdGhpcy5fY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IERFRkFVTFRfQ09ORklHVVJBVElPTjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kcyBhbmQgTWFwQVBJTG9hZGVyIGltcGxlbWVudGF0aW9uLlxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIG5lY2Vzc2FyeSByZXNvdXJjZXMgZm9yIEJpbmcgTWFwcyBWOC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nTWFwQVBJTG9hZGVyXG4gICAgICovXG4gICAgcHVibGljIExvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tOYW1lID0gYGFuZ3VsYXIyYmluZ21hcHMke25ldyBEYXRlKCkuZ2V0TWlsbGlzZWNvbmRzKCl9YDtcbiAgICAgICAgc2NyaXB0LnNyYyA9IHRoaXMuR2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZSk7XG5cbiAgICAgICAgdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX3dpbmRvd1JlZi5HZXROYXRpdmVXaW5kb3coKSlbY2FsbGJhY2tOYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoZXJyb3I6IEV2ZW50KSA9PiB7IHJlamVjdChlcnJvcik7IH07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEJpbmcgTWFwIFY4IHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsYmFja05hbWUgLSBOYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgQmluZyBNYXBzIFY4IHNjcmlwdHMgYXJlIGxvYWRlZC5cbiAgICAgKiBAcmV0dXJucyAtIFRoZSB1cmwgdG8gYmUgdXNlZCB0byBsb2FkIHRoZSBCaW5nIE1hcCBzY3JpcHRzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIEdldFNjcmlwdFNyYyhjYWxsYmFja05hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByb3RvY29sVHlwZTogU2NyaXB0UHJvdG9jb2wgPSAodGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5wcm90b2NvbCkgfHwgREVGQVVMVF9DT05GSUdVUkFUSU9OLnByb3RvY29sO1xuICAgICAgICBsZXQgcHJvdG9jb2w6IHN0cmluZztcblxuICAgICAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5BVVRPOlxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFA6XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cDonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTY3JpcHRQcm90b2NvbC5IVFRQUzpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwczonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaG9zdEFuZFBhdGg6IHN0cmluZyA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCBERUZBVUxUX0NPTkZJR1VSQVRJT04uaG9zdEFuZFBhdGg7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrTmFtZVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmJyYW5jaCAhPT0gJycpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydicmFuY2gnXSA9IHRoaXMuX2NvbmZpZy5icmFuY2g7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyYW1zOiBzdHJpbmcgPSBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcbiAgICAgICAgICAgIC5tYXAoKGs6IHN0cmluZywgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtID0gKGkgPT09IDApID8gJz8nIDogJyYnO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbSArPSBgJHtrfT0ke3F1ZXJ5UGFyYW1zW2tdfWA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RBbmRQYXRofSR7cGFyYW1zfWA7XG4gICAgfVxufVxuIl19