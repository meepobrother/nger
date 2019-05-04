import { NgModuleBootstrap, NgModuleRef } from 'nger-core';
import { Injector, InjectionToken } from 'nger-di';
export declare const NATIVE_CONFIG: InjectionToken<{}>;
export declare class NgerPlatformNativeBootstrap extends NgModuleBootstrap {
    injector: Injector;
    run(ref: NgModuleRef<any>): Promise<void>;
}
