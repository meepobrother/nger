"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mocha_1 = tslib_1.__importDefault(require("mocha"));
const options = {};
const _mocha = new mocha_1.default(options);
const path_1 = require("path");
_mocha.addFile(path_1.join(__dirname, '.test.ts'));
_mocha.run();
