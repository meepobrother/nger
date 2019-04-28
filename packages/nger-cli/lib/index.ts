export * from './build';
export * from './init';
import { BuildCommand } from './build';
import { InitCommand } from './init';
import { TestCommand } from './test';
import { StartCommand } from './start';
import { PublishCommand } from './publish';

import { NgModule } from 'nger-core';
import { NgerModulePm2 } from 'nger-module-pm2';

import { NgerCliBuild } from './build/build'
import { NgerCliStart } from './start/start'
import { PackCommand } from './pack'

@NgModule({
    imports: [
        NgerModulePm2
    ],
    declarations: [
        BuildCommand,// 构建命令
        InitCommand,// 初始化命令
        TestCommand,// 测试命令
        StartCommand,// 启动命令
        PublishCommand,// 发布命令
        PackCommand// 打包命令
    ],
    providers: [
        NgerCliStart,
        NgerCliBuild,
    ]
})
export class NgerCli { }
