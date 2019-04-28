export abstract class Injector {

    create() { }
}
export class ErrorInjector extends Injector { }
export class NullInjector extends Injector { }

export const errorInjector = new ErrorInjector();
export const nullInjector = errorInjector.create();

// 多个NgModule同时运行
