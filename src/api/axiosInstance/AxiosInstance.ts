import axios, { type AxiosInstance, type AxiosRequestConfig, type ResponseType, type responseEncoding } from 'axios';
import { setInterceptors } from '@/api/axiosInstance/AxiosInterceptor';

type AxiosOptions = {
	timeout: number;
	responseType: ResponseType;
	responseEncoding: responseEncoding;
	headers?: { Authorization: string };
	retries: number;
	withCredentials: boolean;
};

function createInstance(baseURL: string, options: AxiosOptions, isRequireAuth?: boolean): AxiosInstance {
	const config: AxiosRequestConfig = { baseURL, ...options };
	const instance: AxiosInstance = axios.create(config);
	return setInterceptors(instance, isRequireAuth);
}

const options: AxiosOptions = {
	timeout: 100000,
	responseType: 'json',
	responseEncoding: 'utf8',
	retries: 3,
	withCredentials: true,
};

export const baseInstance: AxiosInstance = createInstance(import.meta.env.VITE_APP_API_URL_CODE, options, true);

export const noAuthInstance: AxiosInstance = createInstance(import.meta.env.VITE_APP_API_URL_CODE, options, false);
