import { Sdk, createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerSwapHttp } from './http'
import { SwapSdk } from './sdk'
export default createPlatformFactory(platformCore, 'baiduapp', [{
    provide: Http,
    useClass: NgerSwapHttp,
    deps: []
}, {
    provide: Sdk,
    useClass: SwapSdk,
    deps: []
}])