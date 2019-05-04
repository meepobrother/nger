import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';

export function createTemplateAdminWelcome(name: string) {
    const code = `import { Page } from 'nger-core';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class ${upperFirst(camelCase(name))}AdminWelcomePage {
    render() {
        return <div></div>
    }
}
`
    const path = join(root, 'addon', name, 'template', 'admin/welcome', 'index.tsx')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
