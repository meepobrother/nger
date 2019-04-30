Object.defineProperty(exports, "__esModule", { value: true });
function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, (...args) => ({
            ...config(...args),
            type,
        }));
    }
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, () => ({ type }));
        case 'props':
            return defineType(type, (props) => ({
                ...props,
                type,
            }));
        default:
            throw new Error('Unexpected config.');
    }
}
exports.createAction = createAction;
function props() {
    return { _as: 'props', _p: undefined };
}
exports.props = props;
function union(creators) {
    return undefined;
}
exports.union = union;
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
