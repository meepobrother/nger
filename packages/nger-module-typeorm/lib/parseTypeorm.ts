import * as core from 'nger-core';
import { TypeContext, Type } from 'ims-decorator'
import * as typeorm from 'typeorm';

export function parseTypeorm(context: TypeContext) {
    const typeormAst = context.getClass(core.TypeormMetadataKey) as core.TypeormClassAst;
    const entities: Type<any>[] = [];
    typeormAst.entities.map(model => {
        model.classes.map(cls => {
            if (cls instanceof core.EntityClassAst) {
                typeorm.Entity(cls.ast.metadataDef)(cls.ast.target)
            } else if (cls instanceof core.ChildEntityClassAst) {
                typeorm.ChildEntity(cls.ast.metadataDef)(cls.ast.target)
            } else if (cls instanceof core.TableInheritanceClassAst) {
                typeorm.TableInheritance(cls.ast.metadataDef)(cls.ast.target)
            } else if (cls instanceof core.TreeClassAst) {
                typeorm.Tree(cls.ast.metadataDef.type)(cls.ast.target)
            } else {
                console.error(`cls`)
            }
            entities.push(cls.ast.target);
        });
        model.propertys.map(cls => {
            if (cls instanceof core.ColumnPropertyAst) {
                typeorm.Column(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey)
            } else if (cls instanceof core.AfterInsertPropertyAst) {
                typeorm.AfterInsert()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.AfterLoadPropertyAst) {
                typeorm.AfterLoad()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.AfterRemovePropertyAst) {
                typeorm.AfterRemove()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.AfterUpdatePropertyAst) {
                typeorm.AfterUpdate()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.BeforeInsertPropertyAst) {
                typeorm.BeforeInsert()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.BeforeRemovePropertyAst) {
                typeorm.BeforeRemove()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.BeforeUpdatePropertyAst) {
                typeorm.BeforeUpdate()(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.EntityRepositoryPropertyAst) {
                typeorm.EntityRepository(cls.ast.metadataDef.entity)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.CheckPropertyAst) {
                typeorm.Check(cls.ast.metadataDef.expression)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.ExclusionPropertyAst) {
                typeorm.Exclusion(cls.ast.metadataDef.expression)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.GeneratedPropertyAst) {
                typeorm.Generated(cls.ast.metadataDef.strategy)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.IndexPropertyAst) {
                typeorm.Index(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.UniquePropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.name) {
                    if (typeof def.fields === 'function') {
                        typeorm.Unique(def.name, def.fields)(cls.ast.target, cls.ast.propertyKey as string)
                    } else if (Array.isArray(def.fields)) {
                        typeorm.Unique(def.name, def.fields)(cls.ast.target, cls.ast.propertyKey as string)
                    }
                } else {
                    if (typeof def.fields === 'function') {
                        typeorm.Unique(def.fields)(cls.ast.target, cls.ast.propertyKey as string)
                    } else if (Array.isArray(def.fields)) {
                        typeorm.Unique(def.fields)(cls.ast.target, cls.ast.propertyKey as string)
                    }
                }
            } else if (cls instanceof core.PrimaryColumnPropertyAst) {
                typeorm.PrimaryColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.CreateDateColumnPropertyAst) {
                typeorm.CreateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.ObjectIdColumnPropertyAst) {
                typeorm.ObjectIdColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.PrimaryGeneratedColumnPropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.strategy) {
                    if (def.options) {
                        typeorm.PrimaryGeneratedColumn(def.strategy as any, def.options)(cls.ast.target, cls.ast.propertyKey as string)
                    }
                } else {
                    if (def.options) {
                        typeorm.PrimaryGeneratedColumn(def.options)(cls.ast.target, cls.ast.propertyKey as string)
                    } else {
                        typeorm.PrimaryGeneratedColumn()(cls.ast.target, cls.ast.propertyKey as string)
                    }
                }
            } else if (cls instanceof core.UpdateDateColumnPropertyAst) {
                typeorm.UpdateDateColumn(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.VersionColumnPropertyAst) {
                typeorm.VersionColumn(cls.ast.metadataDef as any)(cls.ast.target, cls.ast.propertyKey as string)
            } else if (cls instanceof core.TreeChildrenPropertyAst) {
                typeorm.TreeChildren(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.TreeLevelColumnPropertyAst) {
                typeorm.TreeLevelColumn()(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.TreeParentPropertyAst) {
                typeorm.TreeParent()(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.JoinColumnPropertyAst) {
                const def = cls.ast.metadataDef;
                if (Array.isArray(def.options)) {
                    typeorm.JoinColumn(def.options)(cls.ast.target, cls.ast.propertyKey as string)
                } else if (def.options) {
                    typeorm.JoinColumn(def.options)(cls.ast.target, cls.ast.propertyKey as string)
                } else {
                    typeorm.JoinColumn()(cls.ast.target, cls.ast.propertyKey as string)
                }
            }
            else if (cls instanceof core.JoinTablePropertyAst) {
                const def = cls.ast.metadataDef;
                if (def.options) {
                    typeorm.JoinTable(def.options)(cls.ast.target, cls.ast.propertyKey as string)
                } else {
                    typeorm.JoinTable()(cls.ast.target, cls.ast.propertyKey as string)
                }
            }
            else if (cls instanceof core.ManyToManyPropertyAst) {
                typeorm.ManyToMany(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.ManyToOnePropertyAst) {
                typeorm.ManyToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.OneToManyPropertyAst) {
                const def = cls.ast.metadataDef;
                typeorm.OneToMany(def.typeFunction, def.inverseSide, def.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.OneToOnePropertyAst) {
                typeorm.OneToOne(cls.ast.metadataDef.typeFunction, cls.ast.metadataDef.options)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.RelationCountPropertyAst) {
                typeorm.RelationCount(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey as string)
            }
            else if (cls instanceof core.RelationIdPropertyAst) {
                typeorm.RelationId(cls.ast.metadataDef.relation)(cls.ast.target, cls.ast.propertyKey as string)
            }
        });
        model.methods.map(cls => {
            if (cls instanceof core.isTransactionMethodAst) {
                cls.parameters.map(par => {
                    if (par instanceof core.TransactionManagerParameterAst) {
                        typeorm.TransactionManager()(par.ast.target, par.ast.propertyKey, par.ast.parameterIndex)
                    }
                    else if (par instanceof core.TransactionRepositoryParameterAst) {
                        typeorm.TransactionRepository()(par.ast.target, par.ast.propertyKey as string, par.ast.parameterIndex)
                    }
                });
                typeorm.Transaction(cls.ast.metadataDef)(cls.ast.target, cls.ast.propertyKey as string, cls.ast.descriptor)
            }
        });
    });
    const migrations: Type<any>[] = [];
    typeormAst.migrations.map(model => {
        migrations.push(model.target)
    });
    const subscribers: Type<any>[] = [];
    typeormAst.subscribers.map(model => {
        subscribers.push(model.target);
        typeorm.EventSubscriber()(model.target)
    })
    return {
        entities,
        migrations,
        subscribers
    };
}