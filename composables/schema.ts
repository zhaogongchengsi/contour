import { object, string, InferType } from 'yup'

export const userInfoSchema = object({
	name: string().required('名称必填').min(3, '最短3位').max(20,'最长20位'),
	account: string().required('账号必填').email('无效邮箱'),
	password: string().required('密码必填').max(20, '密码最长20位').min(6, '密码最短为6位'),
	id: string().required('验证码id必填').uuid('验证码id无效 (uuid)'),
	code: string().required('验证码必填')
})

export const userEmail = string().required('账号必填').email('无效邮箱')

export const nameSchema = string().required('不准为空').max(20, '最长20位').min(5, '最短为5位')

export type UserInfoScheme = InferType<typeof userInfoSchema>
export type NameScheme = InferType<typeof nameSchema>
export interface verifyInfo<T> {
	success: boolean, value: T, error?: any, message?: string
}

export const isUserInfo = (t: UserInfoScheme): Promise<verifyInfo<UserInfoScheme>> => {
	return new Promise((resolve, reject) => {
		userInfoSchema.validate(t).then((value) => {
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

export const isName = (t: NameScheme): Promise<verifyInfo<NameScheme>> => {
	return new Promise(resolve => {
		nameSchema.validate(t).then((value) => {
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
