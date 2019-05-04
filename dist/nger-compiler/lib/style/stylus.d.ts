export declare class Evaluator {
}
export interface Dictionary<T> {
    [key: string]: T;
}
export interface RenderOptions {
    globals?: Dictionary<any>;
    functions?: Dictionary<any>;
    imports?: string[];
    paths?: string[];
    filename?: string;
    Evaluator?: typeof Evaluator;
}
export declare class NgerCompilerStylus {
    compile(content: string, config: RenderOptions): Promise<string>;
}
