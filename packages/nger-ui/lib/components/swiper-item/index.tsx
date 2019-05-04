import { Component, Input } from 'nger-core'
import { Element } from '../base'
@Component({
    selector: 'nger-swiper-item'
})
export class SwiperItem extends Element {
    @Input() itemId?: string;
}
