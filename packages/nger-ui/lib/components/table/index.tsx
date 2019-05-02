import { Component, Input, EventEmitter, Output } from 'nger-core'
import { Observable } from 'rxjs';
export interface NgerTableSource<T = any> {
    count: number;
    data: T[];
}
@Component({
    selector: 'nger-table'
})
export class Table {
    @Input() source: Observable<NgerTableSource>;
    @Output() onEditor: EventEmitter<any>
}
