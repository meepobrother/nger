"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 当ngModule启动时运行
const nger_core_1 = require("nger-core");
const nger_dom_1 = require("nger-dom");
class NgerPlatformBrowser extends nger_core_1.NgModuleBootstrap {
    constructor(history, customElements) {
        super();
        this.history = history;
        this.customElements = customElements;
        this.elements = new Map();
        this.history.listen((location, action) => { });
    }
    async run(ref) {
        // 可以在此时生成小程序 
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => {
            // 此时解析模板和css
            // parseTemplate()
            // 在此之前生成完成编译操作
            const element = nger_dom_1.createCustomElement(context.target, { injector: ref.injector });
            const component = context.getClass(nger_core_1.ComponentMetadataKey);
            if (component) {
                const def = component.ast.metadataDef;
                this.elements.set(context.target, element);
                if (def.selector) {
                    this.customElements.define(def.selector, element);
                    return this.customElements.whenDefined(def.selector);
                }
            }
        }));
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const root = document.getElementById('app');
        const application = ref.injector.get(nger_core_1.ApplicationRef);
        if (bootstrap) {
            bootstrap.map(async (boot) => {
                // 拿到component ref
                const resolve = ref.injector.get(nger_core_1.ComponentFactoryResolver);
                const factory = resolve.resolveComponentFactory(boot);
                const compRef = factory.create(ref.injector);
                ref.injector.setStatic([{
                        provide: nger_core_1.ElementRef,
                        useValue: new nger_core_1.ElementRef(root)
                    }]);
                // 启动应用
                application.attachView(compRef, ref.injector);
            });
        }
    }
}
exports.NgerPlatformBrowser = NgerPlatformBrowser;
