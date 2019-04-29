const root = process.cwd();
import { join } from 'path';
export function getTypeContext(path: string) {
    const source = join(root, path)
    return require(source).default;
}
