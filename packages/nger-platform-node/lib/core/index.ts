import { NgModuleBootstrap, Logger, FileSystem, NgModuleRef, ComponentMetadataKey, ComponentClassAst, NgModuleMetadataKey, NgModuleClassAst } from 'nger-core';
import { parseTemplate } from '@angular/compiler';
import { join, relative, dirname } from 'path';
import { NgerPlatformStyle } from 'nger-provider-style'
import { NgerCompilerTypescript } from 'nger-provider-typescript'
import { getNgModuleConfig, getComponentConfig } from './transformNgModule'
const root = process.cwd();
const compilerOptions = require(join(root, 'tsconfig.json')).compilerOptions;
export class NgerPlatformNode extends NgModuleBootstrap {
    root: string = join(process.cwd(), 'src/template/');
    fileName: string | undefined;
    sourceRoot: string;
    outputRoot: string = join(process.cwd(), 'attachment/weapp')
    constructor(
        public fs: FileSystem,
        public logger: Logger,
        public style: NgerPlatformStyle,
        public typescript: NgerCompilerTypescript
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        this.logger.info(`running in platform node!`, ref.componentFactoryResolver.getComponents().length)
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        this.fileName = ngModule.ast.metadataDef.fileName;
        const rootPath = join(root, 'attachment/weapp');
        if (this.fileName) {
            this.sourceRoot = dirname(this.fileName);
            const metadata = this.typescript.getMetadata(this.fileName, compilerOptions)
            this.fs.writeFileSync(join(rootPath, 'nger-app.json'), JSON.stringify(metadata, null, 2));
            // 解析NgModule装饰器,寻找第三方包和页面及组件配置，并生成wxss,js,json,wxml,npm等目录,
            const config = getNgModuleConfig(metadata as any);
            const { declarations, providers, imports } = config;
            // 处理declarations
            if (Array.isArray(declarations)) {
                declarations.map(async declaration => {
                    await this.createJs(declaration)
                });
            }
        }
        // ref.componentFactoryResolver.getComponents().map(async context => {
        //     this.logger.debug(context.target.name)
        //     const component = context.getClass(ComponentMetadataKey) as ComponentClassAst;
        //     if (component) {
        //         const def = component.ast.metadataDef;
        //         let { fileName, templateUrl, template, styleUrls, styles, preserveWhitespaces } = def;
        //         if (fileName) {
        //             const sourceRoot = dirname(fileName)
        //             const outputPath = relative(this.root, sourceRoot)
        //             const tempPath = join(root, 'attachment/weapp', outputPath);
        //             this.fs.ensureDirSync(tempPath)
        //             if (sourceRoot) {
        //                 await this.createJs(tempPath, fileName)
        //                 await this.createJson(tempPath, {})
        //                 // 处理模板
        //                 await this.createWxml(tempPath, templateUrl, sourceRoot, template, !!preserveWhitespaces)
        //                 await this.createWxss(tempPath, styles, styleUrls, sourceRoot)
        //             }
        //         }
        //     }
        // });
    }

    async createJs(declaration: any) {
        const { module, name } = declaration;

        const fileName = `${join(this.sourceRoot, module)}.ts`;
        const code = this.fs.readFileSync(fileName).toString('utf8');
        const metadata = this.typescript.getMetadata(fileName, compilerOptions);
        const config = getComponentConfig(metadata as any);
        await this.createWxml(config)
        this.fs.ensureDirSync(dirname(join(this.outputRoot, `${module}.js`)));
        this.fs.writeFileSync(join(this.outputRoot, `${module}.metadata.json`), JSON.stringify(metadata, null, 2))
        this.fs.writeFileSync(join(this.outputRoot, `${module}.js`), this.typescript.compile(code, { compilerOptions }))
    }

    async createJson(tempPath: string, res: object) {
        this.fs.writeFileSync(join(tempPath, 'index.json'), JSON.stringify(res, null, 2))
    }

    async createWxml(config: any) {
        // if (templateUrl) {
        //     const templatePath = join(sourceRoot, templateUrl);
        //     template = this.fs.readFileSync(templatePath).toString('utf8')
        // }
        // if (template) {
        //     const res = parseTemplate(template, templateUrl || '', {
        //         preserveWhitespaces: !!preserveWhitespaces
        //     });
        //     this.fs.writeFileSync(join(tempPath, 'nger_template.json'), JSON.stringify(res, null, 2));
        //     this.fs.writeFileSync(join(tempPath, 'index.wxml'), this.transformWxml(res))
        // }
    }

    transformWxml(res: any) {
        const { nodes } = res;
        const result = ``;
        nodes.map(node => {

        })
        return ``
    }

    async createWxss(tempPath: string, styles: string[] | undefined, styleUrls: string[] | undefined, sourceRoot: string) {
        // 处理样式
        if (styleUrls && styleUrls.length > 0) {
            try {
                let destStyle: string[] = []
                await Promise.all(styleUrls.map(async url => {
                    const stylePath = join(sourceRoot, url);
                    const code = this.fs.readFileSync(stylePath).toString('utf8')
                    if (url.endsWith('.less')) {
                        destStyle.push(await this.style.compile(code, 'less'))
                    }
                    if (url.endsWith('.scss')) {
                        destStyle.push(await this.style.compile(code, 'scss'))
                    }
                    if (url.endsWith('.sass')) {
                        destStyle.push(await this.style.compile(code, 'sass'))
                    }
                    if (url.endsWith('.styl')) {
                        destStyle.push(await this.style.compile(code, 'stylus'))
                    }
                }));
                styles = destStyle;
            } catch (e) { }
        }
        this.fs.writeFileSync(`${tempPath}/index.wxss`, (styles || []).join('\n'))
    }
}