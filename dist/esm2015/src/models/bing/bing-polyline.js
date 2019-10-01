/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { Polyline } from '../polyline';
import { BingMapLabel } from './bing-label';
/**
 * Concrete implementation for a polyline model for Bing Maps V8.
 *
 * @export
 */
export class BingPolyline extends Polyline {
    /**
     * Creates an instance of BingPolygon.
     * \@memberof BingPolyline
     * @param {?} _polyline - The {\@link Microsoft.Maps.Polyline} underlying the model.
     * @param {?} _map - The context map.
     * @param {?} _layer - The context layer.
     */
    constructor(_polyline, _map, _layer) {
        super();
        this._polyline = _polyline;
        this._map = _map;
        this._layer = _layer;
        this._isEditable = true;
        this._title = '';
        this._showTooltip = false;
        this._tooltip = null;
        this._hasToolTipReceiver = false;
        this._tooltipVisible = false;
        this._metadata = new Map();
    }
    /**
     * Gets the polyline metadata.
     *
     * \@readonly
     * \@memberof BingPolyline
     * @return {?}
     */
    get Metadata() { return this._metadata; }
    /**
     * Gets the Navitve Polyline underlying the model
     *
     * \@readonly
     * \@memberof BingPolyline
     * @return {?}
     */
    get NativePrimitve() { return this._polyline; }
    /**
     * Gets or sets whether to show the tooltip
     *
     * @abstract
     * \@memberof BingPolyline
     * \@property
     * @return {?}
     */
    get ShowTooltip() { return this._showTooltip; }
    /**
     * @param {?} val
     * @return {?}
     */
    set ShowTooltip(val) {
        this._showTooltip = val;
        this.ManageTooltip();
    }
    /**
     * Gets or sets the title off the polyline
     *
     * @abstract
     * \@memberof BingPolyline
     * \@property
     * @return {?}
     */
    get Title() { return this._title; }
    /**
     * @param {?} val
     * @return {?}
     */
    set Title(val) {
        this._title = val;
        this.ManageTooltip();
    }
    /**
     * Adds a delegate for an event.
     *
     * \@memberof BingPolyline
     * @param {?} eventType - String containing the event name.
     * @param {?} fn - Delegate function to execute when the event occurs.
     * @return {?}
     */
    AddListener(eventType, fn) {
        /** @type {?} */
        const supportedEvents = ['click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];
        if (supportedEvents.indexOf(eventType) !== -1) {
            Microsoft.Maps.Events.addHandler(this._polyline, eventType, (e) => {
                fn(e);
            });
        }
        if (eventType === 'mousemove') {
            /** @type {?} */
            let handlerId;
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', e => {
                handlerId = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', m => fn(m));
            });
            Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', e => {
                if (handlerId) {
                    Microsoft.Maps.Events.removeHandler(handlerId);
                }
            });
        }
    }
    /**
     * Deleted the polyline.
     *
     * \@memberof BingPolyline
     * @return {?}
     */
    Delete() {
        if (this._layer) {
            this._layer.remove(this.NativePrimitve);
        }
        else {
            this._map.entities.remove(this.NativePrimitve);
        }
        if (this._tooltip) {
            this._tooltip.Delete();
        }
    }
    /**
     * Gets whether the polyline is draggable.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is dragable, false otherwise.
     *
     */
    GetDraggable() {
        return false;
    }
    /**
     * Gets whether the polyline path can be edited.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the path can be edited, false otherwise.
     *
     */
    GetEditable() {
        return this._isEditable;
    }
    /**
     * Gets the polyline path.
     *
     * \@memberof BingPolyline
     * @return {?} - Array of {\@link ILatLong} objects describing the polyline path.
     *
     */
    GetPath() {
        /** @type {?} */
        const p = this._polyline.getLocations();
        /** @type {?} */
        const path = new Array();
        p.forEach(l => path.push({ latitude: l.latitude, longitude: l.longitude }));
        return path;
    }
    /**
     * Gets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @return {?} - True if the polyline is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._polyline.getVisible();
    }
    /**
     * Sets whether the polyline is dragable.
     *
     * \@memberof BingPolyline
     * @param {?} draggable - True to make the polyline dragable, false otherwise.
     *
     * @return {?}
     */
    SetDraggable(draggable) {
        throw (new Error('The bing maps implementation currently does not support draggable polylines.'));
    }
    /**
     * Sets wether the polyline path is editable.
     *
     * \@memberof BingPolyline
     * @param {?} editable - True to make polyline path editable, false otherwise.
     *
     * @return {?}
     */
    SetEditable(editable) {
        this._isEditable = editable;
    }
    /**
     * Sets the polyline options
     *
     * \@memberof BingPolyline
     * @param {?} options - {\@link ILatLong} object containing the options. The options are merged with hte ones
     * already on the underlying model.
     *
     * @return {?}
     */
    SetOptions(options) {
        /** @type {?} */
        const o = BingConversions.TranslatePolylineOptions(options);
        this._polyline.setOptions(o);
        if (options.path) {
            this.SetPath(/** @type {?} */ (options.path));
        }
    }
    /**
     * Sets the polyline path.
     *
     * \@memberof BingPolyline
     * @param {?} path - An Array of {\@link ILatLong} (or array of arrays) describing the polylines path.
     *
     * @return {?}
     */
    SetPath(path) {
        /** @type {?} */
        const p = new Array();
        path.forEach(x => p.push(new Microsoft.Maps.Location(x.latitude, x.longitude)));
        this._polyline.setLocations(p);
    }
    /**
     * Sets whether the polyline is visible.
     *
     * \@memberof BingPolyline
     * @param {?} visible - True to set the polyline visible, false otherwise.
     *
     * @return {?}
     */
    SetVisible(visible) {
        this._polyline.setOptions(/** @type {?} */ ({ visible: visible }));
    }
    /**
     * Configures the tooltip for the polygon
     * \@memberof Polygon
     * @return {?}
     */
    ManageTooltip() {
        if (this._showTooltip && this._title != null && this._title !== '') {
            /** @type {?} */
            const o = {
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
                this._mouseOverListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseover', (e) => {
                    this._tooltip.Set('position', e.location);
                    if (!this._tooltipVisible) {
                        this._tooltip.Set('hidden', false);
                        this._tooltipVisible = true;
                    }
                });
                this._mouseMoveListener = Microsoft.Maps.Events.addHandler(this._map, 'mousemove', (e) => {
                    if (this._tooltipVisible && e.location && e.primitive === this._polyline) {
                        this._tooltip.Set('position', e.location);
                    }
                });
                this._mouseOutListener = Microsoft.Maps.Events.addHandler(this._polyline, 'mouseout', (e) => {
                    if (this._tooltipVisible) {
                        this._tooltip.Set('hidden', true);
                        this._tooltipVisible = false;
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
    }
}
if (false) {
    /** @type {?} */
    BingPolyline.prototype._isEditable;
    /** @type {?} */
    BingPolyline.prototype._title;
    /** @type {?} */
    BingPolyline.prototype._showTooltip;
    /** @type {?} */
    BingPolyline.prototype._tooltip;
    /** @type {?} */
    BingPolyline.prototype._hasToolTipReceiver;
    /** @type {?} */
    BingPolyline.prototype._tooltipVisible;
    /** @type {?} */
    BingPolyline.prototype._mouseOverListener;
    /** @type {?} */
    BingPolyline.prototype._mouseMoveListener;
    /** @type {?} */
    BingPolyline.prototype._mouseOutListener;
    /** @type {?} */
    BingPolyline.prototype._metadata;
    /** @type {?} */
    BingPolyline.prototype._polyline;
    /** @type {?} */
    BingPolyline.prototype._map;
    /** @type {?} */
    BingPolyline.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1wb2x5bGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLXBvbHlsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFPNUMsTUFBTSxtQkFBb0IsU0FBUSxRQUFROzs7Ozs7OztJQXlFdEMsWUFBb0IsU0FBa0MsRUFBWSxJQUF3QixFQUFZLE1BQTRCO1FBQzlILEtBQUssRUFBRSxDQUFDO1FBRFEsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQXNCOzJCQXBFbkcsSUFBSTtzQkFLVixFQUFFOzRCQUNLLEtBQUs7d0JBQ0osSUFBSTttQ0FDRSxLQUFLOytCQUNULEtBQUs7eUJBSUYsSUFBSSxHQUFHLEVBQWU7S0F5RDNEOzs7Ozs7OztRQWpEVSxRQUFRLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7OztRQVFyRCxjQUFjLEtBQThCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7UUFTbEUsV0FBVyxLQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7OztRQUNsRCxXQUFXLENBQUMsR0FBWTtRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7Ozs7Ozs7UUFVZCxLQUFLLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7O1FBQ3JDLEtBQUssQ0FBQyxHQUFXO1FBQ3hCLElBQUksQ0FBQyxNQUFN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LElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFFO2lCQUFFO2dCQUM3RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFBRTtnQkFDOUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQUU7Z0JBQzlGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1NBQ0o7O0NBRVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGF0TG9uZyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgSVBvbHlsaW5lT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaXBvbHlsaW5lLW9wdGlvbnMnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xuaW1wb3J0IHsgQmluZ01hcExhYmVsIH0gZnJvbSAnLi9iaW5nLWxhYmVsJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBmb3IgYSBwb2x5bGluZSBtb2RlbCBmb3IgQmluZyBNYXBzIFY4LlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmdQb2x5bGluZSBleHRlbmRzIFBvbHlsaW5lIGltcGxlbWVudHMgUG9seWxpbmUge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX2lzRWRpdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSAnJztcbiAgICBwcml2YXRlIF9zaG93VG9vbHRpcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3Rvb2x0aXA6IEJpbmdNYXBMYWJlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaGFzVG9vbFRpcFJlY2VpdmVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdG9vbHRpcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tb3VzZU92ZXJMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcbiAgICBwcml2YXRlIF9tb3VzZU1vdmVMaXN0ZW5lcjogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcbiAgICBwcml2YXRlIF9tb3VzZU91dExpc3RlbmVyOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xuICAgIHByaXZhdGUgX21ldGFkYXRhOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIG1ldGFkYXRhLlxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTWV0YWRhdGEoKTogTWFwPHN0cmluZywgYW55PiB7IHJldHVybiB0aGlzLl9tZXRhZGF0YTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgTmF2aXR2ZSBQb2x5bGluZSB1bmRlcmx5aW5nIHRoZSBtb2RlbFxuICAgICAqXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmUgeyByZXR1cm4gdGhpcy5fcG9seWxpbmU7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgb3Igc2V0cyB3aGV0aGVyIHRvIHNob3cgdGhlIHRvb2x0aXBcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKiBAcHJvcGVydHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IFNob3dUb29sdGlwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd1Rvb2x0aXA7IH1cbiAgICBwdWJsaWMgc2V0IFNob3dUb29sdGlwKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93VG9vbHRpcCA9IHZhbDtcbiAgICAgICAgdGhpcy5NYW5hZ2VUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSB0aXRsZSBvZmYgdGhlIHBvbHlsaW5lXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXG4gICAgICogQHByb3BlcnR5XG4gICAgICovXG4gICAgcHVibGljIGdldCBUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdGl0bGU7IH1cbiAgICBwdWJsaWMgc2V0IFRpdGxlKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuICAgICAgICB0aGlzLk1hbmFnZVRvb2x0aXAoKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gY29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmluZ1BvbHlnb24uXG4gICAgICogQHBhcmFtIF9wb2x5bGluZSAtIFRoZSB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmV9IHVuZGVybHlpbmcgdGhlIG1vZGVsLlxuICAgICAqIEBwYXJhbSBfbWFwIC0gVGhlIGNvbnRleHQgbWFwLlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgLSBUaGUgY29udGV4dCBsYXllci5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9seWxpbmU6IE1pY3Jvc29mdC5NYXBzLlBvbHlsaW5lLCBwcm90ZWN0ZWQgX21hcDogTWljcm9zb2Z0Lk1hcHMuTWFwLCBwcm90ZWN0ZWQgX2xheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBkZWxlZ2F0ZSBmb3IgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIGZuIC0gRGVsZWdhdGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEV2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnIF07XG4gICAgICAgIGlmIChzdXBwb3J0ZWRFdmVudHMuaW5kZXhPZihldmVudFR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWxpbmUsIGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlcklkOiBNaWNyb3NvZnQuTWFwcy5JSGFuZGxlcklkO1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWxpbmUsICdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVySWQgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCBtID0+IGZuKG0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fcG9seWxpbmUsICdtb3VzZW91dCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVySWQpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIoaGFuZGxlcklkKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVkIHRoZSBwb2x5bGluZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbGF5ZXIpIHsgdGhpcy5fbGF5ZXIucmVtb3ZlKHRoaXMuTmF0aXZlUHJpbWl0dmUpOyB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLmVudGl0aWVzLnJlbW92ZSh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCkgeyB0aGlzLl90b29sdGlwLkRlbGV0ZSgpOyB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBkcmFnZ2FibGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIFRydWUgaWYgdGhlIHBvbHlsaW5lIGlzIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIEdldERyYWdnYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgLy8vXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cbiAgICAgICAgLy8vICAgICA3YWFhZTc0OC00ZDVmLTRiZTUtYTdiYi05MDQ5OGUwOGI0MWMvaG93LWNhbi1pLW1ha2UtcG9seWdvbnBvbHlsaW5lLWRyYWdnYWJsZS1pbi1iaW5nLW1hcHMtOFxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxuICAgICAgICAvLy9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciB0aGUgcG9seWxpbmUgcGF0aCBjYW4gYmUgZWRpdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwYXRoIGNhbiBiZSBlZGl0ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0RWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VkaXRhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBvbHlsaW5lIHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEFycmF5IG9mIHtAbGluayBJTGF0TG9uZ30gb2JqZWN0cyBkZXNjcmliaW5nIHRoZSBwb2x5bGluZSBwYXRoLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRQYXRoKCk6IEFycmF5PElMYXRMb25nPiB7XG4gICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPiA9IHRoaXMuX3BvbHlsaW5lLmdldExvY2F0aW9ucygpO1xuICAgICAgICBjb25zdCBwYXRoOiBBcnJheTxJTGF0TG9uZz4gPSBuZXcgQXJyYXk8SUxhdExvbmc+KCk7XG4gICAgICAgIHAuZm9yRWFjaChsID0+IHBhdGgucHVzaCh7IGxhdGl0dWRlOiBsLmxhdGl0dWRlLCBsb25naXR1ZGU6IGwubG9uZ2l0dWRlIH0pKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUcnVlIGlmIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZS5nZXRWaXNpYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyBkcmFnYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkcmFnZ2FibGUgLSBUcnVlIHRvIG1ha2UgdGhlIHBvbHlsaW5lIGRyYWdhYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ1BvbHlsaW5lXG4gICAgICovXG4gICAgcHVibGljIFNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8vXG4gICAgICAgIC8vLyBCaW5nIHBvbHlnb25zIGFyZSBub3QgZHJhZ2dhYmxlIGJ5IGRlZmF1bHQuXG4gICAgICAgIC8vLyBTZWUgaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9cbiAgICAgICAgLy8vICAgICA3YWFhZTc0OC00ZDVmLTRiZTUtYTdiYi05MDQ5OGUwOGI0MWMvaG93LWNhbi1pLW1ha2UtcG9seWdvbnBvbHlsaW5lLWRyYWdnYWJsZS1pbi1iaW5nLW1hcHMtOFxuICAgICAgICAvLy8gICAgID9mb3J1bT1iaW5nbWFwc1xuICAgICAgICAvLy8gZm9yIGEgcG9zc2libGUgYXBwcm9hY2ggdG8gYmUgaW1wbGVtZW50ZWQgaW4gdGhlIG1vZGVsLlxuICAgICAgICAvLy9cbiAgICAgICAgdGhyb3cobmV3IEVycm9yKCdUaGUgYmluZyBtYXBzIGltcGxlbWVudGF0aW9uIGN1cnJlbnRseSBkb2VzIG5vdCBzdXBwb3J0IGRyYWdnYWJsZSBwb2x5bGluZXMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgd2V0aGVyIHRoZSBwb2x5bGluZSBwYXRoIGlzIGVkaXRhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVkaXRhYmxlIC0gVHJ1ZSB0byBtYWtlIHBvbHlsaW5lIHBhdGggZWRpdGFibGUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNFZGl0YWJsZSA9IGVkaXRhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvbHlsaW5lIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0ge0BsaW5rIElMYXRMb25nfSBvYmplY3QgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gVGhlIG9wdGlvbnMgYXJlIG1lcmdlZCB3aXRoIGh0ZSBvbmVzXG4gICAgICogYWxyZWFkeSBvbiB0aGUgdW5kZXJseWluZyBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJUG9seWxpbmVPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG86IE1pY3Jvc29mdC5NYXBzLklQb2x5bGluZU9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlUG9seWxpbmVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRPcHRpb25zKG8pO1xuICAgICAgICBpZiAob3B0aW9ucy5wYXRoKSB7XG4gICAgICAgICAgICB0aGlzLlNldFBhdGgoPEFycmF5PElMYXRMb25nPj5vcHRpb25zLnBhdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9seWxpbmUgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gQXJyYXkgb2Yge0BsaW5rIElMYXRMb25nfSAob3IgYXJyYXkgb2YgYXJyYXlzKSBkZXNjcmliaW5nIHRoZSBwb2x5bGluZXMgcGF0aC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nUG9seWxpbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0UGF0aChwYXRoOiBBcnJheTxJTGF0TG9uZz4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcDogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uPigpO1xuICAgICAgICBwYXRoLmZvckVhY2goeCA9PiBwLnB1c2gobmV3IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uKHgubGF0aXR1ZGUsIHgubG9uZ2l0dWRlKSkpO1xuICAgICAgICB0aGlzLl9wb2x5bGluZS5zZXRMb2NhdGlvbnMocCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB3aGV0aGVyIHRoZSBwb2x5bGluZSBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZpc2libGUgLSBUcnVlIHRvIHNldCB0aGUgcG9seWxpbmUgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdQb2x5bGluZVxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmUuc2V0T3B0aW9ucyg8TWljcm9zb2Z0Lk1hcHMuSVBvbHlsaW5lT3B0aW9ucz57IHZpc2libGU6IHZpc2libGUgfSk7XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlcyB0aGUgdG9vbHRpcCBmb3IgdGhlIHBvbHlnb25cbiAgICAgKiBAbWVtYmVyb2YgUG9seWdvblxuICAgICAqL1xuICAgIHByaXZhdGUgTWFuYWdlVG9vbHRpcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dUb29sdGlwICYmIHRoaXMuX3RpdGxlICE9IG51bGwgJiYgdGhpcy5fdGl0bGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCBvOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX3RpdGxlLFxuICAgICAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoMCwgMjUpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2Jpc3F1ZScsXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5fdG9vbHRpcCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXRNYXAodGhpcy5fbWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0VmFsdWVzKG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU92ZXJMaXN0ZW5lciA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmUsICdtb3VzZW92ZXInLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXAuU2V0KCdwb3NpdGlvbicsIGUubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VNb3ZlTGlzdGVuZXIgPSBNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCAoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b29sdGlwVmlzaWJsZSAmJiBlLmxvY2F0aW9uICYmIGUucHJpbWl0aXZlID09PSB0aGlzLl9wb2x5bGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9vbHRpcC5TZXQoJ3Bvc2l0aW9uJywgZS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZU91dExpc3RlbmVyID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9seWxpbmUsICdtb3VzZW91dCcsIChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldCgnaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVG9vbFRpcFJlY2VpdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKCF0aGlzLl9zaG93VG9vbHRpcCB8fCB0aGlzLl90aXRsZSA9PT0gJycgfHwgdGhpcy5fdGl0bGUgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNUb29sVGlwUmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdXRMaXN0ZW5lcikgeyBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tb3VzZU91dExpc3RlbmVyKSA7IH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLnJlbW92ZUhhbmRsZXIodGhpcy5fbW91c2VPdmVyTGlzdGVuZXIpOyB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKHRoaXMuX21vdXNlTW92ZUxpc3RlbmVyKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rvb2xUaXBSZWNlaXZlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwLlNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b29sdGlwID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==