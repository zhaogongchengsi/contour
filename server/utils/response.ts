export enum ResponseStatus {
  ERROR,
  SUCCESS,
  WARNING,
  INFO,
}

export const success = <T>(
  data: T,
  message = "操作成功",
  code: ResponseStatus = ResponseStatus.SUCCESS,
): AppResponse<T> => {
  return {
    data,
    message,
    code,
  };
};

export const fail = (message = "操作失败", code: ResponseStatus = ResponseStatus.ERROR): AppResponse<null> => {
  return {
    data: null,
    code,
    message,
  };
};
