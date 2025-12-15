import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

const createApi = (prefix: string) => ({
	list: <T>(params: any) => apiCall.get<List<T>>(`${prefix}/list`, params),
	insert: (params: any) => apiCall.post(prefix, params),
	detail: (id: number | string) => apiCall.get(`${prefix}/${id}`),
	update: (id: number | string, params: any) => apiCall.put(`${prefix}/${id}`, params),
	delete: (id: number | string) => apiCall.patch(`${prefix}/${id}`, { dataStatus: '0' }),
});

export const failureApi = createApi('/charger/break');
export const inspectApi = createApi('/charger/check');
export const planStopApi = {
	...createApi('/charger/planned-stop'),
	delete: (id: number | string) => apiCall.delete(`/charger/planned-stop/${id}`),
};
export const reportApi = createApi('/charger/break/report');
export const infoFailureAPi = createApi('/infoFailure');
