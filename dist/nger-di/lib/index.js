Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// export * from './injector';
tslib_1.__exportStar(require("./util"), exports);
tslib_1.__exportStar(require("./injection_token"), exports);
tslib_1.__exportStar(require("./type"), exports);
var injector_ng_1 = require("./injector_ng");
exports.Injector = injector_ng_1.Injector;
exports.StaticInjector = injector_ng_1.StaticInjector;
