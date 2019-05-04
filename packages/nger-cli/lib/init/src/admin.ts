import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { camelCase, upperFirst } from 'lodash';

export function createAdmin(name: string) {
    const code = `import { NgModule } from 'nger-core';
import pages, { ${upperFirst(camelCase(name))}AdminWelcomePage } from './template/admin';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        ${upperFirst(camelCase(name))}AdminWelcomePage
    ],
    imports: []
})
export default class ${upperFirst(camelCase(name))}AdminModule { }
`
    const path = join(root, 'addon', name, 'admin.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}