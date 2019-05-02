import { createPlatformFactory, platformCore, Http, Cache, Router } from 'nger-core'
import axios from 'axios'
import { NgerH5Cache } from './cache'
import { NgerH5Router } from './router'

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
}])