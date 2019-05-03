import ngerPlatformNative from 'nger-platform-native'
import { createPlatformFactory, NgModuleBootstrap } from 'nger-core'
import { NgerPlatformIosBootstrap } from './bootstrap'
export default createPlatformFactory(ngerPlatformNative, 'native', [
    {
        provide: NgModuleBootstrap,
        useClass: NgerPlatformIosBootstrap,
        deps: []
    }
])
export { NATIVE_CONFIG } from './bootstrap'