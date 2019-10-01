/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { eachSeries, nextTick } from 'async';
/**
 * Concrete implementation of a layer for the Google Map Provider.
 *
 * @export
 */
export class GoogleLayer {
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * \@memberof GoogleLayer
     * @param {?} _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     * @param {?} _maps MapService. MapService implementation to leverage for the layer.
     *
     * @param {?} _id
     */
    constructor(_layer, _maps, _id) {
        this._layer = _layer;
        this._maps = _maps;
        this._id = _id;
        this._entities = new Array();
        this._visible = true;
    }
    /**
     * Get the native primitive underneath the abstraction layer. Google does not have the concept of a custom layer,
     * so we are returning the Map as the native object because it hosts all the markers.
     *
     * \@memberof GoogleLayer
     * @return {?} GoogleMapTypes.GoogleMap.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        throw (new Error('Events are not supported on Google Layers. You can still add events to individual markers.'));
    }
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleLAyer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline. Entity to add to the layer.
     *
     * @return {?}
     */
    AddEntity(entity) {
        if (entity.NativePrimitve) {
            this._entities.push(entity);
            entity.NativePrimitve.setVisible(this._visible);
            entity.NativePrimitve.setMap(this.NativePrimitve);
        }
    }
    /**
     * Adds a number of entities to the layer. Entities in this context should be model abstractions of concered map functionality (such
     * as marker, infowindow, polyline, polygon, etc..)
     *
     * \@memberof GoogleLAyer
     * @param {?} entities Array<Marker|InfoWindow|Polygon|Polyline>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            this._entities.push(...entities);
            eachSeries([...entities], (e, next) => {
                e.NativePrimitve.setVisible(this._visible);
                e.NativePrimitve.setMap(this.NativePrimitve);
                nextTick(() => next());
            });
        }
    }
    /**
     * Deletes the layer anbd the markers in it.
     *
     * \@memberof GoogleLayer
     * @return {?}
     */
    Delete() {
        eachSeries(this._entities.splice(0), (e, next) => {
            e.NativePrimitve.setMap(null);
            nextTick(() => next());
        });
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} ILayerOptions. The layer options.
     *
     */
    GetOptions() {
        /** @type {?} */
        const options = {
            id: this._id
        };
        return options;
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._visible;
    }
    /**
     * Removes an entity from the layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entity Marker|InfoWindow|Polygon|Polyline Entity to be removed from the layer.
     *
     * @return {?}
     */
    RemoveEntity(entity) {
        if (entity.NativePrimitve) {
            /** @type {?} */
            const j = this._entities.indexOf(entity);
            if (j > -1) {
                this._entities.splice(j, 1);
            }
            entity.NativePrimitve.setMap(null);
        }
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} entities Array<Marker>|Array<InfoWindow>|Array<Polygon>|Array<Polyline> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        this.Delete();
        this.AddEntities(entities);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleLayer
     * @param {?} options ILayerOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        this._id = options.id;
    }
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    SetVisible(visible) {
        eachSeries([...this._entities], (e, next) => {
            e.NativePrimitve.setVisible(visible);
            nextTick(() => next());
        });
        this._visible = visible;
    }
}
if (false) {
    /** @type {?} */
    GoogleLayer.prototype._entities;
    /** @type {?} */
    GoogleLayer.prototype._visible;
    /** @type {?} */
    GoogleLayer.prototype._layer;
    /** @type {?} */
    GoogleLayer.prototype._maps;
    /** @type {?} */
    GoogleLayer.prototype._id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9nb29nbGUvZ29vZ2xlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7Ozs7O0FBaUI3QyxNQUFNOzs7Ozs7Ozs7O0lBb0NGLFlBQW9CLE1BQWdDLEVBQVUsS0FBaUIsRUFBVSxHQUFXO1FBQWhGLFdBQU0sR0FBTixNQUFNLENBQTBCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVE7eUJBL0JyQyxJQUFJLEtBQUssRUFBc0M7d0JBQ2xGLElBQUk7S0E4QnlFOzs7Ozs7Ozs7UUFoQjlGLGNBQWM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7OztJQStCaEIsV0FBVyxDQUFDLFNBQWlCLEVBQUUsRUFBWTtRQUM5QyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEZBQTRGLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZN0csU0FBUyxDQUFDLE1BQWdEO1FBQzdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDckQ7Ozs7Ozs7Ozs7O0lBV0UsV0FBVyxDQUFDLFFBQW1EO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNsQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0MsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O0lBUUUsTUFBTTtRQUNULFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM3QyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7Ozs7Ozs7OztJQVVBLFVBQVU7O1FBQ2IsTUFBTSxPQUFPLEdBQWtCO1lBQzNCLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7SUFVWixVQUFVO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7SUFVbEIsWUFBWSxDQUFDLE1BQWdEO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUN4QixNQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQzVDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDOzs7Ozs7Ozs7OztJQVdFLFdBQVcsQ0FBQyxRQUE4RTtRQUM3RixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVd4QixVQUFVLENBQUMsT0FBc0I7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBVW5CLFVBQVUsQ0FBQyxPQUFnQjtRQUM5QixVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN4QyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7Q0FHL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlYWNoU2VyaWVzLCBuZXh0VGljayB9IGZyb20gJ2FzeW5jJztcbmltcG9ydCB7IEdvb2dsZU1hcmtlciB9IGZyb20gJy4vZ29vZ2xlLW1hcmtlcic7XG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tICcuLi9wb2x5Z29uJztcbmltcG9ydCB7IFBvbHlsaW5lIH0gZnJvbSAnLi4vcG9seWxpbmUnO1xuaW1wb3J0IHsgQ2x1c3RlclBsYWNlbWVudE1vZGUgfSBmcm9tICcuLi9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcbmltcG9ydCAqIGFzIEdvb2dsZU1hcFR5cGVzIGZyb20gJy4uLy4uL3NlcnZpY2VzL2dvb2dsZS9nb29nbGUtbWFwLXR5cGVzJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGxheWVyIGZvciB0aGUgR29vZ2xlIE1hcCBQcm92aWRlci5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBHb29nbGVMYXllciBpbXBsZW1lbnRzIExheWVyIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9lbnRpdGllczogQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4gPSBuZXcgQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4oKTtcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLiBHb29nbGUgZG9lcyBub3QgaGF2ZSB0aGUgY29uY2VwdCBvZiBhIGN1c3RvbSBsYXllcixcbiAgICAgKiBzbyB3ZSBhcmUgcmV0dXJuaW5nIHRoZSBNYXAgYXMgdGhlIG5hdGl2ZSBvYmplY3QgYmVjYXVzZSBpdCBob3N0cyBhbGwgdGhlIG1hcmtlcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBHb29nbGVNYXBUeXBlcy5Hb29nbGVNYXAuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IEdvb2dsZU1hcFR5cGVzLkdvb2dsZU1hcCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcjtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLy8gQ29uc3RydWN0b3JcbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEdvb2dsZU1hcmtlckNsdXN0ZXJlciBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyLiBOYXRpdmUgR29vZ2xlIE1hcHMgTWFya2VyIENsdXN0ZXJlciBzdXBwb3J0aW5nIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqIEBwYXJhbSBfbWFwcyBNYXBTZXJ2aWNlLiBNYXBTZXJ2aWNlIGltcGxlbWVudGF0aW9uIHRvIGxldmVyYWdlIGZvciB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYXllcjogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwLCBwcml2YXRlIF9tYXBzOiBNYXBTZXJ2aWNlLCBwcml2YXRlIF9pZDogbnVtYmVyKSB7IH1cblxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uLiBIYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhyb3cgKG5ldyBFcnJvcignRXZlbnRzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIEdvb2dsZSBMYXllcnMuIFlvdSBjYW4gc3RpbGwgYWRkIGV2ZW50cyB0byBpbmRpdmlkdWFsIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbiBhcyBpdCB3aWxsXG4gICAgICogdHJpZ2dlciBhIHJlY2FsdWF0aW9uIG9mIHRoZSBjbHVzdGVycyAoYW5kIGFzc29jaWF0ZWQgbWFya2VycyBpZiBhcHByb3ByaXRlKSBmb3JcbiAgICAgKiBlYWNoIGludm9jYXRpb24uIElmIHlvdSB1c2UgdGhpcyBtZXRob2QgdG8gYWRkIG1hbnkgbWFya2VycyB0byB0aGUgY2x1c3RlciwgdXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmUuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxBeWVyXG4gICAgICovXG4gICAgcHVibGljIEFkZEVudGl0eShlbnRpdHk6IE1hcmtlciB8IEluZm9XaW5kb3cgfCBQb2x5Z29uIHwgUG9seWxpbmUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSkge1xuICAgICAgICAgICAgdGhpcy5fZW50aXRpZXMucHVzaChlbnRpdHkpO1xuICAgICAgICAgICAgZW50aXR5Lk5hdGl2ZVByaW1pdHZlLnNldFZpc2libGUodGhpcy5fdmlzaWJsZSk7XG4gICAgICAgICAgICBlbnRpdHkuTmF0aXZlUHJpbWl0dmUuc2V0TWFwKHRoaXMuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG51bWJlciBvZiBlbnRpdGllcyB0byB0aGUgbGF5ZXIuIEVudGl0aWVzIGluIHRoaXMgY29udGV4dCBzaG91bGQgYmUgbW9kZWwgYWJzdHJhY3Rpb25zIG9mIGNvbmNlcmVkIG1hcCBmdW5jdGlvbmFsaXR5IChzdWNoXG4gICAgICogYXMgbWFya2VyLCBpbmZvd2luZG93LCBwb2x5bGluZSwgcG9seWdvbiwgZXRjLi4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyfEluZm9XaW5kb3d8UG9seWdvbnxQb2x5bGluZT4uIEVudGl0aWVzIHRvIGFkZCB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTEF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcnxJbmZvV2luZG93fFBvbHlnb258UG9seWxpbmU+KTogdm9pZCB7XG4gICAgICAgIGlmIChlbnRpdGllcyAhPSBudWxsICYmIEFycmF5LmlzQXJyYXkoZW50aXRpZXMpICYmIGVudGl0aWVzLmxlbmd0aCAhPT0gMCApIHtcbiAgICAgICAgICAgIHRoaXMuX2VudGl0aWVzLnB1c2goLi4uZW50aXRpZXMpO1xuICAgICAgICAgICAgZWFjaFNlcmllcyhbLi4uZW50aXRpZXNdLCAoZSwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIGUuTmF0aXZlUHJpbWl0dmUuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKTtcbiAgICAgICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldE1hcCh0aGlzLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiBuZXh0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBsYXllciBhbmJkIHRoZSBtYXJrZXJzIGluIGl0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIERlbGV0ZSgpOiB2b2lkIHtcbiAgICAgICAgZWFjaFNlcmllcyh0aGlzLl9lbnRpdGllcy5zcGxpY2UoMCksIChlLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IG5leHQoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9wdGlvbnMgZ292ZXJuaW5nIHRoZSBiZWhhdmlvciBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBJTGF5ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRPcHRpb25zKCk6IElMYXllck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBJTGF5ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQm9vbGVhbi4gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIEdldFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gZW50aXR5IGZyb20gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXJ8SW5mb1dpbmRvd3xQb2x5Z29ufFBvbHlsaW5lIEVudGl0eSB0byBiZSByZW1vdmVkIGZyb20gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlciB8IEluZm9XaW5kb3cgfCBQb2x5Z29uIHwgUG9seWxpbmUpOiB2b2lkIHtcbiAgICAgICAgaWYgKGVudGl0eS5OYXRpdmVQcmltaXR2ZSkge1xuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fZW50aXRpZXMuaW5kZXhPZihlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKGogPiAtMSkgeyB0aGlzLl9lbnRpdGllcy5zcGxpY2UoaiwgMSk7IH1cbiAgICAgICAgICAgIGVudGl0eS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPnxBcnJheTxJbmZvV2luZG93PnxBcnJheTxQb2x5Z29uPnxBcnJheTxQb2x5bGluZT4gY29udGFpbmluZ1xuICAgICAqIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZUxheWVyXG4gICAgICovXG4gICAgcHVibGljIFNldEVudGl0aWVzKGVudGl0aWVzOiBBcnJheTxNYXJrZXI+IHwgQXJyYXk8SW5mb1dpbmRvdz4gfCBBcnJheTxQb2x5Z29uPiB8IEFycmF5PFBvbHlsaW5lPik6IHZvaWQge1xuICAgICAgICB0aGlzLkRlbGV0ZSgpO1xuICAgICAgICB0aGlzLkFkZEVudGl0aWVzKGVudGl0aWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBvcHRpb25zIGZvciB0aGUgY2x1c3RlciBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIElMYXllck9wdGlvbnMgY29udGFpbmluZyB0aGUgb3B0aW9ucyBlbnVtZXJhdGlvbiBjb250cm9sbGluZyB0aGUgbGF5ZXIgYmVoYXZpb3IuIFRoZSBzdXBwbGllZCBvcHRpb25zXG4gICAgICogYXJlIG1lcmdlZCB3aXRoIHRoZSBkZWZhdWx0L2V4aXN0aW5nIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJTGF5ZXJPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lkID0gb3B0aW9ucy5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbHVzdGVyIGxheWVyIHZpc2liaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSBCb29sZWFuIHRydWUgdG8gbWFrZSB0aGUgbGF5ZXIgdmlzaWJsZSwgZmFsc2UgdG8gaGlkZSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBlYWNoU2VyaWVzKFsuLi50aGlzLl9lbnRpdGllc10sIChlLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldFZpc2libGUodmlzaWJsZSk7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiBuZXh0KCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG4gICAgfVxuXG59XG4iXX0=