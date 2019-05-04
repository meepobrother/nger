import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash'
export function createIncWelcome(name: string) {
    const code = `export * from './welcome';
import { ${upperFirst(camelCase(name)) }Controller } from './welcome';
export default [${upperFirst(camelCase(name))}Controller];
`;
    const path = join(root, 'addon', name, 'inc', 'index.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}

export * from './welcome';
