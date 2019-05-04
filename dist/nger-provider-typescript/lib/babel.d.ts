import { NgerCompilerTypescript } from 'nger-compiler';
export declare function createCid(code: string): any;
import _template from './babel_template';
declare type From = string;
declare type To = string;
export declare class NgerBabel {
    ts: NgerCompilerTypescript;
    tpl: typeof _template;
    _cache: Map<From, To>;
    getCache(key: string): any;
    app(platform: string, main: string): string;
    page(page: string, name: string): string;
    component(arg: any): string;
    constructor(ts: NgerCompilerTypescript);
    copySignal(config: {
        from: string;
        base: string;
    }): string;
    copyPkg(config: {
        from: string;
        base: string;
    }): string;
    options: any;
    resolveFile(path: string): any;
    getFileContent(path: string): string;
    includeFiles: string[];
    copy(config: {
        from: string;
        to: string;
        base: string;
    }): void;
}
export {};
