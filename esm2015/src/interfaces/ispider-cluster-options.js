/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ISpiderClusterOptions() { }
/**
 * Minimium number of pushpins in cluster before switching from circle to spiral spider layout.
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.circleSpiralSwitchover;
/**
 * When true (default), any view or map change will collapse an expanded cluster. When false, clusters collapse only
 * on click on the cluster or opening another cluster.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.collapseClusterOnMapChange;
/**
 * When 1 or less (default) exploded spider clusters are collapsed on the first click outside the cluster.
 * Otherwise, the number of clicks necessary is controlled by this property. This is useful when dealing
 * with info boxes or other interactive map behavior where you might want to hid the info box on the first
 * click and the cluster on the second.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.collapseClusterOnNthClick;
/**
 * When true, invokes the click hander (if it exists) on the underlying markers on hover when
 * exploded into a spider. This is useful for info boxes, as infoboxes might cover up some
 * markers clicking outside the marker will collapse the spider.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.invokeClickOnHover;
/**
 * A callback function that is fired when an individual pin is clicked.
 * If the pin is part of a cluster, the cluster will also be returned in the callback.
 *
 * \@param marker Marker. The marker that was selected.
 * \@param clusterMarker Marker. The cluster marker that was exploded into a spider.
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.markerSelected;
/**
 * A callback that is fired when a pin is unselected or a spider cluster is collapsed.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.markerUnSelected;
/**
 * The minium pixel distance between pushpins and the cluster, when rendering spider layout as a circle.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.minCircleLength;
/**
 * The minium angle between pushpins in the spiral.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.minSpiralAngleSeperation;
/**
 * A factor that is used to grow the pixel distance of each pushpin from the center in the spiral.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.spiralDistanceFactor;
/**
 * Style of the stick connecting the pins to cluster.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.stickStyle;
/**
 * Style of the sticks when a pin is hovered.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.stickHoverStyle;
/**
 * A boolean indicating if the cluster layer is visible or not.
 *
 * \@memberof ISpiderClusterOptions
 * @type {?|undefined}
 */
