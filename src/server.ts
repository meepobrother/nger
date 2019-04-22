import { NgModule } from 'nger-core';
import { IndexController } from './inc';
import { ImsDemoEntity } from './typeorm'
/** api服务 */
@NgModule({
    declarations: [
        IndexController
    ],
    providers: [
        ImsDemoEntity
    ]
})
export class NgerServer { }
