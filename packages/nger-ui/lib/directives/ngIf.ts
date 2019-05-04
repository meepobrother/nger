import { Directive, Input } from 'nger-core'
import { Element } from '../components/base'
@Directive({
    selector: 'ngIf'
})
export class NgIf extends Element {
    @Input() condiction?: boolean;
}
