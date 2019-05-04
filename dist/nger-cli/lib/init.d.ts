import { Logger, FileSystem } from 'nger-core';
export declare class InitCommand {
    fs: FileSystem;
    logger: Logger;
    name: string;
    constructor(fs: FileSystem, logger: Logger);
    run(): void;
}
