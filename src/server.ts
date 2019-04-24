import { NgModule } from 'nger-core';
import { HomeController, UserController } from './inc';
import { NgerModulePm2 } from 'nger-module-pm2';

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
export default class NgerServer { }
