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
 * Bing Maps V8 specific loader configuration to be used with the {\@link GoogleMapAPILoader}
 *
 * @export
 */
export class GoogleMapAPILoaderConfig {
}
GoogleMapAPILoaderConfig.decorators = [
    { type: Injectable },
];
if (false) {
    /**
     * The Google Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiKey;
    /**
     * The Google Maps client ID (for premium plans).
     * When you have a Google Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Google Maps API will fail to load if both a client ID and an API key are included.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clientId;
    /**
     * The Google Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.channel;
    /**
     * Google Maps API version.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.apiVersion;
    /**
     * Host and Path used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.hostAndPath;
    /**
     * Protocol used for the `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.protocol;
    /**
     * Defines which Google Maps libraries should get loaded.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.libraries;
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.region;
    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.language;
    /**
     * The Google Maps API requires a separate library for clustering. Set the property
     * to true in order to load this library.
     * See https://developers.google.com/maps/documentation/javascript/marker-clustering
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.enableClustering;
    /**
     * Host and Path used for the cluster library `<script>` tag.
     * @type {?}
     */
    GoogleMapAPILoaderConfig.prototype.clusterHostAndPath;
}
/** *
 * Default loader configuration.
  @type {?} */
const DEFAULT_CONFIGURATION = new GoogleMapAPILoaderConfig();
/**
 * Bing Maps V8 implementation for the {\@link MapAPILoader} service.
 *
 * @export
 */
