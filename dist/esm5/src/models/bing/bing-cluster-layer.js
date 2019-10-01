/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BingConversions } from '../../services/bing/bing-conversions';
import { Marker } from '../marker';
import { BingSpiderClusterMarker } from './bing-spider-cluster-marker';
import { BingMarker } from './bing-marker';
/**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
var /**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
BingClusterLayer = /** @class */ (function () {
    ///
    /// Constructor
    ///
    /**
     * Creates a new instance of the BingClusterLayer class.
     *
     * @param _layer Microsoft.Maps.ClusterLayer. Native Bing Cluster Layer supporting the cluster layer.
     * @param _maps MapService. MapService implementation to leverage for the layer.
     *
     * @memberof BingClusterLayer
     */
    function BingClusterLayer(_layer, _maps) {
        this._layer = _layer;
        this._maps = _maps;
        this._isClustering = true;
        this._markers = new Array();
        this._markerLookup = new Map();
        this._pendingMarkers = new Array();
        this._spiderMarkers = new Array();
        this._spiderMarkerLookup = new Map();
        this._useSpiderCluster = false;
        this._mapclicks = 0;
        this._events = new Array();
        this._currentZoom = 0;
        this._spiderOptions = {
            circleSpiralSwitchover: 9,
            collapseClusterOnMapChange: false,
            collapseClusterOnNthClick: 1,
            invokeClickOnHover: true,
            minCircleLength: 60,
            minSpiralAngleSeperation: 25,
            spiralDistanceFactor: 5,
            stickStyle: {
                strokeColor: 'black',
                strokeThickness: 2
            },
            stickHoverStyle: { strokeColor: 'red' },
            markerSelected: null,
            markerUnSelected: null
        };
        this._currentCluster = null;
    }
    Object.defineProperty(BingClusterLayer.prototype, "NativePrimitve", {
        get: /**
         * Get the native primitive underneath the abstraction layer.
         *
         * \@memberof BingClusterLayer
         * @return {?} Microsoft.Maps.ClusterLayer.
         *
         */
        function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.AddListener = /**
     * Adds an event listener for the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} eventType string. Type of event to add (click, mouseover, etc). You can use any event that the underlying native
     * layer supports.
     * @param {?} fn function. Handler to call when the event occurs.
     *
     * @return {?}
     */
    function (eventType, fn) {
        Microsoft.Maps.Events.addHandler(this._layer, eventType, function (e) {
            fn(e);
        });
    };
    /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.AddEntity = /**
     * Adds an entity to the layer. Use this method with caution as it will
     * trigger a recaluation of the clusters (and associated markers if approprite) for
     * each invocation. If you use this method to add many markers to the cluster, use
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker. Entity to add to the layer.
     *
     * @return {?}
     */
    function (entity) {
        /** @type {?} */
        var isMarker = entity instanceof Marker;
        isMarker = entity instanceof BingMarker || isMarker;
        if (isMarker) {
            if (entity.IsFirst) {
                this.StopClustering();
            }
        }
        if (entity.NativePrimitve && entity.Location) {
            if (this._isClustering) {
                /** @type {?} */
                var p = this._layer.getPushpins();
                p.push(entity.NativePrimitve);
                this._layer.setPushpins(p);
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
    };
    /**
     * Adds a number of markers to the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.AddEntities = /**
     * Adds a number of markers to the layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker>. Entities to add to the layer.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        if (entities != null && Array.isArray(entities) && entities.length !== 0) {
            /** @type {?} */
            var e = entities.map(function (p) {
                _this._markerLookup.set(p.NativePrimitve, p);
                return p.NativePrimitve;
            });
            if (this._isClustering) {
                /** @type {?} */
                var p = this._layer.getPushpins();
                p.push.apply(p, tslib_1.__spread(e));
                this._layer.setPushpins(p);
                (_a = this._markers).push.apply(_a, tslib_1.__spread(entities));
            }
            else {
                (_b = this._pendingMarkers).push.apply(_b, tslib_1.__spread(entities));
            }
        }
        var _a, _b;
    };
    /**
     * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
     * individual underlying pins.
     *
     * \@memberof BingClusterLayer
     * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.InitializeSpiderClusterSupport = /**
     * Initializes spider behavior for the clusering layer (when a cluster maker is clicked, it explodes into a spider of the
     * individual underlying pins.
     *
     * \@memberof BingClusterLayer
     * @param {?=} options ISpiderClusterOptions. Optional. Options governing the behavior of the spider.
     *
     * @return {?}
     */
    function (options) {
        var _this = this;
        if (this._useSpiderCluster) {
            return;
        }
        /** @type {?} */
        var m = (/** @type {?} */ (this._maps)).MapInstance;
        this._useSpiderCluster = true;
        this._spiderLayer = new Microsoft.Maps.Layer();
        this._currentZoom = m.getZoom();
        this.SetSpiderOptions(options);
        m.layers.insert(this._spiderLayer);
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'click', function (e) { return _this.OnMapClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangestart', function (e) { return _this.OnMapViewChangeStart(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(m, 'viewchangeend', function (e) { return _this.OnMapViewChangeEnd(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._layer, 'click', function (e) { return _this.OnLayerClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'click', function (e) { return _this.OnLayerClick(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseover', function (e) { return _this.OnSpiderMouseOver(e); }));
        this._events.push(Microsoft.Maps.Events.addHandler(this._spiderLayer, 'mouseout', function (e) { return _this.OnSpiderMouseOut(e); }));
    };
    /**
     * Deletes the clustering layer.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.Delete = /**
     * Deletes the clustering layer.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._useSpiderCluster) {
            this._spiderLayer.clear();
            (/** @type {?} */ (this._maps)).MapPromise.then(function (m) {
                m.layers.remove(_this._spiderLayer);
                _this._spiderLayer = null;
            });
            this._events.forEach(function (e) { return Microsoft.Maps.Events.removeHandler(e); });
            this._events.splice(0);
            this._useSpiderCluster = false;
        }
        this._markers.splice(0);
        this._spiderMarkers.splice(0);
        this._pendingMarkers.splice(0);
        this._markerLookup.clear();
        this._maps.DeleteLayer(this);
    };
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    BingClusterLayer.prototype.GetMarkerFromBingMarker = /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} Marker. The abstract marker object representing the pushpin.
     *
     */
    function (pin) {
        /** @type {?} */
        var m = this._markerLookup.get(pin);
        return m;
    };
    /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    BingClusterLayer.prototype.GetOptions = /**
     * Returns the options governing the behavior of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} IClusterOptions. The layer options.
     *
     */
    function () {
        /** @type {?} */
        var o = this._layer.getOptions();
        /** @type {?} */
        var options = {
            id: 0,
            gridSize: o.gridSize,
            layerOffset: o.layerOffset,
            clusteringEnabled: o.clusteringEnabled,
            callback: o.callback,
            clusteredPinCallback: o.clusteredPinCallback,
            visible: o.visible,
            zIndex: o.zIndex
        };
        return options;
    };
    /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    BingClusterLayer.prototype.GetVisible = /**
     * Returns the visibility state of the layer.
     *
     * \@memberof BingClusterLayer
     * @return {?} Boolean. True is the layer is visible, false otherwise.
     *
     */
    function () {
        return this._layer.getOptions().visible;
    };
    /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} - The abstract marker object representing the pushpin.
     *
     */
    BingClusterLayer.prototype.GetSpiderMarkerFromBingMarker = /**
     * Returns the abstract marker used to wrap the Bing Pushpin.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin
     * @return {?} - The abstract marker object representing the pushpin.
     *
     */
    function (pin) {
        /** @type {?} */
        var m = this._spiderMarkerLookup.get(pin);
        return m;
    };
    /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker - Entity to be removed from the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.RemoveEntity = /**
     * Removes an entity from the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entity Marker - Entity to be removed from the layer.
     *
     * @return {?}
     */
    function (entity) {
        if (entity.NativePrimitve && entity.Location) {
            /** @type {?} */
            var j = this._markers.indexOf(entity);
            /** @type {?} */
            var k = this._pendingMarkers.indexOf(entity);
            if (j > -1) {
                this._markers.splice(j, 1);
            }
            if (k > -1) {
                this._pendingMarkers.splice(k, 1);
            }
            if (this._isClustering) {
                /** @type {?} */
                var p = this._layer.getPushpins();
                /** @type {?} */
                var i = p.indexOf(entity.NativePrimitve);
                if (i > -1) {
                    p.splice(i, 1);
                    this._layer.setPushpins(p);
                }
            }
            this._markerLookup.delete(entity.NativePrimitve);
        }
    };
    /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetEntities = /**
     * Sets the entities for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} entities Array<Marker> containing
     * the entities to add to the cluster. This replaces any existing entities.
     *
     * @return {?}
     */
    function (entities) {
        var _this = this;
        /** @type {?} */
        var p = new Array();
        this._markers.splice(0);
        this._markerLookup.clear();
        entities.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                _this._markers.push(e);
                _this._markerLookup.set(e.NativePrimitve, e);
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._layer.setPushpins(p);
    };
    /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetOptions = /**
     * Sets the options for the cluster layer.
     *
     * \@memberof BingClusterLayer
     * @param {?} options IClusterOptions containing the options enumeration controlling the layer behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var o = BingConversions.TranslateClusterOptions(options);
        this._layer.setOptions(o);
        if (options.spiderClusterOptions) {
            this.SetSpiderOptions(options.spiderClusterOptions);
        }
    };
    /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetVisible = /**
     * Toggles the cluster layer visibility.
     *
     * \@memberof BingClusterLayer
     * @param {?} visible Boolean true to make the layer visible, false to hide the layer.
     *
     * @return {?}
     */
    function (visible) {
        /** @type {?} */
        var o = this._layer.getOptions();
        o.visible = visible;
        this._layer.setOptions(o);
    };
    /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.StartClustering = /**
     * Start to actually cluster the entities in a cluster layer. This method should be called after the initial set of entities
     * have been added to the cluster. This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        if (this._isClustering) {
            return;
        }
        /** @type {?} */
        var p = new Array();
        this._markers.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._pendingMarkers.forEach(function (e) {
            if (e.NativePrimitve && e.Location) {
                p.push(/** @type {?} */ (e.NativePrimitve));
            }
        });
        this._layer.setPushpins(p);
        this._markers = this._markers.concat(this._pendingMarkers.splice(0));
        this._isClustering = true;
    };
    /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.StopClustering = /**
     * Stop to actually cluster the entities in a cluster layer.
     * This method is used for performance reasons as adding an entitiy will recalculate all clusters.
     * As such, StopClustering should be called before adding many entities and StartClustering should be called once adding is
     * complete to recalculate the clusters.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        if (!this._isClustering) {
            return;
        }
        this._isClustering = false;
    };
    /**
     * Creates a copy of a pushpins basic options.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin Pushpin to copy options from.
     * @return {?} - A copy of a pushpins basic options.
     *
     */
    BingClusterLayer.prototype.GetBasicPushpinOptions = /**
     * Creates a copy of a pushpins basic options.
     *
     * \@memberof BingClusterLayer
     * @param {?} pin Pushpin to copy options from.
     * @return {?} - A copy of a pushpins basic options.
     *
     */
    function (pin) {
        return /** @type {?} */ ({
            anchor: pin.getAnchor(),
            color: pin.getColor(),
            cursor: pin.getCursor(),
            icon: pin.getIcon(),
            roundClickableArea: pin.getRoundClickableArea(),
            subTitle: pin.getSubTitle(),
            text: pin.getText(),
            textOffset: pin.getTextOffset(),
            title: pin.getTitle()
        });
    };
    /**
     * Hides the spider cluster and resotres the original pin.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    BingClusterLayer.prototype.HideSpiderCluster = /**
     * Hides the spider cluster and resotres the original pin.
     *
     * \@memberof BingClusterLayer
     * @return {?}
     */
    function () {
        this._mapclicks = 0;
        if (this._currentCluster) {
            this._spiderLayer.clear();
            this._spiderMarkers.splice(0);
            this._spiderMarkerLookup.clear();
            this._currentCluster = null;
            this._mapclicks = -1;
            if (this._spiderOptions.markerUnSelected) {
                this._spiderOptions.markerUnSelected();
            }
        }
    };
    /**
     * Click event handler for when a shape in the cluster layer is clicked.
     *
     * \@memberof BingClusterLayer
     * @param {?} e The mouse event argurment from the click event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnLayerClick = /**
     * Click event handler for when a shape in the cluster layer is clicked.
     *
     * \@memberof BingClusterLayer
     * @param {?} e The mouse event argurment from the click event.
     *
     * @return {?}
     */
    function (e) {
        if (e.primitive instanceof Microsoft.Maps.ClusterPushpin) {
            /** @type {?} */
            var cp = /** @type {?} */ (e.primitive);
            /** @type {?} */
            var showNewCluster = cp !== this._currentCluster;
            this.HideSpiderCluster();
            if (showNewCluster) {
                this.ShowSpiderCluster(/** @type {?} */ (e.primitive));
            }
        }
        else {
            /** @type {?} */
            var pin = /** @type {?} */ (e.primitive);
            if (pin.metadata && pin.metadata.isClusterMarker) {
                /** @type {?} */
                var m = this.GetSpiderMarkerFromBingMarker(pin);
                /** @type {?} */
                var p = m.ParentMarker;
                /** @type {?} */
                var ppin = p.NativePrimitve;
                if (this._spiderOptions.markerSelected) {
                    this._spiderOptions.markerSelected(p, new BingMarker(this._currentCluster, null, null));
                }
                if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                    Microsoft.Maps.Events.invoke(ppin, 'click', e);
                }
                this._mapclicks = 0;
            }
            else {
                if (this._spiderOptions.markerSelected) {
                    this._spiderOptions.markerSelected(this.GetMarkerFromBingMarker(pin), null);
                }
                if (Microsoft.Maps.Events.hasHandler(pin, 'click')) {
                    Microsoft.Maps.Events.invoke(pin, 'click', e);
                }
            }
        }
    };
    /**
     * Delegate handling the click event on the map (outside a spider cluster). Depending on the
     * spider options, closes the cluster or increments the click counter.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapClick = /**
     * Delegate handling the click event on the map (outside a spider cluster). Depending on the
     * spider options, closes the cluster or increments the click counter.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event
     *
     * @return {?}
     */
    function (e) {
        if (this._mapclicks === -1) {
            return;
        }
        else if (++this._mapclicks >= this._spiderOptions.collapseClusterOnNthClick) {
            this.HideSpiderCluster();
        }
        else {
            // do nothing as this._mapclicks has already been incremented above
        }
    };
    /**
     * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapViewChangeEnd = /**
     * Delegate handling the map view changed end event. Hides the spider cluster if the zoom level has changed.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var z = (/** @type {?} */ (e.target)).getZoom();
        /** @type {?} */
        var hasZoomChanged = (z !== this._currentZoom);
        this._currentZoom = z;
        if (hasZoomChanged) {
            this.HideSpiderCluster();
        }
    };
    /**
     * Delegate handling the map view change start event. Depending on the spider options, hides the
     * the exploded spider or does nothing.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.OnMapViewChangeStart = /**
     * Delegate handling the map view change start event. Depending on the spider options, hides the
     * the exploded spider or does nothing.
     *
     * \@memberof BingClusterLayer
     * @param {?} e - Mouse event.
     *
     * @return {?}
     */
    function (e) {
        if (this._spiderOptions.collapseClusterOnMapChange) {
            this.HideSpiderCluster();
        }
    };
    /**
     * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    BingClusterLayer.prototype.OnSpiderMouseOut = /**
     * Delegate invoked on mouse out on an exploded spider marker. Resets the hover style on the stick.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            /** @type {?} */
            var m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickStyle);
        }
    };
    /**
     * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
     * on the underlying original marker dependent on the spider options.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    BingClusterLayer.prototype.OnSpiderMouseOver = /**
     * Invoked on mouse over on an exploded spider marker. Sets the hover style on the stick. Also invokes the click event
     * on the underlying original marker dependent on the spider options.
     *
     * @param {?} e - Mouse event.
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var pin = /** @type {?} */ (e.primitive);
        if (pin instanceof Microsoft.Maps.Pushpin && pin.metadata && pin.metadata.isClusterMarker) {
            /** @type {?} */
            var m = this.GetSpiderMarkerFromBingMarker(pin);
            m.Stick.setOptions(this._spiderOptions.stickHoverStyle);
            if (this._spiderOptions.invokeClickOnHover) {
                /** @type {?} */
                var p = m.ParentMarker;
                /** @type {?} */
                var ppin = p.NativePrimitve;
                if (Microsoft.Maps.Events.hasHandler(ppin, 'click')) {
                    Microsoft.Maps.Events.invoke(ppin, 'click', e);
                }
            }
        }
    };
    /**
     * Sets the options for spider behavior.
     *
     * \@memberof BingClusterLayer
     * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    BingClusterLayer.prototype.SetSpiderOptions = /**
     * Sets the options for spider behavior.
     *
     * \@memberof BingClusterLayer
     * @param {?} options ISpiderClusterOptions containing the options enumeration controlling the spider cluster behavior. The supplied options
     * are merged with the default/existing options.
     *
     * @return {?}
     */
    function (options) {
        if (options) {
            if (typeof options.circleSpiralSwitchover === 'number') {
                this._spiderOptions.circleSpiralSwitchover = options.circleSpiralSwitchover;
            }
            if (typeof options.collapseClusterOnMapChange === 'boolean') {
                this._spiderOptions.collapseClusterOnMapChange = options.collapseClusterOnMapChange;
            }
            if (typeof options.collapseClusterOnNthClick === 'number') {
                this._spiderOptions.collapseClusterOnNthClick = options.collapseClusterOnNthClick;
            }
            if (typeof options.invokeClickOnHover === 'boolean') {
                this._spiderOptions.invokeClickOnHover = options.invokeClickOnHover;
            }
            if (typeof options.minSpiralAngleSeperation === 'number') {
                this._spiderOptions.minSpiralAngleSeperation = options.minSpiralAngleSeperation;
            }
            if (typeof options.spiralDistanceFactor === 'number') {
                this._spiderOptions.spiralDistanceFactor = options.spiralDistanceFactor;
            }
            if (typeof options.minCircleLength === 'number') {
                this._spiderOptions.minCircleLength = options.minCircleLength;
            }
            if (options.stickHoverStyle) {
                this._spiderOptions.stickHoverStyle = options.stickHoverStyle;
            }
            if (options.stickStyle) {
                this._spiderOptions.stickStyle = options.stickStyle;
            }
            if (options.markerSelected) {
                this._spiderOptions.markerSelected = options.markerSelected;
            }
            if (options.markerUnSelected) {
                this._spiderOptions.markerUnSelected = options.markerUnSelected;
            }
            if (typeof options.visible === 'boolean') {
                this._spiderOptions.visible = options.visible;
            }
            this.SetOptions(/** @type {?} */ (options));
        }
    };
    /**
     * Expands a cluster into it's open spider layout.
     *
     * \@memberof BingClusterLayer
     * @param {?} cluster The cluster to show in it's open spider layout..
     *
     * @return {?}
     */
    BingClusterLayer.prototype.ShowSpiderCluster = /**
     * Expands a cluster into it's open spider layout.
     *
     * \@memberof BingClusterLayer
     * @param {?} cluster The cluster to show in it's open spider layout..
     *
     * @return {?}
     */
    function (cluster) {
        this.HideSpiderCluster();
        this._currentCluster = cluster;
        if (cluster && cluster.containedPushpins) {
            /** @type {?} */
            var m = (/** @type {?} */ (this._maps)).MapInstance;
            /** @type {?} */
            var pins = cluster.containedPushpins;
            /** @type {?} */
            var center = cluster.getLocation();
            /** @type {?} */
            var centerPoint = /** @type {?} */ (m.tryLocationToPixel(center, Microsoft.Maps.PixelReference.control));
            /** @type {?} */
            var stick = void 0;
            /** @type {?} */
            var angle = 0;
            /** @type {?} */
            var makeSpiral = pins.length > this._spiderOptions.circleSpiralSwitchover;
            /** @type {?} */
            var legPixelLength = void 0;
            /** @type {?} */
            var stepAngle = void 0;
            /** @type {?} */
            var stepLength = void 0;
            if (makeSpiral) {
                legPixelLength = this._spiderOptions.minCircleLength / Math.PI;
                stepLength = 2 * Math.PI * this._spiderOptions.spiralDistanceFactor;
            }
            else {
                stepAngle = 2 * Math.PI / pins.length;
                legPixelLength = (this._spiderOptions.spiralDistanceFactor / stepAngle / Math.PI / 2) * pins.length;
                if (legPixelLength < this._spiderOptions.minCircleLength) {
                    legPixelLength = this._spiderOptions.minCircleLength;
                }
            }
            for (var i = 0, len = pins.length; i < len; i++) {
                // Calculate spider pin location.
                if (!makeSpiral) {
                    angle = stepAngle * i;
                }
                else {
                    angle += this._spiderOptions.minSpiralAngleSeperation / legPixelLength + i * 0.0005;
                    legPixelLength += stepLength / angle;
                }
                /** @type {?} */
                var point = new Microsoft.Maps.Point(centerPoint.x + legPixelLength * Math.cos(angle), centerPoint.y + legPixelLength * Math.sin(angle));
                /** @type {?} */
                var loc = /** @type {?} */ (m.tryPixelToLocation(point, Microsoft.Maps.PixelReference.control));
                // Create stick to pin.
                stick = new Microsoft.Maps.Polyline([center, loc], this._spiderOptions.stickStyle);
                this._spiderLayer.add(stick);
                /** @type {?} */
                var pin = new Microsoft.Maps.Pushpin(loc);
                pin.metadata = pins[i].metadata || {};
                pin.metadata.isClusterMarker = true;
                pin.setOptions(this.GetBasicPushpinOptions(pins[i]));
                this._spiderLayer.add(pin);
                /** @type {?} */
                var spiderMarker = new BingSpiderClusterMarker(pin, null, this._spiderLayer);
                spiderMarker.Stick = stick;
                spiderMarker.ParentMarker = /** @type {?} */ (this.GetMarkerFromBingMarker(pins[i]));
                this._spiderMarkers.push(spiderMarker);
                this._spiderMarkerLookup.set(pin, spiderMarker);
            }
            this._mapclicks = 0;
        }
    };
    return BingClusterLayer;
}());
/**
 * Concrete implementation of a clustering layer for the Bing Map Provider.
 *
 * @export
 */
