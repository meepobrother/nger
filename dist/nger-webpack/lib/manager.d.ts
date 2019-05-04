import webpack, { Configuration } from 'webpack';
import { Logger } from 'nger-core';
export declare class NgerWebpackManager {
    logger: Logger;
    options: Configuration[];
    constructor(logger: Logger);
    readonly compiler: webpack.MultiCompiler;
    build(): void;
    watch(): void;
    startTime: number;
    printBuildError(err: Error): void;
}
