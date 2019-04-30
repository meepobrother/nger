Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const ng_module_ref_1 = require("./ng_module_ref");
const scanner_visitor_1 = require("./scanner_visitor");
const parser_visitor_1 = require("./parser_visitor");
const createStaticProvider_1 = require("./createStaticProvider");
const ngModule_1 = require("../decorators/ngModule");
class NgModuleFactory {
    constructor(_moduleType) {
        this._moduleType = _moduleType;
    }
    get moduleType() {
        return this._moduleType;
    }
    create(parentInjector) {
        let injector = parentInjector || nger_di_1.Injector.create([]);
        const scannerVisitor = injector.get(scanner_visitor_1.ScannerVisitor);
        const context = scannerVisitor.visitType(this.moduleType);
        // 获取依赖参数
        const staticProviders = createStaticProvider_1.createStaticProvider(context);
        if (injector.setStatic)
            injector.setStatic(staticProviders);
        context.injector = injector;
        const _tempInjector = injector.create([{
                provide: context.target,
                useFactory: (...params) => new context.target(...params),
                deps: createStaticProvider_1.handlerTypeContextToParams(context)
            }]);
        // 启动imports
        // 运行imports
        const instance = _tempInjector.get(context.target);
        // 解析一些属性并赋值
        const parserVisitor = injector.get(parser_visitor_1.ParserVisitor);
        parserVisitor.parse(instance, context);
        const ngModule = context.getClass(ngModule_1.NgModuleMetadataKey);
        const imports = ngModule.ast.metadataDef.imports;
        if (imports) {
            imports.map(imp => {
                if (nger_di_1.isType(imp)) {
                    // new NgModuleFactory(imp).create(context.injector)
                }
                else {
                    // new NgModuleFactory(imp.ngModule).create(context.injector)
                }
            });
        }
        if (instance) {
            return new ng_module_ref_1.NgModuleRef(injector, instance, context);
        }
        else {
            throw new Error(`NgMoteduleFactory create ${this._moduleType.name} fail!`);
        }
    }
}
exports.NgModuleFactory = NgModuleFactory;
