import { NgModuleBootstrap, NgModuleRef } from 'nger-core';
import { Injector } from 'nger-di';
import { NgerUtil } from 'nger-util';
import { Node } from './html/ng';
import { ModuleMetadata } from '@angular/compiler-cli';
export declare let metadataCache: Map<string, ModuleMetadata>;
export declare let templateCache: Map<string, Node[]>;
export declare let hasHandlerFileCache: Set<string>;
export declare class NgerCompilerBootstrap extends NgModuleBootstrap {
    util: NgerUtil;
    constructor(util: NgerUtil);
    run(ref: NgModuleRef<any>): Promise<void>;
    watchTsx(injector: Injector): Promise<void>;
    runTask(injector: Injector, path: string, opt: string): void;
}
