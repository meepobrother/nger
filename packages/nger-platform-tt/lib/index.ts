import { createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerTtHttp } from './http'
export default createPlatformFactory(platformCore, 'ttapp', [{
    provide: Http,
    useClass: NgerTtHttp,
    deps: []
}])