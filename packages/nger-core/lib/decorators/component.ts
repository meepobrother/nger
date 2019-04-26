import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const ComponentMetadataKey = 'ComponentMetadataKey';
import { DirectiveOptions } from './directive'
import { ViewEncapsulation, ChangeDetectionStrategy } from './types'
import { Provider, Type } from 'nger-di'
export interface ComponentOptions extends DirectiveOptions {
    changeDetection?: ChangeDetectionStrategy;
    viewProviders?: Provider[];
    moduleId?: string;
    templateUrl?: string;
    template?: string;
    styleUrls?: string[];
    styles?: string[];
    animations?: any[];
    encapsulation?: ViewEncapsulation;
    interpolation?: [string, string];
    entryComponents?: Array<Type<any> | any[]>;
    preserveWhitespaces?: boolean;
}
export const Component = makeDecorator<ComponentOptions>(ComponentMetadataKey);
export class ComponentClassAst extends ClassContext<ComponentOptions> { }
export function isComponentClassAst(ast: ClassAst): ast is ClassAst<ComponentOptions> {
    return ast.metadataKey === ComponentMetadataKey;
}
export interface Component { }