import { makeDecorator, ClassContext, ClassAst, TypeDecorator } from 'ims-decorator';
export const ComponentMetadataKey = 'ComponentMetadataKey';
import { DirectiveOptions } from './directive'
import { ViewEncapsulation, ChangeDetectionStrategy } from './types'
import { Provider, Type } from 'nger-di'
export type ComponentType = 'app' | 'admin' | 'pc';
export interface ComponentOptions<T = any> extends DirectiveOptions {
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
    type?: ComponentType[];
}
// P 是props
// S 是state
export type ReactDecorator<T = any> = (target: T) => any;
export interface Component { }
export interface ComponentDecorator {
    new(opt: ComponentOptions): Component;
    <T>(opt: ComponentOptions<T>): ReactDecorator<T>;
}
export const Component: ComponentDecorator = makeDecorator<ComponentOptions>(ComponentMetadataKey);
export class ComponentClassAst extends ClassContext<ComponentOptions> { }
export function isComponentClassAst(ast: ClassAst): ast is ClassAst<ComponentOptions> {
    return ast.metadataKey === ComponentMetadataKey;
}
