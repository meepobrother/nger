import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();

export function createTemplatePcWelcomeScss(name: string) {
    const code = `.${name}{
    display: block;
}`
    const path = join(root, 'addon', name, 'template', 'pc/welcome', 'index.scss')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
