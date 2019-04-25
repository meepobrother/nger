import { NgModule, OnInit, Inject, OnError } from 'nger-core';
import { HomeController, UserController } from './inc';
import { NgerModulePm2 } from 'nger-module-pm2';
import { Logger } from 'nger-logger';

/** api服务 */
@NgModule({
    declarations: [
        HomeController,
        UserController
    ],
    providers: [],
    imports: [
        NgerModulePm2
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
