// 负责挂载到dom 如果是小程序 可设为空
import {
    ApplicationRef, ComponentFactory, ComponentRef,
    NgerRender,
    ElementRef, ComponentFactoryResolver
} from 'nger-core'
import { Injector, Type, InjectFlags } from 'nger-di'
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
                const renderFactory = ref.injector.get(NgerRender);
                const element = tpl(
                    ...renderFactory.create(injector)
                );
                if (element) {
                    if (Array.isArray(element)) {
                        element.map(ele => ele && parent.nativeElement.appendChild(ele))
                    } else {
                        element && parent.nativeElement.appendChild(element)
                    }
                }
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