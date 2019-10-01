/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export let google;
/**
 * @record
 */
export function GoogleMap() { }
/** @type {?|undefined} */
GoogleMap.prototype.data;
/** @type {?} */
GoogleMap.prototype.constructor;
/** @type {?} */
GoogleMap.prototype.panTo;
/** @type {?} */
GoogleMap.prototype.setZoom;
/** @type {?} */
GoogleMap.prototype.getCenter;
/** @type {?} */
GoogleMap.prototype.setCenter;
/** @type {?} */
GoogleMap.prototype.getBounds;
/** @type {?} */
GoogleMap.prototype.getZoom;
/** @type {?} */
GoogleMap.prototype.getDiv;
/** @type {?} */
GoogleMap.prototype.getProjection;
/** @type {?} */
GoogleMap.prototype.setOptions;
/** @type {?} */
GoogleMap.prototype.panToBounds;
/** @type {?} */
GoogleMap.prototype.fitBounds;
/**
 * @record
 */
export function LatLng() { }
/** @type {?} */
LatLng.prototype.constructor;
/** @type {?} */
LatLng.prototype.lat;
/** @type {?} */
LatLng.prototype.lng;
/**
 * @record
 */
export function Marker() { }
/** @type {?} */
Marker.prototype.constructor;
/** @type {?} */
Marker.prototype.setMap;
/** @type {?} */
Marker.prototype.setPosition;
/** @type {?} */
Marker.prototype.setTitle;
/** @type {?} */
Marker.prototype.setLabel;
/** @type {?} */
Marker.prototype.setPosition;
/** @type {?} */
Marker.prototype.setDraggable;
/** @type {?} */
Marker.prototype.setIcon;
/** @type {?} */
Marker.prototype.setOpacity;
/** @type {?} */
Marker.prototype.setOptions;
/** @type {?} */
Marker.prototype.setVisible;
/** @type {?} */
Marker.prototype.setZIndex;
/** @type {?} */
Marker.prototype.getLabel;
/** @type {?} */
Marker.prototype.getPosition;
/** @type {?} */
Marker.prototype.getVisible;
/**
 * @record
 */
export function MarkerOptions() { }
/** @type {?} */
MarkerOptions.prototype.position;
/** @type {?|undefined} */
MarkerOptions.prototype.title;
/** @type {?|undefined} */
MarkerOptions.prototype.map;
/** @type {?|undefined} */
MarkerOptions.prototype.label;
/** @type {?|undefined} */
MarkerOptions.prototype.draggable;
/** @type {?|undefined} */
MarkerOptions.prototype.clickable;
/** @type {?|undefined} */
MarkerOptions.prototype.icon;
/** @type {?|undefined} */
MarkerOptions.prototype.opacity;
/** @type {?|undefined} */
MarkerOptions.prototype.visible;
/** @type {?|undefined} */
MarkerOptions.prototype.zIndex;
/**
 * @record
 */
export function MarkerLabel() { }
/** @type {?} */
MarkerLabel.prototype.color;
/** @type {?} */
MarkerLabel.prototype.fontFamily;
/** @type {?} */
MarkerLabel.prototype.fontSize;
/** @type {?} */
MarkerLabel.prototype.fontWeight;
/** @type {?} */
MarkerLabel.prototype.text;
/**
 * @record
 */
export function ClusterStyle() { }
/** @type {?|undefined} */
ClusterStyle.prototype.url;
/** @type {?|undefined} */
ClusterStyle.prototype.height;
/** @type {?|undefined} */
ClusterStyle.prototype.width;
/** @type {?|undefined} */
ClusterStyle.prototype.anchor;
/** @type {?|undefined} */
ClusterStyle.prototype.textColor;
/** @type {?|undefined} */
ClusterStyle.prototype.textSize;
/** @type {?|undefined} */
ClusterStyle.prototype.backgroundPosition;
/**
 * @record
 */
export function MarkerClusterer() { }
/** @type {?} */
MarkerClusterer.prototype.isZoomOnClick;
/** @type {?} */
MarkerClusterer.prototype.isAverageCenter;
/** @type {?} */
MarkerClusterer.prototype.getMarkers;
/** @type {?} */
MarkerClusterer.prototype.getTotalMarkers;
/** @type {?} */
MarkerClusterer.prototype.setMaxZoom;
/** @type {?} */
MarkerClusterer.prototype.getMaxZoom;
/** @type {?} */
MarkerClusterer.prototype.addMarkers;
/** @type {?} */
MarkerClusterer.prototype.addMarker;
/** @type {?} */
MarkerClusterer.prototype.removeMarkers;
/** @type {?} */
MarkerClusterer.prototype.removeMarker;
/** @type {?} */
MarkerClusterer.prototype.getTotalClusters;
/** @type {?} */
MarkerClusterer.prototype.getMap;
/** @type {?} */
MarkerClusterer.prototype.setMap;
/** @type {?} */
MarkerClusterer.prototype.getGridSize;
/** @type {?} */
MarkerClusterer.prototype.setGridSize;
/** @type {?} */
MarkerClusterer.prototype.getMinClusterSize;
/** @type {?} */
MarkerClusterer.prototype.setMinClusterSize;
/** @type {?} */
MarkerClusterer.prototype.clearMarkers;
/** @type {?} */
MarkerClusterer.prototype.setStyles;
/** @type {?} */
MarkerClusterer.prototype.getStyles;
/** @type {?} */
MarkerClusterer.prototype.setCalculator;
/** @type {?} */
MarkerClusterer.prototype.getCalculator;
/** @type {?} */
MarkerClusterer.prototype.resetViewport;
/** @type {?} */
MarkerClusterer.prototype.redraw;
/**
 * @record
 */
export function Circle() { }
/** @type {?} */
Circle.prototype.getBounds;
/** @type {?} */
Circle.prototype.getCenter;
/** @type {?} */
Circle.prototype.getDraggable;
/** @type {?} */
Circle.prototype.getEditable;
/** @type {?} */
Circle.prototype.getMap;
/** @type {?} */
Circle.prototype.getRadius;
/** @type {?} */
Circle.prototype.getVisible;
/** @type {?} */
Circle.prototype.setCenter;
/** @type {?} */
Circle.prototype.setDraggable;
/** @type {?} */
Circle.prototype.setEditable;
/** @type {?} */
Circle.prototype.setMap;
/** @type {?} */
Circle.prototype.setOptions;
/** @type {?} */
Circle.prototype.setRadius;
/** @type {?} */
Circle.prototype.setVisible;
/**
 * @record
 */
export function CircleOptions() { }
/** @type {?|undefined} */
CircleOptions.prototype.center;
/** @type {?|undefined} */
CircleOptions.prototype.clickable;
/** @type {?|undefined} */
CircleOptions.prototype.draggable;
/** @type {?|undefined} */
CircleOptions.prototype.editable;
/** @type {?|undefined} */
CircleOptions.prototype.fillColor;
/** @type {?|undefined} */
CircleOptions.prototype.fillOpacity;
/** @type {?|undefined} */
CircleOptions.prototype.map;
/** @type {?|undefined} */
CircleOptions.prototype.radius;
/** @type {?|undefined} */
CircleOptions.prototype.strokeColor;
/** @type {?|undefined} */
CircleOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
CircleOptions.prototype.strokePosition;
/** @type {?|undefined} */
CircleOptions.prototype.strokeWeight;
/** @type {?|undefined} */
CircleOptions.prototype.visible;
/** @type {?|undefined} */
CircleOptions.prototype.zIndex;
/**
 * @record
 */
export function LatLngBounds() { }
/** @type {?} */
LatLngBounds.prototype.contains;
/** @type {?} */
LatLngBounds.prototype.equals;
/** @type {?} */
LatLngBounds.prototype.extend;
/** @type {?} */
LatLngBounds.prototype.getCenter;
/** @type {?} */
LatLngBounds.prototype.getNorthEast;
/** @type {?} */
LatLngBounds.prototype.getSouthWest;
/** @type {?} */
LatLngBounds.prototype.intersects;
/** @type {?} */
LatLngBounds.prototype.isEmpty;
/** @type {?} */
LatLngBounds.prototype.toJSON;
/** @type {?} */
LatLngBounds.prototype.toSpan;
/** @type {?} */
LatLngBounds.prototype.toString;
/** @type {?} */
LatLngBounds.prototype.toUrlValue;
/** @type {?} */
LatLngBounds.prototype.union;
/**
 * @record
 */
export function LatLngBoundsLiteral() { }
/** @type {?} */
LatLngBoundsLiteral.prototype.east;
/** @type {?} */
LatLngBoundsLiteral.prototype.north;
/** @type {?} */
LatLngBoundsLiteral.prototype.south;
/** @type {?} */
LatLngBoundsLiteral.prototype.west;
/**
 * @record
 */
