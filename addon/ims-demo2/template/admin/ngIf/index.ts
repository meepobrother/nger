import { Directive, Input, NgerRender } from 'nger-core';

/**
 * *ngIf="
 *  condiction;
 *  elseIf condiction2 template2;
 *  elseIf condiction3 template3;
 *  else template4;
 * "
 */

@Directive({
    selector: `[ngIf]`
})
export class NgerNgIf {
    @Input()
    ngIf: boolean;

    @Input()
    ngIfElseIf: boolean;

    @Input()
    ngIfElse: boolean;

    @Input()
    ngIfThen: boolean;

    constructor(public render: NgerRender) { }

}
