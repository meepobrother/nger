// 测试文件

Object.defineProperty(exports, "__esModule", { value: true });
function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, (...args) => ({
            ...config(...args),
            type,
        }));
    }
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, () => ({ type }));
        case 'props':
            return defineType(type, (props) => ({
                ...props,
                type,
            }));
        default:
            throw new Error('Unexpected config.');
    }
}
exports.createAction = createAction;
function props() {
    return { _as: 'props', _p: undefined };
}
exports.props = props;
function union(creators) {
    return undefined;
}
exports.union = union;
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}

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

Object.defineProperty(exports, "__esModule", { value: true });
var action_creator_1 = require("./action_creator");
exports.createAction = action_creator_1.createAction;
exports.props = action_creator_1.props;
exports.union = action_creator_1.union;
var store_1 = require("./store");
exports.Store = store_1.Store;
exports.select = store_1.select;
var utils_1 = require("./utils");
exports.combineReducers = utils_1.combineReducers;
exports.compose = utils_1.compose;
exports.createReducerFactory = utils_1.createReducerFactory;
var actions_subject_1 = require("./actions_subject");
exports.ActionsSubject = actions_subject_1.ActionsSubject;
exports.INIT = actions_subject_1.INIT;
var reducer_manager_1 = require("./reducer_manager");
exports.ReducerManager = reducer_manager_1.ReducerManager;
exports.ReducerObservable = reducer_manager_1.ReducerObservable;
exports.ReducerManagerDispatcher = reducer_manager_1.ReducerManagerDispatcher;
exports.UPDATE = reducer_manager_1.UPDATE;
var scanned_actions_subject_1 = require("./scanned_actions_subject");
exports.ScannedActionsSubject = scanned_actions_subject_1.ScannedActionsSubject;
var selector_1 = require("./selector");
exports.createSelector = selector_1.createSelector;
exports.createSelectorFactory = selector_1.createSelectorFactory;
exports.createFeatureSelector = selector_1.createFeatureSelector;
exports.defaultMemoize = selector_1.defaultMemoize;
exports.defaultStateFn = selector_1.defaultStateFn;
exports.resultMemoize = selector_1.resultMemoize;
var state_1 = require("./state");
exports.State = state_1.State;
exports.StateObservable = state_1.StateObservable;
exports.reduceState = state_1.reduceState;
var tokens_1 = require("./tokens");
exports.INITIAL_STATE = tokens_1.INITIAL_STATE;
exports.REDUCER_FACTORY = tokens_1.REDUCER_FACTORY;
exports.INITIAL_REDUCERS = tokens_1.INITIAL_REDUCERS;
exports.STORE_FEATURES = tokens_1.STORE_FEATURES;
exports.META_REDUCERS = tokens_1.META_REDUCERS;
exports.FEATURE_REDUCERS = tokens_1.FEATURE_REDUCERS;
exports.USER_PROVIDED_META_REDUCERS = tokens_1.USER_PROVIDED_META_REDUCERS;
var store_module_1 = require("./store_module");
exports.StoreModule = store_module_1.StoreModule;
exports.StoreRootModule = store_module_1.StoreRootModule;
exports.StoreFeatureModule = store_module_1.StoreFeatureModule;
var reducer_creator_1 = require("./reducer_creator");
exports.on = reducer_creator_1.on;
exports.createReducer = reducer_creator_1.createReducer;

Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
function on(...args) {
    const reducer = args.pop();
    const types = args.reduce((result, creator) => [...result, creator.type], []);
    return { reducer, types };
}
exports.on = on;
function createReducer(initialState, ...ons) {
    const map = new Map();
    const devMode = nger_core_1.isDevMode();
    for (let on of ons) {
        for (let type of on.types) {
            if (devMode && map.has(type)) {
                console.warn(`@ngrx/store: The provided action type '${type}' is already provided.`);
            }
            map.set(type, on.reducer);
        }
    }
    return function (state = initialState, action) {
        const reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    };
}
exports.createReducer = createReducer;

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

Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const meta_reducers_1 = require("./meta-reducers");
const tokens_1 = require("./tokens");
function createActiveRuntimeChecks(runtimeChecks) {
    if (nger_core_1.isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return {
            strictStateSerializability: false,
            strictActionSerializability: false,
            strictImmutability: false,
            ...runtimeChecks,
        };
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictImmutability: false,
    };
}
exports.createActiveRuntimeChecks = createActiveRuntimeChecks;
function createStateSerializationCheckMetaReducer({ strictStateSerializability, }) {
    return reducer => strictStateSerializability
        ? meta_reducers_1.stateSerializationCheckMetaReducer(reducer)
        : reducer;
}
exports.createStateSerializationCheckMetaReducer = createStateSerializationCheckMetaReducer;
function createActionSerializationCheckMetaReducer({ strictActionSerializability, }) {
    return reducer => strictActionSerializability
        ? meta_reducers_1.actionSerializationCheckMetaReducer(reducer)
        : reducer;
}
exports.createActionSerializationCheckMetaReducer = createActionSerializationCheckMetaReducer;
function createImmutabilityCheckMetaReducer({ strictImmutability, }) {
    return reducer => strictImmutability ? meta_reducers_1.immutabilityCheckMetaReducer(reducer) : reducer;
}
exports.createImmutabilityCheckMetaReducer = createImmutabilityCheckMetaReducer;
function provideRuntimeChecks(runtimeChecks) {
    return [
        {
            provide: tokens_1._USER_RUNTIME_CHECKS,
            useValue: runtimeChecks,
        },
        {
            provide: tokens_1._ACTIVE_RUNTIME_CHECKS,
            deps: [tokens_1._USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createStateSerializationCheckMetaReducer,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createActionSerializationCheckMetaReducer,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
    ];
}
exports.provideRuntimeChecks = provideRuntimeChecks;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
let ScannedActionsSubject = class ScannedActionsSubject extends rxjs_1.Subject {
    ngOnDestroy() {
        this.complete();
    }
};
ScannedActionsSubject = tslib_1.__decorate([
    nger_core_1.Injectable()
], ScannedActionsSubject);
exports.ScannedActionsSubject = ScannedActionsSubject;
exports.SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];

Object.defineProperty(exports, "__esModule", { value: true });
function isEqualCheck(a, b) {
    return a === b;
}
exports.isEqualCheck = isEqualCheck;
function isArgumentsChanged(args, lastArguments, comparator) {
    for (let i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}
function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
exports.resultMemoize = resultMemoize;
function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
    let lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    let lastResult = null;
    let overrideResult;
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    function setResult(result = undefined) {
        overrideResult = result;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        lastArguments = arguments;
        const newResult = projectionFn.apply(null, arguments);
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset, setResult };
}
exports.defaultMemoize = defaultMemoize;
function createSelector(...input) {
    return createSelectorFactory(defaultMemoize)(...input);
}
exports.createSelector = createSelector;
function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        const args = selectors.map(fn => fn(state));
        return memoizedProjector.memoized.apply(null, args);
    }
    const args = selectors.map(fn => fn(state, props));
    return memoizedProjector.memoized.apply(null, [...args, props]);
}
exports.defaultStateFn = defaultStateFn;
function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn,
}) {
    return function (...input) {
        let args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        const selectors = args.slice(0, args.length - 1);
        const projector = args[args.length - 1];
        const memoizedSelectors = selectors.filter((selector) => selector.release && typeof selector.release === 'function');
        const memoizedProjector = memoize(function (...selectors) {
            return projector.apply(null, selectors);
        });
        const memoizedState = defaultMemoize(function (state, props) {
            return options.stateFn.apply(null, [
                state,
                selectors,
                props,
                memoizedProjector,
            ]);
        });
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach(selector => selector.release());
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
        });
    };
}
exports.createSelectorFactory = createSelectorFactory;
function createFeatureSelector(featureName) {
    return createSelector((state) => state[featureName], (featureState) => featureState);
}
exports.createFeatureSelector = createFeatureSelector;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const actions_subject_1 = require("./actions_subject");
const reducer_manager_1 = require("./reducer_manager");
const scanned_actions_subject_1 = require("./scanned_actions_subject");
const tokens_1 = require("./tokens");
class StateObservable extends rxjs_1.Observable {
}
exports.StateObservable = StateObservable;
let State = class State extends rxjs_1.BehaviorSubject {
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        const actionsOnQueue$ = actions$.pipe(operators_1.observeOn(rxjs_1.queueScheduler));
        const withLatestReducer$ = actionsOnQueue$.pipe(operators_1.withLatestFrom(reducer$));
        const seed = { state: initialState };
        const stateAndAction$ = withLatestReducer$.pipe(operators_1.scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe({
            next: ({ state, action }) => {
                this.next(state);
                scannedActions.next(action);
            },
            error: err => this.error(err),
        });
    }
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
};
State.INIT = actions_subject_1.INIT;
State = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(3, nger_core_1.Inject(tokens_1.INITIAL_STATE)),
    tslib_1.__metadata("design:paramtypes", [actions_subject_1.ActionsSubject,
        reducer_manager_1.ReducerObservable,
        scanned_actions_subject_1.ScannedActionsSubject, Object])
], State);
exports.State = State;
function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
exports.reduceState = reduceState;
exports.STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
const utils_1 = require("./utils");
const tokens_1 = require("./tokens");
const actions_subject_1 = require("./actions_subject");
const reducer_manager_1 = require("./reducer_manager");
const scanned_actions_subject_1 = require("./scanned_actions_subject");
const state_1 = require("./state");
const store_1 = require("./store");
const runtime_checks_1 = require("./runtime_checks");
let StoreRootModule = class StoreRootModule {
    constructor(
    // actions$: ActionsSubject,
    // reducer$: ReducerObservable,
    // scannedActions$: ScannedActionsSubject,
    // store: Store<any>
    ) { }
};
StoreRootModule = tslib_1.__decorate([
    nger_core_1.NgModule({}),
    tslib_1.__metadata("design:paramtypes", [])
], StoreRootModule);
exports.StoreRootModule = StoreRootModule;
let StoreFeatureModule = class StoreFeatureModule {
    constructor(features, featureReducers, reducerManager, root) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        const feats = features.map((feature, index) => {
            const featureReducerCollection = featureReducers.shift();
            const reducers = featureReducerCollection /*TODO(#823)*/[index];
            return {
                ...feature,
                reducers,
                initialState: _initialStateFactory(feature.initialState),
            };
        });
        reducerManager.addFeatures(feats);
    }
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
};
StoreFeatureModule = tslib_1.__decorate([
    nger_core_1.NgModule({}),
    tslib_1.__param(0, nger_core_1.Inject(tokens_1._STORE_FEATURES)),
    tslib_1.__param(1, nger_core_1.Inject(tokens_1.FEATURE_REDUCERS)),
    tslib_1.__metadata("design:paramtypes", [Array, Array, reducer_manager_1.ReducerManager,
        StoreRootModule])
], StoreFeatureModule);
exports.StoreFeatureModule = StoreFeatureModule;
let StoreModule = class StoreModule {
    static forRoot(reducers, config = {}) {
        return {
            ngModule: StoreRootModule,
            providers: [
                { provide: tokens_1._INITIAL_STATE, useValue: config.initialState },
                {
                    provide: tokens_1.INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [tokens_1._INITIAL_STATE],
                },
                { provide: tokens_1._INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: tokens_1._STORE_REDUCERS,
                    useExisting: reducers instanceof nger_di_1.InjectionToken ? reducers : tokens_1._INITIAL_REDUCERS,
                },
                {
                    provide: tokens_1.INITIAL_REDUCERS,
                    deps: [nger_di_1.Injector, tokens_1._INITIAL_REDUCERS],
                    useFactory: _createStoreReducers,
                },
                {
                    provide: tokens_1.USER_PROVIDED_META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: tokens_1._RESOLVED_META_REDUCERS,
                    deps: [tokens_1.META_REDUCERS, tokens_1.USER_PROVIDED_META_REDUCERS],
                    useFactory: _concatMetaReducers,
                },
                {
                    provide: tokens_1._REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : utils_1.combineReducers,
                },
                {
                    provide: tokens_1.REDUCER_FACTORY,
                    deps: [tokens_1._REDUCER_FACTORY, tokens_1._RESOLVED_META_REDUCERS],
                    useFactory: utils_1.createReducerFactory,
                },
                ...actions_subject_1.ACTIONS_SUBJECT_PROVIDERS,
                ...reducer_manager_1.REDUCER_MANAGER_PROVIDERS,
                ...scanned_actions_subject_1.SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                ...state_1.STATE_PROVIDERS,
                ...store_1.STORE_PROVIDERS,
                ...runtime_checks_1.provideRuntimeChecks(config.runtimeChecks),
            ],
        };
    }
    static forFeature(featureName, reducers, config = {}) {
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: tokens_1._FEATURE_CONFIGS,
                    multi: true,
                    useValue: config,
                },
                {
                    provide: tokens_1.STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureName,
                        reducerFactory: !(config instanceof nger_di_1.InjectionToken) && config.reducerFactory
                            ? config.reducerFactory
                            : utils_1.combineReducers,
                        metaReducers: !(config instanceof nger_di_1.InjectionToken) && config.metaReducers
                            ? config.metaReducers
                            : [],
                        initialState: !(config instanceof nger_di_1.InjectionToken) && config.initialState
                            ? config.initialState
                            : undefined,
                    },
                },
                {
                    provide: tokens_1._STORE_FEATURES,
                    deps: [nger_di_1.Injector, tokens_1._FEATURE_CONFIGS, tokens_1.STORE_FEATURES],
                    useFactory: _createFeatureStore,
                },
                { provide: tokens_1._FEATURE_REDUCERS, multi: true, useValue: reducers },
                {
                    provide: tokens_1._FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducers instanceof nger_di_1.InjectionToken ? reducers : tokens_1._FEATURE_REDUCERS,
                },
                {
                    provide: tokens_1.FEATURE_REDUCERS,
                    multi: true,
                    deps: [
                        nger_di_1.Injector,
                        tokens_1._FEATURE_REDUCERS
                    ],
                    useFactory: _createFeatureReducers,
                },
            ],
        };
    }
};
StoreModule = tslib_1.__decorate([
    nger_core_1.NgModule({})
], StoreModule);
exports.StoreModule = StoreModule;
function _createStoreReducers(injector, reducers) {
    return reducers instanceof nger_di_1.InjectionToken ? injector.get(reducers) : reducers;
}
exports._createStoreReducers = _createStoreReducers;
function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map((feat, index) => {
        if (configs[index] instanceof nger_di_1.InjectionToken) {
            const conf = injector.get(configs[index]);
            return {
                key: feat.key,
                reducerFactory: conf.reducerFactory
                    ? conf.reducerFactory
                    : utils_1.combineReducers,
                metaReducers: conf.metaReducers ? conf.metaReducers : [],
                initialState: conf.initialState,
            };
        }
        return feat;
    });
}
exports._createFeatureStore = _createFeatureStore;
function _createFeatureReducers(injector, reducerCollection) {
    const reducers = reducerCollection.map(reducer => {
        return reducer instanceof nger_di_1.InjectionToken ? injector.get(reducer) : reducer;
    });
    return reducers;
}
exports._createFeatureReducers = _createFeatureReducers;
function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}
exports._initialStateFactory = _initialStateFactory;
function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
    return metaReducers.concat(userProvidedMetaReducers);
}
exports._concatMetaReducers = _concatMetaReducers;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports._INITIAL_STATE = new nger_di_1.InjectionToken('@ngrx/store Internal Initial State');
exports.INITIAL_STATE = new nger_di_1.InjectionToken('@ngrx/store Initial State');
exports.REDUCER_FACTORY = new nger_di_1.InjectionToken('@ngrx/store Reducer Factory');
exports._REDUCER_FACTORY = new nger_di_1.InjectionToken('@ngrx/store Internal Reducer Factory Provider');
exports.INITIAL_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Initial Reducers');
exports._INITIAL_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Initial Reducers');
exports.STORE_FEATURES = new nger_di_1.InjectionToken('@ngrx/store Store Features');
exports._STORE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Store Reducers');
exports._FEATURE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Reducers');
exports._FEATURE_CONFIGS = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Configs');
exports._STORE_FEATURES = new nger_di_1.InjectionToken('@ngrx/store Internal Store Features');
exports._FEATURE_REDUCERS_TOKEN = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Reducers Token');
exports.FEATURE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Feature Reducers');
/**
 * User-defined meta reducers from StoreModule.forRoot()
 */
