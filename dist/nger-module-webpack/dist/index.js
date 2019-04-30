Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const tokens_1 = require("./providers/tokens");
exports.WebpackConfigToken = tokens_1.WebpackConfigToken;
const merge_1 = require("./providers/merge");
exports.WebpackMergeService = merge_1.WebpackMergeService;
const webpack_1 = require("./providers/webpack");
exports.WebpackService = webpack_1.WebpackService;
const path_1 = require("path");
const root = process.cwd();
let NgerModuleWebpack = class NgerModuleWebpack {
};
NgerModuleWebpack = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            merge_1.WebpackMergeService,
            webpack_1.WebpackService,
            {
                provide: tokens_1.WebpackConfigToken,
                useValue: {
                    mode: 'development',
                    entry: path_1.join(root, 'src/admin.ts'),
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js', '.jsx'],
                        mainFields: ['main:h5', 'main', 'module'],
                        symlinks: true,
                        modules: [path_1.join(root, 'packages'), path_1.join(root, 'node_modules')]
                    },
                    plugins: []
                },
                multi: true
            }
        ]
    })
], NgerModuleWebpack);
exports.NgerModuleWebpack = NgerModuleWebpack;

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

Object.defineProperty(exports, "__esModule", { value: true });
const nger_di_1 = require("nger-di");
exports.WebpackConfigToken = new nger_di_1.InjectionToken(`WebpackConfigToken`);

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const tokens_1 = require("./tokens");
const merge_1 = require("./merge");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const nger_di_1 = require("nger-di");
const nger_store_1 = require("nger-store");
let WebpackService = class WebpackService {
    constructor(injector, merge, store) {
        this.injector = injector;
        this.merge = merge;
        this.store = store;
        this.serveSpinner = ora_1.default(`Starting development server, please wait~`);
    }
    get compiler() {
        return webpack_1.default(this.config);
    }
    get config() {
        this.configs = this.injector.get(tokens_1.WebpackConfigToken);
        if (this.configs.length > 1) {
            return this.merge.merge(...this.configs);
        }
        else if (this.configs.length === 1) {
            return this.configs[0];
        }
        return {};
    }
    /** 运行 */
    build() {
        this.compiler.run((err) => {
            this.printBuildError(err);
        });
    }
    printBuildError(err) {
        const message = err.message;
        const stack = err.stack;
        if (stack && message.indexOf('from UglifyJs') !== -1) {
            try {
                const matched = /(.+)\[(.+):(.+),(.+)\]\[.+\]/.exec(stack);
                if (!matched) {
                    throw new Error('Using errors for control flow is bad.');
                }
                const problemPath = matched[2];
                const line = matched[3];
                const column = matched[4];
                console.log('Failed to minify the code from this file: \n\n', chalk_1.default.yellow(`\t${problemPath}:${line}${column !== '0' ? ':' + column : ''}`), '\n');
            }
            catch (ignored) {
                console.log('Failed to minify the bundle.', err);
            }
        }
        else {
            console.log((message || err) + '\n');
        }
    }
};
WebpackService = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__param(0, nger_core_1.Inject()),
    tslib_1.__param(1, nger_core_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [nger_di_1.Injector,
        merge_1.WebpackMergeService,
        nger_store_1.Store])
], WebpackService);
exports.WebpackService = WebpackService;

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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const nger_effects_1 = require("nger-effects");
let WebpackEffects = class WebpackEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        this.actions$.subscribe(res => {
        });
    }
};
WebpackEffects = tslib_1.__decorate([
    nger_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [nger_effects_1.Actions])
], WebpackEffects);
exports.WebpackEffects = WebpackEffects;

Object.defineProperty(exports, "__esModule", { value: true });
const webpack_actions_1 = require("./webpack.actions");
exports.initialState = 0;
function counterReducer(state = exports.initialState, action) {
    switch (action.type) {
        case webpack_actions_1.WebpackActionTypes.Decrement:
            return state - 1;
        case webpack_actions_1.WebpackActionTypes.Reset:
            return 0;
        default:
            return state;
    }
}
exports.counterReducer = counterReducer;
