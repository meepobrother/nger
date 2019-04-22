import { Page } from 'nger-core'
import { NgerUserInjectable } from '../../services';

@Page()
export class HomePage {
    constructor(public userService: NgerUserInjectable) { }
}
