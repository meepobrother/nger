import { Sdk, createPlatformFactory, platformCore, Http, Cache, Router } from 'nger-core'
import axios from 'axios'
import { NgerH5Cache } from './cache'
import { NgerH5Router } from './router'
import { H5Sdk } from './sdk'
export default createPlatformFactory(platformCore, 'h5app', [{
    provide: Http,
    useValue: axios
}, {
    provide: Cache,
    useClass: NgerH5Cache,
    deps: []
}, {
    provide: Router,
    useClass: NgerH5Router,
    deps: []
}, {
    provide: Sdk,
    useClass: H5Sdk,
    deps: []
}])