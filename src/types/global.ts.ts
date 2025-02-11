declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_URL: string;
    APP_NAME: string;
    SECRET_KEY: string;
    REFRESH_TOKEN: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
