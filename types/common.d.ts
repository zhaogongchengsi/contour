declare type ButtonStyle = "windows" | "android" | "apple";
declare type ResumeConfig = string;

declare type AvatarUrl = `url:${string}` | `text:${string}` | `emoji:${string}`;
declare type ContactType = "qq" | "mail" | "phone";

// 1-1 row-col
declare type SizeString = `${number}-${number}`;

// 0 封禁 1 未审核 2 通过
declare type ResumeState = 0 | 1 | 3;

// 0: 失败，1: 成功，2: 警告，3: 信息
declare type ResponseStatusCode = 0 | 1 | 2 | 3;

// see assets/icons.json
declare interface IconInfo {
  label: string;
  name: string;
  image: string;
  background?: string;
}

type IconInfoJson = `{"name": ${string}, "image": ${string}, background: ${string}, label: ${string}}`;

declare interface Card {
  buttonStyle: ButtonStyle;
  size: SizeString;
  background: string;
  image: string;
  link: string;
  // 客户端发送到后端 后端将其作为排序标记
  order: number;
}

declare interface ContactInfo {
  value: string;
  type: ContactType;
}

declare interface UploadInfo {
  name: fileName;
  url: string;
  id: string;
}

declare interface LinearGradient {
  direction: string;
  colors: string[];
  id: number;
}

declare interface Resume {
  config: ResumeConfig;
  state: ResumeState;
  // json
  contact: string;
  avatar: AvatarUrl;
  background: string;
  color: string;
  description?: string;
  name: string;
}
