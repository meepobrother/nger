import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerAlipayHttp } from './http'
export default createPlatformFactory(platformCore, 'alipay', [{
    provide: Http,
    useClass: NgerAlipayHttp,
    deps: []
}])