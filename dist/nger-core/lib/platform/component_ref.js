"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComponentRef {
    constructor(_injector, _instance, 
    // todo
    _changeDetectorRef, _componentType, _props) {
        this._injector = _injector;
        this._instance = _instance;
        this._changeDetectorRef = _changeDetectorRef;
        this._componentType = _componentType;
        this._props = _props;
    }
    get injector() {
        return this._injector;
    }
    get instance() {
        return this._instance;
    }
    get componentType() {
        return this._componentType;
    }
    get component() {
        return this._component;
    }
    // 路径
    get location() {
        return this._location;
    }
    // 挂载的dom 只有在特定环境下有效
    get hostView() {
        return this._hostView;
    }
    get changeDetectorRef() {
        return this._changeDetectorRef;
    }
    get $ngOnChange() {
        return this._props;
    }
    destroy() { }
    onDestroy(callback) { }
}
exports.ComponentRef = ComponentRef;
