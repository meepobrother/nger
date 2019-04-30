Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Store_1;
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const actions_subject_1 = require("./actions_subject");
const reducer_manager_1 = require("./reducer_manager");
const state_1 = require("./state");
let Store = Store_1 = class Store extends rxjs_1.Observable {
    constructor(state$, actionsObserver, reducerManager) {
        super();
        this.actionsObserver = actionsObserver;
        this.reducerManager = reducerManager;
        this.source = state$;
    }
    select(pathOrMapFn, ...paths) {
        return select.call(null, pathOrMapFn, ...paths)(this);
    }
    lift(operator) {
        const store = new Store_1(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    }
    dispatch(action) {
        this.actionsObserver.next(action);
    }
    next(action) {
        this.actionsObserver.next(action);
    }
    error(err) {
        this.actionsObserver.error(err);
    }
    complete() {
        this.actionsObserver.complete();
    }
    addReducer(key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    }
    removeReducer(key) {
        this.reducerManager.removeReducer(key);
    }
};
Store = Store_1 = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [state_1.StateObservable,
        actions_subject_1.ActionsSubject,
        reducer_manager_1.ReducerManager])
], Store);
exports.Store = Store;
exports.STORE_PROVIDERS = [Store];
function select(pathOrMapFn, propsOrPath, ...paths) {
    return function selectOperator(source$) {
        let mapped$;
        if (typeof pathOrMapFn === 'string') {
            const pathSlices = [propsOrPath, ...paths].filter(Boolean);
            mapped$ = source$.pipe(operators_1.pluck(pathOrMapFn, ...pathSlices));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(operators_1.map(source => pathOrMapFn(source, propsOrPath)));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(operators_1.distinctUntilChanged());
    };
}
exports.select = select;
