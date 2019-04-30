Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
let RouterOutlet = class RouterOutlet {
    constructor(store) {
        this.store = store;
        // 当前激活的组件
        this.activated = null;
        this.store.select(nger_store_1.select('nger-router')).subscribe(res => {
        });
    }
    ngOnInit() {
        this.store.dispatch({
            type: ``,
            payload: {}
        });
    }
    ngOnDestroy() { }
    get component() {
        if (!this.activated)
            throw new Error('Outlet is not activated');
        return this.activated.instance;
    }
};
RouterOutlet = tslib_1.__decorate([
    nger_core_1.Directive({
        selector: `router-outlet`,
        exportAs: 'outlet'
    }),
    tslib_1.__metadata("design:paramtypes", [nger_store_1.Store])
], RouterOutlet);
exports.RouterOutlet = RouterOutlet;
