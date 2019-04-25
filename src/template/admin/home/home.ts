import { Page } from 'nger-core'
import { NgerUserInjectable } from '../../services';
@Page({
    path: 'admin/home',
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss']
})
export class HomePage {
    constructor(public userService: NgerUserInjectable) { }
}
