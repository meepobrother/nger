import { ClassAst, ClassContext } from 'ims-decorator';
export interface EventSubscriber {
}
export declare const EventSubscriberMetadataKey = "EventSubscriberMetadataKey";
export declare const EventSubscriber: () => any;
export declare function isEventSubscriberClassAst(val: ClassAst): val is ClassAst<EventSubscriber>;
export declare class EventSubscriberClassAst extends ClassContext<EventSubscriber> {
}
