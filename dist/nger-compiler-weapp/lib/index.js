"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const weapp_1 = require("./weapp");
const html_1 = require("./html");
const style_1 = require("./style");
const typescript_1 = require("./typescript");
const assets_1 = require("./assets");
const nger_di_1 = require("nger-di");
const nger_compiler_1 = require("nger-compiler");
const nger_compiler_client_1 = tslib_1.__importDefault(require("nger-compiler-client"));
const nger_core_1 = require("nger-core");
const provider = [
    ...nger_compiler_client_1.default,
    {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: weapp_1.NgerCompilerWeapp,
        deps: [
            html_1.NgerCompilerWeappHtml,
            style_1.NgerCompilerWeappStyle,
            assets_1.NgerCompilerWeappAssets,
            typescript_1.NgerCompilerWeappTypescript,
            nger_compiler_1.NgerCompilerNgMetadata,
            nger_core_1.NgerConfig
        ],
        multi: true
    }, {
        provide: html_1.NgerCompilerWeappHtml,
        useClass: html_1.NgerCompilerWeappHtml,
        deps: [nger_di_1.Injector]
    }, {
        provide: style_1.NgerCompilerWeappStyle,
        useClass: style_1.NgerCompilerWeappStyle,
        deps: []
    }, {
        provide: typescript_1.NgerCompilerWeappTypescript,
        useClass: typescript_1.NgerCompilerWeappTypescript,
        deps: []
    }, {
        provide: assets_1.NgerCompilerWeappAssets,
        useClass: assets_1.NgerCompilerWeappAssets,
        deps: []
    }
];
exports.default = provider;
