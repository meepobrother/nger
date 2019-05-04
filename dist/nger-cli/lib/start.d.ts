import { Logger } from 'nger-core';
import { NgerCliStart } from './start/start';
import { Injector } from 'nger-di';
export declare class StartCommand {
    injector: Injector;
    logger: Logger;
    name: string;
    start: NgerCliStart;
    port: number;
    watch: boolean;
    constructor(injector: Injector);
    run(): void;
}
