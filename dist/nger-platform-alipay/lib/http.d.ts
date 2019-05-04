export interface AlipayHttpOptions {
    url?: string;
    method?: string;
    headers?: any;
    data?: any;
    timeout?: number;
    dataType?: string;
}
export interface AlipayHttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config?: any;
}
export declare class NgerAlipayHttp {
    request<T = any>(config: AlipayHttpOptions): Promise<AlipayHttpResponse<T>>;
    get<T = any>(url: string, config?: AlipayHttpOptions): Promise<AlipayHttpResponse<any>>;
    post<T = any>(url: string, data?: any, config?: AlipayHttpOptions): Promise<AlipayHttpResponse<any>>;
}
