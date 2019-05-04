"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const style_1 = tslib_1.__importStar(require("./style"));
exports.NgerPlatformStyle = style_1.NgerPlatformStyle;
const image_1 = require("./assets/image");
exports.NgerCompilerImage = image_1.NgerCompilerImage;
const uglify_1 = require("./ts/uglify");
exports.NgerCompilerUglify = uglify_1.NgerCompilerUglify;
const babel_1 = require("./ts/babel");
exports.NgerCompilerBabel = babel_1.NgerCompilerBabel;
const nger_core_1 = require("nger-core");
const typescript_1 = require("./ts/typescript");
exports.NgerCompilerTypescript = typescript_1.NgerCompilerTypescript;
const rollup_1 = require("./ts/rollup");
exports.NgerCompilerRollup = rollup_1.NgerCompilerRollup;
const ng_1 = require("./html/ng");
exports.NgerCompilerNgTemplate = ng_1.NgerCompilerNgTemplate;
const cid_1 = require("./helper/cid");
exports.NgerCompilerCid = cid_1.NgerCompilerCid;
const ng_metadata_1 = require("./helper/ng_metadata");
exports.NgerCompilerNgMetadata = ng_metadata_1.NgerCompilerNgMetadata;
const controller_1 = require("./transformer_factorys/controller");
exports.controllerPropertyTransformerFactory = controller_1.controllerPropertyTransformerFactory;
exports.hasPropertyMetadata = controller_1.hasPropertyMetadata;
const watch_task_1 = require("./tokens/watch_task");
exports.WATCH_TASK = watch_task_1.WATCH_TASK;
const bootstrap_1 = require("./bootstrap");
exports.metadataCache = bootstrap_1.metadataCache;
exports.hasHandlerFileCache = bootstrap_1.hasHandlerFileCache;
exports.templateCache = bootstrap_1.templateCache;
const controller_2 = require("./visitors/controller");
const nger_core_2 = require("nger-core");
const nger_util_1 = require("nger-util");
const provides = [
    ...style_1.default,
    {
        provide: nger_core_2.NgModuleBootstrap,
        useClass: bootstrap_1.NgerCompilerBootstrap,
        deps: [nger_util_1.NgerUtil],
        multi: true
    },
    {
        provide: nger_core_1.TraverVisitor,
        useValue: controller_2.controllerVisitor,
        multi: true
    },
    {
        provide: ng_metadata_1.NgerCompilerNgMetadata,
        useClass: ng_metadata_1.NgerCompilerNgMetadata,
        deps: []
    },
    {
        provide: cid_1.NgerCompilerCid,
        useClass: cid_1.NgerCompilerCid,
        deps: []
    },
    {
        provide: image_1.NgerCompilerImage,
        useClass: image_1.NgerCompilerImage,
        deps: []
    },
    {
        provide: uglify_1.NgerCompilerUglify,
        useClass: uglify_1.NgerCompilerUglify,
        deps: []
    }, {
        provide: typescript_1.NgerCompilerTypescript,
        useClass: typescript_1.NgerCompilerTypescript,
        deps: []
    }, {
        provide: rollup_1.NgerCompilerRollup,
        useClass: rollup_1.NgerCompilerRollup,
        deps: []
    }, {
        provide: ng_1.NgerCompilerNgTemplate,
        useClass: ng_1.NgerCompilerNgTemplate,
        deps: []
    }, {
        provide: babel_1.NgerCompilerBabel,
        useClass: babel_1.NgerCompilerBabel,
        deps: [
            typescript_1.NgerCompilerTypescript,
            nger_core_1.TraverVisitor,
            nger_core_1.Resolver
        ]
    }
];
exports.default = provides;
