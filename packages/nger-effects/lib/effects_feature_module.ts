import { NgModule, Inject, Optional } from 'nger-core';
import { StoreRootModule, StoreFeatureModule } from 'nger-store';
import { EffectsRootModule } from './effects_root_module';
import { FEATURE_EFFECTS } from './tokens';

@NgModule({})
export class EffectsFeatureModule {
  constructor(
    root: EffectsRootModule,
    @Inject(FEATURE_EFFECTS) effectSourceGroups: any[][],
    @Optional() storeRootModule: StoreRootModule,
    @Optional() storeFeatureModule: StoreFeatureModule
  ) {
    effectSourceGroups.forEach(group =>
      group.forEach(effectSourceInstance =>
        root.addEffects(effectSourceInstance)
      )
    );
  }
}
