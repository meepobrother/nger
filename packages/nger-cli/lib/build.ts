import { Command, Option, Inject, Logger } from 'nger-core'
import { join } from 'path';
const root = process.cwd();
import { NgerCliBuild } from './build/public_api'
import fs from 'fs-extra'
@Command({
    name: 'build [type]',
    description: 'build h5|wechat|weapp|alipay|swap|tt|lib|prod',
    example: {
        command: 'nger build weapp --watch',
        description: '构建微信小程序'
    }
})
export class BuildCommand {
    type: 'lib' | 'h5' | 'prod' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' | 'admin' = 'h5';

    @Inject() logger: Logger;
    @Inject() build: NgerCliBuild;

    @Option({
        alias: 'n'
    }) 
    name: string;

    @Option({
        alias: 'w'
    })
    watch: boolean = false;

    getTypeContext() {
        if (this.type === 'admin') {
            return require(join(root, 'src/admin')).default;
        } else {
            return require(join(root, 'src/app')).default;
        }
    }
    async run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        this.logger.warn(`package: ${this.name}`);
        switch (this.type) {
            case 'h5':
                const h5App = this.getTypeContext();
                this.build.h5(h5App)
                break;
            case 'wechat':
                const wechatApp = this.getTypeContext();
                this.build.wechat(wechatApp)
                break;
            case 'weapp':
                const weappApp = this.getTypeContext();
                this.build.weapp(weappApp)
                break;
            case 'alipay':
                // this.build.alipay(app)
                break;
            case 'swap':
                // this.build.swap(app)
                break;
            case 'tt':
                // this.build.tt(app)
                break;
            case 'android':
                // this.build.android(app)
                break;
            case 'ios':
                // this.build.ios(app)
                break;
            case 'admin':
                this.build.admin(this.watch);
                break;
            case 'lib':
                const libPkgs = fs.readdirSync(join(root, 'packages'))
                if(this.name){
                    this.logger.warn(`build.lib: ${this.name}`);
                    await this.build.dev(this.name)
                }else{
                    for (let pkg of libPkgs) {
                        if (pkg.startsWith('.')) { } else {
                            this.logger.warn(`build.lib: ${pkg}`);
                            await this.build.dev(pkg)
                        }
                    }
                }
                break;
            case 'prod':
                const amdPkgs = fs.readdirSync(join(root, 'packages'))
                for (let pkg of amdPkgs) {
                    if (pkg.startsWith('.')) {

                    } else {
                        this.logger.warn(`build.prod: ${pkg}`);
                        await this.build.prod(pkg)
                    }
                }
                break;
            default:
                const allPkgs = fs.readdirSync(join(root, 'packages'))
                for (let pkg of allPkgs) {
                    if (pkg.startsWith('.')) { } else {
                        this.logger.warn(`build.dev: ${pkg}`);
                        await this.build.dev(pkg)
                    }
                }
                break;
        }
    }
}