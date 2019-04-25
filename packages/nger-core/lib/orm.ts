import { NullAstVisitor, ClassAst, ParserAstContext, PropertyAst, ParameterAst, MethodAst } from 'ims-decorator';
import * as orm from './orm/index'
export class OrmVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        // entity
        if (orm.isEntityClassAst(ast)) {
            return new orm.EntityClassAst(ast, context)
        }
        if (orm.isChildEntityClassAst(ast)) {
            return new orm.ChildEntityClassAst(ast, context)
        }
        if (orm.isTableInheritanceClassAst(ast)) {
            return new orm.TableInheritanceClassAst(ast, context)
        }
        // tree
        if (orm.isTreeClassAst(ast)) {
            return new orm.TreeClassAst(ast, context)
        }
        // listener
        if (orm.isEventSubscriberClassAst(ast)) {
            return new orm.EventSubscriberClassAst(ast, context)
        }
        if (orm.isMigrationClassAst(ast)) {
            return new orm.MigrationClassAst(ast, context)
        }
        if (orm.isTypeormClassAst(ast)) {
            return new orm.TypeormClassAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        // listener
        if (orm.isAfterInsertPropertyAst(ast)) {
            return new orm.AfterInsertPropertyAst(ast, context)
        }
        if (orm.isAfterLoadPropertyAst(ast)) {
            return new orm.AfterLoadPropertyAst(ast, context)
        }
        if (orm.isAfterRemovePropertyAst(ast)) {
            return new orm.AfterRemovePropertyAst(ast, context)
        }
        if (orm.isAfterUpdatePropertyAst(ast)) {
            return new orm.AfterUpdatePropertyAst(ast, context)
        }
        if (orm.isBeforeInsertPropertyAst(ast)) {
            return new orm.BeforeInsertPropertyAst(ast, context)
        }
        if (orm.isBeforeRemovePropertyAst(ast)) {
            return new orm.BeforeRemovePropertyAst(ast, context)
        }
        if (orm.isBeforeUpdatePropertyAst(ast)) {
            return new orm.BeforeUpdatePropertyAst(ast, context)
        }
        // other
        if (orm.isEntityRepositoryPropertyAst(ast)) {
            return new orm.EntityRepositoryPropertyAst(ast, context)
        }
        if (orm.isCheckPropertyAst(ast)) {
            return new orm.CheckPropertyAst(ast, context)
        }
        if (orm.isExclusionPropertyAst(ast)) {
            return new orm.ExclusionPropertyAst(ast, context)
        }
        if (orm.isGeneratedPropertyAst(ast)) {
            return new orm.GeneratedPropertyAst(ast, context)
        }
        if (orm.isIndexPropertyAst(ast)) {
            return new orm.IndexPropertyAst(ast, context)
        }
        if (orm.isUniquePropertyAst(ast)) {
            return new orm.UniquePropertyAst(ast, context)
        }
        // column
        if (orm.isColumnPropertyAst(ast)) {
            return new orm.ColumnPropertyAst(ast, context)
        }
        if (orm.isPrimaryColumnPropertyAst(ast)) {
            return new orm.PrimaryColumnPropertyAst(ast, context)
        }
        if (orm.isCreateDateColumnPropertyAst(ast)) {
            return new orm.CreateDateColumnPropertyAst(ast, context)
        }
        if (orm.isObjectIdColumnPropertyAst(ast)) {
            return new orm.ObjectIdColumnPropertyAst(ast, context)
        }
        if (orm.isPrimaryGeneratedColumnPropertyAst(ast)) {
            return new orm.PrimaryGeneratedColumnPropertyAst(ast, context)
        }
        if (orm.isUpdateDateColumnPropertyAst(ast)) {
            return new orm.UpdateDateColumnPropertyAst(ast, context)
        }
        if (orm.isVersionColumnPropertyAst(ast)) {
            return new orm.VersionColumnPropertyAst(ast, context)
        }
        if (orm.isTreeChildrenPropertyAst(ast)) {
            return new orm.TreeChildrenPropertyAst(ast, context)
        }
        if (orm.isTreeLevelColumnPropertyAst(ast)) {
            return new orm.TreeLevelColumnPropertyAst(ast, context)
        }
        if (orm.isTreeParentPropertyAst(ast)) {
            return new orm.TreeParentPropertyAst(ast, context)
        }
        // relation
        if (orm.isJoinColumnPropertyAst(ast)) {
            return new orm.JoinColumnPropertyAst(ast, context)
        }
        if (orm.isJoinTablePropertyAst(ast)) {
            return new orm.JoinTablePropertyAst(ast, context)
        }
        if (orm.isManyToManyPropertyAst(ast)) {
            return new orm.ManyToManyPropertyAst(ast, context)
        }
        if (orm.isManyToOnePropertyAst(ast)) {
            return new orm.ManyToOnePropertyAst(ast, context)
        }
        if (orm.isOneToManyPropertyAst(ast)) {
            return new orm.OneToManyPropertyAst(ast, context)
        }
        if (orm.isOneToOnePropertyAst(ast)) {
            return new orm.OneToOnePropertyAst(ast, context)
        }
        if (orm.isRelationCountPropertyAst(ast)) {
            return new orm.RelationCountPropertyAst(ast, context)
        }
        if (orm.isRelationIdPropertyAst(ast)) {
            return new orm.RelationIdPropertyAst(ast, context)
        }
    }
    visitMethod(ast: MethodAst, context: ParserAstContext) {
        if (orm.isTransactionMethodAst(ast)) {
            return new orm.TransactionMethodAst(ast, context)
        }
    }
    visitParameter(ast: ParameterAst, context: ParserAstContext) {
        if (orm.isTransactionManagerParameterAst(ast)) {
            return new orm.TransactionManagerParameterAst(ast, context)
        }
        if (orm.isTransactionRepositoryParameterAst(ast)) {
            return new orm.TransactionRepositoryParameterAst(ast, context)
        }
    }
}
