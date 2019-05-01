import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerAlipayHttp } from './http'
export default createPlatformFactory(platformCore, 'weapp', [{
    provide: Http,
    useClass: NgerAlipayHttp,
    deps: []
}])