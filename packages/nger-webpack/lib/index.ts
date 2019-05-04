import { Logger } from 'nger-core'
import { NgerWebpackManager } from './manager'
import assetsRules from './assets'
import optimization from './optimization'
import { StaticProvider } from 'nger-di'
export default [{
    provide: NgerWebpackManager,
    useClass: NgerWebpackManager,
    deps: [Logger]
}] as StaticProvider[];

export {
    assetsRules,
    NgerWebpackManager,
    optimization
}