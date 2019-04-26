import { stringifyAttributes } from './stringifyAttributes'
const voidHtmlTags = new Set<string>([
    'image',
    'img',
    'input',
    'import'
])
interface Options {
    name: string,
    attributes: object,
    value: string
}
export const createHTMLElement = (options: Options, isFirstEmit = false) => {
    options = {
        ...{
            name: 'div',
            attributes: {},
            value: ''
        },
        ...options
    }
    const isVoidTag = voidHtmlTags.has(options.name)
    let ret = `<${options.name}${stringifyAttributes(options.attributes)}${isVoidTag ? `/` : ''}>`
    if (!isVoidTag) {
        ret += `${options.value}</${options.name}>`
    }
    return ret
}