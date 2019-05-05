import { Injector } from 'nger-di'
import { ComponentFactoryResolver, ComponentRef, ComponentFactory, NgerRender } from 'nger-core';
import { pluck, distinctUntilChanged } from 'rxjs/operators'
export class BrowserRender extends NgerRender {
    create(injector: Injector) {
        this.text = str => document.createTextNode(str) as any;
        this.h = render(injector) as any;
        this.element = (tag: string, attr: any, ...children: any[]) => {
            return document.createElement(tag) as any;
        }
        this.textAttribute = (attr) => {
            return document.createAttribute(attr.name) as any;
        }
        this.boundAttribute = (cfg) => {
            return cfg as any;
        }
        this.boundEvent = (cfg) => {
            return cfg as any;
        }
        this.boundText = (str) => {
            return str as any;
        }
        this.template = (arg: any, ...children: any[]) => {
            return arg as any;
        }
        this.content = (art) => {
            return art as any;
        }
        return super.create(injector);
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