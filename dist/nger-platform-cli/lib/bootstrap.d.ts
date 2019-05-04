import { NgModuleRef, Logger, NgModuleBootstrap } from "nger-core";
export declare class NgerPlatformCli extends NgModuleBootstrap {
    logger: Logger;
    constructor(logger: Logger);
    run<T>(ref: NgModuleRef<T>): Promise<void>;
}
