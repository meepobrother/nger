Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
exports.INIT = '@ngrx/store/init';
let ActionsSubject = class ActionsSubject extends rxjs_1.BehaviorSubject {
    constructor() {
        super({ type: exports.INIT });
    }
    next(action) {
        if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    complete() {
        /* noop */
    }
    ngOnDestroy() {
        super.complete();
    }
};
ActionsSubject = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ActionsSubject);
exports.ActionsSubject = ActionsSubject;
exports.ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
