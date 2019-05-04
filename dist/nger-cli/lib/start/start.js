"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_koa_1 = tslib_1.__importDefault(require("nger-platform-koa"));
const nger_core_1 = require("nger-core");
let NgerCliStart = class NgerCliStart {
    /** koa */
    koa(type) {
        this.logger && this.logger.info(`koa is running`);
        nger_platform_koa_1.default([]).bootstrapModule(type, {});
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], NgerCliStart.prototype, "logger", void 0);
NgerCliStart = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCliStart);
exports.NgerCliStart = NgerCliStart;
