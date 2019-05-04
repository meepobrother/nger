"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_compiler_1 = require("nger-compiler");
const nger_compiler_client_1 = tslib_1.__importDefault(require("nger-compiler-client"));
const task_1 = require("./task");
const provider = [
    ...nger_compiler_client_1.default,
    {
        provide: nger_compiler_1.WATCH_TASK,
        useValue: task_1.preactTask,
        multi: true
    }
];
exports.default = provider;
