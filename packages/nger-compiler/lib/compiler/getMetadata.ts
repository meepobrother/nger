
import { ModuleMetadata, MetadataCollector } from '@angular/compiler-cli'
import ts from 'typescript';
import { NgerUtil } from 'nger-util';
export const util = NgerUtil.create();
export function getMetadata(file: string): ModuleMetadata | undefined {
    const collector = new MetadataCollector();
    const compilerHost = ts.createCompilerHost(util.getCompilerOptions());
    const sourceFile = compilerHost.getSourceFile(file, ts.ScriptTarget.ESNext)
    if (sourceFile) {
        return collector.getMetadata(sourceFile)
    }
}
