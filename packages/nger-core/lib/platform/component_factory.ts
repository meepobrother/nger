import { Type, Injector, InjectionToken } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext, } from 'ims-decorator';
import { ParserVisitor } from './parser_visitor'
import { ComponentClassAst, ComponentOptions } from '../decorators/component';

import { ChangeDetectorRef, DefaultChangeDetectorRef } from './change_detector_ref';
import { InputMetadataKey, InputPropertyAst } from '../decorators/input';
import { Subject } from 'rxjs';
import { handlerTypeContextToParams } from './createStaticProvider'
// 这个是编译后的模板文件
export const ComponentTemplateToken = new InjectionToken<string>(`ComponentTemplateToken`);
// 这个是编译后的样式文件
export const ComponentStyleToken = new InjectionToken<string>(`ComponentStyleToken`);
// 这个是编译后的json文件
export const ComponentPropToken = new InjectionToken<object>(`ComponentPropToken`);
// 这个是样式挂载文件
export const StyleRef = new InjectionToken<HTMLStyleElement>(`StyleRef`);

export interface ComponentCreator {
    (_context: TypeContext): any;
}
// 自定义Component处理器
export const ComponentCreator = new InjectionToken<ComponentCreator[]>(`ComponentCreator`)
export class ComponentFactory<C> {
    get selector(): string {
        return this._selector;
    }
    get componentType(): Type<C> {
        return this._componentType;
    }
    get ngContentSelectors(): string[] {
        return this._ngContentSelectors || [];
    }
    get inputs(): { propName: string, templateName: string }[] {
        return this._inputs || [];
    }
    get outputs(): { propName: string, templateName: string }[] {
        return this._outputs || [];
    };
    get context(): TypeContext {
        return this._context;
    }
    get def(): ComponentOptions {
        return this._def;
    }
    get type(): string {
        return this._type;
    }
    private _def: ComponentOptions;
    private _selector: string;
    private _componentType: Type<any>;
    private _ngContentSelectors: string[];
    private _inputs: { propName: string, templateName: string }[] = [];
    private _outputs: { propName: string, templateName: string }[];
    private _type: string
    constructor(
        private _context: TypeContext,
    ) {
        this._componentType = this._context.target;
        this.context.classes.map(cls => {
            if (cls instanceof ComponentClassAst) {
                this._def = cls.ast.metadataDef;
                this.handlerComponent(cls)
            }
        });
        const inputs = this.context.getProperty(InputMetadataKey) as InputPropertyAst[];
        inputs.map(input => {
            const ast = input.ast
            const def = ast.metadataDef;
            this._inputs.push({
                propName: ast.propertyKey as string,
                templateName: def.bindingPropertyName as string || ast.propertyKey as string
            })
        })
    }
    // 处理Component
    handlerComponent(cls: ComponentClassAst) {
        const ast = cls.ast;
        const def = ast.metadataDef;
        if (def.selector) this._selector = def.selector;
    }
    // 创建
    create<C>(
        injector: Injector,
        ngModule?: NgModuleRef<any>
    ): ComponentRef<C> {
        const { target } = this._context;
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        // let item = this._context.classes.find(cls => [PageMetadataKey, ComponentMetadataKey].includes(cls.ast.metadataKey as string));
        // 这里需要运行custom element
        // const customElementRegistry = injector.get(CustomElementRegistry);
        // customElementRegistry.define(this)
        // 这个是数据监控器
        const $ngOnChange = new Subject();
        const changeDetector = new DefaultChangeDetectorRef($ngOnChange)
        const currentInjector = injector.create([{
            provide: this.componentType,
            useFactory: (...params: any[]) => {
                const instance = new this.componentType(...params);
                const that = this;
                const proxy = new Proxy(instance as any, {
                    set(target: any, p: PropertyKey, value: any, receiver: any) {
                        target[p] = value;
                        // 判断是否是@Input 
                        const input = that.inputs.map(it => it.propName === p);
                        if (input) {
                            // 这里应该有数据拦截之类的东西，先todo吧
                            changeDetector.markForCheck();
                        }
                        return true;
                    }
                });
                return proxy;
            },
            deps: handlerTypeContextToParams(this.context)
        }, {
            provide: ComponentFactory,
            useValue: this,
            deps: []
        }, {
            provide: ChangeDetectorRef,
            useValue: changeDetector,
            deps: []
        }], target.name);
        let instance = currentInjector.get(target) as C;
        // 解析一些属性并赋值
        const parserVisitor = currentInjector.get(ParserVisitor);
        this._context.injector = currentInjector;
        parserVisitor.parse(instance, this._context);
        // 设置代理
        return new ComponentRef(currentInjector, instance, changeDetector, target, $ngOnChange);
    }
}
