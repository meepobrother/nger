"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const component_ref_1 = require("./component_ref");
const parser_visitor_1 = require("./parser_visitor");
const component_1 = require("../decorators/component");
const change_detector_ref_1 = require("./change_detector_ref");
const input_1 = require("../decorators/input");
const rxjs_1 = require("rxjs");
const createStaticProvider_1 = require("./createStaticProvider");
class NgerRender {
    constructor() { }
    create(ref) {
        const tpl = ref.instance.render.bind(ref.instance);
        return tpl(...[
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
        ]);
    }
}
exports.NgerRender = NgerRender;
class NgerRenderFactory {
}
exports.NgerRenderFactory = NgerRenderFactory;
// 自定义Component处理器
exports.ComponentCreator = new nger_di_1.InjectionToken(`ComponentCreator`);
class ComponentFactory {
    constructor(_context) {
        this._context = _context;
        this._inputs = [];
        this._componentType = this._context.target;
        this.context.classes.map(cls => {
            if (cls instanceof component_1.ComponentClassAst) {
                this._def = cls.ast.metadataDef;
                this.handlerComponent(cls);
            }
        });
        const inputs = this.context.getProperty(input_1.InputMetadataKey);
        inputs.map(input => {
            const ast = input.ast;
            const def = ast.metadataDef;
            this._inputs.push({
                propName: ast.propertyKey,
                templateName: def.bindingPropertyName || ast.propertyKey
            });
        });
    }
    get selector() {
        return this._selector;
    }
    get componentType() {
        return this._componentType;
    }
    get ngContentSelectors() {
        return this._ngContentSelectors || [];
    }
    get inputs() {
        return this._inputs || [];
    }
    get outputs() {
        return this._outputs || [];
    }
    ;
    get context() {
        return this._context;
    }
    get def() {
        return this._def;
    }
    get type() {
        return this._type;
    }
    // 处理Component
    handlerComponent(cls) {
        const ast = cls.ast;
        const def = ast.metadataDef;
        if (def.selector)
            this._selector = def.selector;
    }
    // 创建
    create(injector, ngModule) {
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        // let item = this._context.classes.find(cls => [PageMetadataKey, ComponentMetadataKey].includes(cls.ast.metadataKey as string));
        // 这里需要运行custom element
        // const customElementRegistry = injector.get(CustomElementRegistry);
        // customElementRegistry.define(this)
        // 这个是数据监控器
        const $ngOnChange = new rxjs_1.BehaviorSubject({});
        const changeDetector = new change_detector_ref_1.DefaultChangeDetectorRef($ngOnChange);
        const currentInjector = injector.create([{
                provide: this.componentType,
                useFactory: (...params) => {
                    const instance = new this.componentType(...params);
                    const that = this;
                    const proxy = new Proxy(instance, {
                        set(target, p, value, receiver) {
                            // 判断是否是@Input 
                            const input = that.inputs.map(it => it.propName === p);
                            if (input) {
                                // 这里应该有数据拦截之类的东西，先todo吧
                                $ngOnChange.next({
                                    [`${p}`]: value
                                });
                            }
                            target[p] = value;
                            return true;
                        }
                    });
                    return proxy;
                },
                deps: createStaticProvider_1.handlerTypeContextToParams(this._context)
            }, {
                provide: ComponentFactory,
                useValue: this,
                deps: []
            }, {
                provide: change_detector_ref_1.ChangeDetectorRef,
                useValue: changeDetector,
                deps: []
            }], this.componentType.name);
        // 是一个proxy 外部赋值会触发更新，内部赋值需要手动更新
        let instance = currentInjector.get(this.componentType);
        const init = {};
        this.inputs.map(input => {
            init[input.templateName] = instance[input.propName];
        });
        $ngOnChange.next(init);
        // 解析一些属性并赋值
        const parserVisitor = currentInjector.get(parser_visitor_1.ParserVisitor);
        this._context.injector = currentInjector;
        parserVisitor.parse(instance, this._context);
        // 设置代理
        const ref = new component_ref_1.ComponentRef(currentInjector, instance, changeDetector, this.componentType, $ngOnChange);
        ref.injector.setStatic([{
                provide: component_ref_1.ComponentRef,
                useValue: ref
            }]);
        return ref;
    }
}
exports.ComponentFactory = ComponentFactory;
