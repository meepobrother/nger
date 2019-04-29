import { SourceFile} from 'typescript'
export abstract class MetadataBundlerHost {
    abstract getMetadataFor(moduleName: string, containingFile: string): ModuleMetadata | undefined;
}

export abstract class MetadataProvider {
    abstract getMetadata(sourceFile: SourceFile): ModuleMetadata | undefined;
}