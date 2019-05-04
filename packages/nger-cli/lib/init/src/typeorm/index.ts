import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();
import { upperFirst, camelCase } from 'lodash';
export function createTypeorm(name: string) {
    const code = `import { Typeorm } from 'nger-core'
    import entities from './entities'
    @Typeorm({
        entities: [
            ...entities
        ],
        migrations: [],
        subscribers: []
    })
    export class ${upperFirst(camelCase(name))}Typeorm { }
    `
    const path = join(root, 'addon', name, 'typeorm', 'index.ts')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}

export * from './entities';