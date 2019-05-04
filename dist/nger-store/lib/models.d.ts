export interface Action {
    type: string;
}
export declare interface TypedAction<T extends string> extends Action {
    readonly type: T;
}
export declare type ActionType<A> = A extends ActionCreator<infer T, infer C> ? ReturnType<C> & {
    type: T;
} : never;
export declare type TypeId<T> = () => T;
export declare type InitialState<T> = Partial<T> | TypeId<Partial<T>> | void;
export interface ActionReducer<T, V extends Action = Action> {
    (state: T | undefined, action: V): T;
}
export declare type ActionReducerMap<T, V extends Action = Action> = {
    [p in keyof T]: ActionReducer<T[p], V>;
};
export interface ActionReducerFactory<T, V extends Action = Action> {
    (reducerMap: ActionReducerMap<T, V>, initialState?: InitialState<T>): ActionReducer<T, V>;
}
export declare type MetaReducer<T = any, V extends Action = Action> = (reducer: ActionReducer<T, V>) => ActionReducer<T, V>;
export interface StoreFeature<T, V extends Action = Action> {
    key: string;
    reducers: ActionReducerMap<T, V> | ActionReducer<T, V>;
    reducerFactory: ActionReducerFactory<T, V>;
    initialState?: InitialState<T>;
    metaReducers?: MetaReducer<T, V>[];
}
export declare type Selector<T, V> = (state: T) => V;
export declare type SelectorWithProps<State, Props, Result> = (state: State, props: Props) => Result;
export declare type Creator = (...args: any[]) => object;
export declare type ActionCreator<T extends string = string, C extends Creator = Creator> = C & TypedAction<T>;
export declare type FunctionWithParametersType<P extends unknown[], R = void> = (...args: P) => R;
export declare type ParametersType<T> = T extends (...args: infer U) => unknown ? U : never;
export interface RuntimeChecks {
    strictStateSerializability: boolean;
    strictActionSerializability: boolean;
    strictImmutability: boolean;
}
