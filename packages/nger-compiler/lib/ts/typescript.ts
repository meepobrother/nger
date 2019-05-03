import { Injectable } from 'nger-core'
import ts from 'typescript'
import { join } from 'path'
const root = process.cwd();
const options = require(join(root, 'tsconfig.json')).compilerOptions;
import { CompilerOptions, CustomTransformers, TransformationContext, Transformer } from 'typescript'
// 遍历吧 没啥好方法

// 这个是负责任Controller处理器
const ConstructorTransformerFactory = (context: TransformationContext): Transformer<ts.SourceFile> => {
    return (node: ts.SourceFile): ts.SourceFile => {
        // 骚年在这里处理吧
        node.statements = ts.createNodeArray(
            node.statements.map((node: ts.Statement) => {
                if (ts.isImportDeclaration(node)) {
                    return node;
                } else if (ts.isClassDeclaration(node)) {
                    return ts.createClassDeclaration(
                        node.decorators,
                        node.modifiers,
                        node.name,
                        node.typeParameters,
                        node.heritageClauses,
                        node.members.map(member => {
                            if (ts.isMethodDeclaration(member)) {
                                // 先判断是否Get/Post等方法
                                // 这里需要创建一个type
                                const isController = hasControllerMetadata(member.decorators);
                                if (isController) {
                                    debugger;
                                    return ts.createProperty(member.decorators, member.modifiers, member.name, null, null, null)
                                } else {
                                    return member;
                                }
                            } else {
                                return member;
                            }
                        })
                    )
                } else {
                    return node;
                }
            })
        )
        return node;
    }
}

function hasControllerMetadata(nodes: ts.NodeArray<ts.Decorator>) {
    return !!nodes.find(node => {
        if (ts.isDecorator(node)) {
            if (ts.isIdentifier(node.expression)) {
                return ['Get', 'Post'].indexOf(node.expression.text) > -1;
            }
        }
        return false;
    })
}
const customTransformer: CustomTransformers = {
    before: [
        ConstructorTransformerFactory
    ],
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