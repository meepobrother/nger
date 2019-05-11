import { Page } from 'nger-core';
declare const Permission: any;
@Page({
    path: '/admin/ng',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
@Permission({
    title: '管理员的按钮',
    deps: '',
    data: {
        class: 'string',
        show: true
    }
})
export class NgerDemoAdminNgWelcome {
    items: any[] = [];
    render() {
        return this.items.map(it => <div>{it.title}</div>)
    }
}
