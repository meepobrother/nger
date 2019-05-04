import { NullAstVisitor, ClassAst, Visitors, ParserAstContext, ConstructorAst, PropertyAst, MethodAst } from 'ims-decorator';
import { ComponentClassAst, DirectiveClassAst, PipeClassAst, NgModuleClassAst, InjectableClassAst, PageClassAst, ContentChildPropertyAst, ContentChildrenPropertyAst, ViewChildPropertyAst, ViewChildrenPropertyAst, InputPropertyAst, OutputPropertyAst, HostBindingPropertyAst, HostListenerPropertyAst, HostConstructorAst, SelfConstructorAst, InjectConstructorAst, OptionalConstructorAst, SkipSelfConstructorAst, AttributeConstructorAst, InjectPropertyAst } from './decorators/public_api';
import { CommandClassAst } from './cli/command';
import { OptionPropertyAst } from './cli/option';
import { ItMethodAst } from './it';
import { ControllerClassAst } from './controller';
import { GetMethodAst, GetPropertyAst } from './http/get';
import { PostMethodAst, PostPropertyAst } from './http/post';
import { AuthGuardClassAst, AuthGuardPropertyAst } from './authGuard';
import { EffectPropertyAst } from './effect';
export declare class NgVisitor extends NullAstVisitor {
    visitClass(ast: ClassAst, context: ParserAstContext): AuthGuardClassAst | ControllerClassAst | CommandClassAst | NgModuleClassAst | DirectiveClassAst | ComponentClassAst | PipeClassAst | InjectableClassAst | PageClassAst;
    visitConstructor(ast: ConstructorAst, context: ParserAstContext): HostConstructorAst | InjectConstructorAst | SelfConstructorAst | SkipSelfConstructorAst | OptionalConstructorAst | AttributeConstructorAst;
    visitProperty(ast: PropertyAst, context: ParserAstContext): AuthGuardPropertyAst | EffectPropertyAst | OptionPropertyAst | InputPropertyAst | HostBindingPropertyAst | HostListenerPropertyAst | InjectPropertyAst | ViewChildPropertyAst | ViewChildrenPropertyAst | ContentChildPropertyAst | ContentChildrenPropertyAst | OutputPropertyAst | GetPropertyAst | PostPropertyAst;
    visitMethod(ast: MethodAst, context: ParserAstContext): ItMethodAst | GetMethodAst | PostMethodAst;
}
export declare const visitor: Visitors;
