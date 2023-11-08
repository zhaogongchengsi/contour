export default defineEventHandler(() => {
  const logger = useLogger();

  logger.info("Health check");

  return success("ok");
});
