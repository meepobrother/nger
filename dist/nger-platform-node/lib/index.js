Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_util_1 = require("nger-util");
const nger_platform_axios_1 = tslib_1.__importDefault(require("nger-platform-axios"));
const index_1 = require("./core/index");
const nger_provider_style_1 = tslib_1.__importStar(require("nger-provider-style"));
const nger_provider_typescript_1 = tslib_1.__importStar(require("nger-provider-typescript"));
exports.default = nger_core_1.createPlatformFactory(nger_platform_axios_1.default, 'node', [
    ...nger_provider_style_1.default,
    ...nger_provider_typescript_1.default,
    {
        provide: nger_core_1.NgModuleBootstrap,
        useClass: index_1.NgerPlatformNode,
        deps: [nger_core_1.FileSystem, nger_core_1.Logger, nger_provider_style_1.NgerPlatformStyle, nger_provider_typescript_1.NgerCompilerTypescript],
        multi: true
    }, {
        provide: nger_util_1.NgerUtil,
        useClass: nger_util_1.NgerUtil,
        deps: [
            nger_core_1.Logger
        ]
    }, {
        provide: nger_core_1.FileSystem,
        useValue: require('fs-extra')
    }
]);
