import { Page } from 'nger-core';
import { View } from 'nger-ui';
@Page({
    path: '/admin/welcome',
    styleUrls: [
        "./index.scss"
    ]
})
export class NgerDemoAppWelcomePage {
    render(h: any) {
        return <View className="nger-demo">
            <div></div>
        </View>
    }
}
