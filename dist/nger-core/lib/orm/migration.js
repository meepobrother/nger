"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.MigrationMetadataKey = 'MigrationMetadataKey';
exports.Migration = ims_decorator_1.makeDecorator(exports.MigrationMetadataKey);
function isMigrationClassAst(val) {
    return val.metadataKey === exports.MigrationMetadataKey;
}
exports.isMigrationClassAst = isMigrationClassAst;
class MigrationClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
    }
}
exports.MigrationClassAst = MigrationClassAst;
