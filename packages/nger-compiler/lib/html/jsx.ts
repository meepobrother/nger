type Ref<T> = (instance: T) => void;
export type ComponentChild = VNode<any> | object | string | number | boolean | null;
export type ComponentChildren = ComponentChild[] | ComponentChild;
interface Attributes {
    key?: Key;
    jsx?: boolean;
}
interface Component<P = {}, S = {}> {
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    getChildContext?(): object;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
}
type RenderableProps<P, RefType = any> = Readonly<
    P & Attributes & { children?: ComponentChildren; ref?: Ref<RefType> }
>;
interface ComponentConstructor<P = {}, S = {}> {
    new(props: P, context?: any): Component<P, S>;
    displayName?: string;
    defaultProps?: Partial<P>;
}
interface FunctionalComponent<P = {}> {
    (props: RenderableProps<P>, context?: any): VNode<any> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
}
export type Key = string | number;
export type ComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
interface VNode<P = any> {
    nodeName: ComponentFactory<P> | string;
    attributes: P;
    children: Array<VNode<any> | string>;
    key?: Key | null;
}
interface Options {
    shallow?: boolean;
    xml?: boolean;
    pretty?: boolean | string;
    sortAttributes?: boolean;
    allAttributes?: boolean;
    attributeHook?: any;
}
const VOID_ELEMENTS = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
export class NgerCompilerHtmlJsx {
    render(
        vnode: VNode,
        context?: any,
        opts?: Options,
        inner?: boolean,
        isSvgMode?: boolean,
        selectValue?: any
    ): string {
        if (vnode == null || typeof vnode === 'boolean') {
            return '';
        }
        let nodeName = vnode.nodeName,
            props = vnode.attributes,
            isComponent = false;
        context = context || {};
        opts = opts || {};

        // 美化压缩
        let pretty = opts.pretty,
            indentChar = pretty && typeof pretty === 'string' ? pretty : '\t';
        // text
        if (typeof vnode !== 'object' && !nodeName) {
            return encodeEntities(vnode);
        }
        // component
        if (typeof nodeName === 'function') {
        }
        // render JSX to HTML
        let s = '', html = ``;
        if (props) {
            let attrs = Object.keys(props);
            // allow sorting lexicographically for more determinism (useful for tests, such as via preact-jsx-chai)
            if (opts && opts.sortAttributes === true) attrs.sort();
            for (let i = 0; i < attrs.length; i++) {
                let name = attrs[i],
                    v = props[name];
                if (name === 'children') continue;
                if (name.match(/[\s\n\\/='"\0<>]/)) continue;
                if (!(opts && opts.allAttributes) && (name === 'key' || name === 'ref')) continue;
                if (name === 'className') {
                    if (props.class) continue;
                    name = 'class';
                }
                else if (isSvgMode && name.match(/^xlink:?./)) {
                    name = name.toLowerCase().replace(/^xlink:?/, 'xlink:');
                }
                if (name === 'style' && v && typeof v === 'object') {
                    v = styleObjToCss(v);
                }
                let hooked = opts.attributeHook && opts.attributeHook(name, v, context, opts, isComponent);
                if (hooked || hooked === '') {
                    s += hooked;
                    continue;
                }
                if (name === 'dangerouslySetInnerHTML') {
                    html = v && v.__html;
                }
                else if ((v || v === 0 || v === '') && typeof v !== 'function') {
                    if (v === true || v === '') {
                        v = name;
                        // in non-xml mode, allow boolean attributes
                        if (!opts || !opts.xml) {
                            s += ' ' + name;
                            continue;
                        }
                    }

                    if (name === 'value') {
                        if (nodeName === 'select') {
                            selectValue = v;
                            continue;
                        }
                        else if (nodeName === 'option' && selectValue == v) {
                            s += ` selected`;
                        }
                    }
                    s += ` ${name}="${encodeEntities(v)}"`;
                }
            }
        }
        // account for >1 multiline attribute
        if (pretty) {
            let sub = s.replace(/^\n\s*/, ' ');
            if (sub !== s && !~sub.indexOf('\n')) s = sub;
            else if (pretty && ~s.indexOf('\n')) s += '\n';
        }

        s = `<${nodeName}${s}>`;
        if (String(nodeName).match(/[\s\n\\/='"\0<>]/)) throw s;
        // 自闭和标签
        let isVoid = String(nodeName).match(VOID_ELEMENTS);
        if (isVoid) s = s.replace(/>$/, ' />');

        let pieces = [];
        let children;
        if (html) {
            // if multiline, indent.
            if (pretty && isLargeString(html)) {
                html = '\n' + indentChar + indent(html, indentChar);
            }
            s += html;
        } else if (props && getChildren(children = [], props.children).length) {

        }

        if (pieces.length) {
            s += pieces.join('');
        } else if (opts && opts.xml) {
            return s.substring(0, s.length - 1) + ' />';
        }

        if (!isVoid) {
            if (pretty && ~s.indexOf('\n')) s += '\n';
            s += `</${nodeName}>`;
        }
        return s;
    }
    shallowRender(vnode: VNode, context?: any): string {
        return ``
    }
}