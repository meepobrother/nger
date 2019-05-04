"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class NgerAlipayHttp {
    async request(config) {
        return new Promise((resolve, reject) => {
            my.request({
                url: config.url,
                data: config.data,
                headers: config.headers,
                method: config.method,
                dataType: 'json',
                success: (res) => resolve({
                    data: res.data,
                    status: res.statusCode,
                    statusText: '200',
                    headers: res.headers,
                    config
                }),
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
    async post(url, data, config) {
        return this.request({
            url,
            method: 'POST',
            ...config
        });
    }
}
exports.NgerAlipayHttp = NgerAlipayHttp;
