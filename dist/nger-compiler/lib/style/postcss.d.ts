import { ProcessOptions } from 'postcss';
export declare class NgerCompilerPostcss {
    compileWeapp(content: string, config: ProcessOptions): Promise<string>;
    compile(content: string, config: ProcessOptions): Promise<string>;
}
