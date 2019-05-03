import { NgModule } from 'nger-core';
import pages, { NgerInstallPage } from './template';
import incs from './inc';
import { NgerInstallTypeorm } from './typeorm';

@NgModule({
    declarations: [
        // 模板
        ...pages,
        // 控制器
        ...incs
    ],
    providers: [],
    bootstrap: [
        // 默认跳转页面
        NgerInstallPage
    ],
    imports: [
        // 数据库
        NgerInstallTypeorm
    ]
})
export class NgerInstallModule { }
