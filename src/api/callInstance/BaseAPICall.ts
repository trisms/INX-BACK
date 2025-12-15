import { AxiosError, type AxiosInstance, type AxiosResponse, type CancelToken } from 'axios';
import { baseInstance as axiosInstance, noAuthInstance } from '@/api/axiosInstance/AxiosInstance';
import { delCancelToken, storeCancelToken } from '@/utils/api/CancelTokenUtils';

export class BaseApiCall {
	instance: AxiosInstance;
	constructor(isReqAuth: boolean = true) {
		this.instance = isReqAuth ? axiosInstance : noAuthInstance;
	}

	successCallback<T>(response: AxiosResponse<T>): AxiosResponse<T> {
		return response;
	}

	catchCallback(error: AxiosError): AxiosError {
		return error;
	}

	async get<T>(url: string, params?: any): Promise<AxiosResponse<T> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		return await this.instance
			.get<T>(url, {
				params,
				cancelToken: token,
			})
			.then((response: AxiosResponse<T>) => this.successCallback(response))
			.catch((error: AxiosError) => this.catchCallback(error))
			.finally(() => delCancelToken(key));
	}

	async post<T>(url: string, data: any): Promise<AxiosResponse<T, any> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		try {
			return await this.instance.post(url, data, {
				cancelToken: token,
			});
		} catch (e: AxiosError<any> | any) {
			return e;
		} finally {
			delCancelToken(key);
		}
	}

	async postForm<T>(url: string, data: any): Promise<AxiosResponse<T> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		return await this.instance
			.postForm(url, data, { cancelToken: token })
			.then((response: AxiosResponse<T | any>) => this.successCallback(response))
			.catch((error: AxiosError) => this.catchCallback(error))
			.finally(() => delCancelToken(key));
	}

	async put<T>(url: string, data: any, params?: any): Promise<AxiosResponse<T> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		return await this.instance
			.put(url, data, {
				params: params,
				cancelToken: token,
			})
			.then((response: AxiosResponse<T | any>) => this.successCallback(response))
			.catch((error: AxiosError) => this.catchCallback(error))
			.finally(() => delCancelToken(key));
	}

	async patch<T>(url: string, data: any, params?: any): Promise<AxiosResponse<T> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		return await this.instance
			.patch(url, data, {
				params: params,
				cancelToken: token,
			})
			.then((response: AxiosResponse<T | any>) => this.successCallback(response))
			.catch((error: AxiosError) => this.catchCallback(error))
			.finally(() => delCancelToken(key));
	}

	async delete<T>(url: string, data?: any, params?: any): Promise<AxiosResponse<T> | AxiosError> {
		const { key, token }: { key: number; token: CancelToken } = storeCancelToken();

		return this.instance
			.delete(url, {
				data: data,
				params: params,
				cancelToken: token,
			})
			.then((response: AxiosResponse<T | any>) => this.successCallback(response))
			.catch((error: AxiosError) => this.catchCallback(error))
			.finally(() => delCancelToken(key));
	}
	/*
	/!**
	 *  Async Axis Call
	 * @param url
	 * @param method
	 * @param param
	 * @param data
	 * @param responseType
	 * @returns {Promise<AxiosResponse<any>>}
	 *!/
	async callAPI(url, method, param, data, responseType) {
		return await axiosInstance({
			url: url,
			params: param,
			method: method,
			data: data,
			responseType: responseType,
		})
			.then((response) => this.successCallback(response))
			.catch((error) => this.catchCallback(error));
	}

	/!**
	 * stream Axios Call
	 * @param url
	 * @param method
	 * @param param
	 * @param data
	 * @param path
	 * @returns {Promise<AxiosResponse<any>>} writer :Fs.createWriteStream(path)
	 *!/
	async stream(url, method, param, data, path) {
		return await axiosInstance({
			url: url,
			params: param,
			method: method,
			data: data,
			responseType: 'stream',
		})
			.then(function (response) {
				// eslint-disable-next-line no-undef
				const writer = fs.createWriteStream(path);
				response.data.pipe(writer);
				return writer;
			})
			.catch((error) => this.catchCallback(error));
	}

	/!**
	 * async Axios concurrency call
	 * helper function is (all and spread)
	 *!/
	// eslint-disable-next-line no-unused-vars
	async all(...callAxios) {
		return await axios
			.all(callAxios)
			.then(
				// eslint-disable-next-line no-unused-vars
				axios.spread(function (acct, perms) {
					// Both requests are now complete
				}),
			)
			.catch((error) => {
				return error.response;
			});
	}*/
}

// export default new BaseApiCall();
