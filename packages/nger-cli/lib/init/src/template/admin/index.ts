import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';
export function createTemplateAdmin(name: string) {
    const code = `import { ${upperFirst(camelCase(name))}AdminWelcomePage } from './welcome';
export default [${upperFirst(camelCase(name))}AdminWelcomePage];
export * from './welcome';
    `
    const path = join(root, 'addon', name, 'template', 'admin', 'index.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
export * from './welcome/index'
export * from './welcome/index.scss'