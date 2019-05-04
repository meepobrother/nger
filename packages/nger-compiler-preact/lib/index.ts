import { StaticProvider } from 'nger-di';
import { WATCH_TASK } from 'nger-compiler'
import ngerCompilerClient from 'nger-compiler-client'
import { preactTask } from './task'
const provider: StaticProvider[] = [
    ...ngerCompilerClient,
    {
        provide: WATCH_TASK,
        useValue: preactTask,
        multi: true
    }
];
export default provider;
