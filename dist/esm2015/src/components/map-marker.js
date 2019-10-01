/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, ContentChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';
import { MarkerService } from '../services/marker.service';
import { InfoBoxComponent } from './infobox';
/** *
 * internal counter to use as ids for marker.
  @type {?} */
let markerId = 0;
/**
 * MapMarkerDirective renders a map marker inside a {\@link MapComponent}.
 *
 * ### Example
 * ```typescript
 * import {Component} from '\@angular/core';
 * import {MapComponent, MapMarkerDirective} from '...';
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
 *      <x-map-marker [Latitude]="lat" [Longitude]="lng" [Label]="'M'"></x-map-marker>
 *   </x-map>
 * `
 * })
 * ```
 *
 * @export
 */
export class MapMarkerDirective {
    /**
     * Creates an instance of MapMarkerDirective.
     * \@memberof MapMarkerDirective
     * @param {?} _markerService - Concreate implementation of a {\@link MarkerService}.
     * @param {?} _containerRef - View container hosting the marker.
     * Used to determine parent layer through markup.
     *
     */
    constructor(_markerService, _containerRef) {
        this._markerService = _markerService;
        this._containerRef = _containerRef;
        this._clickTimeout = null;
        this._events = [];
        this._inClusterLayer = false;
        this._inCustomLayer = false;
        this._markerAddedToManger = false;
        /**
         * This event is fired when the DOM dblclick event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.Drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DragEnd = new EventEmitter();
        /**
         * If true, the marker can be dragged. Default value is false.
         *
         * \@memberof MapMarkerDirective
         */
        this.Draggable = false;
        /**
         * This event is fired when the user starts dragging the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.DragStart = new EventEmitter();
        /**
         * This event emitter gets emitted when a marker icon is being created.
         *
         * \@memberof MapMarkerDirective
         */
        this.DynamicMarkerCreated = new EventEmitter();
        /**
         * True to indiciate whether this is the first marker in a set.
         * Use this for bulk operations (particularily clustering) to ensure performance.
         *
         * \@memberof MapMarkerDirective
         */
        this.IsFirstInSet = false;
        /**
         * True to indiciate whether this is the last marker in a set.
         * Use this for bulk operations (particularily clustering) to ensure performance.
         *
         * \@memberof MapMarkerDirective
         */
        this.IsLastInSet = true;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MarkerClick = new EventEmitter();
        /**
         * Arbitary metadata to assign to the Marker. This is useful for events
         *
         * \@memberof MapMarkerDirective
         */
        this.Metadata = new Map();
        /**
         * This event is fired when the DOM mousedown event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the marker.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseMove = new EventEmitter();
        /**
         * This event is fired on marker mouseout.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOut = new EventEmitter();
        /**
         * This event is fired on marker mouseover.
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the marker
         *
         * \@memberof MapMarkerDirective
         */
        this.MouseUp = new EventEmitter();
        /**
         * This even is fired when the marker is right-clicked on.
         *
         * \@memberof MapMarkerDirective
         */
        this.RightClick = new EventEmitter();
        this._id = (markerId++).toString();
    }
    /**
     * Getswhether the marker has already been added to the marker service and is ready for use.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get AddedToManager() { return this._markerAddedToManger; }
    /**
     * Gets the id of the marker as a string.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get Id() { return this._id; }
    /**
     * Gets whether the marker is in a cluster layer. See {\@link ClusterLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InClusterLayer() { return this._inClusterLayer; }
    /**
     * Gets whether the marker is in a custom layer. See {\@link MapLayer}.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get InCustomLayer() { return this._inCustomLayer; }
    /**
     * gets the id of the Layer the marker belongs to.
     *
     * \@readonly
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    get LayerId() { return this._layerId; }
    /**
     * Translates a marker geo location to a pixel location relative to the map viewport.
     *
     * \@memberof MapMarkerDirective
     * @param {?=} loc
     * @return {?} - A promise that when fullfilled contains an {\@link IPoint} representing the pixel coordinates.
     *
     */
    LocationToPixel(loc) {
        return this._markerService.LocationToPoint(loc ? loc : this);
    }
    /**
     * Called after Component content initialization. Part of ng Component life cycle.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._infoBox != null) {
            this._infoBox.HostMarker = this;
        }
        if (this._containerRef.element.nativeElement.parentElement) {
            /** @type {?} */
            const parentName = this._containerRef.element.nativeElement.parentElement.tagName;
            if (parentName.toLowerCase() === 'x-cluster-layer') {
                this._inClusterLayer = true;
            }
            else if (parentName.toLowerCase() === 'x-map-layer') {
                this._inCustomLayer = true;
            }
            this._layerId = Number(this._containerRef.element.nativeElement.parentElement.attributes['layerId']);
        }
        if (!this._markerAddedToManger) {
            this._markerService.AddMarker(this);
            this._markerAddedToManger = true;
            this.AddEventListeners();
        }
    }
    /**
     * Reacts to changes in data-bound properties of the component and actuates property changes in the underling layer model.
     *
     * \@memberof MapMarkerDirective
     * @param {?} changes - collection of changes.
     *
     * @return {?}
     */
    ngOnChanges(changes) {
        if (typeof this.Latitude !== 'number' || typeof this.Longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            return;
        }
        if (changes['Latitude'] || changes['Longitude']) {
            this._markerService.UpdateMarkerPosition(this);
        }
        if (changes['Title']) {
            this._markerService.UpdateTitle(this);
        }
        if (changes['Label']) {
            this._markerService.UpdateLabel(this);
        }
        if (changes['Draggable']) {
            this._markerService.UpdateDraggable(this);
        }
        if (changes['IconUrl'] || changes['IconInfo']) {
            this._markerService.UpdateIcon(this);
        }
        if (changes['Anchor']) {
            this._markerService.UpdateAnchor(this);
        }
        if (changes['Visible']) {
            this._markerService.UpdateVisible(this);
        }
    }
    /**
     * Called on component destruction. Frees the resources used by the component. Part of the ng Component life cycle.
     *
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    ngOnDestroy() {
        this._markerService.DeleteMarker(this);
        this._events.forEach((s) => s.unsubscribe());
    }
    /**
     * Obtains a string representation of the Marker Id.
     * \@memberof MapMarkerDirective
     * @return {?} - string representation of the marker id.
     */
    toString() { return 'MapMarker-' + this._id.toString(); }
    /**
     * Adds various event listeners for the marker.
     *
     * \@memberof MapMarkerDirective
     * @return {?}
     */
    AddEventListeners() {
        /** @type {?} */
        const _getEventArg = e => {
            return {
                Marker: this,
                Click: e,
                Location: this._markerService.GetCoordinatesFromClick(e),
                Pixels: this._markerService.GetPixelsFromClick(e)
            };
        };
        this._events.push(this._markerService.CreateEventObservable('click', this).subscribe((e) => {
            this._clickTimeout = timer(300).subscribe(n => {
                if (this._infoBox != null) {
                    this._infoBox.Open(this._markerService.GetCoordinatesFromClick(e));
                }
                this.MarkerClick.emit(_getEventArg(e));
            });
        }));
        this._events.push(this._markerService.CreateEventObservable('dblclick', this).subscribe((e) => {
            if (this._clickTimeout) {
                this._clickTimeout.unsubscribe();
                this._clickTimeout = null;
            }
            this.DblClick.emit(_getEventArg(e));
        }));
        /** @type {?} */
        const handlers = [
            { name: 'drag', handler: (ev) => this.Drag.emit(_getEventArg(ev)) },
            { name: 'dragend', handler: (ev) => this.DragEnd.emit(_getEventArg(ev)) },
            { name: 'dragstart', handler: (ev) => this.DragStart.emit(_getEventArg(ev)) },
            { name: 'mousedown', handler: (ev) => this.MouseDown.emit(_getEventArg(ev)) },
            { name: 'mousemove', handler: (ev) => this.MouseMove.emit(_getEventArg(ev)) },
            { name: 'mouseout', handler: (ev) => this.MouseOut.emit(_getEventArg(ev)) },
            { name: 'mouseover', handler: (ev) => this.MouseOver.emit(_getEventArg(ev)) },
            { name: 'mouseup', handler: (ev) => this.MouseUp.emit(_getEventArg(ev)) },
            { name: 'rightclick', handler: (ev) => this.RightClick.emit(_getEventArg(ev)) },
        ];
        handlers.forEach((obj) => {
            /** @type {?} */
            const os = this._markerService.CreateEventObservable(obj.name, this).subscribe(obj.handler);
            this._events.push(os);
        });
    }
}
MapMarkerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'x-map-marker'
            },] },
];
/** @nocollapse */
MapMarkerDirective.ctorParameters = () => [
    { type: MarkerService },
    { type: ViewContainerRef }
];
MapMarkerDirective.propDecorators = {
    _infoBox: [{ type: ContentChild, args: [InfoBoxComponent,] }],
    Anchor: [{ type: Input }],
    DblClick: [{ type: Output }],
    Drag: [{ type: Output }],
    DragEnd: [{ type: Output }],
    Draggable: [{ type: Input }],
    DragStart: [{ type: Output }],
    DynamicMarkerCreated: [{ type: Output }],
    Height: [{ type: Input }],
    IconInfo: [{ type: Input }],
    IconUrl: [{ type: Input }],
    IsFirstInSet: [{ type: Input }],
    IsLastInSet: [{ type: Input }],
    Label: [{ type: Input }],
    Latitude: [{ type: Input }],
    Longitude: [{ type: Input }],
    MarkerClick: [{ type: Output }],
    Metadata: [{ type: Input }],
    MouseDown: [{ type: Output }],
    MouseMove: [{ type: Output }],
    MouseOut: [{ type: Output }],
    MouseOver: [{ type: Output }],
    MouseUp: [{ type: Output }],
    RightClick: [{ type: Output }],
    Title: [{ type: Input }],
    Visible: [{ type: Input }],
    Width: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MapMarkerDirective.prototype._clickTimeout;
    /** @type {?} */
    MapMarkerDirective.prototype._events;
    /** @type {?} */
    MapMarkerDirective.prototype._id;
    /** @type {?} */
    MapMarkerDirective.prototype._inClusterLayer;
    /** @type {?} */
    MapMarkerDirective.prototype._inCustomLayer;
    /**
     * Any InfoBox that is a direct children of the marker
     *
     * @protected
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype._infoBox;
    /** @type {?} */
    MapMarkerDirective.prototype._layerId;
    /** @type {?} */
    MapMarkerDirective.prototype._markerAddedToManger;
    /**
     *  Icon anchor relative to marker root
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Anchor;
    /**
     * This event is fired when the DOM dblclick event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DblClick;
    /**
     * This event is repeatedly fired while the user drags the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Drag;
    /**
     * This event is fired when the user stops dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragEnd;
    /**
     * If true, the marker can be dragged. Default value is false.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Draggable;
    /**
     * This event is fired when the user starts dragging the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DragStart;
    /**
     * This event emitter gets emitted when a marker icon is being created.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.DynamicMarkerCreated;
    /**
     * Icon height
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Height;
    /**
     * Information for dynamic, custom created icons.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconInfo;
    /**
     * Icon (the URL of the image) for the foreground.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IconUrl;
    /**
     * True to indiciate whether this is the first marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsFirstInSet;
    /**
     * True to indiciate whether this is the last marker in a set.
     * Use this for bulk operations (particularily clustering) to ensure performance.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.IsLastInSet;
    /**
     * The label (a single uppercase character) for the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Label;
    /**
     * The latitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Latitude;
    /**
     * The longitude position of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Longitude;
    /**
     * This event emitter gets emitted when the user clicks on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MarkerClick;
    /**
     * Arbitary metadata to assign to the Marker. This is useful for events
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Metadata;
    /**
     * This event is fired when the DOM mousedown event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseMove;
    /**
     * This event is fired on marker mouseout.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOut;
    /**
     * This event is fired on marker mouseover.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.MouseUp;
    /**
     * This even is fired when the marker is right-clicked on.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.RightClick;
    /**
     *  The title of the marker.
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Title;
    /**
     * Sets the visibility of the marker
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Visible;
    /**
     * Icon Width
     *
     * \@memberof MapMarkerDirective
     * @type {?}
     */
    MapMarkerDirective.prototype.Width;
    /** @type {?} */
    MapMarkerDirective.prototype._markerService;
    /** @type {?} */
    MapMarkerDirective.prototype._containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLW1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL21hcC1tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQ3RDLFlBQVksRUFBRSxZQUFZLEVBQW9CLGdCQUFnQixFQUNqRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUszQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBSzdDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QmpCLE1BQU07Ozs7Ozs7OztJQThRRixZQUFvQixjQUE2QixFQUFVLGFBQStCO1FBQXRFLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWtCOzZCQXpRcEQsSUFBSTt1QkFDUixFQUFFOytCQUVWLEtBQUs7OEJBQ04sS0FBSztvQ0FXQyxLQUFLOzs7Ozs7d0JBY2EsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7b0JBT3BDLElBQUksWUFBWSxFQUFnQjs7Ozs7O3VCQU83QixJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt5QkFPcEQsS0FBSzs7Ozs7O3lCQU9pQixJQUFJLFlBQVksRUFBZ0I7Ozs7OztvQ0FPWCxJQUFJLFlBQVksRUFBbUI7Ozs7Ozs7NEJBNkIzRSxLQUFLOzs7Ozs7OzJCQVFOLElBQUk7Ozs7OzsyQkE0QnlCLElBQUksWUFBWSxFQUFnQjs7Ozs7O3dCQU85QyxJQUFJLEdBQUcsRUFBZTs7Ozs7O3lCQU9qQixJQUFJLFlBQVksRUFBZ0I7Ozs7Ozt5QkFPaEMsSUFBSSxZQUFZLEVBQWdCOzs7Ozs7d0JBT2pDLElB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dUJBT0wsS0FBSzt3QkFPTCxLQUFLOzBCQU9MLE1BQU07dUJBT04sS0FBSzt3QkFPTCxNQUFNO3dCQU9OLE1BQU07dUJBT04sTUFBTTt3QkFPTixNQUFNO3NCQU9OLE1BQU07eUJBT04sTUFBTTtvQkFPTixLQUFLO3NCQU9MLEtBQUs7b0JBT0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLCBTaW1wbGVDaGFuZ2UsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLFxuICAgIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9pbnQnO1xuaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElNYXJrZXJFdmVudCB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW1hcmtlci1ldmVudCc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IE1hcmtlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYXJrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvQm94Q29tcG9uZW50IH0gZnJvbSAnLi9pbmZvYm94JztcblxuLyoqXG4gKiBpbnRlcm5hbCBjb3VudGVyIHRvIHVzZSBhcyBpZHMgZm9yIG1hcmtlci5cbiAqL1xubGV0IG1hcmtlcklkID0gMDtcblxuLyoqXG4gKiBNYXBNYXJrZXJEaXJlY3RpdmUgcmVuZGVycyBhIG1hcCBtYXJrZXIgaW5zaWRlIGEge0BsaW5rIE1hcENvbXBvbmVudH0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7TWFwQ29tcG9uZW50LCBNYXBNYXJrZXJEaXJlY3RpdmV9IGZyb20gJy4uLic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgIC5tYXAtY29udGFpbmVyIHtcbiAqICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICB9XG4gKiBgXSxcbiAqIHRlbXBsYXRlOiBgXG4gKiAgIDx4LW1hcCBbTGF0aXR1ZGVdPVwibGF0XCIgW0xvbmdpdHVkZV09XCJsbmdcIiBbWm9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDx4LW1hcC1tYXJrZXIgW0xhdGl0dWRlXT1cImxhdFwiIFtMb25naXR1ZGVdPVwibG5nXCIgW0xhYmVsXT1cIidNJ1wiPjwveC1tYXAtbWFya2VyPlxuICogICA8L3gtbWFwPlxuICogYFxuICogfSlcbiAqIGBgYFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICd4LW1hcC1tYXJrZXInXG59KVxuZXhwb3J0IGNsYXNzIE1hcE1hcmtlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0IHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9jbGlja1RpbWVvdXQ6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZXZlbnRzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfaW5DbHVzdGVyTGF5ZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pbkN1c3RvbUxheWVyID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBBbnkgSW5mb0JveCB0aGF0IGlzIGEgZGlyZWN0IGNoaWxkcmVuIG9mIHRoZSBtYXJrZXJcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChJbmZvQm94Q29tcG9uZW50KSBwcm90ZWN0ZWQgX2luZm9Cb3g6IEluZm9Cb3hDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9sYXllcklkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbWFya2VyQWRkZWRUb01hbmdlciA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogIEljb24gYW5jaG9yIHJlbGF0aXZlIHRvIG1hcmtlciByb290XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEFuY2hvcjogSVBvaW50O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgRHJhZzogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgZHJhZ2dlZC4gRGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgRHJhZ2dhYmxlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIERyYWdTdGFydDogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiBhIG1hcmtlciBpY29uIGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHB1YmxpYyBEeW5hbWljTWFya2VyQ3JlYXRlZDogRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJJY29uSW5mbz4oKTtcblxuICAgIC8qKlxuICAgICAqIEljb24gaGVpZ2h0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIEhlaWdodDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtYXRpb24gZm9yIGR5bmFtaWMsIGN1c3RvbSBjcmVhdGVkIGljb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBJY29uSW5mbzogSU1hcmtlckljb25JbmZvO1xuXG4gICAgLyoqXG4gICAgICogSWNvbiAodGhlIFVSTCBvZiB0aGUgaW1hZ2UpIGZvciB0aGUgZm9yZWdyb3VuZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgSWNvblVybDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVHJ1ZSB0byBpbmRpY2lhdGUgd2hldGhlciB0aGlzIGlzIHRoZSBmaXJzdCBtYXJrZXIgaW4gYSBzZXQuXG4gICAgICogVXNlIHRoaXMgZm9yIGJ1bGsgb3BlcmF0aW9ucyAocGFydGljdWxhcmlseSBjbHVzdGVyaW5nKSB0byBlbnN1cmUgcGVyZm9ybWFuY2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIElzRmlyc3RJblNldCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVHJ1ZSB0byBpbmRpY2lhdGUgd2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IG1hcmtlciBpbiBhIHNldC5cbiAgICAgKiBVc2UgdGhpcyBmb3IgYnVsayBvcGVyYXRpb25zIChwYXJ0aWN1bGFyaWx5IGNsdXN0ZXJpbmcpIHRvIGVuc3VyZSBwZXJmb3JtYW5jZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgSXNMYXN0SW5TZXQgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxhYmVsIChhIHNpbmdsZSB1cHBlcmNhc2UgY2hhcmFjdGVyKSBmb3IgdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBsYXRpdHVkZSBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMYXRpdHVkZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBMb25naXR1ZGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIG1hcmtlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcHVibGljIE1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SU1hcmtlckV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogQXJiaXRhcnkgbWV0YWRhdGEgdG8gYXNzaWduIHRvIHRoZSBNYXJrZXIuIFRoaXMgaXMgdXNlZnVsIGZvciBldmVudHNcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgTWV0YWRhdGE6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlRG93bjogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBNb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1hcmtlciBtb3VzZW91dC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgTW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIG1hcmtlciBtb3VzZW92ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNYXJrZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgbWFya2VyXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIE1vdXNlVXA6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgbWFya2VyIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQE91dHB1dCgpIFJpZ2h0Q2xpY2s6IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTWFya2VyRXZlbnQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIHRpdGxlIG9mIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgQElucHV0KCkgcHVibGljIFRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXJrZXJcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEljb24gV2lkdGhcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwdWJsaWMgV2lkdGg6IG51bWJlcjtcblxuICAgIC8vL1xuICAgIC8vLyBEZWxlZ2F0ZXNcbiAgICAvLy9cblxuXG5cblxuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0c3doZXRoZXIgdGhlIG1hcmtlciBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkIHRvIHRoZSBtYXJrZXIgc2VydmljZSBhbmQgaXMgcmVhZHkgZm9yIHVzZS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IEFkZGVkVG9NYW5hZ2VyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcjsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaWQgb2YgdGhlIG1hcmtlciBhcyBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBtYXJrZXIgaXMgaW4gYSBjbHVzdGVyIGxheWVyLiBTZWUge0BsaW5rIENsdXN0ZXJMYXllcn0uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJbkNsdXN0ZXJMYXllcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2luQ2x1c3RlckxheWVyOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgdGhlIG1hcmtlciBpcyBpbiBhIGN1c3RvbSBsYXllci4gU2VlIHtAbGluayBNYXBMYXllcn0uXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIGdldCBJbkN1c3RvbUxheWVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faW5DdXN0b21MYXllcjsgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0cyB0aGUgaWQgb2YgdGhlIExheWVyIHRoZSBtYXJrZXIgYmVsb25ncyB0by5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IExheWVySWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xheWVySWQ7IH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBNYXBNYXJrZXJEaXJlY3RpdmUuXG4gICAgICogQHBhcmFtIF9tYXJrZXJTZXJ2aWNlIC0gQ29uY3JlYXRlIGltcGxlbWVudGF0aW9uIG9mIGEge0BsaW5rIE1hcmtlclNlcnZpY2V9LlxuICAgICAqIEBwYXJhbSBfY29udGFpbmVyUmVmIC0gVmlldyBjb250YWluZXIgaG9zdGluZyB0aGUgbWFya2VyLlxuICAgICAqIFVzZWQgdG8gZGV0ZXJtaW5lIHBhcmVudCBsYXllciB0aHJvdWdoIG1hcmt1cC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJrZXJTZXJ2aWNlOiBNYXJrZXJTZXJ2aWNlLCBwcml2YXRlIF9jb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZXMgYSBtYXJrZXIgZ2VvIGxvY2F0aW9uIHRvIGEgcGl4ZWwgbG9jYXRpb24gcmVsYXRpdmUgdG8gdGhlIG1hcCB2aWV3cG9ydC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBbbG9jXSAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzLiBJZiBudWxsLCB0aGUgbWFya2VyJ3MgY29vcmRpbmF0ZXMgYXJlIHVzZWQuXG4gICAgICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCB3aGVuIGZ1bGxmaWxsZWQgY29udGFpbnMgYW4ge0BsaW5rIElQb2ludH0gcmVwcmVzZW50aW5nIHRoZSBwaXhlbCBjb29yZGluYXRlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgTG9jYXRpb25Ub1BpeGVsKGxvYz86IElMYXRMb25nKTogUHJvbWlzZTxJUG9pbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlclNlcnZpY2UuTG9jYXRpb25Ub1BvaW50KGxvYyA/IGxvYyA6IHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciBDb21wb25lbnQgY29udGVudCBpbml0aWFsaXphdGlvbi4gUGFydCBvZiBuZyBDb21wb25lbnQgbGlmZSBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5faW5mb0JveCAhPSBudWxsKSB7IHRoaXMuX2luZm9Cb3guSG9zdE1hcmtlciA9IHRoaXM7IH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50TmFtZTogc3RyaW5nID0gdGhpcy5fY29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnRhZ05hbWU7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSAneC1jbHVzdGVyLWxheWVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luQ2x1c3RlckxheWVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSAneC1tYXAtbGF5ZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5DdXN0b21MYXllciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sYXllcklkID0gTnVtYmVyKHRoaXMuX2NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5hdHRyaWJ1dGVzWydsYXllcklkJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5BZGRNYXJrZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuQWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWN0cyB0byBjaGFuZ2VzIGluIGRhdGEtYm91bmQgcHJvcGVydGllcyBvZiB0aGUgY29tcG9uZW50IGFuZCBhY3R1YXRlcyBwcm9wZXJ0eSBjaGFuZ2VzIGluIHRoZSB1bmRlcmxpbmcgbGF5ZXIgbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbmdlcyAtIGNvbGxlY3Rpb24gb2YgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuTGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLkxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydMYXRpdHVkZSddIHx8IGNoYW5nZXNbJ0xvbmdpdHVkZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZU1hcmtlclBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydUaXRsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZVRpdGxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydMYWJlbCddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZUxhYmVsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydEcmFnZ2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyU2VydmljZS5VcGRhdGVEcmFnZ2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0ljb25VcmwnXSB8fCBjaGFuZ2VzWydJY29uSW5mbyddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZUljb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ0FuY2hvciddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZUFuY2hvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snVmlzaWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJTZXJ2aWNlLlVwZGF0ZVZpc2libGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gY29tcG9uZW50IGRlc3RydWN0aW9uLiBGcmVlcyB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGNvbXBvbmVudC4gUGFydCBvZiB0aGUgbmcgQ29tcG9uZW50IGxpZmUgY3ljbGUuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXBNYXJrZXJEaXJlY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX21hcmtlclNlcnZpY2UuRGVsZXRlTWFya2VyKHRoaXMpO1xuICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBNYXJrZXIgSWQuXG4gICAgICogQHJldHVybnMgLSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hcmtlciBpZC5cbiAgICAgKiBAbWVtYmVyb2YgTWFwTWFya2VyRGlyZWN0aXZlXG4gICAgICovXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiAnTWFwTWFya2VyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHZhcmlvdXMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcE1hcmtlckRpcmVjdGl2ZVxuICAgICAqL1xuICAgIHByaXZhdGUgQWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IF9nZXRFdmVudEFyZzogKGU6IE1vdXNlRXZlbnQpID0+IElNYXJrZXJFdmVudCA9IGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBNYXJrZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgQ2xpY2s6IGUsXG4gICAgICAgICAgICAgICAgTG9jYXRpb246IHRoaXMuX21hcmtlclNlcnZpY2UuR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZSksXG4gICAgICAgICAgICAgICAgUGl4ZWxzOiB0aGlzLl9tYXJrZXJTZXJ2aWNlLkdldFBpeGVsc0Zyb21DbGljayhlKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh0aGlzLl9tYXJrZXJTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgLy8vIHRoaXMgaXMgbmVjZXNzYXJ5IHNpbmNlIG1hcCB3aWxsIHRyZWF0IGEgZG91YmxlY2xpY2sgZmlyc3QgYXMgdHdvIGNsaWNrcy4uLidcbiAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tUaW1lb3V0ID0gdGltZXIoMzAwKS5zdWJzY3JpYmUobiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZm9Cb3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmZvQm94Lk9wZW4odGhpcy5fbWFya2VyU2VydmljZS5HZXRDb29yZGluYXRlc0Zyb21DbGljayhlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuTWFya2VyQ2xpY2suZW1pdChfZ2V0RXZlbnRBcmcoZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLl9ldmVudHMucHVzaCh0aGlzLl9tYXJrZXJTZXJ2aWNlLkNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnZGJsY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGlja1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5EYmxDbGljay5lbWl0KF9nZXRFdmVudEFyZyhlKSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuRHJhZy5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdFbmQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLkRyYWdTdGFydC5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VEb3duLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5Nb3VzZU1vdmUuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMuTW91c2VPdXQuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlT3Zlci5lbWl0KF9nZXRFdmVudEFyZyhldikpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogKGV2OiBNb3VzZUV2ZW50KSA9PiB0aGlzLk1vdXNlVXAuZW1pdChfZ2V0RXZlbnRBcmcoZXYpKSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogTW91c2VFdmVudCkgPT4gdGhpcy5SaWdodENsaWNrLmVtaXQoX2dldEV2ZW50QXJnKGV2KSkgfSxcbiAgICAgICAgXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcyA9IHRoaXMuX21hcmtlclNlcnZpY2UuQ3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==