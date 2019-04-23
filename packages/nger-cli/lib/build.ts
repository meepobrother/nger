import { Command, Option, visitor } from 'nger-core'
import { ConsoleLogger, LogLevel } from 'nger-logger';
import { join } from 'path';
const root = process.cwd();
import { NgerCliBuild } from './build/public_api'
@Command({
    name: 'build [type]',
    description: 'build h5|wechat|weapp|alipay|swap|tt',
    example: {
        command: 'nger build weapp --watch',
        description: '构建微信小程序'
    }
})
export class BuildCommand {
    type: 'h5' | 'wechat' | 'weapp' | 'alipay' | 'swap' | 'tt' | 'android' | 'ios' | 'admin' = 'h5';
    logger: ConsoleLogger = new ConsoleLogger(LogLevel.debug);
    @Option({
        alias: 'w'
    })
    watch: boolean = false;

    getTypeContext() {
        if (this.type === 'admin') {
            const AppSource = require(join(root, 'src/admin')).default;
            return visitor.visitType(AppSource);
        } else {
            const AppSource = require(join(root, 'src/app')).default;
            return visitor.visitType(AppSource);
        }
    }
    run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        const app = this.getTypeContext();
        app.set('watch', this.watch);
        app.set('platform', this.type);
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
            case 'admin':
                build.admin(app);
                break;
            default:
                break;
        }
    }
}