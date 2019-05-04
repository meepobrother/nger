"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const http_1 = require("./http");
const sdk_1 = require("./sdk");
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'ttapp', [{
        provide: nger_core_1.Http,
        useClass: http_1.NgerTtHttp,
        deps: []
    }, , {
        provide: nger_core_1.Sdk,
        useClass: sdk_1.TtSdk,
        deps: []
    }]);
