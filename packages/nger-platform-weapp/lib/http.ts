import { Http } from 'nger-core'
import { AxiosRequestConfig, AxiosResponse } from 'axios';
// todo
declare const wx: any;
export class NgerWeappHttp extends Http {
    async request<T = any>(config: AxiosRequestConfig) {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            wx.request({
                url: config.url,
                data: config.data,
                header: config.headers,
                method: config.method,
                dataType: 'json',
                responseType: config.responseType,
                success: (res: any) => {
                    resolve({
                        data: res.data,
                        status: res.statusCode,
                        statusText: '200',
                        headers: res.header,
                        config: {}
                    })
                },
                fail: () => {
                    reject()
                },
                complete: () => {
                    console.log('complete')
                }
            })
        });
    }
    async get<T = any>(url: string, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'GET',
            ...config
        })
    }
    async delete(url: string, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'DELETE',
            ...config
        })
    }
    async head(url: string, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'HEAD',
            ...config
        })
    }
    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'POST',
            ...config
        })
    }
    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'PUT',
            ...config
        })
    }
    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request({
            url,
            method: 'PATCH',
            ...config
        })
    }
}