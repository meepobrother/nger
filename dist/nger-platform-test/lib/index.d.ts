import { NgModuleRef, NgModuleBootstrap } from 'nger-core';
export declare class NgerPlatformTest extends NgModuleBootstrap {
    run(ref: NgModuleRef<any>): Promise<void>;
}
declare const _default: (extraProviders?: import("../../nger-di/lib").StaticProvider[]) => import("../../nger-core/lib").PlatformRef;
export default _default;
