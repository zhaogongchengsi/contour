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
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  Switch: {
    railColorActive: "rgba(168,85,247,1)",
  },
  Popover: {
    color: "rgba(18, 18, 18, 1)",
    padding: "0",
    borderRadius: "8px",
  },
  Input: {
    color: "rgba(22, 22, 22, 1)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
};
