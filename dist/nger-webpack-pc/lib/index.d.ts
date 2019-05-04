import { Injector } from 'nger-di';
import { init } from './app_init';
declare const _default: {
    provide: import("../../nger-di/lib").InjectionToken<(() => void)[]>;
    useFactory: typeof init;
    deps: (typeof Injector)[];
    multi: boolean;
}[];
export default _default;
