import { InjectionToken, Injector } from 'nger-di';
export declare type Task = (path: string, opt: string, injector: Injector) => any;
export declare const WATCH_TASK: InjectionToken<Task[]>;
