export interface Element {
    tag: (props: Props) => any;
    props: Props;
    children: Element[];
}
export declare type Props<T extends object = any> = T;
