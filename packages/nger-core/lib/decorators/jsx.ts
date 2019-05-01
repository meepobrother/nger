export type Ref<T> = (instance: T) => void;
export type Key = string | number;
export interface ComponentInstance<P = {}, S = {}> {
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    getChildContext?(): object;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentDidUpdate?(previousProps: Readonly<P>, previousState: Readonly<S>, previousContext: any): void;
}
export interface FunctionalComponent<P = {}> {
    (props: RenderableProps<P>, context?: any): VNode<any> | null;
    displayName?: string;
    defaultProps?: Partial<P>;
}
export interface ComponentConstructor<P = {}, S = {}> {
    new(props: P, context?: any): ComponentInstance<P, S>;
    displayName?: string;
    defaultProps?: Partial<P>;
}
export type IComponentFactory<P> = ComponentConstructor<P> | FunctionalComponent<P>;
export interface VNode<P = any> {
    nodeName: IComponentFactory<P> | string;
    attributes: P;
    children: Array<VNode<any> | string>;
    key?: Key | null;
}
export type ComponentChild = VNode<any> | object | string | number | boolean | null;
export type ComponentChildren = ComponentChild[] | ComponentChild;
export interface Attributes {
    key?: Key;
    jsx?: boolean;
}
export type RenderableProps<P, RefType = any> = Readonly<
    P & Attributes & { children?: ComponentChildren; ref?: Ref<RefType> }
>;
export abstract class ReactComponent<P = any, S = any>{
    constructor(props?: P, context?: any) { }
    static displayName?: string;
    static defaultProps?: any;
    state: Readonly<S>;
    props: RenderableProps<P>;
    context: any;
    base?: HTMLElement;
    setState<K extends keyof S>(state: Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(fn: (prevState: S, props: P) => Pick<S, K>, callback?: () => void): void;
    setState<K extends keyof S>(...args: any[]) { }
    forceUpdate(callback?: () => void): void { }
    abstract render(props?: RenderableProps<P>, state?: Readonly<S>, context?: any): ComponentChild;
}
export interface NgerComponent<P> { }
export interface NgerElementAttributesProperty {
    props: this;
}
declare global {
    function h(
        node: string,
        params: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
        ...children: ComponentChildren[]
    ): VNode<any>;
    function h<P>(
        node: IComponentFactory<P>,
        params: Attributes & P | null,
        ...children: ComponentChildren[]
    ): VNode<P>;
    namespace JSX {
        // 这里要自动注册么？
        interface SVGAttributes { }
        interface IntrinsicElements {
            [key: string]: {
                [key: string]: any;
            };
        }
        // class
        interface ElementClass { }
        interface HTMLAttributes { }
        // 定义props
        interface ElementAttributesProperty extends NgerElementAttributesProperty { }
        // 定义children
        interface ElementChildrenAttribute {
            children: any;
        }
    }
}
