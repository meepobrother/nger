Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const nger_core_1 = require("nger-core");
const nger_platform_node_1 = tslib_1.__importDefault(require("nger-platform-node"));
class NgerPlatformTest extends nger_core_1.NgModuleBootstrap {
    async run(ref) {
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        ngModule.declarations.map(provider => {
            describe(`${provider.target.name}`, () => {
                const itMethods = provider.getMethod(nger_core_1.ItMetadataKey);
                itMethods.map(mt => {
                    const def = mt.ast.metadataDef;
                    it(def.topic, async () => {
                        await def.handler(chai_1.expect, provider.instance);
                    });
                });
            });
        });
    }
}
exports.NgerPlatformTest = NgerPlatformTest;
exports.default = nger_core_1.createPlatformFactory(nger_platform_node_1.default, 'test', [{
        provide: nger_core_1.NgModuleBootstrap,
        useClass: NgerPlatformTest,
        multi: true,
        deps: []
    }]);
