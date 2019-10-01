/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
/** *
 * internal counter to use as ids for polygons.
  @type {?} */
var layerId = 1000000;
/**
 * MapPolygonLayerDirective performantly renders a large set of polygons on a {\@link MapComponent}.
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
 *      <x-map-polygon-layer [PolygonOptions]="_polygons"></x-map-polygon-layer>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
var MapPolygonLayerDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolygonLayerDirective.
     * @param _layerService - Concreate implementation of a {@link LayerService}.
     * @param _mapService - Concreate implementation of a {@link MapService}.
     * @param _zone - Concreate implementation of a {@link NgZone} service.
     * @memberof MapPolygonLayerDirective
     */
    function MapPolygonLayerDirective(_layerService, _mapService, _zone) {
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
        this._polygons = new Array();
        this._polygonsLast = new Array();
        /**
         * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMaxZoom = Number.MAX_SAFE_INTEGER;
        /**
         * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
         * \@memberof MapPolygonLayerDirective
         */
        this.LabelMinZoom = -1;
        /**
         * Gets or sets An offset applied to the positioning of the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.LayerOffset = null;
        /**
         * Whether to show the polygon titles as the labels on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowLabels = false;
        /**
         * Whether to show the titles of the polygosn as the tooltips on the polygons.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ShowTooltips = true;
        /**
         * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.ZIndex = 0;
        /**
         * This event emitter gets emitted when the user clicks a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonDblClick = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseMove = new EventEmitter();
        /**
         * This event is fired on mouseout on a polygon in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOut = new EventEmitter();
        /**
         * This event is fired on mouseover on a polygon in a layer.
         *
         * \@memberof MapPolygonLayerDirective
         */
        this.PolygonMouseOver = new EventEmitter();
        this._id = layerId++;
    }
    Object.defineProperty(MapPolygonLayerDirective.prototype, "PolygonOptions", {
        /**
         * An array of polygon options representing the polygons in the layer.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * An array of polygon options representing the polygons in the layer.
         *
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._polygons; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._streaming) {
                (_a = this._polygonsLast).push.apply(_a, tslib_1.__spread(val.slice(0)));
                (_b = this._polygons).push.apply(_b, tslib_1.__spread(val));
            }
            else {
                this._polygons = val.slice(0);
            }
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonLayerDirective.prototype, "TreatNewPolygonOptionsAsStream", {
        /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * @memberof MapPolygonLayerDirective
         */
        get: /**
         * Sets whether to treat changes in the PolygonOptions as streams of new markers. In this mode, changing the
         * Array supplied in PolygonOptions will be incrementally drawn on the map as opposed to replace the polygons on the map.
         *
         * \@memberof MapPolygonLayerDirective
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
    Object.defineProperty(MapPolygonLayerDirective.prototype, "Id", {
        get: /**
         * Gets the id of the marker layer.
         *
         * \@readonly
         * \@memberof MapPolygonLayerDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngAfterContentInit = /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
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
                if (_this.PolygonOptions) {
                    _this._zone.runOutsideAngular(function () { return _this.UpdatePolygons(); });
                }
            });
            _this._service = _this._layerService;
        });
    };
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnDestroy = /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonLayerDirective
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
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.ngOnChanges = /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} changes - collection of changes.
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['PolygonOptions']) {
            this._zone.runOutsideAngular(function () {
                _this.UpdatePolygons();
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
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    MapPolygonLayerDirective.prototype.toString = /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapPolygonLayerDirective
     * @return {?} - string representation of the marker id.
     */
    function () { return 'MapPolygonLayer-' + this._id.toString(); };
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.AddEventListeners = /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} p - the polygon for which to add the event.
     *
     * @return {?}
     */
    function (p) {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.PolygonClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'dblclick', handler: function (ev) { return _this.PolygonDblClick.emit({ Polygon: p, Click: ev }); } },
            { name: 'mousemove', handler: function (ev) { return _this.PolygonMouseMove.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseout', handler: function (ev) { return _this.PolygonMouseOut.emit({ Polygon: p, Click: ev }); } },
            { name: 'mouseover', handler: function (ev) { return _this.PolygonMouseOver.emit({ Polygon: p, Click: ev }); } }
        ];
        handlers.forEach(function (obj) { return p.AddListener(obj.name, obj.handler); });
    };
    /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
     * @param {?} el - The canvas on which to draw the labels.
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.DrawLabels = /**
     * Draws the polygon labels. Called by the Canvas overlay.
     *
     * \@memberof MapPolygonLayerDirective
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
    MapPolygonLayerDirective.prototype.DrawText = /**
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
    MapPolygonLayerDirective.prototype.ManageTooltip = /**
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
            this._tooltipSubscriptions.push(this.PolygonMouseMove.asObservable().subscribe(function (e) {
                if (_this._tooltipVisible) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('position', loc);
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOver.asObservable().subscribe(function (e) {
                if (e.Polygon.Title && e.Polygon.Title.length > 0) {
                    /** @type {?} */
                    var loc = _this._canvas.GetCoordinatesFromClick(e.Click);
                    _this._tooltip.Set('text', e.Polygon.Title);
                    _this._tooltip.Set('position', loc);
                    if (!_this._tooltipVisible) {
                        _this._tooltip.Set('hidden', false);
                        _this._tooltipVisible = true;
                    }
                }
            }));
            this._tooltipSubscriptions.push(this.PolygonMouseOut.asObservable().subscribe(function (e) {
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
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
     * \@method
     * @return {?}
     */
    MapPolygonLayerDirective.prototype.UpdatePolygons = /**
     * Sets or updates the polygons based on the polygon options. This will place the polygons on the map
     * and register the associated events.
     *
     * \@memberof MapPolygonLayerDirective
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
            var polygons = _this._streaming ? _this._polygonsLast.splice(0) : _this._polygons;
            if (!_this._streaming) {
                _this._labels.splice(0);
            }
            /** @type {?} */
            var lp = _this._service.CreatePolygons(l.GetOptions().id, polygons);
            // set markers once promises are fullfilled.
            lp.then(function (p) {
                p.forEach(function (poly) {
                    if (poly.Title != null && poly.Title.length > 0) {
                        _this._labels.push({ loc: poly.Centroid, title: poly.Title });
                    }
                    _this.AddEventListeners(poly);
                });
                _this._streaming ? l.AddEntities(p) : l.SetEntities(p);
                if (_this._canvas) {
                    _this._canvas.Redraw(!_this._streaming);
                }
            });
        });
    };
    MapPolygonLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polygon-layer'
                },] },
    ];
    /** @nocollapse */
    MapPolygonLayerDirective.ctorParameters = function () { return [
        { type: LayerService },
        { type: MapService },
        { type: NgZone }
    ]; };
    MapPolygonLayerDirective.propDecorators = {
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        LabelOptions: [{ type: Input }],
        LayerOffset: [{ type: Input }],
        PolygonOptions: [{ type: Input }],
        ShowLabels: [{ type: Input }],
        ShowTooltips: [{ type: Input }],
        TreatNewPolygonOptionsAsStream: [{ type: Input }],
        Visible: [{ type: Input }],
        ZIndex: [{ type: Input }],
        PolygonClick: [{ type: Output }],
        PolygonDblClick: [{ type: Output }],
        PolygonMouseMove: [{ type: Output }],
        PolygonMouseOut: [{ type: Output }],
        PolygonMouseOver: [{ type: Output }]
    };
    return MapPolygonLayerDirective;
}());
export { MapPolygonLayerDirective };
if (false) {
    /** @type {?} */
    MapPolygonLayerDirective.prototype._id;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerPromise;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._service;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._canvas;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._labels;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltip;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipSubscriptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._tooltipVisible;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._defaultOptions;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._streaming;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygons;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._polygonsLast;
    /**
     * Set the maximum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polygon labels are visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelMinZoom;
    /**
     * Sepcifies styleing options for on-map polygon labels.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LabelOptions;
    /**
     * Gets or sets An offset applied to the positioning of the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.LayerOffset;
    /**
     * Whether to show the polygon titles as the labels on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowLabels;
    /**
     * Whether to show the titles of the polygosn as the tooltips on the polygons.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ShowTooltips;
    /**
     * Sets the visibility of the marker layer
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.Visible;
    /**
     * Gets or sets the z-index of the layer. If not used, layers get stacked in the order created.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.ZIndex;
    /**
     * This event emitter gets emitted when the user clicks a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonClick;
    /**
     * This event is fired when the DOM dblclick event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonDblClick;
    /**
     * This event is fired when the DOM mousemove event is fired on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseMove;
    /**
     * This event is fired on mouseout on a polygon in the layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOut;
    /**
     * This event is fired on mouseover on a polygon in a layer.
     *
     * \@memberof MapPolygonLayerDirective
     * @type {?}
     */
    MapPolygonLayerDirective.prototype.PolygonMouseOver;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._layerService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._mapService;
    /** @type {?} */
    MapPolygonLayerDirective.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24tbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBb0QsTUFBTSxFQUV6RSxNQUFNLGVBQWUsQ0FBQztBQVN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBU3JELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNExsQixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7O09BTUc7SUFDSCxrQ0FDWSxlQUNBLGFBQ0E7UUFGQSxrQkFBYSxHQUFiLGFBQWE7UUFDYixnQkFBVyxHQUFYLFdBQVc7UUFDWCxVQUFLLEdBQUwsS0FBSzt1QkFuS3dDLElBQUksS0FBSyxFQUFrQztxQ0FFL0MsSUFBSSxLQUFLLEVBQWdCOytCQUMzQyxLQUFLOytCQUNDO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLFlBQVk7WUFDeEIsWUFBWSxFQUFFLENBQUM7WUFDZixXQUFXLEVBQUUsU0FBUztZQUN0QixTQUFTLEVBQUUsU0FBUztTQUN2QjswQkFDNkIsS0FBSzt5QkFDUyxJQUFJLEtBQUssRUFBbUI7NkJBQ3hCLElBQUksS0FBSyxFQUFtQjs7Ozs7NEJBTXJDLE1BQU0sQ0FBQyxnQkFBZ0I7Ozs7OzRCQU12QixDQUFDLENBQUM7Ozs7OzsyQkFjSCxJQUFJOzs7Ozs7MEJBd0JKLEtBQUs7Ozs7Ozs0QkFPSCxJQUFJOzs7Ozs7c0JBd0JYLENBQUM7Ozs7Ozs0QkFXMkIsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7K0JBT3JD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QVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQUU7YUFDL0QsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDOzs7Z0JBL1pWLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO2lCQUNsQzs7OztnQkF2Q1EsWUFBWTtnQkFDWixVQUFVO2dCQVppRCxNQUFNOzs7K0JBK0VyRSxLQUFLOytCQU1MLEtBQUs7K0JBT0wsS0FBSzs4QkFPTCxLQUFLO2lDQU9MLEtBQUs7NkJBaUJMLEtBQUs7K0JBT0wsS0FBSztpREFRTCxLQUFLOzBCQVNMLEtBQUs7eUJBT0wsS0FBSzsrQkFXTCxNQUFNO2tDQU9OLE1BQU07bUNBT04sTUFBTTtrQ0FPTixNQUFNO21DQU9OLE1BQU07O21DQW5NWDs7U0FxRGEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIFNpbXBsZUNoYW5nZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsXG4gICAgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcbmltcG9ydCB7IElQb2x5Z29uT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTGFiZWxPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGFiZWwtb3B0aW9ucyc7XG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9sYXllci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL21vZGVscy9sYXllcic7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi4vbW9kZWxzL3BvbHlnb24nO1xuaW1wb3J0IHsgTWFwTGFiZWwgfSBmcm9tICcuLi9tb2RlbHMvbWFwLWxhYmVsJztcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9tb2RlbHMvY2FudmFzLW92ZXJsYXknO1xuXG4vKipcbiAqIGludGVybmFsIGNvdW50ZXIgdG8gdXNlIGFzIGlkcyBmb3IgcG9seWdvbnMuXG4gKi9cbmxldCBsYXllcklkID0gMTAwMDAwMDtcblxuLyoqXG4gKiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmUgcGVyZm9ybWFudGx5IHJlbmRlcnMgYSBsYXJnZSBzZXQgb2YgcG9seWdvbnMgb24gYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnR9IGZyb20gJy4uLic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICB9XG4gKiBgXSxcbiAqIHRlbXBsYXRlOiBgXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDx4LW1hcC1wb2x5Z29uLWxheWVyIFtQb2x5Z29uT3B0aW9uc109XCJfcG9seWdvbnNcIj48L3gtbWFwLXBvbHlnb24tbGF5ZXI+XG4gKiAgIDwveC1tYXA+XG4gKiBgXG4gKiB9KVxuICogYGBgXG4gKlxuICogQGV4cG9ydFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3gtbWFwLXBvbHlnb24tbGF5ZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2xheWVyUHJvbWlzZTogUHJvbWlzZTxMYXllcj47XG4gICAgcHJpdmF0ZSBfc2VydmljZTogTGF5ZXJTZXJ2aWNlO1xuICAgIHByaXZhdGUgX2NhbnZhczogQ2FudmFzT3ZlcmxheTtcbiAgICBwcml2YXRlIF9sYWJlbHM6IEFycmF5PHtsb2M6IElMYXRMb25nLCB0aXRsZTogc3RyaW5nfT4gPSBuZXcgQXJyYXk8e2xvYzogSUxhdExvbmcsIHRpdGxlOiBzdHJpbmd9PigpO1xuICAgIHByaXZhdGUgX3Rvb2x0aXA6IE1hcExhYmVsO1xuICAgIHByaXZhdGUgX3Rvb2x0aXBTdWJzY3JpcHRpb25zOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gbmV3IEFycmF5PFN1YnNjcmlwdGlvbj4oKTtcbiAgICBwcml2YXRlIF90b29sdGlwVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBJTGFiZWxPcHRpb25zID0ge1xuICAgICAgICBmb250U2l6ZTogMTEsXG4gICAgICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiAyLFxuICAgICAgICBzdHJva2VDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBmb250Q29sb3I6ICcjZmZmZmZmJ1xuICAgIH07XG4gICAgcHJpdmF0ZSBfc3RyZWFtaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcG9seWdvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4gPSBuZXcgQXJyYXk8SVBvbHlnb25PcHRpb25zPigpO1xuICAgIHByaXZhdGUgX3BvbHlnb25zTGFzdDogQXJyYXk8SVBvbHlnb25PcHRpb25zPiA9IG5ldyBBcnJheTxJUG9seWdvbk9wdGlvbnM+KCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJlbHMgYXJlIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNYXhab29tOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5Z29uIGxhYmVscyBhcmUgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1pblpvb206IG51bWJlciA9IC0xO1xuXG4gICAgLyoqXG4gICAgICogU2VwY2lmaWVzIHN0eWxlaW5nIG9wdGlvbnMgZm9yIG9uLW1hcCBwb2x5Z29uIGxhYmVscy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxPcHRpb25zOiBJTGFiZWxPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIEFuIG9mZnNldCBhcHBsaWVkIHRvIHRoZSBwb3NpdGlvbmluZyBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIExheWVyT2Zmc2V0OiBJUG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgcG9seWdvbiBvcHRpb25zIHJlcHJlc2VudGluZyB0aGUgcG9seWdvbnMgaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgUG9seWdvbk9wdGlvbnMoKTogQXJyYXk8SVBvbHlnb25PcHRpb25zPiB7IHJldHVybiB0aGlzLl9wb2x5Z29uczsgfVxuICAgICAgICBwdWJsaWMgc2V0IFBvbHlnb25PcHRpb25zKHZhbDogQXJyYXk8SVBvbHlnb25PcHRpb25zPikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0cmVhbWluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbHlnb25zTGFzdC5wdXNoKC4uLnZhbC5zbGljZSgwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMucHVzaCguLi52YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9seWdvbnMgPSB2YWwuc2xpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgcG9seWdvbiB0aXRsZXMgYXMgdGhlIGxhYmVscyBvbiB0aGUgcG9seWdvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFNob3dMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGVzIG9mIHRoZSBwb2x5Z29zbiBhcyB0aGUgdG9vbHRpcHMgb24gdGhlIHBvbHlnb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93VG9vbHRpcHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRvIHRyZWF0IGNoYW5nZXMgaW4gdGhlIFBvbHlnb25PcHRpb25zIGFzIHN0cmVhbXMgb2YgbmV3IG1hcmtlcnMuIEluIHRoaXMgbW9kZSwgY2hhbmdpbmcgdGhlXG4gICAgICogQXJyYXkgc3VwcGxpZWQgaW4gUG9seWdvbk9wdGlvbnMgd2lsbCBiZSBpbmNyZW1lbnRhbGx5IGRyYXduIG9uIHRoZSBtYXAgYXMgb3Bwb3NlZCB0byByZXBsYWNlIHRoZSBwb2x5Z29ucyBvbiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgICAgIHB1YmxpYyBnZXQgVHJlYXROZXdQb2x5Z29uT3B0aW9uc0FzU3RyZWFtKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc3RyZWFtaW5nOyB9XG4gICAgICAgIHB1YmxpYyBzZXQgVHJlYXROZXdQb2x5Z29uT3B0aW9uc0FzU3RyZWFtKHZhbDogYm9vbGVhbikgeyB0aGlzLl9zdHJlYW1pbmcgPSB2YWw7IH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1hcmtlciBsYXllclxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB6LWluZGV4IG9mIHRoZSBsYXllci4gSWYgbm90IHVzZWQsIGxheWVycyBnZXQgc3RhY2tlZCBpbiB0aGUgb3JkZXIgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgLy8vXG4gICAgLy8vIERlbGVnYXRlc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBhIHBvbHlnb24gaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgUG9seWdvbkNsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiBhIHBvbHlnb24gaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBQb2x5Z29uRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiBhIHBvbHlnb24gaW4gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBQb2x5Z29uTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1vdXNlb3V0IG9uIGEgcG9seWdvbiBpbiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIFBvbHlnb25Nb3VzZU91dDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBtb3VzZW92ZXIgb24gYSBwb2x5Z29uIGluIGEgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIFBvbHlnb25Nb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuXG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgbWFya2VyIGxheWVyLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlLlxuICAgICAqIEBwYXJhbSBfbGF5ZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIExheWVyU2VydmljZX0uXG4gICAgICogQHBhcmFtIF9tYXBTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcFNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfem9uZSAtIENvbmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHtAbGluayBOZ1pvbmV9IHNlcnZpY2UuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9sYXllclNlcnZpY2U6IExheWVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgICAgIHRoaXMuX2lkID0gbGF5ZXJJZCsrO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGFmdGVyIENvbXBvbmVudCBjb250ZW50IGluaXRpYWxpemF0aW9uLiBQYXJ0IG9mIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGNvbnN0IGxheWVyT3B0aW9uczogSUxheWVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZha2VMYXllckRpcmVjdGl2ZTogYW55ID0ge1xuICAgICAgICAgICAgICAgIElkIDogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgVmlzaWJsZTogdGhpcy5WaXNpYmxlLFxuICAgICAgICAgICAgICAgIExheWVyT2Zmc2V0OiB0aGlzLkxheWVyT2Zmc2V0LFxuICAgICAgICAgICAgICAgIFpJbmRleDogdGhpcy5aSW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9sYXllclNlcnZpY2UuQWRkTGF5ZXIoZmFrZUxheWVyRGlyZWN0aXZlKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZSA9IHRoaXMuX2xheWVyU2VydmljZS5HZXROYXRpdmVMYXllcihmYWtlTGF5ZXJEaXJlY3RpdmUpO1xuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21hcFNlcnZpY2UuQ3JlYXRlQ2FudmFzT3ZlcmxheShlbCA9PiB0aGlzLkRyYXdMYWJlbHMoZWwpKVxuICAgICAgICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlc1swXS5TZXRWaXNpYmxlKHRoaXMuVmlzaWJsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzID0gdmFsdWVzWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5fY2FudmFzUmVhZHkudGhlbihiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IHRoaXMuX2NhbnZhcy5HZXRUb29sVGlwT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAodGhpcy5TaG93VG9vbHRpcHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLlBvbHlnb25PcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5VcGRhdGVQb2x5Z29ucygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UgPSB0aGlzLl9sYXllclNlcnZpY2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uIEZyZWVzIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgY29tcG9uZW50LiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9sYXllclByb21pc2UudGhlbihsID0+IHtcbiAgICAgICAgICAgIGwuRGVsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5EZWxldGUoKTsgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWN0cyB0byBjaGFuZ2VzIGluIGRhdGEtYm91bmQgcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50IGFuZCBhY3R1YXRlcyBwcm9wZXJ0eSBjaGFuZ2VzIGluIHRoZSB1bmRlcmxpbmcgbGF5ZXIgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ1BvbHlnb25PcHRpb25zJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9seWdvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10gJiYgIWNoYW5nZXNbJ1Zpc2libGUnXS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQcm9taXNlLnRoZW4obCA9PiBsLlNldFZpc2libGUodGhpcy5WaXNpYmxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFuZ2VzWydaSW5kZXgnXSAmJiAhY2hhbmdlc1snWkluZGV4J10uZmlyc3RDaGFuZ2UpIHx8XG4gICAgICAgICAgICAoY2hhbmdlc1snTGF5ZXJPZmZzZXQnXSAmJiAhY2hhbmdlc1snTGF5ZXJPZmZzZXQnXS5maXJzdENoYW5nZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdZb3UgY2Fubm90IGNoYW5nZSBaSW5kZXggb3IgTGF5ZXJPZmZzZXQgYWZ0ZXIgdGhlIGxheWVyIGhhcyBiZWVuIGNyZWF0ZWQuJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoY2hhbmdlc1snU2hvd0xhYmVscyddICYmICFjaGFuZ2VzWydTaG93TGFiZWxzJ10uZmlyc3RDaGFuZ2UpIHx8XG4gICAgICAgICAgICAoY2hhbmdlc1snTGFiZWxNaW5ab29tJ10gJiYgIWNoYW5nZXNbJ0xhYmVsTWluWm9vbSddLmZpcnN0Q2hhbmdlKSB8fFxuICAgICAgICAgICAgKGNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddICYmICFjaGFuZ2VzWydMYWJlbE1heFpvb20nXS5maXJzdENoYW5nZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzLlJlZHJhdyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU2hvd1Rvb2x0aXBzJ10gJiYgdGhpcy5fdG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKGNoYW5nZXNbJ1Nob3dUb29sdGlwcyddLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBNYXJrZXIgSWQuXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hcmtlciBpZC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwUG9seWdvbkxheWVyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHZhcmlvdXMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHAgLSB0aGUgcG9seWdvbiBmb3Igd2hpY2ggdG8gYWRkIHRoZSBldmVudC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKHA6IFBvbHlnb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Qb2x5Z29uQ2xpY2suZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25EYmxDbGljay5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25Nb3VzZU1vdmUuZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25Nb3VzZU91dC5lbWl0KHtQb2x5Z29uOiBwLCBDbGljazogZXZ9KSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLlBvbHlnb25Nb3VzZU92ZXIuZW1pdCh7UG9seWdvbjogcCwgQ2xpY2s6IGV2fSkgfVxuICAgICAgICBdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHAuQWRkTGlzdGVuZXIob2JqLm5hbWUsIG9iai5oYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgdGhlIHBvbHlnb24gbGFiZWxzLiBDYWxsZWQgYnkgdGhlIENhbnZhcyBvdmVybGF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsIC0gVGhlIGNhbnZhcyBvbiB3aGljaCB0byBkcmF3IHRoZSBsYWJlbHMuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25MYXllckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHByaXZhdGUgRHJhd0xhYmVscyhlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuU2hvd0xhYmVscykge1xuICAgICAgICAgICAgdGhpcy5fbWFwU2VydmljZS5HZXRab29tKCkudGhlbih6ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYWJlbE1pblpvb20gPD0geiAmJiB0aGlzLkxhYmVsTWF4Wm9vbSA+PSB6KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gZWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWxzID0gdGhpcy5fbGFiZWxzLm1hcCh4ID0+IHgudGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBTZXJ2aWNlLkxvY2F0aW9uc1RvUG9pbnRzKHRoaXMuX2xhYmVscy5tYXAoeCA9PiB4LmxvYykpLnRoZW4obG9jcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplOiBJU2l6ZSA9IHRoaXMuX21hcFNlcnZpY2UuTWFwU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsb2NzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZHJhdyB0aGUgcG9pbnQgaWYgaXQgaXMgbm90IGluIHZpZXcuIFRoaXMgZ3JlYXRseSBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aGVuIHpvb21lZCBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jc1tpXS54ID49IDAgJiYgbG9jc1tpXS55ID49IDAgJiYgbG9jc1tpXS54IDw9IHNpemUud2lkdGggJiYgbG9jc1tpXS55IDw9IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRHJhd1RleHQoY3R4LCBsb2NzW2ldLCBsYWJlbHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyB0aGUgbGFiZWwgdGV4dCBhdCB0aGUgYXBwcm9wcmlhdGUgcGxhY2Ugb24gdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gY3R4IC0gQ2FudmFzIGRyYXdpbmcgY29udGV4dC5cbiAgICAgKiBAcGFyYW0gbG9jIC0gUGl4ZWwgbG9jYXRpb24gb24gdGhlIGNhbnZhcyB3aGVyZSB0byBjZW50ZXIgdGhlIHRleHQuXG4gICAgICogQHBhcmFtIHRleHQgLSBUZXh0IHRvIGRyYXcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBEcmF3VGV4dChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbG9jOiBJUG9pbnQsIHRleHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgbG86IElMYWJlbE9wdGlvbnMgPSB0aGlzLkxhYmVsT3B0aW9ucztcbiAgICAgICAgaWYgKGxvID09IG51bGwgJiYgdGhpcy5fdG9vbHRpcCkgeyBsbyA9IHRoaXMuX3Rvb2x0aXAuRGVmYXVsdExhYmVsU3R5bGU7IH1cbiAgICAgICAgaWYgKGxvID09IG51bGwpIHsgbG8gPSB0aGlzLl9kZWZhdWx0T3B0aW9uczsgfVxuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxvLnN0cm9rZUNvbG9yO1xuICAgICAgICBjdHguZm9udCA9IGAke2xvLmZvbnRTaXplfXB4ICR7bG8uZm9udEZhbWlseX1gO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNvbnN0IHN0cm9rZVdlaWdodDogbnVtYmVyID0gbG8uc3Ryb2tlV2VpZ2h0O1xuICAgICAgICBpZiAodGV4dCAmJiBzdHJva2VXZWlnaHQgJiYgc3Ryb2tlV2VpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXZWlnaHQ7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gbG8uZm9udENvbG9yO1xuICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgbG9jLngsIGxvYy55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYW5hZ2VzIHRoZSB0b29sdGlwIGFuZCB0aGUgYXR0YWNobWVudCBvZiB0aGUgYXNzb2NpYXRlZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2hvdyAtIFRydWUgdG8gZW5hYmxlIHRoZSB0b29sdGlwLCBmYWxzZSB0byBkaXNhYmxlLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uTGF5ZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIE1hbmFnZVRvb2x0aXAoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoc2hvdyAmJiB0aGlzLl9jYW52YXMpIHtcbiAgICAgICAgICAgIC8vIGFkZCB0b29sdGlwIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuUG9seWdvbk1vdXNlTW92ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogSUxhdExvbmcgPSB0aGlzLl9jYW52YXMuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZS5DbGljayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGxvYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlnb25Nb3VzZU92ZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLlBvbHlnb24uVGl0bGUgJiYgZS5Qb2x5Z29uLlRpdGxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jOiBJTGF0TG9uZyA9IHRoaXMuX2NhbnZhcy5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlLkNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3RleHQnLCBlLlBvbHlnb24uVGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgncG9zaXRpb24nLCBsb2MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLlBvbHlnb25Nb3VzZU91dC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgdG9vbHRpcCBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgICB0aGlzLl90b29sdGlwU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBTdWJzY3JpcHRpb25zLnNwbGljZSgwKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG9yIHVwZGF0ZXMgdGhlIHBvbHlnb25zIGJhc2VkIG9uIHRoZSBwb2x5Z29uIG9wdGlvbnMuIFRoaXMgd2lsbCBwbGFjZSB0aGUgcG9seWdvbnMgb24gdGhlIG1hcFxuICAgICAqIGFuZCByZWdpc3RlciB0aGUgYXNzb2NpYXRlZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkxheWVyRGlyZWN0aXZlXG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHByaXZhdGUgVXBkYXRlUG9seWdvbnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sYXllclByb21pc2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xheWVyUHJvbWlzZS50aGVuKGwgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9seWdvbnM6IEFycmF5PElQb2x5Z29uT3B0aW9ucz4gPSB0aGlzLl9zdHJlYW1pbmcgPyB0aGlzLl9wb2x5Z29uc0xhc3Quc3BsaWNlKDApIDogdGhpcy5fcG9seWdvbnM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbWluZykgeyB0aGlzLl9sYWJlbHMuc3BsaWNlKDApOyB9XG5cbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIHRoZSBwcm9taXNlIGZvciB0aGUgbWFya2Vyc1xuICAgICAgICAgICAgY29uc3QgbHA6IFByb21pc2U8QXJyYXk8UG9seWdvbj4+ID0gdGhpcy5fc2VydmljZS5DcmVhdGVQb2x5Z29ucyhsLkdldE9wdGlvbnMoKS5pZCwgcG9seWdvbnMpO1xuXG4gICAgICAgICAgICAvLyBzZXQgbWFya2VycyBvbmNlIHByb21pc2VzIGFyZSBmdWxsZmlsbGVkLlxuICAgICAgICAgICAgbHAudGhlbihwID0+IHtcbiAgICAgICAgICAgICAgICBwLmZvckVhY2gocG9seSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2x5LlRpdGxlICE9IG51bGwgJiYgcG9seS5UaXRsZS5sZW5ndGggPiAwKSB7IHRoaXMuX2xhYmVscy5wdXNoKHtsb2M6IHBvbHkuQ2VudHJvaWQsIHRpdGxlOiBwb2x5LlRpdGxlfSk7IH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BZGRFdmVudExpc3RlbmVycyhwb2x5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJlYW1pbmcgPyBsLkFkZEVudGl0aWVzKHApIDogbC5TZXRFbnRpdGllcyhwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FudmFzKSB7IHRoaXMuX2NhbnZhcy5SZWRyYXcoIXRoaXMuX3N0cmVhbWluZyk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==