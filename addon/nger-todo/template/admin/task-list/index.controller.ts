import { Controller, EventEmitter } from 'nger-core';
import { Observable } from 'rxjs'
@Controller()
export class NgerTodoAdminHome {
    onEditor: EventEmitter<any>;
    getTasks<T>(): Observable<{ count: number, data: T[] }> {
        return Observable.create(() => { })
    }
}