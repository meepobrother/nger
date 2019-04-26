import { NgModule, OnInit, Inject, OnError, DevModelToken } from 'nger-core';
import { HomeController, UserController, SmsController } from './inc';
import { NgerModulePm2 } from 'nger-module-pm2';
import { Logger } from 'nger-logger';
import { NgerModuleTypeorm } from 'nger-module-typeorm'
import { NgerModuleWebpack } from 'nger-module-webpack'
import { NgerRunnerTypeorm } from './typeorm';
import { StoreModule } from 'nger-store';
import { counterReducer } from './store/counter.reducer'
/** api服务 */
@NgModule({
    declarations: [
        HomeController,
        UserController,
        SmsController
    ],
    providers: [{
        provide: DevModelToken,
        useValue: true
    }],
    imports: [
        NgerModulePm2,
        NgerModuleWebpack,
        NgerModuleTypeorm.forRoot(NgerRunnerTypeorm),
        StoreModule.forRoot({ count: counterReducer })
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
        this.logger.error(`ngOnError`, err.message)
        this.logger.error(`ngOnError:detail ${err.stack}`)
    }
}
