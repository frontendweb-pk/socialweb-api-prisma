import bcrypt from "bcryptjs";

export class Password {
  static async hash(password: string) {
    return await bcrypt.hash(password, 12);
  }
  static async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
