/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { GoogleConversions } from '../../services/google/google-conversions';
import { Polygon } from '../polygon';
import { GoogleMapLabel } from './google-label';
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
var /**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
GooglePolygon = /** @class */ (function (_super) {
    tslib_1.__extends(GooglePolygon, _super);
    ///
    /// constructor
    ///
    /**
     * Creates an instance of GooglePolygon.
     * @param _polygon - The {@link GoogleMapTypes.Polygon} underlying the model.
     *
     * @memberof GooglePolygon
     */
    function GooglePolygon(_polygon) {
        var _this = _super.call(this) || this;
        _this._polygon = _polygon;
        _this._title = '';
        _this._showLabel = false;
        _this._showTooltip = false;
        _this._maxZoom = -1;
        _this._minZoom = -1;
        _this._label = null;
        _this._tooltip = null;
        _this._tooltipVisible = false;
        _this._hasToolTipReceiver = false;
        _this._mouseOverListener = null;
        _this._mouseOutListener = null;
        _this._mouseMoveListener = null;
        _this._metadata = new Map();
        _this._editingCompleteEmitter = null;
        _this._originalPath = _this.GetPaths();
        return _this;
    }
    Object.defineProperty(GooglePolygon.prototype, "LabelMaxZoom", {
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
    Object.defineProperty(GooglePolygon.prototype, "LabelMinZoom", {
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
    Object.defineProperty(GooglePolygon.prototype, "Metadata", {
        get: /**
         * Gets the polygon metadata.
         *
         * \@readonly
         * \@memberof GoolePolygon
         * @return {?}
         */
        function () { return this._metadata; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "NativePrimitve", {
        get: /**
         * Gets the native primitve implementing the polygon, in this case {\@link GoogleMapTypes.Polygon}
         *
         * \@readonly
         * \@memberof GooglePolygon
         * @return {?}
         */
        function () { return this._polygon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GooglePolygon.prototype, "ShowLabel", {
        get: /**
         * Gets or sets whether to show the label
         *
         * @abstract
         * \@memberof GooglePolygon
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
    Object.defineProperty(GooglePolygon.prototype, "ShowTooltip", {
        get: /**
         * Gets or sets whether to show the tooltip
         *
         * @abstract
         * \@memberof GooglePolygon
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
    Object.defineProperty(GooglePolygon.prototype, "Title", {
        get: /**
         * Gets or sets the title off the polygon
         *
         * @abstract
         * \@memberof GooglePolygon
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
     * \@memberof GooglePolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    GooglePolygon.prototype.AddListener = /**
     * Adds a delegate for an event.
     *
     * \@memberof GooglePolygon
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    function (eventType, fn) {
        /** @type {?} */
        var supportedEvents = [
            'click',
            'dblclick',
            'drag', 'dragend',
            'dragstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'rightclick'
        ];
        if (supportedEvents.indexOf(eventType) !== -1) {
            this._polygon.addListener(eventType, fn);
        }
        if (eventType === 'pathchanged') {
            this._editingCompleteEmitter = /** @type {?} */ (fn);
        }
    };
    /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.Delete = /**
     * Deleted the polygon.
     *
     * \@memberof GooglePolygon
     * @return {?}
     */
    function () {
        this._polygon.setMap(null);
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
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    GooglePolygon.prototype.GetDraggable = /**
     * Gets whether the polygon is draggable.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is dragable, false otherwise.
     *
     */
    function () {
        return this._polygon.getDraggable();
    };
    /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GooglePolygon.prototype.GetEditable = /**
     * Gets whether the polygon path can be edited.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    function () {
        return this._polygon.getEditable();
    };
    /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    GooglePolygon.prototype.GetPath = /**
     * Gets the polygon path.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of {\@link ILatLong} objects describing the polygon path.
     *
     */
    function () {
        /** @type {?} */
        var p = this._polygon.getPath();
        /** @type {?} */
        var path = new Array();
        p.forEach(function (x) { return path.push({ latitude: x.lat(), longitude: x.lng() }); });
        return path;
    };
    /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    GooglePolygon.prototype.GetPaths = /**
     * Gets the polygon paths.
     *
     * \@memberof GooglePolygon
     * @return {?} - Array of Array of {\@link ILatLong} objects describing multiple polygon paths.
     *
     */
    function () {
        /** @type {?} */
        var p = this._polygon.getPaths();
        /** @type {?} */
        var paths = new Array();
        p.forEach(function (x) {
            /** @type {?} */
            var path = new Array();
            x.forEach(function (y) { return path.push({ latitude: y.lat(), longitude: y.lng() }); });
            paths.push(path);
        });
        return paths;
    };
    /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    GooglePolygon.prototype.GetVisible = /**
     * Gets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @return {?} - True if the polygon is visible, false otherwise.
     *
     */
    function () {
        return this._polygon.getVisible();
    };
    /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetDraggable = /**
     * Sets whether the polygon is dragable.
     *
     * \@memberof GooglePolygon
     * @param {?} draggable - True to make the polygon dragable, false otherwise.
     *
     * @return {?}
     */
    function (draggable) {
        this._polygon.setDraggable(draggable);
    };
    /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetEditable = /**
     * Sets wether the polygon path is editable.
     *
     * \@memberof GooglePolygon
     * @param {?} editable - True to make polygon path editable, false otherwise.
     *
     * @return {?}
     */
    function (editable) {
        /** @type {?} */
        var previous = this._polygon.getEditable();
        this._polygon.setEditable(editable);
        if (previous && !editable && this._editingCompleteEmitter) {
            this._editingCompleteEmitter({
                Click: null,
                Polygon: this,
                OriginalPath: this._originalPath,
                NewPath: this.GetPaths()
            });
            this._originalPath = this.GetPaths();
        }
    };
    /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetOptions = /**
     * Sets the polygon options
     *
     * \@memberof GooglePolygon
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = GoogleConversions.TranslatePolygonOptions(options);
        if (typeof o.editable !== 'undefined') {
            this.SetEditable(o.editable);
            delete o.editable;
        }
        this._polygon.setOptions(o);
        if (options.visible != null && this._showLabel && this._label) {
            this._label.Set('hidden', !options.visible);
        }
    };
    /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetPath = /**
     * Sets the polygon path.
     *
     * \@memberof GooglePolygon
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polygons path.
     *
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var p = new Array();
        path.forEach(function (x) { return p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
        this._polygon.setPath(p);
        this._originalPath = [path];
        if (this._label) {
            this._centroid = null;
            this.ManageLabel();
        }
    };
    /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetPaths = /**
     * Set the polygon path or paths.
     *
     * \@memberof GooglePolygon
     * @param {?} paths An Array of {\@link ILatLong}
     * (or array of arrays) describing the polygons path(s).
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
            this._polygon.setPaths(new Array());
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
                path.forEach(function (x) { return _p.push(new google.maps.LatLng(x.latitude, x.longitude)); });
                p_1.push(_p);
            });
            this._polygon.setPaths(p_1);
            this._originalPath = /** @type {?} */ (paths);
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
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    GooglePolygon.prototype.SetVisible = /**
     * Sets whether the polygon is visible.
     *
     * \@memberof GooglePolygon
     * @param {?} visible - True to set the polygon visible, false otherwise.
     *
     * @return {?}
     */
    function (visible) {
        this._polygon.setVisible(visible);
        if (this._showLabel && this._label) {
            this._label.Set('hidden', !visible);
        }
    };
    /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.ManageLabel = /**
     * Configures the label for the polygon
     * \@memberof GooglePolygon
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
                position: GoogleConversions.TranslateLocationObject(this.Centroid)
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
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = this.NativePrimitve.zIndex ? this.NativePrimitve.zIndex + 1 : 100;
                this._label = new GoogleMapLabel(o);
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
     * \@memberof GooglePolygon
     * @return {?}
     */
    GooglePolygon.prototype.ManageTooltip = /**
     * Configures the tooltip for the polygon
     * \@memberof GooglePolygon
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showTooltip && this._title != null && this._title !== '') {
            /** @type {?} */
            var o = {
                text: this._title,
                align: 'left',
                offset: new google.maps.Point(0, 25),
                backgroundColor: 'bisque',
                hidden: true,
                fontSize: 12,
                fontColor: '#000000',
                strokeWeight: 0
            };
            if (this._tooltip == null) {
                o["map"] = this.NativePrimitve.getMap();
                o["zIndex"] = 100000;
                this._tooltip = new GoogleMapLabel(o);
            }
            else {
                this._tooltip.SetValues(o);
            }
            if (!this._hasToolTipReceiver) {
                this._mouseOverListener = this.NativePrimitve.addListener('mouseover', function (e) {
                    _this._tooltip.Set('position', e.latLng);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = this.NativePrimitve.addListener('mousemove', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('position', e.latLng);
                    }
                });
                this._mouseOutListener = this.NativePrimitve.addListener('mouseout', function (e) {
                    if (_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', true);
                        _this._tooltipVisible = false;
                    }
                });
                this._hasToolTipReceiver = true;
            }
        }
        if ((!this._showTooltip || this._title === '' || this._title == null)) {
            if (this._hasToolTipReceiver) {
                if (this._mouseOutListener) {
                    google.maps.event.removeListener(this._mouseOutListener);
                }
                if (this._mouseOverListener) {
                    google.maps.event.removeListener(this._mouseOverListener);
                }
                if (this._mouseMoveListener) {
                    google.maps.event.removeListener(this._mouseMoveListener);
                }
                this._hasToolTipReceiver = false;
            }
            if (this._tooltip) {
                this._tooltip.SetMap(null);
                this._tooltip = null;
            }
        }
    };
    return GooglePolygon;
}(Polygon));
/**
 * Concrete implementation for a polygon model for Google Maps.
 *
 * @export
 */
export { GooglePolygon };
if (false) {
    /** @type {?} */
    GooglePolygon.prototype._title;
    /** @type {?} */
    GooglePolygon.prototype._showLabel;
    /** @type {?} */
    GooglePolygon.prototype._showTooltip;
    /** @type {?} */
    GooglePolygon.prototype._maxZoom;
    /** @type {?} */
    GooglePolygon.prototype._minZoom;
    /** @type {?} */
    GooglePolygon.prototype._label;
    /** @type {?} */
    GooglePolygon.prototype._tooltip;
    /** @type {?} */
    GooglePolygon.prototype._tooltipVisible;
    /** @type {?} */
    GooglePolygon.prototype._hasToolTipReceiver;
    /** @type {?} */
    GooglePolygon.prototype._originalPath;
    /** @type {?} */
    GooglePolygon.prototype._mouseOverListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseOutListener;
    /** @type {?} */
    GooglePolygon.prototype._mouseMoveListener;
    /** @type {?} */
    GooglePolygon.prototype._metadata;
    /** @type {?} */
    GooglePolygon.prototype._editingCompleteEmitter;
    /** @type {?} */
    GooglePolygon.prototype._polygon;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFVaEQ7Ozs7O0FBQUE7SUFBbUMseUNBQU87SUFzR3RDLEdBQUc7SUFDSCxlQUFlO0lBQ2YsR0FBRztJQUVIOzs7OztPQUtHO0lBQ0gsdUJBQW9CLFFBQWdDO1FBQXBELFlBQ0ksaUJBQU8sU0FFVjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUF3Qjt1QkE5RzNCLEVBQUU7MkJBQ0csS0FBSzs2QkFDSCxLQUFLO3lCQUNWLENBQUMsQ0FBQzt5QkFDRixDQUFDLENBQUM7dUJBQ0ksSUFBSTt5QkFDRixJQUFJO2dDQUNKLEtBQUs7b0NBQ0QsS0FBSzttQ0FFbUIsSUFBSTtrQ0FDTCxJQUFJO21DQUNILElBQUk7MEJBQzdCLElBQUksR0FBRyxFQUFlO3dDQUNNLElBQUk7UUFrR2xFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztLQUN4QzswQkF2RlUsdUNBQVk7Ozs7Ozs7O3NCQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7OztrQkFDakMsR0FBVztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OzBCQVNaLHVDQUFZOzs7Ozs7OztzQkFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7a0JBQ2pDLEdBQVc7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FB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WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcbmltcG9ydCB7IEdvb2dsZUNvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1jb252ZXJzaW9ucyc7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vcG9seWdvbic7XG5pbXBvcnQgeyBHb29nbGVNYXBMYWJlbCB9IGZyb20gJy4vZ29vZ2xlLWxhYmVsJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gZm9yIGEgcG9seWdvbiBtb2RlbCBmb3IgR29vZ2xlIE1hcHMuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlUG9seWdvbiBleHRlbmRzIFBvbHlnb24gaW1wbGVtZW50cyBQb2x5Z29uIHtcblxuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcbiAgICBwcml2YXRlIF9zaG93TGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9zaG93VG9vbHRpcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX21heFpvb206IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgX21pblpvb206IG51bWJlciA9IC0xO1xuICAgIHByaXZhdGUgX2xhYmVsOiBHb29nbGVNYXBMYWJlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdG9vbHRpcDogR29vZ2xlTWFwTGFiZWwgPSBudWxsO1xuICAgIHByaXZhdGUgX3Rvb2x0aXBWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxQYXRoOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+O1xuICAgIHByaXZhdGUgX21vdXNlT3Zlckxpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfbW91c2VPdXRMaXN0ZW5lcjogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xuICAgIHByaXZhdGUgX21vdXNlTW92ZUxpc3RlbmVyOiBHb29nbGVNYXBUeXBlcy5NYXBzRXZlbnRMaXN0ZW5lciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfbWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHByaXZhdGUgX2VkaXRpbmdDb21wbGV0ZUVtaXR0ZXI6IChldmVudDogSVBvbHlnb25FdmVudCkgPT4gdm9pZCA9IG51bGw7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgbGFiZWwgaXMgZGlzcGxheWVkLiBJZ25vcmVkIG9yIFNob3dMYWJlbCBpcyBmYWxzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBMYWJlbE1heFpvb20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heFpvb207IH1cbiAgICBwdWJsaWMgc2V0IExhYmVsTWF4Wm9vbSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tYXhab29tID0gdmFsO1xuICAgICAgICB0aGlzLk1hbmFnZUxhYmVsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIGxhYmVsIGlzIGRpc3BsYXllZC4gSWdub3JlZCBvciBTaG93TGFiZWwgaXMgZmFsc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTGFiZWxNaW5ab29tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW5ab29tOyB9XG4gICAgcHVibGljIHNldCBMYWJlbE1pblpvb20odmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWluWm9vbSA9IHZhbDtcbiAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgR29vbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIGdldCBNZXRhZGF0YSgpOiBNYXA8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHRoaXMuX21ldGFkYXRhOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBwb2x5Z29uLCBpbiB0aGlzIGNhc2Uge0BsaW5rIEdvb2dsZU1hcFR5cGVzLlBvbHlnb259XG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuUG9seWdvbiB7IHJldHVybiB0aGlzLl9wb2x5Z29uOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSBsYWJlbFxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IFNob3dMYWJlbCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dMYWJlbDsgfVxuICAgIHB1YmxpYyBzZXQgU2hvd0xhYmVsKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93TGFiZWwgPSB2YWw7XG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0byBzaG93IHRoZSB0b29sdGlwXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqIEBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgU2hvd1Rvb2x0aXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93VG9vbHRpcDsgfVxuICAgIHB1YmxpYyBzZXQgU2hvd1Rvb2x0aXAodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dUb29sdGlwID0gdmFsO1xuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHRpdGxlIG9mZiB0aGUgcG9seWdvblxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl90aXRsZTsgfVxuICAgIHB1YmxpYyBzZXQgVGl0bGUodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG4gICAgICAgIHRoaXMuTWFuYWdlTGFiZWwoKTtcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIGNvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdvb2dsZVBvbHlnb24uXG4gICAgICogQHBhcmFtIF9wb2x5Z29uIC0gVGhlIHtAbGluayBHb29nbGVNYXBUeXBlcy5Qb2x5Z29ufSB1bmRlcmx5aW5nIHRoZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWdvbjogR29vZ2xlTWFwVHlwZXMuUG9seWdvbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGRlbGVnYXRlIGZvciBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkRXZlbnRzID0gW1xuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICdkYmxjbGljaycsXG4gICAgICAgICAgICAnZHJhZycsICdkcmFnZW5kJyxcbiAgICAgICAgICAgICdkcmFnc3RhcnQnLFxuICAgICAgICAgICAgJ21vdXNlZG93bicsXG4gICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICdtb3VzZW91dCcsXG4gICAgICAgICAgICAnbW91c2VvdmVyJyxcbiAgICAgICAgICAgICdtb3VzZXVwJyxcbiAgICAgICAgICAgICdyaWdodGNsaWNrJ1xuICAgICAgICBdO1xuICAgICAgICBpZiAoc3VwcG9ydGVkRXZlbnRzLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb24uYWRkTGlzdGVuZXIoZXZlbnRUeXBlLCBmbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3BhdGhjaGFuZ2VkJykge1xuICAgICAgICAgICAgdGhpcy5fZWRpdGluZ0NvbXBsZXRlRW1pdHRlciA9IDwoZXZlbnQ6IElQb2x5Z29uRXZlbnQpID0+IHZvaWQ+Zm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldE1hcChudWxsKTtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLkRlbGV0ZSgpOyB9XG4gICAgICAgIGlmICh0aGlzLl90b29sdGlwKSB7IHRoaXMuX3Rvb2x0aXAuRGVsZXRlKCk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2dhYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBHZXREcmFnZ2FibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldERyYWdnYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBwYXRoIGNhbiBiZSBlZGl0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBhdGggY2FuIGJlIGVkaXRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0RWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldEVkaXRhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcG9seWdvbiBwYXRoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBBcnJheSBvZiB7QGxpbmsgSUxhdExvbmd9IG9iamVjdHMgZGVzY3JpYmluZyB0aGUgcG9seWdvbiBwYXRoLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZVBvbHlnb25cbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UGF0aCgpOiBBcnJheTxJTGF0TG9uZz4ge1xuICAgICAgICBjb25zdCBwOiBBcnJheTxHb29nbGVNYXBUeXBlcy5MYXRMbmc+ID0gdGhpcy5fcG9seWdvbi5nZXRQYXRoKCk7XG4gICAgICAgIGNvbnN0IHBhdGg6IEFycmF5PElMYXRMb25nPiA9IG5ldyBBcnJheTxJTGF0TG9uZz4oKTtcbiAgICAgICAgcC5mb3JFYWNoKHggPT4gcGF0aC5wdXNoKHsgbGF0aXR1ZGU6IHgubGF0KCksIGxvbmdpdHVkZTogeC5sbmcoKSB9KSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlnb24gcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0cyBkZXNjcmliaW5nIG11bHRpcGxlIHBvbHlnb24gcGF0aHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRQYXRocygpOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+IHtcbiAgICAgICAgY29uc3QgcDogQXJyYXk8QXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPj4gPSB0aGlzLl9wb2x5Z29uLmdldFBhdGhzKCk7XG4gICAgICAgIGNvbnN0IHBhdGhzOiBBcnJheTxBcnJheTxJTGF0TG9uZz4+ID0gbmV3IEFycmF5PEFycmF5PElMYXRMb25nPj4oKTtcbiAgICAgICAgcC5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aDogQXJyYXk8SUxhdExvbmc+ID0gbmV3IEFycmF5PElMYXRMb25nPigpO1xuICAgICAgICAgICAgeC5mb3JFYWNoKHkgPT4gcGF0aC5wdXNoKHsgbGF0aXR1ZGU6IHkubGF0KCksIGxvbmdpdHVkZTogeS5sbmcoKSB9KSk7XG4gICAgICAgICAgICBwYXRocy5wdXNoKHBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5Z29uIGlzIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29uLmdldFZpc2libGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgZHJhZ2FibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZHJhZ2dhYmxlIC0gVHJ1ZSB0byBtYWtlIHRoZSBwb2x5Z29uIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BvbHlnb24uc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3ZXRoZXIgdGhlIHBvbHlnb24gcGF0aCBpcyBlZGl0YWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlZGl0YWJsZSAtIFRydWUgdG8gbWFrZSBwb2x5Z29uIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIFNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5fcG9seWdvbi5nZXRFZGl0YWJsZSgpO1xuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldEVkaXRhYmxlKGVkaXRhYmxlKTtcbiAgICAgICAgaWYgKHByZXZpb3VzICYmICFlZGl0YWJsZSAmJiB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0aW5nQ29tcGxldGVFbWl0dGVyKHtcbiAgICAgICAgICAgICAgICBDbGljazogbnVsbCxcbiAgICAgICAgICAgICAgICBQb2x5Z29uOiB0aGlzLFxuICAgICAgICAgICAgICAgIE9yaWdpbmFsUGF0aDogdGhpcy5fb3JpZ2luYWxQYXRoLFxuICAgICAgICAgICAgICAgIE5ld1BhdGg6IHRoaXMuR2V0UGF0aHMoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSB0aGlzLkdldFBhdGhzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIFNldE9wdGlvbnMob3B0aW9uczogSVBvbHlnb25PcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IEdvb2dsZU1hcFR5cGVzLlBvbHlnb25PcHRpb25zID0gR29vZ2xlQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWdvbk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvLmVkaXRhYmxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5TZXRFZGl0YWJsZShvLmVkaXRhYmxlKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLmVkaXRhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRPcHRpb25zKG8pO1xuICAgICAgICBpZiAob3B0aW9ucy52aXNpYmxlICE9IG51bGwgJiYgdGhpcy5fc2hvd0xhYmVsICYmIHRoaXMuX2xhYmVsKSB7IHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIW9wdGlvbnMudmlzaWJsZSk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb2x5Z29uIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIEFuIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gKG9yIGFycmF5IG9mIGFycmF5cykgZGVzY3JpYmluZyB0aGUgcG9seWdvbnMgcGF0aC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIFNldFBhdGgocGF0aDogQXJyYXk8SUxhdExvbmc+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IGdvb2dsZS5tYXBzLkxhdExuZyh4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcbiAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRQYXRoKHApO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFBhdGggPSBbcGF0aF07XG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VudHJvaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwb2x5Z29uIHBhdGggb3IgcGF0aHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHMgQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfVxuICAgICAqIChvciBhcnJheSBvZiBhcnJheXMpIGRlc2NyaWJpbmcgdGhlIHBvbHlnb25zIHBhdGgocykuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRQYXRocyhwYXRoczogQXJyYXk8QXJyYXk8SUxhdExvbmc+PiB8IEFycmF5PElMYXRMb25nPik6IHZvaWQge1xuICAgICAgICBpZiAocGF0aHMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGhzKSkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcG9seWdvbi5zZXRQYXRocyhuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLkRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoc1swXSkpIHtcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvciBhcnJheXNcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+ID0gbmV3IEFycmF5PEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4+KCk7XG4gICAgICAgICAgICAoPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHMpLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3A6IEFycmF5PEdvb2dsZU1hcFR5cGVzLkxhdExuZz4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTGF0TG5nPigpO1xuICAgICAgICAgICAgICAgIHBhdGguZm9yRWFjaCh4ID0+IF9wLnB1c2gobmV3IGdvb2dsZS5tYXBzLkxhdExuZyh4LmxhdGl0dWRlLCB4LmxvbmdpdHVkZSkpKTtcbiAgICAgICAgICAgICAgICBwLnB1c2goX3ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFBhdGhzKHApO1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxQYXRoID0gPEFycmF5PEFycmF5PElMYXRMb25nPj4+cGF0aHM7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jZW50cm9pZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5NYW5hZ2VMYWJlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFyYW1ldGVyIGlzIGEgc2ltcGxlIGFycmF5Li4uLlxuICAgICAgICAgICAgdGhpcy5TZXRQYXRoKDxBcnJheTxJTGF0TG9uZz4+cGF0aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIFRydWUgdG8gc2V0IHRoZSBwb2x5Z29uIHZpc2libGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9wb2x5Z29uLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fbGFiZWwpIHsgdGhpcy5fbGFiZWwuU2V0KCdoaWRkZW4nLCAhdmlzaWJsZSk7IH1cbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmVzIHRoZSBsYWJlbCBmb3IgdGhlIHBvbHlnb25cbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlUG9seWdvblxuICAgICAqL1xuICAgIHByaXZhdGUgTWFuYWdlTGFiZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLkdldFBhdGggPT0gbnVsbCB8fCB0aGlzLkdldFBhdGgoKS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmICh0aGlzLl9zaG93TGFiZWwgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IEdvb2dsZUNvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uT2JqZWN0KHRoaXMuQ2VudHJvaWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG8ucG9zaXRpb24gPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9taW5ab29tICE9PSAtMSkgeyBvLm1pblpvb20gPSB0aGlzLl9taW5ab29tOyB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Wm9vbSAhPT0gLTEpIHsgby5tYXhab29tID0gdGhpcy5fbWF4Wm9vbTsgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvLm1hcCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuZ2V0TWFwKCk7XG4gICAgICAgICAgICAgICAgby56SW5kZXggPSB0aGlzLk5hdGl2ZVByaW1pdHZlLnpJbmRleCA/IHRoaXMuTmF0aXZlUHJpbWl0dmUuekluZGV4ICsgMSA6IDEwMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBHb29nbGVNYXBMYWJlbChvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldFZhbHVlcyhvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldCgnaGlkZGVuJywgIXRoaXMuR2V0VmlzaWJsZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsLlNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmVzIHRoZSB0b29sdGlwIGZvciB0aGUgcG9seWdvblxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVQb2x5Z29uXG4gICAgICovXG4gICAgcHJpdmF0ZSBNYW5hZ2VUb29sdGlwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2hvd1Rvb2x0aXAgJiYgdGhpcy5fdGl0bGUgIT0gbnVsbCAmJiB0aGlzLl90aXRsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fdGl0bGUsXG4gICAgICAgICAgICAgICAgYWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAyNSksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmlzcXVlJyxcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvLm1hcCA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuZ2V0TWFwKCk7XG4gICAgICAgICAgICAgICAgby56SW5kZXggPSAxMDAwMDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBHb29nbGVNYXBMYWJlbChvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0VmFsdWVzKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lciA9IHRoaXMuTmF0aXZlUHJpbWl0dmUuYWRkTGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5OYXRpdmVQcmltaXR2ZS5hZGRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IEdvb2dsZU1hcFR5cGVzLk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7IHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubGF0TG5nKTsgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT3V0TGlzdGVuZXIgPSB0aGlzLk5hdGl2ZVByaW1pdHZlLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIChlOiBHb29nbGVNYXBUeXBlcy5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCghdGhpcy5fc2hvd1Rvb2x0aXAgfHwgdGhpcy5fdGl0bGUgPT09ICcnIHx8IHRoaXMuX3RpdGxlID09IG51bGwpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlT3V0TGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VPdXRMaXN0ZW5lcik7IH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgZ29vZ2xlLm1hcHMuZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IGdvb2dsZS5tYXBzLmV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19