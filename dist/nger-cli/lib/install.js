"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const root = process.cwd();
let InstallCommand = class InstallCommand {
    constructor() {
        this.name = '';
    }
    run() {
        this.logger.warn(`install ${this.name}`);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], InstallCommand.prototype, "logger", void 0);
InstallCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'install <name>',
        description: '安装脚本',
        example: {
            command: 'nger install addon',
            description: '安装插件'
        }
    })
], InstallCommand);
exports.InstallCommand = InstallCommand;
