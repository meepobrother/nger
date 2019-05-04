import { EffectMetadata } from './models';
export interface EffectOptions {
    propertyName?: string;
    dispatch?: boolean;
}
export declare function Effect<T>(dispatch?: boolean): PropertyDecorator;
export declare function getEffectDecoratorMetadata<T>(instance: T): EffectMetadata<T>[];
