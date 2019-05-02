export type DirectiveReturnType = boolean | Array<any>;
const directiveMap: Map<string, (props: any) => DirectiveReturnType> = new Map();
directiveMap.set('ngIf', (props) => !!props);
directiveMap.set('ngFor', (props) => Array.isArray(props) ? props : [props]);
import { h as preactH } from 'preact'
export function h(type: any, props?: any, ...children: any[]) {
    console.log({
        type, props, children
    })
    let result: any = '';
    if (props) {
        const keys = Object.keys(props);
        for (let key of keys) {
            const directive = directiveMap.get(key)
            if (directive) {
                const res = directive(props);
                // 如果是if类指令,就不需要走了
                if (typeof res === 'boolean') {
                    if (!res) return null;
                }
                // 如果是数组类指令
                if (Array.isArray(res)) {
                    if (Array.isArray(result)) {
                        result = result.concat(res.map(res => preactH(type, props, children)))
                    } else {
                        result = res.map(res => preactH(type, props, children))
                    }
                }
                // delete props[key];
            }
        }
    }
    if (!!result) return result;
    return preactH(type, props, children)
}

