/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolygonService } from '../services/polygon.service';
import { InfoBoxComponent } from './infobox';
/** @type {?} */
let polygonId = 0;
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
export class MapPolygonDirective {
    /**
     * Creates an instance of MapPolygonDirective.
     * \@memberof MapPolygonDirective
     * @param {?} _polygonService
     * @param {?} _containerRef
     */
    constructor(_polygonService, _containerRef) {
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
    /**
     * Gets whether the polygon has been registered with the service.
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get AddedToService() { return this._addedToService; }
    /**
     * Get the id of the polygon.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets the id of the polygon as a string.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get IdAsString() { return this._id.toString(); }
    /**
     * Gets whether the polygon is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the polygon belongs to.
     *
     * \@readonly
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._containerRef.element.nativeElement.parentElement) {
            /** @type {?} */
            const parentName = this._containerRef.element.nativeElement.parentElement.tagName;
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
    }
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._addedToService) {
            return;
        }
        /** @type {?} */
        const o = this.GeneratePolygonChangeSet(changes);
        if (o != null) {
            this._polygonService.SetOptions(this, o);
        }
        if (changes['Paths'] && !changes['Paths'].isFirstChange()) {
            this._polygonService.UpdatePolygon(this);
        }
    }
    /**
     * Called when the poygon is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._polygonService.DeletePolygon(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolygonDirective
     * @return {?}
     */
    AddEventListeners() {
        /** @type {?} */
        const _getEventArg = e => {
            return {
                Polygon: this,
                Click: e
            };
        };
        this._events.push(this._polygonService.CreateEventObservable('click', this).subscribe((ev) => {
            /** @type {?} */
            const t = this;
            if (this._infoBox != null) {
                this._infoBox.Open(this._polygonService.GetCoordinatesFromClick(ev));
            }
            this.Click.emit(_getEventArg(ev));
        }));
        /** @type {?} */
        const handlers = [
            { name: 'dblclick', handler: (ev) => this.DblClick.emit(_getEventArg(ev)) },
            { name: 'drag', handler: (ev) => this.Drag.emit(_getEventArg(ev)) },
            { name: 'dragend', handler: (ev) => this.DragEnd.emit(_getEventArg(ev)) },
            { name: 'dragstart', handler: (ev) => this.DragStart.emit(_getEventArg(ev)) },
            { name: 'mousedown', handler: (ev) => this.MouseDown.emit(_getEventArg(ev)) },
            { name: 'mousemove', handler: (ev) => this.MouseMove.emit(_getEventArg(ev)) },
            { name: 'mouseout', handler: (ev) => this.MouseOut.emit(_getEventArg(ev)) },
            { name: 'mouseover', handler: (ev) => this.MouseOver.emit(_getEventArg(ev)) },
            { name: 'mouseup', handler: (ev) => this.MouseUp.emit(_getEventArg(ev)) },
            { name: 'rightclick', handler: (ev) => this.RightClick.emit(_getEventArg(ev)) },
            { name: 'pathchanged', handler: (ev) => this.PathChanged.emit(ev) }
        ];
        handlers.forEach((obj) => {
            /** @type {?} */
            const os = this._polygonService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
    /**
     * Generates IPolygon option changeset from directive settings.
     *
     * \@memberof MapPolygonDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolygonOptions} containing the polygon options.
     *
     */
    GeneratePolygonChangeSet(changes) {
        /** @type {?} */
        const options = { id: this._id };
        /** @type {?} */
        let hasOptions = false;
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
    }
}
MapPolygonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-polygon'
            },] },
];
/** @nocollapse */
MapPolygonDirective.ctorParameters = () => [
    { type: PolygonService },
    { type: ViewContainerRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlnb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9tYXAtcG9seWdvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3QixnQkFBZ0IsRUFDaEUsWUFBWSxFQUFFLFlBQVksRUFDN0IsTUFBTSxlQUFlLENBQUM7QUFNdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFN0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCbEIsTUFBTTs7Ozs7OztJQXdTRixZQUFvQixlQUErQixFQUFVLGFBQStCO1FBQXhFLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjs4QkFuU25FLEtBQUs7K0JBR0osS0FBSzt1QkFDRyxFQUFFOzs7Ozs7eUJBYVIsSUFBSTs7Ozs7O3lCQU9KLEtBQUs7Ozs7Ozs7d0JBUU4sS0FBSzs7Ozs7Ozs7Ozt3QkF5QkwsS0FBSzs7Ozs7O3dCQW1CYSxJQUFJLEdBQUcsRUFBZTs7Ozs7Ozs7Ozs7Ozs7cUJBZUQsRUFBRTs7Ozs7OzJCQWM3QixJQUFJOzs7Ozs7cUJBcURJLElBQUksWUFBWSxFQUFpQjs7Ozs7O3dCQU85QixJQUFJLFlBQVksRUFBaUI7Ozs7OztvQkFPckMsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7dUJBTzlCLElBQUksWUFBWSxFQUFpQjs7Ozs7O3lCQU8vQixJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPakMsSUFBSSxZQUFZLEVBQWlCOzs7Ozs7eUJBT2pDLElBQUksWUFBWSxFQUFpQjs7Ozs7O3dCQU9sQyxJQUFJLFlBQVksRUFBaUI7Ozs7Ozt5QkFPaEMsSUFBSSxZQUFZ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LEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3ZGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3JGLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzNGLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtTQUNyRixDQUFDO1FBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxD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TUFBTTttQkFPTixNQUFNO3NCQU9OLE1BQU07d0JBT04sTUFBTTt3QkFPTixNQUFNO3dCQU9OLE1BQU07dUJBT04sTUFBTTt3QkFPTixNQUFNO3NCQU9OLE1BQU07eUJBUU4sTUFBTTswQkFPTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9seWdvbk9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2x5Z29uLW9wdGlvbnMnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSVBvbHlnb25FdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlnb24tZXZlbnQnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IFBvbHlnb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9seWdvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuL2luZm9ib3gnO1xuXG5sZXQgcG9seWdvbklkID0gMDtcblxuLyoqXG4gKlxuICogTWFwUG9seWdvbkRpcmVjdGl2ZSByZW5kZXJzIGEgcG9seWdvbiBpbnNpZGUgYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcFBvbHlnb25EaXJlY3RpdmV9IGZyb20gJy4uLic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAsXG4gKiAgc3R5bGVzOiBbYFxuICogICAubWFwLWNvbnRhaW5lciB7IGhlaWdodDogMzAwcHg7IH1cbiAqIGBdLFxuICogdGVtcGxhdGU6IGBcbiAqICAgPHgtbWFwIFtMYXRpdHVkZV09XCJsYXRcIiBbTG9uZ2l0dWRlXT1cImxuZ1wiIFtab29tXT1cInpvb21cIj5cbiAqICAgICAgPHgtbWFwLXBvbHlnb24gW1BhdGhzXT1cInBhdGhcIj48L3gtbWFwLXBvbHlnb24+XG4gKiAgIDwveC1tYXA+XG4gKiBgXG4gKiB9KVxuICogYGBgXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5Z29uJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXBQb2x5Z29uRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2luQ3VzdG9tTGF5ZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2xheWVySWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9hZGRlZFRvU2VydmljZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2V2ZW50czogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIC8vL1xuICAgIC8vLyBBbnkgSW5mb0JveCB0aGF0IGlzIGEgZGlyZWN0IGNoaWxkcmVuIG9mIHRoZSBwb2x5Z29uXG4gICAgLy8vXG4gICAgQENvbnRlbnRDaGlsZChJbmZvQm94Q29tcG9uZW50KSBwcm90ZWN0ZWQgX2luZm9Cb3g6IEluZm9Cb3hDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoaXMgUG9seWdvbiBoYW5kbGVzIG1vdXNlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIENsaWNrYWJsZSA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBzaGFwZSBvdmVyIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBEcmFnZ2FibGUgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sXG4gICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRWRpdGFibGUgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmaWxsIGNvbG9yIG9mIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRmlsbENvbG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmlsbCBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEZpbGxPcGFjaXR5OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbFxuICAgICAqIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlXG4gICAgICogcmVuZGVyZWQgYXMgc3RyYWlnaHQgbGluZXMgaW4gc2NyZWVuIHNwYWNlLiBOb3RlIHRoYXQgdGhlIHNoYXBlIG9mIGFcbiAgICAgKiBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcbiAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgR2VvZGVzaWMgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbWF4aW11bSB6b29tIGF0IHdoaWNoIHRoZSBwb2x5Z29uIGxhYmxlIGlzIHZpc2libGUuIElnbm9yZWQgaWYgU2hvd0xhYmVsIGlzIGZhbHNlLlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIExhYmVsTWF4Wm9vbTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtaW5pbXVtIHpvb20gYXQgd2hpY2ggdGhlIHBvbHlnb24gbGFibGUgaXMgdmlzaWJsZS4gSWdub3JlZCBpZiBTaG93TGFiZWwgaXMgZmFsc2UuXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWxNaW5ab29tOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBBcmJpdGFyeSBtZXRhZGF0YSB0byBhc3NpZ24gdG8gdGhlIFBvbHlnb24uIFRoaXMgaXMgdXNlZnVsIGZvciBldmVudHNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIE1ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcmRlcmVkIHNlcXVlbmNlIG9mIGNvb3JkaW5hdGVzIHRoYXQgZGVzaWduYXRlcyBhIGNsb3NlZCBsb29wLlxuICAgICAqIFVubGlrZSBwb2x5bGluZXMsIGEgcG9seWdvbiBtYXkgY29uc2lzdCBvZiBvbmUgb3IgbW9yZSBwYXRocy5cbiAgICAgKiBBcyBhIHJlc3VsdCwgdGhlIHBhdGhzIHByb3BlcnR5IG1heSBzcGVjaWZ5IG9uZSBvciBtb3JlIGFycmF5cyBvZlxuICAgICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxuICAgICAqIGZpcnN0IHZlcnRleCBvZiB0aGUgcGF0aCBhcyB0aGUgbGFzdCB2ZXJ0ZXguIFNpbXBsZSBwb2x5Z29ucyBtYXkgYmVcbiAgICAgKiBkZWZpbmVkIHVzaW5nIGEgc2luZ2xlIGFycmF5IG9mIExhdExuZ3MuIE1vcmUgY29tcGxleCBwb2x5Z29ucyBtYXlcbiAgICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cyAoZm9yIGlubmVyIGxvb3BzICkuIEFueSBzaW1wbGUgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgaW50byBBcnJheXMuXG4gICAgICogSW5zZXJ0aW5nIG9yIHJlbW92aW5nIExhdExuZ3MgZnJvbSB0aGUgQXJyYXkgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZVxuICAgICAqIHRoZSBwb2x5Z29uIG9uIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBQYXRoczogQXJyYXk8SUxhdExvbmc+IHwgQXJyYXk8QXJyYXk8SUxhdExvbmc+PiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSB0aXRsZSBhcyB0aGUgbGFiZWwgb24gdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBTaG93TGFiZWw6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHRpdGxlIG9mIHRoZSBwb2x5Z29uIGFzIHRoZSB0b29sdGlwIG9uIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU2hvd1Rvb2x0aXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cm9rZSBjb2xvci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFN0cm9rZUNvbG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBTdHJva2VXZWlnaHQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoaXMgcG9seWdvbiBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIHpJbmRleDogbnVtYmVyO1xuXG4gICAgLy8vXG4gICAgLy8vIERlbGVnYXRlIGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIERibENsaWNrOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEcmFnOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZURvd246IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW92ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvblxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgTW91c2VVcDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIFBvbHlnb24gaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlnb25FdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBlZGl0aW5nIGhhcyBjb21wbGV0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBQYXRoQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElQb2x5Z29uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWdvbkV2ZW50PigpO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5Z29uIGhhcyBiZWVuIHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2VydmljZS5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgQWRkZWRUb1NlcnZpY2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hZGRlZFRvU2VydmljZTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpZCBvZiB0aGUgcG9seWdvbi5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBwb2x5Z29uIGFzIGEgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElkQXNTdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWdvbiBpcyBpbiBhIGN1c3RvbSBsYXllci4gU2VlIHtAbGluayBNYXBMYXllcn0uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSW5DdXN0b21MYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ3VzdG9tTGF5ZXI7IH1cblxuICAgIC8qKlxuICAgICAqIGdldHMgdGhlIGlkIG9mIHRoZSBMYXllciB0aGUgcG9seWdvbiBiZWxvbmdzIHRvLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IExheWVySWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xheWVySWQ7IH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBQb2x5Z29uRGlyZWN0aXZlLlxuICAgICAqIEBwYXJhbSBfcG9seWdvbk1hbmFnZXJcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWdvblNlcnZpY2U6IFBvbHlnb25TZXJ2aWNlLCBwcml2YXRlIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgdGhpcy5faWQgPSBwb2x5Z29uSWQrKztcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgY29udGVudCBpbnRpYWxpemF0aW9uIG9mIHRoZSBkaXJlY3RpdmUgaXMgY29tcGxldGUuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudE5hbWU6IHN0cmluZyA9IHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC50YWdOYW1lO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3gtbWFwLWxheWVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luQ3VzdG9tTGF5ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVySWQgPSBOdW1iZXIodGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmF0dHJpYnV0ZXNbJ2xheWVySWQnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvU2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5fcG9seWdvblNlcnZpY2UuQWRkUG9seWdvbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZGVkVG9TZXJ2aWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9TZXJ2aWNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IG86IElQb2x5Z29uT3B0aW9ucyA9IHRoaXMuR2VuZXJhdGVQb2x5Z29uQ2hhbmdlU2V0KGNoYW5nZXMpO1xuICAgICAgICBpZiAobyAhPSBudWxsKSB7IHRoaXMuX3BvbHlnb25TZXJ2aWNlLlNldE9wdGlvbnModGhpcywgbyk7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1BhdGhzJ10gJiYgIWNoYW5nZXNbJ1BhdGhzJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2x5Z29uU2VydmljZS5VcGRhdGVQb2x5Z29uKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgcG95Z29uIGlzIGJlaW5nIGRlc3Ryb3llZC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuIFJlbGVhc2UgcmVzb3VyY2VzLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWdvbkRpcmVjdGl2ZVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9wb2x5Z29uU2VydmljZS5EZWxldGVQb2x5Z29uKHRoaXMpO1xuICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgLy8vXG4gICAgICAgIC8vLyByZW1vdmUgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgICAgICAvLy9cbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBXaXJlcyB1cCB0aGUgZXZlbnQgcmVjZWl2ZXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlnb25EaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBfZ2V0RXZlbnRBcmc6IChlOiBNb3VzZUV2ZW50KSA9PiBJUG9seWdvbkV2ZW50ID0gZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFBvbHlnb246IHRoaXMsXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKHRoaXMuX3BvbHlnb25TZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0OiBNYXBQb2x5Z29uRGlyZWN0aXZlID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmZvQm94ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmZvQm94Lk9wZW4odGhpcy5fcG9seWdvblNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZXYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuQ2xpY2suZW1pdChfZ2V0RXZlbnRBcmcoZXYpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRibENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZy5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdFbmQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdTdGFydC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VEb3duLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZU1vdmUuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdXQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3Zlci5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlVXAuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5SaWdodENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3BhdGhjaGFuZ2VkJywgaGFuZGxlcjogKGV2OiBJUG9seWdvbkV2ZW50KSA9PiB0aGlzLlBhdGhDaGFuZ2VkLmVtaXQoZXYpIH1cbiAgICAgICAgXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcyA9IHRoaXMuX3BvbHlnb25TZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgSVBvbHlnb24gb3B0aW9uIGNoYW5nZXNldCBmcm9tIGRpcmVjdGl2ZSBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0ge0BsaW5rIFNpbXBsZUNoYW5nZXN9IGlkZW50aWZ5aW5nIHRoZSBjaGFuZ2VzIHRoYXQgb2NjdXJlZC5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJUG9seWdvbk9wdGlvbnN9IGNvbnRhaW5pbmcgdGhlIHBvbHlnb24gb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5Z29uRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBHZW5lcmF0ZVBvbHlnb25DaGFuZ2VTZXQoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IElQb2x5Z29uT3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElQb2x5Z29uT3B0aW9ucyA9IHsgaWQ6IHRoaXMuX2lkIH07XG4gICAgICAgIGxldCBoYXNPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmIChjaGFuZ2VzWydDbGlja2FibGUnXSkgeyBvcHRpb25zLmNsaWNrYWJsZSA9IHRoaXMuQ2xpY2thYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snRHJhZ2dhYmxlJ10pIHsgb3B0aW9ucy5kcmFnZ2FibGUgPSB0aGlzLkRyYWdnYWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0VkaXRhYmxlJ10pIHsgb3B0aW9ucy5lZGl0YWJsZSA9IHRoaXMuRWRpdGFibGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydGaWxsQ29sb3InXSB8fCBjaGFuZ2VzWydGaWxsT3BhY2l0eSddKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZpbGxDb2xvciA9IHRoaXMuRmlsbENvbG9yO1xuICAgICAgICAgICAgb3B0aW9ucy5maWxsT3BhY2l0eSA9IHRoaXMuRmlsbE9wYWNpdHk7XG4gICAgICAgICAgICBoYXNPcHRpb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snR2VvZGVzaWMnXSkgeyBvcHRpb25zLmdlb2Rlc2ljID0gdGhpcy5HZW9kZXNpYzsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0xhYmVsTWF4Wm9vbSddKSB7IG9wdGlvbnMubGFiZWxNYXhab29tID0gdGhpcy5MYWJlbE1heFpvb207IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbE1pblpvb20nXSkgeyBvcHRpb25zLmxhYmVsTWluWm9vbSA9IHRoaXMuTGFiZWxNaW5ab29tOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU2hvd1Rvb2x0aXAnXSkgeyBvcHRpb25zLnNob3dUb29sdGlwID0gdGhpcy5TaG93VG9vbHRpcDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1Nob3dMYWJlbCddKSB7IG9wdGlvbnMuc2hvd0xhYmVsID0gdGhpcy5TaG93TGFiZWw7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VDb2xvciddIHx8IGNoYW5nZXNbJ1N0cm9rZU9wYWNpdHknXSkge1xuICAgICAgICAgICAgb3B0aW9ucy5zdHJva2VDb2xvciA9IHRoaXMuU3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICBvcHRpb25zLnN0cm9rZU9wYWNpdHkgPSB0aGlzLlN0cm9rZU9wYWNpdHk7XG4gICAgICAgICAgICBoYXNPcHRpb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU3Ryb2tlV2VpZ2h0J10pIHsgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSB0aGlzLlN0cm9rZVdlaWdodDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1RpdGxlJ10pIHsgb3B0aW9ucy50aXRsZSA9IHRoaXMuVGl0bGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHsgb3B0aW9ucy52aXNpYmxlID0gdGhpcy5WaXNpYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHsgb3B0aW9ucy56SW5kZXggPSB0aGlzLnpJbmRleDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGhhc09wdGlvbnMgPyBvcHRpb25zIDogbnVsbDtcbiAgICB9XG5cbn1cbiJdfQ==