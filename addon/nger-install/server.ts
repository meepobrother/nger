import { NgModule } from 'nger-core';
import pages from './template';
import incs from './inc';
import { NgerInstallTypeorm } from './typeorm';
@NgModule({
    declarations: [
        ...pages,
        ...incs
    ],
    providers: [],
    bootstrap: [],
    imports: [
        NgerInstallTypeorm
    ]
})
export class NgerInstallServerModule { }
