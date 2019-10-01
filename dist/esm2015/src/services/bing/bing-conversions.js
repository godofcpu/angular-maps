/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapTypeId } from '../../models/map-type-id';
import { ClusterPlacementMode } from '../../models/cluster-placement-mode';
/**
 * This class contains helperfunctions to map various interfaces used to represent options and structures into the
 * corresponding Bing Maps V8 specific implementations.
 *
 * @export
 */
export class BingConversions {
    /**
     * Maps an IInfoWindowAction to a Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} action - Object to be mapped.
     * @return {?} - Navtive mapped object.
     *
     */
    static TranslateAction(action) {
        /** @type {?} */
        const a = {
            eventHandler: action.eventHandler,
            label: action.label
        };
        return a;
    }
    /**
     * Maps an Array of IInfoWindowAction to an Array of Microsoft.Maps.IInfoboxActions
     *
     * \@memberof BingConversions
     * @param {?} actions - Array of objects to be mapped.
     * @return {?} - Array of mapped objects.
     *
     */
    static TranslateActions(actions) {
        /** @type {?} */
        const a = new Array();
        actions.forEach(x => a.push(BingConversions.TranslateAction(x)));
        return a;
    }
    /**
     * Maps an IBox object to a Microsoft.Maps.LocationRect object.
     *
     * \@memberof BingConversions
     * @param {?} box - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateBounds(box) {
        /** @type {?} */
        const r = Microsoft.Maps.LocationRect.fromEdges(box.maxLatitude, box.minLongitude, box.minLatitude, box.maxLongitude);
        return r;
    }
    /**
     * Maps an IClusterOptions object to a Microsoft.Maps.IClusterLayerOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateClusterOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._clusterOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'layerOffset') {
                o.layerOffset = BingConversions.TranslatePoint(options.layerOffset);
            }
            if (k === 'placementMode') {
                if (options.placementMode === ClusterPlacementMode.FirstPin) {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.FirstLocation;
                }
                else {
                    o.placementMode = Microsoft.Maps.ClusterPlacementType.MeanAverage;
                }
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IInfoWindowOptions object to a Microsoft.Maps.IInfoboxOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateInfoBoxOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._infoWindowOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'pixelOffset') {
                o.offset = BingConversions.TranslatePoint(options.pixelOffset);
            }
            else if (k === 'position') {
                o.location = BingConversions.TranslateLocation(options.position);
            }
            else if (k === 'actions') {
                o.actions = BingConversions.TranslateActions(options.actions);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapLoadOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLoadOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => {
            return BingConversions._mapOptionsAttributes.indexOf(k) !== -1 || BingConversions._viewOptionsAttributes.indexOf(k) !== -1;
        })
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                if (options.mapTypeId === MapTypeId.hybrid) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.visible;
                }
                else if (options.mapTypeId === MapTypeId.aerial) {
                    o.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
                    o.labelOverlay = Microsoft.Maps.LabelOverlay.hidden;
                }
                else {
                    o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
                }
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an ILatLong object to a Microsoft.Maps.Location object.
     *
     * \@memberof BingConversions
     * @param {?} latlong - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateLocation(latlong) {
        /** @type {?} */
        const l = new Microsoft.Maps.Location(latlong.latitude, latlong.longitude);
        return l;
    }
    /**
     * Maps an IMarkerOptions object to a Microsoft.Maps.IPushpinOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - The mapped object.
     *
     */
    static TranslateMarkerOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._markerOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'anchor') {
                o.anchor = BingConversions.TranslatePoint(options.anchor);
            }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IMapOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._mapOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Translates an array of locations or an array or arrays of location to and array of arrays of Bing Map Locations
     *
     * \@memberof BingConversions
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
                /** @type {?} */
                const _p = new Array();
                for (let j = 0; j < p1[i].length; j++) {
                    _p.push(new Microsoft.Maps.Location(p1[i][j].latitude, p1[i][j].longitude));
                }
                p.push(_p);
            }
        }
        else {
            /** @type {?} */
            const y = new Array();
            /** @type {?} */
            const p1 = /** @type {?} */ (paths);
            for (let i = 0; i < p1.length; i++) {
                y.push(new Microsoft.Maps.Location(p1[i].latitude, p1[i].longitude));
            }
            p.push(y);
        }
        return p;
    }
    /**
     *  Maps an IPoint object to a Microsoft.Maps.Point object.
     *
     * \@memberof BingConversions
     * @param {?} point - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePoint(point) {
        /** @type {?} */
        const p = new Microsoft.Maps.Point(point.x, point.y);
        return p;
    }
    /**
     *  Maps an IPolygonOptions object to a Microsoft.Maps.IPolygonOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolygonOptions(options) {
        /** @type {?} */
        const o = {};
        /** @type {?} */
        const f = (s, a) => {
            /** @type {?} */
            const m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                /** @type {?} */
                const x = a > 1 ? a : Math.floor(a * 255);
                /** @type {?} */
                const z = s.substr(1);
                /** @type {?} */
                const r = parseInt(z.substr(0, 2), 16);
                /** @type {?} */
                const g = parseInt(z.substr(2, 2), 16);
                /** @type {?} */
                const b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polygonOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') { }
            else if (k === 'fillColor') {
                if (options.fillOpacity) {
                    o.fillColor = f(options.fillColor, options.fillOpacity);
                }
                else {
                    o.fillColor = options.fillColor;
                }
            }
            else if (k === 'fillOpacity') { }
            else {
                (/** @type {?} */ (o))[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     *  Maps an IPolylineOptions object to a Microsoft.Maps.IPolylineOptions.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslatePolylineOptions(options) {
        /** @type {?} */
        const o = {};
        /** @type {?} */
        const f = (s, a) => {
            /** @type {?} */
            const m = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(s);
            if (m && m.length > 3) {
                a = a > 1 ? (a / 100) : a;
                return 'rgba(' + [m[1], m[2], m[3], a].join(',') + ')';
            }
            else if (s[0] === '#') {
                /** @type {?} */
                const x = a > 1 ? a : Math.floor(a * 255);
                /** @type {?} */
                const z = s.substr(1);
                /** @type {?} */
                const r = parseInt(z.substr(0, 2), 16);
                /** @type {?} */
                const g = parseInt(z.substr(2, 2), 16);
                /** @type {?} */
                const b = parseInt(z.substr(4, 2), 16);
                return 'rgba(' + [r, g, b, a].join(',') + ')';
            }
            else {
                return s;
            }
        };
        Object.keys(options)
            .filter(k => BingConversions._polylineOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'strokeWeight') {
                o.strokeThickness = options.strokeWeight;
            }
            else if (k === 'strokeColor') {
                if (options.strokeOpacity) {
                    o.strokeColor = f(options.strokeColor, options.strokeOpacity);
                }
                else {
                    o.strokeColor = options.strokeColor;
                }
            }
            else if (k === 'strokeOpacity') {
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
    /**
     * Maps an IMapOptions object to a Microsoft.Maps.IViewOptions object.
     *
     * \@memberof BingConversions
     * @param {?} options - Object to be mapped.
     * @return {?} - Mapped object.
     *
     */
    static TranslateViewOptions(options) {
        /** @type {?} */
        const o = {};
        Object.keys(options)
            .filter(k => BingConversions._viewOptionsAttributes.indexOf(k) !== -1)
            .forEach((k) => {
            if (k === 'center') {
                o.center = BingConversions.TranslateLocation(options.center);
            }
            else if (k === 'bounds') {
                o.bounds = BingConversions.TranslateBounds(options.bounds);
            }
            else if (k === 'centerOffset') {
                o.centerOffset = BingConversions.TranslatePoint(options.centerOffset);
            }
            else if (k === 'mapTypeId') {
                o.mapTypeId = Microsoft.Maps.MapTypeId[(/** @type {?} */ (MapTypeId))[options.mapTypeId]];
            }
            else {
                o[k] = (/** @type {?} */ (options))[k];
            }
        });
        return o;
    }
}
/**
 * Map option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._mapOptionsAttributes = [
    'backgroundColor',
    'credentials',
    'customizeOverlays',
    'customMapStyle',
    'disableBirdseye',
    'disableKeyboardInput',
    'disableMouseInput',
    'disablePanning',
    'disableTouchInput',
    'disableUserInput',
    'disableZooming',
    'disableStreetside',
    'enableClickableLogo',
    'enableSearchLogo',
    'fixedMapPosition',
    'height',
    'inertiaIntensity',
    'navigationBarMode',
    'showBreadcrumb',
    'showCopyright',
    'showDashboard',
    'showMapTypeSelector',
    'showScalebar',
    'theme',
    'tileBuffer',
    'useInertia',
    'width',
    'center',
    'zoom',
    'mapTypeId',
    'liteMode'
];
/**
 * View option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._viewOptionsAttributes = [
    'animate',
    'bounds',
    'center',
    'centerOffset',
    'heading',
    'labelOverlay',
    'mapTypeId',
    'padding',
    'zoom'
];
/**
 * InfoWindow option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._infoWindowOptionsAttributes = [
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
 * Marker option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._markerOptionsAttributes = [
    'anchor',
    'draggable',
    'height',
    'htmlContent',
    'icon',
    'infobox',
    'state',
    'title',
    'textOffset',
    'typeName',
    'visible',
    'width',
    'zIndex'
];
/**
 * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
 *
 * \@memberof BingConversions
 */
BingConversions._polygonOptionsAttributes = [
    'cursor',
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
 *
 * \@memberof BingConversions
 */
BingConversions._polylineOptionsAttributes = [
    'cursor',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'visible'
];
/**
 * Cluster option attributes that are supported for conversion to Bing Map properties
 *
 * \@memberof BingConversions
 */
BingConversions._clusterOptionsAttributes = [
    'callback',
    'clusteredPinCallback',
    'clusteringEnabled',
    'gridSize',
    'layerOffset',
    'placementMode',
    'visible',
    'zIndex'
];
if (false) {
    /**
     * Map option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._mapOptionsAttributes;
    /**
     * View option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._viewOptionsAttributes;
    /**
     * InfoWindow option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._infoWindowOptionsAttributes;
    /**
     * Marker option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._markerOptionsAttributes;
    /**
     * Polygon option attributes that are supported for conversion to Bing Map Polygon properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polygonOptionsAttributes;
    /**
     * Polyline option attributes that are supported for conversion to Bing Map Polyline properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._polylineOptionsAttributes;
    /**
     * Cluster option attributes that are supported for conversion to Bing Map properties
     *
     * \@memberof BingConversions
     * @type {?}
     */
    BingConversions._clusterOptionsAttributes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jb252ZXJzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVdBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7OztBQVMzRSxNQUFNOzs7Ozs7Ozs7SUFrS0ssTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUF5Qjs7UUFDbkQsTUFBTSxDQUFDLEdBQW1DO1lBQ3RDLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDdEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBaUM7O1FBQzVELE1BQU0sQ0FBQyxHQUEwQyxJQUFJLEtBQUssRUFBa0MsQ0FBQztRQUM3RixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBV04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFTOztRQUNuQyxNQUFNLENBQUMsR0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hILE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFXTixNQUFNLENBQUMsdUJBQXVCLENBQUMsT0FBd0I7O1FB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QUFRO0lBQ1IsYUFBYTtJQUNiLE1BQU07SUFDTixTQUFTO0lBQ1QsT0FBTztJQUNQLE9BQU87SUFDUCxZQUFZO0lBQ1osVUFBVTtJQUNWLFNBQVM7SUFDVCxPQUFPO0lBQ1AsUUFBUTtDQUNYOzs7Ozs7NENBT29EO0lBQ2pELFFBQVE7SUFDUixXQUFXO0lBQ1gsYUFBYTtJQUNiLGFBQWE7SUFDYixlQUFlO0lBQ2YsY0FBYztJQUNkLFNBQVM7Q0FDWjs7Ozs7OzZDQU9xRDtJQUNsRCxRQUFRO0lBQ1IsYUFBYTtJQUNiLGVBQWU7SUFDZixjQUFjO0lBQ2QsU0FBUztDQUNaOzs7Ozs7NENBT29EO0lBQ2pELFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixhQUFhO0lBQ2IsZUFBZTtJQUNmLFNBQVM7SUFDVCxRQUFRO0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWFwT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaW1hcC1vcHRpb25zJztcbmltcG9ydCB7IElCb3ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lib3gnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9paW5mby13aW5kb3ctb3B0aW9ucyc7XG5pbXBvcnQgeyBJSW5mb1dpbmRvd0FjdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWluZm8td2luZG93LWFjdGlvbic7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgTWFwVHlwZUlkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21hcC10eXBlLWlkJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uLy4uL21vZGVscy9tYXJrZXInO1xuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2x1c3Rlci1wbGFjZW1lbnQtbW9kZSc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4vYmluZy1tYXAuc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBjb250YWlucyBoZWxwZXJmdW5jdGlvbnMgdG8gbWFwIHZhcmlvdXMgaW50ZXJmYWNlcyB1c2VkIHRvIHJlcHJlc2VudCBvcHRpb25zIGFuZCBzdHJ1Y3R1cmVzIGludG8gdGhlXG4gKiBjb3JyZXNwb25kaW5nIEJpbmcgTWFwcyBWOCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgQmluZ0NvbnZlcnNpb25zIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxuICAgICAgICAnY3JlZGVudGlhbHMnLFxuICAgICAgICAnY3VzdG9taXplT3ZlcmxheXMnLFxuICAgICAgICAnY3VzdG9tTWFwU3R5bGUnLFxuICAgICAgICAnZGlzYWJsZUJpcmRzZXllJyxcbiAgICAgICAgJ2Rpc2FibGVLZXlib2FyZElucHV0JyxcbiAgICAgICAgJ2Rpc2FibGVNb3VzZUlucHV0JyxcbiAgICAgICAgJ2Rpc2FibGVQYW5uaW5nJyxcbiAgICAgICAgJ2Rpc2FibGVUb3VjaElucHV0JyxcbiAgICAgICAgJ2Rpc2FibGVVc2VySW5wdXQnLFxuICAgICAgICAnZGlzYWJsZVpvb21pbmcnLFxuICAgICAgICAnZGlzYWJsZVN0cmVldHNpZGUnLFxuICAgICAgICAnZW5hYmxlQ2xpY2thYmxlTG9nbycsXG4gICAgICAgICdlbmFibGVTZWFyY2hMb2dvJyxcbiAgICAgICAgJ2ZpeGVkTWFwUG9zaXRpb24nLFxuICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgJ2luZXJ0aWFJbnRlbnNpdHknLFxuICAgICAgICAnbmF2aWdhdGlvbkJhck1vZGUnLFxuICAgICAgICAnc2hvd0JyZWFkY3J1bWInLFxuICAgICAgICAnc2hvd0NvcHlyaWdodCcsXG4gICAgICAgICdzaG93RGFzaGJvYXJkJyxcbiAgICAgICAgJ3Nob3dNYXBUeXBlU2VsZWN0b3InLFxuICAgICAgICAnc2hvd1NjYWxlYmFyJyxcbiAgICAgICAgJ3RoZW1lJyxcbiAgICAgICAgJ3RpbGVCdWZmZXInLFxuICAgICAgICAndXNlSW5lcnRpYScsXG4gICAgICAgICd3aWR0aCcsXG4gICAgICAgICdjZW50ZXInLFxuICAgICAgICAnem9vbScsXG4gICAgICAgICdtYXBUeXBlSWQnLFxuICAgICAgICAnbGl0ZU1vZGUnXG4gICAgXTtcblxuICAgIC8qKlxuICAgICAqIFZpZXcgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEJpbmcgTWFwIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfdmlld09wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2FuaW1hdGUnLFxuICAgICAgICAnYm91bmRzJyxcbiAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICdjZW50ZXJPZmZzZXQnLFxuICAgICAgICAnaGVhZGluZycsXG4gICAgICAgICdsYWJlbE92ZXJsYXknLFxuICAgICAgICAnbWFwVHlwZUlkJyxcbiAgICAgICAgJ3BhZGRpbmcnLFxuICAgICAgICAnem9vbSdcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogSW5mb1dpbmRvdyBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnYWN0aW9ucycsXG4gICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICdodG1sQ29udGVudCcsXG4gICAgICAgICdpZCcsXG4gICAgICAgICdwb3NpdGlvbicsXG4gICAgICAgICdwaXhlbE9mZnNldCcsXG4gICAgICAgICdzaG93Q2xvc2VCdXR0b24nLFxuICAgICAgICAnc2hvd1BvaW50ZXInLFxuICAgICAgICAncHVzaHBpbicsXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICd0aXRsZUNsaWNrSGFuZGxlcicsXG4gICAgICAgICd0eXBlTmFtZScsXG4gICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgJ3dpZHRoJyxcbiAgICAgICAgJ2hlaWdodCdcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogTWFya2VyIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBwcm9wZXJ0aWVzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2FuY2hvcicsXG4gICAgICAgICdkcmFnZ2FibGUnLFxuICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgJ2h0bWxDb250ZW50JyxcbiAgICAgICAgJ2ljb24nLFxuICAgICAgICAnaW5mb2JveCcsXG4gICAgICAgICdzdGF0ZScsXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICd0ZXh0T2Zmc2V0JyxcbiAgICAgICAgJ3R5cGVOYW1lJyxcbiAgICAgICAgJ3Zpc2libGUnLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICAnekluZGV4J1xuICAgIF07XG5cbiAgICAvKipcbiAgICAgKiBQb2x5Z29uIG9wdGlvbiBhdHRyaWJ1dGVzIHRoYXQgYXJlIHN1cHBvcnRlZCBmb3IgY29udmVyc2lvbiB0byBCaW5nIE1hcCBQb2x5Z29uIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2N1cnNvcicsXG4gICAgICAgICdmaWxsQ29sb3InLFxuICAgICAgICAnZmlsbE9wYWNpdHknLFxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxuICAgICAgICAndmlzaWJsZSdcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogUG9seWxpbmUgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBhcmUgc3VwcG9ydGVkIGZvciBjb252ZXJzaW9uIHRvIEJpbmcgTWFwIFBvbHlsaW5lIHByb3BlcnRpZXNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfcG9seWxpbmVPcHRpb25zQXR0cmlidXRlczogc3RyaW5nW10gPSBbXG4gICAgICAgICdjdXJzb3InLFxuICAgICAgICAnc3Ryb2tlQ29sb3InLFxuICAgICAgICAnc3Ryb2tlT3BhY2l0eScsXG4gICAgICAgICdzdHJva2VXZWlnaHQnLFxuICAgICAgICAndmlzaWJsZSdcbiAgICBdO1xuXG4gICAgLyoqXG4gICAgICogQ2x1c3RlciBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGFyZSBzdXBwb3J0ZWQgZm9yIGNvbnZlcnNpb24gdG8gQmluZyBNYXAgcHJvcGVydGllc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9jbHVzdGVyT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnY2FsbGJhY2snLFxuICAgICAgICAnY2x1c3RlcmVkUGluQ2FsbGJhY2snLFxuICAgICAgICAnY2x1c3RlcmluZ0VuYWJsZWQnLFxuICAgICAgICAnZ3JpZFNpemUnLFxuICAgICAgICAnbGF5ZXJPZmZzZXQnLFxuICAgICAgICAncGxhY2VtZW50TW9kZScsXG4gICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgJ3pJbmRleCdcbiAgICBdO1xuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElJbmZvV2luZG93QWN0aW9uIHRvIGEgTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWN0aW9uIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE5hdnRpdmUgbWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUFjdGlvbihhY3Rpb246IElJbmZvV2luZG93QWN0aW9uKTogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zIHtcbiAgICAgICAgY29uc3QgYTogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zID0ge1xuICAgICAgICAgICAgZXZlbnRIYW5kbGVyOiBhY3Rpb24uZXZlbnRIYW5kbGVyLFxuICAgICAgICAgICAgbGFiZWw6IGFjdGlvbi5sYWJlbFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIEFycmF5IG9mIElJbmZvV2luZG93QWN0aW9uIHRvIGFuIEFycmF5IG9mIE1pY3Jvc29mdC5NYXBzLklJbmZvYm94QWN0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIGFjdGlvbnMgLSBBcnJheSBvZiBvYmplY3RzIHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIG1hcHBlZCBvYmplY3RzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQWN0aW9ucyhhY3Rpb25zOiBBcnJheTxJSW5mb1dpbmRvd0FjdGlvbj4pOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5JSW5mb2JveEFjdGlvbnM+IHtcbiAgICAgICAgY29uc3QgYTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hBY3Rpb25zPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5JSW5mb2JveEFjdGlvbnM+KCk7XG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaCh4ID0+IGEucHVzaChCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQWN0aW9uKHgpKSk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUJveCBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGJveCAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlQm91bmRzKGJveDogSUJveCk6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uUmVjdCB7XG4gICAgICAgIGNvbnN0IHI6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uUmVjdCA9XG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvblJlY3QuZnJvbUVkZ2VzKGJveC5tYXhMYXRpdHVkZSwgYm94Lm1pbkxvbmdpdHVkZSwgYm94Lm1pbkxhdGl0dWRlLCBib3gubWF4TG9uZ2l0dWRlKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJQ2x1c3Rlck9wdGlvbnMgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZUNsdXN0ZXJPcHRpb25zKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IE1pY3Jvc29mdC5NYXBzLklDbHVzdGVyTGF5ZXJPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX2NsdXN0ZXJPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdsYXllck9mZnNldCcpIHtcbiAgICAgICAgICAgICAgICAgICAgby5sYXllck9mZnNldCA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2ludChvcHRpb25zLmxheWVyT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdwbGFjZW1lbnRNb2RlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wbGFjZW1lbnRNb2RlID09PSBDbHVzdGVyUGxhY2VtZW50TW9kZS5GaXJzdFBpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5wbGFjZW1lbnRNb2RlID0gTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclBsYWNlbWVudFR5cGUuRmlyc3RMb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ucGxhY2VtZW50TW9kZSA9IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQbGFjZW1lbnRUeXBlLk1lYW5BdmVyYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgYW4gSUluZm9XaW5kb3dPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklJbmZvYm94T3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlSW5mb0JveE9wdGlvbnMob3B0aW9uczogSUluZm9XaW5kb3dPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUluZm9ib3hPcHRpb25zIHwgYW55ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9pbmZvV2luZG93T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSAncGl4ZWxPZmZzZXQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ub2Zmc2V0ID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvaW50KG9wdGlvbnMucGl4ZWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAncG9zaXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG8ubG9jYXRpb24gPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdhY3Rpb25zJykge1xuICAgICAgICAgICAgICAgICAgICBvLmFjdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQWN0aW9ucyhvcHRpb25zLmFjdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElNYXBPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklNYXBMb2FkT3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlTG9hZE9wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JTWFwTG9hZE9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJpbmdDb252ZXJzaW9ucy5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEgfHwgQmluZ0NvbnZlcnNpb25zLl92aWV3T3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgby5jZW50ZXIgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tYXBUeXBlSWQgPT09IE1hcFR5cGVJZC5oeWJyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkLmFlcmlhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubGFiZWxPdmVybGF5ID0gTWljcm9zb2Z0Lk1hcHMuTGFiZWxPdmVybGF5LnZpc2libGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5tYXBUeXBlSWQgPT09IE1hcFR5cGVJZC5hZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkLmFlcmlhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubGFiZWxPdmVybGF5ID0gTWljcm9zb2Z0Lk1hcHMuTGFiZWxPdmVybGF5LmhpZGRlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8ubWFwVHlwZUlkID0gTWljcm9zb2Z0Lk1hcHMuTWFwVHlwZUlkWyg8YW55Pk1hcFR5cGVJZClbb3B0aW9ucy5tYXBUeXBlSWRdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnYm91bmRzJykge1xuICAgICAgICAgICAgICAgICAgICBvLmJvdW5kcyA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVCb3VuZHMob3B0aW9ucy5ib3VuZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElMYXRMb25nIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYXRsb25nIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVMb2NhdGlvbihsYXRsb25nOiBJTGF0TG9uZyk6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uIHtcbiAgICAgICAgY29uc3QgbDogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24obGF0bG9uZy5sYXRpdHVkZSwgbGF0bG9uZy5sb25naXR1ZGUpO1xuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElNYXJrZXJPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBUaGUgbWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZU1hcmtlck9wdGlvbnMob3B0aW9uczogSU1hcmtlck9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUHVzaHBpbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX21hcmtlck9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2FuY2hvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgby5hbmNob3IgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9pbnQob3B0aW9ucy5hbmNob3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhbiBJTWFwT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JTWFwT3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlT3B0aW9ucyhvcHRpb25zOiBJTWFwT3B0aW9ucyk6IE1pY3Jvc29mdC5NYXBzLklNYXBPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSU1hcE9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX21hcE9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgby5jZW50ZXIgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlTG9jYXRpb24ob3B0aW9ucy5jZW50ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZFsoPGFueT5NYXBUeXBlSWQpW29wdGlvbnMubWFwVHlwZUlkXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvW2tdID0gKDxhbnk+b3B0aW9ucylba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZXMgYW4gYXJyYXkgb2YgbG9jYXRpb25zIG9yIGFuIGFycmF5IG9yIGFycmF5cyBvZiBsb2NhdGlvbiB0byBhbmQgYXJyYXkgb2YgYXJyYXlzIG9mIEJpbmcgTWFwIExvY2F0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIC0gSUxhdExvbmcgYmFzZWQgbG9jYXRpb25zIHRvIGNvbnZlcnQuXG4gICAgICogQHJldHVybnMgLSBjb252ZXJ0ZWQgbG9jYXRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlUGF0aHMocGF0aHM6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4pOiBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+IHtcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IG5ldyBBcnJheTxBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4+KCk7XG4gICAgICAgIGlmIChwYXRocyA9PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHBhdGhzKSB8fCBwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHAucHVzaChuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGF0aHNbMF0pKSB7XG4gICAgICAgICAgICAvLyBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb3IgYXJyYXlzXG4gICAgICAgICAgICAvLyB1cyBmb3IgbG9vcCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3A6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHAxW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHAxW2ldW2pdLmxhdGl0dWRlLCBwMVtpXVtqXS5sb25naXR1ZGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcC5wdXNoKF9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cbiAgICAgICAgICAgIGNvbnN0IHk6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4oKTtcbiAgICAgICAgICAgIGNvbnN0IHAxID0gPEFycmF5PElMYXRMb25nPj5wYXRocztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcDEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB5LnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHAxW2ldLmxhdGl0dWRlLCBwMVtpXS5sb25naXR1ZGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAucHVzaCh5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTWFwcyBhbiBJUG9pbnQgb2JqZWN0IHRvIGEgTWljcm9zb2Z0Lk1hcHMuUG9pbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBvaW50IC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2ludChwb2ludDogSVBvaW50KTogTWljcm9zb2Z0Lk1hcHMuUG9pbnQge1xuICAgICAgICBjb25zdCBwOiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1hcHMgYW4gSVBvbHlnb25PcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklQb2x5Z29uT3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT2JqZWN0IHRvIGJlIG1hcHBlZC5cbiAgICAgKiBAcmV0dXJucyAtIE1hcHBlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NvbnZlcnNpb25zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2xhdGVQb2x5Z29uT3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JUG9seWdvbk9wdGlvbnMgPSB7fTtcbiAgICAgICAgY29uc3QgZjogKHM6IHN0cmluZywgYTogbnVtYmVyKSA9PiBzdHJpbmcgPSAocywgYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbSA9IC9yZ2JhP1xcKChcXGQrKVxccyosXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyooLFxccypcXGQrW1xcLlxcZCtdKikqXFwpL2cuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtICYmIG0ubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIGEgPSBhID4gMSA/IChhIC8gMTAwKSA6IGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbbVsxXSwgbVsyXSwgbVszXSwgYV0uam9pbignLCcpICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc1swXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gYSA+IDEgPyBhIDogTWF0aC5mbG9vcihhICogMjU1KTtcbiAgICAgICAgICAgICAgICBjb25zdCB6OiBzdHJpbmcgPSBzLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICBjb25zdCByOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cigwLCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGc6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDIsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgY29uc3QgYjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIFtyICwgZywgYiwgYV0uam9pbignLCcpICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdzdHJva2VXZWlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlVGhpY2tuZXNzID0gb3B0aW9ucy5zdHJva2VXZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzdHJva2VDb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5zdHJva2VDb2xvciA9IGYob3B0aW9ucy5zdHJva2VDb2xvciwgb3B0aW9ucy5zdHJva2VPcGFjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzdHJva2VPcGFjaXR5Jykge31cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSAnZmlsbENvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5maWxsT3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5maWxsQ29sb3IgPSBmKG9wdGlvbnMuZmlsbENvbG9yLCBvcHRpb25zLmZpbGxPcGFjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uZmlsbENvbG9yID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PT0gJ2ZpbGxPcGFjaXR5Jykge31cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+bylba10gPSAoPGFueT5vcHRpb25zKVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIE1hcHMgYW4gSVBvbHlsaW5lT3B0aW9ucyBvYmplY3QgdG8gYSBNaWNyb3NvZnQuTWFwcy5JUG9seWxpbmVPcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPYmplY3QgdG8gYmUgbWFwcGVkLlxuICAgICAqIEByZXR1cm5zIC0gTWFwcGVkIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ29udmVyc2lvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zbGF0ZVBvbHlsaW5lT3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogTWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgY29uc3QgZjogKHM6IHN0cmluZywgYTogbnVtYmVyKSA9PiBzdHJpbmcgPSAocywgYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbSA9IC9yZ2JhP1xcKChcXGQrKVxccyosXFxzKihcXGQrKVxccyosXFxzKihcXGQrKVxccyooLFxccypcXGQrW1xcLlxcZCtdKikqXFwpL2cuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtICYmIG0ubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgICAgIGEgPSBhID4gMSA/IChhIC8gMTAwKSA6IGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBbbVsxXSwgbVsyXSwgbVszXSwgYV0uam9pbignLCcpICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc1swXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gYSA+IDEgPyBhIDogTWF0aC5mbG9vcihhICogMjU1KTtcbiAgICAgICAgICAgICAgICBjb25zdCB6OiBzdHJpbmcgPSBzLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICBjb25zdCByOiBudW1iZXIgPSBwYXJzZUludCh6LnN1YnN0cigwLCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGc6IG51bWJlciA9IHBhcnNlSW50KHouc3Vic3RyKDIsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgY29uc3QgYjogbnVtYmVyID0gcGFyc2VJbnQoei5zdWJzdHIoNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIFtyICwgZywgYiwgYV0uam9pbignLCcpICsgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gQmluZ0NvbnZlcnNpb25zLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xKVxuICAgICAgICAgICAgLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gJ3N0cm9rZVdlaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgby5zdHJva2VUaGlja25lc3MgPSBvcHRpb25zLnN0cm9rZVdlaWdodDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdzdHJva2VDb2xvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5zdHJva2VDb2xvciA9IGYob3B0aW9ucy5zdHJva2VDb2xvciwgb3B0aW9ucy5zdHJva2VPcGFjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uc3Ryb2tlQ29sb3IgPSBvcHRpb25zLnN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09ICdzdHJva2VPcGFjaXR5Jykge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIElNYXBPcHRpb25zIG9iamVjdCB0byBhIE1pY3Jvc29mdC5NYXBzLklWaWV3T3B0aW9ucyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9iamVjdCB0byBiZSBtYXBwZWQuXG4gICAgICogQHJldHVybnMgLSBNYXBwZWQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDb252ZXJzaW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgVHJhbnNsYXRlVmlld09wdGlvbnMob3B0aW9uczogSU1hcE9wdGlvbnMpOiBNaWNyb3NvZnQuTWFwcy5JVmlld09wdGlvbnMge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JVmlld09wdGlvbnMgfCBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAgIC5maWx0ZXIoayA9PiBCaW5nQ29udmVyc2lvbnMuX3ZpZXdPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uY2VudGVyID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKG9wdGlvbnMuY2VudGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT09ICdib3VuZHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIG8uYm91bmRzID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUJvdW5kcyhvcHRpb25zLmJvdW5kcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09PSAnY2VudGVyT2Zmc2V0Jykge1xuICAgICAgICAgICAgICAgICAgICBvLmNlbnRlck9mZnNldCA9IEJpbmdDb252ZXJzaW9ucy5UcmFuc2xhdGVQb2ludChvcHRpb25zLmNlbnRlck9mZnNldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09PSAnbWFwVHlwZUlkJykge1xuICAgICAgICAgICAgICAgICAgICBvLm1hcFR5cGVJZCA9IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZFsoPGFueT5NYXBUeXBlSWQpW29wdGlvbnMubWFwVHlwZUlkXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb1trXSA9ICg8YW55Pm9wdGlvbnMpW2tdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbn1cbiJdfQ==