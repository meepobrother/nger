import * as ts from 'typescript';
export function isDifferentialLoadingNeeded(
    projectRoot: string,
    target: ts.ScriptTarget = ts.ScriptTarget.ES5
): boolean {
    return target !== ts.ScriptTarget.ES3 && target !== ts.ScriptTarget.ES5;
}
import { existsSync, statSync } from 'fs';
import * as path from 'path';
export function isDirectory(path: string) {
    try {
        return statSync(path).isDirectory();
    } catch (_) {
        return false;
    }
}
export function findAllNodeModules(from: string, root?: string) {
    const nodeModules: string[] = [];
    let current = from;
    while (current && current !== root) {
        const potential = path.join(current, 'node_modules');
        if (existsSync(potential) && isDirectory(potential)) {
            nodeModules.push(potential);
        }
        const next = path.dirname(current);
        if (next === current) {
            break;
        }
        current = next;
    }
    return nodeModules;
}
