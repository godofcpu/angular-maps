/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
* The following are TypeScript definitions for the custom map styles JSON object which can be used witht he Bing Maps V8 SDK.
*/
/**
 * Defines a custom map style.
 * @record
 */
export function ICustomMapStyle() { }
/**
 * A list of map elements to be styled.
 * @type {?}
 */
ICustomMapStyle.prototype.elements;
/**
 * Global Settings.
 * @type {?|undefined}
 */
ICustomMapStyle.prototype.settings;
/**
 * The version of the style syntax used.
 * @type {?|undefined}
 */
ICustomMapStyle.prototype.version;
/**
 * Map Elements which can be styled.
 * @record
 */
export function IMapElements() { }
/**
 * Admin1, state, province, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.adminDistrict;
/**
 * Icon representing the capital of a state/province.
 * @type {?|undefined}
 */
IMapElements.prototype.adminDistrictCapital;
/**
 * Area of land encompassing an airport.
 * @type {?|undefined}
 */
IMapElements.prototype.airport;
/**
 * Area of land use, not to be confused with Structure
 * @type {?|undefined}
 */
IMapElements.prototype.area;
/**
 * An arterial road is a high-capacity urban road. Its primary function is to deliver traffic from collector roads to freeways or expressways, and between urban centers efficiently.
 * @type {?|undefined}
 */
IMapElements.prototype.arterialRoad;
/**
 * A structure such as a house, store, factory.
 * @type {?|undefined}
 */
IMapElements.prototype.building;
/**
 * Restaurant, hospital, school, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.business;
/**
 * Icon representing the capital populated place.
 * @type {?|undefined}
 */
IMapElements.prototype.capital;
/**
 * Area of a cemetery
 * @type {?|undefined}
 */
IMapElements.prototype.cemetery;
/**
 * Area of a whole continent
 * @type {?|undefined}
 */
IMapElements.prototype.continent;
/**
 * A controlled-access highway is a type of road which has been designed for high-speed vehicular traffic, with all traffic flow and ingress/egress regulated. Also known as a highway, freeway, motorway, expressway, interstate, parkway.
 * @type {?|undefined}
 */
IMapElements.prototype.controlledAccessHighway;
/**
 * A country or independent sovereign state.
 * @type {?|undefined}
 */
IMapElements.prototype.countryRegion;
/**
 * Icon representing the capital of a country/region.
 * @type {?|undefined}
 */
IMapElements.prototype.countryRegionCapital;
/**
 * Admin2, county, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.district;
/**
 * An area of land used for educational purposes such as a school campus.
 * @type {?|undefined}
 */
IMapElements.prototype.education;
/**
 * A school or other educational building.
 * @type {?|undefined}
 */
IMapElements.prototype.educationBuilding;
/**
 * Restaurant, caf�, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.foodPoint;
/**
 * Area of forest land.
 * @type {?|undefined}
 */
IMapElements.prototype.forest;
/**
 * An area of land where the game of golf is played.
 * @type {?|undefined}
 */
IMapElements.prototype.golfCourse;
/**
 * Lines representing ramps typically alongside ControlledAccessHighways
 * @type {?|undefined}
 */
IMapElements.prototype.highSpeedRamp;
/**
 * A highway.
 * @type {?|undefined}
 */
IMapElements.prototype.highway;
/**
 * An area of land reserved for Indigenous people.
 * @type {?|undefined}
 */
IMapElements.prototype.indigenousPeoplesReserve;
/**
 * Labeling of area of an island.
 * @type {?|undefined}
 */
IMapElements.prototype.island;
/**
 * Major roads.
 * @type {?|undefined}
 */
IMapElements.prototype.majorRoad;
/**
 * The base map element in which all other map elements inherit from.
 * @type {?|undefined}
 */
IMapElements.prototype.mapElement;
/**
 * Area of land used for medical purposes. Generally, hospital campuses.
 * @type {?|undefined}
 */
IMapElements.prototype.medical;
/**
 * A building which provides medical services.
 * @type {?|undefined}
 */
IMapElements.prototype.medicalBuilding;
/**
 * A military area.
 * @type {?|undefined}
 */
IMapElements.prototype.military;
/**
 * A natural point of interest.
 * @type {?|undefined}
 */