ISpiderClusterOptions.prototype.visible;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNwaWRlci1jbHVzdGVyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvaW50ZXJmYWNlcy9pc3BpZGVyLWNsdXN0ZXItb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxpbmVPcHRpb25zIH0gZnJvbSAnLi9pbGluZS1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4uL21vZGVscy9tYXJrZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTcGlkZXJDbHVzdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogTWluaW1pdW0gbnVtYmVyIG9mIHB1c2hwaW5zIGluIGNsdXN0ZXIgYmVmb3JlIHN3aXRjaGluZyBmcm9tIGNpcmNsZSB0byBzcGlyYWwgc3BpZGVyIGxheW91dC5cbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXG4gICAgICovXG4gICAgY2lyY2xlU3BpcmFsU3dpdGNob3Zlcj86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSAoZGVmYXVsdCksIGFueSB2aWV3IG9yIG1hcCBjaGFuZ2Ugd2lsbCBjb2xsYXBzZSBhbiBleHBhbmRlZCBjbHVzdGVyLiBXaGVuIGZhbHNlLCBjbHVzdGVycyBjb2xsYXBzZSBvbmx5XG4gICAgICogb24gY2xpY2sgb24gdGhlIGNsdXN0ZXIgb3Igb3BlbmluZyBhbm90aGVyIGNsdXN0ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXG4gICAgICovXG4gICAgY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2U/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiAxIG9yIGxlc3MgKGRlZmF1bHQpIGV4cGxvZGVkIHNwaWRlciBjbHVzdGVycyBhcmUgY29sbGFwc2VkIG9uIHRoZSBmaXJzdCBjbGljayBvdXRzaWRlIHRoZSBjbHVzdGVyLlxuICAgICAqIE90aGVyd2lzZSwgdGhlIG51bWJlciBvZiBjbGlja3MgbmVjZXNzYXJ5IGlzIGNvbnRyb2xsZWQgYnkgdGhpcyBwcm9wZXJ0eS4gVGhpcyBpcyB1c2VmdWwgd2hlbiBkZWFsaW5nXG4gICAgICogd2l0aCBpbmZvIGJveGVzIG9yIG90aGVyIGludGVyYWN0aXZlIG1hcCBiZWhhdmlvciB3aGVyZSB5b3UgbWlnaHQgd2FudCB0byBoaWQgdGhlIGluZm8gYm94IG9uIHRoZSBmaXJzdFxuICAgICAqIGNsaWNrIGFuZCB0aGUgY2x1c3RlciBvbiB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xuICAgICAqL1xuICAgIGNvbGxhcHNlQ2x1c3Rlck9uTnRoQ2xpY2s/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIGludm9rZXMgdGhlIGNsaWNrIGhhbmRlciAoaWYgaXQgZXhpc3RzKSBvbiB0aGUgdW5kZXJseWluZyBtYXJrZXJzIG9uIGhvdmVyIHdoZW5cbiAgICAgKiBleHBsb2RlZCBpbnRvIGEgc3BpZGVyLiBUaGlzIGlzIHVzZWZ1bCBmb3IgaW5mbyBib3hlcywgYXMgaW5mb2JveGVzIG1pZ2h0IGNvdmVyIHVwIHNvbWVcbiAgICAgKiBtYXJrZXJzIGNsaWNraW5nIG91dHNpZGUgdGhlIG1hcmtlciB3aWxsIGNvbGxhcHNlIHRoZSBzcGlkZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXG4gICAgICovXG4gICAgaW52b2tlQ2xpY2tPbkhvdmVyPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBmaXJlZCB3aGVuIGFuIGluZGl2aWR1YWwgcGluIGlzIGNsaWNrZWQuXG4gICAgICogSWYgdGhlIHBpbiBpcyBwYXJ0IG9mIGEgY2x1c3RlciwgdGhlIGNsdXN0ZXIgd2lsbCBhbHNvIGJlIHJldHVybmVkIGluIHRoZSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtYXJrZXIgTWFya2VyLiBUaGUgbWFya2VyIHRoYXQgd2FzIHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSBjbHVzdGVyTWFya2VyIE1hcmtlci4gVGhlIGNsdXN0ZXIgbWFya2VyIHRoYXQgd2FzIGV4cGxvZGVkIGludG8gYSBzcGlkZXIuXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xuICAgICAqL1xuICAgIG1hcmtlclNlbGVjdGVkPzogKG1hcmtlcjogTWFya2VyLCBjbHVzdGVyTWFya2VyOiBNYXJrZXIpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIHRoYXQgaXMgZmlyZWQgd2hlbiBhIHBpbiBpcyB1bnNlbGVjdGVkIG9yIGEgc3BpZGVyIGNsdXN0ZXIgaXMgY29sbGFwc2VkLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xuICAgICAqL1xuICAgIG1hcmtlclVuU2VsZWN0ZWQ/OiAoKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1pbml1bSBwaXhlbCBkaXN0YW5jZSBiZXR3ZWVuIHB1c2hwaW5zIGFuZCB0aGUgY2x1c3Rlciwgd2hlbiByZW5kZXJpbmcgc3BpZGVyIGxheW91dCBhcyBhIGNpcmNsZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcbiAgICAgKi9cbiAgICBtaW5DaXJjbGVMZW5ndGg/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWluaXVtIGFuZ2xlIGJldHdlZW4gcHVzaHBpbnMgaW4gdGhlIHNwaXJhbC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcbiAgICAgKi9cbiAgICBtaW5TcGlyYWxBbmdsZVNlcGVyYXRpb24/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBBIGZhY3RvciB0aGF0IGlzIHVzZWQgdG8gZ3JvdyB0aGUgcGl4ZWwgZGlzdGFuY2Ugb2YgZWFjaCBwdXNocGluIGZyb20gdGhlIGNlbnRlciBpbiB0aGUgc3BpcmFsLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIElTcGlkZXJDbHVzdGVyT3B0aW9uc1xuICAgICAqL1xuICAgIHNwaXJhbERpc3RhbmNlRmFjdG9yPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3R5bGUgb2YgdGhlIHN0aWNrIGNvbm5lY3RpbmcgdGhlIHBpbnMgdG8gY2x1c3Rlci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJU3BpZGVyQ2x1c3Rlck9wdGlvbnNcbiAgICAgKi9cbiAgICBzdGlja1N0eWxlPzogSUxpbmVPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogU3R5bGUgb2YgdGhlIHN0aWNrcyB3aGVuIGEgcGluIGlzIGhvdmVyZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXG4gICAgICovXG4gICAgc3RpY2tIb3ZlclN0eWxlPzogSUxpbmVPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIGNsdXN0ZXIgbGF5ZXIgaXMgdmlzaWJsZSBvciBub3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgSVNwaWRlckNsdXN0ZXJPcHRpb25zXG4gICAgICovXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XG59XG4iXX0=