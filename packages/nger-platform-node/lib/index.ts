import { PlatformFactory, CorePlatform } from 'nger-core'
import { NgerUtil } from 'nger-util'
export default PlatformFactory.create('node',[{
    provide: NgerUtil,
    useClass: NgerUtil
}], CorePlatform)