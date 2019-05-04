"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nger_core_1 = require("nger-core");
class NgerSwapHttp extends nger_core_1.Http {
    async request(config) {
        return new Promise((resolve, reject) => {
            swan.request({
                url: config.url,
                data: config.data,
                header: config.headers,
                method: config.method,
                dataType: 'json',
                responseType: config.responseType,
                success: (res) => {
                    resolve({
                        data: res.data,
                        status: res.statusCode,
                        statusText: '200',
                        headers: res.header,
                        config: {}
                    });
                },
                fail: (error) => reject(error)
            });
        });
    }
    async get(url, config) {
        return this.request({
            url,
            method: 'GET',
            ...config
        });
    }
    async delete(url, config) {
        return this.request({
            url,
            method: 'DELETE',
            ...config
        });
    }
    async head(url, config) {
        return this.request({
            url,
            method: 'HEAD',
            ...config
        });
    }
    async post(url, data, config) {
        return this.request({
            url,
            method: 'POST',
            ...config
        });
    }
    async put(url, data, config) {
        return this.request({
            url,
            method: 'PUT',
            ...config
        });
    }
    async patch(url, data, config) {
        return this.request({
            url,
            method: 'PATCH',
            ...config
        });
    }
}
exports.NgerSwapHttp = NgerSwapHttp;
