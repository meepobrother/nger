import { NgModuleRef } from './ng_module_ref';
import { Injector, Type } from 'nger-di';
import { NgModuleFactory } from './ng_module_factory';
export declare abstract class NgModuleBootstrap {
    abstract run<T>(moduleRef: NgModuleRef<T>): Promise<any>;
}
export interface BootstrapOptions {
}
export declare class PlatformRef {
    private _injector;
    private _modules;
    private _destroyListeners;
    private _destroyed;
    readonly injector: Injector;
    readonly destroyed: boolean;
    constructor(_injector: Injector);
    bootstrapModule<M>(moduleType: Type<M>, compilerOptions?: BootstrapOptions): Promise<NgModuleRef<M>>;
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>>;
    private _moduleDoBootstrap;
    onDestroy(callback: () => void): void;
    destroy(): void;
}
export declare class CompilerFactory {
    createCompiler(options?: BootstrapOptions[]): Compiler;
}
export declare class Compiler {
    options?: BootstrapOptions[];
    constructor(options?: BootstrapOptions[]);
    compileModuleAsync<M>(moduleType: Type<any>): Promise<NgModuleFactory<M>>;
}
