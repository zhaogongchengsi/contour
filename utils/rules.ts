export const account = [
	{
		required: true,
		validator(rule: FormItemRule, value: string) {
				if (!value) {
					return new Error('账号必填')
				} else if (emailReg.test(value) || phoneReg.test(value)) {
					return true
				}
				return new Error('账号应该为手机号码或者邮箱')
		}
	}
]

export const password = [
	{
		required: true,
		message: '请输入密码'
	}
]

export const code = [
	{
		required: true,
		message: '请输入验证码'
	}
]
