// 负责挂载到dom 如果是小程序 可设为空
import {
    ApplicationRef, ComponentFactory, ComponentRef,
    NgerRender,
    ElementRef, ComponentFactoryResolver
} from 'nger-core'
import { deepFlattenFn } from './util'
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
        const parent = ref.injector.get(ElementRef, null, InjectFlags.SkipSelf) || new ElementRef(this.root);
        //这里渲染preact
        if (ref.instance.render) {
            const renderFactory = ref.injector.get(NgerRender);
            let element = renderFactory.create(ref)
            // 有待优化
            if (element) {
                deepFlattenFn(element).map(ele => {
                    if (typeof ele === 'function') {
                        // template
                        return ele(ref.instance);
                    }
                    return ele;
                }).map(ele => {
                    try {
                        deepFlattenFn(ele).map(e => {
                            e && parent.nativeElement.appendChild(e)
                        })
                    } catch (e) {
                        console.log(ele)
                    }
                })
            }
            super.attachView(ref, injector);
            const nowTime = new Date().getTime();
            const totalTime = nowTime - (window as any).nger.startTime
            console.log(`总耗时:${totalTime}ms`);
        }
    }
}