"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const platform_providers_1 = tslib_1.__importDefault(require("./platform-providers"));
const bootstrap_1 = require("./bootstrap");
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'native', [
    ...platform_providers_1.default,
    {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: bootstrap_1.NgerPlatformNativeBootstrap,
        deps: []
    }
]);
tslib_1.__exportStar(require("./platform-providers"), exports);
tslib_1.__exportStar(require("./bootstrap"), exports);
