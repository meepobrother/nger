export interface EffectMetadata<T> {
    propertyName: Extract<keyof T, string>;
    dispatch: boolean;
}
export declare type EffectsMetadata<T> = {
    [key in Extract<keyof T, string>]?: {
        dispatch: boolean;
    };
};
