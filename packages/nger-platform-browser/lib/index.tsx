import { createPlatformFactory, ApplicationRef, CustomElementRegistry, History, NgModuleBootstrap } from 'nger-core'
import { Injector } from 'nger-di'
import 'document-register-element';
import { createBrowserHistory } from 'history';
import platformAxios from 'nger-platform-axios'
import { BrowserApplicationRef } from './application'
import { NgerPlatformBrowser } from './bootstrap'
export default createPlatformFactory(platformAxios, 'browser', [{
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