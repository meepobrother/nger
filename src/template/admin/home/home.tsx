import { Page, Input } from 'nger-core'
import { NgerUserInjectable } from '../../services';
@Page({
    path: 'admin/home',
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss']
})
export class HomePage {
    constructor(public userService: NgerUserInjectable) { }

    @Input()
    style: string;

    render() {
        const props = {
            tt: true
        }
        return <div>
            <HomeComponent style={this.style} {...props} />
        </div>
    }
}

export class HomeComponent {


}