export function LatLngLiteral() { }
/** @type {?} */
LatLngLiteral.prototype.lat;
/** @type {?} */
LatLngLiteral.prototype.lng;
/**
 * @record
 */
export function MouseEvent() { }
/** @type {?} */
MouseEvent.prototype.latLng;
/**
 * @record
 */
export function MapOptions() { }
/** @type {?|undefined} */
MapOptions.prototype.center;
/** @type {?|undefined} */
MapOptions.prototype.zoom;
/** @type {?|undefined} */
MapOptions.prototype.minZoom;
/** @type {?|undefined} */
MapOptions.prototype.maxZoom;
/** @type {?|undefined} */
MapOptions.prototype.disableDoubleClickZoom;
/** @type {?|undefined} */
MapOptions.prototype.disableDefaultUI;
/** @type {?|undefined} */
MapOptions.prototype.scrollwheel;
/** @type {?|undefined} */
MapOptions.prototype.backgroundColor;
/** @type {?|undefined} */
MapOptions.prototype.draggable;
/** @type {?|undefined} */
MapOptions.prototype.draggableCursor;
/** @type {?|undefined} */
MapOptions.prototype.draggingCursor;
/** @type {?|undefined} */
MapOptions.prototype.keyboardShortcuts;
/** @type {?|undefined} */
MapOptions.prototype.styles;
/** @type {?|undefined} */
MapOptions.prototype.zoomControl;
/** @type {?|undefined} */
MapOptions.prototype.zoomControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.streetViewControl;
/** @type {?|undefined} */
MapOptions.prototype.streetViewControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.scaleControl;
/** @type {?|undefined} */
MapOptions.prototype.scaleControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeControl;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.panControl;
/** @type {?|undefined} */
MapOptions.prototype.panControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.rotateControl;
/** @type {?|undefined} */
MapOptions.prototype.rotateControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.fullscreenControl;
/** @type {?|undefined} */
MapOptions.prototype.fullscreenControlOptions;
/** @type {?|undefined} */
MapOptions.prototype.mapTypeId;
/** @type {?|undefined} */
MapOptions.prototype.clickableIcons;
/** @type {?|undefined} */
MapOptions.prototype.gestureHandling;
/**
 * @record
 */
export function MapTypeStyle() { }
/** @type {?|undefined} */
MapTypeStyle.prototype.elementType;
/** @type {?|undefined} */
MapTypeStyle.prototype.featureType;
/** @type {?} */
MapTypeStyle.prototype.stylers;
/**
 *  If more than one key is specified in a single MapTypeStyler, all but one will be ignored.
 * @record
 */
export function MapTypeStyler() { }
/** @type {?|undefined} */
MapTypeStyler.prototype.color;
/** @type {?|undefined} */
MapTypeStyler.prototype.gamma;
/** @type {?|undefined} */
MapTypeStyler.prototype.hue;
/** @type {?|undefined} */
MapTypeStyler.prototype.invert_lightness;
/** @type {?|undefined} */
MapTypeStyler.prototype.lightness;
/** @type {?|undefined} */
MapTypeStyler.prototype.saturation;
/** @type {?|undefined} */
MapTypeStyler.prototype.visibility;
/** @type {?|undefined} */
MapTypeStyler.prototype.weight;
/**
 * @record
 */
export function InfoWindow() { }
/** @type {?} */
InfoWindow.prototype.constructor;
/** @type {?} */
InfoWindow.prototype.close;
/** @type {?} */
InfoWindow.prototype.getContent;
/** @type {?} */
InfoWindow.prototype.getPosition;
/** @type {?} */
InfoWindow.prototype.getZIndex;
/** @type {?} */
InfoWindow.prototype.open;
/** @type {?} */
InfoWindow.prototype.setContent;
/** @type {?} */
InfoWindow.prototype.setOptions;
/** @type {?} */
InfoWindow.prototype.setPosition;
/** @type {?} */
InfoWindow.prototype.setZIndex;
/**
 * @record
 */
export function MVCObject() { }
/** @type {?} */
MVCObject.prototype.addListener;
/**
 * @record
 */
export function MapsEventListener() { }
/** @type {?} */
MapsEventListener.prototype.remove;
/**
 * @record
 */
export function Size() { }
/** @type {?} */
Size.prototype.height;
/** @type {?} */
Size.prototype.width;
/** @type {?} */
Size.prototype.constructor;
/** @type {?} */
Size.prototype.equals;
/** @type {?} */
Size.prototype.toString;
/**
 * @record
 */
export function InfoWindowOptions() { }
/** @type {?|undefined} */
InfoWindowOptions.prototype.content;
/** @type {?|undefined} */
InfoWindowOptions.prototype.disableAutoPan;
/** @type {?|undefined} */
InfoWindowOptions.prototype.maxWidth;
/** @type {?|undefined} */
InfoWindowOptions.prototype.pixelOffset;
/** @type {?|undefined} */
InfoWindowOptions.prototype.position;
/** @type {?|undefined} */
InfoWindowOptions.prototype.zIndex;
/**
 * @record
 */
export function Point() { }
/** @type {?} */
Point.prototype.x;
/** @type {?} */
Point.prototype.y;
/** @type {?} */
Point.prototype.equals;
/** @type {?} */
Point.prototype.toString;
/**
 * @record
 */
export function GoogleSymbol() { }
/** @type {?|undefined} */
GoogleSymbol.prototype.anchor;
/** @type {?|undefined} */
GoogleSymbol.prototype.fillColor;
/** @type {?|undefined} */
GoogleSymbol.prototype.fillOpacity;
/** @type {?|undefined} */
GoogleSymbol.prototype.labelOrigin;
/** @type {?|undefined} */
GoogleSymbol.prototype.path;
/** @type {?|undefined} */
GoogleSymbol.prototype.rotation;
/** @type {?|undefined} */
GoogleSymbol.prototype.scale;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeColor;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeOpacity;
/** @type {?|undefined} */
GoogleSymbol.prototype.strokeWeight;
/**
 * @record
 */
export function IconSequence() { }
/** @type {?|undefined} */
IconSequence.prototype.fixedRotation;
/** @type {?|undefined} */
IconSequence.prototype.icon;
/** @type {?|undefined} */
IconSequence.prototype.offset;
/** @type {?|undefined} */
IconSequence.prototype.repeat;
/**
 * @record
 */
export function PolylineOptions() { }
/** @type {?|undefined} */
PolylineOptions.prototype.clickable;
/** @type {?|undefined} */
PolylineOptions.prototype.draggable;
/** @type {?|undefined} */
PolylineOptions.prototype.editable;
/** @type {?|undefined} */
PolylineOptions.prototype.geodesic;
/** @type {?|undefined} */
PolylineOptions.prototype.icon;
/** @type {?|undefined} */
PolylineOptions.prototype.map;
/** @type {?|undefined} */
PolylineOptions.prototype.path;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeColor;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
PolylineOptions.prototype.strokeWeight;
/** @type {?|undefined} */
PolylineOptions.prototype.visible;
/** @type {?|undefined} */
PolylineOptions.prototype.zIndex;
/**
 * @record
 */
export function Polyline() { }
/** @type {?} */
Polyline.prototype.getDraggable;
/** @type {?} */
Polyline.prototype.getEditable;
/** @type {?} */
Polyline.prototype.getMap;
/** @type {?} */
Polyline.prototype.getPath;
/** @type {?} */
Polyline.prototype.getVisible;
/** @type {?} */
Polyline.prototype.setDraggable;
/** @type {?} */
Polyline.prototype.setEditable;
/** @type {?} */
Polyline.prototype.setMap;
/** @type {?} */
Polyline.prototype.setOptions;
/** @type {?} */
Polyline.prototype.setPath;
/** @type {?} */
Polyline.prototype.setVisible;
/**
 * PolyMouseEvent gets emitted when the user triggers mouse events on a polyline.
 * @record
 */
export function PolyMouseEvent() { }
/** @type {?} */
PolyMouseEvent.prototype.edge;
/** @type {?} */
PolyMouseEvent.prototype.path;
/** @type {?} */
PolyMouseEvent.prototype.vertex;
/**
 * @record
 */
export function PolygonOptions() { }
/** @type {?|undefined} */
PolygonOptions.prototype.clickable;
/** @type {?|undefined} */
PolygonOptions.prototype.draggable;
/** @type {?|undefined} */
PolygonOptions.prototype.editable;
/** @type {?|undefined} */
PolygonOptions.prototype.fillColor;
/** @type {?|undefined} */
PolygonOptions.prototype.fillOpacity;
/** @type {?|undefined} */
PolygonOptions.prototype.geodesic;
/** @type {?|undefined} */
PolygonOptions.prototype.icon;
/** @type {?|undefined} */
PolygonOptions.prototype.map;
/** @type {?|undefined} */
PolygonOptions.prototype.paths;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeColor;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeOpacity;
/** @type {?|undefined} */
PolygonOptions.prototype.strokeWeight;
/** @type {?|undefined} */
PolygonOptions.prototype.visible;
/** @type {?|undefined} */
PolygonOptions.prototype.zIndex;
/**
 * @record
 */
