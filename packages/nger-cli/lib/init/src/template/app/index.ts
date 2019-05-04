import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash'
export function createTemplateApp(name: string) {
    const code = `import { ${upperFirst(camelCase(name))}AppWelcomePage } from './welcome';
export default [${upperFirst(camelCase(name))}AppWelcomePage];
export * from './welcome';
`
    const path = join(root, 'addon', name, 'template', 'app', 'index.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
export * from './welcome/index'
export * from './welcome/index.scss'