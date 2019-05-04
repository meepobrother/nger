export declare class VoidElement {
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
}
export declare class Element extends VoidElement {
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    children?: (VoidElement | Element)[];
}
