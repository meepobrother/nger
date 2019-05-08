import { Injector } from 'nger-di'
import { ComponentRef, NgerRender, NgModuleRef } from 'nger-core';
import { h } from 'preact';
import classNames from 'classnames';
export class BrowserRender extends NgerRender {
    constructor(public instance: any = {}) {
        super();
    }
    create(ref: ComponentRef<any>) {
        ref.injector.setStatic([{
            provide: NgerRender,
            useValue: this
        }]);
        // 文字
        this.text = str => str;
        // jsx元素
        this.h = h;
        // 元素
        this.element = (tag: string, attr: any, ...children: any[]) => {
            let res: any = {};
            let className: string = ``;
            let styleStr: string = ``;
            let _class: any = {};
            console.log({
                tag, attr, children
            })
            // attr
            const { attributes, inputs } = attr;
            attributes.map(attr => {
                res = {
                    ...res,
                    ...attr
                }
            });
            inputs.map(input => {
                const { type, unit, value, name } = input;
                // attribute
                if (type === '0') {
                    if (name === 'className') className += `${this.instance[value]}${unit}`;
                    // data.id
                    let names = (name as string).split('.');
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
                    _class[name] = `${this.instance[value]}${unit}`
                }
                // style
                if (type === '3') {
                    styleStr += `${this.instance[value]}${unit}`
                }

            })
            const vnode = h(tag, {
                ...res,
                className: classNames(className, _class)
            }, ...children);
            console.log({ attr, vnode });
            return vnode;
        }
        // class=""
        this.textAttribute = (attr) => {
            if (attr.name === 'class') {
                attr.name = 'className'
            }
            return { [attr.name]: attr.value }
        }
        this.boundAttribute = (cfg) => {
            console.log(cfg)
            return cfg;
        }
        this.boundEvent = (cfg) => {
            console.log(`boundEvent`, cfg)
            return { [cfg.name]: cfg.handler }
        }
        this.boundText = (str) => {
            console.log(`boundText`, str)
            return this.instance[str]
        }
        // 自定义指令
        this.template = (arg: any, ...children: any[]) => {
            const { attributes, inputs, outputs, references, variables } = arg;
            // 找到自定义指令对应的函数 执行run(instance,ref)
            console.log(`template`, {
                arg,
                children
            });
            return <ng-template>{children}</ng-template>;
        }
        this.content = (art) => {
            console.log(`content`, art)
            return <ng-content>{art}</ng-content>;
        }
        return super.create(ref);
    }
}
// h render
export function render(injector: Injector) {
    return (tag: any, props: any, ...children: any[]) => {
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
    }
}