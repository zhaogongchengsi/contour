import { deleteCaptchaId } from "../utils/captcha";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (id) {
    await deleteCaptchaId(id as string);
  }

  return await createCaptcha();
});
