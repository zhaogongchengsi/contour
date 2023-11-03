import { UploadInfo } from "~/types";

export default defineEventHandler(async (event) => {
  const files = (await readMultipartFormData(event)) || [];

  const { sava } = useUpload();
  const urls: UploadInfo[] = [];

  for (const { name, filename, data } of files) {
    const info = await sava(filename!, name!, data);

    urls.push(info);
  }

  return sendSuccess(urls);
});
