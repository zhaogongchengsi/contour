import { User, Card } from "@prisma/client";

declare module "Nodejs" {
  interface Env {
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

export declare type AvatarUri = `url:${string}` | `text:${string}` | `emoji:${string}`;

export declare interface RenderPlaneProps {
  name: string;
  background?: string;
  color?: string;
  description?: string;
  avatar: AvatarUri;
  // 磨砂
  frosted?: boolean;
  // 模糊
  blur?: boolean;
  // 居中
  center?: boolean;
  // 斜体
  ltalic?: boolean;
  // 联系方式
  contacts?: ContactInfo[];
  cards?: CardConfig[];
}

export declare interface ContactInfo {
  value: string;
  type: "qq" | "mail" | "phone";
}

export declare interface UploadInfo {
  name: fileName;
  url: string;
  id: string;
}

export declare interface LinearGradient {
  direction: string;
  colors: string[];
  id: number;
}

export declare interface IconInfo {
  label: string;
  name: string;
  image: string;
  background?: string;
}

export declare type CardSizeString = `${number}-${number}`;

export declare interface CardSize {
  row: number;
  col: number;
}

export declare type CardButtonStyle = "windows" | "android" | "apple";

export declare interface CardConfig {
  id: number;
  icon: IconInfo | undefined;
  size: CardSizeString;
  link: string;
  buttonStyle: CardButtonStyle;
  image: string;
  background: string | LinearGradient;
}

export declare type CardFormValue = Omit<CardConfig, "icon" | "id">;

export declare type NoteData = {
  cards: CardConfig[];
  name: string;
  avatar: AvatarUri;
  cards: CardConfig[];
  color: string;
  background: string;
  styles: CardButtonStyle;
  contacts: ContactInfo[];
};
