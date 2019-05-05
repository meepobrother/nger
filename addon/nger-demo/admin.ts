import { NgModule } from 'nger-core';
import pages, { NgerDemoAdminWelcomePage } from './template/admin';
import incs from './inc';
@NgModule({
        ...pages,
    providers: [
        ...incs
    ],
    bootstrap: [
        NgerDemoAdminWelcomePage
    ],
    imports: []
})
export default class NgerDemoAdminModule { }

ngerPlatformBrowser().bootstrapModule(NgerDemoAdminModule)