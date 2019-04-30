Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.EventSubscriberMetadataKey = 'EventSubscriberMetadataKey';
exports.EventSubscriber = () => ims_decorator_1.makeDecorator(exports.EventSubscriberMetadataKey)();
function isEventSubscriberClassAst(val) {
    return val.metadataKey === exports.EventSubscriberMetadataKey;
}
exports.isEventSubscriberClassAst = isEventSubscriberClassAst;
class EventSubscriberClassAst extends ims_decorator_1.ClassContext {
}
exports.EventSubscriberClassAst = EventSubscriberClassAst;
