import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';
export function creatServer(name: string) {
    const code = `import { NgModule } from 'nger-core';
import pcPages, { ${upperFirst(camelCase(name))}PcWelcomePage } from './template/pc';
import adminPages from './template/admin';
import appPages from './template/app';

import incs from './inc';
import { ${upperFirst(camelCase(name))}Typeorm } from './typeorm';
@NgModule({
    declarations: [
        ...pcPages,
        ...adminPages,
        ...appPages,
        ...incs
    ],
    providers: [],
    bootstrap: [
        ${upperFirst(camelCase(name))}PcWelcomePage
    ],
    imports: [
        ${upperFirst(camelCase(name))}Typeorm
    ]
})
export default class ${upperFirst(camelCase(name))}ServerModule { }
`
    const path = join(root, 'addon', name, 'server.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
