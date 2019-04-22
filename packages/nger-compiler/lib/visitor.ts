import { NullAstVisitor, ClassAst, ParserAstContext, ConstructorAst, PropertyAst } from 'ims-decorator';
import {
    // classes
    isComponentClassAst, ComponentClassAst,
    isDirectiveClassAst, DirectiveClassAst,
    isPipeClassAst, PipeClassAst,
    isNgModuleClassAst, NgModuleClassAst,
    isInjectableClassAst, InjectableClassAst,
    isPageClassAst, PageClassAst,
    // property
    isContentChildPropertyAst, ContentChildPropertyAst,
    isContentChildrenPropertyAst, ContentChildrenPropertyAst,
    isViewChildPropertyAst, ViewChildPropertyAst,
    isViewChildrenPropertyAst, ViewChildrenPropertyAst,
    isInputPropertyAst, InputPropertyAst,
    isOutputPropertyAst, OutputPropertyAst,
    isHostBindingPropertyAst, HostBindingPropertyAst,
    isHostListenerPropertyAst, HostListenerPropertyAst,
    // constructor
    isHostConstructorAst, isSelfConstructorAst,
    isInjectConstructorAst, isOptionalConstructorAst,
    isSkipSelfConstructorAst, isAttributeConstructorAst,
    HostConstructorAst, SelfConstructorAst,
    InjectConstructorAst, OptionalConstructorAst,
    SkipSelfConstructorAst, AttributeConstructorAst,
} from 'nger-core'
import { Visitors } from 'ims-decorator'
export class NgVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext) {
        if (isComponentClassAst(ast)) {
            return new ComponentClassAst(ast, context)
        }
        if (isDirectiveClassAst(ast)) {
            return new DirectiveClassAst(ast, context)
        }
        if (isPipeClassAst(ast)) {
            return new PipeClassAst(ast, context)
        }
        if (isNgModuleClassAst(ast)) {
            return new NgModuleClassAst(ast, context)
        }
        if (isInjectableClassAst(ast)) {
            return new InjectableClassAst(ast, context)
        }
        if (isPageClassAst(ast)) {
            return new PageClassAst(ast, context)
        }
    }
    visitConstructor(ast: ConstructorAst, context: ParserAstContext) {
        if (isHostConstructorAst(ast)) {
            return new HostConstructorAst(ast, context)
        }
        if (isSelfConstructorAst(ast)) {
            return new SelfConstructorAst(ast, context)
        }
        if (isInjectConstructorAst(ast)) {
            return new InjectConstructorAst(ast, context)
        }
        if (isOptionalConstructorAst(ast)) {
            return new OptionalConstructorAst(ast, context)
        }
        if (isSkipSelfConstructorAst(ast)) {
            return new SkipSelfConstructorAst(ast, context)
        }
        if (isAttributeConstructorAst(ast)) {
            return new AttributeConstructorAst(ast, context)
        }
    }
    visitProperty(ast: PropertyAst, context: ParserAstContext) {
        if (isContentChildPropertyAst(ast)) {
            return new ContentChildPropertyAst(ast, context)
        }
        if (isContentChildrenPropertyAst(ast)) {
            return new ContentChildrenPropertyAst(ast, context)
        }
        if (isViewChildPropertyAst(ast)) {
            return new ViewChildPropertyAst(ast, context)
        }
        if (isViewChildrenPropertyAst(ast)) {
            return new ViewChildrenPropertyAst(ast, context)
        }
        if (isInputPropertyAst(ast)) {
            return new InputPropertyAst(ast, context)
        }
        if (isOutputPropertyAst(ast)) {
            return new OutputPropertyAst(ast, context)
        }
        if (isHostBindingPropertyAst(ast)) {
            return new HostBindingPropertyAst(ast, context)
        }
        if (isHostListenerPropertyAst(ast)) {
            return new HostListenerPropertyAst(ast, context)
        }
    }
}
export default new Visitors([
    new NgVisitor()
]);