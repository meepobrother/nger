"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
let PublishCommand = class PublishCommand {
    run() {
        this.logger.warn(`testing`);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], PublishCommand.prototype, "logger", void 0);
PublishCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'publish',
        description: '发布src目录下的应用',
        example: {
            command: 'nger publish',
            description: '发布应用'
        }
    })
], PublishCommand);
exports.PublishCommand = PublishCommand;
