import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { camelCase, upperFirst } from 'lodash';

export function createApp(name: string) {
    const code = `import { NgModule } from 'nger-core';
import pages, { ${upperFirst(camelCase(name))}AppWelcomePage } from './template/app';
import incs from './inc';
@NgModule({
    declarations: [
        ...pages,
    ],
    providers: [
        ...incs
    ],
    bootstrap: [
        ${upperFirst(camelCase(name))}AppWelcomePage
    ],
    imports: []
})
export default class ${upperFirst(camelCase(name))}AppModule { }
`
    const path = join(root, 'addon', name, 'app.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}