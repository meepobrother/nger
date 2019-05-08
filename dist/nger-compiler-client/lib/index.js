"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_compiler_1 = tslib_1.__importStar(require("nger-compiler"));
const task_1 = require("./task");
exports.default = [
    ...nger_compiler_1.default,
    {
        provide: nger_compiler_1.WATCH_TASK,
        useValue: task_1.clientTask,
        multi: true
    }
];
