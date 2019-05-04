import { NgModule } from 'nger-core';
import pcPages, { NgerDemoPcWelcomePage } from './template/pc';
import adminPages from './template/admin';
import appPages from './template/app';

import incs from './inc';
import { NgerDemoTypeorm } from './typeorm';
@NgModule({
    declarations: [
        ...pcPages,
        ...adminPages,
        ...appPages,
        ...incs
    ],
    providers: [],
    bootstrap: [
        NgerDemoPcWelcomePage
    ],
    imports: [
        NgerDemoTypeorm
    ]
})
export default class NgerDemoServerModule { }
