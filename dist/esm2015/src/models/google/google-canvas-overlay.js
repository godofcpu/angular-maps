/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CanvasOverlay } from '../canvas-overlay';
import { GoogleMapLabel } from './google-label';
import { Extender } from '../extender';
/**
 * Concrete implementing a canvas overlay to be placed on the map for Google Maps.
 *
 * @export
 */
export class GoogleCanvasOverlay extends CanvasOverlay {
    /**
     * Creates a new instance of the GoogleCanvasOverlay class.
     * \@memberof GoogleCanvasOverlay
     * @param {?} drawCallback A callback function that is triggered when the canvas is ready to be
     * rendered for the current map view.
     */
    constructor(drawCallback) {
        super(drawCallback);
    }
    /**
     * Obtains geo coordinates for the click location
     *
     * \@memberof GoogleCanvasOverlay
     * @param {?} e - The mouse event.
     * @return {?} - {\@link ILatLong} containing the geo coordinates of the clicked marker.
     */
    GetCoordinatesFromClick(e) {
        if (!e) {
            return null;
        }
        if (!e.latLng) {
            return null;
        }
        if (!e.latLng.lat || !e.latLng.lng) {
            return null;
        }
        return { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    }
    /**
     * Gets the map associted with the label.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?}
     */
    GetMap() {
        return (/** @type {?} */ (this)).getMap();
    }
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     *
     * \@memberof GoogleCanvasOverlay
     * \@method
     * @return {?} - The label to be used for the tooltip.
     */
    GetToolTipOverlay() {
        /** @type {?} */
        const o = {
            align: 'left',
            offset: new google.maps.Point(0, 25),
            backgroundColor: 'bisque',
            hidden: true,
            fontSize: 12,
            fontColor: '#000000',
            strokeWeight: 0
        };
        o["zIndex"] = 100000;
        /** @type {?} */
        const label = new GoogleMapLabel(o);
        label.SetMap(this.GetMap());
        return label;
    }
    /**
     * Called when the custom overlay is added to the map. Triggers Onload....
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    OnAdd() {
        super.OnAdd();
        this.OnLoad();
        this._canvas.style.zIndex = '100';
        // move the canvas above primitives such as polygons.
        // set the overlay to ready state
        this._readyResolver(true);
    }
    /**
     * Called whenever the canvas needs to be redrawn. This method does not do the actual
     * update, it simply scales the canvas. The actual redraw happens once the map is idle.
     * \@memberof GoogleCanvasOverly
     * \@method
     * @return {?}
     */
    OnDraw() {
        /** @type {?} */
        const isStreetView = false;
        /** @type {?} */
        const map = this.GetMap();
        if (isStreetView) {
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
            const el = map.getDiv();
            /** @type {?} */
            const w = el.offsetWidth;
            /** @type {?} */
            const h = el.offsetHeight;
            /** @type {?} */
            const newWidth = w * scale;
            /** @type {?} */
            const newHeight = h * scale;
            /** @type {?} */
            const projection = (/** @type {?} */ (this)).getProjection();
            /** @type {?} */
            const cc = projection.fromLatLngToDivPixel(centerCurrent);
            // Update the canvas CSS position and dimensions.
            this.UpdatePosition(cc.x - newWidth / 2, cc.y - newHeight / 2, newWidth, newHeight);
        }
    }
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @return {?}
     */
    OnLoad() {
        /** @type {?} */
        const isStreetView = false;
        /** @type {?} */
        const map = (/** @type {?} */ (this)).getMap();
        // Get the current map view information.
        this._zoomStart = map.getZoom();
        /** @type {?} */
        const c = map.getCenter();
        this._centerStart = {
            latitude: c.lat(),
            longitude: c.lng()
        };
        // When the map stops moving, render new data on the canvas.
        this._viewChangeEndEvent = google.maps.event.addListener(map, 'idle', (e) => {
            this.UpdateCanvas();
        });
        // Update the position of the overlay when the map is resized.
        this._mapResizeEvent = google.maps.event.addListener(map, 'resize', (e) => {
            this.UpdateCanvas();
        });
    }
    /**
     * Associates the cnavas overlay with a map.
     * \@method
     * \@memberof GoogleCanvasOverlay
     * @param {?} map
     * @return {?}
     */
    SetMap(map) {
        (/** @type {?} */ (this)).setMap(map);
    }
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} el
     * @return {?}
     */
    SetCanvasElement(el) {
        /** @type {?} */
        const panes = (/** @type {?} */ (this)).getPanes();
        if (panes) {
            if (el != null) {
                panes.overlayLayer.appendChild(el);
                // 4: floatPane (infowindow)
                // 3: overlayMouseTarget (mouse events)
                // 2: markerLayer (marker images)
                // 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
                // 0: mapPane (lowest pane above the map tiles)
            }
            else {
                panes.overlayLayer.removeChild(this._canvas);
            }
        }
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
        if (this._viewChangeEndEvent) {
            google.maps.event.removeListener(this._viewChangeEndEvent);
        }
        if (this._mapResizeEvent) {
            google.maps.event.removeListener(this._mapResizeEvent);
        }
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
        /** @type {?} */
        const el = map.getDiv();
        this._canvas.width = el.offsetWidth;
        this._canvas.height = el.offsetHeight;
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
        if (true) {
            this._canvas.style.display = '';
            /** @type {?} */
            const el = map.getDiv();
            /** @type {?} */
            const w = el.offsetWidth;
            /** @type {?} */
            const h = el.offsetHeight;
            /** @type {?} */
            const centerPoint = (/** @type {?} */ (this)).getProjection().fromLatLngToDivPixel(map.getCenter());
            this.UpdatePosition((centerPoint.x - w / 2), (centerPoint.y - h / 2), w, h);
            // Redraw the canvas.
            this.Redraw(true);
            // Get the current map view information.
            this._zoomStart = map.getZoom();
            /** @type {?} */
            const c = map.getCenter();
            this._centerStart = {
                latitude: c.lat(),
                longitude: c.lng()
            };
        }
    }
}
if (false) {
    /** @type {?} */
    GoogleCanvasOverlay.prototype._viewChangeEndEvent;
    /** @type {?} */
    GoogleCanvasOverlay.prototype._mapResizeEvent;
}
/**
 * Helper function to extend the OverlayView into the CanvasOverlay
 *
 * @export
 * \@method
 * @return {?}
 */
