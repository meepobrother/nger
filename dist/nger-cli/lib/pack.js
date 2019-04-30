Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
let PackCommand = class PackCommand {
    run() {
        this.logger.info(`PackCommand is running! name is : ${this.name || ''}`);
        if (this.name) {
            // 打包单个项目
        }
        else {
            // 全部打包
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], PackCommand.prototype, "logger", void 0);
PackCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'pack [name]',
        description: '打包packages目录下的ts文件',
        example: {
            command: 'nger publish',
            description: '打包packages'
        }
    })
], PackCommand);
exports.PackCommand = PackCommand;
