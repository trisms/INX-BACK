import { getNoAuthApiCall, getApiCall } from '@/api/services';

class AuthAPI {
	async userLogin(params: any) {
		return await getNoAuthApiCall().post('/auth/login', params);
	}
	async updateInfo(params: any) {
		return await getApiCall().put('/admin/accounts', params);
	}
	async userLogout() {
		return await getApiCall().delete('/auth/logout');
	}
}

export default new AuthAPI();