export function Polygon() { }
/** @type {?} */
Polygon.prototype.zIndex;
/** @type {?} */
Polygon.prototype.getDraggable;
/** @type {?} */
Polygon.prototype.getEditable;
/** @type {?} */
Polygon.prototype.getMap;
/** @type {?} */
Polygon.prototype.getPath;
/** @type {?} */
Polygon.prototype.getPaths;
/** @type {?} */
Polygon.prototype.getVisible;
/** @type {?} */
Polygon.prototype.setDraggable;
/** @type {?} */
Polygon.prototype.setEditable;
/** @type {?} */
Polygon.prototype.setMap;
/** @type {?} */
Polygon.prototype.setPath;
/** @type {?} */
Polygon.prototype.setOptions;
/** @type {?} */
Polygon.prototype.setPaths;
/** @type {?} */
Polygon.prototype.setVisible;
/**
 * @record
 */
export function KmlLayer() { }
/** @type {?} */
KmlLayer.prototype.getDefaultViewport;
/** @type {?} */
KmlLayer.prototype.getMap;
/** @type {?} */
KmlLayer.prototype.getMetadata;
/** @type {?} */
KmlLayer.prototype.getStatus;
/** @type {?} */
KmlLayer.prototype.getUrl;
/** @type {?} */
KmlLayer.prototype.getZIndex;
/** @type {?} */
KmlLayer.prototype.setMap;
/** @type {?} */
KmlLayer.prototype.setOptions;
/** @type {?} */
KmlLayer.prototype.setUrl;
/** @type {?} */
KmlLayer.prototype.setZIndex;
/** @typedef {?} */
var KmlLayerStatus;
export { KmlLayerStatus };
/**
 * See: https://developers.google.com/maps/documentation/javascript/reference?hl=de#KmlLayerMetadata
 * @record
 */
export function KmlLayerMetadata() { }
/** @type {?} */
KmlLayerMetadata.prototype.author;
/** @type {?} */
KmlLayerMetadata.prototype.description;
/** @type {?} */
KmlLayerMetadata.prototype.hasScreenOverlays;
/** @type {?} */
KmlLayerMetadata.prototype.name;
/** @type {?} */
KmlLayerMetadata.prototype.snippet;
/**
 * @record
 */
export function KmlAuthor() { }
/** @type {?} */
KmlAuthor.prototype.email;
/** @type {?} */
KmlAuthor.prototype.name;
/** @type {?} */
KmlAuthor.prototype.uri;
/**
 * @record
 */
export function KmlLayerOptions() { }
/** @type {?|undefined} */
KmlLayerOptions.prototype.clickable;
/** @type {?|undefined} */
KmlLayerOptions.prototype.map;
/** @type {?|undefined} */
KmlLayerOptions.prototype.preserveViewport;
/** @type {?|undefined} */
KmlLayerOptions.prototype.screenOverlays;
/** @type {?|undefined} */
KmlLayerOptions.prototype.suppressInfoWindows;
/** @type {?|undefined} */
KmlLayerOptions.prototype.url;
/** @type {?|undefined} */
KmlLayerOptions.prototype.zIndex;
/**
 * @record
 */
export function KmlFeatureData() { }
/** @type {?} */
KmlFeatureData.prototype.author;
/** @type {?} */
KmlFeatureData.prototype.description;
/** @type {?} */
KmlFeatureData.prototype.id;
/** @type {?} */
KmlFeatureData.prototype.infoWindowHtml;
/** @type {?} */
KmlFeatureData.prototype.name;
/** @type {?} */
KmlFeatureData.prototype.snippet;
/**
 * @record
 */
export function KmlMouseEvent() { }
/** @type {?} */
KmlMouseEvent.prototype.featureData;
/** @type {?} */
KmlMouseEvent.prototype.pixelOffset;
/**
 * @record
 */
export function Data() { }
/** @type {?} */
Data.prototype.features;
/** @type {?} */
Data.prototype.constructor;
/** @type {?} */
Data.prototype.addGeoJson;
/** @type {?} */
Data.prototype.remove;
/** @type {?} */
Data.prototype.setControlPosition;
/** @type {?} */
Data.prototype.setControls;
/** @type {?} */
Data.prototype.setDrawingMode;
/** @type {?} */
Data.prototype.setMap;
/** @type {?} */
Data.prototype.setStyle;
/** @type {?} */
Data.prototype.forEach;
/**
 * @record
 */
export function Feature() { }
/** @type {?|undefined} */
Feature.prototype.id;
/** @type {?} */
Feature.prototype.geometry;
/** @type {?} */
Feature.prototype.properties;
/**
 * @record
 */
export function DataOptions() { }
/** @type {?|undefined} */
DataOptions.prototype.controlPosition;
/** @type {?|undefined} */
DataOptions.prototype.controls;
/** @type {?|undefined} */
DataOptions.prototype.drawingMode;
/** @type {?|undefined} */
DataOptions.prototype.featureFactory;
/** @type {?|undefined} */
DataOptions.prototype.map;
/** @type {?|undefined} */
DataOptions.prototype.style;
/**
 * @record
 */
export function DataMouseEvent() { }
/** @type {?} */
DataMouseEvent.prototype.feature;
/**
 * @record
 */
export function GeoJsonOptions() { }
/** @type {?} */
GeoJsonOptions.prototype.idPropertyName;
/**
 * @record
 */
export function Geometry() { }
/** @type {?} */
Geometry.prototype.type;
/** @enum {number} */
const ControlPosition = {
    BOTTOM_CENTER: 0,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    LEFT_BOTTOM: 3,
    LEFT_CENTER: 4,
    LEFT_TOP: 5,
    RIGHT_BOTTOM: 6,
    RIGHT_CENTER: 7,
    RIGHT_TOP: 8,
    TOP_CENTER: 9,
    TOP_LEFT: 10,
    TOP_RIGHT: 11,
};
export { ControlPosition };
ControlPosition[ControlPosition.BOTTOM_CENTER] = 'BOTTOM_CENTER';
ControlPosition[ControlPosition.BOTTOM_LEFT] = 'BOTTOM_LEFT';
ControlPosition[ControlPosition.BOTTOM_RIGHT] = 'BOTTOM_RIGHT';
ControlPosition[ControlPosition.LEFT_BOTTOM] = 'LEFT_BOTTOM';
ControlPosition[ControlPosition.LEFT_CENTER] = 'LEFT_CENTER';
ControlPosition[ControlPosition.LEFT_TOP] = 'LEFT_TOP';
ControlPosition[ControlPosition.RIGHT_BOTTOM] = 'RIGHT_BOTTOM';
ControlPosition[ControlPosition.RIGHT_CENTER] = 'RIGHT_CENTER';
ControlPosition[ControlPosition.RIGHT_TOP] = 'RIGHT_TOP';
ControlPosition[ControlPosition.TOP_CENTER] = 'TOP_CENTER';
ControlPosition[ControlPosition.TOP_LEFT] = 'TOP_LEFT';
ControlPosition[ControlPosition.TOP_RIGHT] = 'TOP_RIGHT';
/** @enum {number} */
const MapTypeId = {
    /** This map type displays a transparent layer of major streets on satellite images. */
    hybrid: 0,
    /** This map type displays a normal street map. */
    roadmap: 1,
    /** This map type displays satellite images. */
    satellite: 2,
    /** This map type displays maps with physical features such as terrain and vegetation. */
    terrain: 3,
};
export { MapTypeId };
MapTypeId[MapTypeId.hybrid] = 'hybrid';
MapTypeId[MapTypeId.roadmap] = 'roadmap';
MapTypeId[MapTypeId.satellite] = 'satellite';
MapTypeId[MapTypeId.terrain] = 'terrain';
/**
 * Options for the rendering of the map type control.
 * @record
 */
export function MapTypeControlOptions() { }
/**
 * IDs of map types to show in the control.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.mapTypeIds;
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_RIGHT.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.position;
/**
 * Style id. Used to select what style of map type control to display.
 * @type {?|undefined}
 */
MapTypeControlOptions.prototype.style;
/** @enum {number} */
const MapTypeControlStyle = {
    DEFAULT: 0,
    DROPDOWN_MENU: 1,
    HORIZONTAL_BAR: 2,
};
export { MapTypeControlStyle };
MapTypeControlStyle[MapTypeControlStyle.DEFAULT] = 'DEFAULT';
MapTypeControlStyle[MapTypeControlStyle.DROPDOWN_MENU] = 'DROPDOWN_MENU';
MapTypeControlStyle[MapTypeControlStyle.HORIZONTAL_BAR] = 'HORIZONTAL_BAR';
/**
 * @record
 */
