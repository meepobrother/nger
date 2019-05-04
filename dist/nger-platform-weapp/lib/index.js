"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const http_1 = require("./http");
// 微信端的SDK不用实现
// 微信端的SDK不用实现
// 微信端的SDK不用实现
// 微信端的SDK不用实现
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'weapp', [{
        provide: nger_core_1.Http,
        useClass: http_1.NgerWeappHttp,
        deps: []
    }, {
        provide: nger_core_1.Sdk,
        useValue: wx
    }]);
