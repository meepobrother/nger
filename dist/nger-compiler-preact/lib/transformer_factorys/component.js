"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const nger_compiler_1 = require("nger-compiler");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const visitor_1 = require("./visitor");
const root = process.cwd();
exports.componentTransformerFactory = async (file, injector) => {
    const relativePath = path_1.relative(root, file);
    const ext = path_1.extname(relativePath);
    const noExtPath = relativePath.replace(ext, '');
    const metadata = nger_compiler_1.metadataCache.get(file);
    const fs = injector.get(nger_core_1.FILE_SYSTEM);
    const ng = injector.get(nger_compiler_1.NgerCompilerNgMetadata);
    const style = injector.get(nger_compiler_1.NgerPlatformStyle);
    const ngTemplate = injector.get(nger_compiler_1.NgerCompilerNgTemplate);
    let styleFile = ``;
    let htmNodes = [];
    if (metadata) {
        const component = ng.getComponentConfig(metadata);
        let { styles, styleUrls, template, templateUrl, preserveWhitespaces } = component;
        styles = styles || ``;
        template = template || ``;
        let type = 'css';
        if (styleUrls && styleUrls.length > 0) {
            styleUrls.map(url => {
                type = path_1.extname(url).replace('.', '');
                const path = path_1.join(path_1.dirname(file), url);
                styles += fs.readFileSync(path).toString('utf8');
            });
        }
        if (styles.length > 0) {
            const code = await style.compile(styles, type);
            styleFile = path_1.join(root, '.temp', `${noExtPath}.css`);
            fs.writeFileSync(styleFile, code);
            styleFile = path_1.relative(path_1.dirname(styleFile), styleFile);
            // 生成d.ts
        }
        if (templateUrl) {
            const path = path_1.join(path_1.dirname(file), templateUrl);
            template += fs.readFileSync(path).toString('utf8');
        }
        if (template.length > 0) {
            const metadata = ngTemplate.parse(template, templateUrl || '', {
                preserveWhitespaces: !!preserveWhitespaces
            });
            // 解析微信if/for
            const visitor = new visitor_1.ComponentVisitor();
            htmNodes = metadata.map(node => {
                return node.visit(visitor);
            });
        }
    }
    return (context) => {
        return (node) => {
            if (styleFile) {
                const styleUrl = styleFile;
                const importStyle = typescript_1.default.createImportDeclaration(undefined, undefined, undefined, typescript_1.default.createStringLiteral(`./${styleUrl}`));
                node = typescript_1.default.updateSourceFileNode(node, [
                    importStyle,
                    ...node.statements.map(node => {
                        if (typescript_1.default.isClassDeclaration(node)) {
                            if (htmNodes && nger_compiler_1.hasMetadata(node.decorators, ['Page', 'Component'])) {
                                let hasRender = node.members.findIndex((member) => {
                                    if (typescript_1.default.isMethodDeclaration(member)) {
                                        if (typescript_1.default.isIdentifier(member.name)) {
                                            if (member.name.text === 'render') {
                                                return true;
                                            }
                                        }
                                    }
                                    return false;
                                });
                                console.log(`hasRender ${hasRender}`);
                                let members = node.members;
                                if (hasRender === -1) {
                                    members = typescript_1.default.createNodeArray([
                                        ...members,
                                        typescript_1.default.createMethod(undefined, undefined, undefined, `render`, undefined, undefined, typescript_1.default.createNodeArray([
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'h'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'element'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'template'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'content'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'text'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundText'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'icu'),
                                        ]), undefined, 
                                        // 这里的body要处理一下
                                        typescript_1.default.createBlock([
                                            typescript_1.default.createReturn(typescript_1.default.createArrayLiteral([
                                                ...htmNodes.filter(it => !!it)
                                            ]))
                                        ]))
                                    ]);
                                }
                                else {
                                    // 更新
                                    members = typescript_1.default.createNodeArray([...members].splice(hasRender, 1, typescript_1.default.createMethod(undefined, undefined, undefined, `render`, undefined, undefined, typescript_1.default.createNodeArray([
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'h'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'element'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'template'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'content'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'text'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'boundText'),
                                        typescript_1.default.createParameter(undefined, undefined, undefined, 'icu'),
                                    ]), undefined, 
                                    // 这里的body要处理一下
                                    typescript_1.default.createBlock([
                                        typescript_1.default.createReturn(typescript_1.default.createArrayLiteral([
                                            ...htmNodes.filter(it => !!it)
                                        ]))
                                    ]))));
                                }
                                return typescript_1.default.createClassDeclaration(node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, members);
                            }
                        }
                        return node;
                    })
                ], node.isDeclarationFile, node.referencedFiles, node.typeReferenceDirectives, node.hasNoDefaultLib, node.libReferenceDirectives);
            }
            return node;
        };
    };
};
