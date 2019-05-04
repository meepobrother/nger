"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const browserslist = tslib_1.__importStar(require("browserslist"));
const caniuse = tslib_1.__importStar(require("caniuse-api"));
const ts = tslib_1.__importStar(require("typescript"));
function isDifferentialLoadingNeeded(projectRoot, target = ts.ScriptTarget.ES5) {
    const supportES2015 = target !== ts.ScriptTarget.ES3 && target !== ts.ScriptTarget.ES5;
    return supportES2015 && isEs5SupportNeeded(projectRoot);
}
exports.isDifferentialLoadingNeeded = isDifferentialLoadingNeeded;
function isEs5SupportNeeded(projectRoot) {
    const browsersList = browserslist(undefined, {
        path: projectRoot,
    });
    return !caniuse.isSupported('es6-module', browsersList.join(', '));
}
exports.isEs5SupportNeeded = isEs5SupportNeeded;
const fs_1 = require("fs");
const path = tslib_1.__importStar(require("path"));
function isDirectory(path) {
    try {
        return fs_1.statSync(path).isDirectory();
    }
    catch (_) {
        return false;
    }
}
exports.isDirectory = isDirectory;
function findAllNodeModules(from, root) {
    const nodeModules = [];
    let current = from;
    while (current && current !== root) {
        const potential = path.join(current, 'node_modules');
        if (fs_1.existsSync(potential) && isDirectory(potential)) {
            nodeModules.push(potential);
        }
        const next = path.dirname(current);
        if (next === current) {
            break;
        }
        current = next;
    }
    return nodeModules;
}
exports.findAllNodeModules = findAllNodeModules;
