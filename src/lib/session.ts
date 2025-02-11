import session from "express-session";
import express from "express";

import { config } from "../config";
import { redisStore } from "./redis";

export const sessionStore: express.RequestHandler = session({
  store: redisStore,
  secret: config.secretSecret,
  resave: false,
  saveUninitialized: true,
  name: config.appName,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
});
