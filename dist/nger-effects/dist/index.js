Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var Actions_1;
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let Actions = Actions_1 = class Actions extends rxjs_1.Observable {
    constructor(source) {
        super();
        if (source) {
            this.source = source;
        }
    }
    lift(operator) {
        const observable = new Actions_1();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
};
Actions = Actions_1 = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(0, nger_core_1.Inject(nger_store_1.ScannedActionsSubject)),
    tslib_1.__metadata("design:paramtypes", [rxjs_1.Observable])
], Actions);
exports.Actions = Actions;
function ofType(...allowedTypes) {
    return operators_1.filter((action) => allowedTypes.some(typeOrActionCreator => {
        if (typeof typeOrActionCreator === 'string') {
            // Comparing the string to type
            return typeOrActionCreator === action.type;
        }
        // We are filtering by ActionCreator
        return typeOrActionCreator.type === action.type;
    }));
}
exports.ofType = ofType;

Object.defineProperty(exports, "__esModule", { value: true });
const CREATE_EFFECT_METADATA_KEY = '__@ngrx/effects_create__';
function createEffect(source, { dispatch = true } = {}) {
    const effect = source();
    Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
        value: {
            dispatch,
        },
    });
    return effect;
}
exports.createEffect = createEffect;
function getCreateEffectMetadata(instance) {
    const propertyNames = Object.getOwnPropertyNames(instance);
    const metadata = propertyNames
        .filter(propertyName => instance[propertyName] &&
        instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY))
        .map(propertyName => {
        const metaData = instance[propertyName][CREATE_EFFECT_METADATA_KEY];
        return {
            propertyName,
            ...metaData,
        };
    });
    return metadata;
}
exports.getCreateEffectMetadata = getCreateEffectMetadata;

Object.defineProperty(exports, "__esModule", { value: true });
const nger_store_1 = require("nger-store");
const utils_1 = require("./utils");
const METADATA_KEY = '__@ngrx/effects__';
function Effect(dispatch = true) {
    return function (target, propertyName) {
        const metadata = { propertyName, dispatch };
        setEffectMetadataEntries(target, [metadata]);
    };
}
exports.Effect = Effect;
function getEffectDecoratorMetadata(instance) {
    const effectsDecorators = nger_store_1.compose(getEffectMetadataEntries, utils_1.getSourceForInstance)(instance);
    return effectsDecorators;
}
exports.getEffectDecoratorMetadata = getEffectDecoratorMetadata;
function setEffectMetadataEntries(sourceProto, entries) {
    const constructor = sourceProto.constructor;
    const meta = constructor.hasOwnProperty(METADATA_KEY)
        ? constructor[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
    Array.prototype.push.apply(meta, entries);
}
function getEffectMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
        ? sourceProto.constructor[METADATA_KEY]
        : [];
}

