Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const path_1 = require("path");
const root = process.cwd();
const public_api_1 = require("./build/public_api");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
let BuildCommand = class BuildCommand {
    constructor() {
        this.type = 'h5';
        this.watch = false;
    }
    getTypeContext() {
        if (this.type === 'admin') {
            return require(path_1.join(root, 'src/admin')).default;
        }
        else {
            return require(path_1.join(root, 'src/app')).default;
        }
    }
    async run() {
        this.logger.warn(`building ${this.type}`);
        this.logger.warn(`watching: ${!!this.watch}`);
        const app = this.getTypeContext();
        if (app) {
            switch (this.type) {
                case 'h5':
                    this.build.h5(app);
                    break;
                case 'wechat':
                    this.build.wechat(app);
                    break;
                case 'weapp':
                    this.build.weapp(app);
                    break;
                case 'alipay':
                    this.build.alipay(app);
                    break;
                case 'swap':
                    this.build.swap(app);
                    break;
                case 'tt':
                    this.build.tt(app);
                    break;
                case 'android':
                    this.build.android(app);
                    break;
                case 'ios':
                    this.build.ios(app);
                    break;
                case 'admin':
                    this.build.admin(app);
                    break;
                default:
                    const allPkgs = fs_extra_1.default.readdirSync(path_1.join(root, 'packages'));
                    for (let pkg of allPkgs) {
                        if (pkg.startsWith('.')) { }
                        else {
                            this.logger.warn(`build.lib: ${pkg}`);
                            await this.build.lib(pkg);
                        }
                    }
                    break;
            }
        }
    }
};
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", nger_core_1.Logger)
], BuildCommand.prototype, "logger", void 0);
tslib_1.__decorate([
    nger_core_1.Inject(),
    tslib_1.__metadata("design:type", public_api_1.NgerCliBuild)
], BuildCommand.prototype, "build", void 0);
tslib_1.__decorate([
    nger_core_1.Option({
        alias: 'w'
    }),
    tslib_1.__metadata("design:type", Boolean)
], BuildCommand.prototype, "watch", void 0);
BuildCommand = tslib_1.__decorate([
    nger_core_1.Command({
        name: 'build [type]',
        description: 'build h5|wechat|weapp|alipay|swap|tt|lib',
        example: {
            command: 'nger build weapp --watch',
            description: '构建微信小程序'
        }
    })
], BuildCommand);
exports.BuildCommand = BuildCommand;
