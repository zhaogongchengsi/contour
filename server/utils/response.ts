export enum ResponseStatus {
  ERROR,
  SUCCESS,
  WARNING,
  INFO,
}

const createResponse = <T>(code: ResponseStatus, message: string, data: T): AppResponse<T> => {
  return {
    code,
    message,
    data,
  };
};

export const success = <T>(
  data: T,
  message = "操作成功",
  code: ResponseStatus = ResponseStatus.SUCCESS,
): AppResponse<T> => {
  return createResponse<T>(code, message, data);
};

export const fail = (message = "操作失败", code: ResponseStatus = ResponseStatus.ERROR): AppResponse<null> => {
  return createResponse<null>(code, message, null);
};
