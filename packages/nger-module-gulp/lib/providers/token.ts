import { InjectionToken } from 'nger-di';
import Undertaker from "undertaker";
export interface GulpTask {
    name: string;
    task: Undertaker.TaskFunction;
}
/** gulp 任务 Multi true */
export const GulpTasksToken = new InjectionToken<GulpTask>(`GulpTasksToken`)
