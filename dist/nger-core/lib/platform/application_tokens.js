"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports.APP_ID = new nger_di_1.InjectionToken('AppId');
function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
exports._appIdRandomProviderFactory = _appIdRandomProviderFactory;
exports.APP_ID_RANDOM_PROVIDER = {
    provide: exports.APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: [],
};
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
exports._randomChar = _randomChar;
exports.PLATFORM_INITIALIZER = new nger_di_1.InjectionToken('Platform Initializer');
exports.PLATFORM_ID = new nger_di_1.InjectionToken('Platform ID');
exports.APP_BOOTSTRAP_LISTENER = new nger_di_1.InjectionToken('appBootstrapListener');
exports.PACKAGE_ROOT_URL = new nger_di_1.InjectionToken('Application Packages Root URL');
