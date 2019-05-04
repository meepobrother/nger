import { ApplicationRef } from './application_ref';
import { Injector } from 'nger-di';
import { NgModuleRef } from './ng_module_ref';
import { ComponentRef } from './component_ref';
import { ComponentFactory } from './component_factory';
export declare abstract class ChangeDetectorRef {
    abstract markForCheck(): void;
    abstract detach(): void;
    abstract detectChanges(): void;
    abstract checkNoChanges(): void;
    abstract reattach(): void;
}
export declare abstract class ViewRef extends ChangeDetectorRef {
    abstract destroy(): void;
    abstract readonly destroyed: boolean;
    abstract onDestroy(callback: Function): any /** TODO #9100 */;
}
/** 挂载 */
export declare abstract class EmbeddedViewRef<C> extends ViewRef {
    abstract readonly context: C;
    abstract readonly rootNodes: any[];
}
export interface InternalViewRef extends ViewRef {
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
}
export declare class ElementRef<T = any> {
    nativeElement: T;
    constructor(nativeElement: T);
}
/**
 * ng-template
 */
export declare abstract class TemplateRef<C> {
    abstract readonly elementRef: ElementRef;
    abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}
export declare abstract class ViewContainerRef {
    abstract readonly element: ElementRef;
    abstract readonly injector: Injector;
    abstract readonly parentInjector: Injector;
    abstract clear(): void;
    abstract get(index: number): ViewRef | null;
    abstract readonly length: number;
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
    abstract createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
    abstract insert(viewRef: ViewRef, index?: number): ViewRef;
    abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;
    abstract indexOf(viewRef: ViewRef): number;
    abstract remove(index?: number): void;
    abstract detach(index?: number): ViewRef | null;
}
import { Subject } from 'rxjs';
export declare class DefaultChangeDetectorRef extends ChangeDetectorRef {
    subject: Subject<any>;
    constructor(subject: Subject<any>);
    markForCheck(): void;
    detach(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    reattach(): void;
}
