import { lyla } from "lyla";
import type { UploadFileInfo, UploadCustomRequestOptions } from "naive-ui";
import { UploadInfo } from "~/types";

// todo: 上传文件

export interface UploadPictureOptions {
  name: string;
  url: string;
}

export function uploadPicture(
  file: File,
  { url, name }: UploadPictureOptions,
): Promise<UploadInfo[]> {
  const formData = new FormData();
  formData.append(name, file);
  return new Promise((resolve, reject) => {
    lyla
      .post(url, {
        body: formData,
        // headers: {
        // 	"content-type": 'multipart/form-data'
        // }
      })
      .then(({ json }) => {
        const { code, data, message } = json as AppResponse<UploadInfo[]>;
        if (code) {
          resolve(data!);
        } else {
          reject(message);
        }
      })
      .catch(reject);
  });
}

export const customRequest = ({
  file,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formData = new FormData();

  lyla
    .post(action as string, {
      withCredentials,
      headers: headers as Record<string, string>,
      body: formData,
      onUploadProgress: ({ percent }) => {
        onProgress({ percent: Math.ceil(percent) });
      },
    })
    .then(({ json }) => {
      const { code, data, message } = json as AppResponse<UploadInfo[]>;

      if (!code) {
        console.log(message);
        onError();
        return;
      }

      // data && store.setQRCode(data[0])

      onFinish();
    })
    .catch((error) => {
      onError();
    });
};

export const removeFile = async ({
  file,
}: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  const { code, message, data } = await removeFileApi(file.name, "");
  if (!code) {
    // messageApi.error(message)
    return;
  }

  // data && store.removeQRCode(data)
};