export class GoogleMapAPILoader extends MapAPILoader {
    /**
     * Creates an instance of GoogleMapAPILoader.
     * \@memberof GoogleMapAPILoader
     * @param {?} _config - The loader configuration.
     * @param {?} _windowRef - An instance of {\@link WindowRef}. Necessary because Bing Map V8 interacts with the window object.
     * @param {?} _documentRef - An instance of {\@link DocumentRef}.
     *                                     Necessary because Bing Map V8 interacts with the document object.
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
     * \@memberof GoogleMapAPILoader
     * @return {?}
     */
    get Config() { return this._config; }
    /**
     * Loads the necessary resources for Bing Maps V8.
     *
     * \@memberof GoogleMapAPILoader
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
        const callbackName = `Create`;
        script.src = this.GetMapsScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            (/** @type {?} */ (this._windowRef.GetNativeWindow()))[callbackName] = () => {
                if (this._config.enableClustering) {
                    /** @type {?} */
                    const clusterScript = this._documentRef.GetNativeDocument().createElement('script');
                    clusterScript.type = 'text/javascript';
                    clusterScript.src = this.GetClusterScriptSrc();
                    clusterScript.onload = clusterScript.onreadystatechange = () => {
                        resolve();
                    };
                    this._documentRef.GetNativeDocument().head.appendChild(clusterScript);
                }
                else {
                    resolve();
                }
            };
            script.onerror = (error) => { reject(error); };
        });
        this._documentRef.GetNativeDocument().head.appendChild(script);
        return this._scriptLoadingPromise;
    }
    /**
     * Gets the Google Maps scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} callbackName - Name of the function to be called when the Google Maps scripts are loaded.
     * @return {?} - The url to be used to load the Google Map scripts.
     *
     */
    GetMapsScriptSrc(callbackName) {
        /** @type {?} */
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        /** @type {?} */
        const queryParams = {
            v: this._config.apiVersion,
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        return this.GetScriptSrc(hostAndPath, queryParams);
    }
    /**
     * Gets the Google Maps Cluster library url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @return {?} - The url to be used to load the Google Map Cluster library.
     *
     */
    GetClusterScriptSrc() {
        /** @type {?} */
        const hostAndPath = this._config.clusterHostAndPath ||
            'developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
        return this.GetScriptSrc(hostAndPath, {});
    }
    /**
     * Gets a scripts url for injections into the header.
     *
     * \@memberof GoogleMapAPILoader
     * @param {?} hostAndPath - Host and path name of the script to load.
     * @param {?} queryParams - Url query parameters.
     * @return {?} - The url with correct protocol, path, and query parameters.
     *
     */
    GetScriptSrc(hostAndPath, queryParams) {
        /** @type {?} */
        const protocolType = /** @type {?} */ (((this._config && this._config.protocol) || ScriptProtocol.HTTPS));
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
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            /** @type {?} */
            const i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
GoogleMapAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GoogleMapAPILoader.ctorParameters = () => [
    { type: GoogleMapAPILoaderConfig, decorators: [{ type: Optional }] },
    { type: WindowRef },
    { type: DocumentRef }
];
if (false) {
    /** @type {?} */
    GoogleMapAPILoader.prototype._scriptLoadingPromise;
    /** @type {?} */
    GoogleMapAPILoader.prototype._config;
    /** @type {?} */
    GoogleMapAPILoader.prototype._windowRef;
    /** @type {?} */
    GoogleMapAPILoader.prototype._documentRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1hcGktbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtYXBpLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0lBU25FLE9BQUk7SUFDSixRQUFLO0lBQ0wsT0FBSTs7OzhCQUZKLElBQUk7OEJBQ0osS0FBSzs4QkFDTCxJQUFJOzs7Ozs7QUFTUixNQUFNOzs7WUFETCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkVYLE1BQU0scUJBQXFCLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDOzs7Ozs7QUFRN0QsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOzs7Ozs7Ozs7SUEyQmhELFlBQWlDLE9BQWlDLEVBQVUsVUFBcUIsRUFBVSxZQUF5QjtRQUNoSSxLQUFLLEVBQUUsQ0FBQztRQURxQixZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUVoSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUN4QztLQUNKOzs7Ozs7OztRQWZVLE1BQU0sS0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7SUEwQjdELElB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WUFFZixNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUN6QztZQUNELE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzVDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxLQUFxQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDekYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLFFBQVEsS0FBSyxXQUFXLElBQUksTUFBTSxFQUFFLENBQUM7Ozs7WUFsS3RELFVBQVU7Ozs7WUE0Qm1DLHdCQUF3Qix1QkFBcEQsUUFBUTtZQWpJSCxTQUFTO1lBQUUsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBBUElMb2FkZXIsIFdpbmRvd1JlZiwgRG9jdW1lbnRSZWYgfSBmcm9tICcuLi9tYXBhcGlsb2FkZXInO1xuXG4vKipcbiAqIFByb3RvY29sIGVudW1lcmF0aW9uXG4gKlxuICogQGV4cG9ydFxuICogQGVudW0ge251bWJlcn1cbiAqL1xuZXhwb3J0IGVudW0gU2NyaXB0UHJvdG9jb2wge1xuICAgIEhUVFAsXG4gICAgSFRUUFMsXG4gICAgQVVUT1xufVxuXG4vKipcbiAqIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBsb2FkZXIgY29uZmlndXJhdGlvbiB0byBiZSB1c2VkIHdpdGggdGhlIHtAbGluayBHb29nbGVNYXBBUElMb2FkZXJ9XG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlTWFwQVBJTG9hZGVyQ29uZmlnIHtcbiAgICAvKipcbiAgICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgS2V5IChzZWU6XG4gICAgICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9nZXQtYXBpLWtleSlcbiAgICAgICAqL1xuICAgIGFwaUtleT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBjbGllbnQgSUQgKGZvciBwcmVtaXVtIHBsYW5zKS5cbiAgICAgKiBXaGVuIHlvdSBoYXZlIGEgR29vZ2xlIE1hcHMgQVBJcyBQcmVtaXVtIFBsYW4gbGljZW5zZSwgeW91IG11c3QgYXV0aGVudGljYXRlXG4gICAgICogeW91ciBhcHBsaWNhdGlvbiB3aXRoIGVpdGhlciBhbiBBUEkga2V5IG9yIGEgY2xpZW50IElELlxuICAgICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgd2lsbCBmYWlsIHRvIGxvYWQgaWYgYm90aCBhIGNsaWVudCBJRCBhbmQgYW4gQVBJIGtleSBhcmUgaW5jbHVkZWQuXG4gICAgICovXG4gICAgY2xpZW50SWQ/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgY2hhbm5lbCBuYW1lIChmb3IgcHJlbWl1bSBwbGFucykuXG4gICAgICogQSBjaGFubmVsIHBhcmFtZXRlciBpcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBhbGxvd3MgeW91IHRvIHRyYWNrIHVzYWdlIHVuZGVyIHlvdXIgY2xpZW50XG4gICAgICogSUQgYnkgYXNzaWduaW5nIGEgZGlzdGluY3QgY2hhbm5lbCB0byBlYWNoIG9mIHlvdXIgYXBwbGljYXRpb25zLlxuICAgICAqL1xuICAgIGNoYW5uZWw/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHb29nbGUgTWFwcyBBUEkgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBhcGlWZXJzaW9uPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSG9zdCBhbmQgUGF0aCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXG4gICAgICovXG4gICAgaG9zdEFuZFBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQcm90b2NvbCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXG4gICAgICovXG4gICAgcHJvdG9jb2w/OiBTY3JpcHRQcm90b2NvbDtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hpY2ggR29vZ2xlIE1hcHMgbGlicmFyaWVzIHNob3VsZCBnZXQgbG9hZGVkLlxuICAgICAqL1xuICAgIGxpYnJhcmllcz86IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgYmlhcyBmb3IgdGhlIG1hcCBiZWhhdmlvciBpcyBVUy5cbiAgICAgKiBJZiB5b3Ugd2lzaCB0byBhbHRlciB5b3VyIGFwcGxpY2F0aW9uIHRvIHNlcnZlIGRpZmZlcmVudCBtYXAgdGlsZXMgb3IgYmlhcyB0aGVcbiAgICAgKiBhcHBsaWNhdGlvbiwgeW91IGNhbiBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgKFVTKSBieSBkZWZpbmluZyBhIGByZWdpb25gLlxuICAgICAqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9iYXNpY3MjUmVnaW9uXG4gICAgICovXG4gICAgcmVnaW9uPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSB1c2VzIHRoZSBicm93c2VyJ3MgcHJlZmVycmVkIGxhbmd1YWdlIHdoZW4gZGlzcGxheWluZ1xuICAgICAqIHRleHR1YWwgaW5mb3JtYXRpb24uIElmIHlvdSB3aXNoIHRvIG92ZXJ3cml0ZSB0aGlzIGJlaGF2aW9yIGFuZCBmb3JjZSB0aGUgQVBJXG4gICAgICogdG8gdXNlIGEgZ2l2ZW4gbGFuZ3VhZ2UsIHlvdSBjYW4gdXNlIHRoaXMgc2V0dGluZy5cbiAgICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvYmFzaWNzI0xhbmd1YWdlXG4gICAgICovXG4gICAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgR29vZ2xlIE1hcHMgQVBJIHJlcXVpcmVzIGEgc2VwYXJhdGUgbGlicmFyeSBmb3IgY2x1c3RlcmluZy4gU2V0IHRoZSBwcm9wZXJ0eVxuICAgICAqIHRvIHRydWUgaW4gb3JkZXIgdG8gbG9hZCB0aGlzIGxpYnJhcnkuXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L21hcmtlci1jbHVzdGVyaW5nXG4gICAgICovXG4gICAgZW5hYmxlQ2x1c3RlcmluZz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBjbHVzdGVyIGxpYnJhcnkgYDxzY3JpcHQ+YCB0YWcuXG4gICAgICovXG4gICAgY2x1c3Rlckhvc3RBbmRQYXRoPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlZmF1bHQgbG9hZGVyIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmNvbnN0IERFRkFVTFRfQ09ORklHVVJBVElPTiA9IG5ldyBHb29nbGVNYXBBUElMb2FkZXJDb25maWcoKTtcblxuLyoqXG4gKiBCaW5nIE1hcHMgVjggaW1wbGVtZW50YXRpb24gZm9yIHRoZSB7QGxpbmsgTWFwQVBJTG9hZGVyfSBzZXJ2aWNlLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcEFQSUxvYWRlciBleHRlbmRzIE1hcEFQSUxvYWRlciB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVmaW50aXRpb25zLlxuICAgIC8vL1xuICAgIHByaXZhdGUgX3NjcmlwdExvYWRpbmdQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9ucy5cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgQ29uZmlnKCk6IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZyB7IHJldHVybiB0aGlzLl9jb25maWc7IH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR29vZ2xlTWFwQVBJTG9hZGVyLlxuICAgICAqIEBwYXJhbSBfY29uZmlnIC0gVGhlIGxvYWRlciBjb25maWd1cmF0aW9uLlxuICAgICAqIEBwYXJhbSBfd2luZG93UmVmIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFdpbmRvd1JlZn0uIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgICAqIEBwYXJhbSBfZG9jdW1lbnRSZWYgLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgRG9jdW1lbnRSZWZ9LlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5lY2Vzc2FyeSBiZWNhdXNlIEJpbmcgTWFwIFY4IGludGVyYWN0cyB3aXRoIHRoZSBkb2N1bWVudCBvYmplY3QuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcEFQSUxvYWRlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBwcml2YXRlIF9jb25maWc6IEdvb2dsZU1hcEFQSUxvYWRlckNvbmZpZywgcHJpdmF0ZSBfd2luZG93UmVmOiBXaW5kb3dSZWYsIHByaXZhdGUgX2RvY3VtZW50UmVmOiBEb2N1bWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodGhpcy5fY29uZmlnID09PSBudWxsIHx8IHRoaXMuX2NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSBERUZBVUxUX0NPTkZJR1VSQVRJT047XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHMgYW5kIE1hcEFQSUxvYWRlciBpbXBsZW1lbnRhdGlvbi5cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBuZWNlc3NhcnkgcmVzb3VyY2VzIGZvciBCaW5nIE1hcHMgVjguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXG4gICAgICovXG4gICAgcHVibGljIExvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tOYW1lID0gYENyZWF0ZWA7XG4gICAgICAgIHNjcmlwdC5zcmMgPSB0aGlzLkdldE1hcHNTY3JpcHRTcmMoY2FsbGJhY2tOYW1lKTtcblxuICAgICAgICB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5fd2luZG93UmVmLkdldE5hdGl2ZVdpbmRvdygpKVtjYWxsYmFja05hbWVdID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuZW5hYmxlQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiBjbHVzdGVyaW5nIGlzIGVuYWJsZWQgdGhlbiBkZWxheSB0aGUgbG9hZGluZyB1bnRpbCBhZnRlciB0aGUgY2x1c3RlciBsaWJyYXJ5IGlzIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbHVzdGVyU2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJTY3JpcHQuc3JjID0gdGhpcy5HZXRDbHVzdGVyU2NyaXB0U3JjKCk7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJTY3JpcHQub25sb2FkID0gY2x1c3RlclNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLkdldE5hdGl2ZURvY3VtZW50KCkuaGVhZC5hcHBlbmRDaGlsZChjbHVzdGVyU2NyaXB0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gKGVycm9yOiBFdmVudCkgPT4geyByZWplY3QoZXJyb3IpOyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuR2V0TmF0aXZlRG9jdW1lbnQoKS5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBNYXBzIHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsYmFja05hbWUgLSBOYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgR29vZ2xlIE1hcHMgc2NyaXB0cyBhcmUgbG9hZGVkLlxuICAgICAqIEByZXR1cm5zIC0gVGhlIHVybCB0byBiZSB1c2VkIHRvIGxvYWQgdGhlIEdvb2dsZSBNYXAgc2NyaXB0cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXBBUElMb2FkZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIEdldE1hcHNTY3JpcHRTcmMoY2FsbGJhY2tOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaG9zdEFuZFBhdGg6IHN0cmluZyA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCAnbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcyc7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IEFycmF5PHN0cmluZz4gfSA9IHtcbiAgICAgICAgICAgIHY6IHRoaXMuX2NvbmZpZy5hcGlWZXJzaW9uLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrTmFtZSxcbiAgICAgICAgICAgIGtleTogdGhpcy5fY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGNsaWVudDogdGhpcy5fY29uZmlnLmNsaWVudElkLFxuICAgICAgICAgICAgY2hhbm5lbDogdGhpcy5fY29uZmlnLmNoYW5uZWwsXG4gICAgICAgICAgICBsaWJyYXJpZXM6IHRoaXMuX2NvbmZpZy5saWJyYXJpZXMsXG4gICAgICAgICAgICByZWdpb246IHRoaXMuX2NvbmZpZy5yZWdpb24sXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5fY29uZmlnLmxhbmd1YWdlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLkdldFNjcmlwdFNyYyhob3N0QW5kUGF0aCwgcXVlcnlQYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIEdvb2dsZSBNYXBzIENsdXN0ZXIgbGlicmFyeSB1cmwgZm9yIGluamVjdGlvbnMgaW50byB0aGUgaGVhZGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgdXJsIHRvIGJlIHVzZWQgdG8gbG9hZCB0aGUgR29vZ2xlIE1hcCBDbHVzdGVyIGxpYnJhcnkuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBHZXRDbHVzdGVyU2NyaXB0U3JjKCkge1xuICAgICAgICBjb25zdCBob3N0QW5kUGF0aDogc3RyaW5nID0gdGhpcy5fY29uZmlnLmNsdXN0ZXJIb3N0QW5kUGF0aCB8fFxuICAgICAgICAgICAgJ2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9leGFtcGxlcy9tYXJrZXJjbHVzdGVyZXIvbWFya2VyY2x1c3RlcmVyLmpzJztcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0U2NyaXB0U3JjKGhvc3RBbmRQYXRoLCB7fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHNjcmlwdHMgdXJsIGZvciBpbmplY3Rpb25zIGludG8gdGhlIGhlYWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBob3N0QW5kUGF0aCAtIEhvc3QgYW5kIHBhdGggbmFtZSBvZiB0aGUgc2NyaXB0IHRvIGxvYWQuXG4gICAgICogQHBhcmFtIHF1ZXJ5UGFyYW1zIC0gVXJsIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICogQHJldHVybnMgLSBUaGUgdXJsIHdpdGggY29ycmVjdCBwcm90b2NvbCwgcGF0aCwgYW5kIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFwQVBJTG9hZGVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBHZXRTY3JpcHRTcmMoaG9zdEFuZFBhdGg6IHN0cmluZywgcXVlcnlQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiB9KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJvdG9jb2xUeXBlOiBTY3JpcHRQcm90b2NvbCA9XG4gICAgICAgICAgICA8U2NyaXB0UHJvdG9jb2w+KCh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBTY3JpcHRQcm90b2NvbC5IVFRQUyk7XG4gICAgICAgIGxldCBwcm90b2NvbDogc3RyaW5nO1xuXG4gICAgICAgIHN3aXRjaCAocHJvdG9jb2xUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkFVVE86XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU2NyaXB0UHJvdG9jb2wuSFRUUDpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNjcmlwdFByb3RvY29sLkhUVFBTOlxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcylcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChrOiBzdHJpbmcpID0+IHF1ZXJ5UGFyYW1zW2tdICE9IG51bGwpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkocXVlcnlQYXJhbXNba10pICYmIHF1ZXJ5UGFyYW1zW2tdLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm1hcCgoazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBxdWVyeVBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleTogaywgdmFsdWU6IGkuam9pbignLCcpIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogcXVlcnlQYXJhbXNba10gfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAoKGVudHJ5OiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH0pID0+IHsgcmV0dXJuIGAke2VudHJ5LmtleX09JHtlbnRyeS52YWx1ZX1gOyB9KVxuICAgICAgICAgICAgICAgIC5qb2luKCcmJyk7XG4gICAgICAgIHJldHVybiBgJHtwcm90b2NvbH0vLyR7aG9zdEFuZFBhdGh9PyR7cGFyYW1zfWA7XG4gICAgfVxufVxuIl19