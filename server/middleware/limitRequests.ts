export default defineEventHandler((event) => {
  const req = event.node.req;
  // 获取 ip 地址
  const ip =
    req.socket.remoteAddress || req?.connection?.remoteAddress || getRequestHeader(event, "x-forwarded-for")?.trim();

  const logger = useLogger();

  logger.info(`[${ip}] ${req.method} ${req.url}`);

  if (!import.meta.dev) {
    console.log('fa')
  }
});
