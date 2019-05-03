import { Sdk, createPlatformFactory, platformCore, Http } from 'nger-core'
import { NgerTtHttp } from './http'
import { TtSdk} from './sdk'
export default createPlatformFactory(platformCore, 'ttapp', [{
    provide: Http,
    useClass: NgerTtHttp,
    deps: []
}, , {
    provide: Sdk,
    useClass: TtSdk,
    deps: []
}])