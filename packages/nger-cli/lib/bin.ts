#!/usr/bin/env node
import { visitor } from 'nger-core';
import { NgerCli, bootstrap } from './index';
const context = visitor.visitType(NgerCli);
bootstrap(context);