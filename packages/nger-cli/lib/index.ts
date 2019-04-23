export * from './build';
export * from './init';

import { BuildCommand } from './build';
import { InitCommand } from './init';
import { TestCommand } from './test';
import { StartCommand } from './start';

import { NgModule } from 'nger-core';

@NgModule({
    providers: [
        BuildCommand,
        InitCommand,
        TestCommand,
        StartCommand
    ]
})
export class NgerCli { }
