export const ResCode = {
	DEFAULT: {
		OK: {
			code: '0000',
			desc: '성공',
		},
		INTERFACE_ERROR: {
			code: '0001',
			desc: '전문오류',
		},
		FAILED: {
			code: '0002',
			desc: '실패',
		},
		NOT_OK: {
			code: '0003',
			desc: '미완료',
		},
		ACCEPT_FAILED: {
			code: '0006',
			desc: '연결오류',
		},
		AUTH_FAILED: {
			code: '9001',
			desc: '인증오류',
		},
		CONNECT_FAILED: {
			code: '9002',
			desc: '접속오류',
		},
		SYSTEM_ERROR: {
			code: '9999',
			desc: '시스템에러',
		},
	},
};

export const ResCodeArr = [
	{
		code: '0000',
		desc: '성공',
	},
	{
		code: '0001',
		desc: '전문오류',
	},
	{
		code: '0002',
		desc: '실패',
	},
	{
		code: '0003',
		desc: '미완료',
	},
	{
		code: '0006',
		desc: '연결오류',
	},
	{
		code: '9001',
		desc: '인증오류',
	},
	{
		code: '9002',
		desc: '접속오류',
	},
	{
		code: '9999',
		desc: '시스템에러',
	},
];

export const membershipResCodeArr = [
	{
		code: '0000',
		desc: '성공',
	},
	{
		code: '0001',
		desc: '요청 인자 에러',
	},
	{
		code: '0002',
		desc: '실패',
	},
	{
		code: '0003',
		desc: '기처리완료',
	},
	{
		code: '0004',
		desc: '인증오류',
	},
	{
		code: '0005',
		desc: '주문상태 불명',
	},
	{
		code: '0006',
		desc: '접속실패',
	},
	{
		code: '9999',
		desc: '시스템에러',
	},
];
