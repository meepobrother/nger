import { NgModule } from 'nger-core';
import pages, { NgerDemoPcWelcomePage } from './template/pc';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        NgerDemoPcWelcomePage
    ],
    imports: []
})
export default class NgerDemoPcModule { }
