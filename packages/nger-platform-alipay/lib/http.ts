declare const my: any;

export interface AlipayHttpOptions {
    url?: string;
    method?: string;
    headers?: any;
    data?: any;
    timeout?: number;
    dataType?: string
};

export interface AlipayHttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config?: any;
}

export class NgerAlipayHttp {
    async request<T = any>(config: AlipayHttpOptions) {
        return new Promise<AlipayHttpResponse<T>>((resolve, reject) => {
            my.request({
                url: config.url,
                data: config.data,
                headers: config.headers,
                method: config.method,
                dataType: 'json',
                success: (res: any) => resolve({
                    data: res.data,
                    status: res.statusCode,
                    statusText: '200',
                    headers: res.headers,
                    config
                }),
                fail: (error: any) => reject(error)
            })
        });
    }
    async get<T = any>(url: string, config?: AlipayHttpOptions) {
        return this.request({
            url,
            method: 'GET',
            ...config
        })
    }
    async post<T = any>(url: string, data?: any, config?: AlipayHttpOptions) {
        return this.request({
            url,
            method: 'POST',
            ...config
        })
    }
}