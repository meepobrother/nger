"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const meta_reducers_1 = require("./meta-reducers");
const tokens_1 = require("./tokens");
function createActiveRuntimeChecks(runtimeChecks) {
    if (nger_core_1.isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return {
            strictStateSerializability: false,
            strictActionSerializability: false,
            strictImmutability: false,
            ...runtimeChecks,
        };
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictImmutability: false,
    };
}
exports.createActiveRuntimeChecks = createActiveRuntimeChecks;
function createStateSerializationCheckMetaReducer({ strictStateSerializability, }) {
    return reducer => strictStateSerializability
        ? meta_reducers_1.stateSerializationCheckMetaReducer(reducer)
        : reducer;
}
exports.createStateSerializationCheckMetaReducer = createStateSerializationCheckMetaReducer;
function createActionSerializationCheckMetaReducer({ strictActionSerializability, }) {
    return reducer => strictActionSerializability
        ? meta_reducers_1.actionSerializationCheckMetaReducer(reducer)
        : reducer;
}
exports.createActionSerializationCheckMetaReducer = createActionSerializationCheckMetaReducer;
function createImmutabilityCheckMetaReducer({ strictImmutability, }) {
    return reducer => strictImmutability ? meta_reducers_1.immutabilityCheckMetaReducer(reducer) : reducer;
}
exports.createImmutabilityCheckMetaReducer = createImmutabilityCheckMetaReducer;
function provideRuntimeChecks(runtimeChecks) {
    return [
        {
            provide: tokens_1._USER_RUNTIME_CHECKS,
            useValue: runtimeChecks,
        },
        {
            provide: tokens_1._ACTIVE_RUNTIME_CHECKS,
            deps: [tokens_1._USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createStateSerializationCheckMetaReducer,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createActionSerializationCheckMetaReducer,
        },
        {
            provide: tokens_1.META_REDUCERS,
            multi: true,
            deps: [tokens_1._ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
    ];
}
exports.provideRuntimeChecks = provideRuntimeChecks;
