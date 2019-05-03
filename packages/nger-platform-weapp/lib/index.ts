import { createPlatformFactory, platformCore, Http, Sdk } from 'nger-core'
import { NgerWeappHttp } from './http'
declare const wx: any;
export default createPlatformFactory(platformCore, 'weapp', [{
    provide: Http,
    useClass: NgerWeappHttp,
    deps: []
}, {
    provide: Sdk,
    useValue: wx
}])