#!/usr/bin/env node
import { visitor } from 'nger-core';
import { NgerCli } from './index';
import { NgerPlatformCli } from 'nger-platform-cli';
import { ConsoleLogger, LogLevel } from 'nger-logger';
const context = visitor.visitType(NgerCli);
const logger = new ConsoleLogger(LogLevel.debug);
import domain from 'domain';
const cliDomain = domain.create();
cliDomain.on('error', (err: Error) => {
    console.log(`error ${err.message}`)
});
cliDomain.run(() => {
    if (!context) {
        logger.debug(`${NgerCli.name} visitType fail`)
    }
    if (context) {
        logger.info(`nger is running!`)
        return new NgerPlatformCli().bootstrap(context);
    }
})
