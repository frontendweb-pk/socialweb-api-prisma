declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_URL: string;
    APP_NAME: string;
    SECRET_KEY: string;
  }
}
