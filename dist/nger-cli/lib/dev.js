"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_compiler_preact_1 = tslib_1.__importDefault(require("nger-compiler-preact"));
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
let NgerDevModule = class NgerDevModule {
};
NgerDevModule = tslib_1.__decorate([
    nger_core_1.NgModule()
], NgerDevModule);
exports.NgerDevModule = NgerDevModule;
const devPlatform = nger_core_1.createPlatformFactory(nger_platform_node_1.default, 'dev', nger_compiler_preact_1.default);
let DevCommand = class DevCommand {
    run() {
        devPlatform().bootstrapModule(NgerDevModule);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], DevCommand.prototype, "logger", void 0);
DevCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'dev',
        description: '开发辅助',
        example: {
            command: 'nger dev',
            description: '开启辅助'
        }
    })
], DevCommand);
exports.DevCommand = DevCommand;
