import { NgerApp } from './app'
import { NgerAdmin } from './admin'
import { NgerServer } from './server'

import { Addon } from 'nger-core'

@Addon({
    app: NgerApp,
    admin: NgerAdmin,
    server: NgerServer
})
export default class NgerAddon { }