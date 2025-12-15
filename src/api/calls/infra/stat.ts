import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const statSearchApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/charger/status/list', params);
	},
	breakInsert(params: any) {
		return apiCall.post('/charger/break', params);
	},
	checkInsert(params: any) {
		return apiCall.post('/charger/check', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/statHistory/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/statHistory/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/statHistory/${id}`, { dataStatus: '0' });
	},
};

export const statHistoryApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/', params);
	},
	insert(params: any) {
		return apiCall.post('/station', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/station/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/station/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/station/${id}`, { dataStatus: '0' });
	},
};
