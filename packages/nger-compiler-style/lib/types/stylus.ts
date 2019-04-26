namespace Stylus {
    export class Evaluator {
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
}
