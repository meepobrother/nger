"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectionToken {
    constructor(_desc, options) {
        this._desc = _desc;
        this.options = options;
        this.ngMetadataName = 'InjectionToken';
        this.name = this._desc;
        if (typeof options == 'number') {
            this.__NG_ELEMENT_ID__ = options;
        }
        else if (options !== undefined) { }
    }
    toString() { return `InjectionToken ${this._desc}`; }
}
exports.InjectionToken = InjectionToken;
