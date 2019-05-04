"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 负责挂载到dom 如果是小程序 可设为空
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
const { render } = require('./preact');
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
        try {
            const factory = ref.injector.get(nger_core_1.ComponentFactory);
            const parent = ref.injector.get(nger_core_1.ElementRef, null, nger_di_1.InjectFlags.SkipSelf) || new nger_core_1.ElementRef(this.root);
            //这里渲染preact
            if (ref.instance.render) {
                const tpl = ref.instance.render();
                const res = tpl(ref.instance);
                render(res, parent.nativeElement);
                // 更新试图,后面有可能会自己实现
                ref.$ngOnChange && ref.$ngOnChange.subscribe(() => {
                    const res = tpl(ref.instance);
                    render(res, parent.nativeElement, parent.nativeElement.lastElementChild);
                });
                super.attachView(ref, injector);
                const nowTime = new Date().getTime();
                const totalTime = nowTime - window.nger.startTime;
                console.log(`总耗时:${totalTime}ms`);
            }
        }
        catch (e) {
            console.log({
                ref, injector,
                e
            });
        }
    }
}
exports.BrowserApplicationRef = BrowserApplicationRef;
