# `nger-rx-dom`

> 基于rx的dom系统

component->subject->attribute

- [] 组件input变更，通知dom属性或内容变更
- [] 属性或内容变更，通知component变更

### text node
```ts
@Component({
    selector: `nger-demo`,
    // (that: NgerDemoComponent)=>h(that.title)
    template: `{{title}}`
})
export class NgerDemoComponent{
    static template = ()=>h();
    title: string;
    constructor(public elementRef: ElementRef){}
}
```
## divNode
```ts
@Component({
    selector: `nger-demo`,
    template: `{{title}}`
})
export class NgerDemoComponent{
    title: Subject = new Subject();
    constructor(public elementRef: ElementRef){
        this.title.subscribe(res=>{
            this.elementRef.nativeElement.text = res;
        })
    }
}
```