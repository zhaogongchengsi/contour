import { object, string, InferType } from 'yup'

export const userInfoScheme = object({
	account: string().required('账号必填'),
	password: string().max(20, '密码最长20位').min(6, '密码最短为6位').required('密码必填'),
	id: string().uuid('验证码id无效 (uuid)').required('验证码id必填'),
	code: string().required('验证码必填')
})

export type UserInfoScheme = InferType<typeof userInfoScheme>

export const isUserInfo = (t: UserInfoScheme): Promise<{ success: boolean, value: UserInfoScheme, error?: any, message?: string }> => {
	return new Promise((resolve, reject) => {
		userInfoScheme.validate(t).then((value) => {
			resolve({
				success: true,
				value
			})
		}).catch((err: any) => {
			resolve({
				success: false,
				value: t,
				error: err,
				message: err.errors.join(',')
			})
		})
	})
}