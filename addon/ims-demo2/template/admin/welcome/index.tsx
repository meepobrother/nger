import { Page } from 'nger-core';

@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ],
    templateUrl: './index.html'
})
export class ImsDemo2AdminWelcomePage {
    items: any[] = [{}, {}, {}]
    dataId: string = `testId`
    id: string = `demoId`
    disabled: boolean = false;
    divClass: string = `div-class`;
    isActive: boolean = true;
    bgColor: string = `red`;

    demo: string = `demo content`
    constructor() { }
}

