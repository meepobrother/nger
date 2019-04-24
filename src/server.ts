import { NgModule } from 'nger-core';
import { HomeController, UserController } from './inc';
/** api服务 */
@NgModule({
    declarations: [
        HomeController, 
        UserController
    ],
    providers: []
})
export default class NgerServer { }
