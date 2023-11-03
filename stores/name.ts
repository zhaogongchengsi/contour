import { useStorage } from "@vueuse/core";

export const useGlobalName = createGlobalState(() => useStorage("contour-name", ""));
