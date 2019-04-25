export * from './build';
export * from './init';
import { BuildCommand } from './build';
import { InitCommand } from './init';
import { TestCommand } from './test';
import { StartCommand } from './start';
import { NgModule } from 'nger-core';
import { NgerModuleGulp } from 'nger-module-gulp'
import { NgerModuleWebpack } from 'nger-module-webpack'
import { NgerModulePm2 } from 'nger-module-pm2'

@NgModule({
    imports: [
        NgerModuleGulp,
        NgerModuleWebpack,
        NgerModulePm2
    ],
    declarations: [
        BuildCommand,
        InitCommand,
        TestCommand,
        StartCommand
    ]
})
export class NgerCli { }
