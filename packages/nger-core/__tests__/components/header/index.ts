import { Component } from '../../../lib'

@Component({
    selector: 'ims-header',
    templateUrl: `./header.html`,
    styleUrls: ['./header.scss'],
    sourceRoot: __filename
})
export class ImsHeader {
    isShow: boolean;
}
