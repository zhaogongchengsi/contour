import { useFetch, isClient } from '@vueuse/core'
import { UploadInfo } from '~/types'

export const loginApi = (body: UserInfoScheme) => $fetch<AppResponse<AppUserResponse>>('/api/login', { method: 'post', body: body })
export const registerApi = (body: UserInfoScheme, name?: string) => $fetch<AppResponse<UserInfoScheme>>('/api/register', { method: 'post', body: body, params: { name } })

export const removeFileApi = (name: string, key: string) => $fetch<AppResponse<UploadInfo>>('/api/file/remove', { method: 'get', query: { name, key } })


export const noteSave = (body: { name: string; [key: string]: any }) => $fetch<AppResponse<string>>('/api/note/save', {
	method: 'post',
	body
})
