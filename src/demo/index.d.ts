import "@stencil/core";
declare global {
    interface StencilElementInterfaces {
        'MyComponent': Components.MyComponent;
    }
    interface StencilIntrinsicElements {
        'my-component': Components.MyComponentAttributes;
    }
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement { }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new(): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        'my-component': HTMLMyComponentElement
    }
    interface ElementTagNameMap {
        'my-component': HTMLMyComponentElement;
    }
    export namespace JSX {
        export interface Element { }
        export interface IntrinsicElements extends StencilIntrinsicElements {
            [tagName: string]: any;
        }
    }
    export interface HTMLAttributes extends StencilHTMLAttributes { }
}