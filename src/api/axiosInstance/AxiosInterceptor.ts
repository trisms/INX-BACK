import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import type AxiosRequestConfigExtends from '@/types/api/AxiosRequestConfigExtends';
import { parseISOStrToyyyyMMddHHmmss } from '@/utils/DateUtils';
import { useAuthStore } from '@/stores/authStore';
import { log } from '@/utils/Logger';

const refreshSubscribers = [] as Function[];

//토큰 재발급 받는 동안의 요청 담기
const addRefreshSubscriber = (callback: Function) => {
	refreshSubscribers.push(callback);
};

const emptySubscribers = () => {
	refreshSubscribers.splice(0, refreshSubscribers.length);
};

//재발급 받은 후 담은 요청 순차적으로 실행
const onTokenRefreshed = (accessToken: string) => {
	refreshSubscribers.map((callback) => callback(accessToken));
};

function convertIsoDates(obj: any) {
	const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/;

	for (const key in obj) {
		const val = obj[key];
		if (isoRegex.test(val) || val instanceof Date) {
			obj[key] = parseISOStrToyyyyMMddHHmmss(val);
		}
	}
}

export function setInterceptors(instance: AxiosInstance, isRequireAuth?: boolean | undefined) {
	//request
	instance.interceptors.request.use(
		(config) => {
			if (isRequireAuth) {
				config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`; //setToken
			}

			log(`[Request]  ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);

			if (config.data) {
				log(`[Request]  Body: ${JSON.stringify(config.data)}`);
				convertIsoDates(config.data);
			}

			if (config.params) {
				log(`[Request]  Param: ${JSON.stringify(config.params)}`);
				convertIsoDates(config.params);
			}

			return config;
		},
		(error) => {
			log(`[Request]  Error: ${JSON.stringify(error)}`);
			return Promise.reject(error);
		},
	);
	//response
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			const { data } = response;
			const { success, code, msg, data: resData } = data;
			const statusData = {
				success,
				code,
				msg,
			};
			log(`[Response] Success Status ${JSON.stringify(statusData)}`);

			if (resData) {
				log(`[Response] Success Data ${JSON.stringify(resData)}`);
			}
			return response;
		},
		async (error) => {
			log(`[Response] Error: ${JSON.stringify(error)}`);
			// 재시도 횟수를 추적하기 위한 변수 설정(__retryCount)
			const {
				config, //request 객체
				response: { status }, //httpStatusCode
			}: { config: AxiosRequestConfigExtends; response: AxiosResponse } = error;

			const originalRequest: AxiosRequestConfigExtends = { ...config };

			//UnAuthorized
			if (status === 401) {
				const backOff = new Promise<void>((resolve): void => {
					setTimeout((): void => {
						resolve();
					}, 1000);
				});

				// config 객체가 존재하지 않거나 retry 옵션이 설정되어 있지 않으면 reject
				if (!config || !config.retries) return Promise.reject(error);

				config.retryCount = config.retryCount || 1;

				// 설정된 재시도 횟수 초과 되었으면 토큰 재발급 시도
				if (config.retryCount >= config.retries) {
					// token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
					// instance.post(`/auth/token`).then((res) => {
					axios
						.post(`${import.meta.env.VITE_APP_API_URL_CODE}/auth/token`)
						.then((res) => {
							const { data } = res;
							const { success, code, msg, data: resData } = data;
							const statusData = {
								success,
								code,
								msg,
							};
							log(`[Response] Success Token Refresh Status ${JSON.stringify(statusData)}`);

							if (resData) {
								log(`[Response] Success Token Refresh Data ${JSON.stringify(resData)}`);
							}
							if (success) {
								localStorage.setItem('accessToken', resData.accessToken);
								instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
								onTokenRefreshed(localStorage.getItem('accessToken'));
							}
						})
						.catch((e: AxiosError) => {
							log(`[Response] Error Refresh Token: ${JSON.stringify(e.response.data)}`);
							type ResData = {
								code: number;
								msg: string;
								success: boolean;
								data: any;
							};

							if ((e.response.data as ResData).success === false) {
								if (e.config.url.includes('/v1/auth/token') || e.config.url.includes('/v1/auth/logout')) {
									window.Swal.fire({
										icon: 'warning',
										text: '토큰이 만료되었습니다. 로그인 화면으로 이동합니다.',
										showCancelButton: false,
										confirmButtonText: '확인',
									}).then(async ({ isConfirmed }) => {
										const authStore = useAuthStore();
										authStore.localLogout();
										location.reload();
									});
								} else {
									window.Swal.fire({
										icon: 'warning',
										text: '토큰이 만료되었습니다. 로그인 화면으로 이동합니다.',
										showCancelButton: false,
										confirmButtonText: '확인',
									}).then(async ({ isConfirmed }) => {
										const authStore = useAuthStore();
										await authStore.logout();
										location.reload();
									});
								}
							}
						});

					return new Promise((resolve) => {
						addRefreshSubscriber((accessToken: string) => {
							if (originalRequest.headers) {
								originalRequest.headers.Authorization = 'Bearer ' + accessToken;
							}
							resolve(instance(originalRequest));
						});
					});
				} else {
					// 요청 횟수 1증가
					config.retryCount += 1;
					//요청 재시도
					return backOff.then(() => {
						return instance.request(config);
					});
				}
				//요청 재시도 함수 생성
			}
			//401이 아닌 모든 에러는 반환
			return Promise.reject(error);
		},
	);
	// interceptor 로직이 들어있는 axios instance 반환
	return instance;
}
