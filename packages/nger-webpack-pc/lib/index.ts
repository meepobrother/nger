import { APP_INITIALIZER } from 'nger-core';
import { Injector } from 'nger-di'
import { init } from './app_init'
export default [{
    provide: APP_INITIALIZER,
        useFactory: init,
        deps: [Injector],
        multi: true
}]