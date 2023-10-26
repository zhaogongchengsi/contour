import Schema from 'async-validator';
import type { RuleItem } from 'async-validator'

export const name: RuleItem = {
	type: 'string',
	required: true,
	message: '请输入名称'
}

export const account: RuleItem = {
	type: 'string',
	required: true,
	validator(_, value) {
		if (!value) {
			return new Error('账号必填')
		} else if (emailReg.test(value) || phoneReg.test(value)) {
			return true
		}
		return new Error('账号应该为手机号码或者邮箱')
	}
}

export const password: RuleItem = {
	type: 'string',
	required: true,
	message: '请输入密码'
}

export const code: RuleItem = {
	type: 'string',
	required: true,
	message: '请输入验证码'
}

export const descriptor = {
	name,
	account,
	password,
	code
}

export type RuleName = keyof typeof descriptor

export type ValidateErrors = {
	message: string; 
	fieldValue: any; 
	field: RuleName
}

export const createValidate = (...names: RuleName[]) => {

	const validator = new Schema(Object.fromEntries(names.map(name => {
		return [name, descriptor[name]]
	})));

	return (value: any) => {
		return new Promise((resolve, reject) => {
			validator.validate(value, (errors: any, fields: unknown) => {
				if (errors) {
					reject(errors)
				} else {
					resolve(fields)
				}
			});
		})
	}
}