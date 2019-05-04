import { Component, Input, Output } from 'nger-core'
import { Element } from '../base'

@Component({
    selector: 'nger-swiper'
})
export class Swiper extends Element {
    @Input() indicatorDots?: boolean;
    @Input() indicatorColor?: string;
    @Input() indicatorActiveColor?: string;
    @Input() autoplay?: boolean;
    @Input() current?: number;
    @Input() interval?: number;
    @Input() duration?: number;
    @Input() circular?: boolean;
    @Input() vertical?: boolean;
    @Input() previousMargin?: string;
    @Input() nextMargin?: string;
    @Input() displayMultipleItems?: number;
    @Input() skipHiddenItemLayout?: boolean;
    @Input() easingFunction?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';

    @Output() change?: (e: Event) => void;
    @Output() transition?: (e: Event) => void;
    @Output() animationfinish?: (e: Event) => void;
}
