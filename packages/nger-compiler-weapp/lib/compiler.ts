
import { ComponentRef, NgModuleRef, PageRef } from 'nger-core';
export interface PageInstance {
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
export interface ComponentInstance {
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
export interface AppInstance {
    onLaunch?: Function;
    onShow?: Function;
    onHide?: Function;
    onError?: Function;
    onPageNotFound?: Function;
}

export class WeappFactory {
    constructor() { }
    createApp<T>(ref: NgModuleRef<T>): AppInstance {
        return {
            onLaunch: () => ref.lifes.ngOnInit(),
            onError: () => ref.lifes.ngOnError(),
            onShow: () => ref.lifes.ngAfterViewInit(),
            onHide: () => ref.lifes.ngOnDestroy(),
            onPageNotFound: () => ref.lifes.ngOnPageNotFound()
        }
    }
    createPage(ref: PageRef<any>): PageInstance {
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
    createComponent(ref: ComponentRef<any>): ComponentInstance {
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
