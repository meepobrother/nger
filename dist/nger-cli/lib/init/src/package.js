"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const root = process.cwd();
function createPackage(name) {
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
    }`;
    const path = path_1.join(root, 'addon', name, 'package.json');
    fs_extra_1.default.ensureDirSync(path_1.dirname(path));
    fs_extra_1.default.writeFileSync(path, code);
}
exports.createPackage = createPackage;
