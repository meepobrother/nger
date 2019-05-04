import { Injector } from 'nger-di'
import { ComponentFactoryResolver, ComponentRef, ComponentFactory } from 'nger-core';
import { pluck, distinctUntilChanged } from 'rxjs/operators'
export function render(injector: Injector) {
    return (tag: any, props: any, ...children: any[]) => {
        if (typeof tag === 'string') {
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
            if(onChange) onChange.subscribe(res=>console.log(res))
            return element;
        } else {
            const resolver = injector.get(ComponentFactoryResolver)
            const factory = resolver.resolveComponentFactory(tag);
            const ref = factory.create(injector);
            (ref.instance as any).render(render(ref.injector))
        }
    }
}