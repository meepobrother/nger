import { Type } from 'nger-core';
import { ModuleWithProviders } from 'nger-di';
import { EffectsFeatureModule } from './effects_feature_module';
import { EffectsRootModule } from './effects_root_module';
export declare class EffectsModule {
    static forFeature(featureEffects: Type<any>[]): ModuleWithProviders<EffectsFeatureModule>;
    static forRoot(rootEffects: Type<any>[]): ModuleWithProviders<EffectsRootModule>;
}
export declare function createSourceInstances(...instances: any[]): any[];