export { BingClusterLayer };
if (false) {
    /** @type {?} */
    BingClusterLayer.prototype._isClustering;
    /** @type {?} */
    BingClusterLayer.prototype._markers;
    /** @type {?} */
    BingClusterLayer.prototype._markerLookup;
    /** @type {?} */
    BingClusterLayer.prototype._pendingMarkers;
    /** @type {?} */
    BingClusterLayer.prototype._spiderMarkers;
    /** @type {?} */
    BingClusterLayer.prototype._spiderMarkerLookup;
    /** @type {?} */
    BingClusterLayer.prototype._useSpiderCluster;
    /** @type {?} */
    BingClusterLayer.prototype._mapclicks;
    /** @type {?} */
    BingClusterLayer.prototype._spiderLayer;
    /** @type {?} */
    BingClusterLayer.prototype._events;
    /** @type {?} */
    BingClusterLayer.prototype._currentZoom;
    /** @type {?} */
    BingClusterLayer.prototype._spiderOptions;
    /** @type {?} */
    BingClusterLayer.prototype._currentCluster;
    /** @type {?} */
    BingClusterLayer.prototype._layer;
    /** @type {?} */
    BingClusterLayer.prototype._maps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZy1jbHVzdGVyLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9iaW5nL2JpbmctY2x1c3Rlci1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUl2RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU8zQzs7Ozs7QUFBQTtJQWtESSxHQUFHO0lBQ0gsZUFBZTtJQUNmLEdBQUc7SUFFSDs7Ozs7OztPQU9HO0lBQ0gsMEJBQW9CLE1BQW1DLEVBQVUsS0FBaUI7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBNkI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZOzZCQXpEMUQsSUFBSTt3QkFDTSxJQUFJLEtBQUssRUFBVTs2QkFDUSxJQUFJLEdBQUcsRUFBa0M7K0JBQzdELElBQUksS0FBSyxFQUFVOzhCQUNILElBQUksS0FBSyxFQUEyQjttQ0FFNUUsSUFBSSxHQUFHLEVBQW1EO2lDQUMvQyxLQUFLOzBCQUNaLENBQUM7dUJBRThCLElBQUksS0FBSyxFQUE2Qjs0QkFDbkUsQ0FBQzs4QkFDd0I7WUFDNUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN6QiwwQkFBMEIsRUFBRSxLQUFLO1lBQ2pDLHlCQUF5QixFQUFFLENBQUM7WUFDNUIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixlQUFlLEVBQUUsRUFBRTtZQUNuQix3QkFBd0IsRUFBRSxFQUFFO1lBQzVCLG9CQUFvQixFQUFFLENBQUM7WUFDdkIsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixlQUFlLEVBQUUsQ0FBQzthQUNyQjtZQUNELGVBQWUsRUFB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dkI7OzJCQXBwQlQ7SUF1cEJDLENBQUE7Ozs7OztBQXZvQkQsNEJBdW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDbHVzdGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvaWNsdXN0ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBJU3BpZGVyQ2x1c3Rlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2lzcGlkZXItY2x1c3Rlci1vcHRpb25zJztcbmltcG9ydCB7IEJpbmdDb252ZXJzaW9ucyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1jb252ZXJzaW9ucyc7XG5pbXBvcnQgeyBCaW5nTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2JpbmcvYmluZy1tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9sYXllcic7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLi9tYXJrZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvdyB9IGZyb20gJy4uL2luZm8td2luZG93JztcbmltcG9ydCB7IEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyIH0gZnJvbSAnLi9iaW5nLXNwaWRlci1jbHVzdGVyLW1hcmtlcic7XG5pbXBvcnQgeyBCaW5nTWFya2VyIH0gZnJvbSAnLi9iaW5nLW1hcmtlcic7XG5cbi8qKlxuICogQ29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgYSBjbHVzdGVyaW5nIGxheWVyIGZvciB0aGUgQmluZyBNYXAgUHJvdmlkZXIuXG4gKlxuICogQGV4cG9ydFxuICovXG5leHBvcnQgY2xhc3MgQmluZ0NsdXN0ZXJMYXllciBpbXBsZW1lbnRzIExheWVyIHtcblxuICAgIC8vL1xuICAgIC8vLyBGaWVsZCBkZWNsYXJhdGlvbnNcbiAgICAvLy9cbiAgICBwcml2YXRlIF9pc0NsdXN0ZXJpbmcgPSB0cnVlO1xuICAgIHByaXZhdGUgX21hcmtlcnM6IEFycmF5PE1hcmtlcj4gPSBuZXcgQXJyYXk8TWFya2VyPigpO1xuICAgIHByaXZhdGUgX21hcmtlckxvb2t1cDogTWFwPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIE1hcmtlcj4gPSBuZXcgTWFwPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIE1hcmtlcj4oKTtcbiAgICBwcml2YXRlIF9wZW5kaW5nTWFya2VyczogQXJyYXk8TWFya2VyPiA9IG5ldyBBcnJheTxNYXJrZXI+KCk7XG4gICAgcHJpdmF0ZSBfc3BpZGVyTWFya2VyczogQXJyYXk8QmluZ1NwaWRlckNsdXN0ZXJNYXJrZXI+ID0gbmV3IEFycmF5PEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyPigpO1xuICAgIHByaXZhdGUgX3NwaWRlck1hcmtlckxvb2t1cDogTWFwPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyPiA9XG4gICAgICAgICAgICAgICAgICAgICBuZXcgTWFwPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4sIEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyPigpO1xuICAgIHByaXZhdGUgX3VzZVNwaWRlckNsdXN0ZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tYXBjbGlja3MgPSAwO1xuICAgIHByaXZhdGUgX3NwaWRlckxheWVyOiBNaWNyb3NvZnQuTWFwcy5MYXllcjtcbiAgICBwcml2YXRlIF9ldmVudHM6IEFycmF5PE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ+ID0gbmV3IEFycmF5PE1pY3Jvc29mdC5NYXBzLklIYW5kbGVySWQ+KCk7XG4gICAgcHJpdmF0ZSBfY3VycmVudFpvb20gPSAwO1xuICAgIHByaXZhdGUgX3NwaWRlck9wdGlvbnM6IElTcGlkZXJDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2lyY2xlU3BpcmFsU3dpdGNob3ZlcjogOSxcbiAgICAgICAgY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2U6IGZhbHNlLFxuICAgICAgICBjb2xsYXBzZUNsdXN0ZXJPbk50aENsaWNrOiAxLFxuICAgICAgICBpbnZva2VDbGlja09uSG92ZXI6IHRydWUsXG4gICAgICAgIG1pbkNpcmNsZUxlbmd0aDogNjAsXG4gICAgICAgIG1pblNwaXJhbEFuZ2xlU2VwZXJhdGlvbjogMjUsXG4gICAgICAgIHNwaXJhbERpc3RhbmNlRmFjdG9yOiA1LFxuICAgICAgICBzdGlja1N0eWxlOiB7XG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogMlxuICAgICAgICB9LFxuICAgICAgICBzdGlja0hvdmVyU3R5bGU6IHsgc3Ryb2tlQ29sb3I6ICdyZWQnIH0sXG4gICAgICAgIG1hcmtlclNlbGVjdGVkOiBudWxsLFxuICAgICAgICBtYXJrZXJVblNlbGVjdGVkOiBudWxsXG4gICAgfTtcbiAgICBwcml2YXRlIF9jdXJyZW50Q2x1c3RlcjogTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4gPSBudWxsO1xuXG4gICAgLy8vXG4gICAgLy8vIFByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hdGl2ZSBwcmltaXRpdmUgdW5kZXJuZWF0aCB0aGUgYWJzdHJhY3Rpb24gbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyTGF5ZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgTmF0aXZlUHJpbWl0dmUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBDb25zdHJ1Y3RvclxuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmluZ0NsdXN0ZXJMYXllciBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfbGF5ZXIgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlckxheWVyLiBOYXRpdmUgQmluZyBDbHVzdGVyIExheWVyIHN1cHBvcnRpbmcgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogQHBhcmFtIF9tYXBzIE1hcFNlcnZpY2UuIE1hcFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdG8gbGV2ZXJhZ2UgZm9yIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGF5ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJMYXllciwgcHJpdmF0ZSBfbWFwczogTWFwU2VydmljZSkgeyB9XG5cblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kcywgTGF5ZXIgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlIHN0cmluZy4gVHlwZSBvZiBldmVudCB0byBhZGQgKGNsaWNrLCBtb3VzZW92ZXIsIGV0YykuIFlvdSBjYW4gdXNlIGFueSBldmVudCB0aGF0IHRoZSB1bmRlcmx5aW5nIG5hdGl2ZVxuICAgICAqIGxheWVyIHN1cHBvcnRzLlxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbi4gSGFuZGxlciB0byBjYWxsIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHVibGljIEFkZExpc3RlbmVyKGV2ZW50VHlwZTogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmFkZEhhbmRsZXIodGhpcy5fbGF5ZXIsIGV2ZW50VHlwZSwgKGUpID0+IHtcbiAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVudGl0eSB0byB0aGUgbGF5ZXIuIFVzZSB0aGlzIG1ldGhvZCB3aXRoIGNhdXRpb24gYXMgaXQgd2lsbFxuICAgICAqIHRyaWdnZXIgYSByZWNhbHVhdGlvbiBvZiB0aGUgY2x1c3RlcnMgKGFuZCBhc3NvY2lhdGVkIG1hcmtlcnMgaWYgYXBwcm9wcml0ZSkgZm9yXG4gICAgICogZWFjaCBpbnZvY2F0aW9uLiBJZiB5b3UgdXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBtYW55IG1hcmtlcnMgdG8gdGhlIGNsdXN0ZXIsIHVzZVxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIuIEVudGl0eSB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXR5KGVudGl0eTogTWFya2VyKTogdm9pZCB7XG4gICAgICAgIGxldCBpc01hcmtlcjogYm9vbGVhbiA9IGVudGl0eSBpbnN0YW5jZW9mIE1hcmtlcjtcbiAgICAgICAgaXNNYXJrZXIgPSBlbnRpdHkgaW5zdGFuY2VvZiBCaW5nTWFya2VyIHx8IGlzTWFya2VyO1xuICAgICAgICBpZiAoaXNNYXJrZXIpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkuSXNGaXJzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuU3RvcENsdXN0ZXJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gdGhpcy5fbGF5ZXIuZ2V0UHVzaHBpbnMoKTtcbiAgICAgICAgICAgICAgICBwLnB1c2goZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5zZXQoZW50aXR5Lk5hdGl2ZVByaW1pdHZlLCBlbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc01hcmtlcikge1xuICAgICAgICAgICAgaWYgKGVudGl0eS5Jc0xhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJ0Q2x1c3RlcmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG51bWJlciBvZiBtYXJrZXJzIHRvIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdGllcyBBcnJheTxNYXJrZXI+LiBFbnRpdGllcyB0byBhZGQgdG8gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgQWRkRW50aXRpZXMoZW50aXRpZXM6IEFycmF5PE1hcmtlcj4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGVudGl0aWVzICE9IG51bGwgJiYgQXJyYXkuaXNBcnJheShlbnRpdGllcykgJiYgZW50aXRpZXMubGVuZ3RoICE9PSAwICkge1xuICAgICAgICAgICAgY29uc3QgZTogQXJyYXk8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj4gPSBlbnRpdGllcy5tYXAocCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLnNldChwLk5hdGl2ZVByaW1pdHZlLCBwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5OYXRpdmVQcmltaXR2ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gdGhpcy5fbGF5ZXIuZ2V0UHVzaHBpbnMoKTtcbiAgICAgICAgICAgICAgICBwLnB1c2goLi4uZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXIuc2V0UHVzaHBpbnMocCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2Vycy5wdXNoKC4uLmVudGl0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdNYXJrZXJzLnB1c2goLi4uZW50aXRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgc3BpZGVyIGJlaGF2aW9yIGZvciB0aGUgY2x1c2VyaW5nIGxheWVyICh3aGVuIGEgY2x1c3RlciBtYWtlciBpcyBjbGlja2VkLCBpdCBleHBsb2RlcyBpbnRvIGEgc3BpZGVyIG9mIHRoZVxuICAgICAqIGluZGl2aWR1YWwgdW5kZXJseWluZyBwaW5zLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSVNwaWRlckNsdXN0ZXJPcHRpb25zLiBPcHRpb25hbC4gT3B0aW9ucyBnb3Zlcm5pbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBzcGlkZXIuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBJbml0aWFsaXplU3BpZGVyQ2x1c3RlclN1cHBvcnQob3B0aW9ucz86IElTcGlkZXJDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdXNlU3BpZGVyQ2x1c3RlcikgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgbTogTWljcm9zb2Z0Lk1hcHMuTWFwID0gKDxCaW5nTWFwU2VydmljZT50aGlzLl9tYXBzKS5NYXBJbnN0YW5jZTtcbiAgICAgICAgdGhpcy5fdXNlU3BpZGVyQ2x1c3RlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NwaWRlckxheWVyID0gbmV3IE1pY3Jvc29mdC5NYXBzLkxheWVyKCk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRab29tID0gbS5nZXRab29tKCk7XG4gICAgICAgIHRoaXMuU2V0U3BpZGVyT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgbS5sYXllcnMuaW5zZXJ0KHRoaXMuX3NwaWRlckxheWVyKTtcblxuICAgICAgICAvLy9cbiAgICAgICAgLy8vIEFkZCBzcGlkZXIgcmVsYXRlZCBldmVudHMuLi4uXG4gICAgICAgIC8vL1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtLCAnY2xpY2snLCBlID0+IHRoaXMuT25NYXBDbGljayhlKSkpO1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcihtLCAndmlld2NoYW5nZXN0YXJ0JywgZSA9PiB0aGlzLk9uTWFwVmlld0NoYW5nZVN0YXJ0KGUpKSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5hZGRIYW5kbGVyKG0sICd2aWV3Y2hhbmdlZW5kJywgZSA9PiB0aGlzLk9uTWFwVmlld0NoYW5nZUVuZChlKSkpO1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9sYXllciwgJ2NsaWNrJywgZSA9PiB0aGlzLk9uTGF5ZXJDbGljayhlKSkpO1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9zcGlkZXJMYXllciwgJ2NsaWNrJywgZSA9PiB0aGlzLk9uTGF5ZXJDbGljayhlKSkpO1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9zcGlkZXJMYXllciwgJ21vdXNlb3ZlcicsIGUgPT4gdGhpcy5PblNwaWRlck1vdXNlT3ZlcihlKSkpO1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChNaWNyb3NvZnQuTWFwcy5FdmVudHMuYWRkSGFuZGxlcih0aGlzLl9zcGlkZXJMYXllciwgJ21vdXNlb3V0JywgZSA9PiB0aGlzLk9uU3BpZGVyTW91c2VPdXQoZSkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBjbHVzdGVyaW5nIGxheWVyLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgRGVsZXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fdXNlU3BpZGVyQ2x1c3Rlcikge1xuICAgICAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwcykuTWFwUHJvbWlzZS50aGVuKG0gPT4ge1xuICAgICAgICAgICAgICAgIG0ubGF5ZXJzLnJlbW92ZSh0aGlzLl9zcGlkZXJMYXllcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChlID0+IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5yZW1vdmVIYW5kbGVyKGUpKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICB0aGlzLl91c2VTcGlkZXJDbHVzdGVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgIHRoaXMuX3NwaWRlck1hcmtlcnMuc3BsaWNlKDApO1xuICAgICAgICB0aGlzLl9wZW5kaW5nTWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgIHRoaXMuX21hcmtlckxvb2t1cC5jbGVhcigpO1xuICAgICAgICB0aGlzLl9tYXBzLkRlbGV0ZUxheWVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IG1hcmtlciB1c2VkIHRvIHdyYXAgdGhlIEJpbmcgUHVzaHBpbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE1hcmtlci4gVGhlIGFic3RyYWN0IG1hcmtlciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBwdXNocGluLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluKTogTWFya2VyIHtcbiAgICAgICAgY29uc3QgbTogTWFya2VyID0gdGhpcy5fbWFya2VyTG9va3VwLmdldChwaW4pO1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcHRpb25zIGdvdmVybmluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgSUNsdXN0ZXJPcHRpb25zLiBUaGUgbGF5ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHVibGljIEdldE9wdGlvbnMoKTogSUNsdXN0ZXJPcHRpb25zIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgPSB0aGlzLl9sYXllci5nZXRPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IElDbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgICAgZ3JpZFNpemU6IG8uZ3JpZFNpemUsXG4gICAgICAgICAgICBsYXllck9mZnNldDogby5sYXllck9mZnNldCxcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdFbmFibGVkOiBvLmNsdXN0ZXJpbmdFbmFibGVkLFxuICAgICAgICAgICAgY2FsbGJhY2s6IG8uY2FsbGJhY2ssXG4gICAgICAgICAgICBjbHVzdGVyZWRQaW5DYWxsYmFjazogby5jbHVzdGVyZWRQaW5DYWxsYmFjayxcbiAgICAgICAgICAgIHZpc2libGU6IG8udmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogby56SW5kZXhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBCb29sZWFuLiBUcnVlIGlzIHRoZSBsYXllciBpcyB2aXNpYmxlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXIuZ2V0T3B0aW9ucygpLnZpc2libGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3QgbWFya2VyIHVzZWQgdG8gd3JhcCB0aGUgQmluZyBQdXNocGluLlxuICAgICAqXG4gICAgICogQHJldHVybnMgLSBUaGUgYWJzdHJhY3QgbWFya2VyIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHB1c2hwaW4uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBHZXRTcGlkZXJNYXJrZXJGcm9tQmluZ01hcmtlcihwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4pOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciB7XG4gICAgICAgIGNvbnN0IG06IEJpbmdTcGlkZXJDbHVzdGVyTWFya2VyID0gdGhpcy5fc3BpZGVyTWFya2VyTG9va3VwLmdldChwaW4pO1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGVudGl0eSBmcm9tIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBNYXJrZXIgLSBFbnRpdHkgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHVibGljIFJlbW92ZUVudGl0eShlbnRpdHk6IE1hcmtlcik6IHZvaWQge1xuICAgICAgICBpZiAoZW50aXR5Lk5hdGl2ZVByaW1pdHZlICYmIGVudGl0eS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgajogbnVtYmVyID0gdGhpcy5fbWFya2Vycy5pbmRleE9mKGVudGl0eSk7XG4gICAgICAgICAgICBjb25zdCBrOiBudW1iZXIgPSB0aGlzLl9wZW5kaW5nTWFya2Vycy5pbmRleE9mKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoaiA+IC0xKSB7IHRoaXMuX21hcmtlcnMuc3BsaWNlKGosIDEpOyB9XG4gICAgICAgICAgICBpZiAoayA+IC0xKSB7IHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZShrLCAxKTsgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IEFycmF5PE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ID0gdGhpcy5fbGF5ZXIuZ2V0UHVzaHBpbnMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpOiBudW1iZXIgPSBwLmluZGV4T2YoZW50aXR5Lk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHAuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuZGVsZXRlKGVudGl0eS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbnRpdGllcyBmb3IgdGhlIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXRpZXMgQXJyYXk8TWFya2VyPiBjb250YWluaW5nXG4gICAgICogdGhlIGVudGl0aWVzIHRvIGFkZCB0byB0aGUgY2x1c3Rlci4gVGhpcyByZXBsYWNlcyBhbnkgZXhpc3RpbmcgZW50aXRpZXMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBTZXRFbnRpdGllcyhlbnRpdGllczogQXJyYXk8TWFya2VyPik6IHZvaWQge1xuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPigpO1xuICAgICAgICB0aGlzLl9tYXJrZXJzLnNwbGljZSgwKTtcbiAgICAgICAgdGhpcy5fbWFya2VyTG9va3VwLmNsZWFyKCk7XG4gICAgICAgIGVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuTmF0aXZlUHJpbWl0dmUgJiYgZS5Mb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrZXJMb29rdXAuc2V0KGUuTmF0aXZlUHJpbWl0dmUsIGUpO1xuICAgICAgICAgICAgICAgIHAucHVzaCg8TWljcm9zb2Z0Lk1hcHMuUHVzaHBpbj5lLk5hdGl2ZVByaW1pdHZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xheWVyLnNldFB1c2hwaW5zKHApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjbHVzdGVyIGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSUNsdXN0ZXJPcHRpb25zIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMgZW51bWVyYXRpb24gY29udHJvbGxpbmcgdGhlIGxheWVyIGJlaGF2aW9yLiBUaGUgc3VwcGxpZWQgb3B0aW9uc1xuICAgICAqIGFyZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdC9leGlzdGluZyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgU2V0T3B0aW9ucyhvcHRpb25zOiBJQ2x1c3Rlck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbzogTWljcm9zb2Z0Lk1hcHMuSUNsdXN0ZXJMYXllck9wdGlvbnMgPSBCaW5nQ29udmVyc2lvbnMuVHJhbnNsYXRlQ2x1c3Rlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xheWVyLnNldE9wdGlvbnMobyk7XG4gICAgICAgIGlmIChvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zKSB7IHRoaXMuU2V0U3BpZGVyT3B0aW9ucyhvcHRpb25zLnNwaWRlckNsdXN0ZXJPcHRpb25zKTsgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsdXN0ZXIgbGF5ZXIgdmlzaWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2aXNpYmxlIEJvb2xlYW4gdHJ1ZSB0byBtYWtlIHRoZSBsYXllciB2aXNpYmxlLCBmYWxzZSB0byBoaWRlIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHVibGljIFNldFZpc2libGUodmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCBvOiBNaWNyb3NvZnQuTWFwcy5JQ2x1c3RlckxheWVyT3B0aW9ucyA9IHRoaXMuX2xheWVyLmdldE9wdGlvbnMoKTtcbiAgICAgICAgby52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgdGhpcy5fbGF5ZXIuc2V0T3B0aW9ucyhvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGluaXRpYWwgc2V0IG9mIGVudGl0aWVzXG4gICAgICogaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjbHVzdGVyLiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIGFzIGFkZGluZyBhbiBlbnRpdGl5IHdpbGwgcmVjYWxjdWxhdGUgYWxsIGNsdXN0ZXJzLlxuICAgICAqIEFzIHN1Y2gsIFN0b3BDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFkZGluZyBtYW55IGVudGl0aWVzIGFuZCBTdGFydENsdXN0ZXJpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmNlIGFkZGluZyBpc1xuICAgICAqIGNvbXBsZXRlIHRvIHJlY2FsY3VsYXRlIHRoZSBjbHVzdGVycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHVibGljIFN0YXJ0Q2x1c3RlcmluZygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2x1c3RlcmluZykgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBwOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IG5ldyBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPigpO1xuICAgICAgICB0aGlzLl9tYXJrZXJzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5OYXRpdmVQcmltaXR2ZSAmJiBlLkxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcC5wdXNoKDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUuTmF0aXZlUHJpbWl0dmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcGVuZGluZ01hcmtlcnMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGlmIChlLk5hdGl2ZVByaW1pdHZlICYmIGUuTG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICBwLnB1c2goPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5OYXRpdmVQcmltaXR2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllci5zZXRQdXNocGlucyhwKTtcbiAgICAgICAgdGhpcy5fbWFya2VycyA9IHRoaXMuX21hcmtlcnMuY29uY2F0KHRoaXMuX3BlbmRpbmdNYXJrZXJzLnNwbGljZSgwKSk7XG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0byBhY3R1YWxseSBjbHVzdGVyIHRoZSBlbnRpdGllcyBpbiBhIGNsdXN0ZXIgbGF5ZXIuXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyBhcyBhZGRpbmcgYW4gZW50aXRpeSB3aWxsIHJlY2FsY3VsYXRlIGFsbCBjbHVzdGVycy5cbiAgICAgKiBBcyBzdWNoLCBTdG9wQ2x1c3RlcmluZyBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhZGRpbmcgbWFueSBlbnRpdGllcyBhbmQgU3RhcnRDbHVzdGVyaW5nIHNob3VsZCBiZSBjYWxsZWQgb25jZSBhZGRpbmcgaXNcbiAgICAgKiBjb21wbGV0ZSB0byByZWNhbGN1bGF0ZSB0aGUgY2x1c3RlcnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHB1YmxpYyBTdG9wQ2x1c3RlcmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NsdXN0ZXJpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2lzQ2x1c3RlcmluZyA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLy8vXG4gICAgLy8vIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgYSBwdXNocGlucyBiYXNpYyBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBpbiBQdXNocGluIHRvIGNvcHkgb3B0aW9ucyBmcm9tLlxuICAgICAqIEByZXR1cm5zIC0gQSBjb3B5IG9mIGEgcHVzaHBpbnMgYmFzaWMgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBHZXRCYXNpY1B1c2hwaW5PcHRpb25zKHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbik6IE1pY3Jvc29mdC5NYXBzLklQdXNocGluT3B0aW9ucyB7XG4gICAgICAgIHJldHVybiA8TWljcm9zb2Z0Lk1hcHMuSVB1c2hwaW5PcHRpb25zPntcbiAgICAgICAgICAgIGFuY2hvcjogcGluLmdldEFuY2hvcigpLFxuICAgICAgICAgICAgY29sb3I6IHBpbi5nZXRDb2xvcigpLFxuICAgICAgICAgICAgY3Vyc29yOiBwaW4uZ2V0Q3Vyc29yKCksXG4gICAgICAgICAgICBpY29uOiBwaW4uZ2V0SWNvbigpLFxuICAgICAgICAgICAgcm91bmRDbGlja2FibGVBcmVhOiBwaW4uZ2V0Um91bmRDbGlja2FibGVBcmVhKCksXG4gICAgICAgICAgICBzdWJUaXRsZTogcGluLmdldFN1YlRpdGxlKCksXG4gICAgICAgICAgICB0ZXh0OiBwaW4uZ2V0VGV4dCgpLFxuICAgICAgICAgICAgdGV4dE9mZnNldDogcGluLmdldFRleHRPZmZzZXQoKSxcbiAgICAgICAgICAgIHRpdGxlOiBwaW4uZ2V0VGl0bGUoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBzcGlkZXIgY2x1c3RlciBhbmQgcmVzb3RyZXMgdGhlIG9yaWdpbmFsIHBpbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBIaWRlU3BpZGVyQ2x1c3RlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWFwY2xpY2tzID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDbHVzdGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGlkZXJMYXllci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5fc3BpZGVyTWFya2Vycy5zcGxpY2UoMCk7XG4gICAgICAgICAgICB0aGlzLl9zcGlkZXJNYXJrZXJMb29rdXAuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDbHVzdGVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IC0xO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyVW5TZWxlY3RlZCkgeyB0aGlzLl9zcGlkZXJPcHRpb25zLm1hcmtlclVuU2VsZWN0ZWQoKTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgZXZlbnQgaGFuZGxlciBmb3Igd2hlbiBhIHNoYXBlIGluIHRoZSBjbHVzdGVyIGxheWVyIGlzIGNsaWNrZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSBUaGUgbW91c2UgZXZlbnQgYXJndXJtZW50IGZyb20gdGhlIGNsaWNrIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIE9uTGF5ZXJDbGljayhlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcbiAgICAgICAgaWYgKGUucHJpbWl0aXZlIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGNwOiBNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbiA9IDxNaWNyb3NvZnQuTWFwcy5DbHVzdGVyUHVzaHBpbj5lLnByaW1pdGl2ZTtcbiAgICAgICAgICAgIGNvbnN0IHNob3dOZXdDbHVzdGVyOiBib29sZWFuID0gY3AgIT09IHRoaXMuX2N1cnJlbnRDbHVzdGVyO1xuICAgICAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xuICAgICAgICAgICAgaWYgKHNob3dOZXdDbHVzdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TaG93U3BpZGVyQ2x1c3Rlcig8TWljcm9zb2Z0Lk1hcHMuQ2x1c3RlclB1c2hwaW4+ZS5wcmltaXRpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5wcmltaXRpdmU7XG4gICAgICAgICAgICBpZiAocGluLm1ldGFkYXRhICYmIHBpbi5tZXRhZGF0YS5pc0NsdXN0ZXJNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IHRoaXMuR2V0U3BpZGVyTWFya2VyRnJvbUJpbmdNYXJrZXIocGluKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBCaW5nTWFya2VyID0gbS5QYXJlbnRNYXJrZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IHAuTmF0aXZlUHJpbWl0dmU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZChwLCBuZXcgQmluZ01hcmtlcih0aGlzLl9jdXJyZW50Q2x1c3RlciwgbnVsbCwgbnVsbCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmhhc0hhbmRsZXIocHBpbiwgJ2NsaWNrJykpIHsgTWljcm9zb2Z0Lk1hcHMuRXZlbnRzLmludm9rZShwcGluLCAnY2xpY2snLCBlKTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGlkZXJPcHRpb25zLm1hcmtlclNlbGVjdGVkKSB7IHRoaXMuX3NwaWRlck9wdGlvbnMubWFya2VyU2VsZWN0ZWQodGhpcy5HZXRNYXJrZXJGcm9tQmluZ01hcmtlcihwaW4pLCBudWxsKTsgfVxuICAgICAgICAgICAgICAgIGlmIChNaWNyb3NvZnQuTWFwcy5FdmVudHMuaGFzSGFuZGxlcihwaW4sICdjbGljaycpKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UocGluLCAnY2xpY2snLCBlKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIGNsaWNrIGV2ZW50IG9uIHRoZSBtYXAgKG91dHNpZGUgYSBzcGlkZXIgY2x1c3RlcikuIERlcGVuZGluZyBvbiB0aGVcbiAgICAgKiBzcGlkZXIgb3B0aW9ucywgY2xvc2VzIHRoZSBjbHVzdGVyIG9yIGluY3JlbWVudHMgdGhlIGNsaWNrIGNvdW50ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAtIE1vdXNlIGV2ZW50XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHByaXZhdGUgT25NYXBDbGljayhlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgfCBNaWNyb3NvZnQuTWFwcy5JTWFwVHlwZUNoYW5nZUV2ZW50QXJncyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbWFwY2xpY2tzID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKCsrdGhpcy5fbWFwY2xpY2tzID49IHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljaykge1xuICAgICAgICAgICAgdGhpcy5IaWRlU3BpZGVyQ2x1c3RlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZyBhcyB0aGlzLl9tYXBjbGlja3MgaGFzIGFscmVhZHkgYmVlbiBpbmNyZW1lbnRlZCBhYm92ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGUgaGFuZGxpbmcgdGhlIG1hcCB2aWV3IGNoYW5nZWQgZW5kIGV2ZW50LiBIaWRlcyB0aGUgc3BpZGVyIGNsdXN0ZXIgaWYgdGhlIHpvb20gbGV2ZWwgaGFzIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAtIE1vdXNlIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIE9uTWFwVmlld0NoYW5nZUVuZChlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MgfCBNaWNyb3NvZnQuTWFwcy5JTWFwVHlwZUNoYW5nZUV2ZW50QXJncyk6IHZvaWQge1xuICAgICAgICBjb25zdCB6OiBudW1iZXIgPSAoPE1pY3Jvc29mdC5NYXBzLk1hcD5lLnRhcmdldCkuZ2V0Wm9vbSgpO1xuICAgICAgICBjb25zdCBoYXNab29tQ2hhbmdlZDogYm9vbGVhbiA9ICh6ICE9PSB0aGlzLl9jdXJyZW50Wm9vbSk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRab29tID0gejtcbiAgICAgICAgaWYgKGhhc1pvb21DaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLkhpZGVTcGlkZXJDbHVzdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBoYW5kbGluZyB0aGUgbWFwIHZpZXcgY2hhbmdlIHN0YXJ0IGV2ZW50LiBEZXBlbmRpbmcgb24gdGhlIHNwaWRlciBvcHRpb25zLCBoaWRlcyB0aGVcbiAgICAgKiB0aGUgZXhwbG9kZWQgc3BpZGVyIG9yIGRvZXMgbm90aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgQmluZ0NsdXN0ZXJMYXllclxuICAgICAqL1xuICAgIHByaXZhdGUgT25NYXBWaWV3Q2hhbmdlU3RhcnQoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzIHwgTWljcm9zb2Z0Lk1hcHMuSU1hcFR5cGVDaGFuZ2VFdmVudEFyZ3MpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25NYXBDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuSGlkZVNwaWRlckNsdXN0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGVnYXRlIGludm9rZWQgb24gbW91c2Ugb3V0IG9uIGFuIGV4cGxvZGVkIHNwaWRlciBtYXJrZXIuIFJlc2V0cyB0aGUgaG92ZXIgc3R5bGUgb24gdGhlIHN0aWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGUgLSBNb3VzZSBldmVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIE9uU3BpZGVyTW91c2VPdXQoZTogTWljcm9zb2Z0Lk1hcHMuSU1vdXNlRXZlbnRBcmdzKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IDxNaWNyb3NvZnQuTWFwcy5QdXNocGluPmUucHJpbWl0aXZlO1xuICAgICAgICBpZiAocGluIGluc3RhbmNlb2YgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiAmJiBwaW4ubWV0YWRhdGEgJiYgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlcikge1xuICAgICAgICAgICAgY29uc3QgbTogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSB0aGlzLkdldFNwaWRlck1hcmtlckZyb21CaW5nTWFya2VyKHBpbik7XG4gICAgICAgICAgICBtLlN0aWNrLnNldE9wdGlvbnModGhpcy5fc3BpZGVyT3B0aW9ucy5zdGlja1N0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludm9rZWQgb24gbW91c2Ugb3ZlciBvbiBhbiBleHBsb2RlZCBzcGlkZXIgbWFya2VyLiBTZXRzIHRoZSBob3ZlciBzdHlsZSBvbiB0aGUgc3RpY2suIEFsc28gaW52b2tlcyB0aGUgY2xpY2sgZXZlbnRcbiAgICAgKiBvbiB0aGUgdW5kZXJseWluZyBvcmlnaW5hbCBtYXJrZXIgZGVwZW5kZW50IG9uIHRoZSBzcGlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIC0gTW91c2UgZXZlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBPblNwaWRlck1vdXNlT3ZlcihlOiBNaWNyb3NvZnQuTWFwcy5JTW91c2VFdmVudEFyZ3MpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGluOiBNaWNyb3NvZnQuTWFwcy5QdXNocGluID0gPE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4+ZS5wcmltaXRpdmU7XG4gICAgICAgIGlmIChwaW4gaW5zdGFuY2VvZiBNaWNyb3NvZnQuTWFwcy5QdXNocGluICYmIHBpbi5tZXRhZGF0YSAmJiBwaW4ubWV0YWRhdGEuaXNDbHVzdGVyTWFya2VyKSB7XG4gICAgICAgICAgICBjb25zdCBtOiBCaW5nU3BpZGVyQ2x1c3Rlck1hcmtlciA9IHRoaXMuR2V0U3BpZGVyTWFya2VyRnJvbUJpbmdNYXJrZXIocGluKTtcbiAgICAgICAgICAgIG0uU3RpY2suc2V0T3B0aW9ucyh0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrSG92ZXJTdHlsZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3BpZGVyT3B0aW9ucy5pbnZva2VDbGlja09uSG92ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwOiBCaW5nTWFya2VyID0gbS5QYXJlbnRNYXJrZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgcHBpbjogTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbiA9IHAuTmF0aXZlUHJpbWl0dmU7XG4gICAgICAgICAgICAgICAgaWYgKE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5oYXNIYW5kbGVyKHBwaW4sICdjbGljaycpKSB7IE1pY3Jvc29mdC5NYXBzLkV2ZW50cy5pbnZva2UocHBpbiwgJ2NsaWNrJywgZSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG9wdGlvbnMgZm9yIHNwaWRlciBiZWhhdmlvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIElTcGlkZXJDbHVzdGVyT3B0aW9ucyBjb250YWluaW5nIHRoZSBvcHRpb25zIGVudW1lcmF0aW9uIGNvbnRyb2xsaW5nIHRoZSBzcGlkZXIgY2x1c3RlciBiZWhhdmlvci4gVGhlIHN1cHBsaWVkIG9wdGlvbnNcbiAgICAgKiBhcmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQvZXhpc3Rpbmcgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBCaW5nQ2x1c3RlckxheWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBTZXRTcGlkZXJPcHRpb25zKG9wdGlvbnM6IElTcGlkZXJDbHVzdGVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNpcmNsZVNwaXJhbFN3aXRjaG92ZXIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyID0gb3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTWFwQ2hhbmdlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLmNvbGxhcHNlQ2x1c3Rlck9uTWFwQ2hhbmdlID0gb3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk1hcENoYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb2xsYXBzZUNsdXN0ZXJPbk50aENsaWNrID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljayA9IG9wdGlvbnMuY29sbGFwc2VDbHVzdGVyT25OdGhDbGljaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnZva2VDbGlja09uSG92ZXIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuaW52b2tlQ2xpY2tPbkhvdmVyID0gb3B0aW9ucy5pbnZva2VDbGlja09uSG92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWluU3BpcmFsQW5nbGVTZXBlcmF0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWluU3BpcmFsQW5nbGVTZXBlcmF0aW9uID0gb3B0aW9ucy5taW5TcGlyYWxBbmdsZVNlcGVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5zcGlyYWxEaXN0YW5jZUZhY3RvciA9IG9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoID0gb3B0aW9ucy5taW5DaXJjbGVMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5zdGlja0hvdmVyU3R5bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrSG92ZXJTdHlsZSA9IG9wdGlvbnMuc3RpY2tIb3ZlclN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3RpY2tTdHlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMuc3RpY2tTdHlsZSA9IG9wdGlvbnMuc3RpY2tTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1hcmtlclNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJTZWxlY3RlZCA9IG9wdGlvbnMubWFya2VyU2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyT3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkID0gb3B0aW9ucy5tYXJrZXJVblNlbGVjdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnZpc2libGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlck9wdGlvbnMudmlzaWJsZSA9IG9wdGlvbnMudmlzaWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuU2V0T3B0aW9ucyg8SUNsdXN0ZXJPcHRpb25zPm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kcyBhIGNsdXN0ZXIgaW50byBpdCdzIG9wZW4gc3BpZGVyIGxheW91dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbHVzdGVyIFRoZSBjbHVzdGVyIHRvIHNob3cgaW4gaXQncyBvcGVuIHNwaWRlciBsYXlvdXQuLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEJpbmdDbHVzdGVyTGF5ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIFNob3dTcGlkZXJDbHVzdGVyKGNsdXN0ZXI6IE1pY3Jvc29mdC5NYXBzLkNsdXN0ZXJQdXNocGluKTogdm9pZCB7XG4gICAgICAgIHRoaXMuSGlkZVNwaWRlckNsdXN0ZXIoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudENsdXN0ZXIgPSBjbHVzdGVyO1xuXG4gICAgICAgIGlmIChjbHVzdGVyICYmIGNsdXN0ZXIuY29udGFpbmVkUHVzaHBpbnMpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBzcGlkZXIgZGF0YS5cbiAgICAgICAgICAgIGNvbnN0IG06IE1pY3Jvc29mdC5NYXBzLk1hcCA9ICg8QmluZ01hcFNlcnZpY2U+dGhpcy5fbWFwcykuTWFwSW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zdCBwaW5zOiBBcnJheTxNaWNyb3NvZnQuTWFwcy5QdXNocGluPiA9IGNsdXN0ZXIuY29udGFpbmVkUHVzaHBpbnM7XG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IE1pY3Jvc29mdC5NYXBzLkxvY2F0aW9uID0gY2x1c3Rlci5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgY2VudGVyUG9pbnQ6IE1pY3Jvc29mdC5NYXBzLlBvaW50ID1cbiAgICAgICAgICAgICAgICA8TWljcm9zb2Z0Lk1hcHMuUG9pbnQ+bS50cnlMb2NhdGlvblRvUGl4ZWwoY2VudGVyLCBNaWNyb3NvZnQuTWFwcy5QaXhlbFJlZmVyZW5jZS5jb250cm9sKTtcbiAgICAgICAgICAgIGxldCBzdGljazogTWljcm9zb2Z0Lk1hcHMuUG9seWxpbmU7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWFrZVNwaXJhbDogYm9vbGVhbiA9IHBpbnMubGVuZ3RoID4gdGhpcy5fc3BpZGVyT3B0aW9ucy5jaXJjbGVTcGlyYWxTd2l0Y2hvdmVyO1xuICAgICAgICAgICAgbGV0IGxlZ1BpeGVsTGVuZ3RoOiBudW1iZXI7XG4gICAgICAgICAgICBsZXQgc3RlcEFuZ2xlOiBudW1iZXI7XG4gICAgICAgICAgICBsZXQgc3RlcExlbmd0aDogbnVtYmVyO1xuXG4gICAgICAgICAgICBpZiAobWFrZVNwaXJhbCkge1xuICAgICAgICAgICAgICAgIGxlZ1BpeGVsTGVuZ3RoID0gdGhpcy5fc3BpZGVyT3B0aW9ucy5taW5DaXJjbGVMZW5ndGggLyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIHN0ZXBMZW5ndGggPSAyICogTWF0aC5QSSAqIHRoaXMuX3NwaWRlck9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGVwQW5nbGUgPSAyICogTWF0aC5QSSAvIHBpbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGxlZ1BpeGVsTGVuZ3RoID0gKHRoaXMuX3NwaWRlck9wdGlvbnMuc3BpcmFsRGlzdGFuY2VGYWN0b3IgLyBzdGVwQW5nbGUgLyBNYXRoLlBJIC8gMikgKiBwaW5zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVnUGl4ZWxMZW5ndGggPCB0aGlzLl9zcGlkZXJPcHRpb25zLm1pbkNpcmNsZUxlbmd0aCkgeyBsZWdQaXhlbExlbmd0aCA9IHRoaXMuX3NwaWRlck9wdGlvbnMubWluQ2lyY2xlTGVuZ3RoOyB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBwaW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNwaWRlciBwaW4gbG9jYXRpb24uXG4gICAgICAgICAgICAgICAgaWYgKCFtYWtlU3BpcmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ2xlID0gc3RlcEFuZ2xlICogaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuZ2xlICs9IHRoaXMuX3NwaWRlck9wdGlvbnMubWluU3BpcmFsQW5nbGVTZXBlcmF0aW9uIC8gbGVnUGl4ZWxMZW5ndGggKyBpICogMC4wMDA1O1xuICAgICAgICAgICAgICAgICAgICBsZWdQaXhlbExlbmd0aCArPSBzdGVwTGVuZ3RoIC8gYW5nbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50OiBNaWNyb3NvZnQuTWFwcy5Qb2ludCA9XG4gICAgICAgICAgICAgICAgICAgIG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2ludChjZW50ZXJQb2ludC54ICsgbGVnUGl4ZWxMZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXJQb2ludC55ICsgbGVnUGl4ZWxMZW5ndGggKiBNYXRoLnNpbihhbmdsZSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYzogTWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24gPVxuICAgICAgICAgICAgICAgICAgICA8TWljcm9zb2Z0Lk1hcHMuTG9jYXRpb24+bS50cnlQaXhlbFRvTG9jYXRpb24ocG9pbnQsIE1pY3Jvc29mdC5NYXBzLlBpeGVsUmVmZXJlbmNlLmNvbnRyb2wpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN0aWNrIHRvIHBpbi5cbiAgICAgICAgICAgICAgICBzdGljayA9IG5ldyBNaWNyb3NvZnQuTWFwcy5Qb2x5bGluZShbY2VudGVyLCBsb2NdLCB0aGlzLl9zcGlkZXJPcHRpb25zLnN0aWNrU3R5bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWRlckxheWVyLmFkZChzdGljayk7XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgcGluIGluIHNwaXJhbCB0aGF0IGNvbnRhaW5zIHNhbWUgbWV0YWRhdGEgYXMgcGFyZW50IHBpbi5cbiAgICAgICAgICAgICAgICBjb25zdCBwaW46IE1pY3Jvc29mdC5NYXBzLlB1c2hwaW4gPSBuZXcgTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbihsb2MpO1xuICAgICAgICAgICAgICAgIHBpbi5tZXRhZGF0YSA9IHBpbnNbaV0ubWV0YWRhdGEgfHwge307XG4gICAgICAgICAgICAgICAgcGluLm1ldGFkYXRhLmlzQ2x1c3Rlck1hcmtlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGluLnNldE9wdGlvbnModGhpcy5HZXRCYXNpY1B1c2hwaW5PcHRpb25zKHBpbnNbaV0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGlkZXJMYXllci5hZGQocGluKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaWRlck1hcmtlcjogQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIgPSBuZXcgQmluZ1NwaWRlckNsdXN0ZXJNYXJrZXIocGluLCBudWxsLCB0aGlzLl9zcGlkZXJMYXllcik7XG4gICAgICAgICAgICAgICAgc3BpZGVyTWFya2VyLlN0aWNrID0gc3RpY2s7XG4gICAgICAgICAgICAgICAgc3BpZGVyTWFya2VyLlBhcmVudE1hcmtlciA9IDxCaW5nTWFya2VyPnRoaXMuR2V0TWFya2VyRnJvbUJpbmdNYXJrZXIocGluc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTWFya2Vycy5wdXNoKHNwaWRlck1hcmtlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZGVyTWFya2VyTG9va3VwLnNldChwaW4sIHNwaWRlck1hcmtlcik7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21hcGNsaWNrcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==