import { APP_INITIALIZER } from 'nger-core';
import { Injector } from 'nger-di'
import { init } from './app_init'
import { StaticProvider } from 'nger-di'

export default [{
    provide: APP_INITIALIZER,
    useFactory: init,
    deps: [Injector],
    multi: true
}]