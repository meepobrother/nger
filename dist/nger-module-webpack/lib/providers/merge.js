"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const webpack_merge_1 = tslib_1.__importDefault(require("webpack-merge"));
let WebpackMergeService = class WebpackMergeService {
    constructor() {
        this.unique = webpack_merge_1.default.unique;
        this.smart = webpack_merge_1.default.smart;
        this.multiple = webpack_merge_1.default.multiple;
    }
    merge(...configs) {
        return webpack_merge_1.default(...configs);
    }
    create(customizeOptions) {
        return webpack_merge_1.default(customizeOptions);
    }
    strategy(options) {
        return webpack_merge_1.default.strategy(options);
    }
    smartStrategy(options) {
        return webpack_merge_1.default.smartStrategy(options);
    }
};
WebpackMergeService = tslib_1.__decorate([
    nger_core_1.Injectable()
], WebpackMergeService);
exports.WebpackMergeService = WebpackMergeService;
