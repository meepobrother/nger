import { Type, Injector } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext } from 'ims-decorator';
import { handlerTypeContextToParams } from './createStaticProvider'
import { ChangeDetectorRef } from '@angular/core';
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
        this._context.injector = injector.create([{
            provide: target,
            useFactory: (...params: any[]) => new target(...params),
            deps: handlerTypeContextToParams(this._context)
        }]);
        const instance = this._context.injector.get(target) as C;
        // 属性
        
        return new ComponentRef(injector, instance, target);
    }
}
