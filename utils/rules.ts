import type { FormRules } from "naive-ui";


export const loginAndSignupRules: FormRules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
  account: [
    {
      required: true,
      validator(_, value) {
        if (!value) {
          return new Error("账号必填");
        } else if (emailReg.test(value) || phoneReg.test(value)) {
          return true;
        }
        return new Error("账号应该为手机号码或者邮箱");
      },
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};