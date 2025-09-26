/**
 * This file contain the all the Common API type of requests
 * 
 */

import { APIURL } from './ApiEndPoints';
import { axiosInstance } from '../../utils/AxiosInterceptor';

// common post request with encryption
export function axiosPost(url, request) {
    var data = { data: request };
    return axiosInstance.post(APIURL + url, data);
}
// common get request
export function axiosGet(url, param) {
    const finalUrl = param ? url.replace("{0}", param) : url;
    return axiosInstance.get(finalUrl);
}