exports.USER_PROVIDED_META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store User Provided Meta Reducers');
/**
 * Meta reducers defined either internally by @ngrx/store or by library authors
 */
exports.META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Meta Reducers');
/**
 * Concats the user provided meta reducers and the meta reducers provided on the multi
 * injection token
 */
exports._RESOLVED_META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
/**
 * Runtime checks defined by the user
 */
exports._USER_RUNTIME_CHECKS = new nger_di_1.InjectionToken('@ngrx/store Internal User Runtime Checks Config');
/**
 * Runtime checks currently in use
 */
exports._ACTIVE_RUNTIME_CHECKS = new nger_di_1.InjectionToken('@ngrx/store Internal Runetime Checks');

Object.defineProperty(exports, "__esModule", { value: true });
function combineReducers(reducers, initialState = {}) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    const finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        state = state === undefined ? initialState : state;
        let hasChanged = false;
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
exports.combineReducers = combineReducers;
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter(key => key !== keyToRemove)
        .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
}
exports.omit = omit;
function compose(...functions) {
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        const last = functions[functions.length - 1];
        const rest = functions.slice(0, -1);
        return rest.reduceRight((composed, fn) => fn(composed), last(arg));
    };
}
exports.compose = compose;
function createReducerFactory(reducerFactory, metaReducers) {
    if (Array.isArray(metaReducers) && metaReducers.length > 0) {
        reducerFactory = compose.apply(null, [
            ...metaReducers,
            reducerFactory,
        ]);
    }
    return (reducers, initialState) => {
        const reducer = reducerFactory(reducers);
        return (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        };
    };
}
exports.createReducerFactory = createReducerFactory;
function createFeatureReducerFactory(metaReducers) {
    const reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose(...metaReducers)
        : (r) => r;
    return (reducer, initialState) => {
        reducer = reducerFactory(reducer);
        return (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        };
    };
}
exports.createFeatureReducerFactory = createFeatureReducerFactory;

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function actionSerializationCheckMetaReducer(reducer) {
    return function (state, action) {
        const unserializable = utils_1.getUnserializable(action);
        utils_1.throwIfUnserializable(unserializable, 'action');
        return reducer(state, action);
    };
}
exports.actionSerializationCheckMetaReducer = actionSerializationCheckMetaReducer;

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function immutabilityCheckMetaReducer(reducer) {
    return function (state, action) {
        const nextState = reducer(state, freeze(action));
        return freeze(nextState);
    };
}
exports.immutabilityCheckMetaReducer = immutabilityCheckMetaReducer;
function freeze(target) {
    Object.freeze(target);
    const targetIsFunction = utils_1.isFunction(target);
    Object.getOwnPropertyNames(target).forEach(prop => {
        const propValue = target[prop];
        if (utils_1.hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true) &&
            (utils_1.isObjectLike(propValue) || utils_1.isFunction(propValue)) &&
            !Object.isFrozen(propValue)) {
            freeze(propValue);
        }
    });
    return target;
}

