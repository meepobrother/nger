Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RoleMetadataKey = 'RoleMetadataKey';
;
exports.Role = ims_decorator_1.makeDecorator(exports.RoleMetadataKey);
// 定义权限
class RoleClassAst extends ims_decorator_1.ClassContext {
    constructor(ast, context) {
        super(ast, context);
        const def = this.ast.metadataDef;
        this.code = def.code || this.ast.target.name;
    }
}
exports.RoleClassAst = RoleClassAst;
function isRoleClassAst(ast) {
    return ast.metadataKey === exports.RoleMetadataKey;
}
exports.isRoleClassAst = isRoleClassAst;
// 使用权限
exports.UseRoleMetadataKey = 'UseRoleMetadataKey';
exports.UseRole = (...roles) => {
    return ims_decorator_1.makeDecorator(exports.UseRoleMetadataKey)({
        roles
    });
};
class UseRoleMethodAst extends ims_decorator_1.MethodContext {
}
exports.UseRoleMethodAst = UseRoleMethodAst;
function isUseRoleMethodAst(val) {
    return val.metadataKey === exports.UseRoleMetadataKey;
}
exports.isUseRoleMethodAst = isUseRoleMethodAst;
