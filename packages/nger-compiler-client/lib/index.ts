import compilerProviders, { WATCH_TASK } from 'nger-compiler'
import { clientTask } from './task';
export default [
    ...compilerProviders,
    {
        provide: WATCH_TASK,
        useValue: clientTask,
        multi: true
    }
]