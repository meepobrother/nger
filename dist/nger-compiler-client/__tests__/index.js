"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
const lib_1 = tslib_1.__importDefault(require("../lib"));
let NgerCompilerTestModule = class NgerCompilerTestModule {
};
NgerCompilerTestModule = tslib_1.__decorate([
    nger_core_1.NgModule()
], NgerCompilerTestModule);
exports.NgerCompilerTestModule = NgerCompilerTestModule;
nger_core_1.createPlatformFactory(nger_platform_node_1.default, 'test', lib_1.default)([]).bootstrapModule(NgerCompilerTestModule);
