import { NgerConfig } from './nger-config';

export abstract class Compiler {
    constructor(public config: NgerConfig){}
    abstract build(): Promise<any>;
    abstract docs(): Promise<void>;
    isValid: boolean;
    abstract startDevServer(): Promise<any>;
}
