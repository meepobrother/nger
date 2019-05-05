import ts from 'typescript'

export function handlerBlock(block: ts.Block) {
    const visitor = (node: ts.Node) => {
        return node;
    };
    const visitors = (nodes: ts.NodeArray<ts.Node>) => {
        ts.createNodeArray(nodes.map(node => visitor(node)))
        return undefined;
    }
    ts.forEachChild(block, visitor, visitors)
    return block;
}

