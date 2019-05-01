import { createPlatformFactory, ComponentRef, ComponentFactory, ApplicationRef, ElementRef, StyleRef, ComponentTemplateToken, ComponentStyleToken, ComponentPropToken, CustomElementRegistry, History, platformCore, NgModuleBootstrap, NgModuleRef, NgModuleMetadataKey, NgModuleClassAst, ComponentMetadataKey, ComponentClassAst } from 'nger-core'
import { createCustomElement } from 'nger-dom'
import { ComponentFactoryResolver } from 'nger-core';
import { Injector, InjectFlags, Type } from 'nger-di'
import 'document-register-element';
import { h, render, Component } from 'preact';
import { createBrowserHistory, Location, Action } from 'history';

// 当ngModule启动时运行
export class NgerPlatformBrowser extends NgModuleBootstrap {
    elements: Map<any, any> = new Map();
    constructor(public history: History, public customElements: CustomElementRegistry) {
        super();
        this.history.listen((location: Location, action: Action) => { })
    }
    async run(ref: NgModuleRef<any>) {
        // 可以在此时生成小程序 
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => {
            // 此时解析模板和css
            // parseTemplate()
            // 在此之前生成完成编译操作
            
            const element = createCustomElement(context.target, { injector: ref.injector })
            const component = context.getClass(ComponentMetadataKey) as ComponentClassAst;
            const def = component.ast.metadataDef;
            this.elements.set(context.target, element)
            if (def.selector) {
                this.customElements.define(def.selector, element)
                return this.customElements.whenDefined(def.selector)
            }
        }));
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const root = document.getElementById('app') as HTMLDivElement;
        if (bootstrap) {
            bootstrap.map(async boot => {
                // 拿到component ref
                const resolve = ref.injector.get(ComponentFactoryResolver)
                const factory = resolve.resolveComponentFactory(boot);
                root.innerHTML = `<${factory.selector}/>`;
                ref.injector.setStatic([{
                    provide: ElementRef,
                    useValue: root.firstElementChild
                }])
            });
        }
    }
}
// 负责挂载到dom 如果是小程序 可设为空
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
    attachView(view: ComponentRef<any>) {
        const parent = view.injector.get(ElementRef, null, InjectFlags.SkipSelf) || this.root;
        //这里渲染preact
        render(<div>i am a preact !</div>, (parent as any).firstElementChild);
        super.attachView(view);
    }
}
export default createPlatformFactory(platformCore, 'browser', [{
    provide: ApplicationRef,
    useClass: BrowserApplicationRef,
    deps: [Injector]
}, {
    provide: NgModuleBootstrap,
    useClass: NgerPlatformBrowser,
    deps: [History, CustomElementRegistry],
    multi: true
}, {
    provide: History,
    useValue: createBrowserHistory()
}, {
    provide: CustomElementRegistry,
    useValue: customElements
}]);