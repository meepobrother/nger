"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_compiler_1 = require("nger-compiler");
exports.NgerCompilerTypescript = nger_compiler_1.NgerCompilerTypescript;
const babel_1 = require("./babel");
exports.NgerBabel = babel_1.NgerBabel;
const staticProvider = [{
        provide: babel_1.NgerBabel,
        useClass: babel_1.NgerBabel,
        deps: [nger_compiler_1.NgerCompilerTypescript]
    }, {
        provide: nger_compiler_1.NgerCompilerTypescript,
        useClass: nger_compiler_1.NgerCompilerTypescript,
        deps: []
    }];
exports.default = staticProvider;
