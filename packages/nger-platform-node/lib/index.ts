import { createPlatformFactory, FileSystem } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
import { NodeFs } from './file_system'
export default createPlatformFactory(ngerPlatformAxios, 'node', [{
    provide: NgerUtil,
    useClass: NgerUtil
}, {
    provide: FileSystem,
    useClass: NodeFs,
    deps: []
}])