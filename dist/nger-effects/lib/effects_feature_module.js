"use strict";
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
