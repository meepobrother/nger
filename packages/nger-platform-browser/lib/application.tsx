// 负责挂载到dom 如果是小程序 可设为空
import { ApplicationRef, ComponentFactory, ComponentRef, ElementRef, ComponentFactoryResolver, ComponentMetadataKey } from 'nger-core'
import { Injector, Type, InjectFlags } from 'nger-di'
import { render } from 'preact';
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
    attachView(view: Type<any>, injector: Injector) {
        try {
            const resolver = injector.get(ComponentFactoryResolver)
            const factory = resolver.resolveComponentFactory(view)
            const ref = factory.create(injector)
            const parent = ref.injector.get(ElementRef, null, InjectFlags.SkipSelf) || new ElementRef(this.root);
            //这里渲染preact
            const element = document.createElement(factory.selector);
            const tpl = factory.def.render;
            const res = tpl(ref.instance)
            render(res, parent.nativeElement)
            parent.nativeElement.appendChild(element);
            super.attachView(view, injector);
            const nowTime = new Date().getTime();
            const totalTime = nowTime - (window as any).nger.startTime
            console.log(`总耗时:${totalTime}ms`);
        } catch (e) {
            console.log({
                view, injector,
                e
            })
        }
    }
}