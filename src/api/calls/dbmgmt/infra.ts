import { apiCall } from '@/api/services';
import type { List } from '@/types/common/list/List';

export const infoApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/chargers', params);
	},
	insert(params: any) {
		return apiCall.post('/charge-stations', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/chargers/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/chargers/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/chargers/${id}`, { dataStatus: '0' });
	},
};

export const chargerApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/charger', params);
	},
	searchStation<T>(params: any) {
		return apiCall.get<List<T>>('/charge-stations/search/name', params);
	},
	searchCharger<T>(params: any) {
		return apiCall.get<List<T>>('/charger/search/name', params);
	},
	insert(params: any) {
		return apiCall.post('/charger', params);
	},
	detail(id: number | string, type: number | string) {
		//type = 1 info
		//type = 2 conn-info
		let updatePath = `/charger/${id}`;
		if (type === 1) {
			updatePath = `/charger/${id}`;
		} else if (type === 2) {
			updatePath = `/charger/conn-infos/${id}`;
		}
		return apiCall.get(updatePath);

		/*return apiCall.get(`/chargers/${id}`);*/
	},
	update(id: number | string, params: any, type: number | string) {
		//type = 1 info
		//type = 2 conn-info

		let updatePath = `/charger/${id}`;
		if (type === 1) {
			updatePath = `/charger/${id}`;
			return apiCall.put(updatePath, params);
		} else if (type === 2) {
			updatePath = `/charger/conn-infos/${id}`;
			return apiCall.post(updatePath, params);
		}

		/*return apiCall.put(`/chargers/${id}`, params);*/
	},
	delete(id: number | string) {
		return apiCall.patch(`/chargers/${id}`, { dataStatus: '0' });
	},
};

export const licenseApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/charge-stations/site/license/end', params);
	},
};

export const stationApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/charge-stations', params);
	},
	insert(params: any) {
		return apiCall.post('/charge-stations', params);
	},
	detail(id: number | string, type: number | string) {
		//type = 1 info
		//type = 2 manager
		//type = 3 site
		//type = 4 kepco

		let updatePath = `/charge-stations/${id}`;
		if (type === 1) {
			updatePath = `/charge-stations/${id}`;
		} else if (type === 2) {
			updatePath = `/charge-stations/manager/${id}`;
		} else if (type === 3) {
			updatePath = `/charge-stations/site/${id}`;
		} else if (type === 4) {
			updatePath = `/charge-stations/kepcoInfos/${id}`;
		}
		return apiCall.get(updatePath);
	},
	update(id: number | string, params: any, type) {
		//type = 1 info
		//type = 2 manager
		//type = 3 site
		//type = 4 kepco

		let updatePath = `/charge-stations/${id}`;
		if (type === 1) {
			updatePath = `/charge-stations/${id}`;
			return apiCall.put(updatePath, params);
		} else if (type === 2) {
			updatePath = `/charge-stations/manager/${id}`;
			return apiCall.post(updatePath, params);
		} else if (type === 3) {
			updatePath = `/charge-stations/site/${id}`;
			return apiCall.post(updatePath, params);
		} else if (type === 4) {
			updatePath = `/charge-stations/kepcoInfos/${id}`;
			return apiCall.post(updatePath, params);
		}
	},

	/*delete(id: number | string) {
		return apiCall.patch(`/station/${id}`, { dataStatus: '0' });
	},*/
};

export const totalApi = {
	list<T>(params: any) {
		return apiCall.get<List<T>>('/total', params);
	},
	insert(params: any) {
		return apiCall.post('/total', params);
	},
	detail(id: number | string) {
		return apiCall.get(`/total/${id}`);
	},
	update(id: number | string, params: any) {
		return apiCall.put(`/total/${id}`, params);
	},
	delete(id: number | string) {
		return apiCall.patch(`/total/${id}`, { dataStatus: '0' });
	},
};
