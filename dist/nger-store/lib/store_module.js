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
