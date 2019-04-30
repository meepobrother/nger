Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const nger_dom_1 = require("nger-dom");
const nger_core_2 = require("nger-core");
const nger_di_1 = require("nger-di");
require("document-register-element");
const history_1 = require("history");
// 当ngModule启动时运行
class NgerPlatformBrowser extends nger_core_1.NgModuleBootstrap {
    constructor(history, customElements) {
        super();
        this.history = history;
        this.customElements = customElements;
        this.history.listen((location, action) => {
        });
    }
    async run(ref) {
        // 可以在此时生成小程序 
        await Promise.all(ref.componentFactoryResolver.getComponents().map(context => {
            // 此时解析模板和css
            // parseTemplate()
            const element = nger_dom_1.createCustomElement(context.target, { injector: ref.injector });
            const component = context.getClass(nger_core_1.ComponentMetadataKey);
            const def = component.ast.metadataDef;
            if (def.selector) {
                this.customElements.define(def.selector, element);
                return this.customElements.whenDefined(def.selector);
            }
        }));
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        const bootstrap = ngModule.ast.metadataDef.bootstrap;
        const resolver = ref.injector.get(nger_core_2.ComponentFactoryResolver);
        const root = document.getElementById('app');
        if (bootstrap) {
            bootstrap.map(async (boot) => {
                // 拿到component ref
                root.innerHTML = `<app-root></app-root>`;
                const appRoot = document.getElementsByTagName('app-root');
                console.dir(appRoot);
            });
        }
    }
}
exports.NgerPlatformBrowser = NgerPlatformBrowser;
// 负责挂载到dom 如果是小程序 可设为空
class BrowserApplicationRef extends nger_core_1.ApplicationRef {
    constructor(injector) {
        super(injector);
        this.root = document.getElementById('app');
    }
    attachView(view) {
        const template = view.injector.get(nger_core_1.ComponentTemplateToken, null);
        const style = view.injector.get(nger_core_1.ComponentStyleToken, null);
        const json = view.injector.get(nger_core_1.ComponentPropToken, null);
        const parent = view.injector.get(nger_core_1.ElementRef, null, nger_di_1.InjectFlags.SkipSelf) || this.root;
        // parent.innerHTML = template;
        const elementRef = parent.firstChild;
        const styleRef = document.createElement(`style`);
        styleRef.innerHTML = style;
        view.injector.setStatic([{
                provide: nger_core_1.ElementRef,
                useValue: elementRef
            }, {
                provide: nger_core_1.StyleRef,
                useValue: styleRef
            }]);
        // document.head.append(styleRef)
        super.attachView(view);
    }
}
exports.BrowserApplicationRef = BrowserApplicationRef;
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'browser', [{
        provide: nger_core_1.ApplicationRef,
        useClass: BrowserApplicationRef,
        deps: [nger_di_1.Injector]
    }, {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: NgerPlatformBrowser,
        deps: [nger_core_1.History, nger_core_1.CustomElementRegistry],
        multi: true
    }, {
        provide: nger_core_1.History,
        useValue: history_1.createBrowserHistory()
    }, {
        provide: nger_core_1.CustomElementRegistry,
        useValue: customElements
    }]);
