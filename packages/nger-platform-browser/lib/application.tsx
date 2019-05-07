// 负责挂载到dom 如果是小程序 可设为空
import {
    ApplicationRef, ComponentFactory, ComponentRef,
    NgerRender,
    ElementRef, ComponentFactoryResolver,
    NgerRenderFactory
} from 'nger-core'
import { deepFlattenFn } from './util'
import { Injector, Type, InjectFlags } from 'nger-di'
import { render } from 'preact'
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
        const parent = ref.injector.get(ElementRef, null, InjectFlags.SkipSelf) || new ElementRef(this.root);
        //这里渲染preact
        if (ref.instance.render) {
            const renderFactory = ref.injector.get(NgerRenderFactory);
            let factory = renderFactory.create(ref.instance);
            const element = factory.create(ref)
            // 有待优化
            if (element) {
                if (Array.isArray(element)) {
                    element.map(ele => render(ele, parent.nativeElement))
                }
            }
            super.attachView(ref, injector);
            const nowTime = new Date().getTime();
            const totalTime = nowTime - (window as any).nger.startTime
            console.log(`总耗时:${totalTime}ms`);
        }
    }
}