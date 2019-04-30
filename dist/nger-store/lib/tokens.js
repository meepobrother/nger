Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports._INITIAL_STATE = new nger_di_1.InjectionToken('@ngrx/store Internal Initial State');
exports.INITIAL_STATE = new nger_di_1.InjectionToken('@ngrx/store Initial State');
exports.REDUCER_FACTORY = new nger_di_1.InjectionToken('@ngrx/store Reducer Factory');
exports._REDUCER_FACTORY = new nger_di_1.InjectionToken('@ngrx/store Internal Reducer Factory Provider');
exports.INITIAL_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Initial Reducers');
exports._INITIAL_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Initial Reducers');
exports.STORE_FEATURES = new nger_di_1.InjectionToken('@ngrx/store Store Features');
exports._STORE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Store Reducers');
exports._FEATURE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Reducers');
exports._FEATURE_CONFIGS = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Configs');
exports._STORE_FEATURES = new nger_di_1.InjectionToken('@ngrx/store Internal Store Features');
exports._FEATURE_REDUCERS_TOKEN = new nger_di_1.InjectionToken('@ngrx/store Internal Feature Reducers Token');
exports.FEATURE_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Feature Reducers');
/**
 * User-defined meta reducers from StoreModule.forRoot()
 */
exports.USER_PROVIDED_META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store User Provided Meta Reducers');
/**
 * Meta reducers defined either internally by @ngrx/store or by library authors
 */
exports.META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Meta Reducers');
/**
 * Concats the user provided meta reducers and the meta reducers provided on the multi
 * injection token
 */
exports._RESOLVED_META_REDUCERS = new nger_di_1.InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
/**
 * Runtime checks defined by the user
 */
exports._USER_RUNTIME_CHECKS = new nger_di_1.InjectionToken('@ngrx/store Internal User Runtime Checks Config');
/**
 * Runtime checks currently in use
 */
exports._ACTIVE_RUNTIME_CHECKS = new nger_di_1.InjectionToken('@ngrx/store Internal Runetime Checks');
