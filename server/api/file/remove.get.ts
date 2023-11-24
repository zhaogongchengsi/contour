export default defineEventHandler(async (event) => {
  const { key, name } = getQuery(event);

  const { remove } = useUpload();

  if (!name || !key) {
    return fail("缺少必要参数");
  }

  try {
    const res = await remove(name as string, key as string);
    return success(res, "删除成功");
  } catch {
    return fail("删除文件失败");
  }
});
