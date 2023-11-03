import COS from "cos-nodejs-sdk-v5";

// 地域
export const REGION = "ap-nanjing";

export function useCos() {
  const { SECRETID, SECRETKEY } = process.env;

  // 建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考
  // https://cloud.tencent.com/document/product/598/37140

  return new COS({
    SecretId: SECRETID,
    SecretKey: SECRETKEY,
  });
}

export function useBgCos(): Promise<BgItem[]> {
  const cos = useCos();
  return new Promise((resolve, reject) => {
    cos.getBucket(
      {
        Bucket: "public-bg-1303828986",
        Region: REGION,
      },
      (err, data) => {
        if (err) {
          reject(err);
        }

        // https://public-bg-1303828986.cos.ap-nanjing.myqcloud.com/java.png

        const bgs = data.Contents.map((item) => {
          return {
            // @ts-ignore
            url: `https://${data.Name}.cos.${REGION}.myqcloud.com/${item.Key}`,
            name: item.Key,
            size: item.Size,
          };
        });

        resolve(bgs);
      },
    );
  });
}
