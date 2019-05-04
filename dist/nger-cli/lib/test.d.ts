import { Logger } from 'nger-core';
export declare class TestCommand {
    logger: Logger;
    type: 'server' | 'app' | 'admin';
    run(): void;
}
