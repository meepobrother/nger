import ts, { TransformationContext, Transformer } from 'typescript';
import { metadataCache, NgerCompilerNgMetadata, NgerPlatformStyle, NgerCompilerNgTemplate, hasMetadata } from 'nger-compiler';
import { Injector } from 'nger-di';
import { FILE_SYSTEM } from 'nger-core';
import { extname, relative, join, dirname } from 'path';
import { ComponentVisitor } from './visitor';
const root = process.cwd();
export const componentTransformerFactory = async (file: string, injector: Injector) => {
    const relativePath = relative(root, file)
    const ext = extname(relativePath);
    const noExtPath = relativePath.replace(ext, '')
    const metadata = metadataCache.get(file)
    const fs = injector.get(FILE_SYSTEM);
    const ng = injector.get(NgerCompilerNgMetadata);
    const style = injector.get(NgerPlatformStyle);
    const ngTemplate = injector.get(NgerCompilerNgTemplate)
    let styleFile: string = ``;
    let htmNodes = [];
    if (metadata) {
        const component = ng.getComponentConfig(metadata);
        let { styles, styleUrls, template, templateUrl, preserveWhitespaces } = component;
        styles = styles || ``;
        template = template || ``;
        let type: 'less' | 'sass' | 'scss' | 'stylus' | 'css' = 'css'
        if (styleUrls && styleUrls.length > 0) {
            styleUrls.map(url => {
                type = extname(url).replace('.', '') as any;
                const path = join(dirname(file), url);
                styles += fs.readFileSync(path).toString('utf8')
            })
        }
        if (styles.length > 0) {
            const code = await style.compile(styles, type);
            styleFile = join(root, '.temp', `${noExtPath}.css`);
            fs.writeFileSync(styleFile, code);
            styleFile = relative(dirname(styleFile), styleFile);
            // 生成d.ts
        }
        if (templateUrl) {
            const path = join(dirname(file), templateUrl);
            template += fs.readFileSync(path).toString('utf8')
        }
        if (template.length > 0) {
            const metadata = ngTemplate.parse(template, templateUrl || '', {
                preserveWhitespaces: !!preserveWhitespaces
            });
            // 解析微信if/for
            const visitor = new ComponentVisitor();
            htmNodes = metadata.map(node => {
                return node.visit<ts.Node>(visitor)
            });
        }
    }
    return (context: TransformationContext): Transformer<ts.SourceFile> => {
        return (node: ts.SourceFile): ts.SourceFile => {
            if (styleFile) {
                const styleUrl = styleFile;
                const importStyle = ts.createImportDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    ts.createStringLiteral(`./${styleUrl}`)
                );
                node = ts.updateSourceFileNode(
                    node,
                    [
                        importStyle,
                        ...node.statements.map(node => {
                            if (ts.isClassDeclaration(node)) {
                                if (htmNodes && hasMetadata(node.decorators, ['Page', 'Component'])) {
                                    let hasRender: number = node.members.findIndex((member) => {
                                        if (ts.isMethodDeclaration(member)) {
                                            if (ts.isIdentifier(member.name)) {
                                                if (member.name.text === 'render') {
                                                    return true;
                                                }
                                            }
                                        }
                                        return false;
                                    });
                                    console.log(`hasRender ${hasRender}`)
                                    let members = node.members;
                                    if (hasRender === -1) {
                                        members = ts.createNodeArray([
                                            ...members,
                                            ts.createMethod(
                                                undefined,
                                                undefined,
                                                undefined,
                                                `render`,
                                                undefined,
                                                undefined,
                                                ts.createNodeArray([
                                                    ts.createParameter(undefined, undefined, undefined, 'h'),
                                                    ts.createParameter(undefined, undefined, undefined, 'element'),
                                                    ts.createParameter(undefined, undefined, undefined, 'template'),
                                                    ts.createParameter(undefined, undefined, undefined, 'content'),
                                                    ts.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                                    ts.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                                    ts.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                                    ts.createParameter(undefined, undefined, undefined, 'text'),
                                                    ts.createParameter(undefined, undefined, undefined, 'boundText'),
                                                    ts.createParameter(undefined, undefined, undefined, 'icu'),
                                                ]),
                                                undefined,
                                                // 这里的body要处理一下
                                                ts.createBlock([
                                                    ts.createReturn(
                                                        ts.createArrayLiteral([
                                                            ...htmNodes.filter(it => !!it)
                                                        ])
                                                    )
                                                ])
                                            )
                                        ])
                                    } else {
                                        // 更新
                                        members = ts.createNodeArray([...members].splice(hasRender, 1, ts.createMethod(
                                            undefined,
                                            undefined,
                                            undefined,
                                            `render`,
                                            undefined,
                                            undefined,
                                            ts.createNodeArray([
                                                ts.createParameter(undefined, undefined, undefined, 'h'),
                                                ts.createParameter(undefined, undefined, undefined, 'element'),
                                                ts.createParameter(undefined, undefined, undefined, 'template'),
                                                ts.createParameter(undefined, undefined, undefined, 'content'),
                                                ts.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                                ts.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                                ts.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                                ts.createParameter(undefined, undefined, undefined, 'text'),
                                                ts.createParameter(undefined, undefined, undefined, 'boundText'),
                                                ts.createParameter(undefined, undefined, undefined, 'icu'),
                                            ]),
                                            undefined,
                                            // 这里的body要处理一下
                                            ts.createBlock([
                                                ts.createReturn(
                                                    ts.createArrayLiteral([
                                                        ...htmNodes.filter(it => !!it)
                                                    ])
                                                )
                                            ])
                                        )))
                                    }
                                    return ts.createClassDeclaration(
                                        node.decorators,
                                        node.modifiers,
                                        node.name,
                                        node.typeParameters,
                                        node.heritageClauses,
                                        members
                                    )
                                }
                            }
                            return node
                        })
                    ],
                    node.isDeclarationFile,
                    node.referencedFiles,
                    node.typeReferenceDirectives,
                    node.hasNoDefaultLib,
                    node.libReferenceDirectives
                );
            }
            return node;
        }
    }
}
