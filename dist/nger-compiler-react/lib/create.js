Object.defineProperty(exports, "__esModule", { value: true });
const stringifyAttributes_1 = require("./stringifyAttributes");
const voidHtmlTags = new Set([
    'image',
    'img',
    'input',
    'import'
]);
exports.createHTMLElement = (options, isFirstEmit = false) => {
    options = {
        ...{
            name: 'div',
            attributes: {},
            value: ''
        },
        ...options
    };
    const isVoidTag = voidHtmlTags.has(options.name);
    let ret = `<${options.name}${stringifyAttributes_1.stringifyAttributes(options.attributes)}${isVoidTag ? `/` : ''}>`;
    if (!isVoidTag) {
        ret += `${options.value}</${options.name}>`;
    }
    return ret;
};
