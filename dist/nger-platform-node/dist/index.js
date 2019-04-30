Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_util_1 = require("nger-util");
const nger_platform_axios_1 = tslib_1.__importDefault(require("nger-platform-axios"));
const index_1 = require("./core/index");
const nger_provider_style_1 = tslib_1.__importStar(require("nger-provider-style"));
const nger_provider_typescript_1 = tslib_1.__importStar(require("nger-provider-typescript"));
exports.default = nger_core_1.createPlatformFactory(nger_platform_axios_1.default, 'node', [
    ...nger_provider_style_1.default,
    ...nger_provider_typescript_1.default,
    {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: index_1.NgerPlatformNode,
        deps: [nger_core_1.FileSystem, nger_core_1.Logger, nger_provider_style_1.NgerPlatformStyle, nger_provider_typescript_1.NgerCompilerTypescript],
        multi: true
    }, {
        provide: nger_util_1.NgerUtil,
        useClass: nger_util_1.NgerUtil,
        deps: [
            nger_core_1.Logger
        ]
    }, {
        provide: nger_core_1.FileSystem,
        useValue: require('fs-extra')
    }
]);

Object.defineProperty(exports, "__esModule", { value: true });
class Version {
    toNumbers(value) {
        return value.split('.').map(Number);
    }
    compareNumbers(a, b) {
        const max = Math.max(a.length, b.length);
        const min = Math.min(a.length, b.length);
        for (let i = 0; i < min; i++) {
            if (a[i] > b[i])
                return 1;
            if (a[i] < b[i])
                return -1;
        }
        if (min !== max) {
            const longestArray = a.length === max ? a : b;
            const comparisonResult = a.length === max ? 1 : -1;
            for (let i = min; i < max; i++) {
                if (longestArray[i] > 0) {
                    return comparisonResult;
                }
            }
        }
        return 0;
    }
    isVersionBetween(version, low, high) {
        const tsNumbers = this.toNumbers(version);
        if (high !== undefined) {
            return this.compareNumbers(this.toNumbers(low), tsNumbers) <= 0 &&
                this.compareNumbers(this.toNumbers(high), tsNumbers) >= 0;
        }
        return this.compareNumbers(this.toNumbers(low), tsNumbers) <= 0;
    }
    compareVersions(v1, v2) {
        return this.compareNumbers(this.toNumbers(v1), this.toNumbers(v2));
    }
}
exports.Version = Version;

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

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ExpressionVisitor {
    visitBinary(ast, context) {
        const left = ast.left.visit(this, context);
        const right = ast.right.visit(this, context);
        return `${left} ${ast.operation} ${right}`;
    }
    visitChain(ast, context) {
        return ast.expressions.join(',');
    }
    visitConditional(ast, context) {
        const condition = ast.condition.visit(this, context);
        const trueExp = ast.trueExp.visit(this, context);
        const falseExp = ast.falseExp.visit(this, context);
        return {
            condition,
            trueExp,
            falseExp
        };
    }
    visitFunctionCall(ast, context) {
        if (ast.target)
            `${ast.target.visit(this, context)}${ast.args.join(',')}`;
    }
    visitImplicitReceiver(ast, context) { }
    visitInterpolation(ast, context) { }
    visitKeyedRead(ast, context) {
        let obj = ast.obj.visit(this, context);
        let key = ast.key.visit(this, context);
        return `${obj}.${key}`;
    }
    visitKeyedWrite(ast, context) {
        let obj = ast.obj.visit(this, context);
        let key = ast.key.visit(this, context);
        let value = ast.value.visit(this, context);
        return `${obj}.${key}=${value}`;
    }
    visitLiteralArray(ast, context) {
        return ast.expressions.map(exp => exp.visit(this, context)).join(',');
    }
    visitLiteralMap(ast, context) { }
    visitLiteralPrimitive(ast, context) {
        return ast.value;
    }
    visitMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}(${ast.args.join(',')})`;
        return `${ast.name}(${ast.args.join(',')})`;
    }
    visitPipe(ast, context) {
        const exp = ast.exp.visit(this, context);
        return `${exp} | ${ast.name}:${ast.args.join(',')}`;
    }
    // not
    visitPrefixNot(ast, context) {
        return ast.expression.visit(this, context);
    }
    // non null assert
    visitNonNullAssert(ast, context) {
        return ast.expression.visit(this, context);
    }
    visitPropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}`;
        return ast.name;
    }
    visitPropertyWrite(ast, context) {
        const receiver = ast.receiver.visit(this);
        const value = ast.value.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}=${value}`;
        return `${ast.name}=${value}`;
    }
    visitQuote(ast, context) {
    }
    visitSafeMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}(${ast.args.join(',')})`;
        return `${ast.name}(${ast.args.join(',')})`;
    }
    visitSafePropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver)
            return `${receiver}.${ast.name}`;
        return ast.name;
    }
    visit(ast, context) {
        return ast.visit(this, context);
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
function isSignalTag(name) {
    return ['input'].includes(name);
}
const astVisitor = new ExpressionVisitor();
class RenderVisitor {
    constructor() {
        this.template = new Map();
        this.content = new Map();
    }
    visit(node) {
        return node.visit(this);
    }
    visitElement(element) {
        // 所有的输入
        let styleStr = ``;
        let classStr = ``;
        let propertyStr = ``;
        element.attributes.map(attr => attr.visit(this)).map(res => {
            console.log(res);
        });
        element.inputs.map(input => input.visit(this)).map(res => {
            if (res.type === 3 /* Style */) {
                styleStr += `${lodash_1.kebabCase(res.name)}:{{${res.value}}}${res.unit || ''};`;
            }
            else if (res.type === 2 /* Class */) {
                classStr += `{{${res.value} ? '${res.name}' : ''}}`;
            }
            else if (res.type === 0 /* Property */) {
                if (res.name === 'className') {
                    classStr += ` {{${res.value}}}`;
                }
                else {
                    console.log(res);
                }
            }
            else {
                console.log(res);
            }
        });
        const outputs = element.outputs.map(output => output.visit(this)).join(' ');
        const children = element.children.map(child => child.visit(this)).join('\n');
        // todo
        const references = element.references.map(refrence => refrence.visit(this)).join(' ');
        if (isSignalTag(element.name)) {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}/>`;
        }
        else {
            return `<${element.name} style="${styleStr}" class="${classStr}" ${propertyStr}>\n\t${children}\n</${element.name}>`;
        }
    }
    // ng-template *ngFor *ngIf
    visitTemplate(template) {
        const references = template.references.map(reference => reference.visit(this)).join(' ');
        const variables = template.variables.map(reference => reference.visit(this)).join(' ');
        const children = template.children.map(reference => reference.visit(this)).join('\n');
        const outputs = template.outputs.map(reference => reference.visit(this)).join(' ');
        const inputs = template.inputs.map(reference => reference.visit(this)).join(' ');
        const attributes = template.attributes.map(reference => reference.visit(this)).join(' ');
        return `${children}`;
    }
    visitContent(content) {
        const attributes = content.attributes.map(attr => attr.visit(this)).join(' ');
        return `<ng-content ${attributes}></ng-content>`;
    }
    // let-it="item" let-i="index"
    visitVariable(variable) {
        return `${variable.name}=${variable.value}`;
    }
    visitReference(reference) {
        return `#${reference.name}=${reference.value}`;
    }
    visitTextAttribute(attribute) {
        return `${attribute.name}="{{${attribute.value}}}"`;
    }
    visitBoundAttribute(attribute) {
        const { name, type, securityContext, value, unit } = attribute;
        return {
            name,
            type,
            value: value.visit(astVisitor),
            unit,
            securityContext
        };
    }
    visitBoundEvent(attribute) {
        const { name, type, handler, target, phase } = attribute;
        return `bind${name}="${handler.visit(astVisitor)}"`;
    }
    visitText(text) {
        return `${text.value}`;
    }
    visitBoundText(text) {
        // ast
        const value = text.value.visit(astVisitor);
        return `{{${value}}}`;
    }
    visitIcu(icu) {
        return ``;
    }
}
exports.RenderVisitor = RenderVisitor;
const visitor = new RenderVisitor();
function renderToString(nodes, context) {
    return nodes.map(node => node.visit(visitor)).join('\n');
}
exports.renderToString = renderToString;

Object.defineProperty(exports, "__esModule", { value: true });
const transformNgModule_1 = require("./transformNgModule");
const path_1 = require("path");
const root = process.cwd();
const ngModulePath = require(path_1.join(root, 'attachment/weapp/nger-app.json'));
const ngModule = transformNgModule_1.getNgModuleConfig(ngModulePath);
const componentPath = require(path_1.join(root, 'attachment/weapp/template/mobile/home/home/metadata.json'));
const component = transformNgModule_1.getComponentConfig(componentPath);
debugger;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cli = tslib_1.__importStar(require("@angular/compiler-cli"));
function getNgModuleConfig(data) {
    const { metadata } = data;
    let result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            const decorator = findDecorator(meta.decorators || [], (meta) => {
                return meta.module === 'nger-core' && meta.name === 'NgModule';
            });
            const args = decorator.arguments;
            args && args.map(arg => {
                let val = transformMetadataValue(arg);
                result = val;
            });
        }
    });
    return result;
}
exports.getNgModuleConfig = getNgModuleConfig;
function getComponentConfig(data) {
    const { metadata } = data;
    let result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            const decorator = findDecorator(meta.decorators || [], (meta) => {
                return meta.module === 'nger-core' && meta.name === 'Component';
            });
            const args = decorator.arguments;
            args && args.map(arg => {
                let val = transformMetadataValue(arg);
                result = val;
            });
        }
    });
    return result;
}
exports.getComponentConfig = getComponentConfig;
function findDecorator(decorators, filter) {
    return decorators.find(decorator => {
        if (cli.isMetadataError(decorator)) {
            return false;
        }
        else {
            if (cli.isMetadataSymbolicCallExpression(decorator)) {
                if (filter(decorator.expression)) {
                    return true;
                }
                return false;
            }
            else {
                return false;
            }
        }
    });
}
exports.findDecorator = findDecorator;
function transformModuleMetadata(data) {
    const { metadata } = data;
    const result = {};
    Object.keys(metadata).map(key => {
        const meta = metadata[key];
        if (cli.isClassMetadata(meta)) {
            result[key] = transformClassMetadata(meta);
        }
        else if (cli.isInterfaceMetadata(meta)) {
            result[key] = transformInterfaceMetadata(meta);
        }
        else if (cli.isFunctionMetadata(meta)) {
            result[key] = transformFunctionMetadata(meta);
        }
        else {
            result[key] = transformMetadataValue(meta);
        }
    });
    return result;
}
exports.transformModuleMetadata = transformModuleMetadata;
// 是否是nger-core NgModule
function isNgerNgModule(meta) {
    return true;
}
function transformMetadataValue(meta) {
    // string | number | boolean | undefined | null 
    if (typeof meta === 'string') {
        return `${meta}`;
    }
    else if (typeof meta === 'number') {
        return meta;
    }
    else if (typeof meta === 'boolean') {
        return meta;
    }
    else if (typeof meta === 'undefined') {
        return undefined;
    }
    else if (meta === null) {
        return null;
    }
    else if (cli.isMetadataError(meta)) {
        transformMetadataError(meta);
    }
    else if (cli.isMetadataSymbolicSelectExpression(meta)) {
        return transformMetadataSymbolicSelectExpression(meta);
    }
    else if (cli.isMetadataSymbolicSpreadExpression(meta)) {
        return transformMetadataSymbolicSpreadExpression(meta);
    }
    else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        return transformMetadataSymbolicReferenceExpression(meta);
    }
    else if (cli.isMetadataSymbolicExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicReferenceExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicCallExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicPrefixExpression(meta)) {
        debugger;
    }
    else if (cli.isMetadataSymbolicIfExpression(meta)) {
        debugger;
    }
    else {
        if (Array.isArray(meta)) {
            return meta.map(me => transformMetadataValue(me));
        }
        else {
            let res = {};
            Object.keys(meta).map((key) => {
                res[key] = transformMetadataValue(meta[key]);
            });
            return res;
        }
    }
}
exports.transformMetadataValue = transformMetadataValue;
function transformMetadataSymbolicReferenceExpression(meta) {
    if (cli.isMetadataImportedSymbolReferenceExpression(meta)) {
        return transformMetadataImportedSymbolReferenceExpression(meta);
    }
    else if (cli.isMetadataGlobalReferenceExpression(meta)) {
        return meta.name;
    }
    else {
        debugger;
    }
}
exports.transformMetadataSymbolicReferenceExpression = transformMetadataSymbolicReferenceExpression;
// import { NgModule } from 'nger-core'
function transformMetadataImportedSymbolReferenceExpression(meta) {
    return {
        module: meta.module,
        name: meta.name
    };
}
exports.transformMetadataImportedSymbolReferenceExpression = transformMetadataImportedSymbolReferenceExpression;
function transformMetadataSymbolicSpreadExpression(meta) {
    const { expression } = meta;
    // todo
    console.log(`todo`);
    return transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSpreadExpression = transformMetadataSymbolicSpreadExpression;
function transformMetadataSymbolicSelectExpression(meta) {
    const { expression, member } = meta;
    // todo
    console.log(`todo`);
    transformMetadataValue(expression);
}
exports.transformMetadataSymbolicSelectExpression = transformMetadataSymbolicSelectExpression;
function transformFunctionMetadata(meta) {
    console.log(meta);
}
exports.transformFunctionMetadata = transformFunctionMetadata;
function transformInterfaceMetadata(meta) {
    console.log(meta);
}
exports.transformInterfaceMetadata = transformInterfaceMetadata;
function transformClassMetadata(meta) {
    const { decorators } = meta;
    const result = [];
    if (decorators) {
        // 治理是所有的装饰器
        decorators.map(meta => {
            if (cli.isMetadataSymbolicExpression(meta)) {
                result.push(transformMetadataSymbolicExpression(meta));
            }
            else {
                transformMetadataError(meta);
            }
        });
    }
}
exports.transformClassMetadata = transformClassMetadata;
function transformMetadataSymbolicExpression(meta) {
    if (cli.isMetadataSymbolicBinaryExpression(meta)) {
        transformMetadataSymbolicBinaryExpression(meta);
    }
    else if (cli.isMetadataSymbolicIndexExpression(meta)) {
        transformMetadataSymbolicIndexExpression(meta);
    }
    else if (cli.isMetadataSymbolicCallExpression(meta)) {
        // 调用装饰器
        transformMetadataSymbolicCallExpression(meta);
    }
    else {
        debugger;
    }
}
exports.transformMetadataSymbolicExpression = transformMetadataSymbolicExpression;
function transformMetadataSymbolicCallExpression(meta) {
    const { expression, arguments: _args } = meta;
    return {
        expression: transformMetadataValue(expression),
        arguments: (_args || []).map(arg => {
            return arg;
        })
    };
}
exports.transformMetadataSymbolicCallExpression = transformMetadataSymbolicCallExpression;
function transformMetadataSymbolicIndexExpression(meta) {
    debugger;
}
exports.transformMetadataSymbolicIndexExpression = transformMetadataSymbolicIndexExpression;
function transformMetadataSymbolicBinaryExpression(meta) {
    const left = transformMetadataValue(meta.left);
    const right = transformMetadataValue(meta.right);
    const operator = meta.operator;
    return `${left}${operator}${right}`;
}
exports.transformMetadataSymbolicBinaryExpression = transformMetadataSymbolicBinaryExpression;
function transformMetadataError(meta) {
    throw new Error(`${meta.module}:${meta.message}`);
}
exports.transformMetadataError = transformMetadataError;
