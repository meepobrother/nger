import { Injectable } from 'nger-core'
import stylus from 'stylus';
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
@Injectable()
export class NgerCompilerStylus {
    compile(content: string, config: RenderOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            stylus.render(content || '', config, (err: Error, css: string, js: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(css);
                }
            });
        });
    }
}