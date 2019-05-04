"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const child_process_1 = require("child_process");
const path_1 = require("path");
const rimraf = require("rimraf");
class NgerUtil {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
        this.root = process.cwd();
    }
    rimraf(dir) {
        return new Promise((resolve, reject) => {
            rimraf(dir, () => resolve());
        });
    }
    getCompilerOptions() {
        return require(path_1.join(this.root, 'tsconfig')).compilerOptions;
    }
    /** 加载包 */
    async loadPkg(name, attr) {
        let target;
        try {
            target = require(name);
        }
        catch (e) {
            this.logger.debug(`package ${name} not found , now installing.., please wait`);
            await this.addPkg(name).catch(e => { });
            target = require(name);
        }
        if (!!attr) {
            return target[attr];
        }
        return target;
    }
    /** 安装包 */
    addPkg(name) {
        let command = '';
        // cnpm 优先
        if (this.shouldUseCnpm()) {
            this.config.set('npm', 'cnpm');
        }
        else if (this.shouldUseYarn()) {
            this.config.set('npm', 'yarn');
        }
        else {
            this.config.set('npm', 'npm');
        }
        const npm = this.config.get('npm');
        switch (npm) {
            case 'yarn':
                command = `yarn add ${name}`;
                break;
            case 'cnpm':
                command = `cnpm install ${name}`;
                break;
            default:
                command = `npm install ${name}`;
                break;
        }
        return this.execAsync(command);
    }
    /** 执行命令 */
    execAsync(command) {
        return new Promise((resolve, reject) => {
            shelljs_1.exec(command, { cwd: this.root }, (code, stdout, stderr) => {
                if (!!stderr) {
                    reject(stderr);
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
    /** 应该用cnpm */
    shouldUseCnpm() {
        try {
            child_process_1.execSync('cnpm --version', { stdio: 'ignore' });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /** 应该用yarn */
    shouldUseYarn() {
        try {
            child_process_1.execSync('yarn --version', { stdio: 'ignore' });
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.NgerUtil = NgerUtil;
