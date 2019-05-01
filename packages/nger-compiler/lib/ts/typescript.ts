import { Injectable } from 'nger-core'
import ts from 'typescript'
import { MetadataCollector, ModuleMetadata } from '@angular/compiler-cli'
@Injectable()
export class NgerCompilerTypescript {
    constructor() { }
    compile(content: string, config: ts.TranspileOptions): string {
        const output = ts.transpileModule(content, config)
        return output.outputText
    }
    getMetadata(file: string, compilerOptions: ts.CompilerOptions): ModuleMetadata | undefined {
        const collector = new MetadataCollector();
        const compilerHost = ts.createCompilerHost(compilerOptions);
        const sourceFile = compilerHost.getSourceFile(file, ts.ScriptTarget.ESNext)
        if (sourceFile) {
            return collector.getMetadata(sourceFile)
        }
    }
}