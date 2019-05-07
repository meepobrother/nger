"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const controller_1 = require("./controller");
exports.componentRenderTransformerFactory = (context) => {
    return (node) => {
        node.statements = typescript_1.default.createNodeArray(node.statements.map((node) => {
            if (typescript_1.default.isImportDeclaration(node)) {
                return node;
            }
            else if (typescript_1.default.isClassDeclaration(node)) {
                if (controller_1.hasMetadata(node.decorators, ['Page', 'Component'])) {
                    const classDeclaration = typescript_1.default.createClassDeclaration(node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, node.members.map(member => {
                        if (typescript_1.default.isMethodDeclaration(member)) {
                            if (typescript_1.default.isIdentifier(member.name)) {
                                if (member.name.text === 'render') {
                                    if (member.parameters.length === 0) {
                                        return typescript_1.default.createMethod(member.decorators, member.modifiers, member.asteriskToken, member.name, member.questionToken, member.typeParameters, typescript_1.default.createNodeArray([
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'h'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'element'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'template'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'content'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'textAttribute'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundAttribute'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundEvent'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'text'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'boundText'),
                                            typescript_1.default.createParameter(undefined, undefined, undefined, 'icu'),
                                        ]), member.type, 
                                        // 这里的body要处理一下
                                        member.body);
                                    }
                                }
                            }
                        }
                        return member;
                    }).filter(node => !!node));
                    return classDeclaration;
                }
                return node;
            }
            else {
                return node;
            }
        }));
        return node;
    };
};
function needReplaceRender() {
}
