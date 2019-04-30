Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const nger_core_1 = require("nger-core");
const nger_util_1 = require("nger-util");
class GetParser extends nger_core_1.Parser {
    // 这里新建instance
    parse(instance, context) {
        return instance;
    }
}
exports.GetParser = GetParser;
exports.default = nger_core_1.createPlatformFactory(nger_core_1.platformCore, 'express', [{
        provide: nger_core_1.Parser,
        useFactory: async (util) => {
            const exp = await util.loadPkg('express');
            const app = exp();
            const server = http_1.createServer(app);
            const port = nger_core_1.getPort();
            server.listen(port, () => {
                console.info(`app start at http://localhost:${port}`);
            });
            return new GetParser();
        },
        deps: [nger_util_1.NgerUtil]
    }]);
