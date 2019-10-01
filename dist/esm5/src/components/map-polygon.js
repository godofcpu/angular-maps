/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolygonService } from '../services/polygon.service';
import { InfoBoxComponent } from './infobox';
/** @type {?} */
var polygonId = 0;
/**
 *
 * MapPolygonDirective renders a polygon inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapPolygonDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map,
 *  styles: [`
 *   .map-container { height: 300px; }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polygon [Paths]="path"></x-map-polygon>
 *   </x-map>
 * `
 * })
 * ```
 *
 *
 * @export
 */
var MapPolygonDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolygonDirective.
     * @param _polygonManager
     *
     * @memberof MapPolygonDirective
     */
    function MapPolygonDirective(_polygonService, _containerRef) {
        this._polygonService = _polygonService;
        this._containerRef = _containerRef;
        this._inCustomLayer = false;
        this._addedToService = false;
        this._events = [];
        /**
         * Gets or sets whether this Polygon handles mouse events.
         *
         * \@memberof MapPolygonDirective
         */
        this.Clickable = true;
        /**
         * If set to true, the user can drag this shape over the map.
         *
         * \@memberof MapPolygonDirective
         */
        this.Draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment.
         *
         * \@memberof MapPolygonDirective
         */
        this.Editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         *
         * \@memberof MapPolygonDirective
         */
        this.Geodesic = false;
        /**
         * Arbitary metadata to assign to the Polygon. This is useful for events
         *
         * \@memberof MapPolygonDirective
         */
        this.Metadata = new Map();
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         * As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays (for inner loops ). Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         *
         * \@memberof MapPolygonDirective
         */
        this.Paths = [];
        /**
         * Whether to show the title of the polygon as the tooltip on the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.ShowTooltip = true;
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.Click = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         *
         * \@memberof MapPolygonDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         *
         * \@memberof MapPolygonDirective
         */
        this.RightClick = new EventEmitter();
        /**
         * This event is fired when editing has completed.
         *
         * \@memberof MapPolygonDirective
         */
        this.PathChanged = new EventEmitter();
        this._id = polygonId++;
    }
    Object.defineProperty(MapPolygonDirective.prototype, "AddedToService", {
        get: /**
         * Gets whether the polygon has been registered with the service.
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._addedToService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "Id", {
        get: /**
         * Get the id of the polygon.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "IdAsString", {
        get: /**
         * Gets the id of the polygon as a string.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._id.toString(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "InCustomLayer", {
        get: /**
         * Gets whether the polygon is in a custom layer. See {\@link MapLayer}.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._inCustomLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonDirective.prototype, "LayerId", {
        get: /**
         * gets the id of the Layer the polygon belongs to.
         *
         * \@readonly
         * \@memberof MapPolygonDirective
         * @return {?}
         */
        function () { return this._layerId; },
        enumerable: true,
        configurable: true
    });
    ///
    /// Public methods
    ///
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.ngAfterContentInit = /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        if (this._containerRef.element.nativeElement.parentElement) {
            /** @type {?} */
            var parentName = this._containerRef.element.nativeElement.parentElement.tagName;
            if (parentName.toLowerCase() === 'x-map-layer') {
                this._inCustomLayer = true;
                this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
            }
        }
        if (!this._addedToService) {
            this._polygonService.AddPolygon(this);
            this._addedToService = true;
            this.AddEventListeners();
        }
        return;
    };
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * @param changes - Changes that have occured.
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapPolygonDirective.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToService) {
            return;
        }
        /** @type {?} */
        var o = this.GeneratePolygonChangeSet(changes);
        if (o != null) {
            this._polygonService.SetOptions(this, o);
        }
        if (changes['Paths'] && !changes['Paths'].isFirstChange()) {
            this._polygonService.UpdatePolygon(this);
        }
    };
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * @memberof MapPolygonDirective
     */
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.ngOnDestroy = /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        this._polygonService.DeletePolygon(this);
        this._events.forEach(function (s) { return s.unsubscribe(); });
    };
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    MapPolygonDirective.prototype.AddEventListeners = /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var _getEventArg = function (e) {
            return {
                Polygon: _this,
                Click: e
            };
        };
        this._events.push(this._polygonService.CreateEventObservable('click', this).subscribe(function (ev) {
            /** @type {?} */
            var t = _this;
            if (_this._infoBox != null) {
                _this._infoBox.Open(_this._polygonService.GetCoordinatesFromClick(ev));
            }
            _this.Click.emit(_getEventArg(ev));
        }));
        /** @type {?} */
        var handlers = [
            { name: 'dblclick', handler: function (ev) { return _this.DblClick.emit(_getEventArg(ev)); } },
            { name: 'drag', handler: function (ev) { return _this.Drag.emit(_getEventArg(ev)); } },
            { name: 'dragend', handler: function (ev) { return _this.DragEnd.emit(_getEventArg(ev)); } },
            { name: 'dragstart', handler: function (ev) { return _this.DragStart.emit(_getEventArg(ev)); } },
            { name: 'mousedown', handler: function (ev) { return _this.MouseDown.emit(_getEventArg(ev)); } },
            { name: 'mousemove', handler: function (ev) { return _this.MouseMove.emit(_getEventArg(ev)); } },
            { name: 'mouseout', handler: function (ev) { return _this.MouseOut.emit(_getEventArg(ev)); } },
            { name: 'mouseover', handler: function (ev) { return _this.MouseOver.emit(_getEventArg(ev)); } },
            { name: 'mouseup', handler: function (ev) { return _this.MouseUp.emit(_getEventArg(ev)); } },
            { name: 'rightclick', handler: function (ev) { return _this.RightClick.emit(_getEventArg(ev)); } },
            { name: 'pathchanged', handler: function (ev) { return _this.PathChanged.emit(ev); } }
        ];
        handlers.forEach(function (obj) {
            /** @type {?} */
            var os = _this._polygonService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._events.push(os);
        });
    };
    /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    MapPolygonDirective.prototype.GeneratePolygonChangeSet = /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    function (changes) {
        /** @type {?} */
        var options = { id: this._id };
        /** @type {?} */
        var hasOptions = false;
        if (changes['Clickable']) {
            options.clickable = this.Clickable;
            hasOptions = true;
        }
        if (changes['Draggable']) {
            options.draggable = this.Draggable;
            hasOptions = true;
        }
        if (changes['Editable']) {
            options.editable = this.Editable;
            hasOptions = true;
        }
        if (changes['FillColor'] || changes['FillOpacity']) {
            options.fillColor = this.FillColor;
            options.fillOpacity = this.FillOpacity;
            hasOptions = true;
        }
        if (changes['Geodesic']) {
            options.geodesic = this.Geodesic;
            hasOptions = true;
        }
        if (changes['LabelMaxZoom']) {
            options.labelMaxZoom = this.LabelMaxZoom;
            hasOptions = true;
        }
        if (changes['LabelMinZoom']) {
            options.labelMinZoom = this.LabelMinZoom;
            hasOptions = true;
        }
        if (changes['ShowTooltip']) {
            options.showTooltip = this.ShowTooltip;
            hasOptions = true;
        }
        if (changes['ShowLabel']) {
            options.showLabel = this.ShowLabel;
            hasOptions = true;
        }
        if (changes['StrokeColor'] || changes['StrokeOpacity']) {
            options.strokeColor = this.StrokeColor;
            options.strokeOpacity = this.StrokeOpacity;
            hasOptions = true;
        }
        if (changes['StrokeWeight']) {
            options.strokeWeight = this.StrokeWeight;
            hasOptions = true;
        }
        if (changes['Title']) {
            options.title = this.Title;
            hasOptions = true;
        }
        if (changes['Visible']) {
            options.visible = this.Visible;
            hasOptions = true;
        }
        if (changes['zIndex']) {
            options.zIndex = this.zIndex;
            hasOptions = true;
        }
        return hasOptions ? options : null;
    };
    MapPolygonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polygon'
                },] },
    ];
    /** @nocollapse */
    MapPolygonDirective.ctorParameters = function () { return [
        { type: PolygonService },
        { type: ViewContainerRef }
    ]; };
    MapPolygonDirective.propDecorators = {
        _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
        Clickable: [{ type: Input }],
        Draggable: [{ type: Input }],
        Editable: [{ type: Input }],
        FillColor: [{ type: Input }],
        FillOpacity: [{ type: Input }],
        Geodesic: [{ type: Input }],
        LabelMaxZoom: [{ type: Input }],
        LabelMinZoom: [{ type: Input }],
        Metadata: [{ type: Input }],
        Paths: [{ type: Input }],
        ShowLabel: [{ type: Input }],
        ShowTooltip: [{ type: Input }],
        StrokeColor: [{ type: Input }],
        StrokeOpacity: [{ type: Input }],
        StrokeWeight: [{ type: Input }],
        Title: [{ type: Input }],
        Visible: [{ type: Input }],
        zIndex: [{ type: Input }],
        Click: [{ type: Output }],
        DblClick: [{ type: Output }],
        Drag: [{ type: Output }],
        DragEnd: [{ type: Output }],
        DragStart: [{ type: Output }],
        MouseDown: [{ type: Output }],
        MouseMove: [{ type: Output }],
        MouseOut: [{ type: Output }],
        MouseOver: [{ type: Output }],
        MouseUp: [{ type: Output }],
        RightClick: [{ type: Output }],
        PathChanged: [{ type: Output }]
    };
    return MapPolygonDirective;
}());
export { MapPolygonDirective };
if (false) {
    /** @type {?} */
    MapPolygonDirective.prototype._inCustomLayer;
    /** @type {?} */
    MapPolygonDirective.prototype._id;
    /** @type {?} */
    MapPolygonDirective.prototype._layerId;
    /** @type {?} */
    MapPolygonDirective.prototype._addedToService;
    /** @type {?} */
    MapPolygonDirective.prototype._events;
    /** @type {?} */
    MapPolygonDirective.prototype._infoBox;
    /**
     * Gets or sets whether this Polygon handles mouse events.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Clickable;
    /**
     * If set to true, the user can drag this shape over the map.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Editable;
    /**
     * The fill color of the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.FillColor;
    /**
     * The fill opacity between 0.0 and 1.0
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.FillOpacity;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polygon are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Geodesic;
    /**
     * Set the maximum zoom at which the polygon lable is visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.LabelMaxZoom;
    /**
     * Set the minimum zoom at which the polygon lable is visible. Ignored if ShowLabel is false.
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.LabelMinZoom;
    /**
     * Arbitary metadata to assign to the Polygon. This is useful for events
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Metadata;
    /**
     * The ordered sequence of coordinates that designates a closed loop.
     * Unlike polylines, a polygon may consist of one or more paths.
     * As a result, the paths property may specify one or more arrays of
     * LatLng coordinates. Paths are closed automatically; do not repeat the
     * first vertex of the path as the last vertex. Simple polygons may be
     * defined using a single array of LatLngs. More complex polygons may
     * specify an array of arrays (for inner loops ). Any simple arrays are converted into Arrays.
     * Inserting or removing LatLngs from the Array will automatically update
     * the polygon on the map.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Paths;
    /**
     * Whether to show the title as the label on the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.ShowLabel;
    /**
     * Whether to show the title of the polygon as the tooltip on the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.ShowTooltip;
    /**
     * The stroke color.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeOpacity;
    /**
     * The stroke width in pixels.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.StrokeWeight;
    /**
     * The title of the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Title;
    /**
     * Whether this polygon is visible on the map. Defaults to true.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Visible;
    /**
     * The zIndex compared to other polys.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Click;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DragEnd;
    /**
     * This event is fired when the user starts dragging the polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.DragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polygon.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseMove;
    /**
     * This event is fired on Polygon mouseout.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseOut;
    /**
     * This event is fired on Polygon mouseover.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polygon
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.MouseUp;
    /**
     * This event is fired when the Polygon is right-clicked on.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.RightClick;
    /**
     * This event is fired when editing has completed.
     *
     * \@memberof MapPolygonDirective
     * @type {?}
     */
    MapPolygonDirective.prototype.PathChanged;
    /** @type {?} */
    MapPolygonDirective.prototype._polygonService;
    /** @type {?} */
    MapPolygonDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFDaEUsWUFBWSxFQUFFLFlBQVksRUFDN0IsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFN0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0VGQsR0FBRztJQUNILGVBQWU7SUFDZixHQUFHO0lBRUg7Ozs7O09BS0c7SUFDSCw2QkFBb0IsZUFBK0IsRUFBVSxhQUErQjtRQUF4RSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7OEJBblNuRSxLQUFLOytCQUdKLEtBQUs7dUJBQ0csRUFBRTs7Ozs7O3lCQWFSLElBQUk7Ozs7Ozt5QkFPSixLQUFLOzs7Ozs7O3dCQVFOLEtBQUs7Ozs7Ozs7Ozs7d0JBeUJMLEtBQUs7Ozs7Ozt3QkFtQmEsSUFBSSxHQUFHLEVBQWU7Ozs7Ozs7Ozs7Ozs7O3FCQWVELEVBQUU7Ozs7OzsyQkFjN0IsSUFBSTs7Ozs7O3FCQXFESSxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt3QkFPOUIsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7b0JBT3JDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3VCQU85QixJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPL0IsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7eUJBT2pDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3lCQU9qQyxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt3QkFPbEMsSUFBSSxZQUFZ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OzsyQkF1RC9ELFlBQVksU0FBQyxnQkFBZ0I7NEJBUTdCLEtBQUs7NEJBT0wsS0FBSzsyQkFRTCxLQUFLOzRCQU9MLEtBQUs7OEJBT0wsS0FBSzsyQkFXTCxLQUFLOytCQU1MLEtBQUs7K0JBTUwsS0FBSzsyQkFPTCxLQUFLO3dCQWVMLEtBQUs7NEJBT0wsS0FBSzs4QkFPTCxLQUFLOzhCQU9MLEtBQUs7Z0NBT0wsS0FBSzsrQkFPTCxLQUFLO3dCQU9MLEtBQUs7MEJBT0wsS0FBSzt5QkFPTCxLQUFLO3dCQVdMLE1BQU07MkJBT04sTUFBTTt1QkFPTixNQUFNOzBCQU9OLE1BQU07NEJBT04sTUFBTTs0QkFPTixNQUFNOzRCQU9OLE1BQU07MkJBT04sTUFBTTs0QkFPTixNQUFNOzBCQU9OLE1BQU07NkJBUU4sTUFBTTs4QkFPTixNQUFNOzs4QkEzUlg7O1NBMENhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmlld0NvbnRhaW5lclJlZixcbiAgICBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSVBvbHlnb25PcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9seWdvbi1vcHRpb25zJztcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvaW50JztcbmltcG9ydCB7IElQb2x5Z29uRXZlbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLWV2ZW50JztcbmltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBQb2x5Z29uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvbHlnb24uc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi9pbmZvYm94JztcblxubGV0IHBvbHlnb25JZCA9IDA7XG5cbi8qKlxuICpcbiAqIE1hcFBvbHlnb25EaXJlY3RpdmUgcmVuZGVycyBhIHBvbHlnb24gaW5zaWRlIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBQb2x5Z29uRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLFxuICogIHN0eWxlczogW2BcbiAqICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XG4gKiBgXSxcbiAqIHRlbXBsYXRlOiBgXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDx4LW1hcC1wb2x5Z29uIFtQYXRoc109XCJwYXRoXCI+PC94LW1hcC1wb2x5Z29uPlxuICogICA8L3gtbWFwPlxuICogYFxuICogfSlcbiAqIGBgYFxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAneC1tYXAtcG9seWdvbidcbn0pXG5leHBvcnQgY2xhc3MgTWFwUG9seWdvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9pbkN1c3RvbUxheWVyID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9sYXllcklkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYWRkZWRUb1NlcnZpY2UgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9ldmVudHM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICAvLy9cbiAgICAvLy8gQW55IEluZm9Cb3ggdGhhdCBpcyBhIGRpcmVjdCBjaGlsZHJlbiBvZiB0aGUgcG9seWdvblxuICAgIC8vL1xuICAgIEBDb250ZW50Q2hpbGQoSW5mb0JveENvbXBvbmVudCkgcHJvdGVjdGVkIF9pbmZvQm94OiBJbmZvQm94Q29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIG9yIHNldHMgd2hldGhlciB0aGlzIFBvbHlnb24gaGFuZGxlcyBtb3VzZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBDbGlja2FibGUgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbFxuICAgICAqIHBvaW50cyBzaG93biBhdCB0aGUgdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEVkaXRhYmxlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmlsbCBjb2xvciBvZiB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEZpbGxDb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZpbGwgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBGaWxsT3BhY2l0eTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGxcbiAgICAgKiBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZVxuICAgICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXG4gICAgICogZ2VvZGVzaWMgcG9seWdvbiBtYXkgYXBwZWFyIHRvIGNoYW5nZSB3aGVuIGRyYWdnZWQsIGFzIHRoZSBkaW1lbnNpb25zXG4gICAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEdlb2Rlc2ljID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1heGltdW0gem9vbSBhdCB3aGljaCB0aGUgcG9seWdvbiBsYWJsZSBpcyB2aXNpYmxlLiBJZ25vcmVkIGlmIFNob3dMYWJlbCBpcyBmYWxzZS5cbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYWJlbE1heFpvb206IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbWluaW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5Z29uIGxhYmxlIGlzIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWluWm9vbTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQXJiaXRhcnkgbWV0YWRhdGEgdG8gYXNzaWduIHRvIHRoZSBQb2x5Z29uLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBNZXRhZGF0YTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCBzZXF1ZW5jZSBvZiBjb29yZGluYXRlcyB0aGF0IGRlc2lnbmF0ZXMgYSBjbG9zZWQgbG9vcC5cbiAgICAgKiBVbmxpa2UgcG9seWxpbmVzLCBhIHBvbHlnb24gbWF5IGNvbnNpc3Qgb2Ygb25lIG9yIG1vcmUgcGF0aHMuXG4gICAgICogQXMgYSByZXN1bHQsIHRoZSBwYXRocyBwcm9wZXJ0eSBtYXkgc3BlY2lmeSBvbmUgb3IgbW9yZSBhcnJheXMgb2ZcbiAgICAgKiBMYXRMbmcgY29vcmRpbmF0ZXMuIFBhdGhzIGFyZSBjbG9zZWQgYXV0b21hdGljYWxseTsgZG8gbm90IHJlcGVhdCB0aGVcbiAgICAgKiBmaXJzdCB2ZXJ0ZXggb2YgdGhlIHBhdGggYXMgdGhlIGxhc3QgdmVydGV4LiBTaW1wbGUgcG9seWdvbnMgbWF5IGJlXG4gICAgICogZGVmaW5lZCB1c2luZyBhIHNpbmdsZSBhcnJheSBvZiBMYXRMbmdzLiBNb3JlIGNvbXBsZXggcG9seWdvbnMgbWF5XG4gICAgICogc3BlY2lmeSBhbiBhcnJheSBvZiBhcnJheXMgKGZvciBpbm5lciBsb29wcyApLiBBbnkgc2ltcGxlIGFycmF5cyBhcmUgY29udmVydGVkIGludG8gQXJyYXlzLlxuICAgICAqIEluc2VydGluZyBvciByZW1vdmluZyBMYXRMbmdzIGZyb20gdGhlIEFycmF5IHdpbGwgYXV0b21hdGljYWxseSB1cGRhdGVcbiAgICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgUGF0aHM6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGUgYXMgdGhlIGxhYmVsIG9uIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd0xhYmVsOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZSBvZiB0aGUgcG9seWdvbiBhcyB0aGUgdG9vbHRpcCBvbiB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFNob3dUb29sdGlwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJva2UgY29sb3IuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBTdHJva2VDb2xvcjogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFN0cm9rZU9wYWNpdHk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJva2Ugd2lkdGggaW4gcGl4ZWxzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlV2VpZ2h0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBUaXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIHBvbHlnb24gaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyB6SW5kZXg6IG51bWJlcjtcblxuICAgIC8vL1xuICAgIC8vLyBEZWxlZ2F0ZSBkZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBDbGljazogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEYmxDbGljazogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRHJhZzogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRHJhZ0VuZDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0YXJ0cyBkcmFnZ2luZyB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIERyYWdTdGFydDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgTW91c2VEb3duOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW91dC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgTW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb25cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlVXA6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5Z29uIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBSaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gZWRpdGluZyBoYXMgY29tcGxldGVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgUGF0aENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWNsYXJhdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBoYXMgYmVlbiByZWdpc3RlcmVkIHdpdGggdGhlIHNlcnZpY2UuXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IEFkZGVkVG9TZXJ2aWNlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWRkZWRUb1NlcnZpY2U7IH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWQgb2YgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpZCBvZiB0aGUgcG9seWdvbiBhcyBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJZEFzU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZC50b1N0cmluZygpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlnb24gaXMgaW4gYSBjdXN0b20gbGF5ZXIuIFNlZSB7QGxpbmsgTWFwTGF5ZXJ9LlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IEluQ3VzdG9tTGF5ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkN1c3RvbUxheWVyOyB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRzIHRoZSBpZCBvZiB0aGUgTGF5ZXIgdGhlIHBvbHlnb24gYmVsb25ncyB0by5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBMYXllcklkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sYXllcklkOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgTWFwUG9seWdvbkRpcmVjdGl2ZS5cbiAgICAgKiBAcGFyYW0gX3BvbHlnb25NYW5hZ2VyXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlnb25TZXJ2aWNlOiBQb2x5Z29uU2VydmljZSwgcHJpdmF0ZSBfY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHRoaXMuX2lkID0gcG9seWdvbklkKys7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnRlbnQgaW50aWFsaXphdGlvbiBvZiB0aGUgZGlyZWN0aXZlIGlzIGNvbXBsZXRlLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lOiBzdHJpbmcgPSB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd4LW1hcC1sYXllcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbkN1c3RvbUxheWVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlnb25TZXJ2aWNlLkFkZFBvbHlnb24odGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRlZFRvU2VydmljZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLkFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNoYW5nZXMgdG8gdGhlIGRhdGFib3VkIHByb3BlcnRpZXMgb2NjdXIuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5nZXMgLSBDaGFuZ2VzIHRoYXQgaGF2ZSBvY2N1cmVkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvU2VydmljZSkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBvOiBJUG9seWdvbk9wdGlvbnMgPSB0aGlzLkdlbmVyYXRlUG9seWdvbkNoYW5nZVNldChjaGFuZ2VzKTtcbiAgICAgICAgaWYgKG8gIT0gbnVsbCkgeyB0aGlzLl9wb2x5Z29uU2VydmljZS5TZXRPcHRpb25zKHRoaXMsIG8pOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydQYXRocyddICYmICFjaGFuZ2VzWydQYXRocyddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuVXBkYXRlUG9seWdvbih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIHBveWdvbiBpcyBiZWluZyBkZXN0cm95ZWQuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLiBSZWxlYXNlIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuRGVsZXRlUG9seWdvbih0aGlzKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIC8vL1xuICAgICAgICAvLy8gcmVtb3ZlIGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICAgICAgLy8vXG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogV2lyZXMgdXAgdGhlIGV2ZW50IHJlY2VpdmVycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBBZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgX2dldEV2ZW50QXJnOiAoZTogTW91c2VFdmVudCkgPT4gSVBvbHlnb25FdmVudCA9IGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBQb2x5Z29uOiB0aGlzLFxuICAgICAgICAgICAgICAgIENsaWNrOiBlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh0aGlzLl9wb2x5Z29uU2VydmljZS5DcmVhdGVFdmVudE9ic2VydmFibGUoJ2NsaWNrJywgdGhpcykuc3Vic2NyaWJlKChldjogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdDogTWFwUG9seWdvbkRpcmVjdGl2ZSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5mb0JveCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5mb0JveC5PcGVuKHRoaXMuX3BvbHlnb25TZXJ2aWNlLkdldENvb3JkaW5hdGVzRnJvbUNsaWNrKGV2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLkNsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EYmxDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWcuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnU3RhcnQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vkb3duJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlRG93bi5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VNb3ZlLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3V0LmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZU92ZXIuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZVVwLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUmlnaHRDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdwYXRoY2hhbmdlZCcsIGhhbmRsZXI6IChldjogSVBvbHlnb25FdmVudCkgPT4gdGhpcy5QYXRoQ2hhbmdlZC5lbWl0KGV2KSB9XG4gICAgICAgIF07XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3MgPSB0aGlzLl9wb2x5Z29uU2VydmljZS5DcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMucHVzaChvcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIElQb2x5Z29uIG9wdGlvbiBjaGFuZ2VzZXQgZnJvbSBkaXJlY3RpdmUgc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIHtAbGluayBTaW1wbGVDaGFuZ2VzfSBpZGVudGlmeWluZyB0aGUgY2hhbmdlcyB0aGF0IG9jY3VyZWQuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSVBvbHlnb25PcHRpb25zfSBjb250YWluaW5nIHRoZSBwb2x5Z29uIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHByaXZhdGUgR2VuZXJhdGVQb2x5Z29uQ2hhbmdlU2V0KGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBJUG9seWdvbk9wdGlvbnMge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBJUG9seWdvbk9wdGlvbnMgPSB7IGlkOiB0aGlzLl9pZCB9O1xuICAgICAgICBsZXQgaGFzT3B0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAoY2hhbmdlc1snQ2xpY2thYmxlJ10pIHsgb3B0aW9ucy5jbGlja2FibGUgPSB0aGlzLkNsaWNrYWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0RyYWdnYWJsZSddKSB7IG9wdGlvbnMuZHJhZ2dhYmxlID0gdGhpcy5EcmFnZ2FibGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydFZGl0YWJsZSddKSB7IG9wdGlvbnMuZWRpdGFibGUgPSB0aGlzLkVkaXRhYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snRmlsbENvbG9yJ10gfHwgY2hhbmdlc1snRmlsbE9wYWNpdHknXSkge1xuICAgICAgICAgICAgb3B0aW9ucy5maWxsQ29sb3IgPSB0aGlzLkZpbGxDb2xvcjtcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsbE9wYWNpdHkgPSB0aGlzLkZpbGxPcGFjaXR5O1xuICAgICAgICAgICAgaGFzT3B0aW9ucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0dlb2Rlc2ljJ10pIHsgb3B0aW9ucy5nZW9kZXNpYyA9IHRoaXMuR2VvZGVzaWM7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbE1heFpvb20nXSkgeyBvcHRpb25zLmxhYmVsTWF4Wm9vbSA9IHRoaXMuTGFiZWxNYXhab29tOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snTGFiZWxNaW5ab29tJ10pIHsgb3B0aW9ucy5sYWJlbE1pblpvb20gPSB0aGlzLkxhYmVsTWluWm9vbTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dUb29sdGlwJ10pIHsgb3B0aW9ucy5zaG93VG9vbHRpcCA9IHRoaXMuU2hvd1Rvb2x0aXA7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydTaG93TGFiZWwnXSkgeyBvcHRpb25zLnNob3dMYWJlbCA9IHRoaXMuU2hvd0xhYmVsOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU3Ryb2tlQ29sb3InXSB8fCBjaGFuZ2VzWydTdHJva2VPcGFjaXR5J10pIHtcbiAgICAgICAgICAgIG9wdGlvbnMuc3Ryb2tlQ29sb3IgPSB0aGlzLlN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgb3B0aW9ucy5zdHJva2VPcGFjaXR5ID0gdGhpcy5TdHJva2VPcGFjaXR5O1xuICAgICAgICAgICAgaGFzT3B0aW9ucyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1N0cm9rZVdlaWdodCddKSB7IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0ID0gdGhpcy5TdHJva2VXZWlnaHQ7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydUaXRsZSddKSB7IG9wdGlvbnMudGl0bGUgPSB0aGlzLlRpdGxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7IG9wdGlvbnMudmlzaWJsZSA9IHRoaXMuVmlzaWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7IG9wdGlvbnMuekluZGV4ID0gdGhpcy56SW5kZXg7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBoYXNPcHRpb25zID8gb3B0aW9ucyA6IG51bGw7XG4gICAgfVxuXG59XG4iXX0=