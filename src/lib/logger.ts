import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "socialweb.log" }),
  ],
});
