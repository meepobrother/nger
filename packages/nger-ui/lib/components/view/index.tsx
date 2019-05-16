import { Component, Input } from '@nger/core'
import { Element } from '../base'
@Component({
    selector: 'view'
})
export class View extends Element {
    @Input() hoverClass?: string;
    @Input() hoverStopPropagation?: boolean;
    @Input() hoverStartTime?: number;
    @Input() hoverStayTime?: number;
}
