import { Input } from '@nger/core'

export class VoidElement {
    @Input() className?: string;
    @Input() style?: Partial<CSSStyleDeclaration>;
}

export class Element extends VoidElement {
    @Input() className?: string;
    @Input() style?: Partial<CSSStyleDeclaration>;
    @Input() children?: (VoidElement | Element)[];
}
