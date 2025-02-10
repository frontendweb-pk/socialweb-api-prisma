import jsonwebtoken, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthError } from "./errors";

const DEFAULT_OPTIONS: SignOptions = {
  expiresIn: "1h",
};

export class Jwt {
  static sign(payload: JwtPayload, options: SignOptions = DEFAULT_OPTIONS) {
    return jsonwebtoken.sign(payload, process.env.SECRET_KEY!, options);
  }

  static verify(token: string) {
    return jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!,
      (error, decode) => {
        if (error) {
          throw new AuthError(error.message);
        }
        return decode;
      }
    );
  }
}
