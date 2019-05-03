export interface VNode { }
export interface VNodeData {
    class?: { [className: string]: boolean };
    style?: any;
    [attrName: string]: any;
}
export interface Hyperscript {
    (sel: any): VNode;
    (sel: Node, data: VNodeData): VNode;
    (sel: any, data: VNodeData): VNode;
    (sel: any, text: string): VNode;
    (sel: any, children: Array<VNode | undefined | null>): VNode;
    (sel: any, data: VNodeData, text: string): VNode;
    (sel: any, data: VNodeData, children: Array<VNode | undefined | null>): VNode;
    (sel: any, data: VNodeData, children: VNode): VNode;
}
interface NgerComponent<T> {
}
declare global {
    export var h: Hyperscript;
    namespace JSX {
        interface Element { }
        // 已经注册的element
        interface IntrinsicElements {
            [elemName: string]: any;
        }
        interface ElementClass { }
        interface ElementAttributesProperty extends NgerComponent<any> { }
        interface ElementChildrenAttribute {
            children: any;
        }
    }
}
