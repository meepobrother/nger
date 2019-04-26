export interface MetadataReader {
    getDirectiveMetadata(node: Reference<ClassDeclaration>): DirectiveMeta | null;
    getNgModuleMetadata(node: Reference<ClassDeclaration>): NgModuleMeta | null;
    getPipeMetadata(node: Reference<ClassDeclaration>): PipeMeta | null;
  }