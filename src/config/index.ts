export const config = {
  secretSecret: process.env.SECRET_KEY!,
  appName: process.env.APP_NAME!,
  redisUrl: process.env.REDIS_URL!,
  sessionPrefix: "socialweb:session:",
  refreshTokenPrefix: "socialweb:refreshToken:",
  accessTokenPrefix: "socialweb:accessToken:",
};
