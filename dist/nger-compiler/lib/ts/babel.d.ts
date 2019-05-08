import { Resolver } from 'nger-core';
import { NgerCompilerTypescript } from './typescript';
import ts from 'typescript';
export declare class NgerCompilerBabel {
    ts: NgerCompilerTypescript;
    resolver: Resolver;
    constructor(ts: NgerCompilerTypescript, resolver: Resolver);
    getFileContent(path: string, config?: ts.TranspileOptions): string;
    compile(from: string, config?: ts.TranspileOptions): string;
}
