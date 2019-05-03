import { Sdk, createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerAlipayHttp } from './http'
import { AlipaySdk } from './sdk'
export default createPlatformFactory(platformCore, 'alipay', [{
    provide: Http,
    useClass: NgerAlipayHttp,
    deps: []
}, {
    provide: Sdk,
    useClass: AlipaySdk,
    deps: []
}])