IMapElements.prototype.naturalPoint;
/**
 * Area of land used for nautical purposes.
 * @type {?|undefined}
 */
IMapElements.prototype.nautical;
/**
 * Area defined as a neighborhood. Labels only.
 * @type {?|undefined}
 */
IMapElements.prototype.neighborhood;
/**
 * Area of any kind of park.
 * @type {?|undefined}
 */
IMapElements.prototype.park;
/**
 * Icon representing the peak of a mountain.
 * @type {?|undefined}
 */
IMapElements.prototype.peak;
/**
 * Extracted pitches such as a baseball field or tennis court.
 * @type {?|undefined}
 */
IMapElements.prototype.playingField;
/**
 * All point features that are rendered with an icon of some sort
 * @type {?|undefined}
 */
IMapElements.prototype.point;
/**
 * Restaurant, hospital, school, marina, ski area, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.pointOfInterest;
/**
 * A political border.
 * @type {?|undefined}
 */
IMapElements.prototype.political;
/**
 * Icon representing size of populated place (city, town, etc).
 * @type {?|undefined}
 */
IMapElements.prototype.populatedPlace;
/**
 * Railway lines
 * @type {?|undefined}
 */
IMapElements.prototype.railway;
/**
 * Line representing the connecting entrance/exit to a highway.
 * @type {?|undefined}
 */
IMapElements.prototype.ramp;
/**
 * Area of nature reserve.
 * @type {?|undefined}
 */
IMapElements.prototype.reserve;
/**
 * River, stream, or other passage. Note that this may be a line or polygon and may connect to non-river water bodies.
 * @type {?|undefined}
 */
IMapElements.prototype.river;
/**
 * Lines that represent all roads
 * @type {?|undefined}
 */
IMapElements.prototype.road;
/**
 * Icon representing the exit, typically from a controlled access highway.
 * @type {?|undefined}
 */
IMapElements.prototype.roadExit;
/**
 * Land area covered by a runway. See also Airport for the land area of the whole airport.
 * @type {?|undefined}
 */
IMapElements.prototype.runway;
/**
 * Area generally used for beaches, but could be used for sandy areas/golf bunkers in the future.
 * @type {?|undefined}
 */
IMapElements.prototype.sand;
/**
 * A shopping center or mall.
 * @type {?|undefined}
 */
IMapElements.prototype.shoppingCenter;
/**
 * Area of a stadium.
 * @type {?|undefined}
 */
IMapElements.prototype.stadium;
/**
 * A street.
 * @type {?|undefined}
 */
IMapElements.prototype.street;
/**
 * Buildings and other building-like structures
 * @type {?|undefined}
 */
IMapElements.prototype.structure;
/**
 * A toll road.
 * @type {?|undefined}
 */
IMapElements.prototype.tollRoad;
/**
 * Walking trail, either through park or hiking trail
 * @type {?|undefined}
 */
IMapElements.prototype.trail;
/**
 * Icon representing a bus stop, train stop, airport, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.transit;
/**
 * A transit building.
 * @type {?|undefined}
 */
IMapElements.prototype.transitBuilding;
/**
 * Lines that are part of the transportation network (roads, trains, ferries, etc)
 * @type {?|undefined}
 */
IMapElements.prototype.transportation;
/**
 * An unpaved street.
 * @type {?|undefined}
 */
IMapElements.prototype.unpavedStreet;
/**
 * Forests, grassy areas, etc.
 * @type {?|undefined}
 */
IMapElements.prototype.vegetation;
/**
 * Icon representing the peak of a volcano.
 * @type {?|undefined}
 */
IMapElements.prototype.volcanicPeak;
/**
 * Anything that looks like water
 * @type {?|undefined}
 */
IMapElements.prototype.water;
/**
 * Icon representing a water feature location such as a waterfall.
 * @type {?|undefined}
 */
IMapElements.prototype.waterPoint;
/**
 * Ferry route lines
 * @type {?|undefined}
 */
IMapElements.prototype.waterRoute;
/**
 * The styles options that can be applied to map elements.
 * @record
 */
