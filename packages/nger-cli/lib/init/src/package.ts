import fs from 'fs-extra'
import { join, dirname } from 'path';
const root = process.cwd();

export function createPackage(name: string) {
    const code = `{
        "name": "${name}",
        "description": "",
        "version": "1.0",
        "author": {
            "email": "",
            "name": ""
        },
        "nger": {
            "server": "./server",
            "admin": "./admin",
            "app": "./app",
            "pc": "./pc"
        },
        "icon": ""
    }`
    const path = join(root, 'addon', name, 'package.json')
    fs.ensureDirSync(dirname(path))
    fs.writeFileSync(path, code)
}
