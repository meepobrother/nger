import { Component } from 'nger-core'
import { NgerUserInjectable } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss'],
    // 请务必加上
    sourceRoot: __dirname
})
export class HomePage {
    constructor(public userService: NgerUserInjectable) { }
}
