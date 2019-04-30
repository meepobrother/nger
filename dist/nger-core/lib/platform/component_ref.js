Object.defineProperty(exports, "__esModule", { value: true });
class ComponentRef {
    constructor(_injector, _instance, 
    // todo
    _changeDetectorRef, _componentType) {
        this._injector = _injector;
        this._instance = _instance;
        this._changeDetectorRef = _changeDetectorRef;
        this._componentType = _componentType;
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
    get location() {
        return this._location;
    }
    get hostView() {
        return this._hostView;
    }
    get changeDetectorRef() {
        return this._changeDetectorRef;
    }
    destroy() { }
    onDestroy(callback) { }
}
exports.ComponentRef = ComponentRef;
