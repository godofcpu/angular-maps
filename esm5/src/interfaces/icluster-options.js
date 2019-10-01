/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * This interfaces defined options governing clustering layers.
 *
 * @export
 * @record
 */
export function IClusterOptions() { }
/**
 * A callback function that is fired after the clustering for a map view has completed.
 * This is useful if you want to generate a list of locations based on what is in the current view.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.callback;
/**
 * Icon information for custom marker icons in the clusters
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.clusterIconInfo;
/**
 * The url of the cluster image
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.imagePath;
/**
 * The file extension of the cluster image
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.imageExtension;
/**
 * A callback function that allows you to process a clustered pushpin before it is added to a layer.
 * This is useful if you want to add events or set style options on the clustered pushpin.
 * @type {?|undefined}
 */
IClusterOptions.prototype.clusteredPinCallback;
/**
 * Indicates if the layer should cluster the locations or not. Default: true
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.clusteringEnabled;
/**
 * The width and height of the gird cells used for clustering in pixels. Default: 45
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.gridSize;
/**
 * Offsets the placement of clustered pushpins by a set number of pixels.
 * This option is only available when the placement type is set to GridCenter.
 * This is useful if you have multiple cluster layers on the map and you want to
 * offset the clustered pushpins between the layers so that they are visible,
 * otherwise the clusters from the different layers would overlap completely.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.layerOffset;
/**
 * Maximum zoom level for the cluster
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.maxZoom;
/**
 * The minimum number of pins required to form a cluster
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.minimumClusterSize;
/**
 * Determines the cluster placement mode
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.placementMode;
/**
 * Options governing the spider cluster behavior if active.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.spiderClusterOptions;
/**
 * Cluster image styles
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.styles;
/**
 * A boolean indicating if the layer is visible or not.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.visible;
/**
 * The z-index of the layer.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.zIndex;
/**
 * Whether to zoom in on click.
 *
 * \@memberof IClusterOptions
 * @type {?|undefined}
 */
