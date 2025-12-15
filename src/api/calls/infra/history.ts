import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const chargingHistoryApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/', params);
	},
	insert(params: any) {
		return apiCall.post('/chargingHistory', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/chargingHistory/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/chargingHistory/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/chargingHistory/${id}`, { dataStatus: '0' });
	},
};
