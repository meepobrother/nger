
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

Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = require("./create");
exports.createHTMLElement = create_1.createHTMLElement;
var stringifyAttributes_1 = require("./stringifyAttributes");
exports.stringifyAttributes = stringifyAttributes_1.stringifyAttributes;

Object.defineProperty(exports, "__esModule", { value: true });
function stringifyAttributes(input) {
    const attributes = [];
    for (const key of Object.keys(input)) {
        let value = input[key];
        if (value === false) {
            continue;
        }
        if (Array.isArray(value)) {
            value = value.join(' ');
        }
        let attribute = key;
        if (value !== true) {
            attribute += `="${String(value)}"`;
        }
        attributes.push(attribute);
    }
    return attributes.length > 0 ? ' ' + attributes.join(' ') : '';
}
exports.stringifyAttributes = stringifyAttributes;
