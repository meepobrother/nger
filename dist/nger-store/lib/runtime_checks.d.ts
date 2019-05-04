import { Provider } from 'nger-di';
import { RuntimeChecks, MetaReducer } from './models';
export declare function createActiveRuntimeChecks(runtimeChecks?: Partial<RuntimeChecks>): RuntimeChecks;
export declare function createStateSerializationCheckMetaReducer({ strictStateSerializability, }: RuntimeChecks): MetaReducer;
export declare function createActionSerializationCheckMetaReducer({ strictActionSerializability, }: RuntimeChecks): MetaReducer;
export declare function createImmutabilityCheckMetaReducer({ strictImmutability, }: RuntimeChecks): MetaReducer;
export declare function provideRuntimeChecks(runtimeChecks?: Partial<RuntimeChecks>): Provider[];
