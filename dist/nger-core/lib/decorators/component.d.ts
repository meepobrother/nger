import { ClassContext, ClassAst } from 'ims-decorator';
export declare const ComponentMetadataKey = "ComponentMetadataKey";
import { DirectiveOptions } from './directive';
import { ViewEncapsulation, ChangeDetectionStrategy } from './types';
import { Provider, Type } from 'nger-di';
export declare type ComponentType = 'app' | 'admin' | 'pc';
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
export declare type ReactDecorator<T = any> = (target: T) => any;
export interface Component {
}
export interface ComponentDecorator {
    new (opt: ComponentOptions): Component;
    <T>(opt: ComponentOptions<T>): ReactDecorator<T>;
}
export declare const Component: ComponentDecorator;
export declare class ComponentClassAst extends ClassContext<ComponentOptions> {
}
export declare function isComponentClassAst(ast: ClassAst): ast is ClassAst<ComponentOptions>;
