import { Injectable } from 'nger-core'
import ts from 'typescript'
import { join } from 'path'
const root = process.cwd();
const options = require(join(root, 'tsconfig.json')).compilerOptions;
import { CompilerOptions } from 'typescript'
@Injectable()
export class NgerCompilerTypescript {
    options: CompilerOptions = options;
    constructor() { }
    compile(content: string, config: ts.TranspileOptions = {}): string {
        config = {
            compilerOptions: this.options,
            ...config,
        };
        const output = ts.transpileModule(content, config)
        return output.outputText
    }
}