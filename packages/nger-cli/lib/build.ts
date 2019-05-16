import { Command, Option, Inject, Logger } from '@nger/core'
import { join } from 'path';
const root = process.cwd();
import { NgerCliBuild } from './build/public_api'
import fs from 'fs-extra'
@Command({
    name: 'build [type]',
    description: 'build lib|prod',
    example: {
        command: 'nger build lib -n nger-core',
        description: '构建package'
    }
})
export class BuildCommand {
    type: 'lib' | 'prod' = 'lib';
    @Inject() logger: Logger;
    @Inject() build: NgerCliBuild;
    @Option({
        alias: 'n'
    })
    name: string;

    @Option({
        alias: 'w'
    })
    watch: boolean;
    async run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`package: ${this.name || 'all'}`);
        switch (this.type) {
            case 'lib':
                const libPkgs = fs.readdirSync(join(root, 'packages'))
                if (this.name) {
                    this.logger.warn(`build.lib: ${this.name}`);
                    await this.build.dev(this.name, !!this.watch)
                } else {
                    for (let pkg of libPkgs) {
                        if (pkg.startsWith('.')) { } else {
                            this.logger.warn(`build.lib: ${pkg}`);
                            await this.build.dev(pkg, false)
                        }
                    }
                }
                break;
            case 'prod':
                const amdPkgs = fs.readdirSync(join(root, 'packages'))
                if (this.name) {
                    this.logger.warn(`build.prod: ${this.name}`);
                    await this.build.prod(this.name, !!this.watch)
                } else {
                    for (let pkg of amdPkgs) {
                        if (pkg.startsWith('.')) { } else {
                            this.logger.warn(`build.prod: ${pkg}`);
                            await this.build.prod(pkg, false)
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
}