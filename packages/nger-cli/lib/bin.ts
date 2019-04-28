#!/usr/bin/env node
import { visitor } from 'nger-core';
import { NgerCli } from './index';
import ngerPlatformCli from 'nger-platform-cli';
const context = visitor.visitType(NgerCli);
if (context) {
    ngerPlatformCli([]).bootstrapModule(NgerCli, {}).then(ref => { });
}
