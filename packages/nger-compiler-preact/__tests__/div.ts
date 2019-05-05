export interface Element {
    tag: (props: Props) => any;
    props: Props;
    children: Element[]
}
export type Props<T extends object = any> = T;
function div(props: Props, ...children: Element[]): Element {
    for (let item of props.props.items) {
        props.props.children((child: Element) => {
            child.props.item = item;
            children.push(child.tag(child.props))
        });
    }
    return { tag: div, props, children };
}
