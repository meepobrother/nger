import fs from 'fs-extra'
import { join, dirname } from 'path';
import { upperFirst, camelCase } from 'lodash';

const root = process.cwd();
export function createTemplatePcWelcome(name: string) {
    const code = `import { Page } from 'nger-core';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class ${upperFirst(camelCase(name))}PcWelcomePage {
    render() {
        return <div></div>
    }
}
`
    const path = join(root, 'addon', name, 'template', 'pc/welcome', 'index.tsx')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