export function IMapElementStyle() { }
/**
 * Hex color used for filling polygons, the background of point icons, and for the center of lines if they have split.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.fillColor;
/**
 * The hex color of a map label.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.labelColor;
/**
 * The outline hex color of a map label.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.labelOutlineColor;
/**
 * Species if a map label type is visible or not.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.labelVisible;
/**
 * Hex color used for the outline around polygons, the outline around point icons, and the color of lines.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.strokeColor;
/**
 * Specifies if the map element is visible or not.
 * @type {?|undefined}
 */
IMapElementStyle.prototype.visible;
/**
 * The style options that can be appliction to bordered map elements.
 * @record
 */
export function IBorderedMapElementStyle() { }
/**
 * Secondary/casing line hex color of the border of a filled polygon.
 * @type {?|undefined}
 */
IBorderedMapElementStyle.prototype.borderOutlineColor;
/**
 * Primary line hex color of the border of a filled polygon.
 * @type {?|undefined}
 */
IBorderedMapElementStyle.prototype.borderStrokeColor;
/**
 * Specifies if a border is visible or not.
 * @type {?|undefined}
 */
IBorderedMapElementStyle.prototype.borderVisible;
/**
 * Global style settings
 * @record
 */
export function ISettingStyle() { }
/**
 * A hex color value that all land is first flushed to before things are drawn on it.
 * @type {?|undefined}
 */
ISettingStyle.prototype.landColor;
/**
 * Specifies whether or not to draw elevation shading on the map.
 * @type {?|undefined}
 */
