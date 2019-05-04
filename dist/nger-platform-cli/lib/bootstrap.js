"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nger_core_1 = require("nger-core");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const path_1 = require("path");
const pkg = require(path_1.join(__dirname, '../', 'package.json'));
class NgerPlatformCli extends nger_core_1.NgModuleBootstrap {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    async run(ref) {
        let _yargs = yargs_1.default;
        const ngModule = ref.context.getClass(nger_core_1.NgModuleMetadataKey);
        _yargs = _yargs
            .usage(`欢迎使用nger ${pkg.version || '1.0.0'}`)
            .help('h')
            .alias('h', 'help')
            .describe('help', '查看帮助信息')
            .version('v')
            .alias('v', 'version')
            .describe('version', '查看版本号信息')
            .epilog(`${chalk_1.default.green("power by ims")}`);
        _yargs.example(`ims -h`, `查看所有命令及使用详情`);
        _yargs.example(`ims -v`, `查看版本号`);
        if (ngModule.declarations) {
            ngModule.declarations.filter(it => !!it.getClass(nger_core_1.CommandMetadataKey)).map(context => {
                const componentFactory = ref.componentFactoryResolver.resolveComponentFactory(context.target);
                const command = context.getClass(nger_core_1.CommandMetadataKey);
                if (!!command && componentFactory) {
                    const componentRef = componentFactory.create(ref.injector);
                    const options = context.getProperty(nger_core_1.OptionMetadataKey);
                    const def = command.ast.metadataDef;
                    _yargs = _yargs
                        .example(def.example.command, def.example.description)
                        .command(def.name, def.description, (args) => {
                        options.map(option => {
                            const def = option.ast.metadataDef;
                            const name = option.ast.propertyType.name;
                            if (name === 'Boolean') {
                                def.boolean = true;
                            }
                            else if (name === 'String') {
                                def.string = true;
                            }
                            args.option(option.ast.propertyKey, {
                                ...def
                            });
                        });
                        return args;
                    }, async (argv) => {
                        const { _, $0, ...props } = argv;
                        console.log(props);
                        options.map(opt => {
                            const def = opt.ast.metadataDef;
                            const key = opt.ast.propertyKey;
                            let val;
                            if (props[key]) {
                                val = props[key];
                                delete props[key];
                                if (typeof def.alias === 'string') {
                                    delete props[def.alias];
                                }
                            }
                            componentRef.instance[opt.ast.propertyKey] = val;
                        });
                        Object.keys(props).map(key => componentRef.instance[key] = props[key]);
                        await componentRef.instance && componentRef.instance['run']();
                    });
                }
            });
        }
        const argv = _yargs.argv;
    }
}
exports.NgerPlatformCli = NgerPlatformCli;
