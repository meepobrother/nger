export declare type ProjectChild = Project | DirectionChild;
export declare abstract class Node {
    abstract visit(visitor: ProjectVisitor, context: any): any;
}
export declare class Project extends Node {
    path: string;
    children: ProjectChild[];
    constructor();
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare type DirectionChild = Folder | File | Project;
export declare class Folder extends Node {
    path: string;
    children: DirectionChild[];
    constructor();
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare type File = TsFile | StyleFile | TemplateFile | AssetsFile;
export declare class TsFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare class StyleFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare class TemplateFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare class JsonFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any): any;
}
export declare class AssetsFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any): any;
}
export interface ProjectVisitor {
    visit(ast: Node, context: any): any;
    visitProject(ast: Project, context: any): any;
    visitFolder(ast: Folder, context: any): any;
    visitTsFile(ast: TsFile, context: any): any;
    visitStyleFile(ast: StyleFile, context: any): any;
    visitTemplateFile(ast: TemplateFile, context: any): any;
    visitAssetsFile(ast: AssetsFile, context: any): any;
    visitJsonFile(ast: AssetsFile, context: any): any;
}
export declare class CteaterProjectVisitor implements ProjectVisitor {
    visit(ast: Node, context: any): any;
    visitProject(ast: Project, context: any): Project;
    visitFolder(ast: Folder, context: any): Folder;
    visitTsFile(ast: TsFile, context: any): TsFile;
    visitStyleFile(ast: TsFile, context: any): TsFile;
    visitTemplateFile(ast: TsFile, context: any): TsFile;
    visitAssetsFile(ast: TsFile, context: any): TsFile;
    visitJsonFile(ast: JsonFile, context: any): JsonFile;
}
export declare function createProject(path: string): Project;
