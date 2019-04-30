import { createPlatformFactory, Logger, NgModuleBootstrap, FileSystem } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import { NgerPlatformNode } from './core/index'
import styleProviders, { NgerPlatformStyle } from 'nger-provider-style'
import typescriptProviders, { NgerCompilerTypescript, NgerBabel } from 'nger-provider-typescript'
export default createPlatformFactory(ngerPlatformAxios, 'node', [
    ...styleProviders,
    ...typescriptProviders,
    {
        provide: NgModuleBootstrap,
        useClass: NgerPlatformNode,
        deps: [FileSystem, Logger, NgerPlatformStyle, NgerCompilerTypescript, NgerBabel],
        multi: true
    }, {
        provide: NgerUtil,
        useClass: NgerUtil,
        deps: [
            Logger
        ]
    }, {
        provide: FileSystem,
        useValue: require('fs-extra')
    }
]);