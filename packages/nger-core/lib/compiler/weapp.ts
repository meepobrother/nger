import { ComponentRef, NgModuleRef, PageRef } from './core';
export interface WeappPageInstance {
    data?: any;
    onLoad?(
        query?: { [queryKey: string]: string }
    ): void;
    onShow?(): void;
    onReady?(): void;
    onHide?(): void;
    onUnload?(): void;
    onPullDownRefresh?(): void;
    onReachBottom?(): void;
    onShareAppMessage?(): void;
    onPageScroll?(): void;
    onResize?(): void;
    onTabItemTap?(): void;
}
export interface WeappComponentInstance {
    // 配置
    data?: any;
    properties?: any;
    observers?: any;
    methods?: any;
    behaviors?: string[];
    created?(): void;
    attached?(): void;
    ready?(): void;
    moved?(): void;
    detached?(): void;
    relations?: any;
    externalClasses?: string[];
    options?: any;
    lifetimes?: any;
    pageLifetimes?: any;
    definitionFilter?(): void;
}
export interface WeappAppInstance {
    onLaunch?: Function;
    onShow?: Function;
    onHide?: Function;
    onError?: Function;
    onPageNotFound?: Function;
}
export class WeappFactory {
    createApp<T>(ref: NgModuleRef<T>): WeappAppInstance {
        return {
            onLaunch: () => ref.lifes.ngOnInit(),
            onError: () => ref.lifes.ngOnError(),
            onShow: () => ref.lifes.ngAfterViewInit(),
            onHide: () => ref.lifes.ngOnDestroy(),
            onPageNotFound: () => ref.lifes.ngOnPageNotFound()
        }
    }
    createPage(ref: PageRef<any>): WeappPageInstance {
        return {
            data: ref.getInputs(),
            onLoad: () => ref.lifes.ngOnInit(),
            onShow: () => ref.lifes.ngAfterContentInit(),
            onReady: () => ref.lifes.ngAfterViewInit(),
            // 隐藏是什么鬼
            // onHide: life.ngOnDestroy,
            onUnload: () => ref.lifes.ngOnDestroy()
        }
    }
    createComponent(ref: ComponentRef<any>): WeappComponentInstance {
        return {
            properties: ref.getInputs(),
            // output
            methods: {},
            created: () => ref.lifes.ngOnInit(),
            attached: () => ref.lifes.ngAfterContentInit(),
            ready: () => ref.lifes.ngAfterViewInit(),
            detached: () => ref.lifes.ngOnDestroy(),
            // pipe
            definitionFilter: () => { }
        }
    }
}
