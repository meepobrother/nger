import { Page } from '@nger/core';
@Page({
    path: '/admin/ng',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class NgerDemoAdminNgWelcome {
    items: any[] = [];
    render() {
        return this.items.map(it => <div>{it.title}</div>)
    }
}
