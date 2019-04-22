export * from './build'
export * from './init'
export * from './bootstrap'

import { BuildCommand } from './build'
import { InitCommand } from './init'
import { NgModule } from 'nger-core'

@NgModule({
    providers: [
        BuildCommand,
        InitCommand
    ]
})
export class NgerCli { }
