/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional } from '@angular/core';
import { MapAPILoader, WindowRef, DocumentRef } from '../mapapiloader';
/** @enum {number} */
const ScriptProtocol = {
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
export class BingMapAPILoaderConfig {
    constructor() {
        this.apiKey = '';
        this.hostAndPath = 'www.bing.com/api/maps/mapcontrol';
        this.protocol = ScriptProtocol.HTTPS;
        this.branch = '';
    }
}
BingMapAPILoaderConfig.decorators = [
    { type: Injectable },
];
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
const DEFAULT_CONFIGURATION = new BingMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
export class BingMapAPILoader extends MapAPILoader {
    /**
     * Creates an instance of BingMapAPILoader.
     * \@memberof BingMapAPILoader
     * @param {?} _config  - The loader configuration.
     * @param {?} _windowRef - An instance of {\@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param {?} _documentRef - An instance of {\@link DocumentRef}.
     * Necessary because Bing Map V8 interacts with the document object.
     *
     */
    constructor(_config, _windowRef, _documentRef) {
        super();
        this._config = _config;
        this._windowRef = _windowRef;
        this._documentRef = _documentRef;
        if (this._config === null || this._config === undefined) {
            this._config = DEFAULT_CONFIGURATION;
        }
    }
    /**
     * Gets the loader configuration.
     *
     * \@readonly
     * \@memberof BingMapAPILoader
     * @return {?}
     */
    get Config() { return this._config; }
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof BingMapAPILoader
     * @return {?}
     */
    Load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        /** @type {?} */
        const script = this._documentRef.GetNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        /** @type {?} */
        const callbackName = `angular2bingmaps${new Date().getMilliseconds()}`;
        script.src = this.GetScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            (/** @type {?} */ (this._windowRef.GetNativeWindow()))[callbackName] = () => {
                resolve();
            };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    }
    /**
     * Gets the Bing Map V8 scripts url for injections into the header.
     *
     * \@memberof BingMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Bing Maps V8 scripts are loaded.
     * @return {?} - The url to be used to load the Bing Map scripts.
     *
     */
    GetScriptSrc(callbackName) {
        /** @type {?} */
        const protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
        /** @type {?} */
        let protocol;
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
        const hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
        /** @type {?} */
        const queryParams = {
            callback: callbackName
        };
        if (this._config.branch !== '') {
            queryParams['branch'] = this._config.branch;
        }
        /** @type {?} */
        const params = Object.keys(queryParams)
            .map((k, i) => {
            /** @type {?} */
            let param = (i === 0) ? '?' : '&';
            return param += `${k}=${queryParams[k]}`;
        })
            .join('');
        return `${protocol}//${hostAndPath}${params}`;
    }
}
BingMapAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BingMapAPILoader.ctorParameters = () => [
    { type: BingMapAPILoaderConfig, decorators: [{ type: Optional }] },
    { type: WindowRef },
    { type: DocumentRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0lBU25FLE9BQUk7SUFDSixRQUFLO0lBQ0wsT0FBSTs7OzhCQUZKLElBQUk7OEJBQ0osS0FBSzs4QkFDTCxJQUFJOzs7Ozs7QUFTUixNQUFNOztzQkFLTyxFQUFFOzJCQUtHLGtDQUFrQzt3QkFLckIsY0FBYyxDQUFDLEtBQUs7c0JBS3RDLEVBQUU7Ozs7WUFyQmQsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0FBMkJYLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDOzs7Ozs7QUFRM0QsTUFBTSx1QkFBd0IsU0FBUSxZQUFZOzs7Ozs7Ozs7O0lBNEI5QyxZQUFpQyxPQUErQixFQUFVLFVBQXFCLEVBQVUsWUFBeUI7UUFDOUgsS0FBSyxFQUFFLENBQUM7UUFEcUIsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFFOUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7U0FDeEM7S0FDSjs7Ozs7Ozs7UUFoQlUsTUFBTSxLQUE2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztJQTJCM0QsSUFBSTtR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TUFBTSxDQUFDLEdBQUcsUUFBUSxLQUFLLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQzs7OztZQTVHckQsVUFBVTs7OztZQTZCbUMsc0JBQXNCLHVCQUFsRCxRQUFRO1lBbEZILFNBQVM7WUFBRSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcEFQSUxvYWRlciwgV2luZG93UmVmLCBEb2N1bWVudFJlZiB9IGZyb20gJy4uL21hcGFwaWxvYWRlcic7XG5cbi8qKlxuICogUHJvdG9jb2wgZW51bWVyYXRpb25cbiAqXG4gKiBAZXhwb3J0XG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5leHBvcnQgZW51bSBTY3JpcHRQcm90b2NvbCB7XG4gICAgSFRUUCxcbiAgICBIVFRQUyxcbiAgICBBVVRPXG59XG5cbi8qKlxuICogQmluZyBNYXBzIFY4IHNwZWNpZmljIGxvYWRlciBjb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgd2l0aCB0aGUge0BsaW5rIEJpbmdNYXBBUElMb2FkZXJ9XG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmluZ01hcEFQSUxvYWRlckNvbmZpZyAge1xuXG4gICAgLy8vXG4gICAgLy8vIEFQSSBrZXkgZm9yIGJpbmcgbWFwc1xuICAgIC8vL1xuICAgIGFwaUtleSA9ICcnO1xuXG4gICAgLy8vXG4gICAgLy8vIEhvc3QgYW5kIFBhdGggdXNlZCBmb3IgdGhlIGA8c2NyaXB0PmAgdGFnLlxuICAgIC8vL1xuICAgIGhvc3RBbmRQYXRoID0gJ3d3dy5iaW5nLmNvbS9hcGkvbWFwcy9tYXBjb250cm9sJztcblxuICAgIC8vL1xuICAgIC8vLyBQcm90b2NvbCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXG4gICAgLy8vXG4gICAgcHJvdG9jb2w6IFNjcmlwdFByb3RvY29sID0gU2NyaXB0UHJvdG9jb2wuSFRUUFM7XG5cbiAgICAvLy9cbiAgICAvLy8gVGhlIGJyYW5jaCB0byBiZSB1c2VkLiBMZWF2ZSBlbXB0eSBmb3IgcHJvZHVjdGlvbi4gVXNlIGV4cGVyaW1lbnRhbFxuICAgIC8vL1xuICAgIGJyYW5jaCA9ICcnO1xufVxuXG4vKipcbiAqIERlZmF1bHQgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmNvbnN0IERFRkFVTFRfQ09ORklHVVJBVElPTiA9IG5ldyBCaW5nTWFwQVBJTG9hZGVyQ29uZmlnKCk7XG5cbi8qKlxuICogQmluZyBNYXBzIFY4IGltcGxlbWVudGF0aW9uIGZvciB0aGUge0BsaW5rIE1hcEFQSUxvYWRlcn0gc2VydmljZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCaW5nTWFwQVBJTG9hZGVyIGV4dGVuZHMgTWFwQVBJTG9hZGVyIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWZpbnRpdGlvbnMuXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfc2NyaXB0TG9hZGluZ1Byb21pc2U6IFByb21pc2U8dm9pZD47XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zLlxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgQ29uZmlnKCk6IEJpbmdNYXBBUElMb2FkZXJDb25maWcgeyByZXR1cm4gdGhpcy5fY29uZmlnOyB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEJpbmdNYXBBUElMb2FkZXIuXG4gICAgICogQHBhcmFtIF9jb25maWcgIC0gVGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqIEBwYXJhbSBfd2luZG93UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFdpbmRvd1JlZn0uIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBfZG9jdW1lbnRSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgRG9jdW1lbnRSZWZ9LlxuICAgICAqIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSBkb2N1bWVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBwcml2YXRlIF9jb25maWc6IEJpbmdNYXBBUElMb2FkZXJDb25maWcsIHByaXZhdGUgX3dpbmRvd1JlZjogV2luZG93UmVmLCBwcml2YXRlIF9kb2N1bWVudFJlZjogRG9jdW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZyA9PT0gbnVsbCB8fCB0aGlzLl9jb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnID0gREVGQVVMVF9DT05GSUdVUkFUSU9OO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzIGFuZCBNYXBBUElMb2FkZXIgaW1wbGVtZW50YXRpb24uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgbmVjZXNzYXJ5IHJlc291cmNlcyBmb3IgQmluZyBNYXBzIFY4LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgTG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLl9kb2N1bWVudFJlZi5HZXROYXRpdmVEb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICBjb25zdCBjYWxsYmFja05hbWUgPSBgYW5ndWxhcjJiaW5nbWFwcyR7bmV3IERhdGUoKS5nZXRNaWxsaXNlY29uZHMoKX1gO1xuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5HZXRTY3JpcHRTcmMoY2FsbGJhY2tOYW1lKTtcblxuICAgICAgICB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5fd2luZG93UmVmLkdldE5hdGl2ZVdpbmRvdygpKVtjYWxsYmFja05hbWVdID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IChlcnJvcjogRXZlbnQpID0+IHsgcmVqZWN0KGVycm9yKTsgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQmluZyBNYXAgVjggc2NyaXB0cyB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGxiYWNrTmFtZSAtIE5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBCaW5nIE1hcHMgVjggc2NyaXB0cyBhcmUgbG9hZGVkLlxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB0byBiZSB1c2VkIHRvIGxvYWQgdGhlIEJpbmcgTWFwIHNjcmlwdHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ01hcEFQSUxvYWRlclxuICAgICAqL1xuICAgIHByaXZhdGUgR2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2xUeXBlOiBTY3JpcHRQcm90b2NvbCA9ICh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBERUZBVUxUX0NPTkZJR1VSQVRJT04ucHJvdG9jb2w7XG4gICAgICAgIGxldCBwcm90b2NvbDogc3RyaW5nO1xuXG4gICAgICAgIHN3aXRjaCAocHJvdG9jb2xUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkFVVE86XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuSFRUUDpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFBTOlxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBob3N0QW5kUGF0aDogc3RyaW5nID0gdGhpcy5fY29uZmlnLmhvc3RBbmRQYXRoIHx8IERFRkFVTFRfQ09ORklHVVJBVElPTi5ob3N0QW5kUGF0aDtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tOYW1lXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuYnJhbmNoICE9PSAnJykge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ2JyYW5jaCddID0gdGhpcy5fY29uZmlnLmJyYW5jaDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgICAgICAgLm1hcCgoazogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW0gPSAoaSA9PT0gMCkgPyAnPycgOiAnJic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtICs9IGAke2t9PSR7cXVlcnlQYXJhbXNba119YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdEFuZFBhdGh9JHtwYXJhbXN9YDtcbiAgICB9XG59XG4iXX0=