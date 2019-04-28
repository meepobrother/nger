import { NgModule } from 'nger-core'
// import { HomePage } from './template/admin/home/home';

/** Pc端 */
// @NgModule({
//     declarations: [
//         HomePage
//     ]
// })
// export default class NgerAdmin { }

const domRoot = document.getElementById('app');
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

if ((module as any).hot) {
    (module as any).hot.accept()
}