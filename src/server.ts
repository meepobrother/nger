import { NgModule, OnInit, Inject, OnError, TypeormToken, TypeormOptionsToken } from 'nger-core';
import { HomeController, UserController } from './inc';
import { NgerModulePm2 } from 'nger-module-pm2';
import { Logger } from 'nger-logger';
import { NgerModuleTypeorm } from 'nger-module-typeorm'
import { NgerRunnerTypeorm } from './typeorm'

const typeormConfig: any = {
    type: 'mysql',
    username: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306,
    database: 'nger',
    name: 'nger',
    // 是否同步数据库
    synchronize: true
}
/** api服务 */
@NgModule({
    declarations: [
        HomeController,
        UserController
    ],
    providers: [],
    imports: [
        NgerModulePm2,
        // NgerModuleTypeorm.forRoot(NgerRunnerTypeorm, typeormConfig)
    ]
})
export default class NgerServer implements OnInit, OnError {
    // 只能获取全局注入对象
    @Inject() public logger: Logger;
    @Inject() public home: HomeController;
    // 暂不支持在构造函数中获取
    constructor() { }
    ngOnInit() {
        this.logger.info(`NgerServer on init!! and inject the HomeController ${this.home.info.username}`);
    }
    // server 端捕获错误
    ngOnError(err: Error) {
        console.log(`ngOnError`, err.message)
    }
}
