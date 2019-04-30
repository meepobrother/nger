Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const component_ref_1 = require("./component_ref");
const parser_visitor_1 = require("./parser_visitor");
const page_1 = require("../decorators/page");
const component_1 = require("../decorators/component");
const change_detector_ref_1 = require("./change_detector_ref");
const input_1 = require("../decorators/input");
exports.ComponentTemplateToken = new nger_di_1.InjectionToken(`ComponentTemplateToken`);
exports.ComponentStyleToken = new nger_di_1.InjectionToken(`ComponentStyleToken`);
exports.ComponentPropToken = new nger_di_1.InjectionToken(`ComponentPropToken`);
exports.ElementRef = new nger_di_1.InjectionToken(`ElementRef`);
exports.StyleRef = new nger_di_1.InjectionToken(`StyleRef`);
exports.ComponentCreator = new nger_di_1.InjectionToken(`ComponentCreator`);
class ComponentFactory {
    constructor(_context) {
        this._context = _context;
        this._inputs = [];
        this.context.classes.map(cls => {
            if (cls instanceof component_1.ComponentClassAst || cls instanceof component_1.ComponentClassAst) {
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
        const { target } = this._context;
        // 新建一个
        // Component,Directive,Pipe每次取都要创建
        // Page/Controller单例
        let item = this._context.classes.find(cls => [page_1.PageMetadataKey, component_1.ComponentMetadataKey].includes(cls.ast.metadataKey));
        // 这里需要运行custom element
        // const customElementRegistry = injector.get(CustomElementRegistry);
        // customElementRegistry.define(this)
        if (injector.create) {
            this._context.injector = injector.create([]);
        }
        const creators = injector.get(exports.ComponentCreator);
        // 处理Component
        creators.map(creat => {
            creat(this._context);
        });
        const instance = this._context.injector.get(target);
        // 属性
        // 解析一些属性并赋值
        const parserVisitor = this._context.injector.get(parser_visitor_1.ParserVisitor);
        parserVisitor.parse(instance, this._context);
        const change = this._context.injector.get(change_detector_ref_1.ChangeDetectorRef);
        return new component_ref_1.ComponentRef(this._context.injector, instance, change, target);
    }
}
exports.ComponentFactory = ComponentFactory;
