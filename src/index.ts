import { NgerApp } from './app'
import { NgerAdmin } from './admin'
import { NgerServer } from './server'

import { Addon } from 'nger-core'

@Addon({
    // 移动端
    app: NgerApp,
    // pc端
    admin: NgerAdmin,
    // api
    server: NgerServer
})
export default class NgerAddon { }