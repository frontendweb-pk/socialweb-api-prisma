// src/types/express-session.d.ts
import { SessionData } from "express-session";

declare module "express-session" {
  interface Session extends SessionData {
    user: {
      email: string;
      role: string;
      user_id: number;
    };
  }
}
