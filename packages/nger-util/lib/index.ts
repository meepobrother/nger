import { exec } from 'shelljs';
import { execSync } from 'child_process';
import { join } from 'path';
import { Logger, NgerConfig } from 'nger-core';
import { CompilerOptions } from 'typescript'
import rimraf = require('rimraf');

export class NgerUtil {
    root: string = process.cwd()
    constructor(public logger: Logger, public config: NgerConfig) { }
    rimraf(dir: string) {
        return new Promise((resolve, reject) => {
            rimraf(dir, () => resolve())
        });
    }
    getCompilerOptions(): CompilerOptions {
        return require(join(this.root, 'tsconfig')).compilerOptions
    }
    /** 加载包 */
    async loadPkg<T = any>(name: string, attr?: string): Promise<T> {
        let target: any;
        try {
            target = require(name)
        } catch (e) {
            this.logger.debug(`package ${name} not found , now installing.., please wait`)
            await this.addPkg(name).catch(e => {
                this.logger.error(e.message)
            });
            target = require(name);
        }
        if (!!attr) {
            return target[attr];
        }
        return target;
    }
    /** 安装包 */
    addPkg(name: string) {
        let command: string = '';
        // cnpm 优先
        if (this.shouldUseCnpm()) {
            this.config.set('npm', 'cnpm')
        } else if (this.shouldUseYarn()) {
            this.config.set('npm', 'yarn')
        } else {
            this.config.set('npm', 'npm')
        }
        const npm = this.config.get('npm');
        console.log(npm)
        switch (npm) {
            case 'yarn':
                command = `yarn add ${name}`
                break;
            case 'cnpm':
                command = `cnpm install ${name}`
                break;
            default:
                command = `npm install ${name}`
                break;
        }
        return this.execAsync(command)
    }
    /** 执行命令 */
    execAsync(command: string) {
        return new Promise((resolve, reject) => {
            exec(command, { cwd: this.root }, (code, stdout, stderr) => {
                if (!!stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout)
                }
            })
        })
    }
    /** 应该用cnpm */
    shouldUseCnpm(): boolean {
        try {
            execSync('cnpm --version', { stdio: 'ignore' })
            return true
        } catch (e) {
            return false
        }
    }
    /** 应该用yarn */
    shouldUseYarn(): boolean {
        try {
            execSync('yarn --version', { stdio: 'ignore' })
            return true
        } catch (e) {
            return false
        }
    }
}
