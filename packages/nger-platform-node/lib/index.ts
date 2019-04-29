import { createPlatformFactory, Logger, NgModuleBootstrap, FileSystem } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import { NgerPlatformNode } from './core/index'
export default createPlatformFactory(ngerPlatformAxios, 'node', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformNode,
    deps: [FileSystem, Logger],
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
}])