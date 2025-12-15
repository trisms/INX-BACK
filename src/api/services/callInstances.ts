import { BaseApiCall } from '@/api/callInstance/BaseAPICall';

export const noAuthApiCall = new BaseApiCall(false);
export const apiCall = new BaseApiCall();
