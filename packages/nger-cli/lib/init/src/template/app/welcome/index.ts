import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';

export function createTemplateAppWelcome(name: string) {
    const code = `import { Page } from 'nger-core';
import { View } from 'nger-ui';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class ${upperFirst(camelCase(name))}AppWelcomePage {
    render() {
        return <View className="${name}"></View>
    }
}
`
    const path = join(root, 'addon', name, 'template', 'app/welcome', 'index.tsx')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
