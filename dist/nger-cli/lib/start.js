Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const start_1 = require("./start/start");
const nger_di_1 = require("nger-di");
let StartCommand = class StartCommand {
    constructor(injector) {
        this.injector = injector;
        this.type = 'koa';
        this.port = 3000;
        this.dev = false;
    }
    run() {
        nger_core_1.setDevMode(!!this.dev);
        nger_core_1.setPort(this.port || 3000);
        this.logger && this.logger.warn(`start ${this.type}`);
        const source = path_1.join(root, 'src/server');
        const serverSource = require(source).default;
        if (serverSource) {
            switch (this.type) {
                case 'express':
                    this.start.express(serverSource);
                    break;
                case 'koa':
                    this.start.koa(serverSource);
                    break;
                case 'hapi':
                    this.start.hapi(serverSource);
                    break;
                default:
                    break;
            }
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], StartCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", start_1.NgerCliStart)
], StartCommand.prototype, "start", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'p'
    }),
    tslib_1.__metadata("design:type", Number)
], StartCommand.prototype, "port", void 0);
tslib_1.__decorate([
    nger_core_1.Option(),
    tslib_1.__metadata("design:type", Boolean)
], StartCommand.prototype, "dev", void 0);
StartCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'start [type]',
        description: '启动',
        example: {
            command: 'nger start koi [-p 3000 --dev]',
            description: '启动'
        }
    }),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector])
], StartCommand);
exports.StartCommand = StartCommand;
