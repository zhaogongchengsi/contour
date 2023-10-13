

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

export declare type AvatarUri = `url:${string}` | `text:${string}` | `emoji:${string}`

export declare interface RenderPlaneProps {
	name: string
	background?: string
	color?: string
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
	// 联系方式
	contacts?: ContactInfo[]
}

export declare interface ContactInfo {
	value: string
	type: 'qq' | 'mail' | 'phone'
}

export declare interface UploadInfo {
	name: fileName,
	url: string,
	id: string,
}

export declare interface LinearGradient {
	direction: string,
	colors: string[]
	id: number
}

export declare interface IconInfo {
	label: string;
	name: string;
	image: string;
	background?: string;
}
