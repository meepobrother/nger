# `nger-store`

> 状态管理, Reactive State for nger

从[ngrx](https://github.com/ngrx/platform)移植过来的


```ts
import { Action } from 'nger-store';
export enum ActionTypes {
  Increment = '[Counter Component] Increment',
  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset',
}
export class Increment implements Action {
  readonly type = ActionTypes.Increment;
}
export class Decrement implements Action {
  readonly type = ActionTypes.Decrement;
}
export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}
```