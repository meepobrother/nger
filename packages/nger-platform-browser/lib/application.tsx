// 负责挂载到dom 如果是小程序 可设为空
import { ApplicationRef, ComponentFactory, ComponentRef, ElementRef, ComponentFactoryResolver } from 'nger-core'
import { Injector, Type, InjectFlags } from 'nger-di'
import react from 'react';
import { render } from 'react-dom';
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
        const Header = ({ children }) => <div>{children} </div>
        const Dev = () => <Header>i am a preact !</Header>
        render(<Dev />, (parent as any).firstElementChild);
        super.attachView(view);
    }
}