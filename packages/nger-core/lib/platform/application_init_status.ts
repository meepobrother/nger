
import { isPromise } from './lang';
import { Inject, Injectable, Optional } from 'nger-core';
import { InjectionToken } from 'nger-di';
export const APP_INITIALIZER = new InjectionToken<Array<() => void>>('Application Initializer');
@Injectable()
export class ApplicationInitStatus {
  // TODO(issue/24571): remove '!'.
  private resolve !: Function;
  // TODO(issue/24571): remove '!'.
  private reject !: Function;
  private initialized = false;
  public readonly donePromise: Promise<any>;
  public readonly done = false;

  constructor(@Inject(APP_INITIALIZER) @Optional() private appInits: (() => any)[]) {
    this.donePromise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }

  /** @internal */
  runInitializers() {
    if (this.initialized) {
      return;
    }
    const asyncInitPromises: Promise<any>[] = [];
    const complete = () => {
      (this as { done: boolean }).done = true;
      this.resolve();
    };
    if (this.appInits) {
      for (let i = 0; i < this.appInits.length; i++) {
        const initResult = this.appInits[i]();
        if (isPromise(initResult)) {
          asyncInitPromises.push(initResult);
        }
      }
    }
    Promise.all(asyncInitPromises).then(() => { complete(); }).catch(e => { this.reject(e); });
    if (asyncInitPromises.length === 0) {
      complete();
    }
    this.initialized = true;
  }
}
