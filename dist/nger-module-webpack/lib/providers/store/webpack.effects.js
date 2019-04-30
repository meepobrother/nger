Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_effects_1 = require("nger-effects");
let WebpackEffects = class WebpackEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        this.actions$.subscribe(res => {
        });
    }
};
WebpackEffects = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_effects_1.Actions])
], WebpackEffects);
exports.WebpackEffects = WebpackEffects;
