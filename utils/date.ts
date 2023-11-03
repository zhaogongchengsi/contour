export const timeExpired = (time: number) => {
  const now = Date.now();

  return now > time;
};
