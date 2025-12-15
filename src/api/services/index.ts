import { noAuthApiCall as noAuthApi, apiCall as authAPI } from '@/api/services/callInstances';

export function getNoAuthApiCall() {
	return noAuthApi;
}
export function getApiCall() {
	return authAPI;
}

export const apiCall = getApiCall();
