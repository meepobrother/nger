import { Injector } from 'nger-di'
import { ComponentFactoryResolver, ComponentRef, ComponentFactory, NgerRender, NgModuleRef } from 'nger-core';
import { pluck, distinctUntilChanged } from 'rxjs/operators'
export class BrowserRender extends NgerRender {
    constructor(public ngModuleRef: NgModuleRef<any>) {
        super();
    }
    getComponentByTag(tag: string) {

    }
    create(ref: ComponentRef<any>) {
        // 文字
        this.text = str => document.createTextNode(str) as any;
        // jsx元素
        this.h = render(ref.injector) as any;
        // 元素
        this.element = (tag: string, attr: any, ...children: any[]) => {
            const ele = document.getElementById(tag)
            return ele;
        }
        this.textAttribute = (attr) => {
            console.log(`textAttribute`, attr)
            return undefined;
        }
        this.boundAttribute = (cfg) => {
            console.log(`boundAttribute`, cfg)
            return input => {
                if (cfg.type === '2') {
                    // class
                }
                return undefined;
            }
        }
        this.boundEvent = (cfg) => {
            console.log(`boundEvent`, cfg)
            return undefined;
        }
        this.boundText = (str) => {
            console.log(`boundText`, str)
            return (input: any) => {
                return document.createTextNode(input[str]);
            }
        }
        this.template = (arg: any, ...children: any[]) => {
            console.log(`template`, {
                arg,
                children
            })
            return undefined;
        }
        this.content = (art) => {
            console.log(`content`, art)
            return undefined;
        }
        return super.create(ref);
    }
}

export function render(injector: Injector) {
    return (tag: any, props: any, ...children: any[]) => {
        if (typeof tag === 'string') {
            // 从factory里找到selector为tag的元素
            const resolver = injector.get(ComponentFactoryResolver)
            const component = resolver.getComponents().find(component => {
                const factory = resolver.resolveComponentFactory(component.target)
                return factory.selector === tag;
            })
            if (!!component) {

            } else {
                const factory = injector.get(ComponentFactory)
                const ref = injector.get(ComponentRef)
                const element = document.createElement(tag)
                const onChange = ref.$ngOnChange;
                if (props) {
                    Object.keys(props).map(key => {
                        const attribute = document.createAttribute(key);
                        const val = props[key];
                        console.log({ key, val })
                        // 检查是否在 input里
                        let input = factory.inputs.find(input => input.propName === val)
                        if (input) {
                            // 在input里
                            if (onChange) {
                                onChange.pipe(
                                    pluck(val),
                                    distinctUntilChanged()
                                ).subscribe(res => attribute.value = res)
                            }
                        } else {
                            attribute.value = val;
                        }
                        element.setAttributeNode(attribute)
                    })
                }
                if (children) {
                    children.map((child) => {
                        if (typeof child === 'string') {
                            console.log(child)
                            const childElement = document.createTextNode(child)
                            element.append(childElement)
                        } else {
                            element.append(child)
                        }
                    })
                }
                if (onChange) onChange.subscribe(res => console.log(res))
                return element;
            }
        } else {
            const resolver = injector.get(ComponentFactoryResolver)
            const factory = resolver.resolveComponentFactory(tag);
            const ref = factory.create(injector);
            const h = render(ref.injector);
            (ref.instance as any).render(h);
        }
    }
}