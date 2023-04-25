import axios from "axios";
import { globalConfig } from "./global-config";
import { storageData } from "./storage-data"

const baseURL = globalConfig.domain ? `http${globalConfig.https ? 's' : ''}://${globalConfig.domain}` : '';

const service = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 5000,
    headers: {},
});


//请求拦截器
service.interceptors.request.use((config) => {
    Object.assign(config.headers, { Authorization: `Bearer ${storageData.get('token')}` });
    return config;
}), (error) => {
    return Promise.reject(error);
}

//响应拦截器
service.interceptors.response.use((res) => {
    return Promise.resolve(res);
}, (error) => {
    return Promise.reject(error);
});

export default service;