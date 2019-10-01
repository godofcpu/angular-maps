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
export class GoogleConversions {
    /**
     * Maps an IBox object to a GoogleMapTypes.LatLngBoundsLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} bounds - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateBounds(bounds) {
        /** @type {?} */
        const b = {
            east: bounds.maxLongitude,
            north: bounds.maxLatitude,
            south: bounds.minLatitude,
            west: bounds.minLongitude,
        };
        return b;
    }
    /**
     * Maps an IInfoWindowOptions object to a GoogleMapTypes.InfoWindowOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateInfoWindowOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._infoWindowOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'htmlContent') {
                o.content = (/** @type {?} */ (options))[k];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        if (o.content == null || o.content === '') {
            if (options.title !== '' && options.description !== '') {
                o.content = `${options.title}: ${options.description}`;
            }
            else if (options.description !== '') {
                o.content = options.description;
            }
            else {
                o.content = options.title;
            }
        }
        return o;
    }
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLngLiteral object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocation(latlong) {
        /** @type {?} */
        const l = { lat: latlong.latitude, lng: latlong.longitude };
        return l;
    }
    /**
     * Maps an GoogleMapTypes.LatLngLiteral object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLatLng(latlng) {
        /** @type {?} */
        const l = { latitude: latlng.lat, longitude: latlng.lng };
        return l;
    }
    /**
     * Maps an ILatLong object to a GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocationObject(latlong) {
        /** @type {?} */
        const l = new google.maps.LatLng(latlong.latitude, latlong.longitude);
        return l;
    }
    /**
     * Maps an GoogleMapTypes.LatLng object to a ILatLong object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlng - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLatLngObject(latlng) {
        /** @type {?} */
        const l = { latitude: latlng.lat(), longitude: latlng.lng() };
        return l;
    }
    /**
     * Maps an ILatLong array to a array of GoogleMapTypes.LatLng object.
     *
     * \@memberof GoogleConversions
     * @param {?} latlongArray - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocationObjectArray(latlongArray) {
        /** @type {?} */
        const p = new Array();
        for (let i = 0; i < latlongArray.length; i++) {
            p.push(GoogleConversions.TranslateLocationObject(latlongArray[i]));
        }
        return p;
    }
    /**
     * Maps a MapTypeId object to a Google maptype string.
     *
     * \@memberof GoogleConversions
     * @param {?} mapTypeId - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateMapTypeId(mapTypeId) {
        switch (mapTypeId) {
            case MapTypeId.road: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.roadmap];
            case MapTypeId.grayscale: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            case MapTypeId.hybrid: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.hybrid];
            case MapTypeId.ordnanceSurvey: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.terrain];
            default: return GoogleMapTypes.MapTypeId[GoogleMapTypes.MapTypeId.satellite];
        }
    }
    /**
     * Maps an IMarkerOptions object to a GoogleMapTypes.MarkerOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Promise that when resolved contains the mapped object.
     *
     */
    static TranslateMarkerOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._markerOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'position') {
                /** @type {?} */
                const latlng = GoogleConversions.TranslateLocationObject(options[k]);
                o.position = latlng;
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a GoogleMapTypes.MapOptions object.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._mapOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
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
    }
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof GoogleConversions
     * @param {?} paths - ILatLong based locations to convert.
     * @return {?} - converted locations.
     *
     */
    static TranslatePaths(paths) {
        /** @type {?} */
        const p = new Array();
        if (paths == null || !Array.isArray(paths) || paths.length === 0) {
            p.push(new Array());
        }
        else if (Array.isArray(paths[0])) {
            /** @type {?} */
            const p1 = /** @type {?} */ (paths);
            for (let i = 0; i < p1.length; i++) {
                p.push(GoogleConversions.TranslateLocationObjectArray(p1[i]));
            }
        }
        else {
            // parameter is a simple array....
            p.push(GoogleConversions.TranslateLocationObjectArray(/** @type {?} */ (paths)));
        }
        return p;
    }
    /**
     *  Maps an IPolygonOptions object to a GoogleMapTypes.PolygonOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolygonOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._polygonOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
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
                    const p1 = /** @type {?} */ (options.paths);
                    for (let i = 0; i < p1.length; i++) {
                        o.paths[i] = new Array();
                        for (let j = 0; j < p1[i].length; j++) {
                            o.paths[i][j] = { lat: p1[i][j].latitude, lng: p1[i][j].longitude };
                        }
                    }
                }
                else {
                    o.paths = new Array();
                    /** @type {?} */
                    const p1 = /** @type {?} */ (options.paths);
                    for (let i = 0; i < p1.length; i++) {
                        o.paths[i] = { lat: p1[i].latitude, lng: p1[i].longitude };
                    }
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     *  Maps an IPolylineOptions object to a GoogleMapTypes.PolylineOptions.
     *
     * \@memberof GoogleConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolylineOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => GoogleConversions._polylineOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            o[k] = (/** @type {?} */ (options))[k];
        });
        return o;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNvbnZlcnNpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE9BQU8sS0FBSyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBV3JELE1BQU07Ozs7Ozs7OztJQTJKSyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQVk7O1FBQ3RDLE1BQU0sQ0FBQyxHQUF1QztZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQ3pCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7U0FDNUIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsMEJBQTBCLENBQUMsT0FBMkI7O1FBQ2hFLE1BQU0sQ0FBQyxHQUEyQyxFQUFFLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDN0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxtQkFBTSxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFB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QjtJQUN0QixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGFBQWE7SUFDYixlQUFlO0lBQ2YsU0FBUztJQUNULFFBQVE7Q0FDWDs7Ozs7OzhDQU9vRDtJQUNqRCxXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsYUFBYTtJQUNiLFVBQVU7SUFDVixPQUFPO0lBQ1AsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztJQUNULFFBQVE7Q0FDWDs7Ozs7OytDQU9xRDtJQUNsRCxXQUFXO0lBQ1gsV0FBVztJQUNYLFVBQVU7SUFDVixVQUFVO0lBQ1YsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztJQUNULFFBQVE7Q0FDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElJbmZvV2luZG93T3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LW9wdGlvbnMnO1xuaW1wb3J0IHsgSUJveCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWJveCc7XG5pbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5bGluZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5bGluZS1vcHRpb25zJztcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgKiBhcyBHb29nbGVNYXBUeXBlcyBmcm9tICcuL2dvb2dsZS1tYXAtdHlwZXMnO1xuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcC10eXBlLWlkJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cblxuLyoqXG4gKiBUaGlzIGNsYXNzIGNvbnRhaW5zIGhlbHBlcmZ1bmN0aW9ucyB0byBtYXAgdmFyaW91cyBpbnRlcmZhY2VzIHVzZWQgdG8gcmVwcmVzZW50IG9wdGlvbnMgYW5kIHN0cnVjdHVyZXMgaW50byB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgR29vZ2xlIE1hcHMgc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZUNvbnZlcnNpb25zIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnYmFja2dyb3VuZENvbG9yJyxcbiAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICdjbGlja2FibGVJY29ucycsXG4gICAgICAgICdjdXN0b21NYXBTdHlsZUdvb2dsZScsXG4gICAgICAgICdkaXNhYmxlRGVmYXVsdFVJJyxcbiAgICAgICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLFxuICAgICAgICAnZHJhZ2dhYmxlJyxcbiAgICAgICAgJ2RyYWdnYWJsZUN1cnNvcicsXG4gICAgICAgICdkcmFnZ2luZ0N1cnNvcicsXG4gICAgICAgICdkaXNhYmxlWm9vbWluZycsXG4gICAgICAgICdmdWxsc2NyZWVuQ29udHJvbCcsXG4gICAgICAgICdmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMnLFxuICAgICAgICAnZ2VzdHVyZUhhbmRsaW5nJyxcbiAgICAgICAgJ2hlYWRpbmcnLFxuICAgICAgICAna2V5Ym9hcmRTaG9ydGN1dHMnLFxuICAgICAgICAnbWFwVHlwZUNvbnRyb2wnLFxuICAgICAgICAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJyxcbiAgICAgICAgJ21hcFR5cGVJZCcsXG4gICAgICAgICdtYXhab29tJyxcbiAgICAgICAgJ21pblpvb20nLFxuICAgICAgICAnbm9DbGVhcicsXG4gICAgICAgICdwYW5Db250cm9sJyxcbiAgICAgICAgJ3BhbkNvbnRyb2xPcHRpb25zJyxcbiAgICAgICAgJ3JvdGF0ZUNvbnRyb2wnLFxuICAgICAgICAncm90YXRlQ29udHJvbE9wdGlvbnMnLFxuICAgICAgICAnc2NhbGVDb250cm9sJyxcbiAgICAgICAgJ3NjYWxlQ29udHJvbE9wdGlvbnMnLFxuICAgICAgICAnc2Nyb2xsd2hlZWwnLFxuICAgICAgICAnc2hvd01hcFR5cGVTZWxlY3RvcicsXG4gICAgICAgICdzdHJlZXRWaWV3JyxcbiAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sJyxcbiAgICAgICAgJ3N0cmVldFZpZXdDb250cm9sT3B0aW9ucycsXG4gICAgICAgICdzdHlsZXMnLFxuICAgICAgICAndGlsdCcsXG4gICAgICAgICd6b29tJyxcbiAgICAgICAgJ3pvb21Db250cm9sJyxcbiAgICAgICAgJ3pvb21Db250cm9sT3B0aW9ucydcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogSW5mb1dpbmRvdyBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5mb1dpbmRvd09wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2FjdGlvbnMnLFxuICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAnaHRtbENvbnRlbnQnLFxuICAgICAgICAnaWQnLFxuICAgICAgICAncG9zaXRpb24nLFxuICAgICAgICAncGl4ZWxPZmZzZXQnLFxuICAgICAgICAnc2hvd0Nsb3NlQnV0dG9uJyxcbiAgICAgICAgJ3Nob3dQb2ludGVyJyxcbiAgICAgICAgJ3B1c2hwaW4nLFxuICAgICAgICAndGl0bGUnLFxuICAgICAgICAndGl0bGVDbGlja0hhbmRsZXInLFxuICAgICAgICAndHlwZU5hbWUnLFxuICAgICAgICAndmlzaWJsZScsXG4gICAgICAgICd3aWR0aCcsXG4gICAgICAgICdoZWlnaHQnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIE1hcmtlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gR29vZ2xlIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfbWFya2VyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnYW5jaG9yJyxcbiAgICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgJ3RleHQnLFxuICAgICAgICAnbGFiZWwnLFxuICAgICAgICAnZHJhZ2dhYmxlJyxcbiAgICAgICAgJ2ljb24nLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgJ2ljb25JbmZvJyxcbiAgICAgICAgJ21ldGFkYXRhJyxcbiAgICAgICAgJ3Zpc2libGUnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIENsdXN0ZXIgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEdvb2dsZSBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NsdXN0ZXJPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgICAgICdjYWxsYmFjaycsXG4gICAgICAgICdjbHVzdGVyZWRQaW5DYWxsYmFjaycsXG4gICAgICAgICdjbHVzdGVyaW5nRW5hYmxlZCcsXG4gICAgICAgICdncmlkU2l6ZScsXG4gICAgICAgICdsYXllck9mZnNldCcsXG4gICAgICAgICdwbGFjZW1lbnRNb2RlJyxcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnekluZGV4J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBQb2x5Z29uIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnY2xpY2thYmxlJyxcbiAgICAgICAgJ2RyYWdnYWJsZScsXG4gICAgICAgICdlZGl0YWJsZScsXG4gICAgICAgICdmaWxsQ29sb3InLFxuICAgICAgICAnZmlsbE9wYWNpdHknLFxuICAgICAgICAnZ2VvZGVzaWMnLFxuICAgICAgICAncGF0aHMnLFxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxuICAgICAgICAndmlzaWJsZScsXG4gICAgICAgICd6SW5kZXgnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIFBvbHlsaW5lIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBHb29nbGUgTWFwIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2NsaWNrYWJsZScsXG4gICAgICAgICdkcmFnZ2FibGUnLFxuICAgICAgICAnZWRpdGFibGUnLFxuICAgICAgICAnZ2VvZGVzaWMnLFxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxuICAgICAgICAndmlzaWJsZScsXG4gICAgICAgICd6SW5kZXgnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUJveCBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBib3VuZHMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQm91bmRzKGJvdW5kczogSUJveCk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0JvdW5kc0xpdGVyYWwge1xuICAgICAgICBjb25zdCBiOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdCb3VuZHNMaXRlcmFsID0ge1xuICAgICAgICAgICAgZWFzdDogYm91bmRzLm1heExvbmdpdHVkZSxcbiAgICAgICAgICAgIG5vcnRoOiBib3VuZHMubWF4TGF0aXR1ZGUsXG4gICAgICAgICAgICBzb3V0aDogYm91bmRzLm1pbkxhdGl0dWRlLFxuICAgICAgICAgICAgd2VzdDogYm91bmRzLm1pbkxvbmdpdHVkZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJSW5mb1dpbmRvd09wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlSW5mb1dpbmRvd09wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuSW5mb1dpbmRvd09wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5JbmZvV2luZG93T3B0aW9ucyB8IGFueSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSAnaHRtbENvbnRlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uY29udGVudCA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKG8uY29udGVudCA9PSBudWxsIHx8IG8uY29udGVudCA9PT0gJycpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpdGxlICE9PSAnJyAmJiBvcHRpb25zLmRlc2NyaXB0aW9uICE9PSAnJykge1xuICAgICAgICAgICAgICAgIG8uY29udGVudCA9IGAke29wdGlvbnMudGl0bGV9OiAke29wdGlvbnMuZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuZGVzY3JpcHRpb24gIT09ICcnKSB7IG8uY29udGVudCA9IG9wdGlvbnMuZGVzY3JpcHRpb247IH1cbiAgICAgICAgICAgIGVsc2UgeyBvLmNvbnRlbnQgPSBvcHRpb25zLnRpdGxlOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJTGF0TG9uZyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRsb25nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxvY2F0aW9uKGxhdGxvbmc6IElMYXRMb25nKTogR29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbCB7XG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgPSB7IGxhdDogbGF0bG9uZy5sYXRpdHVkZSwgbG5nOiBsYXRsb25nLmxvbmdpdHVkZSB9O1xuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWwgb2JqZWN0IHRvIGEgSUxhdExvbmcgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMYXRMbmcobGF0bG5nOiBHb29nbGVNYXBUeXBlcy5MYXRMbmdMaXRlcmFsKTogSUxhdExvbmcge1xuICAgICAgICBjb25zdCBsOiBJTGF0TG9uZyA9IHsgbGF0aXR1ZGU6IGxhdGxuZy5sYXQsIGxvbmdpdHVkZTogbGF0bG5nLmxuZyB9O1xuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLkxhdExuZyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF0bG9uZyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbk9iamVjdChsYXRsb25nOiBJTGF0TG9uZyk6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyB7XG4gICAgICAgIGNvbnN0IGw6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0bG9uZy5sYXRpdHVkZSwgbGF0bG9uZy5sb25naXR1ZGUpO1xuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIEdvb2dsZU1hcFR5cGVzLkxhdExuZyBvYmplY3QgdG8gYSBJTGF0TG9uZyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGF0bG5nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUxhdExuZ09iamVjdChsYXRsbmc6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyk6IElMYXRMb25nIHtcbiAgICAgICAgY29uc3QgbDogSUxhdExvbmcgPSB7IGxhdGl0dWRlOiBsYXRsbmcubGF0KCksIGxvbmdpdHVkZTogbGF0bG5nLmxuZygpIH07XG4gICAgICAgIHJldHVybiBsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUxhdExvbmcgYXJyYXkgdG8gYSBhcnJheSBvZiBHb29nbGVNYXBUeXBlcy5MYXRMbmcgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhdGxvbmdBcnJheSAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbk9iamVjdEFycmF5KGxhdGxvbmdBcnJheTogQXJyYXk8SUxhdExvbmc+KTogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPiB7XG4gICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi4uXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhdGxvbmdBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcC5wdXNoKEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KGxhdGxvbmdBcnJheVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYSBNYXBUeXBlSWQgb2JqZWN0IHRvIGEgR29vZ2xlIG1hcHR5cGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcFR5cGVJZCAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVNYXBUeXBlSWQobWFwVHlwZUlkOiBNYXBUeXBlSWQpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKG1hcFR5cGVJZCkge1xuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQucm9hZDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQucm9hZG1hcF07XG4gICAgICAgICAgICBjYXNlIE1hcFR5cGVJZC5ncmF5c2NhbGU6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnRlcnJhaW5dO1xuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQuaHlicmlkOiByZXR1cm4gR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkW0dvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZC5oeWJyaWRdO1xuICAgICAgICAgICAgY2FzZSBNYXBUeXBlSWQub3JkbmFuY2VTdXJ2ZXk6IHJldHVybiBHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWRbR29vZ2xlTWFwVHlwZXMuTWFwVHlwZUlkLnRlcnJhaW5dO1xuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIEdvb2dsZU1hcFR5cGVzLk1hcFR5cGVJZFtHb29nbGVNYXBUeXBlcy5NYXBUeXBlSWQuc2F0ZWxsaXRlXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSU1hcmtlck9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuTWFya2VyT3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBQcm9taXNlIHRoYXQgd2hlbiByZXNvbHZlZCBjb250YWlucyB0aGUgbWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTWFya2VyT3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IEdvb2dsZU1hcFR5cGVzLk1hcmtlck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5NYXJrZXJPcHRpb25zIHwgYW55ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gR29vZ2xlQ29udmVyc2lvbnMuX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3Bvc2l0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXRsbmcgPSBHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdChvcHRpb25zW2tdKTtcbiAgICAgICAgICAgICAgICAgICAgby5wb3NpdGlvbiA9IGxhdGxuZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJTWFwT3B0aW9ucyBvYmplY3QgdG8gYSBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5NYXBPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogR29vZ2xlTWFwVHlwZXMuTWFwT3B0aW9ucyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9tYXBPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uY2VudGVyID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZU1hcFR5cGVJZChvcHRpb25zLm1hcFR5cGVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdkaXNhYmxlWm9vbWluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgby5nZXN0dXJlSGFuZGxpbmcgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIG8uem9vbUNvbnRyb2wgPSAgZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzaG93TWFwVHlwZVNlbGVjdG9yJykge1xuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVDb250cm9sID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdjdXN0b21NYXBTdHlsZUdvb2dsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgby5zdHlsZXMgPSA8R29vZ2xlTWFwVHlwZXMuTWFwVHlwZVN0eWxlW10+PGFueT4gb3B0aW9ucy5jdXN0b21NYXBTdHlsZUdvb2dsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyBhbiBhcnJheSBvZiBsb2NhdGlvbnMgb3IgYW4gYXJyYXkgb3IgYXJyYXlzIG9mIGxvY2F0aW9uIHRvIGFuZCBhcnJheSBvZiBhcnJheXMgb2YgQmluZyBNYXAgTG9jYXRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHMgLSBJTGF0TG9uZyBiYXNlZCBsb2NhdGlvbnMgdG8gY29udmVydC5cbiAgICAgKiBAcmV0dXJucyAtIGNvbnZlcnRlZCBsb2NhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBhdGhzKHBhdGhzOiBBcnJheTxJTGF0TG9uZz4gfCBBcnJheTxBcnJheTxJTGF0TG9uZz4+KTogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4ge1xuICAgICAgICBjb25zdCBwOiBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PiA9IG5ldyBBcnJheTxBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+PigpO1xuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCB8fCAhQXJyYXkuaXNBcnJheShwYXRocykgfHwgcGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBwLnB1c2gobmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcbiAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi4uXG4gICAgICAgICAgICBjb25zdCBwMSA9IDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHAucHVzaChHb29nbGVDb252ZXJzaW9ucy5UcmFuc2xhdGVMb2NhdGlvbk9iamVjdEFycmF5KHAxW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYSBzaW1wbGUgYXJyYXkuLi4uXG4gICAgICAgICAgICBwLnB1c2goR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb25PYmplY3RBcnJheSg8QXJyYXk8SUxhdExvbmc+PnBhdGhzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1hcHMgYW4gSVBvbHlnb25PcHRpb25zIG9iamVjdCB0byBhIEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogR29vZ2xlTWFwVHlwZXMuUG9seWdvbk9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5Z29uT3B0aW9ucyB8IGFueSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgICAgLmZpbHRlcihrID0+IEdvb2dsZUNvbnZlcnNpb25zLl9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSAncGF0aHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLnBhdGhzKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aHNbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnBhdGhzID0gbmV3IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZ0xpdGVyYWw+PigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGZvciBsb29wIGZvciBwZXJmb3JtYW5jZSBpbiBjYXNlIHdlIGRlYWwgd2l0aCBsYXJnZSBudW1iZXJzIG9mIHBvaW50cyBhbmQgcGF0aHMuLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcDEgPSA8QXJyYXk8QXJyYXk8SUxhdExvbmc+Pj5vcHRpb25zLnBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV0gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbD4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHAxW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV1bal0gPSB7bGF0OiBwMVtpXVtqXS5sYXRpdHVkZSwgbG5nOiBwMVtpXVtqXS5sb25naXR1ZGV9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHMgPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nTGl0ZXJhbD4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2UgaW4gY2FzZSB3ZSBkZWFsIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMgYW5kIHBhdGhzLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PElMYXRMb25nPj5vcHRpb25zLnBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8ucGF0aHNbaV0gPSB7bGF0OiBwMVtpXS5sYXRpdHVkZSwgbG5nOiBwMVtpXS5sb25naXR1ZGV9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNYXBzIGFuIElQb2x5bGluZU9wdGlvbnMgb2JqZWN0IHRvIGEgR29vZ2xlTWFwVHlwZXMuUG9seWxpbmVPcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnM6IElQb2x5bGluZU9wdGlvbnMpOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBHb29nbGVNYXBUeXBlcy5Qb2x5bGluZU9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBHb29nbGVDb252ZXJzaW9ucy5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cbn1cbiJdfQ==