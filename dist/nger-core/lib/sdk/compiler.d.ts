import { NgerConfig } from './nger-config';
export declare abstract class Compiler {
    config: NgerConfig;
    constructor(config: NgerConfig);
    abstract build(): Promise<any>;
    abstract docs(): Promise<void>;
    isValid: boolean;
    abstract startDevServer(): Promise<any>;
}
