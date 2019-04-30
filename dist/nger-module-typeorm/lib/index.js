Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var NgerModuleTypeorm_1;
const nger_core_1 = require("nger-core");
exports.TypeormToken = nger_core_1.TypeormToken;
exports.TypeormOptionsToken = nger_core_1.TypeormOptionsToken;
const nger_util_1 = require("nger-util");
const nger_di_1 = require("nger-di");
const createTypeormConfig_1 = require("./createTypeormConfig");
const typeorm_1 = require("typeorm");
exports.getConnectionManager = typeorm_1.getConnectionManager;
const path_1 = require("path");
let NgerModuleTypeorm = NgerModuleTypeorm_1 = class NgerModuleTypeorm {
    // 启动
    static forRoot(orm) {
        const root = process.cwd();
        const config = require(path_1.join(root, 'config/config.json')).db;
        return {
            ngModule: NgerModuleTypeorm_1,
            providers: [{
                    provide: nger_core_1.TypeormOptionsToken,
                    useValue: config
                }, {
                    provide: nger_core_1.TypeormToken,
                    useValue: orm,
                    multi: true
                }]
        };
    }
    // 加载多个typeorm类
    static forChild(orm) {
        return {
            ngModule: NgerModuleTypeorm_1,
            providers: [
                {
                    provide: nger_core_1.TypeormToken,
                    useValue: orm,
                    multi: true
                }
            ]
        };
    }
};
NgerModuleTypeorm = NgerModuleTypeorm_1 = tslib_1.__decorate([
    nger_core_1.NgModule({
        providers: [
            nger_util_1.NgerUtil,
            {
                provide: nger_core_1.ConnectionManagerToken,
                useFactory: () => typeorm_1.getConnectionManager(),
                deps: []
            },
            {
                provide: nger_core_1.ConnectionToken,
                useFactory: (injector) => {
                    const options = injector.get(nger_core_1.TypeormOptionsToken);
                    const connectionManager = typeorm_1.getConnectionManager();
                    return connectionManager.get(options.name);
                },
                deps: [
                    nger_di_1.Injector
                ]
            },
            {
                provide: nger_core_1.APP_INITIALIZER,
                useFactory: (injector) => {
                    return async () => {
                        // typeorm 配置
                        const logger = injector.get(nger_core_1.Logger);
                        injector.setStatic([{
                                provide: nger_core_1.ConnectionManagerToken,
                                useValue: typeorm_1.getConnectionManager()
                            }]);
                        try {
                            const options = await injector.get(nger_core_1.TypeormOptionsToken);
                            const typeorms = injector.get(nger_core_1.TypeormToken);
                            const { entities, subscribers, migrations } = createTypeormConfig_1.createTypeormConfig(typeorms);
                            const connectionManager = typeorm_1.getConnectionManager();
                            if (options.name) {
                                // 防止重复打开
                                if (connectionManager.has(options.name)) {
                                    // 关闭老的连接
                                    await connectionManager.get(options.name).close();
                                }
                            }
                            const connection = connectionManager.create({
                                ...options,
                                entities,
                                subscribers,
                                migrations
                            });
                            await connection.connect();
                            injector.setStatic([{
                                    provide: nger_core_1.ConnectionToken,
                                    useValue: connection
                                }]);
                        }
                        catch (e) {
                            injector.setStatic([{
                                    provide: nger_core_1.ConnectionToken,
                                    useValue: typeorm_1.getConnection()
                                }]);
                        }
                    };
                },
                deps: [nger_di_1.Injector],
                multi: true
            }
        ]
    })
], NgerModuleTypeorm);
exports.NgerModuleTypeorm = NgerModuleTypeorm;
