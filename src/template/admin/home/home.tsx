import { Input, Component, OnChanges } from 'nger-core'
@Component({
    selector: `app-root`,
    templateUrl: `./home.html`,
    styleUrls: ['./home.scss'],
    fileName: __dirname
})
export class HomePage implements OnChanges {
    constructor() { }

    @Input()
    title: string = 'home page';

    render() {
        const props = {
            tt: true
        }
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
    }
}
