import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const chargerModelApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/chargerModel', params);
	},
	insert(params: any) {
		return apiCall.post('/chargerModel', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/chargerModel/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/chargerModel/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/chargerModel/${id}`, { dataStatus: '0' });
	},
};

export const stationModelApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/stationModel', params);
	},
	insert(params: any) {
		return apiCall.post('/stationModel', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/stationModel/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/stationModel/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/stationModel/${id}`, { dataStatus: '0' });
	},
};
