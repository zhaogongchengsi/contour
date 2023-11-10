declare module "Nodejs" {
  declare interface Env {
    mode: "development" | "production";
    CAPTCHA_INDATE: number;

    APP_BASE: string;

    REDIS_HOST: string;
    REDIS_PORT: string;

    REDIS_PASSWORD: string;
	
    EMAIL_USER: string;
    EMAIL_PASS: string;
  }
}
