/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GoogleMarker } from './google-marker';
import { Marker } from '../marker';
import { ClusterPlacementMode } from '../cluster-placement-mode';
import { timer } from 'rxjs';
/**
 * Concrete implementation of a clustering layer for the Google Map Provider.
 *
 * @export
 */
export class GoogleMarkerClusterer {
    /**
     * Creates a new instance of the GoogleMarkerClusterer class.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} _layer GoogleMapTypes.MarkerClusterer. Native Google Maps Marker Clusterer supporting the cluster layer.
     */
    constructor(_layer) {
        this._layer = _layer;
        this._isClustering = true;
        this._markerLookup = new Map();
        this._markers = new Array();
        this._pendingMarkers = new Array();
        this._mapclicks = 0;
        this._currentZoom = 0;
        this._visible = true;
    }
    /**
     * Get the native primitive underneath the abstraction layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} GoogleMapTypes.MarkerClusterer.
     *
     */
    get NativePrimitve() {
        return this._layer;
    }
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    AddListener(eventType, fn) {
        throw (new Error('Events are not supported on Google Cluster Layers. You can still add events to individual markers.'));
    }
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    AddEntity(entity) {
        /** @type {?} */
        let isMarker = entity instanceof Marker;
        isMarker = entity instanceof GoogleMarker || isMarker;
        if (isMarker) {
            entity.NativePrimitve.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering && this._visible) {
                this._layer.addMarker(entity.NativePrimitve);
                this._markers.push(entity);
            }
            else {
                this._pendingMarkers.push(entity);
            }
            this._markerLookup.set(entity.NativePrimitve, entity);
        }
        if (isMarker) {
            if (entity.IsLast) {
                this.StartClustering();
            }
        }
    }
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    AddEntities(entities) {
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            /** @type {?} */
            const e = entities.map(p => {
                this._markerLookup.set(p.NativePrimitve, p);
                p.NativePrimitve.setMap(null);
                // remove the marker from the map as the clusterer will control marker visibility.
                return p.NativePrimitve;
            });
            if (this._isClustering && this._visible) {
                this._layer.addMarkers(e);
                this._markers.push(...entities);
            }
            else {
                // if layer is not visible, always add to pendingMarkers. Setting the layer to visible later
                // will render the markers appropriately
                this._pendingMarkers.push(...entities);
            }
        }
    }
    /**
     * Deletes the clustering layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    Delete() {
        this._layer.getMarkers().forEach(m => {
            m.setMap(null);
            // remove the marker from the map as the clusterer will control marker visibility.
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
    }
    /**
     * Returns the abstract marker used to wrap the Google Marker.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    GetMarkerFromGoogleMarker(pin) {
        /** @type {?} */
        const m = this._markerLookup.get(pin);
        return m;
    }
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    GetOptions() {
        /** @type {?} */
        const options = {
            id: 0,
            gridSize: this._layer.getGridSize(),
            clusteringEnabled: this._layer.getGridSize() === 0,
            maxZoom: this._layer.getMaxZoom(),
            minimumClusterSize: this._layer.getMinClusterSize(),
            placementMode: this._layer.isAverageCenter() ? ClusterPlacementMode.MeanValue : ClusterPlacementMode.FirstPin,
            visible: this._visible,
            zoomOnClick: this._layer.isZoomOnClick(),
            styles: this._layer.getStyles()
        };
        return options;
    }
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    GetVisible() {
        return this._visible;
    }
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entity Marker Entity to be removed from the layer.
     *
     * @return {?}
     */
    RemoveEntity(entity) {
        if (entity.NativePrimitve && entity.Location) {
            /** @type {?} */
            const j = this._markers.indexOf(entity);
            /** @type {?} */
            const k = this._pendingMarkers.indexOf(entity);
            if (j > -1) {
                this._markers.splice(j, 1);
            }
            if (k > -1) {
                this._pendingMarkers.splice(k, 1);
            }
            if (this._isClustering) {
                this._layer.removeMarker(entity.NativePrimitve);
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    }
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    SetEntities(entities) {
        this._layer.getMarkers().forEach(m => {
            m.setMap(null);
        });
        this._layer.clearMarkers();
        this._markers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        /** @type {?} */
        const p = new Array();
        entities.forEach((e) => {
            if (e.NativePrimitve && e.Location) {
                e.NativePrimitve.setMap(null);
                this._markerLookup.set(e.NativePrimitve, e);
                if (this._visible) {
                    this._markers.push(e);
                    p.push(e.NativePrimitve);
                }
                else {
                    this._pendingMarkers.push(e);
                }
            }
        });
        this._layer.addMarkers(p);
    }
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof GoogleMarkerClusterer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    SetOptions(options) {
        if (options.placementMode != null) {
            throw (new Error('GoogleMarkerClusterer: PlacementMode option cannot be set after initial creation.'));
        }
        if (options.zoomOnClick != null) {
            throw (new Error('GoogleMarkerClusterer: ZoomOnClick option cannot be set after initial creation.'));
        }
        if (options.callback != null) { }
        if (options.clusteringEnabled != null) {
            this._layer.setMinClusterSize(options.clusteringEnabled ? 1 : 10000000);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.gridSize != null && (options.clusteringEnabled == null || options.clusteringEnabled)) {
            this._layer.setGridSize(options.gridSize);
            this._layer.resetViewport();
            this._layer.redraw();
        }
        if (options.maxZoom != null) {
            this._layer.setMaxZoom(options.maxZoom);
        }
        if (options.minimumClusterSize != null) {
            this._layer.setMinClusterSize(options.minimumClusterSize);
        }
        if (options.styles != null) {
            this._layer.setStyles(options.styles);
        }
        if (options.visible != null) {
            this.SetVisible(options.visible);
        }
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
        /** @type {?} */
        const map = visible ? this._layer.getMap() : null;
        if (!visible) {
            this._layer.resetViewport(true);
        }
        else {
            /** @type {?} */
            const p = new Array();
            if (this._pendingMarkers.length > 0) {
                this._pendingMarkers.forEach(e => {
                    if (e.NativePrimitve && e.Location) {
                        p.push(/** @type {?} */ (e.NativePrimitve));
                    }
                });
                this._layer.addMarkers(p);
                this._markers = this._markers.concat(this._pendingMarkers.splice(0));
            }
            else {
                this._layer.redraw();
            }
        }
        this._visible = visible;
    }
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     */
    StartClustering() {
        if (this._isClustering) {
            return;
        }
        if (this._visible) {
            /** @type {?} */
            const p = new Array();
            this._markers.forEach(e => {
                if (e.NativePrimitve && e.Location) {
                    p.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._pendingMarkers.forEach(e => {
                if (e.NativePrimitve && e.Location) {
                    p.push(/** @type {?} */ (e.NativePrimitve));
                }
            });
            this._layer.addMarkers(p);
            this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        }
        if (!this._visible) {
            // only add the markers if the layer is visible. Otherwise, keep them pending. They would be added once the
            // layer is set to visible.
            timer(0).subscribe(() => {
                this._layer.resetViewport(true);
            });
        }
        this._isClustering = true;
    }
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof GoogleMarkerClusterer
     * @return {?}
     *
     */
    StopClustering() {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    }
}
if (false) {
    /** @type {?} */
    GoogleMarkerClusterer.prototype._isClustering;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markerLookup;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._markers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._pendingMarkers;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._mapclicks;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._currentZoom;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._visible;
    /** @type {?} */
    GoogleMarkerClusterer.prototype._layer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcmtlci1jbHVzdGVyZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2dvb2dsZS9nb29nbGUtbWFya2VyLWNsdXN0ZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBTzdCLE1BQU07Ozs7Ozs7SUF3Q0YsWUFBb0IsTUFBc0M7UUFBdEMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0M7NkJBbkNsQyxJQUFJOzZCQUNnQyxJQUFJLEdBQUcsRUFBaUM7d0JBQ2xFLElBQUksS0FBSyxFQUFVOytCQUNaLElBQUksS0FBSyxFQUFVOzBCQUMvQixDQUFDOzRCQUNDLENBQUM7d0JBQ0osSUFBSTtLQTZCK0I7Ozs7Ozs7O1FBaEJwRCxjQUFjO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7SUErQmhCLFdBQVcsQ0FBQyxTQUFpQixFQUFFLEVBQVk7UUFDOUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG9HQUFvRyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBWXJILFNBQVMsQ0FBQyxNQUFjOztRQUMzQixJQUFJLFFBQVEsR0FBWSxNQUFNLFlBQVksTUFBTSxDQUFDO1FBQ2pELFFBQVEsR0FBRyxNQUFNLFlBQVksWUFBWSxJQUFJLFFBQVEsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBRW5DLEVBQUUs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cG9ydCB7IEdvb2dsZU1hcmtlciB9IGZyb20gJy4vZ29vZ2xlLW1hcmtlcic7XG5pbXBvcnQgeyBJQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vbGF5ZXInO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbWFya2VyJztcbmltcG9ydCB7IEluZm9XaW5kb3cgfSBmcm9tICcuLi9pbmZvLXdpbmRvdyc7XG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL2NsdXN0ZXItcGxhY2VtZW50LW1vZGUnO1xuaW1wb3J0ICogYXMgR29vZ2xlTWFwVHlwZXMgZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlL2dvb2dsZS1tYXAtdHlwZXMnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBDb25jcmV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGNsdXN0ZXJpbmcgbGF5ZXIgZm9yIHRoZSBHb29nbGUgTWFwIFByb3ZpZGVyLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcmtlckNsdXN0ZXJlciBpbXBsZW1lbnRzIExheWVyIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9pc0NsdXN0ZXJpbmcgPSB0cnVlO1xuICAgIHByaXZhdGUgX21hcmtlckxvb2t1cDogTWFwPEdvb2dsZU1hcFR5cGVzLk1hcmtlciwgTWFya2VyPiA9IG5ldyBNYXA8R29vZ2xlTWFwVHlwZXMuTWFya2VyLCBNYXJrZXI+KCk7XG4gICAgcHJpdmF0ZSBfbWFya2VyczogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XG4gICAgcHJpdmF0ZSBfcGVuZGluZ01hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xuICAgIHByaXZhdGUgX21hcGNsaWNrczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jdXJyZW50Wm9vbTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuYXRpdmUgcHJpbWl0aXZlIHVuZGVybmVhdGggdGhlIGFic3RyYWN0aW9uIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgR29vZ2xlTWFya2VyQ2x1c3RlcmVyIGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9sYXllciBHb29nbGVNYXBUeXBlcy5NYXJrZXJDbHVzdGVyZXIuIE5hdGl2ZSBHb29nbGUgTWFwcyBNYXJrZXIgQ2x1c3RlcmVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sYXllcjogR29vZ2xlTWFwVHlwZXMuTWFya2VyQ2x1c3RlcmVyKSB7IH1cblxuXG4gICAgLy8vXG4gICAgLy8vIFB1YmxpYyBtZXRob2RzLCBMYXllciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cbiAgICAvLy9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFR5cGUgc3RyaW5nLiBUeXBlIG9mIGV2ZW50IHRvIGFkZCAoY2xpY2ssIG1vdXNlb3ZlciwgZXRjKS4gWW91IGNhbiB1c2UgYW55IGV2ZW50IHRoYXQgdGhlIHVuZGVybHlpbmcgbmF0aXZlXG4gICAgICogbGF5ZXIgc3VwcG9ydHMuXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uLiBIYW5kbGVyIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRMaXN0ZW5lcihldmVudFR5cGU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoJ0V2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBvbiBHb29nbGUgQ2x1c3RlciBMYXllcnMuIFlvdSBjYW4gc3RpbGwgYWRkIGV2ZW50cyB0byBpbmRpdmlkdWFsIG1hcmtlcnMuJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZW50aXR5IHRvIHRoZSBsYXllci4gVXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbiBhcyBpdCB3aWxsXG4gICAgICogdHJpZ2dlciBhIHJlY2FsdWF0aW9uIG9mIHRoZSBjbHVzdGVycyAoYW5kIGFzc29jaWF0ZWQgbWFya2VycyBpZiBhcHByb3ByaXRlKSBmb3JcbiAgICAgKiBlYWNoIGludm9jYXRpb24uIElmIHlvdSB1c2UgdGhpcyBtZXRob2QgdG8gYWRkIG1hbnkgbWFya2VycyB0byB0aGUgY2x1c3RlciwgdXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IE1hcmtlci4gRW50aXR5IHRvIGFkZCB0byB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIEFkZEVudGl0eShlbnRpdHk6IE1hcmtlcik6IHZvaWQge1xuICAgICAgICBsZXQgaXNNYXJrZXI6IGJvb2xlYW4gPSBlbnRpdHkgaW5zdGFuY2VvZiBNYXJrZXI7XG4gICAgICAgIGlzTWFya2VyID0gZW50aXR5IGluc3RhbmNlb2YgR29vZ2xlTWFya2VyIHx8IGlzTWFya2VyO1xuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcbiAgICAgICAgICAgIGVudGl0eS5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0ZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wQ2x1c3RlcmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRpdHkuTmF0aXZlUHJpbWl0dmUgJiYgZW50aXR5LkxvY2F0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbHVzdGVyaW5nICYmIHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXIoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlLCBlbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcmtlcikge1xuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0xhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0Q2x1c3RlcmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG51bWJlciBvZiBtYXJrZXJzIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBBZGRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPik6IHZvaWQge1xuICAgICAgICBpZiAoZW50aXRpZXMgIT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KGVudGl0aWVzKSAmJiBlbnRpdGllcy5sZW5ndGggIT09IDAgKSB7XG4gICAgICAgICAgICBjb25zdCBlOiBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ID0gZW50aXRpZXMubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQocC5OYXRpdmVQcmltaXR2ZSwgcCk7XG4gICAgICAgICAgICAgICAgcC5OYXRpdmVQcmltaXR2ZS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgbWFya2VyIGZyb20gdGhlIG1hcCBhcyB0aGUgY2x1c3RlcmVyIHdpbGwgY29udHJvbCBtYXJrZXIgdmlzaWJpbGl0eS5cbiAgICAgICAgICAgICAgICByZXR1cm4gcC5OYXRpdmVQcmltaXR2ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZyAmJiB0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuYWRkTWFya2VycyhlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goLi4uZW50aXRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgbGF5ZXIgaXMgbm90IHZpc2libGUsIGFsd2F5cyBhZGQgdG8gcGVuZGluZ01hcmtlcnMuIFNldHRpbmcgdGhlIGxheWVyIHRvIHZpc2libGUgbGF0ZXJcbiAgICAgICAgICAgICAgICAvLyB3aWxsIHJlbmRlciB0aGUgbWFya2VycyBhcHByb3ByaWF0ZWx5XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaCguLi5lbnRpdGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBjbHVzdGVyaW5nIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBEZWxldGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xheWVyLmdldE1hcmtlcnMoKS5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgbS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBtYXJrZXIgZnJvbSB0aGUgbWFwIGFzIHRoZSBjbHVzdGVyZXIgd2lsbCBjb250cm9sIG1hcmtlciB2aXNpYmlsaXR5LlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbGF5ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3QgbWFya2VyIHVzZWQgdG8gd3JhcCB0aGUgR29vZ2xlIE1hcmtlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE1hcmtlci4gVGhlIGFic3RyYWN0IG1hcmtlciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwdXNocGluLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRNYXJrZXJGcm9tR29vZ2xlTWFya2VyKHBpbjogR29vZ2xlTWFwVHlwZXMuTWFya2VyKTogTWFya2VyIHtcbiAgICAgICAgY29uc3QgbTogTWFya2VyID0gdGhpcy5fbWFya2VyTG9va3VwLmdldChwaW4pO1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgSUNsdXN0ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0T3B0aW9ucygpOiBJQ2x1c3Rlck9wdGlvbnMge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIGdyaWRTaXplOiB0aGlzLl9sYXllci5nZXRHcmlkU2l6ZSgpLFxuICAgICAgICAgICAgY2x1c3RlcmluZ0VuYWJsZWQ6IHRoaXMuX2xheWVyLmdldEdyaWRTaXplKCkgPT09IDAsXG4gICAgICAgICAgICBtYXhab29tOiB0aGlzLl9sYXllci5nZXRNYXhab29tKCksXG4gICAgICAgICAgICBtaW5pbXVtQ2x1c3RlclNpemU6IHRoaXMuX2xheWVyLmdldE1pbkNsdXN0ZXJTaXplKCksXG4gICAgICAgICAgICBwbGFjZW1lbnRNb2RlOiB0aGlzLl9sYXllci5pc0F2ZXJhZ2VDZW50ZXIoKSA/IENsdXN0ZXJQbGFjZW1lbnRNb2RlLk1lYW5WYWx1ZSA6IENsdXN0ZXJQbGFjZW1lbnRNb2RlLkZpcnN0UGluLFxuICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5fdmlzaWJsZSxcbiAgICAgICAgICAgIHpvb21PbkNsaWNrOiB0aGlzLl9sYXllci5pc1pvb21PbkNsaWNrKCksXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuX2xheWVyLmdldFN0eWxlcygpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQm9vbGVhbi4gVHJ1ZSBpcyB0aGUgbGF5ZXIgaXMgdmlzaWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIgRW50aXR5IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgR29vZ2xlTWFya2VyQ2x1c3RlcmVyXG4gICAgICovXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcik6IHZvaWQge1xuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fbWFya2Vycy5pbmRleE9mKGVudGl0eSk7XG4gICAgICAgICAgICBjb25zdCBrOiBudW1iZXIgPSB0aGlzLl9wZW5kaW5nTWFya2Vycy5pbmRleE9mKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoaiA+IC0xKSB7IHRoaXMuX21hcmtlcnMuc3BsaWNlKGosIDEpOyB9XG4gICAgICAgICAgICBpZiAoayA+IC0xKSB7IHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZShrLCAxKTsgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlbW92ZU1hcmtlcihlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmRlbGV0ZShlbnRpdHkuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZW50aXRpZXMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0aWVzIEFycmF5PE1hcmtlcj4gY29udGFpbmluZ1xuICAgICAqIHRoZSBlbnRpdGllcyB0byBhZGQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgcmVwbGFjZXMgYW55IGV4aXN0aW5nIGVudGl0aWVzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPik6IHZvaWQge1xuICAgICAgICB0aGlzLl9sYXllci5nZXRNYXJrZXJzKCkuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgIG0uc2V0TWFwKG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbGF5ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgIHRoaXMuX21hcmtlcnMuc3BsaWNlKDApO1xuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5jbGVhcigpO1xuXG4gICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPigpO1xuICAgICAgICBlbnRpdGllcy5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICBlLk5hdGl2ZVByaW1pdHZlLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KGUuTmF0aXZlUHJpbWl0dmUsIGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKGUuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIGxheWVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRPcHRpb25zKG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAob3B0aW9ucy5wbGFjZW1lbnRNb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcignR29vZ2xlTWFya2VyQ2x1c3RlcmVyOiBQbGFjZW1lbnRNb2RlIG9wdGlvbiBjYW5ub3QgYmUgc2V0IGFmdGVyIGluaXRpYWwgY3JlYXRpb24uJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnpvb21PbkNsaWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93KG5ldyBFcnJvcignR29vZ2xlTWFya2VyQ2x1c3RlcmVyOiBab29tT25DbGljayBvcHRpb24gY2Fubm90IGJlIHNldCBhZnRlciBpbml0aWFsIGNyZWF0aW9uLicpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjayAhPSBudWxsKSB7fVxuICAgICAgICBpZiAob3B0aW9ucy5jbHVzdGVyaW5nRW5hYmxlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRNaW5DbHVzdGVyU2l6ZShvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkID8gMSA6IDEwMDAwMDAwKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlc2V0Vmlld3BvcnQoKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmdyaWRTaXplICE9IG51bGwgJiYgKG9wdGlvbnMuY2x1c3RlcmluZ0VuYWJsZWQgPT0gbnVsbCB8fCBvcHRpb25zLmNsdXN0ZXJpbmdFbmFibGVkKSkge1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXIuc2V0R3JpZFNpemUob3B0aW9ucy5ncmlkU2l6ZSk7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5tYXhab29tICE9IG51bGwpIHsgdGhpcy5fbGF5ZXIuc2V0TWF4Wm9vbShvcHRpb25zLm1heFpvb20pOyB9XG4gICAgICAgIGlmIChvcHRpb25zLm1pbmltdW1DbHVzdGVyU2l6ZSAhPSBudWxsKSB7IHRoaXMuX2xheWVyLnNldE1pbkNsdXN0ZXJTaXplKG9wdGlvbnMubWluaW11bUNsdXN0ZXJTaXplKTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5zdHlsZXMgIT0gbnVsbCkgeyB0aGlzLl9sYXllci5zZXRTdHlsZXMob3B0aW9ucy5zdHlsZXMpOyB9XG4gICAgICAgIGlmIChvcHRpb25zLnZpc2libGUgIT0gbnVsbCkgeyB0aGlzLlNldFZpc2libGUob3B0aW9ucy52aXNpYmxlKTsgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBHb29nbGVNYXJrZXJDbHVzdGVyZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hcDogR29vZ2xlTWFwVHlwZXMuR29vZ2xlTWFwID0gdmlzaWJsZSA/IHRoaXMuX2xheWVyLmdldE1hcCgpIDogbnVsbDtcbiAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5yZXNldFZpZXdwb3J0KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcDogQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPiA9IG5ldyBBcnJheTxHb29nbGVNYXBUeXBlcy5NYXJrZXI+KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcGVuZGluZ01hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAucHVzaCg8R29vZ2xlTWFwVHlwZXMuTWFya2VyPmUuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuYWRkTWFya2VycyhwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzID0gdGhpcy5fbWFya2Vycy5jb25jYXQodGhpcy5fcGVuZGluZ01hcmtlcnMuc3BsaWNlKDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXNpYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHRvIGFjdHVhbGx5IGNsdXN0ZXIgdGhlIGVudGl0aWVzIGluIGEgY2x1c3RlciBsYXllci4gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciB0aGUgaW5pdGlhbCBzZXQgb2YgZW50aXRpZXNcbiAgICAgKiBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNsdXN0ZXIuIFRoaXMgbWV0aG9kIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgYXMgYWRkaW5nIGFuIGVudGl0aXkgd2lsbCByZWNhbGN1bGF0ZSBhbGwgY2x1c3RlcnMuXG4gICAgICogQXMgc3VjaCwgU3RvcENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgYWRkaW5nIG1hbnkgZW50aXRpZXMgYW5kIFN0YXJ0Q2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIG9uY2UgYWRkaW5nIGlzXG4gICAgICogY29tcGxldGUgdG8gcmVjYWxjdWxhdGUgdGhlIGNsdXN0ZXJzLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBTdGFydENsdXN0ZXJpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PEdvb2dsZU1hcFR5cGVzLk1hcmtlcj4gPSBuZXcgQXJyYXk8R29vZ2xlTWFwVHlwZXMuTWFya2VyPigpO1xuICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKDxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ZS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKDxHb29nbGVNYXBUeXBlcy5NYXJrZXI+ZS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5hZGRNYXJrZXJzKHApO1xuICAgICAgICAgICAgdGhpcy5fbWFya2VycyA9IHRoaXMuX21hcmtlcnMuY29uY2F0KHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX3Zpc2libGUpIHtcbiAgICAgICAgICAgIC8vIG9ubHkgYWRkIHRoZSBtYXJrZXJzIGlmIHRoZSBsYXllciBpcyB2aXNpYmxlLiBPdGhlcndpc2UsIGtlZXAgdGhlbSBwZW5kaW5nLiBUaGV5IHdvdWxkIGJlIGFkZGVkIG9uY2UgdGhlXG4gICAgICAgICAgICAvLyBsYXllciBpcyBzZXQgdG8gdmlzaWJsZS5cbiAgICAgICAgICAgIHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIucmVzZXRWaWV3cG9ydCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEdvb2dsZU1hcmtlckNsdXN0ZXJlclxuICAgICAqL1xuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==