/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MarkerTypeId } from '../models/marker-type-id';
/**
 * This interface defines the contract for an icon cache entry.
 * @record
 */
function IMarkerIconCacheEntry() { }
/**
 * The icon string of the cache entry.
 *
 * \@memberof IMarkerIconCacheEntry
 * @type {?}
 */
IMarkerIconCacheEntry.prototype.markerIconString;
/**
 * The Size of the icon.
 *
 * \@memberof IMarkerIconCacheEntry
 *
 * @type {?}
 */
IMarkerIconCacheEntry.prototype.markerSize;
/**
 * This class defines the contract for a marker.
 *
 * @export
 * @abstract
 * @abstract
 */
export class Marker {
    /**
     * Creates a marker based on the marker info. In turn calls a number of internal members to
     * create the actual marker.
     *
     * \@memberof Marker
     * @param {?} iconInfo - icon information. Depending on the marker type, various properties
     * need to be present. For performance, it is recommended to use an id for markers that are common to facilitate
     * reuse.
     * @return {?} - a string or a promise for a string containing
     * a data url with the marker image.
     */
    static CreateMarker(iconInfo) {
        switch (iconInfo.markerType) {
            case MarkerTypeId.CanvasMarker: return Marker.CreateCanvasMarker(iconInfo);
            case MarkerTypeId.DynamicCircleMarker: return Marker.CreateDynamicCircleMarker(iconInfo);
            case MarkerTypeId.FontMarker: return Marker.CreateFontBasedMarker(iconInfo);
            case MarkerTypeId.RotatedImageMarker: return Marker.CreateRotatedImageMarker(iconInfo);
            case MarkerTypeId.RoundedImageMarker: return Marker.CreateRoundedImageMarker(iconInfo);
            case MarkerTypeId.ScaledImageMarker: return Marker.CreateScaledImageMarker(iconInfo);
            case MarkerTypeId.Custom: throw Error('Custom Marker Creators are not currently supported.');
        }
        throw Error('Unsupported marker type: ' + iconInfo.markerType);
    }
    /**
     * Obtains a shared img element for a marker icon to prevent unecessary creation of
     * DOM items. This has sped up large scale makers on Bing Maps by about 70%
     * \@memberof Marker
     * @param {?} icon - The icon string (url, data url, svg) for which to obtain the image.
     * @return {?} - The obtained image element.
     */
    static GetImageForMarker(icon) {
        if (icon == null || icon === '') {
            return null;
        }
        /** @type {?} */
        let img = null;
        img = Marker.ImageElementCache.get(icon);
        if (img != null) {
            return img;
        }
        if (typeof (document) !== 'undefined' && document != null) {
            img = document.createElement('img');
            img.src = icon;
            Marker.ImageElementCache.set(icon, img);
        }
        return img;
    }
    /**
     * Creates a canvased based marker using the point collection contained in the iconInfo parameter.
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - String with the data url for the marker image.
     *
     */
    static CreateCanvasMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for canvas markers.');
        }
        if (iconInfo == null || iconInfo.size == null || iconInfo.points == null) {
            throw Error('IMarkerIconInfo.size, and IMarkerIConInfo.points are required for canvas markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const c = document.createElement('canvas');
        /** @type {?} */
        const ctx = c.getContext('2d');
        c.width = iconInfo.size.width;
        c.height = iconInfo.size.height;
        if (iconInfo.rotation) {
            // Offset the canvas such that we will rotate around the center of our arrow
            ctx.translate(c.width * 0.5, c.height * 0.5);
            // Rotate the canvas by the desired heading
            ctx.rotate(iconInfo.rotation * Math.PI / 180);
            // Return the canvas offset back to it's original position
            ctx.translate(-c.width * 0.5, -c.height * 0.5);
        }
        ctx.fillStyle = iconInfo.color || 'red';
        // Draw a path in the shape of an arrow.
        ctx.beginPath();
        if (iconInfo.drawingOffset) {
            ctx.moveTo(iconInfo.drawingOffset.x, iconInfo.drawingOffset.y);
        }
        iconInfo.points.forEach((p) => { ctx.lineTo(p.x, p.y); });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        /** @type {?} */
        const s = c.toDataURL();
        if (iconInfo.id != null) {
            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
        }
        return s;
    }
    /**
     * Creates a circle marker image using information contained in the iconInfo parameter.
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - String with the data url for the marker image.
     *
     */
    static CreateDynamicCircleMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for dynamic circle markers.');
        }
        if (iconInfo == null || iconInfo.size == null) {
            throw Error('IMarkerIconInfo.size is required for dynamic circle markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const strokeWidth = iconInfo.strokeWidth || 0;
        /** @type {?} */
        const svg = [
            '<svg xmlns="http://www.w3.org/2000/svg" width="',
            iconInfo.size.width.toString(),
            '" height="',
            iconInfo.size.width.toString(),
            '"><circle cx="',
            (iconInfo.size.width / 2).toString(),
            '" cy="',
            (iconInfo.size.width / 2).toString(),
            '" r="',
            ((iconInfo.size.width / 2) - strokeWidth).toString(),
            '" stroke="',
            iconInfo.color || 'red',
            '" stroke-width="',
            strokeWidth.toString(),
            '" fill="',
            iconInfo.color || 'red',
            '"/></svg>'
        ];
        /** @type {?} */
        const s = svg.join('');
        if (iconInfo.id != null) {
            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
        }
        return s;
    }
    /**
     * Creates a font based marker image (such as Font-Awesome), by using information supplied in the parameters (such as Font-Awesome).
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - String with the data url for the marker image.
     *
     */
    static CreateFontBasedMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for font based markers');
        }
        if (iconInfo == null || iconInfo.fontName == null || iconInfo.fontSize == null) {
            throw Error('IMarkerIconInfo.fontName, IMarkerIconInfo.fontSize and IMarkerIConInfo.text are required for font based markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const c = document.createElement('canvas');
        /** @type {?} */
        const ctx = c.getContext('2d');
        /** @type {?} */
        const font = iconInfo.fontSize + 'px ' + iconInfo.fontName;
        ctx.font = font;
        /** @type {?} */
        const size = ctx.measureText(iconInfo.text);
        c.width = size.width;
        c.height = iconInfo.fontSize;
        if (iconInfo.rotation) {
            // Offset the canvas such that we will rotate around the center of our arrow
            ctx.translate(c.width * 0.5, c.height * 0.5);
            // Rotate the canvas by the desired heading
            ctx.rotate(iconInfo.rotation * Math.PI / 180);
            // Return the canvas offset back to it's original position
            ctx.translate(-c.width * 0.5, -c.height * 0.5);
        }
        // Reset font as it will be cleared by the resize.
        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = iconInfo.color || 'red';
        ctx.fillText(iconInfo.text, 0, 0);
        iconInfo.size = { width: c.width, height: c.height };
        /** @type {?} */
        const s = c.toDataURL();
        if (iconInfo.id != null) {
            Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
        }
        return s;
    }
    /**
     * Creates an image marker by applying a roation to a supplied image.
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - a string or a promise for a string containing
     * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
     *
     */
    static CreateRotatedImageMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for rotated image markers');
        }
        if (iconInfo == null || iconInfo.rotation == null || iconInfo.url == null) {
            throw Error('IMarkerIconInfo.rotation, IMarkerIconInfo.url are required for rotated image markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const image = new Image();
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            // Allow cross domain image editting.
            image.crossOrigin = 'anonymous';
            image.src = iconInfo.url;
            if (iconInfo.size) {
                image.width = iconInfo.size.width;
                image.height = iconInfo.size.height;
            }
            image.onload = function () {
                /** @type {?} */
                const c = document.createElement('canvas');
                /** @type {?} */
                const ctx = c.getContext('2d');
                /** @type {?} */
                const rads = iconInfo.rotation * Math.PI / 180;
                // Calculate rotated image size.
                c.width = Math.ceil(Math.abs(image.width * Math.cos(rads)) + Math.abs(image.height * Math.sin(rads)));
                c.height = Math.ceil(Math.abs(image.width * Math.sin(rads)) + Math.abs(image.height * Math.cos(rads)));
                // Move to the center of the canvas.
                ctx.translate(c.width / 2, c.height / 2);
                // Rotate the canvas to the specified angle in degrees.
                ctx.rotate(rads);
                // Draw the image, since the context is rotated, the image will be rotated also.
                ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
                iconInfo.size = { width: c.width, height: c.height };
                /** @type {?} */
                const s = c.toDataURL();
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                resolve({ icon: s, iconInfo: iconInfo });
            };
        });
        return promise;
    }
    /**
     * Creates a rounded image marker by applying a circle mask to a supplied image.
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - a string or a promise for a string containing
     * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
     *
     */
    static CreateRoundedImageMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for rounded image markers');
        }
        if (iconInfo == null || iconInfo.size == null || iconInfo.url == null) {
            throw Error('IMarkerIconInfo.size, IMarkerIconInfo.url are required for rounded image markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            /** @type {?} */
            const radius = iconInfo.size.width / 2;
            /** @type {?} */
            const image = new Image();
            /** @type {?} */
            const offset = iconInfo.drawingOffset || { x: 0, y: 0 };
            // Allow cross domain image editting.
            image.crossOrigin = 'anonymous';
            image.src = iconInfo.url;
            image.onload = function () {
                /** @type {?} */
                const c = document.createElement('canvas');
                /** @type {?} */
                const ctx = c.getContext('2d');
                c.width = iconInfo.size.width;
                c.height = iconInfo.size.width;
                // Draw a circle which can be used to clip the image, then draw the image.
                ctx.beginPath();
                ctx.arc(radius, radius, radius, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.clip();
                ctx.drawImage(image, offset.x, offset.y, iconInfo.size.width, iconInfo.size.width);
                iconInfo.size = { width: c.width, height: c.height };
                /** @type {?} */
                const s = c.toDataURL();
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                resolve({ icon: s, iconInfo: iconInfo });
            };
        });
        return promise;
    }
    /**
     * Creates a scaled image marker by scaling a supplied image by a factor using a canvas.
     *
     * @protected
     * \@memberof Marker
     * @param {?} iconInfo - {\@link IMarkerIconInfo} containing the information necessary to create the icon.
     * @return {?} - a string or a promise for a string containing
     * a data url with the marker image. In case of a cached image, the image will be returned, otherwise the promise.
     *
     */
    static CreateScaledImageMarker(iconInfo) {
        if (document == null) {
            throw Error('Document context (window.document) is required for scaled image markers');
        }
        if (iconInfo == null || iconInfo.scale == null || iconInfo.url == null) {
            throw Error('IMarkerIconInfo.scale, IMarkerIconInfo.url are required for scaled image markers.');
        }
        if (iconInfo.id != null && Marker.MarkerCache.has(iconInfo.id)) {
            /** @type {?} */
            const mi = Marker.MarkerCache.get(iconInfo.id);
            iconInfo.size = mi.markerSize;
            return mi.markerIconString;
        }
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            /** @type {?} */
            const image = new Image();
            // Allow cross domain image editting.
            image.crossOrigin = 'anonymous';
            image.src = iconInfo.url;
            image.onload = function () {
                /** @type {?} */
                const c = document.createElement('canvas');
                /** @type {?} */
                const ctx = c.getContext('2d');
                c.width = image.width * iconInfo.scale;
                c.height = image.height * iconInfo.scale;
                // Draw a circle which can be used to clip the image, then draw the image.
                ctx.drawImage(image, 0, 0, c.width, c.height);
                iconInfo.size = { width: c.width, height: c.height };
                /** @type {?} */
                const s = c.toDataURL();
                if (iconInfo.id != null) {
                    Marker.MarkerCache.set(iconInfo.id, { markerIconString: s, markerSize: iconInfo.size });
                }
                resolve({ icon: s, iconInfo: iconInfo });
            };
        });
        return promise;
    }
}
/**
 * Caches concrete img elements for marker icons to accelerate patining.
 *
 * \@memberof Marker
 */
