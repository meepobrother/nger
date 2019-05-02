import 'document-register-element';

export function h(type: any, props: any, ...children: any[]) {
    props = { ...props };
    return {
        type,
        props,
        children
    }
}
