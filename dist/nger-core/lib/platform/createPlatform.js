Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const platform_ref_1 = require("./platform_ref");
const application_tokens_1 = require("./application_tokens");
let _platform;
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
exports.getPlatform = getPlatform;
exports.ALLOW_MULTIPLE_PLATFORMS = new nger_di_1.InjectionToken('AllowMultipleToken');
function createPlatform(injector) {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(platform_ref_1.PlatformRef);
    const inits = injector.get(application_tokens_1.PLATFORM_INITIALIZER, undefined, nger_di_1.InjectFlags.Optional) || [];
    if (inits)
        inits.forEach((init) => init());
    return _platform;
}
exports.createPlatform = createPlatform;
