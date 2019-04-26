import { Component, Input, Output, EventEmitter } from 'nger-core';
declare const h: (...args: any[]) => any;

@Component()
export class DemoReact implements Component {

    @Input() title: string;

    @Output() handleChange: EventEmitter;

    render() {
        return <div></div>
    }
}

@Component()
export class DemoReact2 {
    render() {
        return <DemoReact handleChange={e => this.handleChange(e)} title={`title1`}></DemoReact >
    }
    handleChange(e) { }
}
