"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
class Node {
}
exports.Node = Node;
// 每个项目有多个项目类目
class Project extends Node {
    constructor() {
        super();
        this.children = [];
    }
    visit(visitor, context) {
        return visitor.visitProject(this, context);
    }
}
exports.Project = Project;
// 文件夹
class Folder extends Node {
    constructor() {
        super();
        this.children = [];
    }
    visit(visitor, context) {
        return visitor.visitFolder(this, context);
    }
}
exports.Folder = Folder;
// ts文件
class TsFile extends Node {
    visit(visitor, context) {
        return visitor.visitTsFile(this, context);
    }
}
exports.TsFile = TsFile;
// 样式文件
class StyleFile extends Node {
    visit(visitor, context) {
        return visitor.visitStyleFile(this, context);
    }
}
exports.StyleFile = StyleFile;
// 模板文件
class TemplateFile extends Node {
    visit(visitor, context) {
        return visitor.visitTemplateFile(this, context);
    }
}
exports.TemplateFile = TemplateFile;
// json文件
class JsonFile extends Node {
    visit(visitor, context) {
        return visitor.visitJsonFile(this, context);
    }
}
exports.JsonFile = JsonFile;
// 静态资源文件
class AssetsFile extends Node {
    visit(visitor, context) {
        return visitor.visitTemplateFile(this, context);
    }
}
exports.AssetsFile = AssetsFile;
class CteaterProjectVisitor {
    visit(ast, context) {
        return ast.visit(this, context);
    }
    visitProject(ast, context) {
        fs_extra_1.default.readdirSync(ast.path).map(path => {
            const file = path_1.join(ast.path, path);
            const stats = fs_extra_1.default.statSync(file);
            if (stats.isFile()) {
                const ext = path_1.extname(file);
                if (['.ts', '.tsx'].indexOf(ext) > -1) {
                    const tsFile = new TsFile();
                    tsFile.path = file;
                    ast.children.push(tsFile.visit(this, context));
                }
                else if (['.html', '.htm', '.wxml'].indexOf(ext) > -1) {
                    const templateFile = new TemplateFile();
                    templateFile.path = file;
                    ast.children.push(templateFile.visit(this, context));
                }
                else if (['.scss', '.less', '.styus', '.css', '.wxss'].indexOf(ext) > -1) {
                    const styleFile = new StyleFile();
                    styleFile.path = file;
                    ast.children.push(styleFile.visit(this, context));
                }
                else if (['.json'].indexOf(ext) > -1) {
                    const jsonFile = new JsonFile();
                    jsonFile.path = file;
                    ast.children.push(jsonFile.visit(this, context));
                }
                else {
                    const assetsFile = new AssetsFile();
                    assetsFile.path = file;
                    ast.children.push(assetsFile.visit(this, context));
                }
            }
            else if (stats.isDirectory()) {
                // 检查是否有package.json 如果有的话则为子项目，如果没有的话为文件夹
                const isProject = !!fs_extra_1.default.readdirSync(file).find(f => f.indexOf('package.json') > -1);
                if (isProject) {
                    const project = new Project();
                    project.path = file;
                    ast.children.push(project.visit(this, context));
                }
                else {
                    const folder = new Folder();
                    folder.path = file;
                    ast.children.push(folder.visit(this, context));
                }
            }
        });
        return ast;
    }
    visitFolder(ast, context) {
        fs_extra_1.default.readdirSync(ast.path).map(file => {
            fs_extra_1.default.readdirSync(ast.path).map(path => {
                const file = path_1.join(ast.path, path);
                const stats = fs_extra_1.default.statSync(file);
                if (stats.isFile()) {
                    const ext = path_1.extname(file);
                    if (['.ts', '.tsx'].indexOf(ext) > -1) {
                        const tsFile = new TsFile();
                        tsFile.path = file;
                        ast.children.push(tsFile.visit(this, context));
                    }
                    else if (['.html', '.htm', '.wxml'].indexOf(ext) > -1) {
                        const templateFile = new TemplateFile();
                        templateFile.path = file;
                        ast.children.push(templateFile.visit(this, context));
                    }
                    else if (['.scss', '.less', '.styus', '.css', '.wxss'].indexOf(ext) > -1) {
                        const styleFile = new StyleFile();
                        styleFile.path = file;
                        ast.children.push(styleFile.visit(this, context));
                    }
                    else if (['.json'].indexOf(ext) > -1) {
                        const jsonFile = new JsonFile();
                        jsonFile.path = file;
                        ast.children.push(jsonFile.visit(this, context));
                    }
                    else {
                        const assetsFile = new AssetsFile();
                        assetsFile.path = file;
                        ast.children.push(assetsFile.visit(this, context));
                    }
                }
                else if (stats.isDirectory()) {
                    // 检查是否有package.json 如果有的话则为子项目，如果没有的话为文件夹
                    const isProject = !!fs_extra_1.default.readdirSync(file).find(f => f.indexOf('package.json') > -1);
                    if (isProject) {
                        const project = new Project();
                        project.path = file;
                        ast.children.push(project.visit(this, context));
                    }
                    else {
                        const folder = new Folder();
                        folder.path = file;
                        ast.children.push(folder.visit(this, context));
                    }
                }
            });
        });
        return ast;
    }
    visitTsFile(ast, context) {
        return ast;
    }
    visitStyleFile(ast, context) {
        return ast;
    }
    visitTemplateFile(ast, context) {
        return ast;
    }
    visitAssetsFile(ast, context) {
        return ast;
    }
    visitJsonFile(ast, context) {
        return ast;
    }
}
exports.CteaterProjectVisitor = CteaterProjectVisitor;
function createProject(path) {
    const creater = new CteaterProjectVisitor();
    let project = new Project();
    project.path = path;
    project = project.visit(creater, {});
    return project;
}
exports.createProject = createProject;
