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
      defaultMinHeight:
        "calc(100vh - {page.header.height} - {page.footer.height})",
    },
  },
  color: {
    black: "rgba(18, 18, 18, 1)",
    white: "#ffffff",
    primary: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
    gray: {
      50: "#FBFBFB",
      100: "#F6F5F4",
      200: "#ECEBE8",
      300: "#DBD9D3",
      400: "#ADA9A4",
      500: "#97948F",
      600: "#67635D",
      700: "#36332E",
      800: "#201E1B",
      900: "#121110",
    },
    shadow: {
      initial: "{color.gray.400}",
      dark: "{color.gray.800}",
    },
  },
  shadow: {
    xs: "0px 1px 2px 0px {color.shadow}",
    sm: "0px 1px 3px 0px {color.shadow}, 0px 1px 2px -1px {color.shadow}",
    md: "0px 4px 6px -1px {color.shadow}, 0px 2px 4px -2px {color.shadow}",
    lg: "0px 10px 15px -3px {color.shadow}, 0px 4px 6px -4px {color.shadow}",
    xl: "0px 20px 25px -5px {color.shadow}, 0px 8px 10px -6px {color.shadow}",
    "2xl": "0px 25px 50px -12px {color.shadow}",
    none: "0px 0px 0px 0px transparent",
  },
});
