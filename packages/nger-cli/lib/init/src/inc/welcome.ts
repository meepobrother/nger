import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';

export function _createIncWelcome(name: string) {
    const code = `import { Controller } from 'nger-core'
@Controller({
    path: '/'
})
export class ${upperFirst(camelCase(name))}Controller { }
`;
    const path = join(root, 'addon', name, 'inc', 'welcome.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
