import { createTypeRecord } from '../lib/createTypeRecord'
import { Component, visitor, Type, Inject } from 'nger-core'
import { setRecord, inject, globalRecord } from '../lib/injector';
@Component()
export class ImsDemo2 { }
@Component()
export class ImsDemo {
    constructor(@Inject() public demo2: ImsDemo2) { }
}

function setTypeRecord(type: Type<any>) {
    const context = visitor.visitType(type);
    const record = createTypeRecord(context);
    setRecord(record.token, record.record);
}
if (context) {
    setTypeRecord(ImsDemo)
    setTypeRecord(ImsDemo2)
    const map = globalRecord;
    const target = inject(ImsDemo)
    debugger;
}

