import { Directive, OnDestroy, OnInit, PageRef } from 'nger-core';
@Directive({
    selector: `router-outlet`,
    exportAs: 'outlet'
})
export class RouterOutlet implements OnDestroy, OnInit {
    // 当前激活的组件
    private activated: PageRef<any> | null = null;
    ngOnInit() { }
    ngOnDestroy() { }
    get component(): object {
        if (!this.activated) throw new Error('Outlet is not activated');
        return this.activated.instance;
    }
}
