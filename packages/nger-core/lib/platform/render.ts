import { Injector } from 'nger-di'
import { ComponentFactoryResolver } from './component_factory_resolver';
import { pluck, distinctUntilChanged } from 'rxjs/operators'
import { ElementRef } from './change_detector_ref';
export function h(tag: any, inputs: any, ...children: any[]) {
    return (injector: Injector) => {
        if (typeof tag === 'string') {
            
        } else {
            const resolver = injector.get(ComponentFactoryResolver);
            const factory = resolver.resolveComponentFactory(tag);
            const ref = factory.create(injector);
            ref.props.next(inputs);
            const elementRef = injector.get<ElementRef<HTMLElement>>(ElementRef)
            factory.inputs.map(input => {
                ref.props.pipe(pluck(input.templateName), distinctUntilChanged()).subscribe(res => {
                    elementRef.nativeElement.setAttribute(input.propName, res)
                });
            });
        }
    }
}