import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerSwapHttp } from './http'
export default createPlatformFactory(platformCore, 'weapp', [{
    provide: Http,
    useClass: NgerSwapHttp,
    deps: []
}])