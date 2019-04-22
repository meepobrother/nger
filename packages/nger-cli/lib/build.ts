import { Command, Option, visitor } from 'nger-core'
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
import { NgerCliBuild } from './build/public_api'
@Command({
    name: 'build <type>',
    description: 'build h5|wechat|weapp|alipay|swap|tt',
    example: {
        command: 'nger build weapp --watch',
        description: '构建微信小程序'
    }
})
export class BuildCommand {
    type: 'h5' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' = 'h5';
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    @Option({
        alias: 'w'
    })
    watch: boolean = false;

    @Option({
        alias: 's'
    })
    server: 'koa' | 'express' = 'express';

    run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        const source = join(root, 'src/index')
        const Addon = require(source).default;
        const app = visitor.visitType(Addon);
        app.set('watch', this.watch);
        app.set('platform', this.type);
        app.set('server', this.server);
        const build = new NgerCliBuild();
        switch (this.type) {
            case 'h5':
                build.h5(app)
                break;
            case 'wechat':
                build.wechat(app)
                break;
            case 'weapp':
                build.weapp(app)
                break;
            case 'alipay':
                build.alipay(app)
                break;
            case 'swap':
                build.swap(app)
                break;
            case 'tt':
                build.tt(app)
                break;
            case 'android':
                build.android(app)
                break;
            case 'ios':
                build.ios(app)
                break;
            default:
                break;
        }
    }
}