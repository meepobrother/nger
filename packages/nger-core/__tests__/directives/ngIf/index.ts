import { Directive, Input } from 'nger-core'

@Directive({
    selector: '[ngIf]'
})
export class NgIf {
    @Input()
    set ngIf(condition: any) { }

    @Input()
    set ngIfElseIf(templateRef: any) { }

    @Input()
    set ngIfELse(templateRef: any) { }
}
