"use strict";
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
