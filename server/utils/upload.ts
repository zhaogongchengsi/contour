import { outputFile, remove as removeFile } from "fs-extra";
import { join, parse, normalize } from "pathe";
import { sha256 } from "ohash";
import { UploadInfo } from "~/types";

export function useUpload() {
  const { path, urlPrefix } = useRuntimeConfig().upload as {
    path: string;
    urlPrefix: string;
  };

  const createNewFileName = (fileName: string, key: string) => {
    const { ext, name } = parse(fileName);
    const id = sha256(name);
    const path = join(key, id + ext);
    return {
      id,
      path,
    };
  };

  const contactUrl = (path: string) => {
    return [urlPrefix, normalize(path)].join("/");
  };

  const sava = async (
    fileName: string,
    key: string,
    data: Buffer,
  ): Promise<UploadInfo> => {
    const { path: _path, id } = createNewFileName(fileName, key);
    const url = contactUrl(_path);

    await outputFile(join(path, _path), data);
    return { name: fileName, url, id };
  };

  const remove = async (fileName: string, key: string): Promise<UploadInfo> => {
    const { path: _path, id } = createNewFileName(fileName, key);
    const url = contactUrl(_path);
    return new Promise((res, rej) => {
      removeFile(join(path, _path))
        .then(() => {
          res({ id, url, name: fileName });
        })
        .catch((err) => rej);
    });
  };

  return {
    sava,
    remove,
  };
}
