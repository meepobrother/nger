import { createPlatformFactory, ComponentRef, ApplicationRef, ElementRef, StyleRef, ComponentTemplateToken, ComponentStyleToken, ComponentPropToken, CustomElementRegistry, History, platformCore, NgModuleBootstrap, NgModuleRef, NgModuleMetadataKey, NgModuleClassAst, ComponentMetadataKey, ComponentClassAst } from 'nger-core'
import { createCustomElement } from 'nger-dom'
import { ComponentFactoryResolver } from 'nger-core';
import { Injector, InjectFlags } from 'nger-di'
import { } from 'preact';
import 'document-register-element';
import { createBrowserHistory, Location, Action } from 'history';

// 当ngModule启动时运行
export class NgerPlatformBrowser extends NgModuleBootstrap {
    constructor(public history: History, public customElements: CustomElementRegistry) {
        super();
        this.history.listen((location: Location, action: Action) => {
        })
    }
    async run(ref: NgModuleRef<any>) {
        // 可以在此时生成小程序 
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => {
            // 此时解析模板和css
            // parseTemplate()
            const element = createCustomElement(context.target, { injector: ref.injector })
            const component = context.getClass(ComponentMetadataKey) as ComponentClassAst;
            const def = component.ast.metadataDef;
            if (def.selector) {
                this.customElements.define(def.selector, element)
                return this.customElements.whenDefined(def.selector)
            }
        }));
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const resolver = ref.injector.get(ComponentFactoryResolver)
        const root = document.getElementById('app') as HTMLDivElement;
        if (bootstrap) {
            bootstrap.map(async boot => {
                // 拿到component ref
                root.innerHTML = `<app-root></app-root>`
                const appRoot = document.getElementsByTagName('app-root')
                console.dir(appRoot)
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
    attachView(view: ComponentRef<any>) {
        const template = view.injector.get(ComponentTemplateToken, null);
        const style = view.injector.get(ComponentStyleToken, null);
        const json = view.injector.get(ComponentPropToken, null);
        const parent = view.injector.get(ElementRef, null, InjectFlags.SkipSelf) || this.root;
        // parent.innerHTML = template;
        const elementRef = parent.firstChild;
        const styleRef = document.createElement(`style`);
        styleRef.innerHTML = style;
        view.injector.setStatic([{
            provide: ElementRef,
            useValue: elementRef
        }, {
            provide: StyleRef,
            useValue: styleRef
        }]);
        // document.head.append(styleRef)
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