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
