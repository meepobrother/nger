import { Element } from '../base';
export declare class Swiper extends Element {
    indicatorDots?: boolean;
    indicatorColor?: string;
    indicatorActiveColor?: string;
    autoplay?: boolean;
    current?: number;
    interval?: number;
    duration?: number;
    circular?: boolean;
    vertical?: boolean;
    previousMargin?: string;
    nextMargin?: string;
    displayMultipleItems?: number;
    skipHiddenItemLayout?: boolean;
    easingFunction?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
    change?: (e: Event) => void;
    transition?: (e: Event) => void;
    animationfinish?: (e: Event) => void;
}
