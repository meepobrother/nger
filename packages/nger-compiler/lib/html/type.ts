export type Ref<T> = (instance: T) => void;
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
export interface VNode<P = any> {
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

// Element P 输入属性对应input,output
export interface NgElement<P = any> { 
    
}
declare global {
    namespace JSX {
        interface Element extends NgElement { }
    }
}