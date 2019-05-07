"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChangeDetectorRef {
}
exports.ChangeDetectorRef = ChangeDetectorRef;
class ViewRef extends ChangeDetectorRef {
}
exports.ViewRef = ViewRef;
/** 挂载 */
class EmbeddedViewRef extends ViewRef {
}
exports.EmbeddedViewRef = EmbeddedViewRef;
class ElementRef {
    constructor(nativeElement) { this.nativeElement = nativeElement; }
}
exports.ElementRef = ElementRef;
/**
 * ng-template
 */
class TemplateRef {
}
exports.TemplateRef = TemplateRef;
// 这个是一个ViewContainerRef
class ViewContainerRef {
}
exports.ViewContainerRef = ViewContainerRef;
class DefaultChangeDetectorRef extends ChangeDetectorRef {
    constructor(subject) {
        super();
        this.subject = subject;
    }
    next(that) {
        this.subject.next(that);
    }
}
exports.DefaultChangeDetectorRef = DefaultChangeDetectorRef;
