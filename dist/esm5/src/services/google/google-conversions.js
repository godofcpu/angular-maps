/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as GoogleMapTypes from './google-map-types';
import { MapTypeId } from '../../models/map-type-id';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Google Maps specific implementations.
 *
 * @export
 */
var GoogleConversions = /** @class */ (function () {
    function GoogleConversions() {
    }
    /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateBounds = /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (bounds) {
        /** @type {?} */
        var b = {
            east: bounds.maxLongitude,
            north: bounds.maxLatitude,
            south: bounds.minLatitude,
            west: bounds.minLongitude,
        };
        return b;
    };
    /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateInfoWindowOptions = /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._infoWindowOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'htmlContent') {
                o.content = (/** @type {?} */ (options))[k];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        if (o.content == null || o.content === '') {
            if (options.title !== '' && options.description !== '') {
                o.content = options.title + ": " + options.description;
            }
            else if (options.description !== '') {
                o.content = options.description;
            }
            else {
                o.content = options.title;
            }
        }
        return o;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocation = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        /** @type {?} */
        var l = { lat: latlong.latitude, lng: latlong.longitude };
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLng = /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        /** @type {?} */
        var l = { latitude: latlng.lat, longitude: latlng.lng };
        return l;
    };
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObject = /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlong) {
        /** @type {?} */
        var l = new google.maps.LatLng(latlong.latitude, latlong.longitude);
        return l;
    };
    /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLatLngObject = /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlng) {
        /** @type {?} */
        var l = { latitude: latlng.lat(), longitude: latlng.lng() };
        return l;
    };
    /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateLocationObjectArray = /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (latlongArray) {
        /** @type {?} */
        var p = new Array();
        for (var i = 0; i < latlongArray.length; i++) {
            p.push(GoogleConversions.TranslateLocationObject(latlongArray[i]));
        }
        return p;
    };
    /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateMapTypeId = /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (mapTypeId) {
        switch (mapTypeId) {
            case MapTypeId.road: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.roadmap];
            case MapTypeId.grayscale: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            case MapTypeId.hybrid: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.hybrid];
            case MapTypeId.ordnanceSurvey: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            default: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.satellite];
        }
    };
    /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    GoogleConversions.TranslateMarkerOptions = /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._markerOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'position') {
                /** @type {?} */
                var latlng = GoogleConversions.TranslateLocationObject(options[k]);
                o.position = latlng;
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslateOptions = /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._mapOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'center') {
                o.center = GoogleConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = GoogleConversions.TranslateMapTypeId(options.mapTypeId);
            }
            else if (k === 'disableZooming') {
                o.gestureHandling = 'none';
                o.zoomControl = false;
            }
            else if (k === 'showMapTypeSelector') {
                o.mapTypeControl = false;
            }
            else if (k === 'customMapStyleGoogle') {
                o.styles = /** @type {?} */ (/** @type {?} */ (options.customMapStyleGoogle));
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    GoogleConversions.TranslatePaths = /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    function (paths) {
        /** @type {?} */
        var p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            /** @type {?} */
            var p1 = /** @type {?} */ (paths);
            for (var i = 0; i < p1.length; i++) {
                p.push(GoogleConversions.TranslateLocationObjectArray(p1[i]));
            }
        }
        else {
            // parameter is a simple array....
            p.push(GoogleConversions.TranslateLocationObjectArray(/** @type {?} */ (paths)));
        }
        return p;
    };
    /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolygonOptions = /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polygonOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            if (k === 'paths') {
                if (!Array.isArray(options.paths)) {
                    return;
                }
                if (options.paths.length === 0) {
                    o.paths = new Array();
                }
                else if (Array.isArray(options.paths[0])) {
                    o.paths = new Array();
                    /** @type {?} */
                    var p1 = /** @type {?} */ (options.paths);
                    for (var i = 0; i < p1.length; i++) {
                        o.paths[i] = new Array();
                        for (var j = 0; j < p1[i].length; j++) {
                            o.paths[i][j] = { lat: p1[i][j].latitude, lng: p1[i][j].longitude };
                        }
                    }
                }
                else {
                    o.paths = new Array();
                    /** @type {?} */
                    var p1 = /** @type {?} */ (options.paths);
                    for (var i = 0; i < p1.length; i++) {
                        o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                    }
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    };
    /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    GoogleConversions.TranslatePolylineOptions = /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    function (options) {
        /** @type {?} */
        var o = {};
        Object.keys(options)
            .filter(function (k) { return GoogleConversions._polylineOptionsAttributes.indexOf(k) !== -1; })
            .forEach(function (k) {
            o[k] = (/** @type {?} */ (options))[k];
        });
        return o;
    };
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._mapOptionsAttributes = [
        'backgroundColor',
        'center',
        'clickableIcons',
        'customMapStyleGoogle',
        'disableDefaultUI',
        'disableDoubleClickZoom',
        'draggable',
        'draggableCursor',
        'draggingCursor',
        'disableZooming',
        'fullscreenControl',
        'fullscreenControlOptions',
        'gestureHandling',
        'heading',
        'keyboardShortcuts',
        'mapTypeControl',
        'mapTypeControlOptions',
        'mapTypeId',
        'maxZoom',
        'minZoom',
        'noClear',
        'panControl',
        'panControlOptions',
        'rotateControl',
        'rotateControlOptions',
        'scaleControl',
        'scaleControlOptions',
        'scrollwheel',
        'showMapTypeSelector',
        'streetView',
        'streetViewControl',
        'streetViewControlOptions',
        'styles',
        'tilt',
        'zoom',
        'zoomControl',
        'zoomControlOptions'
    ];
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._infoWindowOptionsAttributes = [
        'actions',
        'description',
        'htmlContent',
        'id',
        'position',
        'pixelOffset',
        'showCloseButton',
        'showPointer',
        'pushpin',
        'title',
        'titleClickHandler',
        'typeName',
        'visible',
        'width',
        'height'
    ];
    /**
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._markerOptionsAttributes = [
        'anchor',
        'position',
        'title',
        'text',
        'label',
        'draggable',
        'icon',
        'width',
        'height',
        'iconInfo',
        'metadata',
        'visible'
    ];
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._clusterOptionsAttributes = [
        'callback',
        'clusteredPinCallback',
        'clusteringEnabled',
        'gridSize',
        'layerOffset',
        'placementMode',
        'visible',
        'zIndex'
    ];
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polygonOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'fillColor',
        'fillOpacity',
        'geodesic',
        'paths',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     */
    GoogleConversions._polylineOptionsAttributes = [
        'clickable',
        'draggable',
        'editable',
        'geodesic',
        'strokeColor',
        'strokeOpacity',
        'strokeWeight',
        'visible',
        'zIndex'
    ];
    return GoogleConversions;
}());
export { GoogleConversions };
if (false) {
    /**
     * Map option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._mapOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._markerOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._clusterOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Google Map properties
     *
     * \@memberof GoogleConversions
     * @type {?}
     */
    GoogleConversions._polylineOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNvbnZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzS25DLGlDQUFlOzs7Ozs7OztjQUFDLE1BQVk7O1FBQ3RDLElBQU0sQ0FBQyxHQUF1QztZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7U0FDNUIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXQyw0Q0FBMEI7Ozs7Ozs7O2NBQUMsT0FBMkI7O1FBQ2hFLElBQU0sQ0FBQyxHQUEyQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhFLENBQWdFLENBQUM7YUFDN0UsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsT0FBTyxHQUFHLG1CQUFNLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFNLE9BQU8sRUFB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ZTtRQUNmLFNBQVM7UUFDVCxRQUFRO0tBQ1g7Ozs7OztrREFPb0Q7UUFDakQsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLGFBQWE7UUFDYixVQUFVO1FBQ1YsT0FBTztRQUNQLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYztRQUNkLFNBQVM7UUFDVCxRQUFRO0tBQ1g7Ozs7OzttREFPcUQ7UUFDbEQsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsVUFBVTtRQUNWLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYztRQUNkLFNBQVM7UUFDVCxRQUFRO0tBQ1g7NEJBcEtMOztTQW1CYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJSW5mb1dpbmRvd09wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lpbmZvLXdpbmRvdy1vcHRpb25zJztcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xuaW1wb3J0IHsgSU1hcE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ltYXAtb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcmtlci1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWxpbmVPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi9nb29nbGUtbWFwLXR5cGVzJztcbmltcG9ydCB7IE1hcFR5cGVJZCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXAtdHlwZS1pZCc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTogYW55O1xuXG5cbi8qKlxuICogVGhpcyBjbGFzcyBjb250YWlucyBoZWxwZXJmdW5jdGlvbnMgdG8gbWFwIHZhcmlvdXMgaW50ZXJmYWNlcyB1c2VkIHRvIHJlcHJlc2VudCBvcHRpb25zIGFuZCBzdHJ1Y3R1cmVzIGludG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIEdvb2dsZSBNYXBzIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBHb29nbGVDb252ZXJzaW9ucyB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBNYXAgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcE9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2JhY2tncm91bmRDb2xvcicsXG4gICAgICAgICdjZW50ZXInLFxuICAgICAgICAnY2xpY2thYmxlSWNvbnMnLFxuICAgICAgICAnY3VzdG9tTWFwU3R5bGVHb29nbGUnLFxuICAgICAgICAnZGlzYWJsZURlZmF1bHRVSScsXG4gICAgICAgICdkaXNhYmxlRG91YmxlQ2xpY2tab29tJyxcbiAgICAgICAgJ2RyYWdnYWJsZScsXG4gICAgICAgICdkcmFnZ2FibGVDdXJzb3InLFxuICAgICAgICAnZHJhZ2dpbmdDdXJzb3InLFxuICAgICAgICAnZGlzYWJsZVpvb21pbmcnLFxuICAgICAgICAnZnVsbHNjcmVlbkNvbnRyb2wnLFxuICAgICAgICAnZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zJyxcbiAgICAgICAgJ2dlc3R1cmVIYW5kbGluZycsXG4gICAgICAgICdoZWFkaW5nJyxcbiAgICAgICAgJ2tleWJvYXJkU2hvcnRjdXRzJyxcbiAgICAgICAgJ21hcFR5cGVDb250cm9sJyxcbiAgICAgICAgJ21hcFR5cGVDb250cm9sT3B0aW9ucycsXG4gICAgICAgICdtYXBUeXBlSWQnLFxuICAgICAgICAnbWF4Wm9vbScsXG4gICAgICAgICdtaW5ab29tJyxcbiAgICAgICAgJ25vQ2xlYXInLFxuICAgICAgICAncGFuQ29udHJvbCcsXG4gICAgICAgICdwYW5Db250cm9sT3B0aW9ucycsXG4gICAgICAgICdyb3RhdGVDb250cm9sJyxcbiAgICAgICAgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcbiAgICAgICAgJ3NjYWxlQ29udHJvbCcsXG4gICAgICAgICdzY2FsZUNvbnRyb2xPcHRpb25zJyxcbiAgICAgICAgJ3Njcm9sbHdoZWVsJyxcbiAgICAgICAgJ3Nob3dNYXBUeXBlU2VsZWN0b3InLFxuICAgICAgICAnc3RyZWV0VmlldycsXG4gICAgICAgICdzdHJlZXRWaWV3Q29udHJvbCcsXG4gICAgICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLFxuICAgICAgICAnc3R5bGVzJyxcbiAgICAgICAgJ3RpbHQnLFxuICAgICAgICAnem9vbScsXG4gICAgICAgICd6b29tQ29udHJvbCcsXG4gICAgICAgICd6b29tQ29udHJvbE9wdGlvbnMnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIEluZm9XaW5kb3cgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luZm9XaW5kb3dPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhY3Rpb25zJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgJ2h0bWxDb250ZW50JyxcbiAgICAgICAgJ2lkJyxcbiAgICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgICAgJ3BpeGVsT2Zmc2V0JyxcbiAgICAgICAgJ3Nob3dDbG9zZUJ1dHRvbicsXG4gICAgICAgICdzaG93UG9pbnRlcicsXG4gICAgICAgICdwdXNocGluJyxcbiAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgJ3RpdGxlQ2xpY2tIYW5kbGVyJyxcbiAgICAgICAgJ3R5cGVOYW1lJyxcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICAnaGVpZ2h0J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBNYXJrZXIgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2FuY2hvcicsXG4gICAgICAgICdwb3NpdGlvbicsXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICd0ZXh0JyxcbiAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgJ2RyYWdnYWJsZScsXG4gICAgICAgICdpY29uJyxcbiAgICAgICAgJ3dpZHRoJyxcbiAgICAgICAgJ2hlaWdodCcsXG4gICAgICAgICdpY29uSW5mbycsXG4gICAgICAgICdtZXRhZGF0YScsXG4gICAgICAgICd2aXNpYmxlJ1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBDbHVzdGVyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9jbHVzdGVyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnY2FsbGJhY2snLFxuICAgICAgICAnY2x1c3RlcmVkUGluQ2FsbGJhY2snLFxuICAgICAgICAnY2x1c3RlcmluZ0VuYWJsZWQnLFxuICAgICAgICAnZ3JpZFNpemUnLFxuICAgICAgICAnbGF5ZXJPZmZzZXQnLFxuICAgICAgICAncGxhY2VtZW50TW9kZScsXG4gICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgJ3pJbmRleCdcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogUG9seWdvbiBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2NsaWNrYWJsZScsXG4gICAgICAgICdkcmFnZ2FibGUnLFxuICAgICAgICAnZWRpdGFibGUnLFxuICAgICAgICAnZmlsbENvbG9yJyxcbiAgICAgICAgJ2ZpbGxPcGFjaXR5JyxcbiAgICAgICAgJ2dlb2Rlc2ljJyxcbiAgICAgICAgJ3BhdGhzJyxcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgJ3N0cm9rZU9wYWNpdHknLFxuICAgICAgICAnc3Ryb2tlV2VpZ2h0JyxcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnekluZGV4J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBQb2x5bGluZSBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWxpbmVPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgICAgICdjbGlja2FibGUnLFxuICAgICAgICAnZHJhZ2dhYmxlJyxcbiAgICAgICAgJ2VkaXRhYmxlJyxcbiAgICAgICAgJ2dlb2Rlc2ljJyxcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgJ3N0cm9rZU9wYWNpdHknLFxuICAgICAgICAnc3Ryb2tlV2VpZ2h0JyxcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnekluZGV4J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElCb3ggb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYm91bmRzIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUJvdW5kcyhib3VuZHM6IElCb3gpOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsIHtcbiAgICAgICAgY29uc3QgYjogR29vZ2xlTWFwVHlwZXMuTGF0TG5nQm91bmRzTGl0ZXJhbCA9IHtcbiAgICAgICAgICAgIGVhc3Q6IGJvdW5kcy5tYXhMb25naXR1ZGUsXG4gICAgICAgICAgICBub3J0aDogYm91bmRzLm1heExhdGl0dWRlLFxuICAgICAgICAgICAgc291dGg6IGJvdW5kcy5taW5MYXRpdHVkZSxcbiAgICAgICAgICAgIHdlc3Q6IGJvdW5kcy5taW5Mb25naXR1ZGUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUluZm9XaW5kb3dPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUluZm9XaW5kb3dPcHRpb25zKG9wdGlvbnM6IElJbmZvV2luZG93T3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLkluZm9XaW5kb3dPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5faW5mb1dpbmRvd09wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2h0bWxDb250ZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBvLmNvbnRlbnQgPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChvLmNvbnRlbnQgPT0gbnVsbCB8fCBvLmNvbnRlbnQgPT09ICcnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aXRsZSAhPT0gJycgJiYgb3B0aW9ucy5kZXNjcmlwdGlvbiAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBvLmNvbnRlbnQgPSBgJHtvcHRpb25zLnRpdGxlfTogJHtvcHRpb25zLmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmRlc2NyaXB0aW9uICE9PSAnJykgeyBvLmNvbnRlbnQgPSBvcHRpb25zLmRlc2NyaXB0aW9uOyB9XG4gICAgICAgICAgICBlbHNlIHsgby5jb250ZW50ID0gb3B0aW9ucy50aXRsZTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF0bG9uZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbihsYXRsb25nOiBJTGF0TG9uZyk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwge1xuICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsID0geyBsYXQ6IGxhdGxvbmcubGF0aXR1ZGUsIGxuZzogbGF0bG9uZy5sb25naXR1ZGUgfTtcbiAgICAgICAgcmV0dXJuIGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsIG9iamVjdCB0byBhIElMYXRMb25nIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRsbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTGF0TG5nKGxhdGxuZzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCk6IElMYXRMb25nIHtcbiAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSB7IGxhdGl0dWRlOiBsYXRsbmcubGF0LCBsb25naXR1ZGU6IGxhdGxuZy5sbmcgfTtcbiAgICAgICAgcmV0dXJuIGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJTGF0TG9uZyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdGxvbmcgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb25PYmplY3QobGF0bG9uZzogSUxhdExvbmcpOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcge1xuICAgICAgICBjb25zdCBsOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGxvbmcubGF0aXR1ZGUsIGxhdGxvbmcubG9uZ2l0dWRlKTtcbiAgICAgICAgcmV0dXJuIGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0IHRvIGEgSUxhdExvbmcgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMYXRMbmdPYmplY3QobGF0bG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmcpOiBJTGF0TG9uZyB7XG4gICAgICAgIGNvbnN0IGw6IElMYXRMb25nID0geyBsYXRpdHVkZTogbGF0bG5nLmxhdCgpLCBsb25naXR1ZGU6IGxhdGxuZy5sbmcoKSB9O1xuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIGFycmF5IHRvIGEgYXJyYXkgb2YgR29vZ2xlTWFwVHlwZXMuTGF0TG5nIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRsb25nQXJyYXkgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheShsYXRsb25nQXJyYXk6IEFycmF5PElMYXRMb25nPik6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4ge1xuICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uLlxuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXRsb25nQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHAucHVzaChHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRsb25nQXJyYXlbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgTWFwVHlwZUlkIG9iamVjdCB0byBhIEdvb2dsZSBtYXB0eXBlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXBUeXBlSWQgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTWFwVHlwZUlkKG1hcFR5cGVJZDogTWFwVHlwZUlkKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChtYXBUeXBlSWQpIHtcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLnJvYWQ6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnJvYWRtYXBdO1xuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQuZ3JheXNjYWxlOiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC50ZXJyYWluXTtcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLmh5YnJpZDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQuaHlicmlkXTtcbiAgICAgICAgICAgIGNhc2UgTWFwVHlwZUlkLm9yZG5hbmNlU3VydmV5OiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC50ZXJyYWluXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnNhdGVsbGl0ZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElNYXJrZXJPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gUHJvbWlzZSB0aGF0IHdoZW4gcmVzb2x2ZWQgY29udGFpbnMgdGhlIG1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyB8IGFueSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9tYXJrZXJPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF0bG5nID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3Qob3B0aW9uc1trXSk7XG4gICAgICAgICAgICAgICAgICAgIG8ucG9zaXRpb24gPSBsYXRsbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSU1hcE9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVPcHRpb25zKG9wdGlvbnM6IElNYXBPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLk1hcE9wdGlvbnMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlciA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ21hcFR5cGVJZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlSWQgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVNYXBUeXBlSWQob3B0aW9ucy5tYXBUeXBlSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnZGlzYWJsZVpvb21pbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uZ2VzdHVyZUhhbmRsaW5nID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBvLnpvb21Db250cm9sID0gIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnc2hvd01hcFR5cGVTZWxlY3RvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgby5tYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnY3VzdG9tTWFwU3R5bGVHb29nbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uc3R5bGVzID0gPEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVTdHlsZVtdPjxhbnk+IG9wdGlvbnMuY3VzdG9tTWFwU3R5bGVHb29nbGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55Pm8pW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZXMgYW4gYXJyYXkgb2YgbG9jYXRpb25zIG9yIGFuIGFycmF5IG9yIGFycmF5cyBvZiBsb2NhdGlvbiB0byBhbmQgYXJyYXkgb2YgYXJyYXlzIG9mIEJpbmcgTWFwIExvY2F0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIC0gSUxhdExvbmcgYmFzZWQgbG9jYXRpb25zIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMgLSBjb252ZXJ0ZWQgbG9jYXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQYXRocyhwYXRoczogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+Pik6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+IHtcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSBuZXcgQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4oKTtcbiAgICAgICAgaWYgKHBhdGhzID09IG51bGwgfHwgIUFycmF5LmlzQXJyYXkocGF0aHMpIHx8IHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcC5wdXNoKG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb3IgYXJyYXlzXG4gICAgICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uLlxuICAgICAgICAgICAgY29uc3QgcDEgPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5wYXRocztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwLnB1c2goR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheShwMVtpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxuICAgICAgICAgICAgcC5wdXNoKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0QXJyYXkoPEFycmF5PElMYXRMb25nPj5wYXRocykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNYXBzIGFuIElQb2x5Z29uT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3BhdGhzJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRocykpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRocyA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhzWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5wYXRocyA9IG5ldyBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsPj4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+b3B0aW9ucy5wYXRocztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwMVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldW2pdID0ge2xhdDogcDFbaV1bal0ubGF0aXR1ZGUsIGxuZzogcDFbaV1bal0ubG9uZ2l0dWRlfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZm9yIGxvb3AgZm9yIHBlcmZvcm1hbmNlIGluIGNhc2Ugd2UgZGVhbCB3aXRoIGxhcmdlIG51bWJlcnMgb2YgcG9pbnRzIGFuZCBwYXRocy4uXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxJTGF0TG9uZz4+b3B0aW9ucy5wYXRocztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzW2ldID0ge2xhdDogcDFbaV0ubGF0aXR1ZGUsIGxuZzogcDFbaV0ubG9uZ2l0dWRlfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTWFwcyBhbiBJUG9seWxpbmVPcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLlBvbHlsaW5lT3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zIHwgYW55ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX3BvbHlsaW5lT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG59XG4iXX0=