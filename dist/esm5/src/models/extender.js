/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Extender = /** @class */ (function () {
    function Extender(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extender.prototype.Extend = /**
     * @param {?} newObj
     * @return {?}
     */
    function (newObj) {
        this.Set('prototype', newObj, this._obj);
        for (var y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    };
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Extender.prototype.Set = /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    function (property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    };
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Extender.prototype.Map = /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    function (property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    };
    return Extender;
}());
export { Extender };
if (false) {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFBO0lBS0ksa0JBQVksR0FBUTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7S0FDL0I7Ozs7O0lBRUQseUJBQU07Ozs7SUFBTixVQUFPLE1BQVc7UUFFZCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEdBQUcsQ0FBQyxDQUFDLElBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEU7U0FDSjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7OztJQUVELHNCQUFHOzs7Ozs7SUFBSCxVQUFJLFFBQWdCLEVBQUUsTUFBVyxFQUFFLEdBQVM7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEOzs7Ozs7SUFFRCxzQkFBRzs7Ozs7SUFBSCxVQUFJLFFBQWdCLEVBQUUsV0FBbUI7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjttQkF0Q0w7SUF1Q0MsQ0FBQTtBQXZDRCxvQkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXh0ZW5kZXIge1xuXG4gICAgcHJpdmF0ZSBfb2JqOiBhbnk7XG4gICAgcHJpdmF0ZSBfcHJvdG86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcbiAgICAgICAgdGhpcy5fcHJvdG8gPSBvYmoucHJvdG90eXBlO1xuICAgIH1cblxuICAgIEV4dGVuZChuZXdPYmo6IGFueSk6IEV4dGVuZGVyIHtcblxuICAgICAgICB0aGlzLlNldCgncHJvdG90eXBlJywgbmV3T2JqLCB0aGlzLl9vYmopO1xuXG4gICAgICAgIGZvciAoY29uc3QgeSBpbiB0aGlzLl9wcm90bykge1xuICAgICAgICAgICAgaWYgKCg8YW55PnRoaXMuX3Byb3RvKVt5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TZXQoeSwgKHRoaXMuX3Byb3RvKVt5XSwgKDxhbnk+dGhpcy5fb2JqLnByb3RvdHlwZSlbeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgU2V0KHByb3BlcnR5OiBzdHJpbmcsIG5ld09iajogYW55LCBvYmo/OiBhbnkpOiBFeHRlbmRlciB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3T2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3Byb3RvO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcGVydHksIG5ld09iaik7XG4gICAgfVxuXG4gICAgTWFwKHByb3BlcnR5OiBzdHJpbmcsIG5ld1Byb3BlcnR5OiBzdHJpbmcpOiBFeHRlbmRlciB7XG4gICAgICAgIHRoaXMuU2V0KHByb3BlcnR5LCB0aGlzLl9wcm90b1tuZXdQcm9wZXJ0eV0sIHRoaXMuX29iai5wcm90b3R5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59Il19