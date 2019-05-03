// 负责挂载到dom 如果是小程序 可设为空
import { ApplicationRef, ComponentFactory, ComponentRef, ElementRef, ComponentFactoryResolver, ComponentMetadataKey } from 'nger-core'
import { Injector, Type, InjectFlags } from 'nger-di'
const { render } = require('./preact');
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
            const factory = ref.injector.get(ComponentFactory)
            const parent = ref.injector.get(ElementRef, null, InjectFlags.SkipSelf) || new ElementRef(this.root);
            //这里渲染preact
            if (ref.instance.render) {
                const tpl = ref.instance.render();
                const res = tpl(ref.instance)
                render(res, parent.nativeElement)
                // 更新试图,后面有可能会自己实现
                ref.$ngOnChange && ref.$ngOnChange.subscribe(() => {
                    const res = tpl(ref.instance)
                    render(res, parent.nativeElement, parent.nativeElement.lastElementChild)
                });
                super.attachView(ref, injector);
                const nowTime = new Date().getTime();
                const totalTime = nowTime - (window as any).nger.startTime
                console.log(`总耗时:${totalTime}ms`);
            }
        } catch (e) {
            console.log({
                ref, injector,
                e
            })
        }
    }
}