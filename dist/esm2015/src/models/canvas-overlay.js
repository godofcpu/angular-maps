/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let id = 0;
/**
 * Abstract base implementing a canvas overlay to be placed on the map.
 *
 * @export
 * @abstract
 * @abstract
 */
export class CanvasOverlay {
    /**
     * Creates a new instance of the CanvasOverlay class.
     * @param {?} drawCallback
     */
    constructor(drawCallback) {
        this._canvasReady = new Promise((resolve, reject) => { this._readyResolver = resolve; });
        this._drawCallback = drawCallback;
        id++;
    }
    /**
     * Returns a promise that gets resolved when the canvas overlay is ready for interaction.
     * @return {?}
     */
    get CanvasReady() { return this._canvasReady; }
    /**
     * Deletes the canvas overlay.
     * @return {?}
     */
    Delete() {
        this.SetMap(null);
    }
    /**
     * CanvasOverlay added to map, load canvas.
     * @return {?}
     */
    OnAdd() {
        this._canvas = document.createElement('canvas');
        this._canvas.style.position = 'absolute';
        this._canvas.style.left = '0px';
        this._canvas.style.top = '0px';
        this._canvas.id = `xMapOverlay${id}`;
        // Add the canvas to the overlay.
        this.SetCanvasElement(this._canvas);
    }
    /**
     * When the CanvasLayer is removed from the map, release resources.
     * \@memberof CanvasOverlay
     * \@method
     * @return {?}
     */
    OnRemove() {
        this.SetCanvasElement(null);
        this.RemoveEventHandlers();
        this._canvas = null;
    }
    /**
     * Redraws the canvas for the current map view.
     * \@memberof CanvasOverlay
     * \@method
     * @param {?} clear - True to clear the canvas before drawing.
     * @return {?}
     */
    Redraw(clear) {
        if (this._canvas == null) {
            return;
        }
        // Clear canvas by updating dimensions. This also ensures canvas stays the same size as the map.
        if (clear) {
            this.Resize();
        }
        // Call the drawing callback function if specified.
        if (this._drawCallback) {
            this._drawCallback(this._canvas);
        }
    }
    /**
     * Simple function for updating the CSS position and dimensions of the canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @param {?} x The horizontal offset position of the canvas.
     * @param {?} y The vertical offset position of the canvas.
     * @param {?} w The width of the canvas.
     * @param {?} h The height of the canvas.
     * @return {?}
     */
    UpdatePosition(x, y, w, h) {
        // Update CSS position.
        this._canvas.style.left = x + 'px';
        this._canvas.style.top = y + 'px';
        // Update CSS dimensions.
        this._canvas.style.width = w + 'px';
        this._canvas.style.height = h + 'px';
    }
}
if (false) {
    /** @type {?} */
    CanvasOverlay.prototype._readyResolver;
    /** @type {?} */
    CanvasOverlay.prototype._canvas;
    /** @type {?} */
    CanvasOverlay.prototype._zoomStart;
    /** @type {?} */
    CanvasOverlay.prototype._centerStart;
    /** @type {?} */
    CanvasOverlay.prototype._canvasReady;
    /**
     * A callback function that is triggered when the canvas is ready to be rendered for the current map view.
     * @type {?}
     */
    CanvasOverlay.prototype._drawCallback;
    /**
     * Obtains geo coordinates for the click location
     * @abstract
     * @param {?} e
     * @return {?}
     */
    CanvasOverlay.prototype.GetCoordinatesFromClick = function (e) { };
    /**
     * Gets the map associted with the label.
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.GetMap = function () { };
    /**
     * Returns a MapLabel instance for the current platform that can be used as a tooltip.
     * This method only generates the map label. Content and placement is the responsibility
     * of the caller.
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.GetToolTipOverlay = function () { };
    /**
     * CanvasOverlay loaded, attach map events for updating canvas.
     * @abstract
     * \@method
     * \@memberof CanvasOverlay
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.OnLoad = function () { };
    /**
     * Sets the map for the label. Settings this to null remove the label from hte map.
     *
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @param {?} map - A native map object for the underlying implementation. Implementing derivatives should return the
     * actual native object.
     * @return {?}
     */
    CanvasOverlay.prototype.SetMap = function (map) { };
    /**
     * Attaches the canvas to the map.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @param {?} el
     * @return {?}
     */
    CanvasOverlay.prototype.SetCanvasElement = function (el) { };
    /**
     * Remove the map event handlers.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.RemoveEventHandlers = function () { };
    /**
     * Updates the Canvas size based on the map size.
     * \@memberof CanvasOverlay
     * \@method
     * @abstract
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.Resize = function () { };
    /**
     * Updates the Canvas.
     * \@memberof CanvasOverlay
     * \@method
     * @protected
     * @abstract
     * @return {?}
     */
    CanvasOverlay.prototype.UpdateCanvas = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2NhbnZhcy1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDOzs7Ozs7OztBQVFuQixNQUFNOzs7OztJQXlCRixZQUFZLFlBQWlEOzRCQWhCckIsSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFpQmpILElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLEVBQUUsRUFBRSxDQUFDO0tBQ1I7Ozs7O1FBZFUsV0FBVyxLQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Ozs7SUF1Qi9ELE1BQU07UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUF3QmYsS0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxjQUFjLEVBQUUsRUFBRSxDQUFDOztRQUdyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7OztJQWdCakMsUUFBUTtRQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7O0lBU2pCLE1BQU0sQ0FBQyxLQUFjO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFOztRQUdyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQUU7O1FBRzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDOzs7Ozs7Ozs7Ozs7O0lBNERLLGNBQWMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTOztRQUUvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzs7UUFHbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDeEM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMYXRMb25nIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbGF0bG9uZyc7XG5pbXBvcnQgeyBNYXBMYWJlbCB9IGZyb20gJy4vbWFwLWxhYmVsJztcblxubGV0IGlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIEFic3RyYWN0IGJhc2UgaW1wbGVtZW50aW5nIGEgY2FudmFzIG92ZXJsYXkgdG8gYmUgcGxhY2VkIG9uIHRoZSBtYXAuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYW52YXNPdmVybGF5IHtcblxuICAgIC8vL1xuICAgIC8vLyBmaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcm90ZWN0ZWQgX3JlYWR5UmVzb2x2ZXI6ICh2YWw6IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgcHJvdGVjdGVkIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByb3RlY3RlZCBfem9vbVN0YXJ0OiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9jZW50ZXJTdGFydDogSUxhdExvbmc7XG4gICAgcHVibGljIF9jYW52YXNSZWFkeTogUHJvbWlzZTxib29sZWFuPiA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHsgdGhpcy5fcmVhZHlSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIHdoZW4gdGhlIGNhbnZhcyBvdmVybGF5IGlzIHJlYWR5IGZvciBpbnRlcmFjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IENhbnZhc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4geyByZXR1cm4gdGhpcy5fY2FudmFzUmVhZHk7IH1cblxuICAgIC8qKlxuICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYW52YXMgaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxuICAgICovXG4gICAgcHJpdmF0ZSBfZHJhd0NhbGxiYWNrOiAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQ2FudmFzT3ZlcmxheSBjbGFzcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkcmF3Q2FsbGJhY2s6IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuX2RyYXdDYWxsYmFjayA9IGRyYXdDYWxsYmFjaztcbiAgICAgICAgaWQrKztcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gUHVibGljIG1ldGhvZHNcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGNhbnZhcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0TWFwKG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgZ2VvIGNvb3JkaW5hdGVzIGZvciB0aGUgY2xpY2sgbG9jYXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0Q29vcmRpbmF0ZXNGcm9tQ2xpY2soZTogYW55KTogSUxhdExvbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcCBhc3NvY2l0ZWQgd2l0aCB0aGUgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldE1hcCgpOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgTWFwTGFiZWwgaW5zdGFuY2UgZm9yIHRoZSBjdXJyZW50IHBsYXRmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSB0b29sdGlwLlxuICAgICAqIFRoaXMgbWV0aG9kIG9ubHkgZ2VuZXJhdGVzIHRoZSBtYXAgbGFiZWwuIENvbnRlbnQgYW5kIHBsYWNlbWVudCBpcyB0aGUgcmVzcG9uc2liaWxpdHlcbiAgICAgKiBvZiB0aGUgY2FsbGVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRUb29sVGlwT3ZlcmxheSgpOiBNYXBMYWJlbDtcblxuICAgIC8qKlxuICAgICAqIENhbnZhc092ZXJsYXkgYWRkZWQgdG8gbWFwLCBsb2FkIGNhbnZhcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgT25BZGQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5pZCA9IGB4TWFwT3ZlcmxheSR7aWR9YDtcblxuICAgICAgICAvLyBBZGQgdGhlIGNhbnZhcyB0byB0aGUgb3ZlcmxheS5cbiAgICAgICAgdGhpcy5TZXRDYW52YXNFbGVtZW50KHRoaXMuX2NhbnZhcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FudmFzT3ZlcmxheSBsb2FkZWQsIGF0dGFjaCBtYXAgZXZlbnRzIGZvciB1cGRhdGluZyBjYW52YXMuXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IE9uTG9hZCgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgQ2FudmFzTGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIHRoZSBtYXAsIHJlbGVhc2UgcmVzb3VyY2VzLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBPblJlbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRDYW52YXNFbGVtZW50KG51bGwpO1xuICAgICAgICB0aGlzLlJlbW92ZUV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWRyYXdzIHRoZSBjYW52YXMgZm9yIHRoZSBjdXJyZW50IG1hcCB2aWV3LlxuICAgICAqIEBwYXJhbSBjbGVhciAtIFRydWUgdG8gY2xlYXIgdGhlIGNhbnZhcyBiZWZvcmUgZHJhd2luZy5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgUmVkcmF3KGNsZWFyOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMgPT0gbnVsbCkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBDbGVhciBjYW52YXMgYnkgdXBkYXRpbmcgZGltZW5zaW9ucy4gVGhpcyBhbHNvIGVuc3VyZXMgY2FudmFzIHN0YXlzIHRoZSBzYW1lIHNpemUgYXMgdGhlIG1hcC5cbiAgICAgICAgaWYgKGNsZWFyKSB7IHRoaXMuUmVzaXplKCk7IH1cblxuICAgICAgICAvLyBDYWxsIHRoZSBkcmF3aW5nIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIHNwZWNpZmllZC5cbiAgICAgICAgaWYgKHRoaXMuX2RyYXdDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NhbGxiYWNrKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXAgZm9yIHRoZSBsYWJlbC4gU2V0dGluZ3MgdGhpcyB0byBudWxsIHJlbW92ZSB0aGUgbGFiZWwgZnJvbSBodGUgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hcCAtIEEgbmF0aXZlIG1hcCBvYmplY3QgZm9yIHRoZSB1bmRlcmx5aW5nIGltcGxlbWVudGF0aW9uLiBJbXBsZW1lbnRpbmcgZGVyaXZhdGl2ZXMgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBhY3R1YWwgbmF0aXZlIG9iamVjdC5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0TWFwKG1hcDogYW55KTogdm9pZDtcblxuICAgIC8vL1xuICAgIC8vLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIGNhbnZhcyB0byB0aGUgbWFwLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBTZXRDYW52YXNFbGVtZW50KGVsOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIG1hcCBldmVudCBoYW5kbGVycy5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFJlbW92ZUV2ZW50SGFuZGxlcnMoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENhbnZhcyBzaXplIGJhc2VkIG9uIHRoZSBtYXAgc2l6ZS5cbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzT3ZlcmxheVxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFJlc2l6ZSgpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ2FudmFzLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgVXBkYXRlQ2FudmFzKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTaW1wbGUgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHRoZSBDU1MgcG9zaXRpb24gYW5kIGRpbWVuc2lvbnMgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0geCBUaGUgaG9yaXpvbnRhbCBvZmZzZXQgcG9zaXRpb24gb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0geSBUaGUgdmVydGljYWwgb2Zmc2V0IHBvc2l0aW9uIG9mIHRoZSBjYW52YXMuXG4gICAgICogQHBhcmFtIHcgVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMuXG4gICAgICogQHBhcmFtIGggVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNPdmVybGF5XG4gICAgICogQG1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgVXBkYXRlUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBDU1MgcG9zaXRpb24uXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSB5ICsgJ3B4JztcblxuICAgICAgICAvLyBVcGRhdGUgQ1NTIGRpbWVuc2lvbnMuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfVxuXG59XG4iXX0=