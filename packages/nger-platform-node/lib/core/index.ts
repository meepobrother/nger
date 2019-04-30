import { NgModuleBootstrap, Logger, FileSystem, NgModuleRef, NgModuleMetadataKey, NgModuleClassAst } from 'nger-core';
import { parseTemplate } from '@angular/compiler';
import { join, dirname, relative } from 'path';
import { NgerPlatformStyle } from 'nger-provider-style'
import { NgerCompilerTypescript } from 'nger-provider-typescript'
import { getNgModuleConfig, getComponentConfig } from './transformNgModule'
import { renderToString } from './renderToString'
const root = process.cwd();
const compilerOptions = require(join(root, 'tsconfig.json')).compilerOptions;
import { NgerBabel } from 'nger-provider-typescript'
export class NgerPlatformNode extends NgModuleBootstrap {
    root: string = join(process.cwd(), 'src/template/');
    fileName: string | undefined;
    sourceRoot: string;
    outputRoot: string = join(process.cwd(), 'attachment/weapp')
    constructor(
        public fs: FileSystem,
        public logger: Logger,
        public style: NgerPlatformStyle,
        public typescript: NgerCompilerTypescript,
        public babel: NgerBabel
    ) {
        super();
    }
    async run(ref: NgModuleRef<any>) {
        this.logger.info(`running in platform node!`, ref.componentFactoryResolver.getComponents().length)
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        this.fileName = ngModule.ast.metadataDef.fileName;
        if (this.fileName) {
            this.sourceRoot = dirname(this.fileName);
            const metadata = this.typescript.getMetadata(this.fileName, compilerOptions)
            this.createAppJs(metadata);
            // 解析NgModule装饰器,寻找第三方包和页面及组件配置，并生成wxss,js,json,wxml,npm等目录,
            const config = getNgModuleConfig(metadata as any);
            const { declarations, providers, imports } = config;
            // 处理declarations
            if (Array.isArray(declarations)) {
                // 处理页面
                let _pages: string[] = [];
                declarations.map(async declaration => {
                    const pagePath = declaration.module;
                    _pages.push(pagePath.replace('./', ''))
                    await this.createPageJs(declaration)
                });
                this.fs.writeFileSync(join(this.outputRoot, 'app.json'), JSON.stringify({
                    pages: _pages
                }, null, 2))
            }
        }
    }

    async createAppJs(metadata: any) {
        const fileName = this.fileName
        if (fileName) {
            const destName = dirname(join(this.outputRoot, '__nger__.js'));
            this.fs.ensureDirSync(destName);
            this.fs.writeFileSync(join(this.outputRoot, 'nger.json'), JSON.stringify(metadata, null, 2));
            // 拷贝入口文件到npm
            const main = this.babel.copySignal({
                from: fileName,
                base: this.outputRoot
            });
            // 拷贝用到的包
            const toPkg = this.babel.copyPkg({
                from: 'nger-platform-weapp',
                base: this.outputRoot
            });
            const filePath = join(this.outputRoot, `app.js`)
            this.fs.writeFileSync(filePath, this.babel.app(toPkg,main));
        }
    }

    async createPageJs(declaration: any) {
        const { module, name } = declaration;
        const fileName = `${join(this.sourceRoot, module)}.ts`;
        const destName = dirname(join(this.outputRoot, `${module}.js`));
        // const code = this.fs.readFileSync(fileName).toString('utf8');
        const metadata = this.typescript.getMetadata(fileName, compilerOptions);
        const config = getComponentConfig(metadata as any);
        this.fs.ensureDirSync(destName);
        this.fs.writeFileSync(join(this.outputRoot, `${module}.metadata.json`), JSON.stringify(metadata, null, 2))
        await this.createWxml({ ...config, sourceRoot: dirname(fileName), destName: join(this.outputRoot, `${module}`) })
        // 生成页面文件 这里已经生成过了
        // 生成页面模板文件
        // this.fs.writeFileSync(join(this.outputRoot, `${module}.nger.js`), this.typescript.compile(code, { compilerOptions }))
        const to = this.babel.getCache(fileName)
        if (to) {
            this.fs.writeFileSync(
                join(this.outputRoot, `${module}.js`),
                this.babel.page(`${to.replace(this.outputRoot, '')}`, name)
            )
        } else {
            // throw new Error(`can not found file ${fileName} from cache!`)
        }
    }

    async createJson(tempPath: string, res: object) {
        this.fs.writeFileSync(join(tempPath, 'index.json'), JSON.stringify(res, null, 2))
    }

    async createWxml(config: any) {
        if (config.templateUrl) {
            const templatePath = join(config.sourceRoot, config.templateUrl);
            config.template = this.fs.readFileSync(templatePath).toString('utf8')
        }
        if (config.template) {
            const res = parseTemplate(config.template, config.templateUrl || '', {
                preserveWhitespaces: !!config.preserveWhitespaces
            });
            this.fs.ensureDirSync(dirname(`${config.destName}.template.json`));
            this.fs.writeFileSync(`${config.destName}.template.json`, JSON.stringify(res, null, 2));
            this.fs.writeFileSync(`${config.destName}.wxml`, renderToString(res.nodes, ``))
        }
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