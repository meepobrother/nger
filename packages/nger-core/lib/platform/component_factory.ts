import { Type, Injector } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext, } from 'ims-decorator';
import { handlerTypeContextToParams } from './createStaticProvider'
import { ParserVisitor } from './parser_visitor'
import { PageMetadataKey } from '../decorators/page';
import { ControllerMetadataKey } from '../controller';

export class ComponentFactory<C> {
    get selector(): string {
        return this._selector;
    }
    get componentType(): Type<C> {
        return this._componentType;
    }
    get ngContentSelectors(): string[] {
        return this._ngContentSelectors;
    }
    get inputs(): { propName: string, templateName: string }[] {
        return this._inputs;
    }
    get outputs(): { propName: string, templateName: string }[] {
        return this._outputs;
    };
    get context(): TypeContext {
        return this._context;
    }
    get type(): string {
        return this._type;
    }
    private _selector: string;
    private _componentType: Type<any>;
    private _ngContentSelectors: string[];
    private _inputs: { propName: string, templateName: string }[];
    private _outputs: { propName: string, templateName: string }[];
    private _type: string
    constructor(
        private _context: TypeContext,
    ) { }
    // 创建
    create<C>(
        injector: Injector,
        ngModule?: NgModuleRef<any>
    ): ComponentRef<C> {
        const { target } = this._context;
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        let item = this._context.classes.find(cls => [PageMetadataKey, ControllerMetadataKey].includes(cls.ast.metadataKey as string))
        if (item) {
            this._context.injector = injector;
        } else {
            const tempInjector = injector.create([{
                provide: target,
                useFactory: (...params: any[]) => new target(...params),
                deps: handlerTypeContextToParams(this._context)
            }]);
            this._context.injector = tempInjector;
        }
        const instance = this._context.injector.get(target) as C;
        // 属性
        // 解析一些属性并赋值
        const parserVisitor = injector.get(ParserVisitor);
        parserVisitor.parse(instance, this._context);
        return new ComponentRef(injector, instance, target);
    }
}
