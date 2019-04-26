
/// <reference path="./typings/index.d.ts" />
import { TypeContext } from 'ims-decorator';
import { NgModuleMetadataKey, NgModuleClassAst, InputMetadataKey, InputPropertyAst } from 'nger-core';
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

export interface CompilerAppLife {
    ngOnInit: any, ngOnError: any, ngOnDestroy: any, ngAfterViewInit: any, ngOnPageNotFound: any
}
export class Compiler {
    constructor(readonly context: TypeContext) {
    }
    createApp(context: TypeContext): AppInstance {
        const ngModule = context.getClass(NgModuleMetadataKey) as NgModuleClassAst;
        let lifes: CompilerAppLife[] = [];
        ngModule._imports.map(imp => {
            lifes.push(this.getLifeCycle(imp));
        });
        lifes.push(this.getLifeCycle(context));
        return {
            onLaunch: () => lifes.map((life) => life.ngOnInit()),
            onError: () => lifes.map((life) => life.ngOnError()),
            onShow: () => lifes.map((life) => life.ngAfterViewInit()),
            onHide: () => lifes.map((life) => life.ngOnDestroy()),
            onPageNotFound: () => lifes.map((life) => life.ngOnPageNotFound())
        }
    }
    getInputs(context: TypeContext) {
        let res: any = {};
        const { instance } = context;
        const inputs = context.getProperty(InputMetadataKey) as InputPropertyAst[];
        inputs.map(input => {
            const def = input.ast.metadataDef;
            res[def.bindingPropertyName || input.ast.propertyKey] = instance[input.ast.propertyKey];
        });
        return res;
    }
    getLifeCycle(context: TypeContext) {
        const instance = context.instance;
        const { ngOnInit, ngOnError, ngOnDestroy,
            ngOnPageNotFound, ngDoCheck,
            ngAfterContentInit, ngAfterContentChecked,
            ngAfterViewInit, ngAfterViewChecked,
            ngOnChanges
        } = instance;
        return {
            ngOnInit: ngOnInit && ngOnInit.bind(instance),
            ngOnError: ngOnError && ngOnError.bind(instance),
            ngOnDestroy: ngOnDestroy && ngOnDestroy.bind(instance),
            ngAfterViewInit: ngAfterViewInit && ngAfterViewInit.bind(instance),
            ngOnPageNotFound: ngOnPageNotFound && ngOnPageNotFound.bind(instance),
            ngDoCheck: ngDoCheck && ngDoCheck.bind(instance),
            ngAfterContentInit: ngAfterContentInit && ngAfterContentInit.bind(instance),
            ngAfterContentChecked: ngAfterContentChecked && ngAfterContentChecked.bind(instance),
            ngAfterViewChecked: ngAfterViewChecked && ngAfterViewChecked.bind(instance),
            ngOnChanges: ngOnChanges && ngOnChanges.bind(instance),
        }
    }
    createPage(context: TypeContext): PageInstance {
        const life = this.getLifeCycle(context)
        return {
            data: this.getInputs(context),
            onLoad: life.ngOnInit,
            onShow: life.ngAfterContentInit,
            onReady: life.ngAfterViewInit,
            // 隐藏是什么鬼
            // onHide: life.ngOnDestroy,
            onUnload: life.ngOnDestroy
        }
    }
    createComponent(context: TypeContext): ComponentInstance {
        const life = this.getLifeCycle(context)
        const inputs = this.getInputs(context)
        return {
            properties: inputs,
            // output
            methods: {},
            created: life.ngOnInit,
            attached: life.ngAfterContentInit,
            ready: life.ngAfterViewInit,
            detached: life.ngOnDestroy,
            // pipe
            definitionFilter: () => { }
        }
    }
}
