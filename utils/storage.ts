export const setLocalStorage = (key: string, value: string) =>
  window.localStorage.setItem(key, value);
export const getLocalStorage = (key: string) =>
  window.localStorage.getItem(key);

const TOKEN_KEY = "contour-token";
const TOKEN_EXP = "contour-token-exp";

export const setToken = (token: string) => setLocalStorage(TOKEN_KEY, token);
export const getToken = () => getLocalStorage(TOKEN_KEY);
export const setExp = (exp: number) => setLocalStorage(TOKEN_EXP, String(exp));
export const getExp = () => getLocalStorage(TOKEN_EXP);
