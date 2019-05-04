import { NgModule } from 'nger-core';
import pages, { NgerDemoAdminWelcomePage } from './template/admin';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        NgerDemoAdminWelcomePage
    ],
    imports: []
})
export default class NgerDemoAdminModule { }
