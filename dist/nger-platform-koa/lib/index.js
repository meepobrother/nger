"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_di_1 = require("nger-di");
const nger_core_1 = require("nger-core");
const nger_compiler_preact_1 = tslib_1.__importDefault(require("nger-compiler-preact"));
const nger_core_2 = require("nger-core");
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
const bootstrap_1 = require("./bootstrap");
const nger_util_1 = require("nger-util");
const nger_webpack_1 = tslib_1.__importDefault(require("nger-webpack"));
const nger_webpack_admin_1 = tslib_1.__importDefault(require("nger-webpack-admin"));
const nger_webpack_pc_1 = tslib_1.__importDefault(require("nger-webpack-pc"));
const nger_webpack_app_1 = tslib_1.__importDefault(require("nger-webpack-app"));
exports.default = nger_core_2.createPlatformFactory(nger_platform_node_1.default, 'koa', [
    ...nger_webpack_1.default,
    ...nger_webpack_admin_1.default,
    ...nger_webpack_pc_1.default,
    ...nger_webpack_app_1.default,
    {
        provide: nger_core_1.APP_INITIALIZER,
        useFactory: (injector) => {
            return () => {
                let providers = [];
                if (nger_core_1.isDevMode()) {
                    providers = [
                        ...providers,
                        ...nger_compiler_preact_1.default
                    ];
                }
                injector.setStatic(providers);
            };
        },
        deps: [nger_di_1.Injector],
        multi: true
    }, {
        provide: nger_core_2.NgModuleBootstrap,
        useClass: bootstrap_1.NgerPlatformKoa,
        deps: [nger_core_1.Logger, nger_util_1.NgerUtil],
        multi: true
    }
]);
