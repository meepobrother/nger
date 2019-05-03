import { platformCore, createPlatformFactory, NgModuleBootstrap } from 'nger-core'
import platformProviders from './platform-providers'
import { NgerPlatformNativeBootstrap } from './bootstrap'
export default createPlatformFactory(platformCore, 'native', [
    ...platformProviders,
    {
        provide: NgModuleBootstrap,
        useClass: NgerPlatformNativeBootstrap,
        deps: []
    }
])
export * from './platform-providers'
export * from './bootstrap'