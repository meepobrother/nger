import { Visitor } from '@babel/traverse';
import { Resolver } from 'nger-core';
import { NgerCompilerTypescript } from 'nger-compiler';
import ts from 'typescript';
export declare class NgerCompilerBabel {
    ts: NgerCompilerTypescript;
    visitors: Visitor[];
    resolver: Resolver;
    visitor: Visitor;
    constructor(ts: NgerCompilerTypescript, visitors: Visitor[], resolver: Resolver);
    getFileContent(path: string, config?: ts.TranspileOptions): string;
    compile(from: string, config?: ts.TranspileOptions): string;
}
