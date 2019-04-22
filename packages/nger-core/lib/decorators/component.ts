import { makeDecorator, ClassContext, ClassAst } from 'ims-decorator';
export const ComponentMetadataKey = 'ComponentMetadataKey';
import { DirectiveOptions } from './directive'
import { Provider, Type, ViewEncapsulation, ChangeDetectionStrategy } from './types'

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
