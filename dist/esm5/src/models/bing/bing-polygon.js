/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polygon } from '../polygon';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
var /**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
BingPolygon = /** @class */ (function (_super) {
    tslib_1.__extends(BingPolygon, _super);
    ///
    /// constructor
    ///
    /**
     * Creates an instance of BingPolygon.
     * @param _polygon - The {@link Microsoft.Maps.Polygon} underlying the model.
     * @param _mapService Instance of the Map Service.
     * @param _layer - The context layer.
     * @memberof BingPolygon
     */
    function BingPolygon(_polygon, _mapService, _layer) {
        var _this = _super.call(this) || this;
        _this._polygon = _polygon;
        _this._mapService = _mapService;
        _this._layer = _layer;
        _this._map = null;
        _this._isEditable = false;
        _this._title = '';
        _this._maxZoom = -1;
        _this._minZoom = -1;
        _this._showLabel = false;
        _this._showTooltip = false;
        _this._label = null;
        _this._tooltip = null;
        _this._hasToolTipReceiver = false;
        _this._tooltipVisible = false;
        _this._metadata = new Map();
        _this._map = _this._mapService.MapInstance;
        _this._originalPath = _this.GetPaths();
        return _this;
    }
    Object.defineProperty(BingPolygon.prototype, "LabelMaxZoom", {
        get: /**
         * Gets or sets the maximum zoom at which the label is displayed. Ignored or ShowLabel is false.
         *
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._maxZoom; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._maxZoom = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "LabelMinZoom", {
        get: /**
         * Gets or sets the minimum zoom at which the label is displayed. Ignored or ShowLabel is false.
         *
         * \@memberof GooglePolygon
         * \@property
         * @return {?}
         */
        function () { return this._minZoom; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._minZoom = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "Metadata", {
        get: /**
         * Gets the polygon metadata.
         *
         * \@readonly
         * \@memberof BingPolygon
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the polygon, in this case {\@link Microsoft.Maps.Polygon}
         *
         * \@readonly
         * \@memberof BingPolygon
         * @return {?}
         */
        function () { return this._polygon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "ShowLabel", {
        get: /**
         * Gets or sets whether to show the label
         *
         * @abstract
         * \@memberof BingPolygon
         * \@property
         * @return {?}
         */
        function () { return this._showLabel; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showLabel = val;
            this.ManageLabel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "ShowTooltip", {
        get: /**
         * Gets or sets whether to show the tooltip
         *
         * @abstract
         * \@memberof BingPolygon
         * \@property
         * @return {?}
         */
        function () { return this._showTooltip; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showTooltip = val;
            this.ManageTooltip();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BingPolygon.prototype, "Title", {
        get: /**
         * Gets or sets the title off the polygon
         *
         * @abstract
         * \@memberof BingPolygon
         * \@property
         * @return {?}
         */
        function () { return this._title; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._title = val;
            this.ManageLabel();
            this.ManageTooltip();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    BingPolygon.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    function (eventType, fn) {
        var _this = this;
        /** @type {?} */
        var supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polygon, eventType, function (e) {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            /** @type {?} */
            var handlerId_1 = void 0;
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                handlerId_1 = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) { return fn(m); });
            });
            Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                if (handlerId_1) {
                    Microsoft.Maps.Events.removeHandler(handlerId_1);
                }
            });
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    };
    /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    BingPolygon.prototype.Delete = /**
     * Deleted the polygon.
     *
     * \@memberof BingPolygon
     * @return {?}
     */
    function () {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._label) {
            this._label.Delete();
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    };
    /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    BingPolygon.prototype.GetDraggable = /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    function () {
        return false;
    };
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    BingPolygon.prototype.GetEditable = /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._isEditable;
    };
    /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    BingPolygon.prototype.GetPath = /**
     * Gets the polygon path.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    function () {
        /** @type {?} */
        var p = this._polygon.getLocations();
        /** @type {?} */
        var path = new Array();
        p.forEach(function (l) { return path.push({ latitude: l.latitude, longitude: l.longitude }); });
        return path;
    };
    /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    BingPolygon.prototype.GetPaths = /**
     * Gets the polygon paths.
     *
     * \@memberof BingPolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    function () {
        /** @type {?} */
        var p = this._polygon.getRings();
        /** @type {?} */
        var paths = new Array();
        p.forEach(function (x) {
            /** @type {?} */
            var path = new Array();
            x.forEach(function (y) { return path.push({ latitude: y.latitude, longitude: y.longitude }); });
            paths.push(path);
        });
        return paths;
    };
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    BingPolygon.prototype.GetVisible = /**
     * Gets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    function () {
        return this._polygon.getVisible();
    };
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetDraggable = /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof BingPolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        //      ?forum=bingmaps
        throw (new Error('The bing maps implementation currently does not support draggable polygons.'));
    };
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetEditable = /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof BingPolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        var _this = this;
        /** @type {?} */
        var isChanged = this._isEditable !== editable;
        this._isEditable = editable;
        if (!isChanged) {
            return;
        }
        if (this._isEditable) {
            this._originalPath = this.GetPaths();
            this._mapService.GetDrawingTools().then(function (t) {
                t.edit(_this._polygon);
            });
        }
        else {
            this._mapService.GetDrawingTools().then(function (t) {
                t.finish(function (editedPolygon) {
                    if (editedPolygon !== _this._polygon || !_this._editingCompleteEmitter) {
                        return;
                    }
                    /** @type {?} */
                    var newPath = _this.GetPaths();
                    /** @type {?} */
                    var originalPath = _this._originalPath;
                    _this.SetPaths(newPath);
                    // this is necessary for the new path to persist it appears.
                    // this is necessary for the new path to persist it appears.
                    _this._editingCompleteEmitter({
                        Click: null,
                        Polygon: _this,
                        OriginalPath: originalPath,
                        NewPath: newPath
                    });
                });
            });
        }
    };
    /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetOptions = /**
     * Sets the polygon options
     *
     * \@memberof Polygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = BingConversions.TranslatePolygonOptions(options);
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
        if (typeof options.editable !== 'undefined') {
            this.SetEditable(options.editable);
        }
    };
    /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetPath = /**
     * Sets the polygon path.
     *
     * \@memberof BingPolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var p = new Array();
        path.forEach(function (x) { return p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
        this._originalPath = [path];
        this._polygon.setLocations(p);
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    };
    /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    BingPolygon.prototype.SetPaths = /**
     * Set the polygon path or paths.
     *
     * \@memberof BingPolygon
     * @param {?} paths
     * An Array of {\@link ILatLong} (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    function (paths) {
        if (paths == null) {
            return;
        }
        if (!Array.isArray(paths)) {
            return;
        }
        if (paths.length === 0) {
            this._polygon.setRings(new Array());
            if (this._label) {
                this._label.Delete();
                this._label = null;
            }
            return;
        }
        if (Array.isArray(paths[0])) {
            /** @type {?} */
            var p_1 = new Array();
            (/** @type {?} */ (paths)).forEach(function (path) {
                /** @type {?} */
                var _p = new Array();
                path.forEach(function (x) { return _p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)); });
                p_1.push(_p);
            });
            this._originalPath = /** @type {?} */ (paths);
            this._polygon.setRings(p_1);
            if (this._label) {
                this._centroid = null;
                this.ManageLabel();
            }
        }
        else {
            // parameter is a simple array....
            this.SetPath(/** @type {?} */ (paths));
        }
    };
    /**
     * Sets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    BingPolygon.prototype.SetVisible = /**
     * Sets whether the polygon is visible.
     *
     * \@memberof BingPolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polygon.setOptions(/** @type {?} */ ({ visible: visible }));
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    };
    /**
     * Configures the label for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    BingPolygon.prototype.ManageLabel = /**
     * Configures the label for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    function () {
        if (this.GetPath == null || this.GetPath().length === 0) {
            return;
        }
        if (this._showLabel && this._title != null && this._title !== '') {
            /** @type {?} */
            var o = {
                text: this._title,
                position: BingConversions.TranslateLocation(this.Centroid)
            };
            if (o["position"] == null) {
                return;
            }
            if (this._minZoom !== -1) {
                o["minZoom"] = this._minZoom;
            }
            if (this._maxZoom !== -1) {
                o["maxZoom"] = this._maxZoom;
            }
            if (this._label == null) {
                this._label = new BingMapLabel(o);
                this._label.SetMap(this._map);
            }
            else {
                this._label.SetValues(o);
            }
            this._label.Set('hidden', !this.GetVisible());
        }
        else {
            if (this._label) {
                this._label.SetMap(null);
                this._label = null;
            }
        }
    };
    /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    BingPolygon.prototype.ManageTooltip = /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showTooltip && this._title != null && this._title !== '') {
            /** @type {?} */
            var o = {
                text: this._title,
                align: 'left',
                offset: new Microsoft.Maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                this._tooltip = new BingMapLabel(o);
                this._tooltip.SetMap(this._map);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseover', function (e) {
                    _this._tooltip.Set('position', e.location);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                    _this._mouseMoveListener = Microsoft.Maps.Events.addHandler(_this._map, 'mousemove', function (m) {
                        if (_this._tooltipVisible && m.location && m.primitive === _this._polygon) {
                            _this._tooltip.Set('position', m.location);
                        }
                    });
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polygon, 'mouseout', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', true);
                        _this._tooltipVisible = false;
                    }
                    if (_this._mouseMoveListener) {
                        Microsoft.Maps.Events.removeHandler(_this._mouseMoveListener);
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    Microsoft.Maps.Events.removeHandler(this._mouseMoveListener);
                }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    };
    return BingPolygon;
}(Polygon));
/**
 * Concrete implementation for a polygon model for Bing Maps V8.
 *
 * @export
 */
