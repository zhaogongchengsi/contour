export const getIp = (event: any) => {
  const req = event.node.req;
  return (
    req.socket.remoteAddress || req?.connection?.remoteAddress || getRequestHeader(event, "x-forwarded-for")?.trim()
  );
};
