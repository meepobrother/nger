import { Logger } from 'nger-core';
import { Configuration, Compiler } from 'webpack';
import { WebpackMergeService } from './merge';
import ora from 'ora';
import { Injector } from 'nger-di';
export declare class WebpackService {
    injector: Injector;
    merge: WebpackMergeService;
    logger: Logger;
    serveSpinner: ora.Ora;
    constructor(injector: Injector, merge: WebpackMergeService, logger: Logger);
    configs: Configuration[];
    readonly compiler: Compiler;
    readonly config: Configuration;
    /** 运行 */
    startTime: number;
    build(): void;
    printBuildError(err: Error): void;
}