Object.defineProperty(exports, "__esModule", { value: true });
function verifyOutput(output, reporter) {
    reportErrorThrown(output, reporter);
    reportInvalidActions(output, reporter);
}
exports.verifyOutput = verifyOutput;
function reportErrorThrown(output, reporter) {
    if (output.notification.kind === 'E') {
        reporter.handleError(output.notification.error);
    }
}
function reportInvalidActions(output, reporter) {
    if (output.notification.kind === 'N') {
        const action = output.notification.value;
        const isInvalidAction = !isAction(action);
        if (isInvalidAction) {
            reporter.handleError(new Error(`Effect ${getEffectName(output)} dispatched an invalid action: ${stringify(action)}`));
        }
    }
}
function isAction(action) {
    return action && action.type && typeof action.type === 'string';
}
function getEffectName({ propertyName, sourceInstance, sourceName, }) {
    const isMethod = typeof sourceInstance[propertyName] === 'function';
    return `"${sourceName}.${propertyName}${isMethod ? '()' : ''}"`;
}
function stringify(action) {
    try {
        return JSON.stringify(action);
    }
    catch {
        return action;
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const effect_notification_1 = require("./effect_notification");
const effects_resolver_1 = require("./effects_resolver");
const lifecycle_hooks_1 = require("./lifecycle_hooks");
const utils_1 = require("./utils");
let EffectSources = class EffectSources extends rxjs_1.Subject {
    constructor(errorHandler, store) {
        super();
        this.errorHandler = errorHandler;
        this.store = store;
    }
    addEffects(effectSourceInstance) {
        this.next(effectSourceInstance);
        if (lifecycle_hooks_1.onInitEffects in effectSourceInstance &&
            typeof effectSourceInstance[lifecycle_hooks_1.onInitEffects] === 'function') {
            this.store.dispatch(effectSourceInstance[lifecycle_hooks_1.onInitEffects]());
        }
    }
    /**
     * @internal
     */
    toActions() {
        return this.pipe(operators_1.groupBy(utils_1.getSourceForInstance), operators_1.mergeMap(source$ => source$.pipe(operators_1.groupBy(effectsInstance))), operators_1.mergeMap(source$ => source$.pipe(operators_1.exhaustMap(resolveEffectSource), operators_1.map(output => {
            effect_notification_1.verifyOutput(output, this.errorHandler);
            return output.notification;
        }), operators_1.filter((notification) => notification.kind === 'N'), operators_1.dematerialize())));
    }
};
EffectSources = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_core_1.ErrorHandler, nger_store_1.Store])
], EffectSources);
exports.EffectSources = EffectSources;
function effectsInstance(sourceInstance) {
    if (lifecycle_hooks_1.onIdentifyEffectsKey in sourceInstance &&
        typeof sourceInstance[lifecycle_hooks_1.onIdentifyEffectsKey] === 'function') {
        return sourceInstance[lifecycle_hooks_1.onIdentifyEffectsKey]();
    }
    return '';
}
function resolveEffectSource(sourceInstance) {
    const mergedEffects$ = effects_resolver_1.mergeEffects(sourceInstance);
    if (isOnRunEffects(sourceInstance)) {
        return sourceInstance.ngrxOnRunEffects(mergedEffects$);
    }
    return mergedEffects$;
}
function isOnRunEffects(sourceInstance) {
    const source = utils_1.getSourceForInstance(sourceInstance);
    return (lifecycle_hooks_1.onRunEffectsKey in source && typeof source[lifecycle_hooks_1.onRunEffectsKey] === 'function');
}

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const effects_root_module_1 = require("./effects_root_module");
const tokens_1 = require("./tokens");
let EffectsFeatureModule = class EffectsFeatureModule {
    constructor(root, effectSourceGroups, storeRootModule, storeFeatureModule) {
        effectSourceGroups.forEach(group => group.forEach(effectSourceInstance => root.addEffects(effectSourceInstance)));
    }
};
EffectsFeatureModule = tslib_1.__decorate([
    nger_core_1.NgModule({}),
    tslib_1.__param(1, nger_core_1.Inject(tokens_1.FEATURE_EFFECTS)),
    tslib_1.__param(2, nger_core_1.Optional()),
    tslib_1.__param(3, nger_core_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [effects_root_module_1.EffectsRootModule, Array, nger_store_1.StoreRootModule,
        nger_store_1.StoreFeatureModule])
], EffectsFeatureModule);
exports.EffectsFeatureModule = EffectsFeatureModule;

