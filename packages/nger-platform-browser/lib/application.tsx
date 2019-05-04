// 负责挂载到dom 如果是小程序 可设为空
import { ApplicationRef, ComponentFactory, ComponentRef, RENDER,ElementRef, ComponentFactoryResolver, ComponentMetadataKey } from 'nger-core'
import { Injector, Type, InjectFlags } from 'nger-di'
const { render, h } = require('preact');
export function ngerRender(injector: Injector) {
    return (vnode: any, parent: any, replaceNode?: any) => {

    }
}
export function ngerCreateElement(injector: Injector) {
    return (tag: any, attr: any, ...children) => {
        if (tag === 'string') {
            return {
                tag,
                attr,
                children,
                injector
            }
        } else {
            const resolver = injector.get(ComponentFactoryResolver)
            const factory = resolver.resolveComponentFactory(tag)
            const ref = factory.create(injector);
            if (ref) { 
                (ref.instance as any).render(ngerCreateElement(ref.injector))
            }
        }
    }
}

(window as any).h = h;

export class BrowserApplicationRef extends ApplicationRef {
    root = document.getElementById('app') as HTMLDivElement;
    constructor(injector: Injector) {
        super(injector);
    }
    bootstrap<C>(
        componentOrFactory: ComponentFactory<C> | Type<C>,
        rootSelectorOrNode?: string | any
    ): ComponentRef<C> {
        if (componentOrFactory instanceof ComponentFactory) {
            return componentOrFactory.create(this.injector)
        } else {
            const componentFactoryResolver = this.injector.get(ComponentFactoryResolver)
            return componentFactoryResolver.resolveComponentFactory(componentOrFactory).create(this.injector)
        }
    }
    attachView(ref: ComponentRef<any>, injector: Injector) {
        try {
            const parent = ref.injector.get(ElementRef, null, InjectFlags.SkipSelf) || new ElementRef(this.root);
            //这里渲染preact
            if (ref.instance.render) {
                const tpl = ref.instance.render.bind(ref.instance);
                const h = ref.injector.get(RENDER)
                const element = tpl(h(ref.injector));
                parent.nativeElement.appendChild(element)
                super.attachView(ref, injector);
                const nowTime = new Date().getTime();
                const totalTime = nowTime - (window as any).nger.startTime
                console.log(`总耗时:${totalTime}ms`);
            }
        } catch (e) {
            console.error({
                ref,
                injector,
                e
            })
        }
    }
}