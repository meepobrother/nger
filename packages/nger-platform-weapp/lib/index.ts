import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerWeappHttp } from './http'
export default createPlatformFactory(platformCore, 'weapp', [{
    provide: Http,
    useClass: NgerWeappHttp,
    deps: []
}])