import fs from 'fs-extra';
import { extname, join } from 'path'
// 项目类目 子项目/文件夹/文件
export type ProjectChild = Project | DirectionChild;
export abstract class Node {
    abstract visit(visitor: ProjectVisitor, context: any): any;
}
// 每个项目有多个项目类目
export class Project extends Node {
    path: string;
    children: ProjectChild[] = []
    constructor() {
        super();
    }
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitProject(this, context)
    }
}
// 没个文件夹有多个文件或文件夹
export type DirectionChild = Folder | File | Project;
// 文件夹
export class Folder extends Node {
    path: string;
    children: DirectionChild[] = []
    constructor() {
        super();
    }
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitFolder(this, context)
    }
}
// 文件, 每个文件有多个函数、变量、类等
export type File = TsFile | StyleFile | TemplateFile | AssetsFile;
// ts文件
export class TsFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitTsFile(this, context)
    }
}
// 样式文件
export class StyleFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitStyleFile(this, context)
    }
}
// 模板文件
export class TemplateFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitTemplateFile(this, context)
    }
}
// json文件
export class JsonFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitJsonFile(this, context)
    }
}
// 静态资源文件
export class AssetsFile extends Node {
    path: string;
    visit(visitor: ProjectVisitor, context: any) {
        return visitor.visitTemplateFile(this, context)
    }
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

export class CteaterProjectVisitor implements ProjectVisitor {
    visit(ast: Node, context: any): any {
        return ast.visit(this, context);
    }
    visitProject(ast: Project, context: any) {
        fs.readdirSync(ast.path).map(path => {
            const file = join(ast.path, path)
            const stats = fs.statSync(file);
            if (stats.isFile()) {
                const ext = extname(file)
                if (['.ts', '.tsx'].indexOf(ext) > -1) {
                    const tsFile = new TsFile();
                    tsFile.path = file;
                    ast.children.push(
                        tsFile.visit(this, context)
                    )
                } else if (['.html', '.htm', '.wxml'].indexOf(ext) > -1) {
                    const templateFile = new TemplateFile();
                    templateFile.path = file;
                    ast.children.push(
                        templateFile.visit(this, context)
                    )
                } else if (['.scss', '.less', '.styus', '.css', '.wxss'].indexOf(ext) > -1) {
                    const styleFile = new StyleFile();
                    styleFile.path = file;
                    ast.children.push(
                        styleFile.visit(this, context)
                    )
                } else if (['.json'].indexOf(ext) > -1) {
                    const jsonFile = new JsonFile();
                    jsonFile.path = file;
                    ast.children.push(
                        jsonFile.visit(this, context)
                    )
                } else {
                    const assetsFile = new AssetsFile();
                    assetsFile.path = file;
                    ast.children.push(
                        assetsFile.visit(this, context)
                    )
                }
            } else if (stats.isDirectory()) {
                // 检查是否有package.json 如果有的话则为子项目，如果没有的话为文件夹
                const isProject = !!fs.readdirSync(file).find(f => f.indexOf('package.json') > -1);
                if (isProject) {
                    const project = new Project();
                    project.path = file;
                    ast.children.push(project.visit(this, context))
                } else {
                    const folder = new Folder();
                    folder.path = file;
                    ast.children.push(folder.visit(this, context))
                }
            }
        });
        return ast;
    }
    visitFolder(ast: Folder, context: any) {
        fs.readdirSync(ast.path).map(file => {
            fs.readdirSync(ast.path).map(path => {
                const file = join(ast.path, path)
                const stats = fs.statSync(file);
                if (stats.isFile()) {
                    const ext = extname(file)
                    if (['.ts', '.tsx'].indexOf(ext) > -1) {
                        const tsFile = new TsFile();
                        tsFile.path = file;
                        ast.children.push(
                            tsFile.visit(this, context)
                        )
                    } else if (['.html', '.htm', '.wxml'].indexOf(ext) > -1) {
                        const templateFile = new TemplateFile();
                        templateFile.path = file;
                        ast.children.push(
                            templateFile.visit(this, context)
                        )
                    } else if (['.scss', '.less', '.styus', '.css', '.wxss'].indexOf(ext) > -1) {
                        const styleFile = new StyleFile();
                        styleFile.path = file;
                        ast.children.push(
                            styleFile.visit(this, context)
                        )
                    } else if (['.json'].indexOf(ext) > -1) {
                        const jsonFile = new JsonFile();
                        jsonFile.path = file;
                        ast.children.push(
                            jsonFile.visit(this, context)
                        )
                    } else {
                        const assetsFile = new AssetsFile();
                        assetsFile.path = file;
                        ast.children.push(
                            assetsFile.visit(this, context)
                        )
                    }
                } else if (stats.isDirectory()) {
                    // 检查是否有package.json 如果有的话则为子项目，如果没有的话为文件夹
                    const isProject = !!fs.readdirSync(file).find(f => f.indexOf('package.json') > -1);
                    if (isProject) {
                        const project = new Project();
                        project.path = file;
                        ast.children.push(project.visit(this, context))
                    } else {
                        const folder = new Folder();
                        folder.path = file;
                        ast.children.push(folder.visit(this, context))
                    }
                }
            });
        })
        return ast;
    }
    visitTsFile(ast: TsFile, context: any) {
        return ast;
    }
    visitStyleFile(ast: TsFile, context: any) {
        return ast;
    }
    visitTemplateFile(ast: TsFile, context: any) {
        return ast;
    }
    visitAssetsFile(ast: TsFile, context: any) {
        return ast;
    }
    visitJsonFile(ast: JsonFile, context: any) {
        return ast;
    }
}

export function createProject(path: string) {
    const creater = new CteaterProjectVisitor();
    let project = new Project();
    project.path = path;
    project = project.visit(creater, {});
    return project;
}
