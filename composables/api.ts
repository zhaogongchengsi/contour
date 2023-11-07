import { NoteData, UploadInfo } from "~/types";

export const loginApi = (body: UserInfoScheme) =>
  $fetch<AppResponse<AppUserResponse>>("/api/login", {
    method: "post",
    body: body,
  });
export const registerApi = (body: UserInfoScheme) =>
  $fetch<AppResponse<UserInfoScheme>>("/api/register", {
    method: "post",
    body: body,
  });

export const removeFileApi = (name: string, key: string) =>
  $fetch<AppResponse<UploadInfo>>("/api/file/remove", {
    method: "get",
    query: { name, key },
  });

export const getResume = (name: string) =>
  $fetch<AppResponse<Resume>>("/api/resume", {
    method: "get",
    query: { name },
  });

const getToken = (): string => {
  const userinfo = useUserInfo();
  return userinfo.token.value;
};

export const noteSave = (body: NoteData) => {
  const token = getToken();
  return $fetch<AppResponse<string>>("/api/auth/save", {
    method: "post",
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loggedByServer = async (name: string) => {
  const { code } = await $fetch<AppResponse<string>>("/api/logged", {
    method: "get",
    query: { name },
  });
  return Boolean(code);
};

export const logoutByServer = async (name: string) => {
  const token = getToken();
  return $fetch<AppResponse<string>>("/api/auth/logout", {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { name }
  });
};
