# `nger-compiler-weapp`

> 编译成小程序


## 

- [ ] NgModuleRef 
  - [ ] injector
  - [ ] instance
  - [ ] componentFactoryResolver 小程序组件工厂提供者
    - [ ] resolveComponentFactory 小程序组件工厂
    - [ ] ComponentFactory 创建小程序组件

### 组件输入 @Input

在微信小程序端的自定义组件中，只有在 `properties` 中指定的属性，才能从父组件传入并接收

```jsx
Component({
  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
         // 属性被改变时执行的函数（可选），也可以写成在 methods 段中定义的方法名字符串, 如：'_propertyChange'
         // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    myProperty2: String // 简化的定义方式
  }
  ...
})
```

而在 nger 中，组件代码中被`@Input`装饰 的属性，会在编译时被识别并加入到编译后的 `properties` 中。

### 组件输出 @Output

```xml
<!-- 当自定义组件触发 myevent 事件时，调用 onMyEvent 方法 -->
<component-tag-name bindmyevent="onMyEvent" />
<!-- 或者可以写成 -->
<component-tag-name bind:myevent="onMyEvent" />
```

### 内容

在小程序端是通过 `<slot />` 来实现往自定义组件中传入元素的，而 nger 利用 `<ng-content></ng-content>` , 被编译成 `<slot />` 标签。

### 自定义指令

在nger中，通过`<ng-template></ng-template>`来实现自定义指令，在小程序中并不支持，需要转换成一些列的if和else模板指令，这部分比较复杂。