"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const public_api_1 = require("./build/public_api");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
let BuildCommand = class BuildCommand {
    constructor() {
        this.type = 'lib';
    }
    async run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`package: ${this.name || 'all'}`);
        switch (this.type) {
            case 'lib':
                const libPkgs = fs_extra_1.default.readdirSync(path_1.join(root, 'packages'));
                if (this.name) {
                    this.logger.warn(`build.lib: ${this.name}`);
                    await this.build.dev(this.name, !!this.watch);
                }
                else {
                    for (let pkg of libPkgs) {
                        if (pkg.startsWith('.')) { }
                        else {
                            this.logger.warn(`build.lib: ${pkg}`);
                            await this.build.dev(pkg, false);
                        }
                    }
                }
                break;
            case 'prod':
                const amdPkgs = fs_extra_1.default.readdirSync(path_1.join(root, 'packages'));
                if (this.name) {
                    this.logger.warn(`build.prod: ${this.name}`);
                    await this.build.prod(this.name, !!this.watch);
                }
                else {
                    for (let pkg of amdPkgs) {
                        if (pkg.startsWith('.')) { }
                        else {
                            this.logger.warn(`build.prod: ${pkg}`);
                            await this.build.prod(pkg, false);
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], BuildCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", public_api_1.NgerCliBuild)
], BuildCommand.prototype, "build", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'n'
    }),
    tslib_1.__metadata("design:type", String)
], BuildCommand.prototype, "name", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'w'
    }),
    tslib_1.__metadata("design:type", Boolean)
], BuildCommand.prototype, "watch", void 0);
BuildCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'build [type]',
        description: 'build lib|prod',
        example: {
            command: 'nger build lib -n nger-core',
            description: '构建package'
        }
    })
], BuildCommand);
exports.BuildCommand = BuildCommand;
