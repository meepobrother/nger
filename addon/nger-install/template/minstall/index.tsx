import { Page } from 'nger-core';
import { View, Swiper, SwiperItem } from 'nger-ui';

@Page({
    path: '/app/install',
    title: 'nger系统安装',
    type: ['app']
})
export class NgerInstallPage {
    title: string;
    show: boolean;
    items: { title: string }[] = [];
    render() {
        return <View
            style={{ height: '10px', width: '100px' }}
        >
            <Swiper className="">
                {this.items.map(itme => <SwiperItem>{itme.title}</SwiperItem>)}
            </Swiper>
        </View>
    }
}
