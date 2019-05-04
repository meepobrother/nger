"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const mocha_1 = tslib_1.__importDefault(require("mocha"));
const options = {};
const _mocha = new mocha_1.default(options);
let TestCommand = class TestCommand {
    constructor() {
        this.type = 'server';
    }
    run() {
        this.logger.warn(`testing`);
        _mocha.addFile(path_1.join(__dirname, `test/${this.type}.ts`));
        _mocha.run((failures) => { });
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], TestCommand.prototype, "logger", void 0);
TestCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'test [type]',
        description: '单元测试',
        example: {
            command: 'nger test',
            description: '单元测试'
        }
    })
], TestCommand);
exports.TestCommand = TestCommand;
