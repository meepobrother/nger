import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();

export function createTemplateAdminWelcomeScss(name: string) {
    const code = `.${name}{
    display: block;
}`
    const path = join(root, 'addon', name, 'template', 'admin/welcome', 'index.scss')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
