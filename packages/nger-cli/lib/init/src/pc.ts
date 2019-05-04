import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { camelCase, upperFirst } from 'lodash';

export function createPc(name: string) {
    const code = `import { NgModule } from 'nger-core';
import pages, { ${upperFirst(camelCase(name))}PcWelcomePage } from './template/pc';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        ${upperFirst(camelCase(name))}PcWelcomePage
    ],
    imports: []
})
export default class ${upperFirst(camelCase(name))}PcModule { }
`
    const path = join(root, 'addon', name, 'pc.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
