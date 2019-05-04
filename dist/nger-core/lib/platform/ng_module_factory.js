"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const ng_module_ref_1 = require("./ng_module_ref");
const scanner_visitor_1 = require("./scanner_visitor");
const parser_visitor_1 = require("./parser_visitor");
const createStaticProvider_1 = require("./createStaticProvider");
const application_tokens_1 = require("./application_tokens");
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
        injector.setStatic([{
                provide: application_tokens_1.PLATFORM_INITIALIZER,
                useFactory: (injector) => {
                    return () => {
                        const parserVisitor = injector.get(parser_visitor_1.ParserVisitor);
                        parserVisitor.parse(instance, context);
                    };
                },
                deps: [nger_di_1.Injector],
                multi: true
            }]);
        if (instance) {
            return new ng_module_ref_1.NgModuleRef(injector, instance, context);
        }
        else {
            throw new Error(`NgMoteduleFactory create ${this._moduleType.name} fail!`);
        }
    }
}
exports.NgModuleFactory = NgModuleFactory;
