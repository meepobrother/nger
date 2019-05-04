"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// 所有的配置都在放在这里
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["debug"] = 0] = "debug";
    LoggerLevel[LoggerLevel["info"] = 1] = "info";
    LoggerLevel[LoggerLevel["warn"] = 2] = "warn";
    LoggerLevel[LoggerLevel["error"] = 3] = "error";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
const nger_di_1 = require("nger-di");
const inject_1 = require("../decorators/inject");
exports.NGER_CONFIG = new nger_di_1.InjectionToken(`NGER_CONFIG`);
let NgerConfig = class NgerConfig {
    constructor(configs) {
        this.config = {};
        if (Array.isArray(configs)) {
            configs.map(cfg => {
                this.config = {
                    ...this.config,
                    ...cfg
                };
            });
        }
        else {
        }
    }
    get(name) {
        const config = this.config[name];
        if (config) {
            return config;
        }
        else {
            return config;
        }
    }
    set(name, value) {
        this.config[name] = value;
    }
};
NgerConfig = tslib_1.__decorate([
    tslib_1.__param(0, inject_1.Inject(exports.NGER_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [Array])
], NgerConfig);
exports.NgerConfig = NgerConfig;
