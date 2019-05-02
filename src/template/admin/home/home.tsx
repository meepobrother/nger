import { Input, Component, OnChanges } from 'nger-core'
import { h } from 'preact';
@Component({
    selector: `app-root`,
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss'],
    render: (that: HomePage) => {
        return <div>{that.title}</div>
    }
})
export class HomePage implements OnChanges {
    constructor() {
        let i = 0;
        setInterval(() => {
            i = i + 1;
            this.title = `home page ${i}`
        }, 1000)
    }

    @Input()
    title: string = 'home page';

    ngOnInit() { }

    ngOnChanges(changes) {
    }
}
