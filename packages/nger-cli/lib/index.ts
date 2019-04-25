export * from './build';
export * from './init';
import { BuildCommand } from './build';
import { InitCommand } from './init';
import { TestCommand } from './test';
import { StartCommand } from './start';
import { PublishCommand } from './publish';

import { NgModule } from 'nger-core';
import { NgerModuleGulp } from 'nger-module-gulp';
import { NgerModuleWebpack } from 'nger-module-webpack';
import { NgerModulePm2 } from 'nger-module-pm2';

import { NgerCliBuild } from './build/build'
import { NgerCliStart } from './start/start'

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
        StartCommand,
        PublishCommand
    ],
    providers: [
        NgerCliStart,
        NgerCliBuild,
    ]
})
export class NgerCli { }
