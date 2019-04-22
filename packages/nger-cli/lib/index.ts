export * from './build'
export * from './init'
export * from './bootstrap'

import { BuildCommand } from './build'
import { InitCommand } from './init'
import { Cli } from 'nger-core'
import { join } from 'path';
const pkg = require(join(__dirname, '../', 'package.json'));

@Cli({
    name: 'nger cli',
    version: pkg.version,
    commands: [
        BuildCommand,
        InitCommand
    ]
})
export class NgerCli { }
