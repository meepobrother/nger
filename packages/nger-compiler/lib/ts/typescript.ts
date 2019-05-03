import { Injectable } from 'nger-core'
import ts from 'typescript'
import { join } from 'path'
const root = process.cwd();
const options = require(join(root, 'tsconfig.json')).compilerOptions;
import { CompilerOptions, CustomTransformers } from 'typescript'
const customTransformer: CustomTransformers = {
    before: [],
    after: [],
    afterDeclarations: []
}
@Injectable()
export class NgerCompilerTypescript {
    options: CompilerOptions = options;
    constructor() { }
    compile(content: string, config: ts.TranspileOptions = {
        compilerOptions: this.options,
        transformers: customTransformer
    }): string {
        const output = ts.transpileModule(content, config)
        return output.outputText
    }
}