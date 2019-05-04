import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
export function createEntity(name: string) {
    const code = `export default []`;
    const path = join(root, 'addon', name, 'typeorm', 'entities', 'index.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}