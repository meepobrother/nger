Object.defineProperty(exports, "__esModule", { value: true });
var WebpackActionTypes;
(function (WebpackActionTypes) {
    // 打包命令
    WebpackActionTypes["Build"] = "[Webpack Build] Build";
    WebpackActionTypes["Decrement"] = "[Counter Component] Decrement";
    WebpackActionTypes["Reset"] = "[Counter Component] Reset";
})(WebpackActionTypes = exports.WebpackActionTypes || (exports.WebpackActionTypes = {}));
// 打包
class Build {
    constructor() {
        this.type = WebpackActionTypes.Build;
    }
}
exports.Build = Build;
