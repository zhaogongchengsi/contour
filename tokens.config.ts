import { defineTheme } from "pinceau";

export default defineTheme({
  media: {
    // @sm
    sm: "(min-width: 640px)",
    // @md
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
  },
  page: {
    header: {
      height: {
        initial: "55px",
        md: "60px",
      },
    },
    footer: {
      height: {
        initial: "55px",
        md: "60px",
      },
    },
    common: {
      defaultMinHeight: "calc(100vh - {page.header.height} - {page.footer.height})",
    },
  },
  color: {
    black: "rgba(18, 18, 18, 1)",
    white: "#ffffff",
  },
  radius: {
    xs: "8px",
    sm: "12px",
  },
  hover: {
    black: "rgba(24, 24, 24, 1)",
  },
  border: {
    primary: "rgba(255, 255, 255, 0.08)",
  },
  background: {
    primary: "rgba(255, 255, 255, 0.03)",
    secondary: "rgba(255, 255, 255, 0.12)",
    tertiary: "rgba(255, 255, 255, 0.24)",
    quaternary: "rgba(255, 255, 255, 0.36)",
    quinary: "rgba(255, 255, 255, 0.48)",
    senary: "rgba(255, 255, 255, 0.60)",
  },
});
