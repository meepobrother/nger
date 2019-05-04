import { Logger } from 'nger-core'
import { NgerWebpackManager } from './manager'
import assetsRules from './assets'
import optimization from './optimization'

export default [{
    provide: NgerWebpackManager,
    useClass: NgerWebpackManager,
    deps: [Logger]
}];

export {
    assetsRules,
    NgerWebpackManager,
    optimization
}