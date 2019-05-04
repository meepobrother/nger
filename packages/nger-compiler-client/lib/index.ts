import compilerProviders from 'nger-compiler'
import { clientTask } from './task';
import {
    WATCH_TASK
} from 'nger-compiler'
export default [
    ...compilerProviders,
    {
        provide: WATCH_TASK,
        useValue: clientTask,
        multi: true
    }
]