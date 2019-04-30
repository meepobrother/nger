Object.defineProperty(exports, "__esModule", { value: true });
const babel_1 = require("../lib/babel");
const babel = new babel_1.NgerBabel();
const output = babel.compile(`
const tslib_1 = require("tslib");
`);
debugger;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const traverse_1 = tslib_1.__importDefault(require("@babel/traverse"));
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
class NgerBabel {
    compile(code) {
        const ast = parser_1.parse(code, {});
        traverse_1.default(ast, {
            StringLiteral(path) {
                const node = path.node;
                if (node.value === 'tslib') {
                    node.value = ``;
                }
            }
        });
        return generator_1.default(ast);
    }
}
exports.NgerBabel = NgerBabel;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const template_1 = tslib_1.__importDefault(require("@babel/template"));
const appTpl = template_1.default(`
const platform = require('PLATFORM').default;
const app = require('./nger.js').default;
platform().bootstrapModule(app).then(ref=>{
    const {instance} = ref;
    App({
        ngModuleRef: ref,
        onLaunch: (){
            instance.ngDoBootstrap && instance.ngDoBootstrap()
        },
        onError (){
            instance.ngOnError && instance.ngOnError()
        },
        onShow(){
            instance.ngOnInit && instance.ngOnInit()
        },
        onHide(){
            instance.ngOnDestroy && instance.ngOnDestroy()
        }
    })
})
`);
const pageTpl = template_1.default(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const NAME = require('./PAGE').NAME;
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
Page(pageRef.createWeapp())
`);
const componentTpl = template_1.default(`
const appInstance = getApp()
const ngModuleRef = appInstance.ngModuleRef;
const NAME = require('./Component').NAME;
const pageFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(NAME);
Component(pageRef.createWeapp())
`);
exports.default = {
    app: appTpl,
    page: pageTpl,
    component: componentTpl
};

Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("./typescript");
exports.NgerCompilerTypescript = typescript_1.NgerCompilerTypescript;
const staticProvider = [{
        provide: typescript_1.NgerCompilerTypescript,
        useClass: typescript_1.NgerCompilerTypescript,
        deps: []
    }];
exports.default = staticProvider;

Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
class NgerRollup {
    async build(buildOptions) {
        const result = await rollup_1.rollup(buildOptions);
        const outputOptions = {};
        const output = await result.write(outputOptions);
        return output.output;
    }
}
exports.NgerRollup = NgerRollup;

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const compiler_cli_1 = require("@angular/compiler-cli");
let NgerCompilerTypescript = class NgerCompilerTypescript {
    constructor() { }
    compile(content, config) {
        const output = typescript_1.default.transpileModule(content, config);
        return output.outputText;
    }
    getMetadata(file, compilerOptions) {
        const collector = new compiler_cli_1.MetadataCollector();
        const compilerHost = typescript_1.default.createCompilerHost(compilerOptions);
        const sourceFile = compilerHost.getSourceFile(file, typescript_1.default.ScriptTarget.ESNext);
        if (sourceFile) {
            return collector.getMetadata(sourceFile);
        }
    }
};
NgerCompilerTypescript = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], NgerCompilerTypescript);
exports.NgerCompilerTypescript = NgerCompilerTypescript;
