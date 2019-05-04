"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const manager_1 = require("./manager");
exports.NgerWebpackManager = manager_1.NgerWebpackManager;
const assets_1 = tslib_1.__importDefault(require("./assets"));
exports.assetsRules = assets_1.default;
const optimization_1 = tslib_1.__importDefault(require("./optimization"));
exports.optimization = optimization_1.default;
exports.default = [{
        provide: manager_1.NgerWebpackManager,
        useClass: manager_1.NgerWebpackManager,
        deps: [nger_core_1.Logger]
    }];
