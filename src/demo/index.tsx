import { EventEmitter, Component, Input, Output, VNode } from 'nger-core'

export class HomeService { }

@Component({
    selector: 'ims-demo'
})
class ImsDemoComponent2 {
    // angular方式 注入到this.rops.title
    @Input() title: string;
    @Output() bindClick: EventEmitter;
    constructor(public homeService: HomeService) { }
    // 直接卸载这里等价于
    /**
     * props: {title: string}
     * <=>
     * @Input() title: string
     */
    props: { title: string }
    output: EventEmitter;
    model: string;
    render() {
        return <ImsDemoComponent model={this.model} bindClick={'string'} ngFor="let item of items;"></ims-demo>
    }
}

@Component({
    selector: 'ims-demo1',
    render: <ImsDemoComponent2 title="name" />
})
export class ImsDemoComponent {
    props: this;
    @Input() model: string;
    // angular方式 注入到this.rops.title
    @Input() title: string;
    @Output() bindClick: EventEmitter;

    constructor(public homeService: HomeService) { }
}
