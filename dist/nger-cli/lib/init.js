"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const create_1 = require("./init/create");
let InitCommand = class InitCommand {
    constructor(fs, logger) {
        this.fs = fs;
        this.logger = logger;
        this.name = '';
    }
    run() {
        const addonPath = path_1.join(root, 'addon', this.name);
        this.logger.warn(`init ${this.name}`);
        this.logger.warn(`output path: ${addonPath}`);
        const dataPath = path_1.join(root, 'data', this.name);
        const configPath = path_1.join(root, 'config', this.name);
        const templatePath = path_1.join(root, 'template', this.name);
        this.fs.ensureDirSync(addonPath);
        this.fs.ensureDirSync(dataPath);
        this.fs.ensureDirSync(configPath);
        this.fs.ensureDirSync(templatePath);
        // 初始化项目
        create_1.build(this.name);
    }
};
InitCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'init <name>',
        description: '初始化',
        example: {
            command: 'nger init demo',
            description: '初始化dmeo'
        }
    }),
    tslib_1.__param(0, nger_core_1.Inject(nger_core_1.FILE_SYSTEM)),
    tslib_1.__metadata("design:paramtypes", [Object, nger_core_1.Logger])
], InitCommand);
exports.InitCommand = InitCommand;
