import { NgModule } from 'nger-core';
import { NgerUtil } from 'nger-util'
import { NgerGulpService } from './providers/gulp';

@NgModule({
    providers: [NgerGulpService, NgerUtil]
})
export class NgerModuleGulp { }
