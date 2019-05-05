import { Type, Injector, InjectionToken } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { TypeContext, } from 'ims-decorator';
import { ParserVisitor } from './parser_visitor'
import { ComponentClassAst, ComponentOptions } from '../decorators/component';

import { ChangeDetectorRef, DefaultChangeDetectorRef } from './change_detector_ref';
import { InputMetadataKey, InputPropertyAst } from '../decorators/input';
import { BehaviorSubject } from 'rxjs';
import { handlerTypeContextToParams } from './createStaticProvider'
export type Render = (injector: Injector) => <T>(type: any, props: any, ...children: any[]) => T;
export interface NgerTemplate {
    references: any[];
    attributes: any[];
    inputs: any[];
    outputs: any[];
    variables: any[];
}
export interface NgerContent {
    selector: string,
    attributes: any[];
}
export class NgerRender {
    h: <T>(type: any, props: any, ...children: any[]) => T;
    element: <T>(name: string, attribute: any, ...children: any[]) => T;
    template: <T>(tpl: NgerTemplate, ...children: any[]) => T;
    content: <T>(cfg: NgerContent) => T;
    textAttribute: <T>(cfg: any) => T;
    boundAttribute: <T>(cfg: any) => T;
    boundEvent: <T>(cfg: any) => T;
    text: <T = any>(txt: string) => T;
    boundText: <T>(attr: string) => T;
    icu: <T>(arg: any) => T;
    constructor() { }
    create(injector: Injector) {
        return [
            this.h,
            this.element,
            this.template,
            this.content,
            this.textAttribute,
            this.boundAttribute,
            this.boundEvent,
            this.text,
            this.boundText,
            this.icu
        ]
    }
}
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
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        // let item = this._context.classes.find(cls => [PageMetadataKey, ComponentMetadataKey].includes(cls.ast.metadataKey as string));
        // 这里需要运行custom element
        // const customElementRegistry = injector.get(CustomElementRegistry);
        // customElementRegistry.define(this)
        // 这个是数据监控器
        const $ngOnChange = new BehaviorSubject({});
        const changeDetector = new DefaultChangeDetectorRef($ngOnChange)
        const currentInjector = injector.create([{
            provide: this.componentType,
            useFactory: (...params: any[]) => {
                const instance = new this.componentType(...params);
                const that = this;
                const proxy = new Proxy(instance as any, {
                    set(target: any, p: PropertyKey, value: any, receiver: any) {
                        // 判断是否是@Input 
                        const input = that.inputs.map(it => it.propName === p);
                        if (input) {
                            // 这里应该有数据拦截之类的东西，先todo吧
                            $ngOnChange.next({
                                [`${p as string}`]: value
                            });
                        }
                        target[p] = value;
                        return true;
                    }
                });
                return proxy;
            },
            deps: handlerTypeContextToParams(this._context)
        }, {
            provide: ComponentFactory,
            useValue: this,
            deps: []
        }, {
            provide: ChangeDetectorRef,
            useValue: changeDetector,
            deps: []
        }], this.componentType.name);
        // 是一个proxy 外部赋值会触发更新，内部赋值需要手动更新
        let instance = currentInjector.get(this.componentType) as C;
        const init = {};
        this.inputs.map(input => {
            init[input.templateName] = instance[input.propName]
        });
        $ngOnChange.next(init);
        // 解析一些属性并赋值
        const parserVisitor = currentInjector.get(ParserVisitor);
        this._context.injector = currentInjector;
        parserVisitor.parse(instance, this._context);
        // 设置代理
        const ref = new ComponentRef(currentInjector, instance, changeDetector, this.componentType as any, $ngOnChange);
        ref.injector.setStatic([{
            provide: ComponentRef,
            useValue: ref
        }])
        return ref;
    }
}
