import { Controller } from 'nger-core'
import { NgerInstallService } from './services/install'
@Controller({
    path: '/'
})
export class NgerInstallController { 
    constructor(public service: NgerInstallService){}
}