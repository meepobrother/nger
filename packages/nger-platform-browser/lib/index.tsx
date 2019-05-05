import { createPlatformFactory, RENDER, TEXT_ATTRIBUTE, ApplicationRef, Http, platformCore, CustomElementRegistry, History, NgModuleBootstrap } from 'nger-core'
import { Injector } from 'nger-di'
import 'document-register-element';
import { createBrowserHistory } from 'history';
import { BrowserApplicationRef } from './application'
import { NgerPlatformBrowser } from './bootstrap'
import axios from 'axios'
import { render } from './render'
export default createPlatformFactory(platformCore, 'browser', [{
    provide: RENDER,
    useValue: render,
}, {
    provide: TEXT_ATTRIBUTE,
    useValue: (opt: any) => {
        return opt;
    }
}, {
    provide: Http,
    useValue: axios
}, {
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