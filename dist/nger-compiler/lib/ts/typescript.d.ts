import ts from 'typescript';
import { CompilerOptions } from 'typescript';
export declare class NgerCompilerTypescript {
    options: CompilerOptions;
    constructor();
    compile(content: string, config?: ts.TranspileOptions): string;
}