Object.defineProperty(exports, "__esModule", { value: true });
var state_serialization_reducer_1 = require("./state_serialization_reducer");
exports.stateSerializationCheckMetaReducer = state_serialization_reducer_1.stateSerializationCheckMetaReducer;
var action_serialization_reducer_1 = require("./action_serialization_reducer");
exports.actionSerializationCheckMetaReducer = action_serialization_reducer_1.actionSerializationCheckMetaReducer;
var immutability_reducer_1 = require("./immutability_reducer");
exports.immutabilityCheckMetaReducer = immutability_reducer_1.immutabilityCheckMetaReducer;

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function stateSerializationCheckMetaReducer(reducer) {
    return function (state, action) {
        const nextState = reducer(state, action);
        const unserializable = utils_1.getUnserializable(nextState);
        utils_1.throwIfUnserializable(unserializable, 'state');
        return nextState;
    };
}
exports.stateSerializationCheckMetaReducer = stateSerializationCheckMetaReducer;

Object.defineProperty(exports, "__esModule", { value: true });
function getUnserializable(target, path = []) {
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    const keys = Object.keys(target);
    return keys.reduce((result, key) => {
        if (result) {
            return result;
        }
        const value = target[key];
        if (isUndefined(value) ||
            isNull(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            isString(value) ||
            isArray(value)) {
            return false;
        }
        if (isPlainObject(value)) {
            return getUnserializable(value, [...path, key]);
        }
        return {
            path: [...path, key],
            value,
        };
    }, false);
}
exports.getUnserializable = getUnserializable;
function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    const unserializablePath = unserializable.path.join('.');
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}"`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
exports.throwIfUnserializable = throwIfUnserializable;
/**
 * Object Utilities
 */
function isUndefined(target) {
    return target === undefined;
}
exports.isUndefined = isUndefined;
function isNull(target) {
    return target === null;
}
exports.isNull = isNull;
function isArray(target) {
    return Array.isArray(target);
}
exports.isArray = isArray;
function isString(target) {
    return typeof target === 'string';
}
exports.isString = isString;
function isBoolean(target) {
    return typeof target === 'boolean';
}
exports.isBoolean = isBoolean;
function isNumber(target) {
    return typeof target === 'number';
}
exports.isNumber = isNumber;
function isObjectLike(target) {
    return typeof target === 'object' && target !== null;
}
exports.isObjectLike = isObjectLike;
function isObject(target) {
    return isObjectLike(target) && !isArray(target);
}
exports.isObject = isObject;
function isPlainObject(target) {
    if (!isObject(target)) {
        return false;
    }
    const targetPrototype = Object.getPrototypeOf(target);
    return targetPrototype === Object.prototype || targetPrototype === null;
}
exports.isPlainObject = isPlainObject;
function isFunction(target) {
    return typeof target === 'function';
}
exports.isFunction = isFunction;
function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}
exports.hasOwnProperty = hasOwnProperty;
