"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const axios_1 = tslib_1.__importDefault(require("axios"));
const cache_1 = require("./cache");
const router_1 = require("./router");
const sdk_1 = require("./sdk");
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'h5app', [{
        provide: nger_core_1.Http,
        useValue: axios_1.default
    }, {
        provide: nger_core_1.Cache,
        useClass: cache_1.NgerH5Cache,
        deps: []
    }, {
        provide: nger_core_1.Router,
        useClass: router_1.NgerH5Router,
        deps: []
    }, {
        provide: nger_core_1.Sdk,
        useClass: sdk_1.H5Sdk,
        deps: []
    }]);
