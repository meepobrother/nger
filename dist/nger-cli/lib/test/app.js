"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_platform_test_1 = tslib_1.__importDefault(require("nger-platform-test"));
const util_1 = require("./util");
const app = util_1.getTypeContext('src/app');
nger_platform_test_1.default().bootstrapModule(app);
