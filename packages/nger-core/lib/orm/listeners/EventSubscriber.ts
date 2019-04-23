import { makeDecorator, ClassAst, ClassContext } from 'ims-decorator';
export interface EventSubscriber { }
export const EventSubscriberMetadataKey = 'EventSubscriberMetadataKey'
export const EventSubscriber = () => makeDecorator<EventSubscriber>(EventSubscriberMetadataKey)();
export function isEventSubscriberClassAst(val: ClassAst): val is ClassAst<EventSubscriber> {
    return val.metadataKey === EventSubscriberMetadataKey;
}
export class EventSubscriberAst extends ClassContext<EventSubscriber>{ }