#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const index_1 = require("./index");
const nger_platform_cli_1 = tslib_1.__importDefault(require("nger-platform-cli"));
const context = nger_core_1.visitor.visitType(index_1.NgerCli);
if (context) {
    nger_platform_cli_1.default([]).bootstrapModule(index_1.NgerCli, {}).then(ref => { });
}
