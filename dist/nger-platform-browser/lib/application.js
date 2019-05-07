"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 负责挂载到dom 如果是小程序 可设为空
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
const preact_1 = require("preact");
class BrowserApplicationRef extends nger_core_1.ApplicationRef {
    constructor(injector) {
        super(injector);
        this.root = document.getElementById('app');
    }
    bootstrap(componentOrFactory, rootSelectorOrNode) {
        if (componentOrFactory instanceof nger_core_1.ComponentFactory) {
            return componentOrFactory.create(this.injector);
        }
        else {
            const componentFactoryResolver = this.injector.get(nger_core_1.ComponentFactoryResolver);
            return componentFactoryResolver.resolveComponentFactory(componentOrFactory).create(this.injector);
        }
    }
    attachView(ref, injector) {
        const parent = ref.injector.get(nger_core_1.ElementRef, null, nger_di_1.InjectFlags.SkipSelf) || new nger_core_1.ElementRef(this.root);
        //这里渲染preact
        if (ref.instance.render) {
            const renderFactory = ref.injector.get(nger_core_1.NgerRenderFactory);
            let factory = renderFactory.create(ref.instance);
            const element = factory.create(ref);
            // 有待优化
            if (element) {
                if (Array.isArray(element)) {
                    element.map(ele => preact_1.render(ele, parent.nativeElement));
                }
            }
            super.attachView(ref, injector);
            const nowTime = new Date().getTime();
            const totalTime = nowTime - window.nger.startTime;
            console.log(`总耗时:${totalTime}ms`);
        }
    }
}
exports.BrowserApplicationRef = BrowserApplicationRef;
