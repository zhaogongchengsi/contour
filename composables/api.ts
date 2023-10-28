import { NoteData, UploadInfo } from '~/types'

export const loginApi = (body: UserInfoScheme) => $fetch<AppResponse<AppUserResponse>>('/api/login', { method: 'post', body: body })
export const registerApi = (body: UserInfoScheme) => $fetch<AppResponse<UserInfoScheme>>('/api/register', { method: 'post', body: body })

export const removeFileApi = (name: string, key: string) => $fetch<AppResponse<UploadInfo>>('/api/file/remove', { method: 'get', query: { name, key } })

export const getResume = (name: string) => $fetch<AppResponse<Resume>>('/api/resume', { method: 'get', query: { name } })

export const noteSave = (body: NoteData) => {
	const userinfo = useUserInfo()
	return $fetch<AppResponse<string>>('/api/note/save', {
		method: 'post',
		body,
		headers: {
			'Authorization': `Bearer ${userinfo.token.value}`
		}
	})
}

