Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const pm2_1 = require("./providers/pm2");
exports.NgerPm2Service = pm2_1.NgerPm2Service;
const nger_util_1 = require("nger-util");
let NgerModulePm2 = class NgerModulePm2 {
};
NgerModulePm2 = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            pm2_1.NgerPm2Service, nger_util_1.NgerUtil
        ]
    })
], NgerModulePm2);
exports.NgerModulePm2 = NgerModulePm2;
