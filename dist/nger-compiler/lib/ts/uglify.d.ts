/// <reference types="node" />
import { MinifyOptions } from 'uglify-js';
export declare class NgerCompilerUglify {
    compile(content: string, config: MinifyOptions): Promise<Buffer>;
}
