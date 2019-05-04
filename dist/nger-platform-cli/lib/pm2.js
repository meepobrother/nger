"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_util_1 = require("nger-util");
let NgerPm2Service = class NgerPm2Service {
    constructor(logger, util) {
        this.logger = logger;
        this.util = util;
    }
    get pm2() {
        return this.util.loadPkg('pm2');
    }
    /** 启动 */
    start(options) {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.start(options, (err, proc) => {
                if (err)
                    return reject(err);
                resolve(proc);
            });
        });
    }
    /** 停止 */
    stop(process) {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.stop(process, (err, proc) => {
                if (err)
                    return reject(err);
                resolve(proc);
            });
        });
    }
    /** 重启 */
    restart(process) {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.restart(process, (err, proc) => {
                if (err)
                    return reject(err);
                resolve(proc);
            });
        });
    }
    /** 列表 */
    list() {
        return new Promise(async (resolve, reject) => {
            const pm2 = await this.pm2;
            pm2.list((err, processDescriptionList) => {
                if (err)
                    return reject(err);
                resolve(processDescriptionList);
            });
        });
    }
};
NgerPm2Service = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__param(1, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_core_1.Logger,
        nger_util_1.NgerUtil])
], NgerPm2Service);
exports.NgerPm2Service = NgerPm2Service;
