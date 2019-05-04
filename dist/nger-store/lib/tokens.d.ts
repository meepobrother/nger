import { InjectionToken } from 'nger-di';
import { RuntimeChecks, MetaReducer } from './models';
export declare const _INITIAL_STATE: InjectionToken<{}>;
export declare const INITIAL_STATE: InjectionToken<{}>;
export declare const REDUCER_FACTORY: InjectionToken<{}>;
export declare const _REDUCER_FACTORY: InjectionToken<{}>;
export declare const INITIAL_REDUCERS: InjectionToken<{}>;
export declare const _INITIAL_REDUCERS: InjectionToken<{}>;
export declare const STORE_FEATURES: InjectionToken<{}>;
export declare const _STORE_REDUCERS: InjectionToken<{}>;
export declare const _FEATURE_REDUCERS: InjectionToken<{}>;
export declare const _FEATURE_CONFIGS: InjectionToken<{}>;
export declare const _STORE_FEATURES: InjectionToken<{}>;
export declare const _FEATURE_REDUCERS_TOKEN: InjectionToken<{}>;
export declare const FEATURE_REDUCERS: InjectionToken<{}>;
/**
 * User-defined meta reducers from StoreModule.forRoot()
 */
export declare const USER_PROVIDED_META_REDUCERS: InjectionToken<MetaReducer<any, import("./models").Action>[]>;
/**
 * Meta reducers defined either internally by @ngrx/store or by library authors
 */
export declare const META_REDUCERS: InjectionToken<MetaReducer<any, import("./models").Action>[]>;
/**
 * Concats the user provided meta reducers and the meta reducers provided on the multi
 * injection token
 */
export declare const _RESOLVED_META_REDUCERS: InjectionToken<MetaReducer<any, import("./models").Action>>;
/**
 * Runtime checks defined by the user
 */
export declare const _USER_RUNTIME_CHECKS: InjectionToken<RuntimeChecks>;
/**
 * Runtime checks currently in use
 */
export declare const _ACTIVE_RUNTIME_CHECKS: InjectionToken<RuntimeChecks>;
