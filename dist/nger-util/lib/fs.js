"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path_1 = require("./path");
tslib_1.__exportStar(require("fs"), exports);
function mkdirpath(path) {
    const dir = path_1.dirname(path);
    try {
        fs.readdirSync(dir);
    }
    catch (err) {
        mkdirpath(dir);
        try {
            fs.mkdirSync(dir);
        }
        catch (err2) {
            if (err2.code !== 'EEXIST') {
                throw err2;
            }
        }
    }
}
function writeFile(dest, data) {
    return new Promise((fulfil, reject) => {
        mkdirpath(dest);
        fs.writeFile(dest, data, err => {
            if (err) {
                reject(err);
            }
            else {
                fulfil();
            }
        });
    });
}
exports.writeFile = writeFile;
