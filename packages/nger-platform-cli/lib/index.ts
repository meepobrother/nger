
import { NgerPm2Service } from './pm2'
import { NgerUtil } from 'nger-util'
import platformNode from 'nger-platform-node'
import { createPlatformFactory, NgModuleBootstrap, Logger } from 'nger-core'
import { NgerPlatformCli } from './bootstrap'
export default createPlatformFactory(platformNode, 'cli', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformCli,
    deps: [Logger],
    multi: true
}, {
    provide: NgerPm2Service,
    useClass: NgerPm2Service,
    deps: [
        Logger,
        NgerUtil
    ]
}])