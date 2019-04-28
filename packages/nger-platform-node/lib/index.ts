import { createPlatformFactory, platformCore } from 'nger-core'
import { NgerUtil } from 'nger-util'
import ngerPlatformAxios from 'nger-platform-axios'
export default createPlatformFactory(ngerPlatformAxios, 'node', [{
    provide: NgerUtil,
    useClass: NgerUtil
}])