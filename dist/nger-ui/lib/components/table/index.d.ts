import { EventEmitter } from 'nger-core';
import { Observable } from 'rxjs';
export interface NgerTableSource<T = any> {
    count: number;
    data: T[];
}
export declare class Table {
    source: Observable<NgerTableSource>;
    onEditor: EventEmitter<any>;
}
