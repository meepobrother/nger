"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const nger_di_1 = require("nger-di");
const app_init_1 = require("./app_init");
exports.default = [{
        provide: nger_core_1.APP_INITIALIZER,
        useFactory: app_init_1.init,
        deps: [nger_di_1.Injector],
        multi: true
    }];
