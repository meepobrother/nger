"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const file_system_1 = require("tns-core-modules/file-system");
let NsFileSystem = class NsFileSystem {
    currentApp() {
        return file_system_1.knownFolders.currentApp();
    }
    fileFromPath(path) {
        return file_system_1.File.fromPath(path);
    }
    fileExists(path) {
        return file_system_1.File.exists(path);
    }
};
NsFileSystem = tslib_1.__decorate([
    nger_core_1.Injectable()
], NsFileSystem);
exports.NsFileSystem = NsFileSystem;
