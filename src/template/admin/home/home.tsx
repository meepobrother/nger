import { Input, Component, OnChanges, ChangeDetectorRef } from 'nger-core'
import { h } from 'preact';
import { Injector } from 'nger-di';
@Component({
    selector: `app-root`,
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss'],
    render: (that: HomePage) => {
        return <div>{that.title}</div>
    }
})
export class HomePage implements OnChanges {
    constructor(public change: ChangeDetectorRef, public injector: Injector) {
        let i = 0;
        console.log(injector)
        const def = injector.get(ChangeDetectorRef)
        setInterval(() => {
            i = i + 1;
            this.title = `home page ${i}`
            def.markForCheck();
            console.log(this.title)
        }, 1000)
    }

    @Input()
    title: string = 'home page';

    ngOnInit() { }

    ngOnChanges(changes) {
    }
}
