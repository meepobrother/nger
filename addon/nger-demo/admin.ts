import { NgModule } from 'nger-core';
import pages, { NgerDemoAdminWelcomePage } from './template/admin';
import incs from './inc';
import ngerPlatformBrowser from 'nger-platform-browser'
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

ngerPlatformBrowser().bootstrapModule(NgerDemoAdminModule)