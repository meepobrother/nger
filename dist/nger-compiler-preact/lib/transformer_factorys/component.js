"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const nger_compiler_1 = require("nger-compiler");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
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
        template = ngTemplate.parse(template, templateUrl || '', {
            preserveWhitespaces: !!preserveWhitespaces
        });
        // 写入json
    }
    return (context) => {
        return (node) => {
            if (styleFile) {
                const styleUrl = styleFile;
                const importStyle = typescript_1.default.createImportDeclaration(undefined, undefined, undefined, typescript_1.default.createStringLiteral(styleUrl));
                node = typescript_1.default.updateSourceFileNode(node, [
                    importStyle,
                    ...node.statements
                ], node.isDeclarationFile, node.referencedFiles, node.typeReferenceDirectives, node.hasNoDefaultLib, node.libReferenceDirectives);
            }
            return node;
        };
    };
};
