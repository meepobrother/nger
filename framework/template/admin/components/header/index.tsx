import { Component, Http, Input } from 'nger-core'
@Component({
    // 这里是适配小程序 useComponent
    selector: 'nger-admin-footer'
})
export class NgerHeaderFooter {
    @Input() title: string;
    constructor(public http: Http) { }
    render() {
        return <div>{this.title}</div>
    }
}
