import { pbkdf2Sync } from "node:crypto";
import { generateRandomString } from "~/composables/rand";

// 迭代次数
const iterations = 1000;
// 密钥长度
const keySize = 64;

const digest = "sha512";

export type HashedPassword = `${string}.${string}`;

export const encrypt = (password: string): HashedPassword => {
  const salt = generateRandomString();

  const key = pbkdf2Sync(password, salt, iterations, keySize, digest).toString(
    "hex",
  );

  return [key, salt].join(".") as HashedPassword;
};

export const decrypt = (
  password: string,
  hashedPassword: HashedPassword,
): boolean => {
  const [key, salt] = hashedPassword.split(".");

  const hashedInputPassword = pbkdf2Sync(
    password,
    salt,
    iterations,
    keySize,
    digest,
  ).toString("hex");

  return key === hashedInputPassword;
};
