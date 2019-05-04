"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const preact_1 = require("./preact");
const html_1 = require("./html");
const style_1 = require("./style");
const typescript_1 = require("./typescript");
const assets_1 = require("./assets");
const controller_1 = require("./controller");
const nger_di_1 = require("nger-di");
const nger_compiler_1 = require("nger-compiler");
const nger_core_1 = require("nger-core");
const nger_compiler_2 = tslib_1.__importStar(require("nger-compiler"));
const provider = [...nger_compiler_2.default, {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: preact_1.NgerCompilerPreact,
        deps: [
            html_1.NgerCompilerPreactHtml,
            style_1.NgerCompilerPreactStyle,
            assets_1.NgerCompilerPreactAssets,
            typescript_1.NgerCompilerPreactTypescript,
            nger_compiler_1.NgerCompilerNgMetadata,
            controller_1.NgerCompilerPreactController,
            nger_core_1.NgerConfig
        ],
        multi: true
    }, {
        provide: controller_1.NgerCompilerPreactController,
        useClass: controller_1.NgerCompilerPreactController,
        deps: []
    }, {
        provide: html_1.NgerCompilerPreactHtml,
        useClass: html_1.NgerCompilerPreactHtml,
        deps: [nger_di_1.Injector]
    }, {
        provide: style_1.NgerCompilerPreactStyle,
        useClass: style_1.NgerCompilerPreactStyle,
        deps: [nger_compiler_2.NgerPlatformStyle]
    }, {
        provide: typescript_1.NgerCompilerPreactTypescript,
        useClass: typescript_1.NgerCompilerPreactTypescript,
        deps: []
    }, {
        provide: assets_1.NgerCompilerPreactAssets,
        useClass: assets_1.NgerCompilerPreactAssets,
        deps: []
    }];
exports.default = provider;
