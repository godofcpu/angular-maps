/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BingConversions } from '../../services/bing/bing-conversions';
import { CanvasOverlay } from '../canvas-overlay';
import { BingMapLabel } from './bing-label';
import { Extender } from '../extender';
/**
 * Concrete implementing a canvas overlay to be placed on the map for Bing Maps.
 *
 * @export
 */
export class BingCanvasOverlay extends CanvasOverlay {
    /**
     * Creates a new instance of the BingCanvasOverlay class.
     * \@memberof BingCanvasOverlay
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     */
    constructor(drawCallback) {
        super(drawCallback);
    }
    /**
     * Obtains geo coordinates for the click location
     *
     * @abstract
     * \@memberof BingCanvasOverlay
     * @param {?} e - The mouse event. Expected to implement {\@link Microsoft.Maps.IMouseEventArgs}.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GetCoordinatesFromClick(e) {
        return { latitude: e.location.latitude, longitude: e.location.longitude };
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof BingCanvasOverlay
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller. Note that this method returns null until OnLoad has been called.
     *
     * \@memberof BingCanvasOverlay
     * \@method
     * @return {?} - The label to be used for the tooltip.
     */
    GetToolTipOverlay() {
        /** @type {?} */
        const o = {
            align: 'left',
            offset: new Microsoft.Maps.Point(0, 25),
            backgroundColor: 'bisque',
            hidden: true,
            fontSize: 12,
            fontColor: '#000000',
            strokeWeight: 0
        };
        /** @type {?} */
        const label = new BingMapLabel(o);
        label.SetMap(this.GetMap());
        return label;
    }
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * @abstract
     * \@method
     * \@memberof BingCanvasOverlay
     * @return {?}
     */
    OnLoad() {
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Get the current map view information.
        this._zoomStart = map.getZoom();
        this._centerStart = /** @type {?} */ (map.getCenter());
        // Redraw the canvas.
        this.Redraw(true);
        // When the map moves, move the canvas accordingly.
        this._viewChangeEvent = Microsoft.Maps.Events.addHandler(map, 'viewchange', (e) => {
            if (map.getMapTypeId() === Microsoft.Maps.MapTypeId.streetside) {
                // Don't show the canvas if the map is in Streetside mode.
                this._canvas.style.display = 'none';
            }
            else {
                /** @type {?} */
                const zoomCurrent = map.getZoom();
                /** @type {?} */
                const centerCurrent = map.getCenter();
                /** @type {?} */
                const scale = Math.pow(2, zoomCurrent - this._zoomStart);
                /** @type {?} */
                const newWidth = map.getWidth() * scale;
                /** @type {?} */
                const newHeight = map.getHeight() * scale;
                /** @type {?} */
                const pixelPoints = /** @type {?} */ (map.tryLocationToPixel([
                    BingConversions.TranslateLocation(this._centerStart),
                    centerCurrent
                ], Microsoft.Maps.PixelReference.control));
                /** @type {?} */
                const centerOffsetX = pixelPoints[1].x - pixelPoints[0].x;
                /** @type {?} */
                const centerOffsetY = pixelPoints[1].y - pixelPoints[0].y;
                /** @type {?} */
                const x = (-(newWidth - map.getWidth()) / 2) - centerOffsetX;
                /** @type {?} */
                const y = (-(newHeight - map.getHeight()) / 2) - centerOffsetY;
                // Update the canvas CSS position and dimensions.
                this.UpdatePosition(x, y, newWidth, newHeight);
            }
        });
        // When the map stops moving, render new data on the canvas.
        this._viewChangeEndEvent = Microsoft.Maps.Events.addHandler(map, 'viewchangeend', (e) => {
            this.UpdateCanvas();
        });
        // Update the position of the overlay when the map is resized.
        this._mapResizeEvent = Microsoft.Maps.Events.addHandler(map, 'mapresize', (e) => {
            this.UpdateCanvas();
        });
        // set the overlay to ready state
        this._readyResolver(true);
    }
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} map - Map to associated with the label.
     * @return {?}
     */
    SetMap(map) {
        /** @type {?} */
        const m = this.GetMap();
        if (map === m) {
            return;
        }
        if (m) {
            m.layers.remove(this);
        }
        if (map != null) {
            map.layers.insert(this);
        }
    }
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} el
     * @return {?}
     */
    SetCanvasElement(el) {
        (/** @type {?} */ (this)).setHtmlElement(el);
    }
    /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    RemoveEventHandlers() {
        // Remove all event handlers from the map.
        Microsoft.Maps.Events.removeHandler(this._viewChangeEvent);
        Microsoft.Maps.Events.removeHandler(this._viewChangeEndEvent);
        Microsoft.Maps.Events.removeHandler(this._mapResizeEvent);
    }
    /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    Resize() {
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
        this._canvas.width = map.getWidth();
        this._canvas.height = map.getHeight();
    }
    /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @return {?}
     */
    UpdateCanvas() {
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Only render the canvas if it isn't in streetside mode.
        if (map.getMapTypeId() !== Microsoft.Maps.MapTypeId.streetside) {
            this._canvas.style.display = '';
            // Reset CSS position and dimensions of canvas.
            this.UpdatePosition(0, 0, map.getWidth(), map.getHeight());
            // Redraw the canvas.
            this.Redraw(true);
            // Get the current map view information.
            this._zoomStart = map.getZoom();
            this._centerStart = /** @type {?} */ (map.getCenter());
        }
    }
}
if (false) {
    /** @type {?} */
    BingCanvasOverlay.prototype._viewChangeEvent;
    /** @type {?} */
    BingCanvasOverlay.prototype._viewChangeEndEvent;
    /** @type {?} */
    BingCanvasOverlay.prototype._mapResizeEvent;
}
/**
 * Helper function to extend the OverlayView into the CanvasOverlay
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinCanvasOverlay() {
    new Extender(BingCanvasOverlay)
        .Extend(new Microsoft.Maps.CustomOverlay())
        .Map('onAdd', 'OnAdd')
        .Map('onLoad', 'OnLoad')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jYW52YXMtb3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYmluZy9iaW5nLWNhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7O0FBT3ZDLE1BQU0sd0JBQXlCLFNBQVEsYUFBYTs7Ozs7OztJQWdCaEQsWUFBWSxZQUFpRDtRQUN6RCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkI7Ozs7Ozs7OztJQWNNLHVCQUF1QixDQUFDLENBQWlDO1FBQzVELE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7Ozs7O0lBU3ZFLE1BQU07UUFDVCxNQUFNLENBQUMsbUJBQU0sSUFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0lBWXpCLGlCQUFpQjs7UUFDcEIsTUFBTSxDQUFDLEdBQTJCO1lBQzlCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxlQUFlLEVBQUUsUUFBUTtZQUN6QixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLFNBQVM7WUFDcEIsWUFBWSxFQUFFLENBQUM7U0FDbEIsQ0FBQzs7UUFDRixNQUFNLEtBQUssR0FBYSxJ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dGVyZmFjZXMvaWxhdGxvbmcnO1xuaW1wb3J0IHsgQmluZ0NvbnZlcnNpb25zIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYmluZy9iaW5nLWNvbnZlcnNpb25zJztcbmltcG9ydCB7IENhbnZhc092ZXJsYXkgfSBmcm9tICcuLi9jYW52YXMtb3ZlcmxheSc7XG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4uL21hcC1sYWJlbCc7XG5pbXBvcnQgeyBCaW5nTWFwTGFiZWwgfSBmcm9tICcuL2JpbmctbGFiZWwnO1xuaW1wb3J0IHsgRXh0ZW5kZXIgfSBmcm9tICcuLi9leHRlbmRlcic7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50aW5nIGEgY2FudmFzIG92ZXJsYXkgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAgZm9yIEJpbmcgTWFwcy5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5nQ2FudmFzT3ZlcmxheSBleHRlbmRzIENhbnZhc092ZXJsYXkge1xuXG4gICAgLy8vXG4gICAgLy8vIGZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX3ZpZXdDaGFuZ2VFdmVudDogTWljcm9zb2Z0Lk1hcHMuSUhhbmRsZXJJZDtcbiAgICBwcml2YXRlIF92aWV3Q2hhbmdlRW5kRXZlbnQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XG4gICAgcHJpdmF0ZSBfbWFwUmVzaXplRXZlbnQ6IE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ7XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEJpbmdDYW52YXNPdmVybGF5IGNsYXNzLlxuICAgICAqIEBwYXJhbSBkcmF3Q2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmVcbiAgICAgKiByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgbWFwIHZpZXcuXG4gICAgICogQG1lbWJlcm9mIEJpbmdDYW52YXNPdmVybGF5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZCkge1xuICAgICAgICBzdXBlcihkcmF3Q2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBjbGljayBsb2NhdGlvblxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuIEV4cGVjdGVkIHRvIGltcGxlbWVudCB7QGxpbmsgTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzfS5cbiAgICAgKiBAcmV0dXJucyAtIHtAbGluayBJTGF0TG9uZ30gY29udGFpbmluZyB0aGUgZ2VvIGNvb3JkaW5hdGVzIG9mIHRoZSBjbGlja2VkIG1hcmtlci5cbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogSUxhdExvbmcge1xuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sb2NhdGlvbi5sYXRpdHVkZSwgbG9uZ2l0dWRlOiBlLmxvY2F0aW9uLmxvbmdpdHVkZSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIEdldE1hcCgpOiBNaWNyb3NvZnQuTWFwcy5NYXAge1xuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIE1hcExhYmVsIGluc3RhbmNlIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgdG9vbHRpcC5cbiAgICAgKiBUaGlzIG1ldGhvZCBvbmx5IGdlbmVyYXRlcyB0aGUgbWFwIGxhYmVsLiBDb250ZW50IGFuZCBwbGFjZW1lbnQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5XG4gICAgICogb2YgdGhlIGNhbGxlci4gTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbCB1bnRpbCBPbkxvYWQgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgbGFiZWwgdG8gYmUgdXNlZCBmb3IgdGhlIHRvb2x0aXAuXG4gICAgICogQG1lbWJlcm9mIEJpbmdDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRUb29sVGlwT3ZlcmxheSgpOiBNYXBMYWJlbCB7XG4gICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTWljcm9zb2Z0Lk1hcHMuUG9pbnQoMCwgMjUpLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmlzcXVlJyxcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGxhYmVsOiBNYXBMYWJlbCA9IG5ldyBCaW5nTWFwTGFiZWwobyk7XG4gICAgICAgIGxhYmVsLlNldE1hcCh0aGlzLkdldE1hcCgpKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbnZhc092ZXJsYXkgbG9hZGVkLCBhdHRhY2ggbWFwIGV2ZW50cyBmb3IgdXBkYXRpbmcgY2FudmFzLlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NhbnZhc092ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgT25Mb2FkKCkge1xuICAgICAgICBjb25zdCBtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCA9ICg8YW55PnRoaXMpLmdldE1hcCgpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBtYXAgdmlldyBpbmZvcm1hdGlvbi5cbiAgICAgICAgdGhpcy5fem9vbVN0YXJ0ID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgdGhpcy5fY2VudGVyU3RhcnQgPSA8SUxhdExvbmc+bWFwLmdldENlbnRlcigpO1xuXG4gICAgICAgIC8vIFJlZHJhdyB0aGUgY2FudmFzLlxuICAgICAgICB0aGlzLlJlZHJhdyh0cnVlKTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBtYXAgbW92ZXMsIG1vdmUgdGhlIGNhbnZhcyBhY2NvcmRpbmdseS5cbiAgICAgICAgdGhpcy5fdmlld0NoYW5nZUV2ZW50ID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobWFwLCAndmlld2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAobWFwLmdldE1hcFR5cGVJZCgpID09PSBNaWNyb3NvZnQuTWFwcy5NYXBUeXBlSWQuc3RyZWV0c2lkZSkge1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHNob3cgdGhlIGNhbnZhcyBpZiB0aGUgbWFwIGlzIGluIFN0cmVldHNpZGUgbW9kZS5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlLWRyYXdpbmcgdGhlIGNhbnZhcyBhcyBpdCBtb3ZlcyB3b3VsZCBiZSB0b28gc2xvdy4gSW5zdGVhZCwgc2NhbGUgYW5kIHRyYW5zbGF0ZSBjYW52YXMgZWxlbWVudC5cbiAgICAgICAgICAgICAgICBjb25zdCB6b29tQ3VycmVudDogbnVtYmVyID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJDdXJyZW50OiBNaWNyb3NvZnQuTWFwcy5Mb2NhdGlvbiA9IG1hcC5nZXRDZW50ZXIoKTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBtYXAgc2NhbGUgYmFzZWQgb24gem9vbSBsZXZlbCBkaWZmZXJlbmNlLlxuICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlOiBudW1iZXIgPSBNYXRoLnBvdygyLCB6b29tQ3VycmVudCAtIHRoaXMuX3pvb21TdGFydCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlZCBkaW1lbnNpb25zIG9mIHRoZSBjYW52YXMuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3V2lkdGg6IG51bWJlciA9IG1hcC5nZXRXaWR0aCgpICogc2NhbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0OiBudW1iZXIgPSBtYXAuZ2V0SGVpZ2h0KCkgKiBzY2FsZTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBvZmZzZXQgb2YgY2FudmFzIGJhc2VkIG9uIHpvb20gYW5kIGNlbnRlciBvZmZzZXRzLlxuICAgICAgICAgICAgICAgIGNvbnN0IHBpeGVsUG9pbnRzOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5Qb2ludD4gPSA8QXJyYXk8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+Pm1hcC50cnlMb2NhdGlvblRvUGl4ZWwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgQmluZ0NvbnZlcnNpb25zLlRyYW5zbGF0ZUxvY2F0aW9uKHRoaXMuX2NlbnRlclN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlckN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgXSwgTWljcm9zb2Z0Lk1hcHMuUGl4ZWxSZWZlcmVuY2UuY29udHJvbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VudGVyT2Zmc2V0WDogbnVtYmVyID0gcGl4ZWxQb2ludHNbMV0ueCAtIHBpeGVsUG9pbnRzWzBdLng7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VudGVyT2Zmc2V0WTogbnVtYmVyID0gcGl4ZWxQb2ludHNbMV0ueSAtIHBpeGVsUG9pbnRzWzBdLnk7XG4gICAgICAgICAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKC0obmV3V2lkdGggLSBtYXAuZ2V0V2lkdGgoKSkgLyAyKSAtIGNlbnRlck9mZnNldFg7XG4gICAgICAgICAgICAgICAgY29uc3QgeTogbnVtYmVyID0gKC0obmV3SGVpZ2h0IC0gbWFwLmdldEhlaWdodCgpKSAvIDIpIC0gY2VudGVyT2Zmc2V0WTtcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY2FudmFzIENTUyBwb3NpdGlvbiBhbmQgZGltZW5zaW9ucy5cbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZVBvc2l0aW9uKHgsIHksIG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBtYXAgc3RvcHMgbW92aW5nLCByZW5kZXIgbmV3IGRhdGEgb24gdGhlIGNhbnZhcy5cbiAgICAgICAgdGhpcy5fdmlld0NoYW5nZUVuZEV2ZW50ID0gTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIobWFwLCAndmlld2NoYW5nZWVuZCcsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhbnZhcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IHdoZW4gdGhlIG1hcCBpcyByZXNpemVkLlxuICAgICAgICB0aGlzLl9tYXBSZXNpemVFdmVudCA9IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG1hcCwgJ21hcHJlc2l6ZScsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhbnZhcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZXQgdGhlIG92ZXJsYXkgdG8gcmVhZHkgc3RhdGVcbiAgICAgICAgdGhpcy5fcmVhZHlSZXNvbHZlcih0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIE1hcCB0byBhc3NvY2lhdGVkIHdpdGggdGhlIGxhYmVsLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRNYXAobWFwOiBNaWNyb3NvZnQuTWFwcy5NYXApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gdGhpcy5HZXRNYXAoKTtcbiAgICAgICAgaWYgKG1hcCA9PT0gbSkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIG0ubGF5ZXJzLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWFwICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1hcC5sYXllcnMuaW5zZXJ0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vXG4gICAgLy8vIFByb3RlY3RlZCBtZXRob2RzXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2FudmFzIHRvIHRoZSBtYXAuXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHJvdGVjdGVkIFNldENhbnZhc0VsZW1lbnQoZWw6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gICAgICAgICg8YW55PnRoaXMpLnNldEh0bWxFbGVtZW50KGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIG1hcCBldmVudCBoYW5kbGVycy5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIFJlbW92ZUV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSB0aGUgbWFwLlxuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl92aWV3Q2hhbmdlRXZlbnQpO1xuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl92aWV3Q2hhbmdlRW5kRXZlbnQpO1xuICAgICAgICBNaWNyb3NvZnQuTWFwcy5FdmVudHMucmVtb3ZlSGFuZGxlcih0aGlzLl9tYXBSZXNpemVFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ2FudmFzIHNpemUgYmFzZWQgb24gdGhlIG1hcCBzaXplLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgUmVzaXplKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtYXA6IE1pY3Jvc29mdC5NYXBzLk1hcCA9ICg8YW55PnRoaXMpLmdldE1hcCgpO1xuXG4gICAgICAgIC8vIENsZWFyIGNhbnZhcyBieSB1cGRhdGluZyBkaW1lbnNpb25zLiBUaGlzIGFsc28gZW5zdXJlcyBjYW52YXMgc3RheXMgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgbWFwLlxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBtYXAuZ2V0V2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IG1hcC5nZXRIZWlnaHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMuXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBVcGRhdGVDYW52YXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hcDogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XG5cbiAgICAgICAgLy8gT25seSByZW5kZXIgdGhlIGNhbnZhcyBpZiBpdCBpc24ndCBpbiBzdHJlZXRzaWRlIG1vZGUuXG4gICAgICAgIGlmIChtYXAuZ2V0TWFwVHlwZUlkKCkgIT09IE1pY3Jvc29mdC5NYXBzLk1hcFR5cGVJZC5zdHJlZXRzaWRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBDU1MgcG9zaXRpb24gYW5kIGRpbWVuc2lvbnMgb2YgY2FudmFzLlxuICAgICAgICAgICAgdGhpcy5VcGRhdGVQb3NpdGlvbigwLCAwLCBtYXAuZ2V0V2lkdGgoKSwgbWFwLmdldEhlaWdodCgpKTtcblxuICAgICAgICAgICAgLy8gUmVkcmF3IHRoZSBjYW52YXMuXG4gICAgICAgICAgICB0aGlzLlJlZHJhdyh0cnVlKTtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgdGhpcy5fem9vbVN0YXJ0ID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlclN0YXJ0ID0gPElMYXRMb25nPm1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBPdmVybGF5VmlldyBpbnRvIHRoZSBDYW52YXNPdmVybGF5XG4gKlxuICogQGV4cG9ydFxuICogQG1ldGhvZFxuICovXG5leHBvcnQgZnVuY3Rpb24gTWl4aW5DYW52YXNPdmVybGF5KCkge1xuXG4gICAgbmV3IEV4dGVuZGVyKEJpbmdDYW52YXNPdmVybGF5KVxuICAgIC5FeHRlbmQobmV3IE1pY3Jvc29mdC5NYXBzLkN1c3RvbU92ZXJsYXkoKSlcbiAgICAuTWFwKCdvbkFkZCcsICdPbkFkZCcpXG4gICAgLk1hcCgnb25Mb2FkJywgJ09uTG9hZCcpXG4gICAgLk1hcCgnb25SZW1vdmUnLCAnT25SZW1vdmUnKTtcbn1cbiJdfQ==