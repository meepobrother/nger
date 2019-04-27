#!/usr/bin/env node
import { visitor, Compiler } from 'nger-core';
import { NgerCli } from './index';
import { NgerPlatformCli } from 'nger-platform-cli';
import { ConsoleLogger, LogLevel } from 'nger-logger';

const context = visitor.visitType(NgerCli);
const logger = new ConsoleLogger(LogLevel.debug);
if (!context) {
    logger.debug(`${NgerCli.name} visitType fail`)
}
if (context) {
    logger.info(`nger is running!`)
    const compuiler = new Compiler();
    const ref = compuiler.bootstrap(NgerCli)
    new NgerPlatformCli().bootstrap(ref);
}