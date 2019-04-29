import { Directive, OnDestroy, OnInit, ComponentRef } from 'nger-core';
import { Store, select } from 'nger-store';
@Directive({
    selector: `router-outlet`,
    exportAs: 'outlet'
})
export class RouterOutlet implements OnDestroy, OnInit {
    // 当前激活的组件
    private activated: ComponentRef<any> | null = null;
    constructor(private store: Store<any>) {
        this.store.select(
            select('nger-router')
        ).subscribe(res => {

        });
    }
    ngOnInit() {
        this.store.dispatch({
            type: ``,
            payload: {}
        })
    }
    ngOnDestroy() { }
    get component(): object {
        if (!this.activated) throw new Error('Outlet is not activated');
        return this.activated.instance;
    }
}
