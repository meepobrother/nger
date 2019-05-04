"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compiler_1 = require("@angular/compiler");
const nger_core_1 = require("nger-core");
let NgerCompilerNgTemplate = class NgerCompilerNgTemplate {
    parse(template, templateUrl, options) {
        const nodes = compiler_1.parseTemplate(template, templateUrl, options).nodes;
        return nodes;
    }
};
NgerCompilerNgTemplate = tslib_1.__decorate([
    nger_core_1.Injectable()
], NgerCompilerNgTemplate);
exports.NgerCompilerNgTemplate = NgerCompilerNgTemplate;
