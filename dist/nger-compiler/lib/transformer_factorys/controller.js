"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
exports.controllerPropertyTransformerFactory = (context) => {
    return (node) => {
        node.statements = typescript_1.default.createNodeArray(node.statements.map((node) => {
            if (typescript_1.default.isImportDeclaration(node)) {
                return node;
            }
            else if (typescript_1.default.isClassDeclaration(node)) {
                return typescript_1.default.createClassDeclaration(node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, node.members.map(member => {
                    if (typescript_1.default.isMethodDeclaration(member)) {
                        const needReplace = hasPropertyMetadata(member.decorators);
                        if (needReplace) {
                            return typescript_1.default.createProperty(member.decorators, member.modifiers, member.name, undefined, undefined, undefined);
                        }
                    }
                    else if (typescript_1.default.isPropertyDeclaration(member)) {
                        const needReplace = hasPropertyMetadata(member.decorators);
                        if (needReplace)
                            return member;
                    }
                    else if (typescript_1.default.isConstructorDeclaration(member)) { }
                }).filter(node => !!node));
            }
            else {
                return node;
            }
        }));
        return node;
    };
};
function hasPropertyMetadata(nodes, decorators = ['Get', 'Post']) {
    const item = nodes && nodes.find(node => {
        if (typescript_1.default.isDecorator(node)) {
            if (typescript_1.default.isCallExpression(node.expression)) {
                const expression = node.expression;
                if (typescript_1.default.isIdentifier(expression.expression)) {
                    return decorators.indexOf(expression.expression.text) > -1;
                }
            }
        }
        return false;
    });
    return !!item;
}
exports.hasPropertyMetadata = hasPropertyMetadata;
