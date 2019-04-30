Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const compiler_1 = require("@angular/compiler");
const path_1 = require("path");
const transformNgModule_1 = require("./transformNgModule");
const renderToString_1 = require("./renderToString");
const root = process.cwd();
const compilerOptions = require(path_1.join(root, 'tsconfig.json')).compilerOptions;
class NgerPlatformNode extends nger_core_1.NgModuleBootstrap {
    constructor(fs, logger, style, typescript) {
        super();
        this.fs = fs;
        this.logger = logger;
        this.style = style;
        this.typescript = typescript;
        this.root = path_1.join(process.cwd(), 'src/template/');
        this.outputRoot = path_1.join(process.cwd(), 'attachment/weapp');
    }
    async run(ref) {
        this.logger.info(`running in platform node!`, ref.componentFactoryResolver.getComponents().length);
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        this.fileName = ngModule.ast.metadataDef.fileName;
        if (this.fileName) {
            this.sourceRoot = path_1.dirname(this.fileName);
            const metadata = this.typescript.getMetadata(this.fileName, compilerOptions);
            this.createNgModuleJs(metadata);
            // 解析NgModule装饰器,寻找第三方包和页面及组件配置，并生成wxss,js,json,wxml,npm等目录,
            const config = transformNgModule_1.getNgModuleConfig(metadata);
            const { declarations, providers, imports } = config;
            // 处理declarations
            if (Array.isArray(declarations)) {
                declarations.map(async (declaration) => {
                    await this.createJs(declaration);
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
    async createNgModuleJs(metadata) {
        const fileName = this.fileName;
        if (fileName) {
            const destName = path_1.dirname(path_1.join(this.outputRoot, 'nger.js'));
            const code = this.fs.readFileSync(fileName).toString('utf8');
            this.fs.ensureDirSync(destName);
            this.fs.writeFileSync(path_1.join(this.outputRoot, 'nger.json'), JSON.stringify(metadata, null, 2));
            this.fs.writeFileSync(path_1.join(this.outputRoot, `nger.js`), this.typescript.compile(code, { compilerOptions }));
        }
    }
    async createJs(declaration) {
        const { module, name } = declaration;
        const fileName = `${path_1.join(this.sourceRoot, module)}.ts`;
        const destName = path_1.dirname(path_1.join(this.outputRoot, `${module}.js`));
        const code = this.fs.readFileSync(fileName).toString('utf8');
        const metadata = this.typescript.getMetadata(fileName, compilerOptions);
        const config = transformNgModule_1.getComponentConfig(metadata);
        await this.createWxml({ ...config, sourceRoot: path_1.dirname(fileName), destName: path_1.join(this.outputRoot, `${module}`) });
        this.fs.ensureDirSync(destName);
        this.fs.writeFileSync(path_1.join(this.outputRoot, `${module}.metadata.json`), JSON.stringify(metadata, null, 2));
        this.fs.writeFileSync(path_1.join(this.outputRoot, `${module}.nger.js`), this.typescript.compile(code, { compilerOptions }));
        this.fs.writeFileSync(path_1.join(this.outputRoot, `${module}.js`), `Page({})`);
    }
    async createJson(tempPath, res) {
        this.fs.writeFileSync(path_1.join(tempPath, 'index.json'), JSON.stringify(res, null, 2));
    }
    async createWxml(config) {
        if (config.templateUrl) {
            const templatePath = path_1.join(config.sourceRoot, config.templateUrl);
            config.template = this.fs.readFileSync(templatePath).toString('utf8');
        }
        if (config.template) {
            const res = compiler_1.parseTemplate(config.template, config.templateUrl || '', {
                preserveWhitespaces: !!config.preserveWhitespaces
            });
            this.fs.ensureDirSync(path_1.dirname(`${config.destName}.template.json`));
            this.fs.writeFileSync(`${config.destName}.template.json`, JSON.stringify(res, null, 2));
            this.fs.writeFileSync(`${config.destName}.wxml`, renderToString_1.renderToString(res.nodes, ``));
        }
    }
    async createWxss(tempPath, styles, styleUrls, sourceRoot) {
        // 处理样式
        if (styleUrls && styleUrls.length > 0) {
            try {
                let destStyle = [];
                await Promise.all(styleUrls.map(async (url) => {
                    const stylePath = path_1.join(sourceRoot, url);
                    const code = this.fs.readFileSync(stylePath).toString('utf8');
                    if (url.endsWith('.less')) {
                        destStyle.push(await this.style.compile(code, 'less'));
                    }
                    if (url.endsWith('.scss')) {
                        destStyle.push(await this.style.compile(code, 'scss'));
                    }
                    if (url.endsWith('.sass')) {
                        destStyle.push(await this.style.compile(code, 'sass'));
                    }
                    if (url.endsWith('.styl')) {
                        destStyle.push(await this.style.compile(code, 'stylus'));
                    }
                }));
                styles = destStyle;
            }
            catch (e) { }
        }
        this.fs.writeFileSync(`${tempPath}/index.wxss`, (styles || []).join('\n'));
    }
}
exports.NgerPlatformNode = NgerPlatformNode;
