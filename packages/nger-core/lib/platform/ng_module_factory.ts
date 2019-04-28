import { Type, Injector, isType } from 'nger-di'
import { NgModuleRef } from './ng_module_ref'
import { ScannerVisitor } from './scanner_visitor';
import { ParserVisitor } from './parser_visitor';
import { createStaticProvider, handlerTypeContextToParams, getModules } from './createStaticProvider'
import { NgModuleMetadataKey, NgModuleClassAst } from '../decorators/ngModule';
export class NgModuleFactory<T> {
    get moduleType(): Type<T> {
        return this._moduleType;
    }
    constructor(private _moduleType: Type<T>) { }
    create(parentInjector: Injector | null): NgModuleRef<T> {
        let injector = parentInjector || new Injector([])
        const scannerVisitor = injector.get(ScannerVisitor) as ScannerVisitor;
        const context = scannerVisitor.visitType(this.moduleType);
        // 获取依赖参数
        const staticProviders = createStaticProvider(context);
        injector.setStatic(staticProviders);
        context.injector = injector;
        const _tempInjector = injector.create([{
            provide: context.target,
            useFactory: (...params: any[]) => new context.target(...params),
            deps: handlerTypeContextToParams(context)
        }]);
        // 启动imports

        // 运行imports
        const instance = _tempInjector.get<T>(context.target)
        // 解析一些属性并赋值
        const parserVisitor = injector.get(ParserVisitor) as ParserVisitor;
        parserVisitor.parse<T>(instance, context);

        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const imports = ngModule.ast.metadataDef.imports;
        if (imports) {
            imports.map(imp => {
                if (isType<any>(imp)) {
                    new NgModuleFactory(imp).create(context.injector)
                } else {
                    new NgModuleFactory(imp.ngModule).create(context.injector)
                }
            })
        }
        if (instance) {
            return new NgModuleRef<T>(injector, instance, context);
        } else {
            throw new Error(`NgMoteduleFactory create ${this._moduleType.name} fail!`)
        }
    }
}
