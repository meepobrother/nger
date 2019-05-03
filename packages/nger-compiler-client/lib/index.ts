import { NgModuleBootstrap, FileSystem, Logger } from 'nger-core'
import compilerProviders, { NgerCompilerNgMetadata, NgerCompilerBabel, NgerCompilerBabelController } from 'nger-compiler'
import { NgerCompilerClientBootstrap } from './bootstrap'
import { NgerUtil } from 'nger-util'
export default [
    ...compilerProviders,
    {
        provide: NgModuleBootstrap,
        useClass: NgerCompilerClientBootstrap,
        multi: true,
        deps: [
            NgerCompilerNgMetadata, FileSystem, NgerUtil,
            NgerCompilerBabel, Logger, NgerCompilerBabelController
        ]
    },
]