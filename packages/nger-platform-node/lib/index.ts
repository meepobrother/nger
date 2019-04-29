import { createPlatformFactory, FileSystem, Logger, NgModuleBootstrap } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import { NodeFs } from './file_system'
import { NgerPlatformNode } from './core/index'
export default createPlatformFactory(ngerPlatformAxios, 'node', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformNode,
    deps: [
        FileSystem, Logger
    ],
    multi: true
}, {
    provide: NgerUtil,
    useClass: NgerUtil,
    deps: [
        Logger
    ]
}, {
    provide: FileSystem,
    useClass: NodeFs,
    deps: []
}])