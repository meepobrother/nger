import { AxiosRequestConfig, AxiosPromise } from 'axios'
export abstract class Http {
    abstract request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
    abstract get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    abstract delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    abstract head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    abstract post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    abstract put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    abstract patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}