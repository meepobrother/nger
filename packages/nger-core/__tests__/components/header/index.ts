import { Component } from '../../../lib'

@Component({
    selector: 'ims-header',
    templateUrl: `./header.html`,
    styleUrls: ['./header.scss']
})
export class ImsHeader {
    isShow: boolean;
}
