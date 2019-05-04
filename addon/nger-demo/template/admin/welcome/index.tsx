import { Page, Input, ChangeDetectorRef } from 'nger-core';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class NgerDemoAdminWelcomePage {

    @Input()
    title: string = `小明title`;

    @Input()
    classStr: string = `items`

    constructor(change: ChangeDetectorRef<NgerDemoAdminWelcomePage>) {
        let i = 0;
        setInterval(() => {
            i = i + 1;
            this.title += i;
            this.classStr += i;
            change.next({ title: this.title, classStr: this.classStr });
        }, 1000)
    }
    render() {
        return <div>
            <div className="classStr">
                {"title"}
            </div>
        </div>
    }
}
