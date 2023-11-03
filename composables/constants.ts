import { GlobalThemeOverrides } from "naive-ui";

export const editDataProviderKey = Symbol("edit-data-provider-key");

export enum ReportAction {
  duration = "duration",
  number = "number",
  print = "print",
}

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    bodyColor: "rgba(18, 18, 18, 1)",
    primaryColor: "rgba(168,85,247,1)",
    primaryColorHover: "rgba(168,85,247,0.8)",
  },
  Switch: {
    railColorActive: "rgba(168,85,247,1)",
  },
};
