import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerSwapHttp } from './http'
export default createPlatformFactory(platformCore, 'baiduapp', [{
    provide: Http,
    useClass: NgerSwapHttp,
    deps: []
}])