export function OverviewMapControlOptions() { }
/** @type {?|undefined} */
OverviewMapControlOptions.prototype.opened;
/**
 * Options for the rendering of the pan control.
 * @record
 */
export function PanControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
PanControlOptions.prototype.position;
/**
 * Options for the rendering of the rotate control.
 * @record
 */
export function RotateControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
RotateControlOptions.prototype.position;
/**
 * Options for the rendering of the scale control.
 * @record
 */
export function ScaleControlOptions() { }
/**
 * Style id. Used to select what style of scale control to display.
 * @type {?|undefined}
 */
ScaleControlOptions.prototype.style;
/** @enum {number} */
const ScaleControlStyle = {
    DEFAULT: 0,
};
export { ScaleControlStyle };
ScaleControlStyle[ScaleControlStyle.DEFAULT] = 'DEFAULT';
/**
 * Options for the rendering of the Street View pegman control on the map.
 * @record
 */
export function StreetViewControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map. The
 * default position is embedded within the navigation (zoom and pan) controls.
 * If this position is empty or the same as that specified in the
 * zoomControlOptions or panControlOptions, the Street View control will be
 * displayed as part of the navigation controls. Otherwise, it will be displayed
 * separately.
 * @type {?|undefined}
 */
StreetViewControlOptions.prototype.position;
/**
 * Options for the rendering of the zoom control.
 * @record
 */
export function ZoomControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is TOP_LEFT.
 * @type {?|undefined}
 */
ZoomControlOptions.prototype.position;
/** @type {?|undefined} */
ZoomControlOptions.prototype.style;
/** @enum {number} */
const ZoomControlStyle = {
    DEFAULT: 0,
    LARGE: 1,
    SMALL: 2,
};
export { ZoomControlStyle };
ZoomControlStyle[ZoomControlStyle.DEFAULT] = 'DEFAULT';
ZoomControlStyle[ZoomControlStyle.LARGE] = 'LARGE';
ZoomControlStyle[ZoomControlStyle.SMALL] = 'SMALL';
/**
 * Options for the rendering of the fullscreen control.
 * @record
 */
export function FullscreenControlOptions() { }
/**
 * Position id. Used to specify the position of the control on the map.
 * The default position is RIGHT_TOP.
 * @type {?|undefined}
 */
