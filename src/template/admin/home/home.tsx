import { Input, Component, OnChanges, ChangeDetectorRef } from 'nger-core'
import { h } from 'preact';
import { Injector } from 'nger-di';
@Component({
    selector: `app-root`,
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss'],
    render: (that: HomePage) => {
        return <div>
            <h2 className="title">{that.title}</h2>
            <input type="text" onChange={(e) => that.setTitle(e.target.value)} />
        </div>
    }
})
export class HomePage implements OnChanges {

    constructor(public change: ChangeDetectorRef, public injector: Injector) { }

    setTitle(e: any) {
        this.title = e;
    }

    @Input()
    title: string = 'home page';

    ngOnInit() { }

    ngOnChanges(changes) {
    }
}
