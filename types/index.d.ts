

declare module "Nodejs" {
	interface Env {
		mode: "development" | "production";
		APP_BASE: string;
		REDIS_HOST: string;
		REDIS_PORT: string;
		REDIS_PASSWORD: string;
	}
}