export { BingPolygon };
if (false) {
    /** @type {?} */
    BingPolygon.prototype._map;
    /** @type {?} */
    BingPolygon.prototype._isEditable;
    /** @type {?} */
    BingPolygon.prototype._title;
    /** @type {?} */
    BingPolygon.prototype._maxZoom;
    /** @type {?} */
    BingPolygon.prototype._minZoom;
    /** @type {?} */
    BingPolygon.prototype._showLabel;
    /** @type {?} */
    BingPolygon.prototype._showTooltip;
    /** @type {?} */
    BingPolygon.prototype._label;
    /** @type {?} */
    BingPolygon.prototype._tooltip;
    /** @type {?} */
    BingPolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolygon.prototype._tooltipVisible;
    /** @type {?} */
    BingPolygon.prototype._mouseOverListener;
    /** @type {?} */
    BingPolygon.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolygon.prototype._mouseOutListener;
    /** @type {?} */
    BingPolygon.prototype._metadata;
    /** @type {?} */
    BingPolygon.prototype._originalPath;
    /** @type {?} */
    BingPolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    BingPolygon.prototype._polygon;
    /** @type {?} */
    BingPolygon.prototype._mapService;
    /** @type {?} */
    BingPolygon.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5Z29uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7OztBQU81Qzs7Ozs7QUFBQTtJQUFpQyx1Q0FBTztJQTJHcEMsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7OztPQU1HO0lBQ0gscUJBQ1ksVUFDRSxXQUEyQixFQUMzQixNQUE0QjtRQUgxQyxZQUtJLGlCQUFPLFNBR1Y7UUFQVyxjQUFRLEdBQVIsUUFBUTtRQUNOLGlCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixZQUFNLEdBQU4sTUFBTSxDQUFzQjtxQkFwSFAsSUFBSTs0QkFDUixLQUFLO3VCQUNYLEVBQUU7eUJBQ0EsQ0FBQyxDQUFDO3lCQUNGLENBQUMsQ0FBQzsyQkFDQyxLQUFLOzZCQUNILEtBQUs7dUJBQ04sSUFBSTt5QkFDRixJQUFJO29DQUNFLEtBQUs7Z0NBQ1QsS0FBSzswQkFJRixJQUFJLEdBQUcsRUFBZTtRQXlHeEQsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7S0FDeEM7MEJBN0ZVLHFDQUFZOzs7Ozs7OztzQkFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7a0JBQ2pDLEdBQVc7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7OzswQkFTWixxQ0FB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YUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUFFO2dCQUM1RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDOUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzlGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O3NCQWpmVDtFQWFpQyxPQUFPLEVBdWV2QyxDQUFBOzs7Ozs7QUF2ZUQsdUJBdWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJUG9seWdvbkV2ZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1ldmVudCc7XG5pbXBvcnQgeyBCaW5nQ29udmVyc2lvbnMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctY29udmVyc2lvbnMnO1xuaW1wb3J0IHsgQmluZ01hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9iaW5nL2JpbmctbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9seWdvbiB9IGZyb20gJy4uL3BvbHlnb24nO1xuaW1wb3J0IHsgQmluZ01hcExhYmVsIH0gZnJvbSAnLi9iaW5nLWxhYmVsJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgYSBwb2x5Z29uIG1vZGVsIGZvciBCaW5nIE1hcHMgVjguXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgQmluZ1BvbHlnb24gZXh0ZW5kcyBQb2x5Z29uIGltcGxlbWVudHMgUG9seWdvbiB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfbWFwOiBNaWNyb3NvZnQuTWFwcy5NYXAgPSBudWxsO1xuICAgIHByaXZhdGUgX2lzRWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF90aXRsZTogc3RyaW5nID0gJyc7XG4gICAgcHJpdmF0ZSBfbWF4Wm9vbTogbnVtYmVyID0gLTE7XG4gICAgcHJpdmF0ZSBfbWluWm9vbTogbnVtYmVyID0gLTE7XG4gICAgcHJpdmF0ZSBfc2hvd0xhYmVsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9sYWJlbDogQmluZ01hcExhYmVsID0gbnVsbDtcbiAgICBwcml2YXRlIF90b29sdGlwOiBCaW5nTWFwTGFiZWwgPSBudWxsO1xuICAgIHByaXZhdGUgX2hhc1Rvb2xUaXBSZWNlaXZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbW91c2VPdmVyTGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XG4gICAgcHJpdmF0ZSBfbW91c2VNb3ZlTGlzdGVuZXI6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcbiAgICBwcml2YXRlIF9tZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+O1xuICAgIHByaXZhdGUgX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXI6IChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZDtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBsYWJlbCBpcyBkaXNwbGF5ZWQuIElnbm9yZWQgb3IgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IExhYmVsTWF4Wm9vbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4Wm9vbTsgfVxuICAgIHB1YmxpYyBzZXQgTGFiZWxNYXhab29tKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21heFpvb20gPSB2YWw7XG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1pbmltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBMYWJlbE1pblpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pblpvb207IH1cbiAgICBwdWJsaWMgc2V0IExhYmVsTWluWm9vbSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9taW5ab29tID0gdmFsO1xuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmF0aXZlIHByaW1pdHZlIGltcGxlbWVudGluZyB0aGUgcG9seWdvbiwgaW4gdGhpcyBjYXNlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29ufVxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGdldCBOYXRpdmVQcmltaXR2ZSgpOiBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29uIHsgcmV0dXJuIHRoaXMuX3BvbHlnb247IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIGxhYmVsXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbDsgfVxuICAgIHB1YmxpYyBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93TGFiZWwgPSB2YWw7XG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cbiAgICBwdWJsaWMgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93VG9vbHRpcCA9IHZhbDtcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aXRsZSBvZmYgdGhlIHBvbHlnb25cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgVGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3RpdGxlOyB9XG4gICAgcHVibGljIHNldCBUaXRsZSh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gY29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb24uXG4gICAgICogQHBhcmFtIF9wb2x5Z29uIC0gVGhlIHtAbGluayBNaWNyb3NvZnQuTWFwcy5Qb2x5Z29ufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgSW5zdGFuY2Ugb2YgdGhlIE1hcCBTZXJ2aWNlLlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcG9seWdvbjogTWljcm9zb2Z0Lk1hcHMuUG9seWdvbixcbiAgICAgICAgcHJvdGVjdGVkIF9tYXBTZXJ2aWNlOiBCaW5nTWFwU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9sYXllcjogTWljcm9zb2Z0Lk1hcHMuTGF5ZXIsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX21hcFNlcnZpY2UuTWFwSW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IHRoaXMuR2V0UGF0aHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZGVsZWdhdGUgZm9yIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSBmbiAtIERlbGVnYXRlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkRXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdkcmFnJywgJ2RyYWdlbmQnLCAnZHJhZ3N0YXJ0JywgJ21vdXNlZG93bicsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCddO1xuICAgICAgICBpZiAoc3VwcG9ydGVkRXZlbnRzLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX3BvbHlnb24sIGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlcklkOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWdvbiwgJ21vdXNlb3ZlcicsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJJZCA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIG0gPT4gZm4obSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9wb2x5Z29uLCAnbW91c2VvdXQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcklkKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKGhhbmRsZXJJZCk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGlmIChldmVudFR5cGUgPT09ICdwYXRoY2hhbmdlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIgPSA8KGV2ZW50OiBJUG9seWdvbkV2ZW50KSA9PiB2b2lkPmZuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlZCB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sYXllcikgeyB0aGlzLl9sYXllci5yZW1vdmUodGhpcy5OYXRpdmVQcmltaXR2ZSk7IH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuZW50aXRpZXMucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5EZWxldGUoKTsgfVxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdnYWJsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVHJ1ZSBpZiB0aGUgcG9seWdvbiBpcyBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgLy8vXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cbiAgICAgICAgLy8vICAgICA3YWFhZTc0OC00ZDVmLTRiZTUtYTdiYi05MDQ5OGUwOGI0MWMvaG93LWNhbi1pLW1ha2UtcG9seWdvbnBvbHlsaW5lLWRyYWdnYWJsZS1pbi1iaW5nLW1hcHMtOD9cbiAgICAgICAgLy8vICAgICBmb3J1bT1iaW5nbWFwc1xuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxuICAgICAgICAvLy9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIEdldEVkaXRhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNFZGl0YWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0cyBkZXNjcmliaW5nIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz4ge1xuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSB0aGlzLl9wb2x5Z29uLmdldExvY2F0aW9ucygpO1xuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XG4gICAgICAgIHAuZm9yRWFjaChsID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiBsLmxhdGl0dWRlLCBsb25naXR1ZGU6IGwubG9uZ2l0dWRlIH0pKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRocy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gQXJyYXkgb2YgQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSBvYmplY3RzIGRlc2NyaWJpbmcgbXVsdGlwbGUgcG9seWdvbiBwYXRocy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRQYXRocygpOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHtcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PiA9IHRoaXMuX3BvbHlnb24uZ2V0UmluZ3MoKTtcbiAgICAgICAgY29uc3QgcGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBuZXcgQXJyYXk8QXJyYXk8SUxhdExvbmc+PigpO1xuICAgICAgICBwLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XG4gICAgICAgICAgICB4LmZvckVhY2goeSA9PiBwYXRoLnB1c2goeyBsYXRpdHVkZTogeS5sYXRpdHVkZSwgbG9uZ2l0dWRlOiB5LmxvbmdpdHVkZSB9KSk7XG4gICAgICAgICAgICBwYXRocy5wdXNoKHBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbi5nZXRWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFrZSB0aGUgcG9seWdvbiBkcmFnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8vXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cbiAgICAgICAgLy8vICAgICA3YWFhZTc0OC00ZDVmLTRiZTUtYTdiYi05MDQ5OGUwOGI0MWMvaG93LWNhbi1pLW1ha2UtcG9seWdvbnBvbHlsaW5lLWRyYWdnYWJsZS1pbi1iaW5nLW1hcHMtOFxuICAgICAgICAvLyAgICAgID9mb3J1bT1iaW5nbWFwc1xuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxuICAgICAgICAvLy9cbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignVGhlIGJpbmcgbWFwcyBpbXBsZW1lbnRhdGlvbiBjdXJyZW50bHkgZG9lcyBub3Qgc3VwcG9ydCBkcmFnZ2FibGUgcG9seWdvbnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5Z29uIHBhdGggaXMgZWRpdGFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWRpdGFibGUgLSBUcnVlIHRvIG1ha2UgcG9seWdvbiBwYXRoIGVkaXRhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGhpcy5faXNFZGl0YWJsZSAhPT0gZWRpdGFibGU7XG4gICAgICAgIHRoaXMuX2lzRWRpdGFibGUgPSBlZGl0YWJsZTtcbiAgICAgICAgaWYgKCFpc0NoYW5nZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc0VkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldERyYXdpbmdUb29scygpLnRoZW4odCA9PiB7XG4gICAgICAgICAgICAgICAgdC5lZGl0KHRoaXMuX3BvbHlnb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldERyYXdpbmdUb29scygpLnRoZW4odCA9PiB7XG4gICAgICAgICAgICAgICAgdC5maW5pc2goKGVkaXRlZFBvbHlnb246IE1pY3Jvc29mdC5NYXBzLlBvbHlnb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRlZFBvbHlnb24gIT09IHRoaXMuX3BvbHlnb24gfHwgIXRoaXMuX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gdGhpcy5HZXRQYXRocygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFBhdGg6IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSB0aGlzLl9vcmlnaW5hbFBhdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2V0UGF0aHMobmV3UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgdGhlIG5ldyBwYXRoIHRvIHBlcnNpc3QgaXQgYXBwZWFycy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljazogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvbHlnb246IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBPcmlnaW5hbFBhdGg6IG9yaWdpbmFsUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIE5ld1BhdGg6IG5ld1BhdGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvbHlnb24gb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSUxhdExvbmd9IG9iamVjdCBjb250YWluaW5nIHRoZSBvcHRpb25zLiBUaGUgb3B0aW9ucyBhcmUgbWVyZ2VkIHdpdGggaHRlIG9uZXNcbiAgICAgKiBhbHJlYWR5IG9uIHRoZSB1bmRlcmx5aW5nIG1vZGVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIFBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSVBvbHlnb25PcHRpb25zID0gQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZVBvbHlnb25PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE9wdGlvbnMobyk7XG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCAmJiB0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhb3B0aW9ucy52aXNpYmxlKTsgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lZGl0YWJsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuU2V0RWRpdGFibGUob3B0aW9ucy5lZGl0YWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQYXRoKHBhdGg6IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XG4gICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IHAucHVzaChuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24oeC5sYXRpdHVkZSwgeC5sb25naXR1ZGUpKSk7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsUGF0aCA9IFtwYXRoXTtcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRMb2NhdGlvbnMocCk7XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHNcbiAgICAgKiBBbiBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PElMYXRMb25nPj4gfCBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHBhdGhzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXRocykpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb24uc2V0UmluZ3MobmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLkRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPj4gPSBuZXcgQXJyYXk8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+PigpO1xuICAgICAgICAgICAgKDxBcnJheTxBcnJheTxJTGF0TG9uZz4+PnBhdGhzKS5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9wOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbj4gPSBuZXcgQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+KCk7XG4gICAgICAgICAgICAgICAgcGF0aC5mb3JFYWNoKHggPT4gX3AucHVzaChuZXcgTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24oeC5sYXRpdHVkZSwgeC5sb25naXR1ZGUpKSk7XG4gICAgICAgICAgICAgICAgcC5wdXNoKF9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFJpbmdzKHApO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhIHNpbXBsZSBhcnJheS4uLi5cbiAgICAgICAgICAgIHRoaXMuU2V0UGF0aCg8QXJyYXk8SUxhdExvbmc+PnBhdGhzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWdvbiB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0T3B0aW9ucyg8TWljcm9zb2Z0Lk1hcHMuSVBvbHlnb25PcHRpb25zPnsgdmlzaWJsZTogdmlzaWJsZSB9KTtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl9sYWJlbCkgeyB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF2aXNpYmxlKTsgfVxuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZXMgdGhlIGxhYmVsIGZvciB0aGUgcG9seWdvblxuICAgICAqIEBtZW1iZXJvZiBQb2x5Z29uXG4gICAgICovXG4gICAgcHJpdmF0ZSBNYW5hZ2VMYWJlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuR2V0UGF0aCA9PSBudWxsIHx8IHRoaXMuR2V0UGF0aCgpLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHRoaXMuX3Nob3dMYWJlbCAmJiB0aGlzLl90aXRsZSAhPSBudWxsICYmIHRoaXMuX3RpdGxlICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHtcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLl90aXRsZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHRoaXMuQ2VudHJvaWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG8ucG9zaXRpb24gPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9taW5ab29tICE9PSAtMSkgeyBvLm1pblpvb20gPSB0aGlzLl9taW5ab29tOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Wm9vbSAhPT0gLTEpIHsgby5tYXhab29tID0gdGhpcy5fbWF4Wm9vbTsgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwuU2V0TWFwKHRoaXMuX21hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRWYWx1ZXMobyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXQoJ2hpZGRlbicsICF0aGlzLkdldFZpc2libGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbC5TZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB0aGUgdG9vbHRpcCBmb3IgdGhlIHBvbHlnb25cbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoMCwgMjUpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRNYXAodGhpcy5fbWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0VmFsdWVzKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lciA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb2x5Z29uLCAnbW91c2VvdmVyJywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU1vdmVMaXN0ZW5lciA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcCwgJ21vdXNlbW92ZScsIChtOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlICYmIG0ubG9jYXRpb24gJiYgbS5wcmltaXRpdmUgPT09IHRoaXMuX3BvbHlnb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIG0ubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbiwgJ21vdXNlb3V0JywgKGU6IE1pY3Jvc29mdC5NYXBzLklNb3VzZUV2ZW50QXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIpOyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCghdGhpcy5fc2hvd1Rvb2x0aXAgfHwgdGhpcy5fdGl0bGUgPT09ICcnIHx8IHRoaXMuX3RpdGxlID09IG51bGwpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VPdXRMaXN0ZW5lcik7IH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19