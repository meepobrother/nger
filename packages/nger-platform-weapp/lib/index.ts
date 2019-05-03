import { createPlatformFactory, platformCore, Http, Sdk } from 'nger-core'
import { NgerWeappHttp } from './http'
declare const wx: any;
// 微信端的SDK不用实现
// 微信端的SDK不用实现
// 微信端的SDK不用实现
// 微信端的SDK不用实现
export default createPlatformFactory(platformCore, 'weapp', [{
    provide: Http,
    useClass: NgerWeappHttp,
    deps: []
}, {
    provide: Sdk,
    useValue: wx
}]);