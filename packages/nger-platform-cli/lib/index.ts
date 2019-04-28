import {
    CommandMetadataKey, CommandClassAst,
    OptionMetadataKey, OptionPropertyAst, OptionOptions
    , NgModuleClassAst, NgModuleMetadataKey,
    NgModuleRef, createPlatformFactory, platformCore, APP_INITIALIZER, Logger,
    NgModuleBootstrap
} from "nger-core";
import yargs, { Argv, Arguments } from 'yargs';
import chalk from 'chalk';
import { join } from 'path';
import ngerPlatformNode from 'nger-platform-node'
const pkg = require(join(__dirname, '../', 'package.json'))

export class NgerPlatformCli extends NgModuleBootstrap {
    constructor(public logger: Logger) {
        super();
    }
    async run<T>(ref: NgModuleRef<T>) {
        let _yargs = yargs;
        const ngModule = ref.context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        _yargs = _yargs
            .usage(`欢迎使用nger ${pkg.version || '1.0.0'}`)
            .help('h')
            .alias('h', 'help')
            .describe('help', '查看帮助信息')
            .version('v')
            .alias('v', 'version')
            .describe('version', '查看版本号信息')
            .epilog(`${chalk.green("power by ims")}`)
        _yargs.example(`ims -h`, `查看所有命令及使用详情`);
        _yargs.example(`ims -v`, `查看版本号`);
        
        if (ngModule.declarations) {
            ngModule.declarations.filter(it => !!it.getClass(CommandMetadataKey)).map(context => {
                const componentFactory = ref.componentFactoryResolver.resolveComponentFactory(context.target)
                const command = context.getClass(CommandMetadataKey) as CommandClassAst;
                if (!!command && componentFactory) {
                    const componentRef = componentFactory.create(ref.injector)
                    const options = context.getProperty(OptionMetadataKey) as OptionPropertyAst[];
                    const def = command.ast.metadataDef;
                    _yargs = _yargs
                        .example(def.example.command, def.example.description)
                        .command(def.name, def.description, (args: Argv<any>) => {
                            options.map(option => {
                                const def: OptionOptions = option.ast.metadataDef;
                                const name = option.ast.propertyType.name;
                                if (name === 'Boolean') {
                                    def.boolean = true;
                                } else if (name === 'String') {
                                    def.string = true;
                                }
                                args.option(option.ast.propertyKey as string, {
                                    ...def,
                                    default: componentRef.instance[option.ast.propertyKey]
                                });
                            });
                            return args
                        }, async (argv: Arguments<any>) => {
                            const { _, $0, ...props } = argv;
                            options.map(opt => {
                                const def: OptionOptions = opt.ast.metadataDef;
                                const key = opt.ast.propertyKey;
                                let val: any;
                                if (props[key]) {
                                    val = props[key];
                                    delete props[key];
                                    if (typeof def.alias === 'string') {
                                        delete props[def.alias];
                                    }
                                }
                                componentRef.instance[opt.ast.propertyKey] = val;
                            });
                            Object.keys(props).map(key => componentRef.instance[key] = props[key])
                            await componentRef.instance && componentRef.instance['run']();
                        });
                }
            })
        }
        _yargs.argv;
    }
}

export default createPlatformFactory(platformCore, 'cli', [{
    provide: NgModuleBootstrap,
    useClass: NgerPlatformCli,
    deps: [Logger],
    multi: true
}])