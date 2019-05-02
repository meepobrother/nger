// 当ngModule启动时运行
import {
    NgModuleBootstrap, History, NgModuleRef, ComponentMetadataKey,
    NgModuleMetadataKey, ComponentClassAst, NgModuleClassAst,
    ComponentFactoryResolver, ElementRef, ApplicationRef
} from 'nger-core'
import { Location, Action } from 'history'
import { createCustomElement } from 'nger-dom'
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
        const application = ref.injector.get(ApplicationRef)
        if (bootstrap) {
            bootstrap.map(async boot => {
                // 拿到component ref
                const resolve = ref.injector.get(ComponentFactoryResolver)
                const factory = resolve.resolveComponentFactory(boot);
                const compRef = factory.create(ref.injector);
                ref.injector.setStatic([{
                    provide: ElementRef,
                    useValue: new ElementRef(root)
                }])
                // 启动应用
                application.attachView(compRef, ref.injector)
            });
        }
    }
}
