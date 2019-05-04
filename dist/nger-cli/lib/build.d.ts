import { Logger } from 'nger-core';
import { NgerCliBuild } from './build/public_api';
export declare class BuildCommand {
    type: 'lib' | 'prod';
    logger: Logger;
    build: NgerCliBuild;
    name: string;
    run(): Promise<void>;
}
