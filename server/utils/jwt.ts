import jwt from "jsonwebtoken";
import ms from "ms";

/**
 * 颁发令牌
 * @param payload 令牌数据
 * @returns 颁发的令牌对象
 */
export function issueToken(payload: any) {
  const config = useRuntimeConfig();
  const iss = Date.now();
  const exp = iss + ms((config.jwt.exp as string) || "1h");

  const token = jwt.sign(
    {
      exp: exp,
      data: payload,
    },
    config.jwt.key,
    {
      issuer: "contour-app",
    },
  );

  return {
    token,
    exp,
    iss,
  };
}

export function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    const config = useRuntimeConfig();
    jwt.verify(token, config.jwt.key, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

export function readAuthInfo(e: any) {
  return e.context.auth as { uuid: string; id: string };
}
