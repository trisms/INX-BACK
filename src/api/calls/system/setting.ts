import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const settingSearchApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/', params);
	},
	insert(params: any) {
		return apiCall.post('/statHistory', params);
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
