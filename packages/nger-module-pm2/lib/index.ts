import { NgModule, Logger } from 'nger-core'
import { NgerPm2Service } from './providers/pm2';
import { NgerUtil } from 'nger-util';

@NgModule({
    providers: [
        NgerPm2Service, NgerUtil
    ]
})
export class NgerModulePm2 { }
export { NgerPm2Service };