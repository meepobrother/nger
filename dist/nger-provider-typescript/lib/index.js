Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("./typescript");
exports.NgerCompilerTypescript = typescript_1.NgerCompilerTypescript;
const staticProvider = [{
        provide: typescript_1.NgerCompilerTypescript,
        useClass: typescript_1.NgerCompilerTypescript,
        deps: []
    }];
exports.default = staticProvider;
