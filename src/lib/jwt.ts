import jsonwebtoken, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthError } from "./errors";

const DEFAULT_OPTIONS: SignOptions = { expiresIn: "1h", algorithm: "RS256" };
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const SECRET_KEY = process.env.SECRET_KEY;
export class Jwt {
  static sign(payload: JwtPayload, options: SignOptions = DEFAULT_OPTIONS) {
    return jsonwebtoken.sign(payload, SECRET_KEY, options);
  }

  static verify(token: string) {
    return jsonwebtoken.verify(token, SECRET_KEY, (error, decode) => {
      if (error) {
        throw new AuthError(error.message);
      }
      return decode;
    });
  }

  static refreshToken() {}
}