export function MixinCanvasOverlay() {
    new Extender(GoogleCanvasOverlay)
        .Extend(new google.maps.OverlayView)
        .Map('onAdd', 'OnAdd')
        .Map('draw', 'OnDraw')
        .Map('onRemove', 'OnRemove');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNhbnZhcy1vdmVybGF5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWNhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7OztBQVF2QyxNQUFNLDBCQUEyQixTQUFRLGFBQWE7Ozs7Ozs7SUFjbEQsWUFBWSxZQUFpRDtRQUN6RCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkI7Ozs7Ozs7O0lBYU0sdUJBQXVCLENBQUMsQ0FBNEI7UUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FBRTtRQUNwRCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDOzs7Ozs7Ozs7SUFTNUQsTUFBTTtRQUNULE1BQU0sQ0FBQyxtQkFBTSxJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7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LElBQUksQ0FBQyxDQUFDOztZQUdsQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7WUFDaEMsTUFBTSxDQUFDLEdBQTBCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNoQixRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsU0FBUyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUU7YUFDckIsQ0FBQztTQUNMO0tBQ0o7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7QUFRRCxNQUFNO0lBRUYsSUFBSSxRQUFRLENBQUMsbUJBQW1CLENBQUM7U0FDNUIsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDbkMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7U0FDckIsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7U0FDckIsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBHb29nbGVDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtY29udmVyc2lvbnMnO1xuaW1wb3J0IHsgQ2FudmFzT3ZlcmxheSB9IGZyb20gJy4uL2NhbnZhcy1vdmVybGF5JztcbmltcG9ydCB7IE1hcExhYmVsIH0gZnJvbSAnLi4vbWFwLWxhYmVsJztcbmltcG9ydCB7IEdvb2dsZU1hcExhYmVsIH0gZnJvbSAnLi9nb29nbGUtbGFiZWwnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xuaW1wb3J0IHsgRXh0ZW5kZXIgfSBmcm9tICcuLi9leHRlbmRlcic7XG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRpbmcgYSBjYW52YXMgb3ZlcmxheSB0byBiZSBwbGFjZWQgb24gdGhlIG1hcCBmb3IgR29vZ2xlIE1hcHMuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgR29vZ2xlQ2FudmFzT3ZlcmxheSBleHRlbmRzIENhbnZhc092ZXJsYXkge1xuXG4gICAgLy8vXG4gICAgLy8vIGZpZWxkIGRlY2xhcmF0aW9uc1xuICAgIC8vL1xuICAgIHByaXZhdGUgX3ZpZXdDaGFuZ2VFbmRFdmVudDogR29vZ2xlTWFwVHlwZXMuTWFwc0V2ZW50TGlzdGVuZXI7XG4gICAgcHJpdmF0ZSBfbWFwUmVzaXplRXZlbnQ6IEdvb2dsZU1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlQ2FudmFzT3ZlcmxheSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gZHJhd0NhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FudmFzIGlzIHJlYWR5IHRvIGJlXG4gICAgICogcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZCkge1xuICAgICAgICBzdXBlcihkcmF3Q2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogT2J0YWlucyBnZW8gY29vcmRpbmF0ZXMgZm9yIHRoZSBjbGljayBsb2NhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGUgLSBUaGUgbW91c2UgZXZlbnQuXG4gICAgICogQHJldHVybnMgLSB7QGxpbmsgSUxhdExvbmd9IGNvbnRhaW5pbmcgdGhlIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2xpY2tlZCBtYXJrZXIuXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogR29vZ2xlTWFwVHlwZXMuTW91c2VFdmVudCk6IElMYXRMb25nIHtcbiAgICAgICAgaWYgKCFlKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIGlmICghZS5sYXRMbmcpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgaWYgKCFlLmxhdExuZy5sYXQgfHwgIWUubGF0TG5nLmxuZykgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICByZXR1cm4geyBsYXRpdHVkZTogZS5sYXRMbmcubGF0KCksIGxvbmdpdHVkZTogZS5sYXRMbmcubG5nKCkgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXAgYXNzb2NpdGVkIHdpdGggdGhlIGxhYmVsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIEdldE1hcCgpOiBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAge1xuICAgICAgICByZXR1cm4gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIE1hcExhYmVsIGluc3RhbmNlIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgdG9vbHRpcC5cbiAgICAgKiBUaGlzIG1ldGhvZCBvbmx5IGdlbmVyYXRlcyB0aGUgbWFwIGxhYmVsLiBDb250ZW50IGFuZCBwbGFjZW1lbnQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5XG4gICAgICogb2YgdGhlIGNhbGxlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIC0gVGhlIGxhYmVsIHRvIGJlIHVzZWQgZm9yIHRoZSB0b29sdGlwLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRUb29sVGlwT3ZlcmxheSgpOiBNYXBMYWJlbCB7XG4gICAgICAgIGNvbnN0IG86IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgICAgICAgb2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjUpLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnYmlzcXVlJyxcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgICAgIG8uekluZGV4ID0gMTAwMDAwO1xuICAgICAgICBjb25zdCBsYWJlbDogTWFwTGFiZWwgPSBuZXcgR29vZ2xlTWFwTGFiZWwobyk7XG4gICAgICAgIGxhYmVsLlNldE1hcCh0aGlzLkdldE1hcCgpKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBjdXN0b20gb3ZlcmxheSBpcyBhZGRlZCB0byB0aGUgbWFwLiBUcmlnZ2VycyBPbmxvYWQuLi4uXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUNhbnZhc092ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgT25BZGQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLk9uQWRkKCk7XG4gICAgICAgIHRoaXMuT25Mb2FkKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS56SW5kZXggPSAnMTAwJztcbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGNhbnZhcyBhYm92ZSBwcmltaXRpdmVzIHN1Y2ggYXMgcG9seWdvbnMuXG5cbiAgICAgICAgLy8gc2V0IHRoZSBvdmVybGF5IHRvIHJlYWR5IHN0YXRlXG4gICAgICAgIHRoaXMuX3JlYWR5UmVzb2x2ZXIodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBjYW52YXMgbmVlZHMgdG8gYmUgcmVkcmF3bi4gVGhpcyBtZXRob2QgZG9lcyBub3QgZG8gdGhlIGFjdHVhbFxuICAgICAqIHVwZGF0ZSwgaXQgc2ltcGx5IHNjYWxlcyB0aGUgY2FudmFzLiBUaGUgYWN0dWFsIHJlZHJhdyBoYXBwZW5zIG9uY2UgdGhlIG1hcCBpcyBpZGxlLlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybHlcbiAgICAgKiBAbWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIE9uRHJhdygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNTdHJlZXRWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gdGhpcy5HZXRNYXAoKTtcblxuICAgICAgICBpZiAoaXNTdHJlZXRWaWV3KSB7XG4gICAgICAgICAgICAvLyBEb24ndCBzaG93IHRoZSBjYW52YXMgaWYgdGhlIG1hcCBpcyBpbiBTdHJlZXRzaWRlIG1vZGUuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlLWRyYXdpbmcgdGhlIGNhbnZhcyBhcyBpdCBtb3ZlcyB3b3VsZCBiZSB0b28gc2xvdy4gSW5zdGVhZCwgc2NhbGUgYW5kIHRyYW5zbGF0ZSBjYW52YXMgZWxlbWVudC5cbiAgICAgICAgICAgIC8vIFVwb24gaWRsZSBvciBkcmFnIGVuZCwgd2UgY2FuIHRoZW4gcmVkcmF3IHRoZSBjYW52YXMuLi4uXG4gICAgICAgICAgICBjb25zdCB6b29tQ3VycmVudDogbnVtYmVyID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlckN1cnJlbnQ6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG1hcCBzY2FsZSBiYXNlZCBvbiB6b29tIGxldmVsIGRpZmZlcmVuY2UuXG4gICAgICAgICAgICBjb25zdCBzY2FsZTogbnVtYmVyID0gTWF0aC5wb3coMiwgem9vbUN1cnJlbnQgLSB0aGlzLl96b29tU3RhcnQpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlZCBkaW1lbnNpb25zIG9mIHRoZSBjYW52YXMuXG4gICAgICAgICAgICBjb25zdCBlbDogSFRNTERpdkVsZW1lbnQgPSBtYXAuZ2V0RGl2KCk7XG4gICAgICAgICAgICBjb25zdCB3OiBudW1iZXIgPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGg6IG51bWJlciA9IGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoOiBudW1iZXIgPSB3ICogc2NhbGU7XG4gICAgICAgICAgICBjb25zdCBuZXdIZWlnaHQ6IG51bWJlciA9IGggKiBzY2FsZTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG9mZnNldCBvZiBjYW52YXMgYmFzZWQgb24gem9vbSBhbmQgY2VudGVyIG9mZnNldHMuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gKDxhbnk+dGhpcykuZ2V0UHJvamVjdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgY2MgPSBwcm9qZWN0aW9uLmZyb21MYXRMbmdUb0RpdlBpeGVsKGNlbnRlckN1cnJlbnQpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNhbnZhcyBDU1MgcG9zaXRpb24gYW5kIGRpbWVuc2lvbnMuXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVBvc2l0aW9uKGNjLnggLSBuZXdXaWR0aCAvIDIsIGNjLnkgLSBuZXdIZWlnaHQgLyAyLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbnZhc092ZXJsYXkgbG9hZGVkLCBhdHRhY2ggbWFwIGV2ZW50cyBmb3IgdXBkYXRpbmcgY2FudmFzLlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlQ2FudmFzT3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBPbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzU3RyZWV0VmlldzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9ICg8YW55PnRoaXMpLmdldE1hcCgpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBtYXAgdmlldyBpbmZvcm1hdGlvbi5cbiAgICAgICAgdGhpcy5fem9vbVN0YXJ0ID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgY29uc3QgYzogR29vZ2xlTWFwVHlwZXMuTGF0TG5nID0gbWFwLmdldENlbnRlcigpO1xuICAgICAgICB0aGlzLl9jZW50ZXJTdGFydCA9IHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiBjLmxhdCgpLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBjLmxuZygpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgbWFwIHN0b3BzIG1vdmluZywgcmVuZGVyIG5ldyBkYXRhIG9uIHRoZSBjYW52YXMuXG4gICAgICAgIHRoaXMuX3ZpZXdDaGFuZ2VFbmRFdmVudCA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2lkbGUnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUNhbnZhcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IHdoZW4gdGhlIG1hcCBpcyByZXNpemVkLlxuICAgICAgICB0aGlzLl9tYXBSZXNpemVFdmVudCA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ3Jlc2l6ZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2FudmFzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzc29jaWF0ZXMgdGhlIGNuYXZhcyBvdmVybGF5IHdpdGggYSBtYXAuXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVDYW52YXNPdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIFNldE1hcChtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCk6IHZvaWQge1xuICAgICAgICAoPGFueT50aGlzKS5zZXRNYXAobWFwKTtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBjYW52YXMgdG8gdGhlIG1hcC5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgU2V0Q2FudmFzRWxlbWVudChlbDogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFuZXMgPSAoPGFueT50aGlzKS5nZXRQYW5lcygpO1xuICAgICAgICBpZiAocGFuZXMpIHtcbiAgICAgICAgICAgIGlmIChlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFuZXMub3ZlcmxheUxheWVyLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAvLyA0OiBmbG9hdFBhbmUgKGluZm93aW5kb3cpXG4gICAgICAgICAgICAgICAgLy8gMzogb3ZlcmxheU1vdXNlVGFyZ2V0IChtb3VzZSBldmVudHMpXG4gICAgICAgICAgICAgICAgLy8gMjogbWFya2VyTGF5ZXIgKG1hcmtlciBpbWFnZXMpXG4gICAgICAgICAgICAgICAgLy8gMTogb3ZlcmxheUxheWVyIChwb2x5Z29ucywgcG9seWxpbmVzLCBncm91bmQgb3ZlcmxheXMsIHRpbGUgbGF5ZXIgb3ZlcmxheXMpXG4gICAgICAgICAgICAgICAgLy8gMDogbWFwUGFuZSAobG93ZXN0IHBhbmUgYWJvdmUgdGhlIG1hcCB0aWxlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhbmVzLm92ZXJsYXlMYXllci5yZW1vdmVDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBtYXAgZXZlbnQgaGFuZGxlcnMuXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBSZW1vdmVFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xuICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50IGhhbmRsZXJzIGZyb20gdGhlIG1hcC5cbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdDaGFuZ2VFbmRFdmVudCkgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl92aWV3Q2hhbmdlRW5kRXZlbnQpOyB9XG4gICAgICAgIGlmICh0aGlzLl9tYXBSZXNpemVFdmVudCkgeyBnb29nbGUubWFwcy5ldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tYXBSZXNpemVFdmVudCk7IH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBDYW52YXMgc2l6ZSBiYXNlZCBvbiB0aGUgbWFwIHNpemUuXG4gICAgICogQG1lbWJlcm9mIENhbnZhc092ZXJsYXlcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gKDxhbnk+dGhpcykuZ2V0TWFwKCk7XG5cbiAgICAgICAgLy8gQ2xlYXIgY2FudmFzIGJ5IHVwZGF0aW5nIGRpbWVuc2lvbnMuIFRoaXMgYWxzbyBlbnN1cmVzIGNhbnZhcyBzdGF5cyB0aGUgc2FtZSBzaXplIGFzIHRoZSBtYXAuXG4gICAgICAgIGNvbnN0IGVsOiBIVE1MRGl2RWxlbWVudCA9IG1hcC5nZXREaXYoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ2FudmFzLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgVXBkYXRlQ2FudmFzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtYXA6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCA9ICg8YW55PnRoaXMpLmdldE1hcCgpO1xuXG4gICAgICAgIC8vIE9ubHkgcmVuZGVyIHRoZSBjYW52YXMgaWYgaXQgaXNuJ3QgaW4gc3RyZWV0c2lkZSBtb2RlLlxuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgLy8gUmVzZXQgQ1NTIHBvc2l0aW9uIGFuZCBkaW1lbnNpb25zIG9mIGNhbnZhcy5cbiAgICAgICAgICAgIGNvbnN0IGVsOiBIVE1MRGl2RWxlbWVudCA9IG1hcC5nZXREaXYoKTtcbiAgICAgICAgICAgIGNvbnN0IHc6IG51bWJlciA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgaDogbnVtYmVyID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgY2VudGVyUG9pbnQgPSAoPGFueT50aGlzKS5nZXRQcm9qZWN0aW9uKCkuZnJvbUxhdExuZ1RvRGl2UGl4ZWwobWFwLmdldENlbnRlcigpKTtcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlUG9zaXRpb24oKGNlbnRlclBvaW50LnggLSB3IC8gMiksIChjZW50ZXJQb2ludC55IC0gaCAvIDIpLCB3LCBoKTtcblxuICAgICAgICAgICAgLy8gUmVkcmF3IHRoZSBjYW52YXMuXG4gICAgICAgICAgICB0aGlzLlJlZHJhdyh0cnVlKTtcblxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGluZm9ybWF0aW9uLlxuICAgICAgICAgICAgdGhpcy5fem9vbVN0YXJ0ID0gbWFwLmdldFpvb20oKTtcbiAgICAgICAgICAgIGNvbnN0IGM6IEdvb2dsZU1hcFR5cGVzLkxhdExuZyA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlclN0YXJ0ID0ge1xuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBjLmxhdCgpLFxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogYy5sbmcoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHRoZSBPdmVybGF5VmlldyBpbnRvIHRoZSBDYW52YXNPdmVybGF5XG4gKlxuICogQGV4cG9ydFxuICogQG1ldGhvZFxuICovXG5leHBvcnQgZnVuY3Rpb24gTWl4aW5DYW52YXNPdmVybGF5KCkge1xuXG4gICAgbmV3IEV4dGVuZGVyKEdvb2dsZUNhbnZhc092ZXJsYXkpXG4gICAgICAgIC5FeHRlbmQobmV3IGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KVxuICAgICAgICAuTWFwKCdvbkFkZCcsICdPbkFkZCcpXG4gICAgICAgIC5NYXAoJ2RyYXcnLCAnT25EcmF3JylcbiAgICAgICAgLk1hcCgnb25SZW1vdmUnLCAnT25SZW1vdmUnKTtcbn1cbiJdfQ==