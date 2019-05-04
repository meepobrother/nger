"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pm2_1 = require("./pm2");
const nger_util_1 = require("nger-util");
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
const nger_core_1 = require("nger-core");
const bootstrap_1 = require("./bootstrap");
exports.default = nger_core_1.createPlatformFactory(nger_platform_node_1.default, 'cli', [{
        provide: nger_core_1.NgModuleBootstrap,
        useClass: bootstrap_1.NgerPlatformCli,
        deps: [nger_core_1.Logger],
        multi: true
    }, {
        provide: pm2_1.NgerPm2Service,
        useClass: pm2_1.NgerPm2Service,
        deps: [
            nger_core_1.Logger,
            nger_util_1.NgerUtil
        ]
    }]);
