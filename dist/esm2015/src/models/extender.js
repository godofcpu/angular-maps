/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class Extender {
    /**
     * @param {?} obj
     */
    constructor(obj) {
        this._obj = obj;
        this._proto = obj.prototype;
    }
    /**
     * @param {?} newObj
     * @return {?}
     */
    Extend(newObj) {
        this.Set('prototype', newObj, this._obj);
        for (const y in this._proto) {
            if ((/** @type {?} */ (this._proto))[y] != null) {
                this.Set(y, (this._proto)[y], (/** @type {?} */ (this._obj.prototype))[y]);
            }
        }
        return this;
    }
    /**
     * @param {?} property
     * @param {?} newObj
     * @param {?=} obj
     * @return {?}
     */
    Set(property, newObj, obj) {
        if (typeof newObj === 'undefined') {
            return this;
        }
        if (typeof obj === 'undefined') {
            obj = this._proto;
        }
        Object.defineProperty(obj, property, newObj);
    }
    /**
     * @param {?} property
     * @param {?} newProperty
     * @return {?}
     */
    Map(property, newProperty) {
        this.Set(property, this._proto[newProperty], this._obj.prototype);
        return this;
    }
}
if (false) {
    /** @type {?} */
    Extender.prototype._obj;
    /** @type {?} */
    Extender.prototype._proto;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1hcHMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2V4dGVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNOzs7O0lBS0YsWUFBWSxHQUFRO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztLQUMvQjs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBVztRQUVkLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsbUJBQU0sSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRTtTQUNKO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7O0lBRUQsR0FBRyxDQUFDLFFBQWdCLEVBQUUsTUFBVyxFQUFFLEdBQVM7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEOzs7Ozs7SUFFRCxHQUFHLENBQUMsUUFBZ0IsRUFBRSxXQUFtQjtRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXh0ZW5kZXIge1xuXG4gICAgcHJpdmF0ZSBfb2JqOiBhbnk7XG4gICAgcHJpdmF0ZSBfcHJvdG86IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMuX29iaiA9IG9iajtcbiAgICAgICAgdGhpcy5fcHJvdG8gPSBvYmoucHJvdG90eXBlO1xuICAgIH1cblxuICAgIEV4dGVuZChuZXdPYmo6IGFueSk6IEV4dGVuZGVyIHtcblxuICAgICAgICB0aGlzLlNldCgncHJvdG90eXBlJywgbmV3T2JqLCB0aGlzLl9vYmopO1xuXG4gICAgICAgIGZvciAoY29uc3QgeSBpbiB0aGlzLl9wcm90bykge1xuICAgICAgICAgICAgaWYgKCg8YW55PnRoaXMuX3Byb3RvKVt5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5TZXQoeSwgKHRoaXMuX3Byb3RvKVt5XSwgKDxhbnk+dGhpcy5fb2JqLnByb3RvdHlwZSlbeV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgU2V0KHByb3BlcnR5OiBzdHJpbmcsIG5ld09iajogYW55LCBvYmo/OiBhbnkpOiBFeHRlbmRlciB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3T2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9iaiA9IHRoaXMuX3Byb3RvO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcGVydHksIG5ld09iaik7XG4gICAgfVxuXG4gICAgTWFwKHByb3BlcnR5OiBzdHJpbmcsIG5ld1Byb3BlcnR5OiBzdHJpbmcpOiBFeHRlbmRlciB7XG4gICAgICAgIHRoaXMuU2V0KHByb3BlcnR5LCB0aGlzLl9wcm90b1tuZXdQcm9wZXJ0eV0sIHRoaXMuX29iai5wcm90b3R5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59Il19