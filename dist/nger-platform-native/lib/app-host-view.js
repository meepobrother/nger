"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_view_1 = require("tns-core-modules/ui/content-view");
const grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
const proxy_view_container_1 = require("tns-core-modules/ui/proxy-view-container");
class AppHostView extends content_view_1.ContentView {
    get ngAppRoot() {
        return this._ngAppRoot;
    }
    set ngAppRoot(value) {
        this._ngAppRoot = value;
    }
    get content() {
        return this._content;
    }
    set content(value) {
        if (this._content) {
            this._content.parentNode = undefined;
        }
        this._content = value;
        if (value) {
            this._content.parentNode = this;
        }
        this.ngAppRoot = value;
        if (this._content instanceof proxy_view_container_1.ProxyViewContainer) {
            const grid = new grid_layout_1.GridLayout();
            grid.addChild(this._content);
            this.ngAppRoot = grid;
        }
    }
}
exports.AppHostView = AppHostView;