FullscreenControlOptions.prototype.position;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWFwcy8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlcy9nb29nbGUvZ29vZ2xlLW1hcC10eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFdBQVcsTUFBTSxDQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdWRyQixnQkFBYTtJQUNiLGNBQVc7SUFDWCxlQUFZO0lBQ1osY0FBVztJQUNYLGNBQVc7SUFDWCxXQUFRO0lBQ1IsZUFBWTtJQUNaLGVBQVk7SUFDWixZQUFTO0lBQ1QsYUFBVTtJQUNWLFlBQVE7SUFDUixhQUFTOzs7Z0NBWFQsYUFBYTtnQ0FDYixXQUFXO2dDQUNYLFlBQVk7Z0NBQ1osV0FBVztnQ0FDWCxXQUFXO2dDQUNYLFFBQVE7Z0NBQ1IsWUFBWTtnQ0FDWixZQUFZO2dDQUNaLFNBQVM7Z0NBQ1QsVUFBVTtnQ0FDVixRQUFRO2dDQUNSLFNBQVM7Ozs7SUFLVCxTQUFNOztJQUVOLFVBQU87O0lBRVAsWUFBUzs7SUFFVCxVQUFPOzs7b0JBTlAsTUFBTTtvQkFFTixPQUFPO29CQUVQLFNBQVM7b0JBRVQsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JQLFVBQU87SUFDUCxnQkFBYTtJQUNiLGlCQUFjOzs7d0NBRmQsT0FBTzt3Q0FDUCxhQUFhO3dDQUNiLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0NkLFVBQU87OztvQ0FBUCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkJQLFVBQU87SUFDUCxRQUFLO0lBQ0wsUUFBSzs7O2tDQUZMLE9BQU87a0NBQ1AsS0FBSztrQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGxldCBnb29nbGU6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVNYXAgZXh0ZW5kcyBNVkNPYmplY3Qge1xuICBkYXRhPzogRGF0YTtcbiAgY29uc3RydWN0b3IoZWw6IEhUTUxFbGVtZW50LCBvcHRzPzogTWFwT3B0aW9ucyk6IHZvaWQ7XG4gIHBhblRvKGxhdExuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xuICBzZXRab29tKHpvb206IG51bWJlcik6IHZvaWQ7XG4gIGdldENlbnRlcigpOiBMYXRMbmc7XG4gIHNldENlbnRlcihsYXRMbmc6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcbiAgZ2V0Qm91bmRzKCk6IExhdExuZ0JvdW5kcztcbiAgZ2V0Wm9vbSgpOiBudW1iZXI7XG4gIGdldERpdigpOiBIVE1MRGl2RWxlbWVudDtcbiAgZ2V0UHJvamVjdGlvbigpOiBhbnk7XG4gIHNldE9wdGlvbnMob3B0aW9uczogTWFwT3B0aW9ucyk6IHZvaWQ7XG4gIHBhblRvQm91bmRzKGxhdExuZ0JvdW5kczogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiB2b2lkO1xuICBmaXRCb3VuZHMoYm91bmRzOiBMYXRMbmdCb3VuZHN8TGF0TG5nQm91bmRzTGl0ZXJhbCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nIHtcbiAgY29uc3RydWN0b3IobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyKTogdm9pZDtcbiAgbGF0KCk6IG51bWJlcjtcbiAgbG5nKCk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXIgZXh0ZW5kcyBNVkNPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTWFya2VyT3B0aW9ucyk6IHZvaWQ7XG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XG4gIHNldFBvc2l0aW9uKGxhdExuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xuICBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZDtcbiAgc2V0TGFiZWwobGFiZWw6IHN0cmluZ3xNYXJrZXJMYWJlbCk6IHZvaWQ7XG4gIHNldFBvc2l0aW9uKGxhdGxuZzogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcbiAgc2V0SWNvbihpY29uOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRPcGFjaXR5KG9wYWNpdHk6IG51bWJlcik6IHZvaWQ7XG4gIHNldE9wdGlvbnMob3B0aW9uczogTWFya2VyT3B0aW9ucyk6IHZvaWQ7XG4gIHNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFpJbmRleCh6SW5kZXg6IG51bWJlcik6IHZvaWQ7XG4gIGdldExhYmVsKCk6IE1hcmtlckxhYmVsO1xuICBnZXRQb3NpdGlvbigpOiBMYXRMbmc7XG4gIGdldFZpc2libGUoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXJPcHRpb25zIHtcbiAgcG9zaXRpb246IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xuICB0aXRsZT86IHN0cmluZztcbiAgbWFwPzogR29vZ2xlTWFwO1xuICBsYWJlbD86IHN0cmluZ3xNYXJrZXJMYWJlbDtcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgY2xpY2thYmxlPzogYm9vbGVhbjtcbiAgaWNvbj86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgdmlzaWJsZT86IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJrZXJMYWJlbCB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGZvbnRGYW1pbHk6IHN0cmluZztcbiAgZm9udFNpemU6IHN0cmluZztcbiAgZm9udFdlaWdodDogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2x1c3RlclN0eWxlIHtcbiAgdXJsPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBhbmNob3I/OiBBcnJheTxudW1iZXI+O1xuICB0ZXh0Q29sb3I/OiBzdHJpbmc7XG4gIHRleHRTaXplPzogbnVtYmVyO1xuICBiYWNrZ3JvdW5kUG9zaXRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFya2VyQ2x1c3RlcmVyIHtcbiAgaXNab29tT25DbGljaygpOiBib29sZWFuO1xuICBpc0F2ZXJhZ2VDZW50ZXIoKTogYm9vbGVhbjtcbiAgZ2V0TWFya2VycygpOiBBcnJheTxNYXJrZXI+O1xuICBnZXRUb3RhbE1hcmtlcnMoKTogbnVtYmVyO1xuICBzZXRNYXhab29tKG1heFpvb206IG51bWJlcik6IHZvaWQ7XG4gIGdldE1heFpvb20oKTogbnVtYmVyO1xuICBhZGRNYXJrZXJzKG1hcmtlcnM6IEFycmF5PE1hcmtlcj4sIG9wdF9ub2RyYXc/OiBib29sZWFuKTogdm9pZDtcbiAgYWRkTWFya2VyKG1hcmtlcjogTWFya2VyLCBvcHRfbm9kcmF3PzogYm9vbGVhbik6IHZvaWQ7XG4gIHJlbW92ZU1hcmtlcnMobWFya2VyczogQXJyYXk8TWFya2VyPiwgb3B0X25vZHJhdz86IGJvb2xlYW4pOiB2b2lkO1xuICByZW1vdmVNYXJrZXIobWFya2VyOiBNYXJrZXIsIG9wdF9ub2RyYXc/OiBib29sZWFuKTogdm9pZDtcbiAgZ2V0VG90YWxDbHVzdGVycygpOiBudW1iZXI7XG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XG4gIGdldEdyaWRTaXplKCk6IG51bWJlcjtcbiAgc2V0R3JpZFNpemUoZ3JpZFNpemU6IG51bWJlcik6IHZvaWQ7XG4gIGdldE1pbkNsdXN0ZXJTaXplKCk6IG51bWJlcjtcbiAgc2V0TWluQ2x1c3RlclNpemUobWluQ2x1c3RlclNpemU6IG51bWJlcik6IHZvaWQ7XG4gIGNsZWFyTWFya2VycygpOiB2b2lkO1xuICBzZXRTdHlsZXMoc3R5bGVzOiBBcnJheTxDbHVzdGVyU3R5bGU+KTogdm9pZDtcbiAgZ2V0U3R5bGVzKCk6IEFycmF5PENsdXN0ZXJTdHlsZT47XG4gIHNldENhbGN1bGF0b3IoY2FsbGJhY2s6IChtYXJrZXJzOiBBcnJheTxNYXJrZXI+LCBudW1TdHlsZXM6IG51bWJlcikgPT4geyB0ZXh0OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ9KTogdm9pZDtcbiAgZ2V0Q2FsY3VsYXRvcigpOiAobWFya2VyczogQXJyYXk8TWFya2VyPiwgbnVtU3R5bGVzOiBudW1iZXIpID0+IHsgdGV4dDogc3RyaW5nLCBpbmRleDogbnVtYmVyfTtcbiAgcmVzZXRWaWV3cG9ydChoaWRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHJlZHJhdygpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENpcmNsZSBleHRlbmRzIE1WQ09iamVjdCB7XG4gIGdldEJvdW5kcygpOiBMYXRMbmdCb3VuZHM7XG4gIGdldENlbnRlcigpOiBMYXRMbmc7XG4gIGdldERyYWdnYWJsZSgpOiBib29sZWFuO1xuICBnZXRFZGl0YWJsZSgpOiBib29sZWFuO1xuICBnZXRNYXAoKTogR29vZ2xlTWFwO1xuICBnZXRSYWRpdXMoKTogbnVtYmVyO1xuICBnZXRWaXNpYmxlKCk6IGJvb2xlYW47XG4gIHNldENlbnRlcihjZW50ZXI6IExhdExuZ3xMYXRMbmdMaXRlcmFsKTogdm9pZDtcbiAgc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZTogYm9vbGVhbik6IHZvaWQ7XG4gIHNldEVkaXRhYmxlKGVkaXRhYmxlOiBib29sZWFuKTogdm9pZDtcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBDaXJjbGVPcHRpb25zKTogdm9pZDtcbiAgc2V0UmFkaXVzKHJhZGl1czogbnVtYmVyKTogdm9pZDtcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaXJjbGVPcHRpb25zIHtcbiAgY2VudGVyPzogTGF0TG5nfExhdExuZ0xpdGVyYWw7XG4gIGNsaWNrYWJsZT86IGJvb2xlYW47XG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIGVkaXRhYmxlPzogYm9vbGVhbjtcbiAgZmlsbENvbG9yPzogc3RyaW5nO1xuICBmaWxsT3BhY2l0eT86IG51bWJlcjtcbiAgbWFwPzogR29vZ2xlTWFwO1xuICByYWRpdXM/OiBudW1iZXI7XG4gIHN0cm9rZUNvbG9yPzogc3RyaW5nO1xuICBzdHJva2VPcGFjaXR5PzogbnVtYmVyO1xuICBzdHJva2VQb3NpdGlvbj86ICdDRU5URVInfCdJTlNJREUnfCdPVVRTSURFJztcbiAgc3Ryb2tlV2VpZ2h0PzogbnVtYmVyO1xuICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgekluZGV4PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhdExuZ0JvdW5kcyB7XG4gIGNvbnRhaW5zKGxhdExuZzogTGF0TG5nKTogYm9vbGVhbjtcbiAgZXF1YWxzKG90aGVyOiBMYXRMbmdCb3VuZHN8TGF0TG5nQm91bmRzTGl0ZXJhbCk6IGJvb2xlYW47XG4gIGV4dGVuZChwb2ludDogTGF0TG5nKTogdm9pZDtcbiAgZ2V0Q2VudGVyKCk6IExhdExuZztcbiAgZ2V0Tm9ydGhFYXN0KCk6IExhdExuZztcbiAgZ2V0U291dGhXZXN0KCk6IExhdExuZztcbiAgaW50ZXJzZWN0cyhvdGhlcjogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiBib29sZWFuO1xuICBpc0VtcHR5KCk6IGJvb2xlYW47XG4gIHRvSlNPTigpOiBMYXRMbmdCb3VuZHNMaXRlcmFsO1xuICB0b1NwYW4oKTogTGF0TG5nO1xuICB0b1N0cmluZygpOiBzdHJpbmc7XG4gIHRvVXJsVmFsdWUocHJlY2lzaW9uPzogbnVtYmVyKTogc3RyaW5nO1xuICB1bmlvbihvdGhlcjogTGF0TG5nQm91bmRzfExhdExuZ0JvdW5kc0xpdGVyYWwpOiBMYXRMbmdCb3VuZHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF0TG5nQm91bmRzTGl0ZXJhbCB7XG4gIGVhc3Q6IG51bWJlcjtcbiAgbm9ydGg6IG51bWJlcjtcbiAgc291dGg6IG51bWJlcjtcbiAgd2VzdDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExhdExuZ0xpdGVyYWwge1xuICBsYXQ6IG51bWJlcjtcbiAgbG5nOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VFdmVudCB7IGxhdExuZzogTGF0TG5nOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwT3B0aW9ucyB7XG4gIGNlbnRlcj86IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xuICB6b29tPzogbnVtYmVyO1xuICBtaW5ab29tPzogbnVtYmVyO1xuICBtYXhab29tPzogbnVtYmVyO1xuICBkaXNhYmxlRG91YmxlQ2xpY2tab29tPzogYm9vbGVhbjtcbiAgZGlzYWJsZURlZmF1bHRVST86IGJvb2xlYW47XG4gIHNjcm9sbHdoZWVsPzogYm9vbGVhbjtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICBkcmFnZ2FibGVDdXJzb3I/OiBzdHJpbmc7XG4gIGRyYWdnaW5nQ3Vyc29yPzogc3RyaW5nO1xuICBrZXlib2FyZFNob3J0Y3V0cz86IGJvb2xlYW47XG4gIHN0eWxlcz86IE1hcFR5cGVTdHlsZVtdO1xuICB6b29tQ29udHJvbD86IGJvb2xlYW47XG4gIHpvb21Db250cm9sT3B0aW9ucz86IFpvb21Db250cm9sT3B0aW9ucztcbiAgc3RyZWV0Vmlld0NvbnRyb2w/OiBib29sZWFuO1xuICBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM/OiBTdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM7XG4gIHNjYWxlQ29udHJvbD86IGJvb2xlYW47XG4gIHNjYWxlQ29udHJvbE9wdGlvbnM/OiBTY2FsZUNvbnRyb2xPcHRpb25zO1xuICBtYXBUeXBlQ29udHJvbD86IGJvb2xlYW47XG4gIG1hcFR5cGVDb250cm9sT3B0aW9ucz86IE1hcFR5cGVDb250cm9sT3B0aW9ucztcbiAgcGFuQ29udHJvbD86IGJvb2xlYW47XG4gIHBhbkNvbnRyb2xPcHRpb25zPzogUGFuQ29udHJvbE9wdGlvbnM7XG4gIHJvdGF0ZUNvbnRyb2w/OiBib29sZWFuO1xuICByb3RhdGVDb250cm9sT3B0aW9ucz86IFJvdGF0ZUNvbnRyb2xPcHRpb25zO1xuICBmdWxsc2NyZWVuQ29udHJvbD86IGJvb2xlYW47XG4gIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucz86IEZ1bGxzY3JlZW5Db250cm9sT3B0aW9ucztcbiAgbWFwVHlwZUlkPzogc3RyaW5nfE1hcFR5cGVJZDtcbiAgY2xpY2thYmxlSWNvbnM/OiBib29sZWFuO1xuICBnZXN0dXJlSGFuZGxpbmc/OiAnY29vcGVyYXRpdmUnfCdncmVlZHknfCdub25lJ3wnYXV0byc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwVHlwZVN0eWxlIHtcbiAgZWxlbWVudFR5cGU/OiAnYWxsJ3wnZ2VvbWV0cnknfCdnZW9tZXRyeS5maWxsJ3wnZ2VvbWV0cnkuc3Ryb2tlJ3wnbGFiZWxzJ3wnbGFiZWxzLmljb24nfFxuICAgICAgJ2xhYmVscy50ZXh0J3wnbGFiZWxzLnRleHQuZmlsbCd8J2xhYmVscy50ZXh0LnN0cm9rZSc7XG4gIGZlYXR1cmVUeXBlPzogJ2FkbWluaXN0cmF0aXZlJ3wnYWRtaW5pc3RyYXRpdmUuY291bnRyeSd8J2FkbWluaXN0cmF0aXZlLmxhbmRfcGFyY2VsJ3xcbiAgICAgICdhZG1pbmlzdHJhdGl2ZS5sb2NhbGl0eSd8J2FkbWluaXN0cmF0aXZlLm5laWdoYm9yaG9vZCd8J2FkbWluaXN0cmF0aXZlLnByb3ZpbmNlJ3wnYWxsJ3xcbiAgICAgICdsYW5kc2NhcGUnfCdsYW5kc2NhcGUubWFuX21hZGUnfCdsYW5kc2NhcGUubmF0dXJhbCd8J2xhbmRzY2FwZS5uYXR1cmFsLmxhbmRjb3Zlcid8XG4gICAgICAnbGFuZHNjYXBlLm5hdHVyYWwudGVycmFpbid8J3BvaSd8J3BvaS5hdHRyYWN0aW9uJ3wncG9pLmJ1c2luZXNzJ3wncG9pLmdvdmVybm1lbnQnfFxuICAgICAgJ3BvaS5tZWRpY2FsJ3wncG9pLnBhcmsnfCdwb2kucGxhY2Vfb2Zfd29yc2hpcCd8J3BvaS5zY2hvb2wnfCdwb2kuc3BvcnRzX2NvbXBsZXgnfCdyb2FkJ3xcbiAgICAgICdyb2FkLmFydGVyaWFsJ3wncm9hZC5oaWdod2F5J3wncm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzJ3wncm9hZC5sb2NhbCd8J3RyYW5zaXQnfFxuICAgICAgJ3RyYW5zaXQubGluZSd8J3RyYW5zaXQuc3RhdGlvbid8J3RyYW5zaXQuc3RhdGlvbi5haXJwb3J0J3wndHJhbnNpdC5zdGF0aW9uLmJ1cyd8XG4gICAgICAndHJhbnNpdC5zdGF0aW9uLnJhaWwnfCd3YXRlcic7XG4gIHN0eWxlcnM6IE1hcFR5cGVTdHlsZXJbXTtcbn1cblxuLyoqXG4gKiAgSWYgbW9yZSB0aGFuIG9uZSBrZXkgaXMgc3BlY2lmaWVkIGluIGEgc2luZ2xlIE1hcFR5cGVTdHlsZXIsIGFsbCBidXQgb25lIHdpbGwgYmUgaWdub3JlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXBUeXBlU3R5bGVyIHtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGdhbW1hPzogbnVtYmVyO1xuICBodWU/OiBzdHJpbmc7XG4gIGludmVydF9saWdodG5lc3M/OiBib29sZWFuO1xuICBsaWdodG5lc3M/OiBudW1iZXI7XG4gIHNhdHVyYXRpb24/OiBudW1iZXI7XG4gIHZpc2liaWxpdHk/OiBzdHJpbmc7XG4gIHdlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZvV2luZG93IGV4dGVuZHMgTVZDT2JqZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0cz86IEluZm9XaW5kb3dPcHRpb25zKTogdm9pZDtcbiAgY2xvc2UoKTogdm9pZDtcbiAgZ2V0Q29udGVudCgpOiBzdHJpbmd8Tm9kZTtcbiAgZ2V0UG9zaXRpb24oKTogTGF0TG5nO1xuICBnZXRaSW5kZXgoKTogbnVtYmVyO1xuICBvcGVuKG1hcD86IEdvb2dsZU1hcCwgYW5jaG9yPzogTVZDT2JqZWN0KTogdm9pZDtcbiAgc2V0Q29udGVudChjb250ZW50OiBzdHJpbmd8Tm9kZSk6IHZvaWQ7XG4gIHNldE9wdGlvbnMob3B0aW9uczogSW5mb1dpbmRvd09wdGlvbnMpOiB2b2lkO1xuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogTGF0TG5nfExhdExuZ0xpdGVyYWwpOiB2b2lkO1xuICBzZXRaSW5kZXgoekluZGV4OiBudW1iZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1WQ09iamVjdCB7IGFkZExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IE1hcHNFdmVudExpc3RlbmVyOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwc0V2ZW50TGlzdGVuZXIgeyByZW1vdmUoKTogdm9pZDsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpemUge1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHdpZHRoVW5pdD86IHN0cmluZywgaGVpZ2h0VW5pdD86IHN0cmluZyk6IHZvaWQ7XG4gIGVxdWFscyhvdGhlcjogU2l6ZSk6IGJvb2xlYW47XG4gIHRvU3RyaW5nKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZvV2luZG93T3B0aW9ucyB7XG4gIGNvbnRlbnQ/OiBzdHJpbmd8Tm9kZTtcbiAgZGlzYWJsZUF1dG9QYW4/OiBib29sZWFuO1xuICBtYXhXaWR0aD86IG51bWJlcjtcbiAgcGl4ZWxPZmZzZXQ/OiBTaXplO1xuICBwb3NpdGlvbj86IExhdExuZ3xMYXRMbmdMaXRlcmFsO1xuICB6SW5kZXg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgZXF1YWxzKG90aGVyOiBQb2ludCk6IGJvb2xlYW47XG4gIHRvU3RyaW5nKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVTeW1ib2wge1xuICBhbmNob3I/OiBQb2ludDtcbiAgZmlsbENvbG9yPzogc3RyaW5nO1xuICBmaWxsT3BhY2l0eT86IHN0cmluZztcbiAgbGFiZWxPcmlnaW4/OiBQb2ludDtcbiAgcGF0aD86IHN0cmluZztcbiAgcm90YXRpb24/OiBudW1iZXI7XG4gIHNjYWxlPzogbnVtYmVyO1xuICBzdHJva2VDb2xvcj86IHN0cmluZztcbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcbiAgc3Ryb2tlV2VpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEljb25TZXF1ZW5jZSB7XG4gIGZpeGVkUm90YXRpb24/OiBib29sZWFuO1xuICBpY29uPzogR29vZ2xlU3ltYm9sO1xuICBvZmZzZXQ/OiBzdHJpbmc7XG4gIHJlcGVhdD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb2x5bGluZU9wdGlvbnMge1xuICBjbGlja2FibGU/OiBib29sZWFuO1xuICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICBlZGl0YWJsZT86IGJvb2xlYW47XG4gIGdlb2Rlc2ljPzogYm9vbGVhbjtcbiAgaWNvbj86IEFycmF5PEljb25TZXF1ZW5jZT47XG4gIG1hcD86IEdvb2dsZU1hcDtcbiAgcGF0aD86IEFycmF5PExhdExuZz58QXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+O1xuICBzdHJva2VDb2xvcj86IHN0cmluZztcbiAgc3Ryb2tlT3BhY2l0eT86IG51bWJlcjtcbiAgc3Ryb2tlV2VpZ2h0PzogbnVtYmVyO1xuICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgekluZGV4PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvbHlsaW5lIGV4dGVuZHMgTVZDT2JqZWN0IHtcbiAgZ2V0RHJhZ2dhYmxlKCk6IGJvb2xlYW47XG4gIGdldEVkaXRhYmxlKCk6IGJvb2xlYW47XG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XG4gIGdldFBhdGgoKTogQXJyYXk8TGF0TG5nPjtcbiAgZ2V0VmlzaWJsZSgpOiBib29sZWFuO1xuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcbiAgc2V0RWRpdGFibGUoZWRpdGFibGU6IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRNYXAobWFwOiBHb29nbGVNYXApOiB2b2lkO1xuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBvbHlsaW5lT3B0aW9ucyk6IHZvaWQ7XG4gIHNldFBhdGgocGF0aDogQXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+KTogdm9pZDtcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcbn1cblxuLyoqXG4gKiBQb2x5TW91c2VFdmVudCBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciB0cmlnZ2VycyBtb3VzZSBldmVudHMgb24gYSBwb2x5bGluZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQb2x5TW91c2VFdmVudCBleHRlbmRzIE1vdXNlRXZlbnQge1xuICBlZGdlOiBudW1iZXI7XG4gIHBhdGg6IG51bWJlcjtcbiAgdmVydGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9seWdvbk9wdGlvbnMge1xuICBjbGlja2FibGU/OiBib29sZWFuO1xuICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICBlZGl0YWJsZT86IGJvb2xlYW47XG4gIGZpbGxDb2xvcj86IHN0cmluZztcbiAgZmlsbE9wYWNpdHk/OiBudW1iZXI7XG4gIGdlb2Rlc2ljPzogYm9vbGVhbjtcbiAgaWNvbj86IEFycmF5PEljb25TZXF1ZW5jZT47XG4gIG1hcD86IEdvb2dsZU1hcDtcbiAgcGF0aHM/OiBBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD58QXJyYXk8QXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+PjtcbiAgc3Ryb2tlQ29sb3I/OiBzdHJpbmc7XG4gIHN0cm9rZU9wYWNpdHk/OiBudW1iZXI7XG4gIHN0cm9rZVdlaWdodD86IG51bWJlcjtcbiAgdmlzaWJsZT86IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb2x5Z29uIGV4dGVuZHMgTVZDT2JqZWN0IHtcbiAgekluZGV4OiBudW1iZXI7XG4gIGdldERyYWdnYWJsZSgpOiBib29sZWFuO1xuICBnZXRFZGl0YWJsZSgpOiBib29sZWFuO1xuICBnZXRNYXAoKTogR29vZ2xlTWFwO1xuICBnZXRQYXRoKCk6IEFycmF5PExhdExuZz47XG4gIGdldFBhdGhzKCk6IEFycmF5PEFycmF5PExhdExuZz4+O1xuICBnZXRWaXNpYmxlKCk6IGJvb2xlYW47XG4gIHNldERyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRFZGl0YWJsZShlZGl0YWJsZTogYm9vbGVhbik6IHZvaWQ7XG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XG4gIHNldFBhdGgocGF0aDogQXJyYXk8TGF0TG5nPnxBcnJheTxMYXRMbmd8TGF0TG5nTGl0ZXJhbD4pOiB2b2lkO1xuICBzZXRPcHRpb25zKG9wdGlvbnM6IFBvbHlnb25PcHRpb25zKTogdm9pZDtcbiAgc2V0UGF0aHMocGF0aHM6IEFycmF5PEFycmF5PExhdExuZ3xMYXRMbmdMaXRlcmFsPj58QXJyYXk8TGF0TG5nfExhdExuZ0xpdGVyYWw+KTogdm9pZDtcbiAgc2V0VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLbWxMYXllciBleHRlbmRzIE1WQ09iamVjdCB7XG4gIGdldERlZmF1bHRWaWV3cG9ydCgpOiBMYXRMbmdCb3VuZHM7XG4gIGdldE1hcCgpOiBHb29nbGVNYXA7XG4gIGdldE1ldGFkYXRhKCk6IEttbExheWVyTWV0YWRhdGE7XG4gIGdldFN0YXR1cygpOiBLbWxMYXllclN0YXR1cztcbiAgZ2V0VXJsKCk6IHN0cmluZztcbiAgZ2V0WkluZGV4KCk6IG51bWJlcjtcbiAgc2V0TWFwKG1hcDogR29vZ2xlTWFwKTogdm9pZDtcbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBLbWxMYXllck9wdGlvbnMpOiB2b2lkO1xuICBzZXRVcmwodXJsOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRaSW5kZXgoekluZGV4OiBudW1iZXIpOiB2b2lkO1xufVxuXG4vKipcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvcmVmZXJlbmNlP2hsPWRlI0ttbExheWVyU3RhdHVzXG4gKi9cbmV4cG9ydCB0eXBlIEttbExheWVyU3RhdHVzID0gJ0RPQ1VNRU5UX05PVF9GT1VORCcgfFxuICAgICdET0NVTUVOVF9UT09fTEFSR0UnIHwgJ0ZFVENIX0VSUk9SJyB8ICdJTlZBTElEX0RPQ1VNRU5UJyB8ICdJTlZBTElEX1JFUVVFU1QnIHxcbiAgICAnTElNSVRTX0VYQ0VFREVEJyB8ICdPSycgfCAnVElNRURfT1VUJyB8ICdVTktOT1dOJztcblxuLyoqXG4gKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L3JlZmVyZW5jZT9obD1kZSNLbWxMYXllck1ldGFkYXRhXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgS21sTGF5ZXJNZXRhZGF0YSB7XG4gIGF1dGhvcjogS21sQXV0aG9yO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBoYXNTY3JlZW5PdmVybGF5czogYm9vbGVhbjtcbiAgbmFtZTogc3RyaW5nO1xuICBzbmlwcGV0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS21sQXV0aG9yIHtcbiAgZW1haWw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLbWxMYXllck9wdGlvbnMge1xuICBjbGlja2FibGU/OiBib29sZWFuO1xuICBtYXA/OiBHb29nbGVNYXA7XG4gIHByZXNlcnZlVmlld3BvcnQ/OiBib29sZWFuO1xuICBzY3JlZW5PdmVybGF5cz86IGJvb2xlYW47XG4gIHN1cHByZXNzSW5mb1dpbmRvd3M/OiBib29sZWFuO1xuICB1cmw/OiBzdHJpbmc7XG4gIHpJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLbWxGZWF0dXJlRGF0YSB7XG4gIGF1dGhvcjogS21sQXV0aG9yO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpZDogc3RyaW5nO1xuICBpbmZvV2luZG93SHRtbDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHNuaXBwZXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBLbWxNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XG4gIGZlYXR1cmVEYXRhOiBLbWxGZWF0dXJlRGF0YTtcbiAgcGl4ZWxPZmZzZXQ6IFNpemU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE1WQ09iamVjdCB7XG4gIGZlYXR1cmVzOiBGZWF0dXJlW107XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBEYXRhT3B0aW9ucyk6IHZvaWQ7XG4gIGFkZEdlb0pzb24oZ2VvSnNvbjogT2JqZWN0LCBvcHRpb25zPzogR2VvSnNvbk9wdGlvbnMpOiBGZWF0dXJlW107XG4gIHJlbW92ZShmZWF0dXJlOiBGZWF0dXJlKTogdm9pZDtcbiAgc2V0Q29udHJvbFBvc2l0aW9uKGNvbnRyb2xQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uKTogdm9pZDtcbiAgc2V0Q29udHJvbHMoY29udHJvbHM6IHN0cmluZ1tdKTogdm9pZDtcbiAgc2V0RHJhd2luZ01vZGUoZHJhd2luZ01vZGU6IHN0cmluZyk6IHZvaWQ7XG4gIHNldE1hcChtYXA6IEdvb2dsZU1hcCk6IHZvaWQ7XG4gIC8qIHRzbGludDpkaXNhYmxlICovXG4gIC8qXG4gICogVHNsaW50IGNvbmZpZ3VyYXRpb24gY2hlY2stcGFyYW1ldGVycyB3aWxsIHByb21wdCBlcnJvcnMgZm9yIHRoZXNlIGxpbmVzIG9mIGNvZGUuXG4gICogaHR0cHM6Ly9wYWxhbnRpci5naXRodWIuaW8vdHNsaW50L3J1bGVzL25vLXVudXNlZC12YXJpYWJsZS9cbiAgKi9cbiAgc2V0U3R5bGUoc3R5bGU6ICgpID0+IHZvaWQpOiB2b2lkO1xuICBmb3JFYWNoKGNhbGxiYWNrOiAoZmVhdHVyZTogRmVhdHVyZSkgPT4gdm9pZCk6IHZvaWQ7XG4gIC8qIHRzbGludDplbmFibGUgKi9cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlIGV4dGVuZHMgTVZDT2JqZWN0IHtcbiAgaWQ/OiBudW1iZXJ8c3RyaW5nfHVuZGVmaW5lZDtcbiAgZ2VvbWV0cnk6IEdlb21ldHJ5O1xuICBwcm9wZXJ0aWVzOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YU9wdGlvbnMge1xuICBjb250cm9sUG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XG4gIGNvbnRyb2xzPzogc3RyaW5nW107XG4gIGRyYXdpbmdNb2RlPzogc3RyaW5nO1xuICBmZWF0dXJlRmFjdG9yeT86IChnZW9tZXRyeTogR2VvbWV0cnkpID0+IEZlYXR1cmU7XG4gIG1hcD86IEdvb2dsZU1hcDtcbiAgc3R5bGU/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XG4gIGZlYXR1cmU6IEZlYXR1cmU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VvSnNvbk9wdGlvbnMge1xuICBpZFByb3BlcnR5TmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlb21ldHJ5IHtcbiAgdHlwZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIElkZW50aWZpZXJzIHVzZWQgdG8gc3BlY2lmeSB0aGUgcGxhY2VtZW50IG9mIGNvbnRyb2xzIG9uIHRoZSBtYXAuIENvbnRyb2xzIGFyZVxuICogcG9zaXRpb25lZCByZWxhdGl2ZSB0byBvdGhlciBjb250cm9scyBpbiB0aGUgc2FtZSBsYXlvdXQgcG9zaXRpb24uIENvbnRyb2xzIHRoYXRcbiAqIGFyZSBhZGRlZCBmaXJzdCBhcmUgcG9zaXRpb25lZCBjbG9zZXIgdG8gdGhlIGVkZ2Ugb2YgdGhlIG1hcC5cbiAqL1xuZXhwb3J0IGVudW0gQ29udHJvbFBvc2l0aW9uIHtcbiAgQk9UVE9NX0NFTlRFUixcbiAgQk9UVE9NX0xFRlQsXG4gIEJPVFRPTV9SSUdIVCxcbiAgTEVGVF9CT1RUT00sXG4gIExFRlRfQ0VOVEVSLFxuICBMRUZUX1RPUCxcbiAgUklHSFRfQk9UVE9NLFxuICBSSUdIVF9DRU5URVIsXG4gIFJJR0hUX1RPUCxcbiAgVE9QX0NFTlRFUixcbiAgVE9QX0xFRlQsXG4gIFRPUF9SSUdIVFxufVxuXG5leHBvcnQgZW51bSBNYXBUeXBlSWQge1xuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBhIHRyYW5zcGFyZW50IGxheWVyIG9mIG1ham9yIHN0cmVldHMgb24gc2F0ZWxsaXRlIGltYWdlcy4gKi9cbiAgaHlicmlkLFxuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBhIG5vcm1hbCBzdHJlZXQgbWFwLiAqL1xuICByb2FkbWFwLFxuICAvKiogVGhpcyBtYXAgdHlwZSBkaXNwbGF5cyBzYXRlbGxpdGUgaW1hZ2VzLiAqL1xuICBzYXRlbGxpdGUsXG4gIC8qKiBUaGlzIG1hcCB0eXBlIGRpc3BsYXlzIG1hcHMgd2l0aCBwaHlzaWNhbCBmZWF0dXJlcyBzdWNoIGFzIHRlcnJhaW4gYW5kIHZlZ2V0YXRpb24uICovXG4gIHRlcnJhaW5cbn1cblxuLyoqKioqIENvbnRyb2xzICoqKioqL1xuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIG1hcCB0eXBlIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hcFR5cGVDb250cm9sT3B0aW9ucyB7XG4gIC8qKiBJRHMgb2YgbWFwIHR5cGVzIHRvIHNob3cgaW4gdGhlIGNvbnRyb2wuICovXG4gIG1hcFR5cGVJZHM/OiAoTWFwVHlwZUlkfHN0cmluZylbXTtcbiAgLyoqXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXG4gICAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIFRPUF9SSUdIVC5cbiAgICovXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xuICAvKiogU3R5bGUgaWQuIFVzZWQgdG8gc2VsZWN0IHdoYXQgc3R5bGUgb2YgbWFwIHR5cGUgY29udHJvbCB0byBkaXNwbGF5LiAqL1xuICBzdHlsZT86IE1hcFR5cGVDb250cm9sU3R5bGU7XG59XG5cbmV4cG9ydCBlbnVtIE1hcFR5cGVDb250cm9sU3R5bGUge1xuICBERUZBVUxULFxuICBEUk9QRE9XTl9NRU5VLFxuICBIT1JJWk9OVEFMX0JBUlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE92ZXJ2aWV3TWFwQ29udHJvbE9wdGlvbnMge1xuICBvcGVuZWQ/OiBib29sZWFuO1xufVxuXG4vKiogT3B0aW9ucyBmb3IgdGhlIHJlbmRlcmluZyBvZiB0aGUgcGFuIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhbkNvbnRyb2xPcHRpb25zIHtcbiAgLyoqXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXG4gICAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIFRPUF9MRUZULlxuICAgKi9cbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XG59XG5cbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSByb3RhdGUgY29udHJvbC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm90YXRlQ29udHJvbE9wdGlvbnMge1xuICAvKipcbiAgICogUG9zaXRpb24gaWQuIFVzZWQgdG8gc3BlY2lmeSB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRyb2wgb24gdGhlIG1hcC5cbiAgICogVGhlIGRlZmF1bHQgcG9zaXRpb24gaXMgVE9QX0xFRlQuXG4gICAqL1xuICBwb3NpdGlvbj86IENvbnRyb2xQb3NpdGlvbjtcbn1cblxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIHNjYWxlIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxlQ29udHJvbE9wdGlvbnMge1xuICAvKiogU3R5bGUgaWQuIFVzZWQgdG8gc2VsZWN0IHdoYXQgc3R5bGUgb2Ygc2NhbGUgY29udHJvbCB0byBkaXNwbGF5LiAqL1xuICBzdHlsZT86IFNjYWxlQ29udHJvbFN0eWxlO1xufVxuXG5leHBvcnQgZW51bSBTY2FsZUNvbnRyb2xTdHlsZSB7XG4gIERFRkFVTFRcbn1cblxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIFN0cmVldCBWaWV3IHBlZ21hbiBjb250cm9sIG9uIHRoZSBtYXAuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVldFZpZXdDb250cm9sT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBQb3NpdGlvbiBpZC4gVXNlZCB0byBzcGVjaWZ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udHJvbCBvbiB0aGUgbWFwLiBUaGVcbiAgICogZGVmYXVsdCBwb3NpdGlvbiBpcyBlbWJlZGRlZCB3aXRoaW4gdGhlIG5hdmlnYXRpb24gKHpvb20gYW5kIHBhbikgY29udHJvbHMuXG4gICAqIElmIHRoaXMgcG9zaXRpb24gaXMgZW1wdHkgb3IgdGhlIHNhbWUgYXMgdGhhdCBzcGVjaWZpZWQgaW4gdGhlXG4gICAqIHpvb21Db250cm9sT3B0aW9ucyBvciBwYW5Db250cm9sT3B0aW9ucywgdGhlIFN0cmVldCBWaWV3IGNvbnRyb2wgd2lsbCBiZVxuICAgKiBkaXNwbGF5ZWQgYXMgcGFydCBvZiB0aGUgbmF2aWdhdGlvbiBjb250cm9scy4gT3RoZXJ3aXNlLCBpdCB3aWxsIGJlIGRpc3BsYXllZFxuICAgKiBzZXBhcmF0ZWx5LlxuICAgKi9cbiAgcG9zaXRpb24/OiBDb250cm9sUG9zaXRpb247XG59XG5cbi8qKiBPcHRpb25zIGZvciB0aGUgcmVuZGVyaW5nIG9mIHRoZSB6b29tIGNvbnRyb2wuICovXG5leHBvcnQgaW50ZXJmYWNlIFpvb21Db250cm9sT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBQb3NpdGlvbiBpZC4gVXNlZCB0byBzcGVjaWZ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udHJvbCBvbiB0aGUgbWFwLlxuICAgKiBUaGUgZGVmYXVsdCBwb3NpdGlvbiBpcyBUT1BfTEVGVC5cbiAgICovXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xuICBzdHlsZT86IFpvb21Db250cm9sU3R5bGU7XG59XG5cbmV4cG9ydCBlbnVtIFpvb21Db250cm9sU3R5bGUge1xuICBERUZBVUxULFxuICBMQVJHRSxcbiAgU01BTExcbn1cblxuLyoqIE9wdGlvbnMgZm9yIHRoZSByZW5kZXJpbmcgb2YgdGhlIGZ1bGxzY3JlZW4gY29udHJvbC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zIHtcbiAgLyoqXG4gICAqIFBvc2l0aW9uIGlkLiBVc2VkIHRvIHNwZWNpZnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250cm9sIG9uIHRoZSBtYXAuXG4gICAqIFRoZSBkZWZhdWx0IHBvc2l0aW9uIGlzIFJJR0hUX1RPUC5cbiAgICovXG4gIHBvc2l0aW9uPzogQ29udHJvbFBvc2l0aW9uO1xufVxuXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBPdmVybGF5VmlldyB7XG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IGFueTtcbiAgICBwdWJsaWMgc2V0VmFsdWVzKG9wdGlvbnM6IGFueSk6IHZvaWQ7XG4gICAgcHVibGljIGdldFBhbmVzKCk6IGFueTtcbiAgICBwdWJsaWMgZ2V0UHJvamVjdGlvbigpOiBhbnk7XG4gICAgcHVibGljIGdldE1hcCgpOiBHb29nbGVNYXA7XG59XG4iXX0=