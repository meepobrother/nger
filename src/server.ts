import { NgModule, OnInit, Inject, OnError, DevModelToken, Logger } from 'nger-core';
import { HomeController, UserController, SmsController } from './inc';
import { NgerModuleTypeorm } from 'nger-module-typeorm'
import { NgerRunnerTypeorm } from './typeorm';
import { StoreModule } from 'nger-store';
import { counterReducer } from './store/counter.reducer'
import { CounterEffects } from './store/counter.effects'
import { NgerModuleWebpack } from 'nger-module-webpack'
import { NgerWebpackAdmin } from 'nger-webpack-admin'

import { EffectsModule } from 'nger-effects';
import { Injector } from 'nger-di';
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
        // NgerModulePm2,
        // NgerAdmin,
        NgerModuleWebpack,
        NgerWebpackAdmin,
        NgerModuleTypeorm.forRoot(NgerRunnerTypeorm),
        // StoreModule.forRoot({ count: counterReducer }),
        // EffectsModule.forRoot([CounterEffects])
    ]
})
export default class NgerServer implements OnInit, OnError {
    // 只能获取全局注入对象
    @Inject() public logger: Logger;
    @Inject() public home: HomeController;
    @Inject() public injector: Injector;

    // 暂不支持在构造函数中获取
    constructor() { }
    ngOnInit() {
        this.logger.info(`NgerServer on init!! and inject the HomeController ${this.home.info.username}`);
    }
    // server 端捕获错误
    ngOnError(err: Error) {
        // this.injector.debug();
        this.logger.error(`ngOnError`, err.message)
        this.logger.error(`ngOnError:detail ${err.stack}`)
    }
}
