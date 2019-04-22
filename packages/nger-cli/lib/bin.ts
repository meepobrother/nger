#!/usr/bin/env node
import { visitor } from 'nger-core';
import { NgerCli } from './index';
import { NgerPlatformCli } from 'nger-platform-cli';
const context = visitor.visitType(NgerCli);
new NgerPlatformCli(context).run();
