import { NgModuleConfig } from './types';
import { Injector } from 'nger-di';
export declare class NgerCompilerWeappHtml {
    injector: Injector;
    constructor(injector: Injector);
    run(config: NgModuleConfig): Promise<void>;
}
