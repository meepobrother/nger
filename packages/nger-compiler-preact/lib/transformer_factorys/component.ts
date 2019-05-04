import ts, { TransformationContext, Transformer } from 'typescript';
import { metadataCache, NgerCompilerNgMetadata, NgerPlatformStyle, NgerCompilerNgTemplate } from 'nger-compiler';
import { Injector } from 'nger-di';
import { FILE_SYSTEM } from 'nger-core';
import { extname, relative, join, dirname } from 'path';
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
        template = ngTemplate.parse(template, templateUrl || '', {
            preserveWhitespaces: !!preserveWhitespaces
        });
        // 写入json
        
    }
    return (context: TransformationContext): Transformer<ts.SourceFile> => {
        return (node: ts.SourceFile): ts.SourceFile => {
            if (styleFile) {
                const styleUrl = styleFile;
                const importStyle = ts.createImportDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    ts.createStringLiteral(styleUrl)
                );
                node = ts.updateSourceFileNode(
                    node,
                    [
                        importStyle,
                        ...node.statements
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
