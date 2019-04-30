Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
const actions_subject_1 = require("./actions_subject");
const tokens_1 = require("./tokens");
const utils_1 = require("./utils");
class ReducerObservable extends rxjs_1.Observable {
}
exports.ReducerObservable = ReducerObservable;
class ReducerManagerDispatcher extends actions_subject_1.ActionsSubject {
}
exports.ReducerManagerDispatcher = ReducerManagerDispatcher;
exports.UPDATE = '@ngrx/store/update-reducers';
let ReducerManager = class ReducerManager extends rxjs_1.BehaviorSubject {
    constructor(dispatcher, initialState, reducers, reducerFactory) {
        super(reducerFactory(reducers, initialState));
        this.dispatcher = dispatcher;
        this.initialState = initialState;
        this.reducers = reducers;
        this.reducerFactory = reducerFactory;
    }
    addFeature(feature) {
        this.addFeatures([feature]);
    }
    addFeatures(features) {
        const reducers = features.reduce((reducerDict, { reducers, reducerFactory, metaReducers, initialState, key }) => {
            const reducer = typeof reducers === 'function'
                ? utils_1.createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : utils_1.createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }, {});
        this.addReducers(reducers);
    }
    removeFeature(feature) {
        this.removeFeatures([feature]);
    }
    removeFeatures(features) {
        this.removeReducers(features.map(p => p.key));
    }
    addReducer(key, reducer) {
        this.addReducers({ [key]: reducer });
    }
    addReducers(reducers) {
        this.reducers = { ...this.reducers, ...reducers };
        this.updateReducers(Object.keys(reducers));
    }
    removeReducer(featureKey) {
        this.removeReducers([featureKey]);
    }
    removeReducers(featureKeys) {
        featureKeys.forEach(key => {
            this.reducers = utils_1.omit(this.reducers, key) /*TODO(#823)*/;
        });
        this.updateReducers(featureKeys);
    }
    updateReducers(featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({
            type: exports.UPDATE,
            features: featureKeys,
        });
    }
    ngOnDestroy() {
        this.complete();
    }
};
ReducerManager = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(1, nger_core_1.Inject(tokens_1.INITIAL_STATE)),
    tslib_1.__param(2, nger_core_1.Inject(tokens_1.INITIAL_REDUCERS)),
    tslib_1.__param(3, nger_core_1.Inject(tokens_1.REDUCER_FACTORY)),
    tslib_1.__metadata("design:paramtypes", [ReducerManagerDispatcher, Object, Object, Function])
], ReducerManager);
exports.ReducerManager = ReducerManager;
exports.REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: actions_subject_1.ActionsSubject },
];
