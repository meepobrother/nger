Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
let InitCommand = class InitCommand {
    constructor() {
        this.name = '';
    }
    run() {
        this.logger.warn(`init ${this.name}`);
        this.logger.warn(`output path: ${path_1.join(root, this.name)}`);
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], InitCommand.prototype, "logger", void 0);
InitCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'init <name>',
        description: '初始化',
        example: {
            command: 'nger init demo',
            description: '初始化dmeo'
        }
    })
], InitCommand);
exports.InitCommand = InitCommand;
