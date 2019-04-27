const root = process.cwd();
import { visitor } from 'nger-core';
import { join } from 'path';
export function getTypeContext(path: string) {
    const source = join(root, path)
    const serverSource = require(source).default;
    return visitor.visitType(serverSource);
}
