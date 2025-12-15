import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const adminSearchApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/admin/accounts', params);
	},
	insert(params: any) {
		return apiCall.post('/admin/accounts', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/admin/accounts/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/admin/accounts/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/statHistory/${id}`, { dataStatus: '0' });
	},
};
