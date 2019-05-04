import { NgerCompilerPreact } from './preact'
import { StaticProvider } from 'nger-di';
import { NgerCompilerNgMetadata, WATCH_TASK } from 'nger-compiler'
import { NgModuleBootstrap, NgerConfig, Logger } from 'nger-core'
import ngerCompilerClient from 'nger-compiler-client'
import { preactTask } from './task'
const provider: StaticProvider[] = [
    ...ngerCompilerClient,
    {
        provide: WATCH_TASK,
        useValue: preactTask,
        multi: true
    },
    {
        provide: NgModuleBootstrap,
        useClass: NgerCompilerPreact,
        deps: [
            NgerCompilerNgMetadata,
            NgerConfig,
            Logger
        ],
        multi: true
    }
];
export default provider;
