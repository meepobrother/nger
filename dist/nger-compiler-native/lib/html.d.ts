import { NgerComponentConfig } from './types';
import { Injector } from 'nger-di';
export declare class NgerCompilerPreactHtml {
    injector: Injector;
    constructor(injector: Injector);
    run(config: NgerComponentConfig): Promise<void>;
}
