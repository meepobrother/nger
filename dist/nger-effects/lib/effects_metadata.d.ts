import { EffectMetadata, EffectsMetadata } from './models';
export declare function getEffectsMetadata<T>(instance: T): EffectsMetadata<T>;
export declare function getSourceMetadata<T>(instance: T): EffectMetadata<T>[];