Object.defineProperty(exports, "__esModule", { value: true });
const effect_creator_1 = require("./effect_creator");
const effect_decorator_1 = require("./effect_decorator");
function getEffectsMetadata(instance) {
    const metadata = {};
    for (const { propertyName, dispatch } of getSourceMetadata(instance)) {
        metadata[propertyName] = { dispatch };
    }
    return metadata;
}
exports.getEffectsMetadata = getEffectsMetadata;
function getSourceMetadata(instance) {
    const effects = [
        effect_decorator_1.getEffectDecoratorMetadata,
        effect_creator_1.getCreateEffectMetadata,
    ];
    return effects.reduce((sources, source) => sources.concat(source(instance)), []);
}
exports.getSourceMetadata = getSourceMetadata;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const effect_sources_1 = require("./effect_sources");
const actions_1 = require("./actions");
const tokens_1 = require("./tokens");
const effects_feature_module_1 = require("./effects_feature_module");
const effects_root_module_1 = require("./effects_root_module");
const effects_runner_1 = require("./effects_runner");
let EffectsModule = class EffectsModule {
    static forFeature(featureEffects) {
        return {
            ngModule: effects_feature_module_1.EffectsFeatureModule,
            providers: [
                ...featureEffects,
                {
                    provide: tokens_1.FEATURE_EFFECTS,
                    multi: true,
                    deps: featureEffects,
                    useFactory: createSourceInstances,
                },
            ],
        };
    }
    static forRoot(rootEffects) {
        return {
            ngModule: effects_root_module_1.EffectsRootModule,
            providers: [
                effects_runner_1.EffectsRunner,
                effect_sources_1.EffectSources,
                actions_1.Actions,
                ...rootEffects,
                {
                    provide: tokens_1.ROOT_EFFECTS,
                    deps: rootEffects,
                    useFactory: createSourceInstances,
                },
            ],
        };
    }
};
EffectsModule = tslib_1.__decorate([
    nger_core_1.NgModule({})
], EffectsModule);
exports.EffectsModule = EffectsModule;
function createSourceInstances(...instances) {
    return instances;
}
exports.createSourceInstances = createSourceInstances;

Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const effects_metadata_1 = require("./effects_metadata");
const utils_1 = require("./utils");
function mergeEffects(sourceInstance) {
    const sourceName = utils_1.getSourceForInstance(sourceInstance).constructor.name;
    const observables = effects_metadata_1.getSourceMetadata(sourceInstance).map(({ propertyName, dispatch }) => {
        const observable = typeof sourceInstance[propertyName] === 'function'
            ? sourceInstance[propertyName]()
            : sourceInstance[propertyName];
        if (dispatch === false) {
            return observable.pipe(operators_1.ignoreElements());
        }
        const materialized$ = observable.pipe(operators_1.materialize());
        return materialized$.pipe(operators_1.map((notification) => ({
            effect: sourceInstance[propertyName],
            notification,
            propertyName,
            sourceName,
            sourceInstance,
        })));
    });
    return rxjs_1.merge(...observables);
}
exports.mergeEffects = mergeEffects;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const effects_runner_1 = require("./effects_runner");
const effect_sources_1 = require("./effect_sources");
const tokens_1 = require("./tokens");
exports.ROOT_EFFECTS_INIT = '@ngrx/effects/init';
let EffectsRootModule = class EffectsRootModule {
    constructor(sources, runner, store, rootEffects, storeRootModule, storeFeatureModule) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach(effectSourceInstance => sources.addEffects(effectSourceInstance));
        store.dispatch({ type: exports.ROOT_EFFECTS_INIT });
    }
    addEffects(effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    }
};
EffectsRootModule = tslib_1.__decorate([
    nger_core_1.NgModule({}),
    tslib_1.__param(3, nger_core_1.Inject(tokens_1.ROOT_EFFECTS)),
    tslib_1.__param(4, nger_core_1.Optional()),
    tslib_1.__param(5, nger_core_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [effect_sources_1.EffectSources,
        effects_runner_1.EffectsRunner,
        nger_store_1.Store, Array, nger_store_1.StoreRootModule,
        nger_store_1.StoreFeatureModule])
], EffectsRootModule);
exports.EffectsRootModule = EffectsRootModule;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_store_1 = require("nger-store");
const effect_sources_1 = require("./effect_sources");
let EffectsRunner = class EffectsRunner {
    constructor(effectSources, store) {
        this.effectSources = effectSources;
        this.store = store;
        this.effectsSubscription = null;
    }
    start() {
        if (!this.effectsSubscription) {
            this.effectsSubscription = this.effectSources
                .toActions()
                .subscribe(this.store);
        }
    }
    ngOnDestroy() {
        if (this.effectsSubscription) {
            this.effectsSubscription.unsubscribe();
            this.effectsSubscription = null;
        }
    }
};
EffectsRunner = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [effect_sources_1.EffectSources,
        nger_store_1.Store])
], EffectsRunner);
exports.EffectsRunner = EffectsRunner;

Object.defineProperty(exports, "__esModule", { value: true });
var effect_creator_1 = require("./effect_creator");
exports.createEffect = effect_creator_1.createEffect;
var effect_decorator_1 = require("./effect_decorator");
exports.Effect = effect_decorator_1.Effect;
var effects_metadata_1 = require("./effects_metadata");
exports.getEffectsMetadata = effects_metadata_1.getEffectsMetadata;
var effects_resolver_1 = require("./effects_resolver");
exports.mergeEffects = effects_resolver_1.mergeEffects;
var actions_1 = require("./actions");
exports.Actions = actions_1.Actions;
exports.ofType = actions_1.ofType;
var effects_module_1 = require("./effects_module");
exports.EffectsModule = effects_module_1.EffectsModule;
var effect_sources_1 = require("./effect_sources");
exports.EffectSources = effect_sources_1.EffectSources;
var effects_root_module_1 = require("./effects_root_module");
exports.ROOT_EFFECTS_INIT = effects_root_module_1.ROOT_EFFECTS_INIT;

Object.defineProperty(exports, "__esModule", { value: true });
exports.onIdentifyEffectsKey = 'ngrxOnIdentifyEffects';
exports.onRunEffectsKey = 'ngrxOnRunEffects';
exports.onInitEffects = 'ngrxOnInitEffects';

Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports.IMMEDIATE_EFFECTS = new nger_di_1.InjectionToken('ngrx/effects: Immediate Effects');
exports.ROOT_EFFECTS = new nger_di_1.InjectionToken('ngrx/effects: Root Effects');
exports.FEATURE_EFFECTS = new nger_di_1.InjectionToken('ngrx/effects: Feature Effects');

Object.defineProperty(exports, "__esModule", { value: true });
function getSourceForInstance(instance) {
    return Object.getPrototypeOf(instance);
}
exports.getSourceForInstance = getSourceForInstance;
