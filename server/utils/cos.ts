import COS from 'cos-nodejs-sdk-v5'

export function useCos() {

	const { SECRETID, SECRETKEY } = process.env

	// 建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考
	// https://cloud.tencent.com/document/product/598/37140

	return new COS({
		SecretId: SECRETID,
		SecretKey: SECRETKEY,
	});
}

