"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function div(props, ...children) {
    for (let item of props.props.items) {
        props.props.children((child) => {
            child.props.item = item;
            children.push(child.tag(child.props));
        });
    }
    return { tag: div, props, children };
}
