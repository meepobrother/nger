Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
const createPlatform_1 = require("./createPlatform");
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
    const desc = `Platform: ${name}`;
    const marker = new nger_di_1.InjectionToken(desc);
    return (extraProviders = []) => {
        let platform = createPlatform_1.getPlatform();
        if (!platform || platform.injector.get(createPlatform_1.ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders)
                    .concat({ provide: marker, useValue: true }));
            }
            else {
                const injectedProviders = providers.concat(extraProviders).concat({ provide: marker, useValue: true });
                createPlatform_1.createPlatform(nger_di_1.Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
exports.createPlatformFactory = createPlatformFactory;
function assertPlatform(requiredToken) {
    const platform = createPlatform_1.getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;
