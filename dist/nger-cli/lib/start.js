"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const start_1 = require("./start/start");
const nger_di_1 = require("nger-di");
let StartCommand = class StartCommand {
    constructor(injector) {
        this.injector = injector;
        this.port = 3000;
        this.watch = false;
    }
    run() {
        nger_core_1.setDevMode(!!this.watch);
        nger_core_1.setPort(this.port || 3000);
        this.logger.warn(`starting ${this.name || 'nger'}`);
        this.logger.warn(`watch: ${!!this.watch}`);
        this.logger.warn(`port: ${this.port || 3000}`);
        if (this.name) {
            nger_core_1.setCurrentDev(this.name);
            const source = path_1.join(root, `addon/${this.name}/server`);
            const serverSource = require(source).default;
            this.start.koa(serverSource);
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], StartCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", start_1.NgerCliStart)
], StartCommand.prototype, "start", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'p'
    }),
    tslib_1.__metadata("design:type", Number)
], StartCommand.prototype, "port", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'w'
    }),
    tslib_1.__metadata("design:type", Boolean)
], StartCommand.prototype, "watch", void 0);
StartCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'start [name]',
        description: '启动',
        example: {
            command: 'nger start koi [-p 3000 --dev]',
            description: '启动'
        }
    }),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector])
], StartCommand);
exports.StartCommand = StartCommand;
