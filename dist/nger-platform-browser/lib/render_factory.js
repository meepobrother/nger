"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
const render_1 = require("./render");
class NgerBrowserRenderFactory extends nger_core_1.NgerRenderFactory {
    create(instance) {
        return new render_1.BrowserRender(instance);
    }
}
exports.NgerBrowserRenderFactory = NgerBrowserRenderFactory;
