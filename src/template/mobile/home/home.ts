import { Component, Input } from 'nger-core'
import { NgerUserInjectable } from '../../services';
@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss'],
    // 请务必加上
    fileName: __filename
})
export class HomePage {
    @Input() title: string;
    constructor(public userService: NgerUserInjectable) { }
    add(a: number, b: number) {
        return a + b;
    }
}
