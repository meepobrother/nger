Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./build"), exports);
tslib_1.__exportStar(require("./init"), exports);
const build_1 = require("./build");
const init_1 = require("./init");
const test_1 = require("./test");
const start_1 = require("./start");
const publish_1 = require("./publish");
const nger_core_1 = require("nger-core");
const nger_module_pm2_1 = require("nger-module-pm2");
const build_2 = require("./build/build");
const start_2 = require("./start/start");
const pack_1 = require("./pack");
let NgerCli = class NgerCli {
};
NgerCli = tslib_1.__decorate([
    nger_core_1.NgModule({
        imports: [
            nger_module_pm2_1.NgerModulePm2
        ],
        declarations: [
            build_1.BuildCommand,
            init_1.InitCommand,
            test_1.TestCommand,
            start_1.StartCommand,
            publish_1.PublishCommand,
            pack_1.PackCommand // 打包命令
        ],
        providers: [
            start_2.NgerCliStart,
            build_2.NgerCliBuild
        ]
    })
], NgerCli);
exports.NgerCli = NgerCli;
