import { Command, Option, visitor, Inject, Logger } from 'nger-core'
import { join } from 'path';
const root = process.cwd();
import { NgerCliBuild } from './build/public_api'
@Command({
    name: 'build [type]',
    description: 'build h5|wechat|weapp|alipay|swap|tt|lib',
    example: {
        command: 'nger build weapp --watch',
        description: '构建微信小程序'
    }
})
export class BuildCommand {
    type: 'lib' | 'h5' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' | 'admin' = 'h5';

    @Inject() logger: Logger;
    @Inject() build: NgerCliBuild;

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
    run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        const app = this.getTypeContext();
        if (app) {
            switch (this.type) {
                case 'h5':
                    this.build.h5(app)
                    break;
                case 'wechat':
                    this.build.wechat(app)
                    break;
                case 'weapp':
                    this.build.weapp(app)
                    break;
                case 'alipay':
                    this.build.alipay(app)
                    break;
                case 'swap':
                    this.build.swap(app)
                    break;
                case 'tt':
                    this.build.tt(app)
                    break;
                case 'android':
                    this.build.android(app)
                    break;
                case 'ios':
                    this.build.ios(app)
                    break;
                case 'admin':
                    this.build.admin(app);
                    break;
                default:
                    this.build.lib(app)
                    break;
            }
        }
    }
}