/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ViewContainerRef, EventEmitter, ContentChild } from '@angular/core';
import { PolylineService } from '../services/polyline.service';
import { InfoBoxComponent } from './infobox';
/** @type {?} */
var polylineId = 0;
/**
 *
 * MapPolylineDirective renders a polyline inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapPolylineDirective} from '...';
 *
 * \@Component({
 *  selector: 'my-map,
 *  styles: [`
 *   .map-container { height: 300px; }
 * `],
 * template: `
 *   <x-map [Latitude]="lat" [Longitude]="lng" [Zoom]="zoom">
 *      <x-map-polyline [Paths]="path"></x-map-polyline>
 *   </x-map>
 * `
 * })
 * ```
 *
 *
 * @export
 */
var MapPolylineDirective = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates an instance of MapPolylineDirective.
     * @param _polylineManager
     *
     * @memberof MapPolylineDirective
     */
    function MapPolylineDirective(_polylineService, _containerRef) {
        this._polylineService = _polylineService;
        this._containerRef = _containerRef;
        this._inCustomLayer = false;
        this._addedToService = false;
        this._events = [];
        /**
         * Gets or sets whether this Polyline handles mouse events.
         *
         * \@memberof MapPolylineDirective
         */
        this.Clickable = true;
        /**
         * If set to true, the user can drag this shape over the map.
         *
         * \@memberof MapPolylineDirective
         */
        this.Draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment.
         *
         * \@memberof MapPolylineDirective
         */
        this.Editable = false;
        /**
         * When true, edges of the polyline are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polyline are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polyline may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         *
         * \@memberof MapPolylineDirective
         */
        this.Geodesic = false;
        /**
         * Arbitary metadata to assign to the Polyline. This is useful for events
         *
         * \@memberof MapPolylineDirective
         */
        this.Metadata = new Map();
        /**
         * The ordered sequence of coordinates that designates a polyline.
         * Simple polylines may be defined using a single array of LatLngs. More
         * complex polylines may specify an array of arrays.
         *
         * \@memberof MapPolylineDirective
         */
        this.Path = [];
        /**
         * Whether to show the title of the polyline as the tooltip on the polygon.
         *
         * \@memberof MapPolylineDirective
         */
        this.ShowTooltip = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.Click = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         *
         * \@memberof MapPolylineDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         *
         * \@memberof MapPolylineDirective
         */
        this.RightClick = new EventEmitter();
        this._id = polylineId++;
    }
    Object.defineProperty(MapPolylineDirective.prototype, "AddedToService", {
        get: /**
         * Gets whether the polyline has been registered with the service.
         * \@readonly
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        function () { return this._addedToService; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineDirective.prototype, "Id", {
        get: /**
         * Get the id of the polyline.
         *
         * \@readonly
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineDirective.prototype, "IdAsString", {
        get: /**
         * Gets the id of the polyline as a string.
         *
         * \@readonly
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        function () { return this._id.toString(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineDirective.prototype, "InCustomLayer", {
        get: /**
         * Gets whether the polyline is in a custom layer. See {\@link MapLayer}.
         *
         * \@readonly
         * \@memberof MapPolylineDirective
         * @return {?}
         */
        function () { return this._inCustomLayer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolylineDirective.prototype, "LayerId", {
        get: /**
         * gets the id of the Layer the polyline belongs to.
         *
         * \@readonly
         * \@memberof MapPolylineDirective
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
     * @memberof MapPolylineDirective
     */
    /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    MapPolylineDirective.prototype.ngAfterContentInit = /**
     * Called after the content intialization of the directive is complete. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
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
            this._polylineService.AddPolyline(this);
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
     * @memberof MapPolylineDirective
     */
    /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    MapPolylineDirective.prototype.ngOnChanges = /**
     * Called when changes to the databoud properties occur. Part of the ng Component life cycle.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - Changes that have occured.
     *
     * @return {?}
     */
    function (changes) {
        if (!this._addedToService) {
            return;
        }
        /** @type {?} */
        var o = this.GeneratePolylineChangeSet(changes);
        if (o != null) {
            this._polylineService.SetOptions(this, o);
        }
        if (changes['Path'] && !changes['Path'].isFirstChange()) {
            this._polylineService.UpdatePolyline(this);
        }
    };
    /**
     * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * @memberof MapPolylineDirective
     */
    /**
     * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    MapPolylineDirective.prototype.ngOnDestroy = /**
     * Called when the polyline is being destroyed. Part of the ng Component life cycle. Release resources.
     *
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    function () {
        this._polylineService.DeletePolyline(this);
        this._events.forEach(function (s) { return s.unsubscribe(); });
    };
    /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    MapPolylineDirective.prototype.AddEventListeners = /**
     * Wires up the event receivers.
     *
     * \@memberof MapPolylineDirective
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var _getEventArg = function (e) {
            return {
                Polyline: _this,
                Click: e
            };
        };
        this._polylineService.CreateEventObservable('click', this).subscribe(function (ev) {
            if (_this._infoBox != null) {
                _this._infoBox.Open(_this._polylineService.GetCoordinatesFromClick(ev));
            }
            _this.Click.emit(_getEventArg(ev));
        });
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
        ];
        handlers.forEach(function (obj) {
            /** @type {?} */
            var os = _this._polylineService.CreateEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._events.push(os);
        });
    };
    /**
     * Generates IPolyline option changeset from directive settings.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolylineOptions} containing the polyline options.
     *
     */
    MapPolylineDirective.prototype.GeneratePolylineChangeSet = /**
     * Generates IPolyline option changeset from directive settings.
     *
     * \@memberof MapPolylineDirective
     * @param {?} changes - {\@link SimpleChanges} identifying the changes that occured.
     * @return {?} - {\@link IPolylineOptions} containing the polyline options.
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
        if (changes['Geodesic']) {
            options.geodesic = this.Geodesic;
            hasOptions = true;
        }
        if (changes['ShowTooltip']) {
            options.showTooltip = this.ShowTooltip;
            hasOptions = true;
        }
        if (changes['StrokeColor']) {
            options.strokeColor = this.StrokeColor;
            hasOptions = true;
        }
        if (changes['StrokeOpacity']) {
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
    MapPolylineDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'x-map-polyline'
                },] },
    ];
    /** @nocollapse */
    MapPolylineDirective.ctorParameters = function () { return [
        { type: PolylineService },
        { type: ViewContainerRef }
    ]; };
    MapPolylineDirective.propDecorators = {
        _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
        Clickable: [{ type: Input }],
        Draggable: [{ type: Input }],
        Editable: [{ type: Input }],
        Geodesic: [{ type: Input }],
        Metadata: [{ type: Input }],
        Path: [{ type: Input }],
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
        RightClick: [{ type: Output }]
    };
    return MapPolylineDirective;
}());
export { MapPolylineDirective };
if (false) {
    /** @type {?} */
    MapPolylineDirective.prototype._inCustomLayer;
    /** @type {?} */
    MapPolylineDirective.prototype._id;
    /** @type {?} */
    MapPolylineDirective.prototype._layerId;
    /** @type {?} */
    MapPolylineDirective.prototype._addedToService;
    /** @type {?} */
    MapPolylineDirective.prototype._events;
    /** @type {?} */
    MapPolylineDirective.prototype._infoBox;
    /**
     * Gets or sets whether this Polyline handles mouse events.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Clickable;
    /**
     * If set to true, the user can drag this shape over the map.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Editable;
    /**
     * When true, edges of the polyline are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polyline are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polyline may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Geodesic;
    /**
     * Arbitary metadata to assign to the Polyline. This is useful for events
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Metadata;
    /**
     * The ordered sequence of coordinates that designates a polyline.
     * Simple polylines may be defined using a single array of LatLngs. More
     * complex polylines may specify an array of arrays.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Path;
    /**
     * Whether to show the title of the polyline as the tooltip on the polygon.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.ShowTooltip;
    /**
     * The stroke color.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeOpacity;
    /**
     * The stroke width in pixels.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.StrokeWeight;
    /**
     * The title of the polygon.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Title;
    /**
     * Whether this polyline is visible on the map. Defaults to true.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Visible;
    /**
     * The zIndex compared to other polys.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Click;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DragEnd;
    /**
     * This event is fired when the user starts dragging the polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.DragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polyline.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseMove;
    /**
     * This event is fired on Polyline mouseout.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseOut;
    /**
     * This event is fired on Polyline mouseover.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polyline
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.MouseUp;
    /**
     * This even is fired when the Polyline is right-clicked on.
     *
     * \@memberof MapPolylineDirective
     * @type {?}
     */
    MapPolylineDirective.prototype.RightClick;
    /** @type {?} */
    MapPolylineDirective.prototype._polylineService;
    /** @type {?} */
    MapPolylineDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXBvbHlsaW5lLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL2NvbXBvbmVudHMvbWFwLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXdCLGdCQUFnQixFQUNoRSxZQUFZLEVBQUUsWUFBWSxFQUM3QixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOztBQUU3QyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZRZixHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7T0FLRztJQUNILDhCQUFvQixnQkFBaUMsRUFBVSxhQUErQjtRQUExRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWtCOzhCQXBQckUsS0FBSzsrQkFHSixLQUFLO3VCQUNHLEVBQUU7Ozs7Ozt5QkFhUixJQUFJOzs7Ozs7eUJBT0osS0FBSzs7Ozs7Ozt3QkFRTixLQUFLOzs7Ozs7Ozs7O3dCQVdMLEtBQUs7Ozs7Ozt3QkFPYSxJQUFJLEdBQUcsRUFBZTs7Ozs7Ozs7b0JBU0YsRUFBRTs7Ozs7OzJCQU81QixJQUFJOzs7Ozs7cUJBcURLLElBQUksWUFBWSxFQUFrQjs7Ozs7O3dCQU8vQixJQUFJLFlBQVksRUFBa0I7Ozs7OztvQkFPdEMsSUFBSSxZQUFZLEVBQWtCOzs7Ozs7dUJBTy9CLElBQUksWUFBWSxFQUFrQjs7Ozs7O3lCQU9oQyxJQUFJLFlBQVksRUFBa0I7Ozs7Ozt5QkFPbEMsSUFBSSxZQUFZLEVBQWtCOzs7Ozs7eUJBT2xDLElBQUksWUFBWSxFQUFrQjs7Ozs7O3dCQU9uQyxJQUFJLFlBQVks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LElBQUksQ0FBQztTQUFFO1FBQzNFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Z0JBelgxQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7Ozs7Z0JBakNRLGVBQWU7Z0JBUDRCLGdCQUFnQjs7OzJCQXVEL0QsWUFBWSxTQUFDLGdCQUFnQjs0QkFRN0IsS0FBSzs0QkFPTCxLQUFLOzJCQVFMLEtBQUs7MkJBV0wsS0FBSzsyQkFPTCxLQUFLO3VCQVNMLEtBQUs7OEJBT0wsS0FBSzs4QkFPTCxLQUFLO2dDQU9MLEtBQUs7K0JBT0wsS0FBSzt3QkFPTCxLQUFLOzBCQU9MLEtBQUs7eUJBT0wsS0FBSzt3QkFXTCxNQUFNOzJCQU9OLE1BQU07dUJBT04sTUFBTTswQkFPTixNQUFNOzRCQU9OLE1BQU07NEJBT04sTUFBTTs0QkFPTixNQUFNOzJCQU9OLE1BQU07NEJBT04sTUFBTTswQkFPTixNQUFNOzZCQU9OLE1BQU07OytCQTVPWDs7U0EwQ2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgUG9seWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9seWxpbmUuc2VydmljZSc7XG5pbXBvcnQgeyBJUG9seWxpbmVFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLWV2ZW50JztcbmltcG9ydCB7IEluZm9Cb3hDb21wb25lbnQgfSBmcm9tICcuL2luZm9ib3gnO1xuXG5sZXQgcG9seWxpbmVJZCA9IDA7XG5cbi8qKlxuICpcbiAqIE1hcFBvbHlsaW5lRGlyZWN0aXZlIHJlbmRlcnMgYSBwb2x5bGluZSBpbnNpZGUgYSB7QGxpbmsgTWFwQ29tcG9uZW50fS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtNYXBDb21wb25lbnQsIE1hcFBvbHlsaW5lRGlyZWN0aXZlfSBmcm9tICcuLi4nO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLFxuICogIHN0eWxlczogW2BcbiAqICAgLm1hcC1jb250YWluZXIgeyBoZWlnaHQ6IDMwMHB4OyB9XG4gKiBgXSxcbiAqIHRlbXBsYXRlOiBgXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDx4LW1hcC1wb2x5bGluZSBbUGF0aHNdPVwicGF0aFwiPjwveC1tYXAtcG9seWxpbmU+XG4gKiAgIDwveC1tYXA+XG4gKiBgXG4gKiB9KVxuICogYGBgXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1wb2x5bGluZSdcbn0pXG5leHBvcnQgY2xhc3MgTWFwUG9seWxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICAvLy9cbiAgICAvLy8gRmllbGQgZGVjbGFyYXRpb25zXG4gICAgLy8vXG4gICAgcHJpdmF0ZSBfaW5DdXN0b21MYXllciA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbGF5ZXJJZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2FkZGVkVG9TZXJ2aWNlID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZXZlbnRzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgLy8vXG4gICAgLy8vIEFueSBJbmZvQm94IHRoYXQgaXMgYSBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIHBvbHlsaW5lXG4gICAgLy8vXG4gICAgQENvbnRlbnRDaGlsZChJbmZvQm94Q29tcG9uZW50KSBwcm90ZWN0ZWQgX2luZm9Cb3g6IEluZm9Cb3hDb21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRoaXMgUG9seWxpbmUgaGFuZGxlcyBtb3VzZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgQ2xpY2thYmxlID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBEcmFnZ2FibGUgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sXG4gICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEVkaXRhYmxlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5bGluZSBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGxcbiAgICAgKiBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5bGluZSBhcmVcbiAgICAgKiByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYVxuICAgICAqIGdlb2Rlc2ljIHBvbHlsaW5lIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcbiAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEdlb2Rlc2ljID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBBcmJpdGFyeSBtZXRhZGF0YSB0byBhc3NpZ24gdG8gdGhlIFBvbHlsaW5lLiBUaGlzIGlzIHVzZWZ1bCBmb3IgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9yZGVyZWQgc2VxdWVuY2Ugb2YgY29vcmRpbmF0ZXMgdGhhdCBkZXNpZ25hdGVzIGEgcG9seWxpbmUuXG4gICAgICogU2ltcGxlIHBvbHlsaW5lcyBtYXkgYmUgZGVmaW5lZCB1c2luZyBhIHNpbmdsZSBhcnJheSBvZiBMYXRMbmdzLiBNb3JlXG4gICAgICogY29tcGxleCBwb2x5bGluZXMgbWF5IHNwZWNpZnkgYW4gYXJyYXkgb2YgYXJyYXlzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFBhdGg6IEFycmF5PElMYXRMb25nPiB8IEFycmF5PEFycmF5PElMYXRMb25nPj4gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdGl0bGUgb2YgdGhlIHBvbHlsaW5lIGFzIHRoZSB0b29sdGlwIG9uIHRoZSBwb2x5Z29uLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFNob3dUb29sdGlwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJva2UgY29sb3IuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlQ29sb3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJva2Ugb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgU3Ryb2tlV2VpZ2h0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIHBvbHlnb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBwb2x5bGluZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgekluZGV4OiBudW1iZXI7XG5cbiAgICAvLy9cbiAgICAvLy8gRGVsZWdhdGUgZGVmaW5pdGlvbnNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBDbGljazogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEcmFnOiBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcG9seWxpbmUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRHJhZ0VuZDogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZURvd246IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW91dC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU91dDogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3Zlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZVxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlVXA6IEV2ZW50RW1pdHRlcjxJUG9seWxpbmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVuIGlzIGZpcmVkIHdoZW4gdGhlIFBvbHlsaW5lIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPElQb2x5bGluZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SVBvbHlsaW5lRXZlbnQ+KCk7XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvcGVydHkgZGVjbGFyYXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIHBvbHlsaW5lIGhhcyBiZWVuIHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2VydmljZS5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IEFkZGVkVG9TZXJ2aWNlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fYWRkZWRUb1NlcnZpY2U7IH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWQgb2YgdGhlIHBvbHlsaW5lLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlkIG9mIHRoZSBwb2x5bGluZSBhcyBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgSWRBc1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQudG9TdHJpbmcoKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBpbiBhIGN1c3RvbSBsYXllci4gU2VlIHtAbGluayBNYXBMYXllcn0uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IEluQ3VzdG9tTGF5ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbkN1c3RvbUxheWVyOyB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRzIHRoZSBpZCBvZiB0aGUgTGF5ZXIgdGhlIHBvbHlsaW5lIGJlbG9uZ3MgdG8uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IExheWVySWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xheWVySWQ7IH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBQb2x5bGluZURpcmVjdGl2ZS5cbiAgICAgKiBAcGFyYW0gX3BvbHlsaW5lTWFuYWdlclxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmVTZXJ2aWNlOiBQb2x5bGluZVNlcnZpY2UsIHByaXZhdGUgX2NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICB0aGlzLl9pZCA9IHBvbHlsaW5lSWQrKztcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgY29udGVudCBpbnRpYWxpemF0aW9uIG9mIHRoZSBkaXJlY3RpdmUgaXMgY29tcGxldGUuIFBhcnQgb2YgdGhlIG5nIENvbXBvbmVudCBsaWZlIGN5Y2xlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lOiBzdHJpbmcgPSB0aGlzLl9jb250YWluZXJSZWYuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd4LW1hcC1sYXllcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbkN1c3RvbUxheWVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb1NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvbHlsaW5lU2VydmljZS5BZGRQb2x5bGluZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZGVkVG9TZXJ2aWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY2hhbmdlcyB0byB0aGUgZGF0YWJvdWQgcHJvcGVydGllcyBvY2N1ci4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIENoYW5nZXMgdGhhdCBoYXZlIG9jY3VyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvU2VydmljZSkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBvOiBJUG9seWxpbmVPcHRpb25zID0gdGhpcy5HZW5lcmF0ZVBvbHlsaW5lQ2hhbmdlU2V0KGNoYW5nZXMpO1xuICAgICAgICBpZiAobyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZVNlcnZpY2UuU2V0T3B0aW9ucyh0aGlzLCBvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snUGF0aCddICYmICFjaGFuZ2VzWydQYXRoJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2x5bGluZVNlcnZpY2UuVXBkYXRlUG9seWxpbmUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgcG9seWxpbmUgaXMgYmVpbmcgZGVzdHJveWVkLiBQYXJ0IG9mIHRoZSBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS4gUmVsZWFzZSByZXNvdXJjZXMuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBQb2x5bGluZURpcmVjdGl2ZVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9wb2x5bGluZVNlcnZpY2UuRGVsZXRlUG9seWxpbmUodGhpcyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICAgICAgLy8vXG4gICAgICAgICAgICAvLy8gcmVtb3ZlIGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIC8vL1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcml2YXRlIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIFdpcmVzIHVwIHRoZSBldmVudCByZWNlaXZlcnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwUG9seWxpbmVEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIEFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBfZ2V0RXZlbnRBcmc6IChlOiBNb3VzZUV2ZW50KSA9PiBJUG9seWxpbmVFdmVudCA9IGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBQb2x5bGluZTogdGhpcyxcbiAgICAgICAgICAgICAgICBDbGljazogZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGV2OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5mb0JveCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5mb0JveC5PcGVuKHRoaXMuX3BvbHlsaW5lU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhldikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5DbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EYmxDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWcuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnRW5kLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5EcmFnU3RhcnQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vkb3duJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlRG93bi5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VNb3ZlLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3V0LmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZU92ZXIuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZVVwLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuUmlnaHRDbGljay5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgIF07XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3MgPSB0aGlzLl9wb2x5bGluZVNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBJUG9seWxpbmUgb3B0aW9uIGNoYW5nZXNldCBmcm9tIGRpcmVjdGl2ZSBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzIC0ge0BsaW5rIFNpbXBsZUNoYW5nZXN9IGlkZW50aWZ5aW5nIHRoZSBjaGFuZ2VzIHRoYXQgb2NjdXJlZC5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJUG9seWxpbmVPcHRpb25zfSBjb250YWluaW5nIHRoZSBwb2x5bGluZSBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcFBvbHlsaW5lRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBHZW5lcmF0ZVBvbHlsaW5lQ2hhbmdlU2V0KGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBJUG9seWxpbmVPcHRpb25zIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSVBvbHlsaW5lT3B0aW9ucyA9IHsgaWQ6IHRoaXMuX2lkIH07XG4gICAgICAgIGxldCBoYXNPcHRpb25zOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmIChjaGFuZ2VzWydDbGlja2FibGUnXSkgeyBvcHRpb25zLmNsaWNrYWJsZSA9IHRoaXMuQ2xpY2thYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snRHJhZ2dhYmxlJ10pIHsgb3B0aW9ucy5kcmFnZ2FibGUgPSB0aGlzLkRyYWdnYWJsZTsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0VkaXRhYmxlJ10pIHsgb3B0aW9ucy5lZGl0YWJsZSA9IHRoaXMuRWRpdGFibGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydHZW9kZXNpYyddKSB7IG9wdGlvbnMuZ2VvZGVzaWMgPSB0aGlzLkdlb2Rlc2ljOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU2hvd1Rvb2x0aXAnXSkgeyBvcHRpb25zLnNob3dUb29sdGlwID0gdGhpcy5TaG93VG9vbHRpcDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1N0cm9rZUNvbG9yJ10pIHsgb3B0aW9ucy5zdHJva2VDb2xvciA9IHRoaXMuU3Ryb2tlQ29sb3I7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydTdHJva2VPcGFjaXR5J10pIHsgb3B0aW9ucy5zdHJva2VPcGFjaXR5ID0gdGhpcy5TdHJva2VPcGFjaXR5OyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snU3Ryb2tlV2VpZ2h0J10pIHsgb3B0aW9ucy5zdHJva2VXZWlnaHQgPSB0aGlzLlN0cm9rZVdlaWdodDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ1RpdGxlJ10pIHsgb3B0aW9ucy50aXRsZSA9IHRoaXMuVGl0bGU7IGhhc09wdGlvbnMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydWaXNpYmxlJ10pIHsgb3B0aW9ucy52aXNpYmxlID0gdGhpcy5WaXNpYmxlOyBoYXNPcHRpb25zID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHsgb3B0aW9ucy56SW5kZXggPSB0aGlzLnpJbmRleDsgaGFzT3B0aW9ucyA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGhhc09wdGlvbnMgPyBvcHRpb25zIDogbnVsbDtcbiAgICB9XG5cbn1cbiJdfQ==