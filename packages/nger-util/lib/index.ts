import { exec } from 'shelljs';
import { execSync } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';
import { Logger, NgerConfig } from 'nger-core';
import { CompilerOptions } from 'typescript'
export class NgerUtil {
    root: string = process.cwd()
    constructor(public logger: Logger, public config: NgerConfig) { }
    /** 加载配置文件 */
    loadConfig(): NgerConfig {
        const configPath = join(this.root, 'config/config.json');
        if (this.config) {
            return this.config;
        }
        if (existsSync(configPath)) {
            this.config = require(join(this.root, 'config/config.json'));
        }
        return this.config;
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
        let cfg = this.loadConfig();
        let command: string = '';
        if (!cfg) {
            // cnpm 优先
            cfg = cfg || { npm: 'yarn' } as any;
            if (this.shouldUseYarn()) {
                cfg.npm = 'yarn';
            } else if (this.shouldUseCnpm()) {
                cfg.npm = 'cnpm';
            } else {
                cfg.npm = 'npm';
            }
        }
        switch (cfg.npm) {
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
