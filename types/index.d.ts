

declare module "Nodejs" {
	interface Env {
		mode: "development" | "production";
		CAPTCHA_INDATE: number;
		APP_BASE: string;
		REDIS_HOST: string;
		REDIS_PORT: string;
		REDIS_PASSWORD: string;
		EMAIL_USER: string
		EMAIL_PASS: string
	}
}

export declare type AvatarUri =  `url:${string}` | `text:${string}` | `emoji:${string}`

export declare interface RenderPlaneProps {
	name: string
	background?: string
	description?: string
	avatar: AvatarUri,
	edit?: boolean
	// 磨砂
	frosted?: boolean
	// 模糊
	blur?: boolean
	// 居中
	center?: boolean
	// 斜体
	ltalic?: boolean
}