Marker.ImageElementCache = new Map();
/**
 * Used to cache generated markers for performance and reusability.
 *
 * \@memberof Marker
 */
Marker.MarkerCache = new Map();
if (false) {
    /**
     * Caches concrete img elements for marker icons to accelerate patining.
     *
     * \@memberof Marker
     * @type {?}
     */
    Marker.ImageElementCache;
    /**
     * Used to cache generated markers for performance and reusability.
     *
     * \@memberof Marker
     * @type {?}
     */
    Marker.MarkerCache;
    /**
     * Indicates that the marker is the first marker in a set.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.IsFirst = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Marker.prototype.IsFirst = function (val) { };
    /**
     * Indicates that the marker is the last marker in the set.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.IsLast = function () { };
    /**
     * @abstract
     * @param {?} val
     * @return {?}
     */
    Marker.prototype.IsLast = function (val) { };
    /**
     * Gets the Location of the marker
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.Location = function () { };
    /**
     * Gets the marker metadata.
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.Metadata = function () { };
    /**
     * Gets the native primitve implementing the marker (e.g. Microsoft.Maps.Pushpin)
     *
     * \@readonly
     * @abstract
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.NativePrimitve = function () { };
    /**
     * Adds an event listener to the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} eventType - String containing the event for which to register the listener (e.g. "click")
     * @param {?} fn - Delegate invoked when the event occurs.
     *
     * @return {?}
     */
    Marker.prototype.AddListener = function (eventType, fn) { };
    /**
     * Deletes the marker.
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.DeleteMarker = function () { };
    /**
     * Gets the marker label
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.GetLabel = function () { };
    /**
     * Gets the marker visibility
     *
     * @abstract
     *
     * \@memberof Marker
     * @abstract
     * @return {?}
     */
    Marker.prototype.GetVisible = function () { };
    /**
     * Sets the anchor for the marker. Use this to adjust the root location for the marker to accomodate various marker image sizes.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} anchor - Point coordinates for the marker anchor.
     *
     * @return {?}
     */
    Marker.prototype.SetAnchor = function (anchor) { };
    /**
     * Sets the draggability of a marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} draggable - True to mark the marker as draggable, false otherwise.
     *
     * @return {?}
     */
    Marker.prototype.SetDraggable = function (draggable) { };
    /**
     * Sets the icon for the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} icon - String containing the icon in various forms (url, data url, etc.)
     *
     * @return {?}
     */
    Marker.prototype.SetIcon = function (icon) { };
    /**
     * Sets the marker label.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} label - String containing the label to set.
     *
     * @return {?}
     */
    Marker.prototype.SetLabel = function (label) { };
    /**
     * Sets the marker position.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} latLng - Geo coordinates to set the marker position to.
     *
     * @return {?}
     */
    Marker.prototype.SetPosition = function (latLng) { };
    /**
     * Sets the marker title.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} title - String containing the title to set.
     *
     * @return {?}
     */
    Marker.prototype.SetTitle = function (title) { };
    /**
     * Sets the marker options.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} options - {\@link IMarkerOptions} object containing the marker options to set. The supplied options are
     * merged with the underlying marker options.
     * @return {?}
     */
    Marker.prototype.SetOptions = function (options) { };
    /**
     * Sets the visiblilty of the marker.
     *
     * @abstract
     * \@memberof Marker
     * @abstract
     * @param {?} visible - Boolean which determines if the marker is visible or not.
     *
     * @return {?}
     */
    Marker.prototype.SetVisible = function (visible) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tYXBzLyIsInNvdXJjZXMiOlsic3JjL21vZGVscy9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCeEQsTUFBTTs7Ozs7Ozs7Ozs7O0lBa0NLLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBeUI7UUFDaEQsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0UsS0FBSyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RixLQUFLLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RSxLQUFLLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZGLEtBQUssWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkYsS0FBSyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRixLQUFLLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztTQUNoRztRQUNELE1BQU0sS0FBSyxDQUFDLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMs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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxhdExvbmcgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lsYXRsb25nJztcbmltcG9ydCB7IElNYXJrZXJPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgSU1hcmtlckljb25JbmZvIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbWFya2VyLWljb24taW5mbyc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb2ludCc7XG5pbXBvcnQgeyBJU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvaXNpemUnO1xuaW1wb3J0IHsgTWFya2VyVHlwZUlkIH0gZnJvbSAnLi4vbW9kZWxzL21hcmtlci10eXBlLWlkJztcblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZSBkZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYW4gaWNvbiBjYWNoZSBlbnRyeS5cbiAqL1xuaW50ZXJmYWNlIElNYXJrZXJJY29uQ2FjaGVFbnRyeSB7XG4gICAgLyoqXG4gICAgICogVGhlIGljb24gc3RyaW5nIG9mIHRoZSBjYWNoZSBlbnRyeS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJTWFya2VySWNvbkNhY2hlRW50cnlcbiAgICAgKi9cbiAgICBtYXJrZXJJY29uU3RyaW5nOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgU2l6ZSBvZiB0aGUgaWNvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBJTWFya2VySWNvbkNhY2hlRW50cnlcbiAgICAqICovXG4gICAgbWFya2VyU2l6ZTogSVNpemU7XG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSBjb250cmFjdCBmb3IgYSBtYXJrZXIuXG4gKlxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXJrZXIge1xuXG4gICAgLy8vXG4gICAgLy8vIEZpZWxkIGRlZmluaXRpb25zXG4gICAgLy8vXG5cbiAgICAvKipcbiAgICAgKiBDYWNoZXMgY29uY3JldGUgaW1nIGVsZW1lbnRzIGZvciBtYXJrZXIgaWNvbnMgdG8gYWNjZWxlcmF0ZSBwYXRpbmluZy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBJbWFnZUVsZW1lbnRDYWNoZTogTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4gPSBuZXcgTWFwPHN0cmluZywgSFRNTEltYWdlRWxlbWVudD4oKTtcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjYWNoZSBnZW5lcmF0ZWQgbWFya2VycyBmb3IgcGVyZm9ybWFuY2UgYW5kIHJldXNhYmlsaXR5LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIE1hcmtlckNhY2hlOiBNYXA8c3RyaW5nLCBJTWFya2VySWNvbkNhY2hlRW50cnk+ID0gbmV3IE1hcDxzdHJpbmcsIElNYXJrZXJJY29uQ2FjaGVFbnRyeT4oKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXJrZXIgYmFzZWQgb24gdGhlIG1hcmtlciBpbmZvLiBJbiB0dXJuIGNhbGxzIGEgbnVtYmVyIG9mIGludGVybmFsIG1lbWJlcnMgdG9cbiAgICAgKiBjcmVhdGUgdGhlIGFjdHVhbCBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSBpY29uIGluZm9ybWF0aW9uLiBEZXBlbmRpbmcgb24gdGhlIG1hcmtlciB0eXBlLCB2YXJpb3VzIHByb3BlcnRpZXNcbiAgICAgKiBuZWVkIHRvIGJlIHByZXNlbnQuIEZvciBwZXJmb3JtYW5jZSwgaXQgaXMgcmVjb21tZW5kZWQgdG8gdXNlIGFuIGlkIGZvciBtYXJrZXJzIHRoYXQgYXJlIGNvbW1vbiB0byBmYWNpbGl0YXRlXG4gICAgICogcmV1c2UuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBjYWxsYmFjayB0aGF0IGlzIGludm9rZWQgb24gbWFya2VycyB0aGF0IHJlcXVpcmUgYXN5bmNyb25vdXNcbiAgICAgKiBwcm9jZXNzaW5nIGR1cmluZyBjcmVhdGlvbi4gRm9yIG1hcmtlcnMgdGhhdCBkbyBub3QgcmVxdWlyZSBhc3luYyBwcm9jZXNzaW5nLCB0aGlzIHBhcmFtZXRlciBpcyBpZ25vcmVkLlxuICAgICAqIEByZXR1cm5zIC0gYSBzdHJpbmcgb3IgYSBwcm9taXNlIGZvciBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICogYSBkYXRhIHVybCB3aXRoIHRoZSBtYXJrZXIgaW1hZ2UuXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQ3JlYXRlTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmd8UHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4ge1xuICAgICAgICBzd2l0Y2ggKGljb25JbmZvLm1hcmtlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTWFya2VyVHlwZUlkLkNhbnZhc01hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVDYW52YXNNYXJrZXIoaWNvbkluZm8pO1xuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuRHluYW1pY0NpcmNsZU1hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVEeW5hbWljQ2lyY2xlTWFya2VyKGljb25JbmZvKTtcbiAgICAgICAgICAgIGNhc2UgTWFya2VyVHlwZUlkLkZvbnRNYXJrZXI6IHJldHVybiBNYXJrZXIuQ3JlYXRlRm9udEJhc2VkTWFya2VyKGljb25JbmZvKTtcbiAgICAgICAgICAgIGNhc2UgTWFya2VyVHlwZUlkLlJvdGF0ZWRJbWFnZU1hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVSb3RhdGVkSW1hZ2VNYXJrZXIoaWNvbkluZm8pO1xuICAgICAgICAgICAgY2FzZSBNYXJrZXJUeXBlSWQuUm91bmRlZEltYWdlTWFya2VyOiByZXR1cm4gTWFya2VyLkNyZWF0ZVJvdW5kZWRJbWFnZU1hcmtlcihpY29uSW5mbyk7XG4gICAgICAgICAgICBjYXNlIE1hcmtlclR5cGVJZC5TY2FsZWRJbWFnZU1hcmtlcjogcmV0dXJuIE1hcmtlci5DcmVhdGVTY2FsZWRJbWFnZU1hcmtlcihpY29uSW5mbyk7XG4gICAgICAgICAgICBjYXNlIE1hcmtlclR5cGVJZC5DdXN0b206IHRocm93IEVycm9yKCdDdXN0b20gTWFya2VyIENyZWF0b3JzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBFcnJvcignVW5zdXBwb3J0ZWQgbWFya2VyIHR5cGU6ICcgKyBpY29uSW5mby5tYXJrZXJUeXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIGEgc2hhcmVkIGltZyBlbGVtZW50IGZvciBhIG1hcmtlciBpY29uIHRvIHByZXZlbnQgdW5lY2Vzc2FyeSBjcmVhdGlvbiBvZlxuICAgICAqIERPTSBpdGVtcy4gVGhpcyBoYXMgc3BlZCB1cCBsYXJnZSBzY2FsZSBtYWtlcnMgb24gQmluZyBNYXBzIGJ5IGFib3V0IDcwJVxuICAgICAqIEBwYXJhbSBpY29uIC0gVGhlIGljb24gc3RyaW5nICh1cmwsIGRhdGEgdXJsLCBzdmcpIGZvciB3aGljaCB0byBvYnRhaW4gdGhlIGltYWdlLlxuICAgICAqIEByZXR1cm5zIC0gVGhlIG9idGFpbmVkIGltYWdlIGVsZW1lbnQuXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgR2V0SW1hZ2VGb3JNYXJrZXIoaWNvbjogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgICAgIGlmIChpY29uID09IG51bGwgfHwgaWNvbiA9PT0gJycgKSB7IHJldHVybiAgbnVsbDsgfVxuXG4gICAgICAgIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICBpbWcgPSBNYXJrZXIuSW1hZ2VFbGVtZW50Q2FjaGUuZ2V0KGljb24pO1xuICAgICAgICBpZiAoaW1nICE9IG51bGwpIHsgcmV0dXJuIGltZzsgfVxuXG4gICAgICAgIGlmICh0eXBlb2YoZG9jdW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBpY29uO1xuICAgICAgICAgICAgTWFya2VyLkltYWdlRWxlbWVudENhY2hlLnNldChpY29uLCBpbWcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhc2VkIGJhc2VkIG1hcmtlciB1c2luZyB0aGUgcG9pbnQgY29sbGVjdGlvbiBjb250YWluZWQgaW4gdGhlIGljb25JbmZvIHBhcmFtZXRlci5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxuICAgICAqIEByZXR1cm5zIC0gU3RyaW5nIHdpdGggdGhlIGRhdGEgdXJsIGZvciB0aGUgbWFya2VyIGltYWdlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGF0aWMgQ3JlYXRlQ2FudmFzTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZG9jdW1lbnQgPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignRG9jdW1lbnQgY29udGV4dCAod2luZG93LmRvY3VtZW50KSBpcyByZXF1aXJlZCBmb3IgY2FudmFzIG1hcmtlcnMuJyk7IH1cbiAgICAgICAgaWYgKGljb25JbmZvID09IG51bGwgfHwgaWNvbkluZm8uc2l6ZSA9PSBudWxsIHx8IGljb25JbmZvLnBvaW50cyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnNpemUsIGFuZCBJTWFya2VySUNvbkluZm8ucG9pbnRzIGFyZSByZXF1aXJlZCBmb3IgY2FudmFzIG1hcmtlcnMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGljb25JbmZvLmlkICE9IG51bGwgJiYgTWFya2VyLk1hcmtlckNhY2hlLmhhcyhpY29uSW5mby5pZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pOiBJTWFya2VySWNvbkNhY2hlRW50cnkgPSBNYXJrZXIuTWFya2VyQ2FjaGUuZ2V0KGljb25JbmZvLmlkKTtcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xuICAgICAgICAgICAgcmV0dXJuIG1pLm1hcmtlckljb25TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgYy53aWR0aCA9IGljb25JbmZvLnNpemUud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gaWNvbkluZm8uc2l6ZS5oZWlnaHQ7XG4gICAgICAgIGlmIChpY29uSW5mby5yb3RhdGlvbikge1xuICAgICAgICAgICAgLy8gT2Zmc2V0IHRoZSBjYW52YXMgc3VjaCB0aGF0IHdlIHdpbGwgcm90YXRlIGFyb3VuZCB0aGUgY2VudGVyIG9mIG91ciBhcnJvd1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjLndpZHRoICogMC41LCBjLmhlaWdodCAqIDAuNSk7XG4gICAgICAgICAgICAvLyBSb3RhdGUgdGhlIGNhbnZhcyBieSB0aGUgZGVzaXJlZCBoZWFkaW5nXG4gICAgICAgICAgICBjdHgucm90YXRlKGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGNhbnZhcyBvZmZzZXQgYmFjayB0byBpdCdzIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jLndpZHRoICogMC41LCAtYy5oZWlnaHQgKiAwLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGljb25JbmZvLmNvbG9yIHx8ICdyZWQnO1xuXG4gICAgICAgIC8vIERyYXcgYSBwYXRoIGluIHRoZSBzaGFwZSBvZiBhbiBhcnJvdy5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBpZiAoaWNvbkluZm8uZHJhd2luZ09mZnNldCkgeyBjdHgubW92ZVRvKGljb25JbmZvLmRyYXdpbmdPZmZzZXQueCwgaWNvbkluZm8uZHJhd2luZ09mZnNldC55KTsgfVxuICAgICAgICBpY29uSW5mby5wb2ludHMuZm9yRWFjaCgocDogSVBvaW50KSA9PiB7IGN0eC5saW5lVG8ocC54LCBwLnkpOyB9KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgY29uc3Qgczogc3RyaW5nID0gYy50b0RhdGFVUkwoKTtcbiAgICAgICAgaWYgKGljb25JbmZvLmlkICE9IG51bGwpIHsgTWFya2VyLk1hcmtlckNhY2hlLnNldChpY29uSW5mby5pZCwgeyBtYXJrZXJJY29uU3RyaW5nOiBzLCBtYXJrZXJTaXplOiBpY29uSW5mby5zaXplIH0pOyB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjaXJjbGUgbWFya2VyIGltYWdlIHVzaW5nIGluZm9ybWF0aW9uIGNvbnRhaW5lZCBpbiB0aGUgaWNvbkluZm8gcGFyYW1ldGVyLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIHtAbGluayBJTWFya2VySWNvbkluZm99IGNvbnRhaW5pbmcgdGhlIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhlIGljb24uXG4gICAgICogQHJldHVybnMgLSBTdHJpbmcgd2l0aCB0aGUgZGF0YSB1cmwgZm9yIHRoZSBtYXJrZXIgaW1hZ2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBDcmVhdGVEeW5hbWljQ2lyY2xlTWFya2VyKGljb25JbmZvOiBJTWFya2VySWNvbkluZm8pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZG9jdW1lbnQgPT0gbnVsbCkgeyB0aHJvdyBFcnJvcignRG9jdW1lbnQgY29udGV4dCAod2luZG93LmRvY3VtZW50KSBpcyByZXF1aXJlZCBmb3IgZHluYW1pYyBjaXJjbGUgbWFya2Vycy4nKTsgfVxuICAgICAgICBpZiAoaWNvbkluZm8gPT0gbnVsbCB8fCBpY29uSW5mby5zaXplID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ0lNYXJrZXJJY29uSW5mby5zaXplIGlzIHJlcXVpcmVkIGZvciBkeW5hbWljIGNpcmNsZSBtYXJrZXJzLicpOyB9XG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XG4gICAgICAgICAgICBpY29uSW5mby5zaXplID0gbWkubWFya2VyU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3Ryb2tlV2lkdGg6IG51bWJlciA9IGljb25JbmZvLnN0cm9rZVdpZHRoIHx8IDA7XG4gICAgICAgIC8vIENyZWF0ZSBhbiBTVkcgc3RyaW5nIG9mIGEgY2lyY2xlIHdpdGggdGhlIHNwZWNpZmllZCByYWRpdXMgYW5kIGNvbG9yLlxuICAgICAgICBjb25zdCBzdmc6IEFycmF5PHN0cmluZz4gPSBbXG4gICAgICAgICAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCInLFxuICAgICAgICAgICAgaWNvbkluZm8uc2l6ZS53aWR0aC50b1N0cmluZygpLFxuICAgICAgICAgICAgJ1wiIGhlaWdodD1cIicsXG4gICAgICAgICAgICBpY29uSW5mby5zaXplLndpZHRoLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnXCI+PGNpcmNsZSBjeD1cIicsXG4gICAgICAgICAgICAoaWNvbkluZm8uc2l6ZS53aWR0aCAvIDIpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnXCIgY3k9XCInLFxuICAgICAgICAgICAgKGljb25JbmZvLnNpemUud2lkdGggLyAyKS50b1N0cmluZygpLFxuICAgICAgICAgICAgJ1wiIHI9XCInLFxuICAgICAgICAgICAgKChpY29uSW5mby5zaXplLndpZHRoIC8gMikgLSBzdHJva2VXaWR0aCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICdcIiBzdHJva2U9XCInLFxuICAgICAgICAgICAgaWNvbkluZm8uY29sb3IgfHwgJ3JlZCcsXG4gICAgICAgICAgICAnXCIgc3Ryb2tlLXdpZHRoPVwiJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnXCIgZmlsbD1cIicsXG4gICAgICAgICAgICBpY29uSW5mby5jb2xvciB8fCAncmVkJyxcbiAgICAgICAgICAgICdcIi8+PC9zdmc+J1xuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IHN2Zy5qb2luKCcnKTtcbiAgICAgICAgaWYgKGljb25JbmZvLmlkICE9IG51bGwpIHsgTWFya2VyLk1hcmtlckNhY2hlLnNldChpY29uSW5mby5pZCwgeyBtYXJrZXJJY29uU3RyaW5nOiBzLCBtYXJrZXJTaXplOiBpY29uSW5mby5zaXplIH0pOyB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBmb250IGJhc2VkIG1hcmtlciBpbWFnZSAoc3VjaCBhcyBGb250LUF3ZXNvbWUpLCBieSB1c2luZyBpbmZvcm1hdGlvbiBzdXBwbGllZCBpbiB0aGUgcGFyYW1ldGVycyAoc3VjaCBhcyBGb250LUF3ZXNvbWUpLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIHtAbGluayBJTWFya2VySWNvbkluZm99IGNvbnRhaW5pbmcgdGhlIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhlIGljb24uXG4gICAgICogQHJldHVybnMgLSBTdHJpbmcgd2l0aCB0aGUgZGF0YSB1cmwgZm9yIHRoZSBtYXJrZXIgaW1hZ2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBDcmVhdGVGb250QmFzZWRNYXJrZXIoaWNvbkluZm86IElNYXJrZXJJY29uSW5mbyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChkb2N1bWVudCA9PSBudWxsKSB7IHRocm93IEVycm9yKCdEb2N1bWVudCBjb250ZXh0ICh3aW5kb3cuZG9jdW1lbnQpIGlzIHJlcXVpcmVkIGZvciBmb250IGJhc2VkIG1hcmtlcnMnKTsgfVxuICAgICAgICBpZiAoaWNvbkluZm8gPT0gbnVsbCB8fCBpY29uSW5mby5mb250TmFtZSA9PSBudWxsIHx8IGljb25JbmZvLmZvbnRTaXplID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdJTWFya2VySWNvbkluZm8uZm9udE5hbWUsIElNYXJrZXJJY29uSW5mby5mb250U2l6ZSBhbmQgSU1hcmtlcklDb25JbmZvLnRleHQgYXJlIHJlcXVpcmVkIGZvciBmb250IGJhc2VkIG1hcmtlcnMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGljb25JbmZvLmlkICE9IG51bGwgJiYgTWFya2VyLk1hcmtlckNhY2hlLmhhcyhpY29uSW5mby5pZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pOiBJTWFya2VySWNvbkNhY2hlRW50cnkgPSBNYXJrZXIuTWFya2VyQ2FjaGUuZ2V0KGljb25JbmZvLmlkKTtcbiAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSBtaS5tYXJrZXJTaXplO1xuICAgICAgICAgICAgcmV0dXJuIG1pLm1hcmtlckljb25TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY29uc3QgZm9udDogc3RyaW5nID0gaWNvbkluZm8uZm9udFNpemUgKyAncHggJyArIGljb25JbmZvLmZvbnROYW1lO1xuICAgICAgICBjdHguZm9udCA9IGZvbnQ7XG5cbiAgICAgICAgLy8gUmVzaXplIGNhbnZhcyBiYXNlZCBvbiBzaWUgb2YgdGV4dC5cbiAgICAgICAgY29uc3Qgc2l6ZTogVGV4dE1ldHJpY3MgPSBjdHgubWVhc3VyZVRleHQoaWNvbkluZm8udGV4dCk7XG4gICAgICAgIGMud2lkdGggPSBzaXplLndpZHRoO1xuICAgICAgICBjLmhlaWdodCA9IGljb25JbmZvLmZvbnRTaXplO1xuXG4gICAgICAgIGlmIChpY29uSW5mby5yb3RhdGlvbikge1xuICAgICAgICAgICAgLy8gT2Zmc2V0IHRoZSBjYW52YXMgc3VjaCB0aGF0IHdlIHdpbGwgcm90YXRlIGFyb3VuZCB0aGUgY2VudGVyIG9mIG91ciBhcnJvd1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjLndpZHRoICogMC41LCBjLmhlaWdodCAqIDAuNSk7XG4gICAgICAgICAgICAvLyBSb3RhdGUgdGhlIGNhbnZhcyBieSB0aGUgZGVzaXJlZCBoZWFkaW5nXG4gICAgICAgICAgICBjdHgucm90YXRlKGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGNhbnZhcyBvZmZzZXQgYmFjayB0byBpdCdzIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jLndpZHRoICogMC41LCAtYy5oZWlnaHQgKiAwLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgZm9udCBhcyBpdCB3aWxsIGJlIGNsZWFyZWQgYnkgdGhlIHJlc2l6ZS5cbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBpY29uSW5mby5jb2xvciB8fCAncmVkJztcblxuICAgICAgICBjdHguZmlsbFRleHQoaWNvbkluZm8udGV4dCwgMCwgMCk7XG4gICAgICAgIGljb25JbmZvLnNpemUgPSB7IHdpZHRoOiBjLndpZHRoLCBoZWlnaHQ6IGMuaGVpZ2h0IH07XG4gICAgICAgIGNvbnN0IHM6IHN0cmluZyA9IGMudG9EYXRhVVJMKCk7XG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsKSB7IE1hcmtlci5NYXJrZXJDYWNoZS5zZXQoaWNvbkluZm8uaWQsIHsgbWFya2VySWNvblN0cmluZzogcywgbWFya2VyU2l6ZTogaWNvbkluZm8uc2l6ZSB9KTsgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGltYWdlIG1hcmtlciBieSBhcHBseWluZyBhIHJvYXRpb24gdG8gYSBzdXBwbGllZCBpbWFnZS5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxuICAgICAqIEByZXR1cm5zIC0gYSBzdHJpbmcgb3IgYSBwcm9taXNlIGZvciBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICogYSBkYXRhIHVybCB3aXRoIHRoZSBtYXJrZXIgaW1hZ2UuIEluIGNhc2Ugb2YgYSBjYWNoZWQgaW1hZ2UsIHRoZSBpbWFnZSB3aWxsIGJlIHJldHVybmVkLCBvdGhlcndpc2UgdGhlIHByb21pc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBDcmVhdGVSb3RhdGVkSW1hZ2VNYXJrZXIoaWNvbkluZm86IElNYXJrZXJJY29uSW5mbyk6IHN0cmluZ3xQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PiB7XG4gICAgICAgIGlmIChkb2N1bWVudCA9PSBudWxsKSB7IHRocm93IEVycm9yKCdEb2N1bWVudCBjb250ZXh0ICh3aW5kb3cuZG9jdW1lbnQpIGlzIHJlcXVpcmVkIGZvciByb3RhdGVkIGltYWdlIG1hcmtlcnMnKTsgfVxuICAgICAgICBpZiAoaWNvbkluZm8gPT0gbnVsbCB8fCBpY29uSW5mby5yb3RhdGlvbiA9PSBudWxsIHx8IGljb25JbmZvLnVybCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSU1hcmtlckljb25JbmZvLnJvdGF0aW9uLCBJTWFya2VySWNvbkluZm8udXJsIGFyZSByZXF1aXJlZCBmb3Igcm90YXRlZCBpbWFnZSBtYXJrZXJzLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XG4gICAgICAgICAgICBpY29uSW5mby5zaXplID0gbWkubWFya2VyU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4gPVxuICAgICAgICAgICAgbmV3IFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIEFsbG93IGNyb3NzIGRvbWFpbiBpbWFnZSBlZGl0dGluZy5cbiAgICAgICAgICAgIGltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBpY29uSW5mby51cmw7XG4gICAgICAgICAgICBpZiAoaWNvbkluZm8uc2l6ZSkge1xuICAgICAgICAgICAgICAgIGltYWdlLndpZHRoID0gaWNvbkluZm8uc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSBpY29uSW5mby5zaXplLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhZHM6IG51bWJlciA9IGljb25JbmZvLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MDtcblxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSByb3RhdGVkIGltYWdlIHNpemUuXG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IE1hdGguY2VpbChNYXRoLmFicyhpbWFnZS53aWR0aCAqIE1hdGguY29zKHJhZHMpKSArIE1hdGguYWJzKGltYWdlLmhlaWdodCAqIE1hdGguc2luKHJhZHMpKSk7XG4gICAgICAgICAgICAgICAgYy5oZWlnaHQgPSBNYXRoLmNlaWwoTWF0aC5hYnMoaW1hZ2Uud2lkdGggKiBNYXRoLnNpbihyYWRzKSkgKyBNYXRoLmFicyhpbWFnZS5oZWlnaHQgKiBNYXRoLmNvcyhyYWRzKSkpO1xuXG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgY2VudGVyIG9mIHRoZSBjYW52YXMuXG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShjLndpZHRoIC8gMiwgYy5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGUgdGhlIGNhbnZhcyB0byB0aGUgc3BlY2lmaWVkIGFuZ2xlIGluIGRlZ3JlZXMuXG4gICAgICAgICAgICAgICAgY3R4LnJvdGF0ZShyYWRzKTtcbiAgICAgICAgICAgICAgICAvLyBEcmF3IHRoZSBpbWFnZSwgc2luY2UgdGhlIGNvbnRleHQgaXMgcm90YXRlZCwgdGhlIGltYWdlIHdpbGwgYmUgcm90YXRlZCBhbHNvLlxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC1pbWFnZS53aWR0aCAvIDIsIC1pbWFnZS5oZWlnaHQgLyAyLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBpY29uSW5mby5zaXplID0geyB3aWR0aDogYy53aWR0aCwgaGVpZ2h0OiBjLmhlaWdodCB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgczogc3RyaW5nID0gYy50b0RhdGFVUkwoKTtcbiAgICAgICAgICAgICAgICBpZiAoaWNvbkluZm8uaWQgIT0gbnVsbCkgeyBNYXJrZXIuTWFya2VyQ2FjaGUuc2V0KGljb25JbmZvLmlkLCB7IG1hcmtlckljb25TdHJpbmc6IHMsIG1hcmtlclNpemU6IGljb25JbmZvLnNpemUgfSk7IH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHtpY29uOiBzLCBpY29uSW5mbzogaWNvbkluZm99KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcm91bmRlZCBpbWFnZSBtYXJrZXIgYnkgYXBwbHlpbmcgYSBjaXJjbGUgbWFzayB0byBhIHN1cHBsaWVkIGltYWdlLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIHtAbGluayBJTWFya2VySWNvbkluZm99IGNvbnRhaW5pbmcgdGhlIGluZm9ybWF0aW9uIG5lY2Vzc2FyeSB0byBjcmVhdGUgdGhlIGljb24uXG4gICAgICogQHBhcmFtIGljb25JbmZvIC0gQ2FsbGJhY2sgaW52b2tlZCBvbmNlIG1hcmtlciBnZW5lcmF0aW9uIGlzIGNvbXBsZXRlLiBUaGUgY2FsbGJhY2tcbiAgICAgKiBwYXJhbWV0ZXJzIGFyZSB0aGUgZGF0YSB1cmkgYW5kIHRoZSBJTWFya2VySWNvbkluZm8uXG4gICAgICogQHJldHVybnMgLSBhIHN0cmluZyBvciBhIHByb21pc2UgZm9yIGEgc3RyaW5nIGNvbnRhaW5pbmdcbiAgICAgKiBhIGRhdGEgdXJsIHdpdGggdGhlIG1hcmtlciBpbWFnZS4gSW4gY2FzZSBvZiBhIGNhY2hlZCBpbWFnZSwgdGhlIGltYWdlIHdpbGwgYmUgcmV0dXJuZWQsIG90aGVyd2lzZSB0aGUgcHJvbWlzZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGljIENyZWF0ZVJvdW5kZWRJbWFnZU1hcmtlcihpY29uSW5mbzogSU1hcmtlckljb25JbmZvKTogc3RyaW5nfFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50ID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ0RvY3VtZW50IGNvbnRleHQgKHdpbmRvdy5kb2N1bWVudCkgaXMgcmVxdWlyZWQgZm9yIHJvdW5kZWQgaW1hZ2UgbWFya2VycycpOyB9XG4gICAgICAgIGlmIChpY29uSW5mbyA9PSBudWxsIHx8IGljb25JbmZvLnNpemUgPT0gbnVsbCB8fCBpY29uSW5mby51cmwgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0lNYXJrZXJJY29uSW5mby5zaXplLCBJTWFya2VySWNvbkluZm8udXJsIGFyZSByZXF1aXJlZCBmb3Igcm91bmRlZCBpbWFnZSBtYXJrZXJzLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XG4gICAgICAgICAgICBpY29uSW5mby5zaXplID0gbWkubWFya2VyU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZTogUHJvbWlzZTx7aWNvbjogc3RyaW5nLCBpY29uSW5mbzogSU1hcmtlckljb25JbmZvfT4gPVxuICAgICAgICAgICAgbmV3IFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGl1czogbnVtYmVyID0gaWNvbkluZm8uc2l6ZS53aWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0OiBJUG9pbnQgPSBpY29uSW5mby5kcmF3aW5nT2Zmc2V0IHx8IHsgeDogMCwgeTogMCB9O1xuXG4gICAgICAgICAgICAvLyBBbGxvdyBjcm9zcyBkb21haW4gaW1hZ2UgZWRpdHRpbmcuXG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaWNvbkluZm8udXJsO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IGljb25JbmZvLnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgYy5oZWlnaHQgPSBpY29uSW5mby5zaXplLndpZHRoO1xuXG4gICAgICAgICAgICAgICAgLy8gRHJhdyBhIGNpcmNsZSB3aGljaCBjYW4gYmUgdXNlZCB0byBjbGlwIHRoZSBpbWFnZSwgdGhlbiBkcmF3IHRoZSBpbWFnZS5cbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyhyYWRpdXMsIHJhZGl1cywgcmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBvZmZzZXQueCwgb2Zmc2V0LnksIGljb25JbmZvLnNpemUud2lkdGgsIGljb25JbmZvLnNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSB7IHdpZHRoOiBjLndpZHRoLCBoZWlnaHQ6IGMuaGVpZ2h0IH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzOiBzdHJpbmcgPSBjLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsKSB7IE1hcmtlci5NYXJrZXJDYWNoZS5zZXQoaWNvbkluZm8uaWQsIHsgbWFya2VySWNvblN0cmluZzogcywgbWFya2VyU2l6ZTogaWNvbkluZm8uc2l6ZSB9KTsgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoe2ljb246IHMsIGljb25JbmZvOiBpY29uSW5mb30pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzY2FsZWQgaW1hZ2UgbWFya2VyIGJ5IHNjYWxpbmcgYSBzdXBwbGllZCBpbWFnZSBieSBhIGZhY3RvciB1c2luZyBhIGNhbnZhcy5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcGFyYW0gaWNvbkluZm8gLSB7QGxpbmsgSU1hcmtlckljb25JbmZvfSBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBuZWNlc3NhcnkgdG8gY3JlYXRlIHRoZSBpY29uLlxuICAgICAqIEBwYXJhbSBpY29uSW5mbyAtIENhbGxiYWNrIGludm9rZWQgb25jZSBtYXJrZXIgZ2VuZXJhdGlvbiBpcyBjb21wbGV0ZS4gVGhlIGNhbGxiYWNrXG4gICAgICogcGFyYW1ldGVycyBhcmUgdGhlIGRhdGEgdXJpIGFuZCB0aGUgSU1hcmtlckljb25JbmZvLlxuICAgICAqIEByZXR1cm5zIC0gYSBzdHJpbmcgb3IgYSBwcm9taXNlIGZvciBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICogYSBkYXRhIHVybCB3aXRoIHRoZSBtYXJrZXIgaW1hZ2UuIEluIGNhc2Ugb2YgYSBjYWNoZWQgaW1hZ2UsIHRoZSBpbWFnZSB3aWxsIGJlIHJldHVybmVkLCBvdGhlcndpc2UgdGhlIHByb21pc2UuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBDcmVhdGVTY2FsZWRJbWFnZU1hcmtlcihpY29uSW5mbzogSU1hcmtlckljb25JbmZvKTogc3RyaW5nfFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50ID09IG51bGwpIHsgdGhyb3cgRXJyb3IoJ0RvY3VtZW50IGNvbnRleHQgKHdpbmRvdy5kb2N1bWVudCkgaXMgcmVxdWlyZWQgZm9yIHNjYWxlZCBpbWFnZSBtYXJrZXJzJyk7IH1cbiAgICAgICAgaWYgKGljb25JbmZvID09IG51bGwgfHwgaWNvbkluZm8uc2NhbGUgPT0gbnVsbCB8fCBpY29uSW5mby51cmwgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0lNYXJrZXJJY29uSW5mby5zY2FsZSwgSU1hcmtlckljb25JbmZvLnVybCBhcmUgcmVxdWlyZWQgZm9yIHNjYWxlZCBpbWFnZSBtYXJrZXJzLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsICYmIE1hcmtlci5NYXJrZXJDYWNoZS5oYXMoaWNvbkluZm8uaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBtaTogSU1hcmtlckljb25DYWNoZUVudHJ5ID0gTWFya2VyLk1hcmtlckNhY2hlLmdldChpY29uSW5mby5pZCk7XG4gICAgICAgICAgICBpY29uSW5mby5zaXplID0gbWkubWFya2VyU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBtaS5tYXJrZXJJY29uU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb21pc2U6IFByb21pc2U8e2ljb246IHN0cmluZywgaWNvbkluZm86IElNYXJrZXJJY29uSW5mb30+ID1cbiAgICAgICAgICAgIG5ldyBQcm9taXNlPHtpY29uOiBzdHJpbmcsIGljb25JbmZvOiBJTWFya2VySWNvbkluZm99PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICAvLyBBbGxvdyBjcm9zcyBkb21haW4gaW1hZ2UgZWRpdHRpbmcuXG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaWNvbkluZm8udXJsO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgICAgYy53aWR0aCA9IGltYWdlLndpZHRoICogaWNvbkluZm8uc2NhbGU7XG4gICAgICAgICAgICAgICAgYy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiBpY29uSW5mby5zY2FsZTtcblxuICAgICAgICAgICAgICAgIC8vIERyYXcgYSBjaXJjbGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY2xpcCB0aGUgaW1hZ2UsIHRoZW4gZHJhdyB0aGUgaW1hZ2UuXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGljb25JbmZvLnNpemUgPSB7IHdpZHRoOiBjLndpZHRoLCBoZWlnaHQ6IGMuaGVpZ2h0IH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzOiBzdHJpbmcgPSBjLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgICAgIGlmIChpY29uSW5mby5pZCAhPSBudWxsKSB7IE1hcmtlci5NYXJrZXJDYWNoZS5zZXQoaWNvbkluZm8uaWQsIHsgbWFya2VySWNvblN0cmluZzogcywgbWFya2VyU2l6ZTogaWNvbkluZm8uc2l6ZSB9KTsgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoe2ljb246IHMsIGljb25JbmZvOiBpY29uSW5mb30pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8vL1xuICAgIC8vLyBQcm9wZXJ0eSBkZWZpbml0aW9uc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgZmlyc3QgbWFya2VyIGluIGEgc2V0LlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgSXNGaXJzdCgpOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgSXNGaXJzdCh2YWw6IGJvb2xlYW4pO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIG1hcmtlciBpcyB0aGUgbGFzdCBtYXJrZXIgaW4gdGhlIHNldC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IElzTGFzdCgpOiBib29sZWFuO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBzZXQgSXNMYXN0KHZhbDogYm9vbGVhbik7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBMb2NhdGlvbiBvZiB0aGUgbWFya2VyXG4gICAgICpcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IGdldCBMb2NhdGlvbigpOiBJTGF0TG9uZztcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1hcmtlciBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE1ldGFkYXRhKCk6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYXRpdmUgcHJpbWl0dmUgaW1wbGVtZW50aW5nIHRoZSBtYXJrZXIgKGUuZy4gTWljcm9zb2Z0Lk1hcHMuUHVzaHBpbilcbiAgICAgKlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0IE5hdGl2ZVByaW1pdHZlKCk6IGFueTtcblxuICAgIC8vL1xuICAgIC8vLyBQdWJsaWMgbWV0aG9kc1xuICAgIC8vL1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGV2ZW50VHlwZSAtIFN0cmluZyBjb250YWluaW5nIHRoZSBldmVudCBmb3Igd2hpY2ggdG8gcmVnaXN0ZXIgdGhlIGxpc3RlbmVyIChlLmcuIFwiY2xpY2tcIilcbiAgICAgKiBAcGFyYW0gZm4gLSBEZWxlZ2F0ZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgQWRkTGlzdGVuZXIoZXZlbnRUeXBlOiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgRGVsZXRlTWFya2VyKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgbGFiZWxcbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRMYWJlbCgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXJrZXIgdmlzaWJpbGl0eVxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IEdldFZpc2libGUoKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFuY2hvciBmb3IgdGhlIG1hcmtlci4gVXNlIHRoaXMgdG8gYWRqdXN0IHRoZSByb290IGxvY2F0aW9uIGZvciB0aGUgbWFya2VyIHRvIGFjY29tb2RhdGUgdmFyaW91cyBtYXJrZXIgaW1hZ2Ugc2l6ZXMuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gYW5jaG9yIC0gUG9pbnQgY29vcmRpbmF0ZXMgZm9yIHRoZSBtYXJrZXIgYW5jaG9yLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRBbmNob3IoYW5jaG9yOiBJUG9pbnQpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZHJhZ2dhYmlsaXR5IG9mIGEgbWFya2VyLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGRyYWdnYWJsZSAtIFRydWUgdG8gbWFyayB0aGUgbWFya2VyIGFzIGRyYWdnYWJsZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGljb24gZm9yIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gaWNvbiAtIFN0cmluZyBjb250YWluaW5nIHRoZSBpY29uIGluIHZhcmlvdXMgZm9ybXMgKHVybCwgZGF0YSB1cmwsIGV0Yy4pXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldEljb24oaWNvbjogc3RyaW5nKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEBwYXJhbSBsYWJlbCAtIFN0cmluZyBjb250YWluaW5nIHRoZSBsYWJlbCB0byBzZXQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgTWFya2VyXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IFNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbWFya2VyIHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIGxhdExuZyAtIEdlbyBjb29yZGluYXRlcyB0byBzZXQgdGhlIG1hcmtlciBwb3NpdGlvbiB0by5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0UG9zaXRpb24obGF0TG5nOiBJTGF0TG9uZyk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBtYXJrZXIgdGl0bGUuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gdGl0bGUgLSBTdHJpbmcgY29udGFpbmluZyB0aGUgdGl0bGUgdG8gc2V0LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRUaXRsZSh0aXRsZTogc3RyaW5nKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIG1hcmtlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSB7QGxpbmsgSU1hcmtlck9wdGlvbnN9IG9iamVjdCBjb250YWluaW5nIHRoZSBtYXJrZXIgb3B0aW9ucyB0byBzZXQuIFRoZSBzdXBwbGllZCBvcHRpb25zIGFyZVxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSB1bmRlcmx5aW5nIG1hcmtlciBvcHRpb25zLlxuICAgICAqIEBtZW1iZXJvZiBNYXJrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYWJzdHJhY3QgU2V0T3B0aW9ucyhvcHRpb25zOiBJTWFya2VyT3B0aW9ucyk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2aXNpYmxpbHR5IG9mIHRoZSBtYXJrZXIuXG4gICAgICpcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcGFyYW0gdmlzaWJsZSAtIEJvb2xlYW4gd2hpY2ggZGV0ZXJtaW5lcyBpZiB0aGUgbWFya2VyIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIE1hcmtlclxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBTZXRWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkO1xuXG59XG4iXX0=