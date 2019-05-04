import { Http } from 'nger-core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class NgerSwapHttp extends Http {
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}
