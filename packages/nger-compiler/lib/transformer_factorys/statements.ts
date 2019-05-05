import ts from 'typescript'

export function handlerBlock(block: ts.Block) {
    const visitor = (node: ts.Node) => {
        debugger;
        return node;
    };
    const visitors = (nodes: ts.NodeArray<ts.Node>) => {
        debugger;
        ts.createNodeArray(nodes.map(node => visitor(node)))
        return undefined;
    }
    return ts.forEachChild(block, visitor, visitors)
}

