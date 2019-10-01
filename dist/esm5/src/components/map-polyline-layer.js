/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { Polyline } from '../models/polyline';
/** *
 * internal counter to use as ids for polylines.
  @type {?} */
var layerId = 1000000;
/**
 * MapPolylineLayerDirective performantly renders a large set of polyline on a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent} from '...';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *   .map-container {
 *     height: 300px;
 *   }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polyline-layer [PolygonOptions]="_polyline"></x-map-polyline-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolylineLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolylineLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolylineLayerDirective
     */
    function MapPolylineLayerDirective(_layerService, _mapService, _zone) {
        this._layerService = _layerService;
        this._mapService = _mapService;
        this._zone = _zone;
        this._labels = new Array();
        this._tooltipSubscriptions = new Array();
        this._tooltipVisible = false;
        this._defaultOptions = {
            fontSize: 11,
            fontFamily: 'sans-serif',
            strokeWeight: 2,
            strokeColor: '#000000',
            fontColor: '#ffffff'
        };
        this._streaming = false;
        this._polylines = new Array();
        this._polylinesLast = new Array();
        /**
         * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolylineLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polylines titles as the labels on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polylines as the tooltips on the polylines.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polyline in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polyline in a layer.
         *
         * \@memberof MapPolylineLayerDirective
         */
        this.PolylineMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolylineLayerDirective.prototype, "PolylineOptions", {
        /**
         * An array of polyline options representing the polylines in the layer.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * An array of polyline options representing the polylines in the layer.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._polylines; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polylinesLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polylines).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polylines = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "TreatNewPolylineOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * @memberof MapPolylineLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolylineOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolylineOptions will be incrementally drawn on the map as opposed to replace the polylines on the map.
         *
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._streaming; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) { this._streaming = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the polyline layer.
         *
         * \@readonly
         * \@memberof MapPolylineLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var layerOptions = {
            id: this._id
        };
        this._zone.runOutsideAngular(function () {
            /** @type {?} */
            var fakeLayerDirective = {
                Id: _this._id,
                Visible: _this.Visible,
                LayerOffset: _this.LayerOffset,
                ZIndex: _this.ZIndex
            };
            _this._layerService.AddLayer(fakeLayerDirective);
            _this._layerPromise = _this._layerService.GetNativeLayer(fakeLayerDirective);
            Promise.all([
                _this._layerPromise,
                _this._mapService.CreateCanvasOverlay(function (el) { return _this.DrawLabels(el); })
            ]).then(function (values) {
                values[0].SetVisible(_this.Visible);
                _this._canvas = values[1];
                _this._canvas._canvasReady.then(function (b) {
                    _this._tooltip = _this._canvas.GetToolTipOverlay();
                    _this.ManageTooltip(_this.ShowTooltips);
                });
                if (_this.PolylineOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolylines(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineLayerDirective
     * @return {?}
     */
    function () {
        this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._layerPromise.then(function (l) {
            l.Delete();
        });
        if (this._canvas) {
            this._canvas.Delete();
        }
    };
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolylineOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolylines();
            });
        }
        if (changes['Visible'] && !changes['Visible'].firstChange) {
            this._layerPromise.then(function (l) { return l.SetVisible(_this.Visible); });
        }
        if ((changes['ZIndex'] && !changes['ZIndex'].firstChange) ||
            (changes['LayerOffset'] && !changes['LayerOffset'].firstChange)) {
            throw (new Error('You cannot change ZIndex or LayerOffset after the layer has been created.'));
        }
        if ((changes['ShowLabels'] && !changes['ShowLabels'].firstChange) ||
            (changes['LabelMinZoom'] && !changes['LabelMinZoom'].firstChange) ||
            (changes['LabelMaxZoom'] && !changes['LabelMaxZoom'].firstChange)) {
            if (this._canvas) {
                this._canvas.Redraw(true);
            }
        }
        if (changes['ShowTooltips'] && this._tooltip) {
            this.ManageTooltip(changes['ShowTooltips'].currentValue);
        }
    };
    /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    MapPolylineLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Layer Id.
     * \@memberof MapPolylineLayerDirective
     * @return {?} - string representation of the layer id.
     */
    function () { return 'MapPolylineLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} p - the polyline for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.PolylineClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolylineDblClick.emit({ Polyline: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolylineMouseMove.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolylineMouseOut.emit({ Polyline: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolylineMouseOver.emit({ Polyline: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawLabels = /**
     * Draws the polyline labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolylineLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    function (el) {
        var _this = this;
        if (this.ShowLabels) {
            this._mapService.GetZoom().then(function (z) {
                if (_this.LabelMinZoom <= z && _this.LabelMaxZoom >= z) {
                    /** @type {?} */
                    var ctx_1 = el.getContext('2d');
                    /** @type {?} */
                    var labels_1 = _this._labels.map(function (x) { return x.title; });
                    _this._mapService.LocationsToPoints(_this._labels.map(function (x) { return x.loc; })).then(function (locs) {
                        /** @type {?} */
                        var size = _this._mapService.MapSize;
                        for (var i = 0, len = locs.length; i < len; i++) {
                            // Don't draw the point if it is not in view. This greatly improves performance when zoomed in.
                            if (locs[i].x >= 0 && locs[i].y >= 0 && locs[i].x <= size.width && locs[i].y <= size.height) {
                                _this.DrawText(ctx_1, locs[i], labels_1[i]);
                            }
                        }
                    });
                }
            });
        }
    };
    /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.DrawText = /**
     * Draws the label text at the appropriate place on the canvas.
     * @param {?} ctx - Canvas drawing context.
     * @param {?} loc - Pixel location on the canvas where to center the text.
     * @param {?} text - Text to draw.
     * @return {?}
     */
    function (ctx, loc, text) {
        /** @type {?} */
        var lo = this.LabelOptions;
        if (lo == null && this._tooltip) {
            lo = this._tooltip.DefaultLabelStyle;
        }
        if (lo == null) {
            lo = this._defaultOptions;
        }
        ctx.strokeStyle = lo.strokeColor;
        ctx.font = lo.fontSize + "px " + lo.fontFamily;
        ctx.textAlign = 'center';
        /** @type {?} */
        var strokeWeight = lo.strokeWeight;
        if (text && strokeWeight && strokeWeight > 0) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(text, loc.x, loc.y);
        }
        ctx.fillStyle = lo.fontColor;
        ctx.fillText(text, loc.x, loc.y);
    };
    /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.ManageTooltip = /**
     * Manages the tooltip and the attachment of the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} show - True to enable the tooltip, false to disable.
     * @return {?}
     */
    function (show) {
        var _this = this;
        if (show && this._canvas) {
            // add tooltip subscriptions
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
            this._tooltipSubscriptions.push(this.PolylineMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOver.asObservable().subscribe(function (e) {
                if (e.Polyline.Title && e.Polyline.Title.length > 0) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polyline.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolylineMouseOut.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    _this._tooltip.Set('hidden', true);
                    _this._tooltipVisible = false;
                }
            }));
        }
        else {
            // remove tooltip subscriptions
            this._tooltipSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            this._tooltipSubscriptions.splice(0);
            this._tooltip.Set('hidden', true);
            this._tooltipVisible = false;
        }
    };
    /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    MapPolylineLayerDirective.prototype.UpdatePolylines = /**
     * Sets or updates the polyliness based on the polyline options. This will place the polylines on the map
     * and register the associated events.
     *
     * \@memberof MapPolylineLayerDirective
     * \@method
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._layerPromise == null) {
            return;
        }
        this._layerPromise.then(function (l) {
            /** @type {?} */
            var polylines = _this._streaming ? _this._polylinesLast.splice(0) : _this._polylines;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            /** @type {?} */
            var lp = _this._service.CreatePolylines(l.GetOptions().id, polylines);
            // set polylines once promises are fullfilled.
            lp.then(function (p) {
                /** @type {?} */
                var y = new Array();
                p.forEach(function (poly) {
                    if (Array.isArray(poly)) {
                        /** @type {?} */
                        var title_1 = '';
                        /** @type {?} */
                        var centroids_1 = new Array();
                        poly.forEach(function (x) {
                            y.push(x);
                            _this.AddEventListeners(x);
                            centroids_1.push(x.Centroid);
                            if (x.Title != null && x.Title.length > 0 && title_1.length === 0) {
                                title_1 = x.Title;
                            }
                        });
                        _this._labels.push({ loc: Polyline.GetPolylineCentroid(centroids_1), title: title_1 });
                    }
                    else {
                        y.push(poly);
                        if (poly.Title != null && poly.Title.length > 0) {
                            _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                        }
                        _this.AddEventListeners(poly);
                    }
                });
                _this._streaming ? l.AddEntities(y) : l.SetEntities(y);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolylineLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polyline-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolylineLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolylineLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolylineOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolylineOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolylineClick: [{ type: Output }],
        PolylineDblClick: [{ type: Output }],
        PolylineMouseMove: [{ type: Output }],
        PolylineMouseOut: [{ type: Output }],
        PolylineMouseOver: [{ type: Output }]
    };
    return MapPolylineLayerDirective;
}());
export { MapPolylineLayerDirective };
if (false) {
    /** @type {?} */
    MapPolylineLayerDirective.prototype._id;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._service;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylines;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._polylinesLast;
    /**
     * Set the maximum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polyline labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polyline labels.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polylines titles as the labels on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polylines as the tooltips on the polylines.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseMove;
    /**
     * This event is fired on mouseout on a polyline in the layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOut;
    /**
     * This event is fired on mouseover on a polyline in a layer.
     *
     * \@memberof MapPolylineLayerDirective
     * @type {?}
     */
    MapPolylineLayerDirective.prototype.PolylineMouseOver;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolylineLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBZ0IsS0FBSyxFQUFFLE1BQU0sRUFDdEMsWUFBWSxFQUFvRCxNQUFNLEVBRXpFLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBTzlDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNExsQixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxtQ0FDWSxlQUNBLGFBQ0E7UUFGQSxrQkFBYSxHQUFiLGFBQWE7UUFDYixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzt1QkFuS3dDLElBQUksS0FBSyxFQUFrQztxQ0FFL0MsSUFBSSxLQUFLLEVBQWdCOytCQUMzQyxLQUFLOytCQUNDO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLFlBQVk7WUFDeEIsWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsU0FBUztTQUN2QjswQkFDNkIsS0FBSzswQkFDVyxJQUFJLEtBQUssRUFBb0I7OEJBQ3pCLElBQUksS0FBSyxFQUFvQjs7Ozs7NEJBTXhDLE1BQU0sQ0FBQyxnQkFBZ0I7Ozs7OzRCQU12QixDQUFDLENBQUM7Ozs7OzsyQkFjSCxJQUFJOzs7Ozs7MEJBd0JKLEtBQUs7Ozs7Ozs0QkFPSCxJQUFJOzs7Ozs7c0JBd0JY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LENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQUU7YUFDL0QsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Z0JBOWFWLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNuQzs7OztnQkF2Q1EsWUFBWTtnQkFDWixVQUFVO2dCQVppRCxNQUFNOzs7K0JBK0VyRSxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzs4QkFPTCxLQUFLO2tDQU9MLEtBQUs7NkJBaUJMLEtBQUs7K0JBT0wsS0FBSztrREFRTCxLQUFLOzBCQVNMLEtBQUs7eUJBT0wsS0FBSztnQ0FXTCxNQUFNO21DQU9OLE1BQU07b0NBT04sTUFBTTttQ0FPTixNQUFNO29DQU9OLE1BQU07O29DQW5NWDs7U0FxRGEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2x5bGluZUV2ZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWxpbmUtZXZlbnQnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxheWVyT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxheWVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSUxhYmVsT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhYmVsLW9wdGlvbnMnO1xuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGF5ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9tb2RlbHMvbGF5ZXInO1xuaW1wb3J0IHsgUG9seWxpbmUgfSBmcm9tICcuLi9tb2RlbHMvcG9seWxpbmUnO1xuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tb2RlbHMvbWFwLWxhYmVsJztcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xuXG4vKipcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgcG9seWxpbmVzLlxuICovXG5sZXQgbGF5ZXJJZCA9IDEwMDAwMDA7XG5cbi8qKlxuICogTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZSBwZXJmb3JtYW50bHkgcmVuZGVycyBhIGxhcmdlIHNldCBvZiBwb2x5bGluZSBvbiBhIHtAbGluayBNYXBDb21wb25lbnR9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge01hcENvbXBvbmVudH0gZnJvbSAnLi4uJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgLm1hcC1jb250YWluZXIge1xuICogICAgIGhlaWdodDogMzAwcHg7XG4gKiAgIH1cbiAqIGBdLFxuICogdGVtcGxhdGU6IGBcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cbiAqICAgICAgPHgtbWFwLXBvbHlsaW5lLWxheWVyIFtQb2x5Z29uT3B0aW9uc109XCJfcG9seWxpbmVcIj48L3gtbWFwLXBvbHlsaW5lLWxheWVyPlxuICogICA8L3gtbWFwPlxuICogYFxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5bGluZS1sYXllcidcbn0pXG5leHBvcnQgY2xhc3MgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2xheWVyUHJvbWlzZTogUHJvbWlzZTxMYXllcj47XG4gICAgcHJpdmF0ZSBfc2VydmljZTogTGF5ZXJTZXJ2aWNlO1xuICAgIHByaXZhdGUgX2NhbnZhczogQ2FudmFzT3ZlcmxheTtcbiAgICBwcml2YXRlIF9sYWJlbHM6IEFycmF5PHtsb2M6IElMYXRMb25nLCB0aXRsZTogc3RyaW5nfT4gPSBuZXcgQXJyYXk8e2xvYzogSUxhdExvbmcsIHRpdGxlOiBzdHJpbmd9PigpO1xuICAgIHByaXZhdGUgX3Rvb2x0aXA6IE1hcExhYmVsO1xuICAgIHByaXZhdGUgX3Rvb2x0aXBTdWJzY3JpcHRpb25zOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gbmV3IEFycmF5PFN1YnNjcmlwdGlvbj4oKTtcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBJTGFiZWxPcHRpb25zID0ge1xuICAgICAgICBmb250U2l6ZTogMTEsXG4gICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxuICAgICAgICBzdHJva2VDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBmb250Q29sb3I6ICcjZmZmZmZmJ1xuICAgIH07XG4gICAgcHJpdmF0ZSBfc3RyZWFtaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcG9seWxpbmVzOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWxpbmVPcHRpb25zPigpO1xuICAgIHByaXZhdGUgX3BvbHlsaW5lc0xhc3Q6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+ID0gbmV3IEFycmF5PElQb2x5bGluZU9wdGlvbnM+KCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWxpbmUgbGFiZWxzIGFyZSB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1heFpvb206IG51bWJlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlsaW5lIGxhYmVscyBhcmUgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNaW5ab29tOiBudW1iZXIgPSAtMTtcblxuICAgIC8qKlxuICAgICAqIFNlcGNpZmllcyBzdHlsZWluZyBvcHRpb25zIGZvciBvbi1tYXAgcG9seWxpbmUgbGFiZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxPcHRpb25zOiBJTGFiZWxPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXllck9mZnNldDogSVBvaW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIHBvbHlsaW5lIG9wdGlvbnMgcmVwcmVzZW50aW5nIHRoZSBwb2x5bGluZXMgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgICAgICBwdWJsaWMgZ2V0IFBvbHlsaW5lT3B0aW9ucygpOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPiB7IHJldHVybiB0aGlzLl9wb2x5bGluZXM7IH1cbiAgICAgICAgcHVibGljIHNldCBQb2x5bGluZU9wdGlvbnModmFsOiBBcnJheTxJUG9seWxpbmVPcHRpb25zPikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cmVhbWluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lc0xhc3QucHVzaCguLi52YWwuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lcy5wdXNoKC4uLnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2x5bGluZXMgPSB2YWwuc2xpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgcG9seWxpbmVzIHRpdGxlcyBhcyB0aGUgbGFiZWxzIG9uIHRoZSBwb2x5bGluZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93TGFiZWxzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHRpdGxlcyBvZiB0aGUgcG9seWxpbmVzIGFzIHRoZSB0b29sdGlwcyBvbiB0aGUgcG9seWxpbmVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd1Rvb2x0aXBzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgd2hldGhlciB0byB0cmVhdCBjaGFuZ2VzIGluIHRoZSBQb2x5bGluZU9wdGlvbnMgYXMgc3RyZWFtcyBvZiBuZXcgbWFya2Vycy4gSW4gdGhpcyBtb2RlLCBjaGFuZ2luZyB0aGVcbiAgICAgKiBBcnJheSBzdXBwbGllZCBpbiBQb2x5bGluZU9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBwb2x5bGluZXMgb24gdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICAgICAgcHVibGljIGdldCBUcmVhdE5ld1BvbHlsaW5lT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdQb2x5bGluZU9wdGlvbnNBc1N0cmVhbSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5fc3RyZWFtaW5nID0gdmFsOyB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXJrZXIgbGF5ZXJcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFZpc2libGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgdGhlIHotaW5kZXggb2YgdGhlIGxheWVyLiBJZiBub3QgdXNlZCwgbGF5ZXJzIGdldCBzdGFja2VkIGluIHRoZSBvcmRlciBjcmVhdGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLy8vXG4gICAgLy8vIERlbGVnYXRlc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIHBvbHlsaW5lIGluIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHB1YmxpYyBQb2x5bGluZUNsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgUG9seWxpbmVEYmxDbGljazogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gYSBwb2x5bGluZSBpbiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBQb2x5bGluZU1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3V0IG9uIGEgcG9seWxpbmUgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgUG9seWxpbmVNb3VzZU91dDogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3ZlciBvbiBhIHBvbHlsaW5lIGluIGEgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBQb2x5bGluZU1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cblxuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIHBvbHlsaW5lIGxheWVyLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gICAgLy8vXG4gICAgLy8vIENvbnN0cnVjdG9yXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmUuXG4gICAgICogQHBhcmFtIF9sYXllclNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTGF5ZXJTZXJ2aWNlfS5cbiAgICAgKiBAcGFyYW0gX21hcFNlcnZpY2UgLSBDb25jcmVhdGUgaW1wbGVtZW50YXRpb24gb2YgYSB7QGxpbmsgTWFwU2VydmljZX0uXG4gICAgICogQHBhcmFtIF96b25lIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE5nWm9uZX0gc2VydmljZS5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBjb25zdCBsYXllck9wdGlvbnM6IElMYXllck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5faWRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmYWtlTGF5ZXJEaXJlY3RpdmU6IGFueSA9IHtcbiAgICAgICAgICAgICAgICBJZCA6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFZpc2libGU6IHRoaXMuVmlzaWJsZSxcbiAgICAgICAgICAgICAgICBMYXllck9mZnNldDogdGhpcy5MYXllck9mZnNldCxcbiAgICAgICAgICAgICAgICBaSW5kZXg6IHRoaXMuWkluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXJTZXJ2aWNlLkFkZExheWVyKGZha2VMYXllckRpcmVjdGl2ZSk7XG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UgPSB0aGlzLl9sYXllclNlcnZpY2UuR2V0TmF0aXZlTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlQ2FudmFzT3ZlcmxheShlbCA9PiB0aGlzLkRyYXdMYWJlbHMoZWwpKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzWzBdLlNldFZpc2libGUodGhpcy5WaXNpYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWVzWzFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuX2NhbnZhc1JlYWR5LnRoZW4oYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gdGhpcy5fY2FudmFzLkdldFRvb2xUaXBPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAodGhpcy5TaG93VG9vbHRpcHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUG9seWxpbmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuVXBkYXRlUG9seWxpbmVzKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdGhpcy5fbGF5ZXJTZXJ2aWNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgbC5EZWxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLkRlbGV0ZSgpOyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhY3RzIHRvIGNoYW5nZXMgaW4gZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIHRoZSBjb21wb25lbnQgYW5kIGFjdHVhdGVzIHByb3BlcnR5IGNoYW5nZXMgaW4gdGhlIHVuZGVybGluZyBsYXllciBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0gY29sbGVjdGlvbiBvZiBjaGFuZ2VzLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1BvbHlsaW5lT3B0aW9ucyddKSB7XG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZVBvbHlsaW5lcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Zpc2libGUnXSAmJiAhY2hhbmdlc1snVmlzaWJsZSddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IGwuU2V0VmlzaWJsZSh0aGlzLlZpc2libGUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGNoYW5nZXNbJ1pJbmRleCddICYmICFjaGFuZ2VzWydaSW5kZXgnXS5maXJzdENoYW5nZSkgfHxcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYXllck9mZnNldCddICYmICFjaGFuZ2VzWydMYXllck9mZnNldCddLmZpcnN0Q2hhbmdlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IChuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgY2hhbmdlIFpJbmRleCBvciBMYXllck9mZnNldCBhZnRlciB0aGUgbGF5ZXIgaGFzIGJlZW4gY3JlYXRlZC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFuZ2VzWydTaG93TGFiZWxzJ10gJiYgIWNoYW5nZXNbJ1Nob3dMYWJlbHMnXS5maXJzdENoYW5nZSkgfHxcbiAgICAgICAgICAgIChjaGFuZ2VzWydMYWJlbE1pblpvb20nXSAmJiAhY2hhbmdlc1snTGFiZWxNaW5ab29tJ10uZmlyc3RDaGFuZ2UpIHx8XG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNYXhab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddLmZpcnN0Q2hhbmdlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuUmVkcmF3KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93VG9vbHRpcHMnXSAmJiB0aGlzLl90b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoY2hhbmdlc1snU2hvd1Rvb2x0aXBzJ10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIExheWVyIElkLlxuICAgICAqIEByZXR1cm5zIC0gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBsYXllciBpZC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ01hcFBvbHlsaW5lTGF5ZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdmFyaW91cyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwb2x5bGluZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcCAtIHRoZSBwb2x5bGluZSBmb3Igd2hpY2ggdG8gYWRkIHRoZSBldmVudC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycyhwOiBQb2x5bGluZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lQ2xpY2suZW1pdCh7UG9seWxpbmU6IHAsIENsaWNrOiBldn0pIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZURibENsaWNrLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlsaW5lTW91c2VNb3ZlLmVtaXQoe1BvbHlsaW5lOiBwLCBDbGljazogZXZ9KSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUG9seWxpbmVNb3VzZU91dC5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5bGluZU1vdXNlT3Zlci5lbWl0KHtQb2x5bGluZTogcCwgQ2xpY2s6IGV2fSkgfVxuICAgICAgICBdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHAuQWRkTGlzdGVuZXIob2JqLm5hbWUsIG9iai5oYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIHBvbHlsaW5lIGxhYmVscy4gQ2FsbGVkIGJ5IHRoZSBDYW52YXMgb3ZlcmxheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbCAtIFRoZSBjYW52YXMgb24gd2hpY2ggdG8gZHJhdyB0aGUgbGFiZWxzLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZUxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBEcmF3TGFiZWxzKGVsOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5TaG93TGFiZWxzKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkdldFpvb20oKS50aGVuKHogPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLkxhYmVsTWluWm9vbSA8PSB6ICYmIHRoaXMuTGFiZWxNYXhab29tID49IHopIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBlbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbHMgPSB0aGlzLl9sYWJlbHMubWFwKHggPT4geC50aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuTG9jYXRpb25zVG9Qb2ludHModGhpcy5fbGFiZWxzLm1hcCh4ID0+IHgubG9jKSkudGhlbihsb2NzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemU6IElTaXplID0gdGhpcy5fbWFwU2VydmljZS5NYXBTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxvY3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBkcmF3IHRoZSBwb2ludCBpZiBpdCBpcyBub3QgaW4gdmlldy4gVGhpcyBncmVhdGx5IGltcHJvdmVzIHBlcmZvcm1hbmNlIHdoZW4gem9vbWVkIGluLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NzW2ldLnggPj0gMCAmJiBsb2NzW2ldLnkgPj0gMCAmJiBsb2NzW2ldLnggPD0gc2l6ZS53aWR0aCAmJiBsb2NzW2ldLnkgPD0gc2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EcmF3VGV4dChjdHgsIGxvY3NbaV0sIGxhYmVsc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIHRoZSBsYWJlbCB0ZXh0IGF0IHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBvbiB0aGUgY2FudmFzLlxuICAgICAqIEBwYXJhbSBjdHggLSBDYW52YXMgZHJhd2luZyBjb250ZXh0LlxuICAgICAqIEBwYXJhbSBsb2MgLSBQaXhlbCBsb2NhdGlvbiBvbiB0aGUgY2FudmFzIHdoZXJlIHRvIGNlbnRlciB0aGUgdGV4dC5cbiAgICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gZHJhdy5cbiAgICAgKi9cbiAgICBwcml2YXRlIERyYXdUZXh0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBsb2M6IElQb2ludCwgdGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBsbzogSUxhYmVsT3B0aW9ucyA9IHRoaXMuTGFiZWxPcHRpb25zO1xuICAgICAgICBpZiAobG8gPT0gbnVsbCAmJiB0aGlzLl90b29sdGlwKSB7IGxvID0gdGhpcy5fdG9vbHRpcC5EZWZhdWx0TGFiZWxTdHlsZTsgfVxuICAgICAgICBpZiAobG8gPT0gbnVsbCkgeyBsbyA9IHRoaXMuX2RlZmF1bHRPcHRpb25zOyB9XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbG8uc3Ryb2tlQ29sb3I7XG4gICAgICAgIGN0eC5mb250ID0gYCR7bG8uZm9udFNpemV9cHggJHtsby5mb250RmFtaWx5fWA7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29uc3Qgc3Ryb2tlV2VpZ2h0OiBudW1iZXIgPSBsby5zdHJva2VXZWlnaHQ7XG4gICAgICAgIGlmICh0ZXh0ICYmIHN0cm9rZVdlaWdodCAmJiBzdHJva2VXZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0cm9rZVdlaWdodDtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBsby5mb250Q29sb3I7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBsb2MueCwgbG9jLnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hbmFnZXMgdGhlIHRvb2x0aXAgYW5kIHRoZSBhdHRhY2htZW50IG9mIHRoZSBhc3NvY2lhdGVkIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaG93IC0gVHJ1ZSB0byBlbmFibGUgdGhlIHRvb2x0aXAsIGZhbHNlIHRvIGRpc2FibGUuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcChzaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChzaG93ICYmIHRoaXMuX2NhbnZhcykge1xuICAgICAgICAgICAgLy8gYWRkIHRvb2x0aXAgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5bGluZU1vdXNlTW92ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLl9jYW52YXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZS5DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlsaW5lTW91c2VPdmVyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5Qb2x5bGluZS5UaXRsZSAmJiBlLlBvbHlsaW5lLlRpdGxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuX2NhbnZhcy5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlLkNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3RleHQnLCBlLlBvbHlsaW5lLlRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgbG9jKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnB1c2godGhpcy5Qb2x5bGluZU1vdXNlT3V0LmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0b29sdGlwIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMuc3BsaWNlKDApO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ2hpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgb3IgdXBkYXRlcyB0aGUgcG9seWxpbmVzcyBiYXNlZCBvbiB0aGUgcG9seWxpbmUgb3B0aW9ucy4gVGhpcyB3aWxsIHBsYWNlIHRoZSBwb2x5bGluZXMgb24gdGhlIG1hcFxuICAgICAqIGFuZCByZWdpc3RlciB0aGUgYXNzb2NpYXRlZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVMYXllckRpcmVjdGl2ZVxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwcml2YXRlIFVwZGF0ZVBvbHlsaW5lcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyUHJvbWlzZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb2x5bGluZXM6IEFycmF5PElQb2x5bGluZU9wdGlvbnM+ID0gdGhpcy5fc3RyZWFtaW5nID8gdGhpcy5fcG9seWxpbmVzTGFzdC5zcGxpY2UoMCkgOiB0aGlzLl9wb2x5bGluZXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbWluZykgeyB0aGlzLl9sYWJlbHMuc3BsaWNlKDApOyB9XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgcG9seWxpbmVzXG4gICAgICAgICAgICBjb25zdCBscDogUHJvbWlzZTxBcnJheTxQb2x5bGluZXxBcnJheTxQb2x5bGluZT4+PiA9IHRoaXMuX3NlcnZpY2UuQ3JlYXRlUG9seWxpbmVzKGwuR2V0T3B0aW9ucygpLmlkLCBwb2x5bGluZXMpO1xuXG4gICAgICAgICAgICAvLyBzZXQgcG9seWxpbmVzIG9uY2UgcHJvbWlzZXMgYXJlIGZ1bGxmaWxsZWQuXG4gICAgICAgICAgICBscC50aGVuKHAgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHk6IEFycmF5PFBvbHlsaW5lPiA9IG5ldyBBcnJheTxQb2x5bGluZT4oKTtcbiAgICAgICAgICAgICAgICBwLmZvckVhY2gocG9seSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBvbHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VudHJvaWRzOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5LmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudHJvaWRzLnB1c2goeC5DZW50cm9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHguVGl0bGUgIT0gbnVsbCAmJiB4LlRpdGxlLmxlbmd0aCA+IDAgJiYgdGl0bGUubGVuZ3RoID09PSAwKSB7IHRpdGxlID0geC5UaXRsZTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbHMucHVzaCh7bG9jOiBQb2x5bGluZS5HZXRQb2x5bGluZUNlbnRyb2lkKGNlbnRyb2lkcyksIHRpdGxlOiB0aXRsZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgeS5wdXNoKHBvbHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvbHkuVGl0bGUgIT0gbnVsbCAmJiBwb2x5LlRpdGxlLmxlbmd0aCA+IDApIHsgdGhpcy5fbGFiZWxzLnB1c2goe2xvYzogcG9seS5DZW50cm9pZCwgdGl0bGU6IHBvbHkuVGl0bGV9KTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhwb2x5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmVhbWluZyA/IGwuQWRkRW50aXRpZXMoeSkgOiBsLlNldEVudGl0aWVzKHkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW52YXMpIHsgdGhpcy5fY2FudmFzLlJlZHJhdyghdGhpcy5fc3RyZWFtaW5nKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19