IClusterOptions.prototype.zoomOnClick;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNsdXN0ZXItb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9pbnRlcmZhY2VzL2ljbHVzdGVyLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbHVzdGVySWNvbkluZm8gfSBmcm9tICcuL2ljbHVzdGVyLWljb24taW5mbyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuL2lwb2ludCc7XG5pbXBvcnQgeyBJTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9pbGF5ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJTWFya2VySWNvbkluZm8gfSBmcm9tICcuL2ltYXJrZXItaWNvbi1pbmZvJztcbmltcG9ydCB7IElTcGlkZXJDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4vaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2VyIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlcic7XG5pbXBvcnQgeyBDbHVzdGVyUGxhY2VtZW50TW9kZSB9IGZyb20gJy4uL21vZGVscy9jbHVzdGVyLXBsYWNlbWVudC1tb2RlJztcblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZXMgZGVmaW5lZCBvcHRpb25zIGdvdmVybmluZyBjbHVzdGVyaW5nIGxheWVycy5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNsdXN0ZXJPcHRpb25zIGV4dGVuZHMgSUxheWVyT3B0aW9ucyB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBmaXJlZCBhZnRlciB0aGUgY2x1c3RlcmluZyBmb3IgYSBtYXAgdmlldyBoYXMgY29tcGxldGVkLlxuICAgICAgICAgKiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0byBnZW5lcmF0ZSBhIGxpc3Qgb2YgbG9jYXRpb25zIGJhc2VkIG9uIHdoYXQgaXMgaW4gdGhlIGN1cnJlbnQgdmlldy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJY29uIGluZm9ybWF0aW9uIGZvciBjdXN0b20gbWFya2VyIGljb25zIGluIHRoZSBjbHVzdGVyc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBjbHVzdGVySWNvbkluZm8/OiBJTWFya2VySWNvbkluZm87XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB1cmwgb2YgdGhlIGNsdXN0ZXIgaW1hZ2VcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VQYXRoPzogc3RyaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsZSBleHRlbnNpb24gb2YgdGhlIGNsdXN0ZXIgaW1hZ2VcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VFeHRlbnNpb24/OiBzdHJpbmc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBhbGxvd3MgeW91IHRvIHByb2Nlc3MgYSBjbHVzdGVyZWQgcHVzaHBpbiBiZWZvcmUgaXQgaXMgYWRkZWQgdG8gYSBsYXllci5cbiAgICAgICAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gYWRkIGV2ZW50cyBvciBzZXQgc3R5bGUgb3B0aW9ucyBvbiB0aGUgY2x1c3RlcmVkIHB1c2hwaW4uXG4gICAgICAgICAqL1xuICAgICAgICBjbHVzdGVyZWRQaW5DYWxsYmFjaz86IChtYXJrZXI6IGFueSkgPT4gdm9pZDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSBsYXllciBzaG91bGQgY2x1c3RlciB0aGUgbG9jYXRpb25zIG9yIG5vdC4gRGVmYXVsdDogdHJ1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBjbHVzdGVyaW5nRW5hYmxlZD86IGJvb2xlYW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBnaXJkIGNlbGxzIHVzZWQgZm9yIGNsdXN0ZXJpbmcgaW4gcGl4ZWxzLiBEZWZhdWx0OiA0NVxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBncmlkU2l6ZT86IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT2Zmc2V0cyB0aGUgcGxhY2VtZW50IG9mIGNsdXN0ZXJlZCBwdXNocGlucyBieSBhIHNldCBudW1iZXIgb2YgcGl4ZWxzLlxuICAgICAgICAgKiBUaGlzIG9wdGlvbiBpcyBvbmx5IGF2YWlsYWJsZSB3aGVuIHRoZSBwbGFjZW1lbnQgdHlwZSBpcyBzZXQgdG8gR3JpZENlbnRlci5cbiAgICAgICAgICogVGhpcyBpcyB1c2VmdWwgaWYgeW91IGhhdmUgbXVsdGlwbGUgY2x1c3RlciBsYXllcnMgb24gdGhlIG1hcCBhbmQgeW91IHdhbnQgdG9cbiAgICAgICAgICogb2Zmc2V0IHRoZSBjbHVzdGVyZWQgcHVzaHBpbnMgYmV0d2VlbiB0aGUgbGF5ZXJzIHNvIHRoYXQgdGhleSBhcmUgdmlzaWJsZSxcbiAgICAgICAgICogb3RoZXJ3aXNlIHRoZSBjbHVzdGVycyBmcm9tIHRoZSBkaWZmZXJlbnQgbGF5ZXJzIHdvdWxkIG92ZXJsYXAgY29tcGxldGVseS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgbGF5ZXJPZmZzZXQ/OiBJUG9pbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1heGltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGNsdXN0ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4Wm9vbT86IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1pbmltdW0gbnVtYmVyIG9mIHBpbnMgcmVxdWlyZWQgdG8gZm9ybSBhIGNsdXN0ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgbWluaW11bUNsdXN0ZXJTaXplPzogbnVtYmVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlcm1pbmVzIHRoZSBjbHVzdGVyIHBsYWNlbWVudCBtb2RlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHBsYWNlbWVudE1vZGU/OiBDbHVzdGVyUGxhY2VtZW50TW9kZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3B0aW9ucyBnb3Zlcm5pbmcgdGhlIHNwaWRlciBjbHVzdGVyIGJlaGF2aW9yIGlmIGFjdGl2ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1lbWJlcm9mIElDbHVzdGVyT3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgc3BpZGVyQ2x1c3Rlck9wdGlvbnM/OiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsdXN0ZXIgaW1hZ2Ugc3R5bGVzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHN0eWxlcz86IEFycmF5PElDbHVzdGVySWNvbkluZm8+O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgbGF5ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHZpc2libGU/OiBib29sZWFuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZW1iZXJvZiBJQ2x1c3Rlck9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHpJbmRleD86IG51bWJlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byB6b29tIGluIG9uIGNsaWNrLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWVtYmVyb2YgSUNsdXN0ZXJPcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICB6b29tT25DbGljaz86IGJvb2xlYW47XG5cbn1cbiJdfQ==