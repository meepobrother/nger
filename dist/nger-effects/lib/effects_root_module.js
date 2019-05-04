"use strict";
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
