import ts from 'typescript'
const code = `
var item = {
    id: "1",
    run: ()=>console.log('run')
}
`
export function createObject(code: string) {
    const ast = ts.createSourceFile(``, code, ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS);
    const visitor = (ast: ts.Node) => {
        if (ts.isObjectLiteralExpression(ast)) {
            return ast;
        } else {
            const res = ast.forEachChild(visitor, visitors)
            if(res) return res;
        }
    };
    const visitors = (asts: ts.NodeArray<ts.Node>) => {
        for (let ast of asts) {
            const res = ast.forEachChild(visitor, visitors)
            if (res) return res;
        }
        return undefined;
    };
    return ast.forEachChild(visitor, visitors);
}
