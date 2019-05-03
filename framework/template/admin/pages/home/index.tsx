import { Page, Http, Input } from 'nger-core';
@Page({
    path: '/admin',
    title: '后台管理',
    styleUrls: ['./index.scss']
})
export class NgerHomePage {
    constructor(public http: Http) { }

    @Input() addon: any

    ngOnInit() {
        this.http.get(`http://baidu.com.cn`).then(res => {
            this.addon = res.data;
        })
    }
    
    render() {
        return <div>
            <div>{this.addon.title}</div>
        </div>
    }
}
