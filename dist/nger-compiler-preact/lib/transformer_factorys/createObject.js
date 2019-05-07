"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const code = `
var item = {
    id: "1",
    run: ()=>console.log('run')
}
`;
function createObject(code) {
    const ast = typescript_1.default.createSourceFile(``, code, typescript_1.default.ScriptTarget.ESNext, false, typescript_1.default.ScriptKind.TS);
    const visitor = (ast) => {
        if (typescript_1.default.isObjectLiteralExpression(ast)) {
            return ast;
        }
        else {
            const res = ast.forEachChild(visitor, visitors);
            if (res)
                return res;
        }
    };
    const visitors = (asts) => {
        for (let ast of asts) {
            const res = ast.forEachChild(visitor, visitors);
            if (res)
                return res;
        }
        return undefined;
    };
    return ast.forEachChild(visitor, visitors);
}
exports.createObject = createObject;
