import { InjectionToken, Injector } from 'nger-di'
export type Task = (path: string, opt: string, injector: Injector) => any;
export const WATCH_TASK = new InjectionToken<Task[]>(`WATCH_TASK`)
