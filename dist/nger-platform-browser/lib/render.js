"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const preact_1 = require("preact");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
class BrowserRender extends nger_core_1.NgerRender {
    constructor(instance = {}) {
        super();
        this.instance = instance;
    }
    create(ref) {
        ref.injector.setStatic([{
                provide: nger_core_1.NgerRender,
                useValue: this
            }]);
        // 文字
        this.text = str => str;
        // jsx元素
        this.h = preact_1.h;
        // 元素
        this.element = (tag, attr, ...children) => {
            let res = {};
            let className = ``;
            let styleStr = ``;
            let _class = {};
            console.log({
                tag, attr, children
            });
            // attr
            const { attributes, inputs } = attr;
            attributes.map(attr => {
                res = {
                    ...res,
                    ...attr
                };
            });
            inputs.map(input => {
                const { type, unit, value, name } = input;
                // attribute
                if (type === '0') {
                    if (name === 'className')
                        className += `${this.instance[value]}${unit}`;
                    // data.id
                    let names = name.split('.');
                    // 只支持两层 [data.id]="dataId"
                    if (names.length === 2) {
                        res[names.join('-')] = `${this.instance[value]}${unit}`;
                    }
                }
                // [attr.id] = "id"
                if (type === '1') {
                    res[name] = `${this.instance[value]}${unit}`;
                }
                // [class.active]="isActive"
                if (type === '2') {
                    _class[name] = `${this.instance[value]}${unit}`;
                }
                // style
                if (type === '3') {
                    styleStr += `${this.instance[value]}${unit}`;
                }
            });
            const vnode = preact_1.h(tag, {
                ...res,
                className: classnames_1.default(className, _class)
            }, ...children);
            console.log({ attr, vnode });
            return vnode;
        };
        // class=""
        this.textAttribute = (attr) => {
            if (attr.name === 'class') {
                attr.name = 'className';
            }
            return { [attr.name]: attr.value };
        };
        this.boundAttribute = (cfg) => {
            console.log(cfg);
            return cfg;
        };
        this.boundEvent = (cfg) => {
            console.log(`boundEvent`, cfg);
            return { [cfg.name]: cfg.handler };
        };
        this.boundText = (str) => {
            console.log(`boundText`, str);
            return this.instance[str];
        };
        // 自定义指令
        this.template = (arg, ...children) => {
            const { attributes, inputs, outputs, references, variables } = arg;
            // 找到自定义指令对应的函数 执行run(instance,ref)
            console.log(`template`, {
                arg,
                children
            });
            return preact_1.h("ng-template", null, children);
        };
        this.content = (art) => {
            console.log(`content`, art);
            return preact_1.h("ng-content", null, art);
        };
        return super.create(ref);
    }
}
exports.BrowserRender = BrowserRender;
// h render
function render(injector) {
    return (tag, props, ...children) => {
        // if (typeof tag === 'string') {
        //     // 从factory里找到selector为tag的元素
        //     const ele = document.createElement(tag);
        //     const resolver = injector.get(ComponentFactoryResolver)
        //     const component = resolver.getComponents().find(component => {
        //         const factory = resolver.resolveComponentFactory(component.target)
        //         return factory.selector === tag;
        //     })
        //     if (!!component) {
        //     } else {
        //         const factory = injector.get(ComponentFactory)
        //         const ref = injector.get(ComponentRef)
        //         const element = document.createElement(tag)
        //         const onChange = ref.$ngOnChange;
        //         if (props) {
        //             Object.keys(props).map(key => {
        //                 const attribute = document.createAttribute(key);
        //                 const val = props[key];
        //                 console.log({ key, val })
        //                 // 检查是否在 input里
        //                 let input = factory.inputs.find(input => input.propName === val)
        //                 if (input) {
        //                     // 在input里
        //                     if (onChange) {
        //                         onChange.pipe(
        //                             pluck(val),
        //                             distinctUntilChanged()
        //                         ).subscribe(res => attribute.value = res)
        //                     }
        //                 } else {
        //                     attribute.value = val;
        //                 }
        //                 element.setAttributeNode(attribute)
        //             })
        //         }
        //         if (children) {
        //             children.map((child) => {
        //                 if (typeof child === 'string') {
        //                     console.log(child)
        //                     const childElement = document.createTextNode(child)
        //                     element.append(childElement)
        //                 } else {
        //                     element.append(child)
        //                 }
        //             })
        //         }
        //         if (onChange) onChange.subscribe(res => console.log(res))
        //         return element;
        //     }
        // } else {
        //     const resolver = injector.get(ComponentFactoryResolver)
        //     const factory = resolver.resolveComponentFactory(tag);
        //     const ref = factory.create(injector);
        //     const h = render(ref.injector);
        //     (ref.instance as any).render(h);
        // }
    };
}
exports.render = render;
