"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
function handlerBlock(block) {
    const visitor = (node) => {
        return node;
    };
    const visitors = (nodes) => {
        typescript_1.default.createNodeArray(nodes.map(node => visitor(node)));
        return undefined;
    };
    typescript_1.default.forEachChild(block, visitor, visitors);
    return block;
}
exports.handlerBlock = handlerBlock;
