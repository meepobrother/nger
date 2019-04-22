import { Component, Input } from 'nger-core'
@Component({
    selector: 'view',
    template: `<div></div>`
})
export class NgerView {
    @Input('hover-class')
    hoverClass: string = 'none';

    @Input('hover-stop-propagation')
    hoverStopProgration: boolean = false;

    @Input('hover-start-time')
    hoverStartTime: number = 50;

    @Input('hover-stay-time')
    hoverStayTime: number = 400;
}
