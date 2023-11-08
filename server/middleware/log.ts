export default defineEventHandler((event) => {
  const req = event.node.req;
  // 获取 ip 地址
  const ip = getIp(event);

  const logger = useLogger();

  logger.info(`[${ip}] ${req.method} ${req.url}`);
});
