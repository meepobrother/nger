import { InjectionToken } from 'nger-di'
export interface H {
    (): any;
}
export const H = new InjectionToken<H>(`Global`)

