export const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));
export const generateId = (): number => Math.floor(Math.random() * 10000);

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const minLength = 5;
  const maxLength = 10;
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
