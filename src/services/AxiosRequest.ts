/**
 * This file contain the all the Common API type of requests
 * 
 */

import { APIURL } from './ApiEndPoints';
import { axiosInstance } from '../../utils/AxiosInterceptor';
import { AxiosResponse } from 'axios';

// common post request
export function axiosPost<T = unknown>(url: string, request: unknown): Promise<AxiosResponse<T>> {
    const data = { data: request };
    return axiosInstance.post(APIURL + url, data);
}

// common get request
export function axiosGet<T = unknown>(url: string, param?: string): Promise<AxiosResponse<T>> {
    const finalUrl = param ? url.replace("{0}", param) : url;
    return axiosInstance.get(finalUrl);
}
