Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const parseTypeorm_1 = require("./parseTypeorm");
function createTypeormConfig(typeorms) {
    let entities = [];
    let subscribers = [];
    let migrations = [];
    typeorms.map(target => {
        const context = nger_core_1.visitor.visitType(target);
        const typeorm = parseTypeorm_1.parseTypeorm(context);
        entities = entities.concat(typeorm.entities);
        subscribers = subscribers.concat(typeorm.subscribers);
        migrations = migrations.concat(typeorm.migrations);
    });
    return {
        entities,
        subscribers,
        migrations
    };
}
exports.createTypeormConfig = createTypeormConfig;

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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("nger-core"));
const typeorm = tslib_1.__importStar(require("typeorm"));
function parseTypeorm(context) {
    const typeormAst = context.getClass(core.TypeormMetadataKey);
    const entities = [];
    typeormAst.entities.map(model => {
        model.classes.map(cls => {
            if (cls instanceof core.EntityClassAst) {
                typeorm.Entity(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof core.ChildEntityClassAst) {
                typeorm.ChildEntity(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof core.TableInheritanceClassAst) {
                typeorm.TableInheritance(cls.ast.metadataDef)(cls.ast.target);
            }
            else if (cls instanceof core.TreeClassAst) {
                typeorm.Tree(cls.ast.metadataDef.type)(cls.ast.target);
            }
            else {
                console.error(`cls`);
            }
            entities.push(cls.ast.target);
        });
        model.propertys.map(cls => {
            if (cls instanceof core.ColumnPropertyAst) {
                typeorm.Column(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.AfterInsertPropertyAst) {
                typeorm.AfterInsert()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.AfterLoadPropertyAst) {
                typeorm.AfterLoad()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.AfterRemovePropertyAst) {
                typeorm.AfterRemove()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.AfterUpdatePropertyAst) {
                typeorm.AfterUpdate()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.BeforeInsertPropertyAst) {
                typeorm.BeforeInsert()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.BeforeRemovePropertyAst) {
                typeorm.BeforeRemove()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.BeforeUpdatePropertyAst) {
                typeorm.BeforeUpdate()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.EntityRepositoryPropertyAst) {
                typeorm.EntityRepository(cls.ast.metadataDef.entity)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.CheckPropertyAst) {
                typeorm.Check(cls.ast.metadataDef.expression)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.ExclusionPropertyAst) {
                typeorm.Exclusion(cls.ast.metadataDef.expression)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.GeneratedPropertyAst) {
                typeorm.Generated(cls.ast.metadataDef.strategy)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.IndexPropertyAst) {
                typeorm.Index(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.UniquePropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.name) {
                    if (typeof def.fields === 'function') {
                        typeorm.Unique(def.name, def.fields)(cls.ast.target, cls.ast.propertyKey);
                    }
                    else if (Array.isArray(def.fields)) {
                        typeorm.Unique(def.name, def.fields)(cls.ast.target, cls.ast.propertyKey);
                    }
                }
                else {
                    if (typeof def.fields === 'function') {
                        typeorm.Unique(def.fields)(cls.ast.target, cls.ast.propertyKey);
                    }
                    else if (Array.isArray(def.fields)) {
                        typeorm.Unique(def.fields)(cls.ast.target, cls.ast.propertyKey);
                    }
                }
            }
            else if (cls instanceof core.PrimaryColumnPropertyAst) {
                typeorm.PrimaryColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.CreateDateColumnPropertyAst) {
                typeorm.CreateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.ObjectIdColumnPropertyAst) {
                typeorm.ObjectIdColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.PrimaryGeneratedColumnPropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.strategy) {
                    if (def.options) {
                        typeorm.PrimaryGeneratedColumn(def.strategy, def.options)(cls.ast.target, cls.ast.propertyKey);
                    }
                }
                else {
                    if (def.options) {
                        typeorm.PrimaryGeneratedColumn(def.options)(cls.ast.target, cls.ast.propertyKey);
                    }
                    else {
                        typeorm.PrimaryGeneratedColumn()(cls.ast.target, cls.ast.propertyKey);
                    }
                }
            }
            else if (cls instanceof core.UpdateDateColumnPropertyAst) {
                typeorm.UpdateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.VersionColumnPropertyAst) {
                typeorm.VersionColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.TreeChildrenPropertyAst) {
                typeorm.TreeChildren(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.TreeLevelColumnPropertyAst) {
                typeorm.TreeLevelColumn()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.TreeParentPropertyAst) {
                typeorm.TreeParent()(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.JoinColumnPropertyAst) {
                const def = cls.ast.metadataDef;
                if (Array.isArray(def.options)) {
                    typeorm.JoinColumn(def.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else if (def.options) {
                    typeorm.JoinColumn(def.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else {
                    typeorm.JoinColumn()(cls.ast.target, cls.ast.propertyKey);
                }
            }
            else if (cls instanceof core.JoinTablePropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.options) {
                    typeorm.JoinTable(def.options)(cls.ast.target, cls.ast.propertyKey);
                }
                else {
                    typeorm.JoinTable()(cls.ast.target, cls.ast.propertyKey);
                }
            }
            else if (cls instanceof core.ManyToManyPropertyAst) {
                typeorm.ManyToMany(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.ManyToOnePropertyAst) {
                typeorm.ManyToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.OneToManyPropertyAst) {
                const def = cls.ast.metadataDef;
                typeorm.OneToMany(def.typeFunction, def.inverseSide, def.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.OneToOnePropertyAst) {
                typeorm.OneToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.RelationCountPropertyAst) {
                typeorm.RelationCount(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
            }
            else if (cls instanceof core.RelationIdPropertyAst) {
                typeorm.RelationId(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey);
            }
        });
        model.methods.map(cls => {
            if (cls instanceof core.isTransactionMethodAst) {
                cls.parameters.map(par => {
                    if (par instanceof core.TransactionManagerParameterAst) {
                        typeorm.TransactionManager()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                    }
                    else if (par instanceof core.TransactionRepositoryParameterAst) {
                        typeorm.TransactionRepository()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex);
                    }
                });
                typeorm.Transaction(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey, cls.ast.descriptor);
            }
        });
    });
    const migrations = [];
    typeormAst.migrations.map(model => {
        migrations.push(model.target);
    });
    const subscribers = [];
    typeormAst.subscribers.map(model => {
        subscribers.push(model.target);
        typeorm.EventSubscriber()(model.target);
    });
    return {
        entities,
        migrations,
        subscribers
    };
}
exports.parseTypeorm = parseTypeorm;
