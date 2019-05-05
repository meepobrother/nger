import { NgModule } from 'nger-core';
import pcPages, { ImsDemo2PcWelcomePage } from './template/pc';
import adminPages from './template/admin';
import appPages from './template/app';
import incs from './inc';
import { ImsDemo2Typeorm } from './typeorm';
@NgModule({
    declarations: [
        ...pcPages,
        ...adminPages,
        ...appPages,
        ...incs
    ],
    providers: [],
    bootstrap: [
        ImsDemo2PcWelcomePage
    ],
    imports: [
        ImsDemo2Typeorm
    ]
})
export default class ImsDemo2ServerModule { }
