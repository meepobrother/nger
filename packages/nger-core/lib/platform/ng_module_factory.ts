import { Type, Injector } from 'nger-di'
import { NgModuleRef } from './ng_module_ref'
import { ScannerVisitor } from './scanner_visitor';
import { ParserVisitor } from './parser_visitor';
import { createStaticProvider, handlerTypeContextToParams } from './createStaticProvider'
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
        }])
        const instance = _tempInjector.get<T>(context.target)
        // 解析一些属性并赋值
        const parserVisitor = injector.get(ParserVisitor) as ParserVisitor;

        parserVisitor.parse<T>(instance, context);
        if (instance) {
            return new NgModuleRef<T>(injector, instance, context);
        } else {
            throw new Error(`NgMoteduleFactory create ${this._moduleType.name} fail!`)
        }
    }
}
