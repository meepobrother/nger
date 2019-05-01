
import { Http } from 'nger-core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

declare const swan: any;

export class NgerSwapHttp extends Http {
    async request<T = any>(config: AxiosRequestConfig) {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            swan.request({
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
                fail: (error:any) => reject(error)
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