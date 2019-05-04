import { Creator, ActionCreator, TypedAction, FunctionWithParametersType, ParametersType } from './models';
/**
 * Action creators taken from ts-action library and modified a bit to better
 * fit current NgRx usage. Thank you Nicholas Jamieson (@cartant).
 */
export declare function createAction<T extends string>(type: T): ActionCreator<T, () => TypedAction<T>>;
export declare function createAction<T extends string, P extends object>(type: T, config: {
    _as: 'props';
    _p: P;
}): ActionCreator<T, (props: P) => P & TypedAction<T>>;
export declare function createAction<T extends string, C extends Creator>(type: T, creator: C): FunctionWithParametersType<ParametersType<C>, ReturnType<C> & TypedAction<T>> & TypedAction<T>;
export declare function props<P>(): {
    _as: 'props';
    _p: P;
};
export declare function union<C extends {
    [key: string]: ActionCreator<string, Creator>;
}>(creators: C): ReturnType<C[keyof C]>;
