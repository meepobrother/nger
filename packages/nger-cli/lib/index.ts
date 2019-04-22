export * from './build'
export * from './init'

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