ISettingStyle.prototype.shadedReliefVisible;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1c3RvbS1tYXAtc3R5bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvaW50ZXJmYWNlcy9pY3VzdG9tLW1hcC1zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogVGhlIGZvbGxvd2luZyBhcmUgVHlwZVNjcmlwdCBkZWZpbml0aW9ucyBmb3IgdGhlIGN1c3RvbSBtYXAgc3R5bGVzIEpTT04gb2JqZWN0IHdoaWNoIGNhbiBiZSB1c2VkIHdpdGh0IGhlIEJpbmcgTWFwcyBWOCBTREsuXG4qL1xuXG4vKiogRGVmaW5lcyBhIGN1c3RvbSBtYXAgc3R5bGUuICovXG5leHBvcnQgaW50ZXJmYWNlIElDdXN0b21NYXBTdHlsZSB7XG4gICAgLyoqIEEgbGlzdCBvZiBtYXAgZWxlbWVudHMgdG8gYmUgc3R5bGVkLiAqL1xuICAgIGVsZW1lbnRzOiBJTWFwRWxlbWVudHMsXG5cbiAgICAvKiogR2xvYmFsIFNldHRpbmdzLiAqL1xuICAgIHNldHRpbmdzPzogSVNldHRpbmdTdHlsZSxcblxuICAgIC8qKiBUaGUgdmVyc2lvbiBvZiB0aGUgc3R5bGUgc3ludGF4IHVzZWQuICovXG4gICAgdmVyc2lvbj86IHN0cmluZ1xufVxuLyoqIE1hcCBFbGVtZW50cyB3aGljaCBjYW4gYmUgc3R5bGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWFwRWxlbWVudHMge1xuICAgIC8qKiBBZG1pbjEsIHN0YXRlLCBwcm92aW5jZSwgZXRjLiAqL1xuICAgIGFkbWluRGlzdHJpY3Q/OiBJQm9yZGVyZWRNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogSWNvbiByZXByZXNlbnRpbmcgdGhlIGNhcGl0YWwgb2YgYSBzdGF0ZS9wcm92aW5jZS4gKi9cbiAgICBhZG1pbkRpc3RyaWN0Q2FwaXRhbD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQXJlYSBvZiBsYW5kIGVuY29tcGFzc2luZyBhbiBhaXJwb3J0LiAqL1xuICAgIGFpcnBvcnQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgb2YgbGFuZCB1c2UsIG5vdCB0byBiZSBjb25mdXNlZCB3aXRoIFN0cnVjdHVyZSAqL1xuICAgIGFyZWE/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFuIGFydGVyaWFsIHJvYWQgaXMgYSBoaWdoLWNhcGFjaXR5IHVyYmFuIHJvYWQuIEl0cyBwcmltYXJ5IGZ1bmN0aW9uIGlzIHRvIGRlbGl2ZXIgdHJhZmZpYyBmcm9tIGNvbGxlY3RvciByb2FkcyB0byBmcmVld2F5cyBvciBleHByZXNzd2F5cywgYW5kIGJldHdlZW4gdXJiYW4gY2VudGVycyBlZmZpY2llbnRseS4gKi9cbiAgICBhcnRlcmlhbFJvYWQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEEgc3RydWN0dXJlIHN1Y2ggYXMgYSBob3VzZSwgc3RvcmUsIGZhY3RvcnkuICovXG4gICAgYnVpbGRpbmc/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIFJlc3RhdXJhbnQsIGhvc3BpdGFsLCBzY2hvb2wsIGV0Yy4gKi9cbiAgICBidXNpbmVzcz86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogSWNvbiByZXByZXNlbnRpbmcgdGhlIGNhcGl0YWwgcG9wdWxhdGVkIHBsYWNlLiAqL1xuICAgIGNhcGl0YWw/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgb2YgYSBjZW1ldGVyeSAqL1xuICAgIGNlbWV0ZXJ5PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBcmVhIG9mIGEgd2hvbGUgY29udGluZW50ICovXG4gICAgY29udGluZW50PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBIGNvbnRyb2xsZWQtYWNjZXNzIGhpZ2h3YXkgaXMgYSB0eXBlIG9mIHJvYWQgd2hpY2ggaGFzIGJlZW4gZGVzaWduZWQgZm9yIGhpZ2gtc3BlZWQgdmVoaWN1bGFyIHRyYWZmaWMsIHdpdGggYWxsIHRyYWZmaWMgZmxvdyBhbmQgaW5ncmVzcy9lZ3Jlc3MgcmVndWxhdGVkLiBBbHNvIGtub3duIGFzIGEgaGlnaHdheSwgZnJlZXdheSwgbW90b3J3YXksIGV4cHJlc3N3YXksIGludGVyc3RhdGUsIHBhcmt3YXkuICovXG4gICAgY29udHJvbGxlZEFjY2Vzc0hpZ2h3YXk/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEEgY291bnRyeSBvciBpbmRlcGVuZGVudCBzb3ZlcmVpZ24gc3RhdGUuICovXG4gICAgY291bnRyeVJlZ2lvbj86IElCb3JkZXJlZE1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBJY29uIHJlcHJlc2VudGluZyB0aGUgY2FwaXRhbCBvZiBhIGNvdW50cnkvcmVnaW9uLiAqL1xuICAgIGNvdW50cnlSZWdpb25DYXBpdGFsPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBZG1pbjIsIGNvdW50eSwgZXRjLiAqL1xuICAgIGRpc3RyaWN0PzogSUJvcmRlcmVkTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFuIGFyZWEgb2YgbGFuZCB1c2VkIGZvciBlZHVjYXRpb25hbCBwdXJwb3NlcyBzdWNoIGFzIGEgc2Nob29sIGNhbXB1cy4gKi9cbiAgICBlZHVjYXRpb24/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEEgc2Nob29sIG9yIG90aGVyIGVkdWNhdGlvbmFsIGJ1aWxkaW5nLiAqL1xuICAgIGVkdWNhdGlvbkJ1aWxkaW5nPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBSZXN0YXVyYW50LCBjYWbvv70sIGV0Yy4gKi9cbiAgICBmb29kUG9pbnQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgb2YgZm9yZXN0IGxhbmQuICovXG4gICAgZm9yZXN0PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBbiBhcmVhIG9mIGxhbmQgd2hlcmUgdGhlIGdhbWUgb2YgZ29sZiBpcyBwbGF5ZWQuICovXG4gICAgZ29sZkNvdXJzZT86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogTGluZXMgcmVwcmVzZW50aW5nIHJhbXBzIHR5cGljYWxseSBhbG9uZ3NpZGUgQ29udHJvbGxlZEFjY2Vzc0hpZ2h3YXlzICovXG4gICAgaGlnaFNwZWVkUmFtcD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSBoaWdod2F5LiAqL1xuICAgIGhpZ2h3YXk/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFuIGFyZWEgb2YgbGFuZCByZXNlcnZlZCBmb3IgSW5kaWdlbm91cyBwZW9wbGUuICovXG4gICAgaW5kaWdlbm91c1Blb3BsZXNSZXNlcnZlPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBMYWJlbGluZyBvZiBhcmVhIG9mIGFuIGlzbGFuZC4gICovXG4gICAgaXNsYW5kPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBNYWpvciByb2Fkcy4gKi9cbiAgICBtYWpvclJvYWQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIFRoZSBiYXNlIG1hcCBlbGVtZW50IGluIHdoaWNoIGFsbCBvdGhlciBtYXAgZWxlbWVudHMgaW5oZXJpdCBmcm9tLiAqL1xuICAgIG1hcEVsZW1lbnQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgb2YgbGFuZCB1c2VkIGZvciBtZWRpY2FsIHB1cnBvc2VzLiBHZW5lcmFsbHksIGhvc3BpdGFsIGNhbXB1c2VzLiAqL1xuICAgIG1lZGljYWw/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEEgYnVpbGRpbmcgd2hpY2ggcHJvdmlkZXMgbWVkaWNhbCBzZXJ2aWNlcy4gKi9cbiAgICBtZWRpY2FsQnVpbGRpbmdcdD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSBtaWxpdGFyeSBhcmVhLiAqL1xuICAgIG1pbGl0YXJ5PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBIG5hdHVyYWwgcG9pbnQgb2YgaW50ZXJlc3QuICovXG4gICAgbmF0dXJhbFBvaW50PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBcmVhIG9mIGxhbmQgdXNlZCBmb3IgbmF1dGljYWwgcHVycG9zZXMuICovXG4gICAgbmF1dGljYWw/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgZGVmaW5lZCBhcyBhIG5laWdoYm9yaG9vZC4gTGFiZWxzIG9ubHkuICovXG4gICAgbmVpZ2hib3Job29kPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBcmVhIG9mIGFueSBraW5kIG9mIHBhcmsuICovXG4gICAgcGFyaz86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogSWNvbiByZXByZXNlbnRpbmcgdGhlIHBlYWsgb2YgYSBtb3VudGFpbi4gKi9cbiAgICBwZWFrPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBFeHRyYWN0ZWQgcGl0Y2hlcyBzdWNoIGFzIGEgYmFzZWJhbGwgZmllbGQgb3IgdGVubmlzIGNvdXJ0LiAqL1xuICAgIHBsYXlpbmdGaWVsZD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQWxsIHBvaW50IGZlYXR1cmVzIHRoYXQgYXJlIHJlbmRlcmVkIHdpdGggYW4gaWNvbiBvZiBzb21lIHNvcnQgKi9cbiAgICBwb2ludD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogUmVzdGF1cmFudCwgaG9zcGl0YWwsIHNjaG9vbCwgbWFyaW5hLCBza2kgYXJlYSwgZXRjLiAqL1xuICAgIHBvaW50T2ZJbnRlcmVzdD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSBwb2xpdGljYWwgYm9yZGVyLiAqL1xuICAgIHBvbGl0aWNhbD86IElCb3JkZXJlZE1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBJY29uIHJlcHJlc2VudGluZyBzaXplIG9mIHBvcHVsYXRlZCBwbGFjZSAoY2l0eSwgdG93biwgZXRjKS4gKi9cbiAgICBwb3B1bGF0ZWRQbGFjZT86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogUmFpbHdheSBsaW5lcyAqL1xuICAgIHJhaWx3YXk/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIExpbmUgcmVwcmVzZW50aW5nIHRoZSBjb25uZWN0aW5nIGVudHJhbmNlL2V4aXQgdG8gYSBoaWdod2F5LiAqL1xuICAgIHJhbXA/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFyZWEgb2YgbmF0dXJlIHJlc2VydmUuICovXG4gICAgcmVzZXJ2ZT86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAgLyoqIFJpdmVyLCBzdHJlYW0sIG9yIG90aGVyIHBhc3NhZ2UuIE5vdGUgdGhhdCB0aGlzIG1heSBiZSBhIGxpbmUgb3IgcG9seWdvbiBhbmQgbWF5IGNvbm5lY3QgdG8gbm9uLXJpdmVyIHdhdGVyIGJvZGllcy4gKi9cbiAgICByaXZlcj86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogTGluZXMgdGhhdCByZXByZXNlbnQgYWxsIHJvYWRzICovXG4gICAgcm9hZD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogSWNvbiByZXByZXNlbnRpbmcgdGhlIGV4aXQsIHR5cGljYWxseSBmcm9tIGEgY29udHJvbGxlZCBhY2Nlc3MgaGlnaHdheS4gKi9cbiAgICByb2FkRXhpdD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogTGFuZCBhcmVhIGNvdmVyZWQgYnkgYSBydW53YXkuIFNlZSBhbHNvIEFpcnBvcnQgZm9yIHRoZSBsYW5kIGFyZWEgb2YgdGhlIHdob2xlIGFpcnBvcnQuICovXG4gICAgcnVud2F5PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBcmVhIGdlbmVyYWxseSB1c2VkIGZvciBiZWFjaGVzLCBidXQgY291bGQgYmUgdXNlZCBmb3Igc2FuZHkgYXJlYXMvZ29sZiBidW5rZXJzIGluIHRoZSBmdXR1cmUuICovXG4gICAgc2FuZD86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSBzaG9wcGluZyBjZW50ZXIgb3IgbWFsbC4gKi9cbiAgICBzaG9wcGluZ0NlbnRlcj86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQXJlYSBvZiBhIHN0YWRpdW0uICovXG4gICAgc3RhZGl1bT86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSBzdHJlZXQuICovXG4gICAgc3RyZWV0PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBCdWlsZGluZ3MgYW5kIG90aGVyIGJ1aWxkaW5nLWxpa2Ugc3RydWN0dXJlcyAqL1xuICAgIHN0cnVjdHVyZT86IElNYXBFbGVtZW50U3R5bGUsXG5cbiAgICAvKiogQSB0b2xsIHJvYWQuICovXG4gICAgdG9sbFJvYWQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIFdhbGtpbmcgdHJhaWwsIGVpdGhlciB0aHJvdWdoIHBhcmsgb3IgaGlraW5nIHRyYWlsICovXG4gICAgdHJhaWw/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEljb24gcmVwcmVzZW50aW5nIGEgYnVzIHN0b3AsIHRyYWluIHN0b3AsIGFpcnBvcnQsIGV0Yy4gKi9cbiAgICB0cmFuc2l0PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBBIHRyYW5zaXQgYnVpbGRpbmcuICovXG4gICAgdHJhbnNpdEJ1aWxkaW5nPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBMaW5lcyB0aGF0IGFyZSBwYXJ0IG9mIHRoZSB0cmFuc3BvcnRhdGlvbiBuZXR3b3JrIChyb2FkcywgdHJhaW5zLCBmZXJyaWVzLCBldGMpICovXG4gICAgdHJhbnNwb3J0YXRpb24/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFuIHVucGF2ZWQgc3RyZWV0LiAqL1xuICAgIHVucGF2ZWRTdHJlZXQ/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEZvcmVzdHMsIGdyYXNzeSBhcmVhcywgZXRjLiAqL1xuICAgIHZlZ2V0YXRpb24/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEljb24gcmVwcmVzZW50aW5nIHRoZSBwZWFrIG9mIGEgdm9sY2Fuby4gKi9cbiAgICB2b2xjYW5pY1BlYWs/OiBJTWFwRWxlbWVudFN0eWxlLFxuXG4gICAgLyoqIEFueXRoaW5nIHRoYXQgbG9va3MgbGlrZSB3YXRlciAqL1xuICAgIHdhdGVyPzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBJY29uIHJlcHJlc2VudGluZyBhIHdhdGVyIGZlYXR1cmUgbG9jYXRpb24gc3VjaCBhcyBhIHdhdGVyZmFsbC4gKi9cbiAgICB3YXRlclBvaW50PzogSU1hcEVsZW1lbnRTdHlsZSxcblxuICAgIC8qKiBGZXJyeSByb3V0ZSBsaW5lcyAqL1xuICAgIHdhdGVyUm91dGU/OiBJTWFwRWxlbWVudFN0eWxlXG59XG5cbi8qKiBUaGUgc3R5bGVzIG9wdGlvbnMgdGhhdCBjYW4gYmUgYXBwbGllZCB0byBtYXAgZWxlbWVudHMuICovXG5leHBvcnQgaW50ZXJmYWNlIElNYXBFbGVtZW50U3R5bGUge1xuICAgIC8qKiAgSGV4IGNvbG9yIHVzZWQgZm9yIGZpbGxpbmcgcG9seWdvbnMsIHRoZSBiYWNrZ3JvdW5kIG9mIHBvaW50IGljb25zLCBhbmQgZm9yIHRoZSBjZW50ZXIgb2YgbGluZXMgaWYgdGhleSBoYXZlIHNwbGl0LiAqL1xuICAgIGZpbGxDb2xvcj86IHN0cmluZyxcblxuICAgIC8qKiBUaGUgaGV4IGNvbG9yIG9mIGEgbWFwIGxhYmVsLiAqL1xuICAgIGxhYmVsQ29sb3I/OiBzdHJpbmcsXG5cbiAgICAvKiogIFRoZSBvdXRsaW5lIGhleCBjb2xvciBvZiBhIG1hcCBsYWJlbC4gKi9cbiAgICBsYWJlbE91dGxpbmVDb2xvcj86IHN0cmluZyxcblxuICAgIC8qKiBTcGVjaWVzIGlmIGEgbWFwIGxhYmVsIHR5cGUgaXMgdmlzaWJsZSBvciBub3QuICovXG4gICAgbGFiZWxWaXNpYmxlPzogYm9vbGVhbixcblxuICAgIC8qKiBIZXggY29sb3IgdXNlZCBmb3IgdGhlIG91dGxpbmUgYXJvdW5kIHBvbHlnb25zLCB0aGUgb3V0bGluZSBhcm91bmQgcG9pbnQgaWNvbnMsIGFuZCB0aGUgY29sb3Igb2YgbGluZXMuICovXG4gICAgc3Ryb2tlQ29sb3I/OiBzdHJpbmcsXG5cbiAgICAvKiogU3BlY2lmaWVzIGlmIHRoZSBtYXAgZWxlbWVudCBpcyB2aXNpYmxlIG9yIG5vdC4gKi9cbiAgICB2aXNpYmxlPzogYm9vbGVhblxufVxuXG5cbi8qKiBUaGUgc3R5bGUgb3B0aW9ucyB0aGF0IGNhbiBiZSBhcHBsaWN0aW9uIHRvIGJvcmRlcmVkIG1hcCBlbGVtZW50cy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJvcmRlcmVkTWFwRWxlbWVudFN0eWxlIGV4dGVuZHMgSU1hcEVsZW1lbnRTdHlsZSB7XG5cbiAgICAvKiogU2Vjb25kYXJ5L2Nhc2luZyBsaW5lIGhleCBjb2xvciBvZiB0aGUgYm9yZGVyIG9mIGEgZmlsbGVkIHBvbHlnb24uICovXG4gICAgYm9yZGVyT3V0bGluZUNvbG9yPzogc3RyaW5nLFxuXG4gICAgLyoqIFByaW1hcnkgbGluZSBoZXggY29sb3Igb2YgdGhlIGJvcmRlciBvZiBhIGZpbGxlZCBwb2x5Z29uLiAqL1xuICAgIGJvcmRlclN0cm9rZUNvbG9yPzogc3RyaW5nLFxuXG4gICAgLyoqIFNwZWNpZmllcyBpZiBhIGJvcmRlciBpcyB2aXNpYmxlIG9yIG5vdC4gKi9cbiAgICBib3JkZXJWaXNpYmxlPzogYm9vbGVhblxufVxuXG4vKiogR2xvYmFsIHN0eWxlIHNldHRpbmdzICovXG5leHBvcnQgaW50ZXJmYWNlIElTZXR0aW5nU3R5bGUge1xuICAgIC8qKiBBIGhleCBjb2xvciB2YWx1ZSB0aGF0IGFsbCBsYW5kIGlzIGZpcnN0IGZsdXNoZWQgdG8gYmVmb3JlIHRoaW5ncyBhcmUgZHJhd24gb24gaXQuICovXG4gICAgbGFuZENvbG9yPzogc3RyaW5nLFxuXG4gICAgLyoqIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBkcmF3IGVsZXZhdGlvbiBzaGFkaW5nIG9uIHRoZSBtYXAuICovXG4gICAgc2hhZGVkUmVsaWVmVmlzaWJsZT86IGJvb2xlYW5cbn0iXX0=