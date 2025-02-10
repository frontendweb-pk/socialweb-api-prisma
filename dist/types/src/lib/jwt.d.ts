import { JwtPayload, SignOptions } from "jsonwebtoken";
export declare class Jwt {
    static sign(payload: JwtPayload, options?: SignOptions): string;
    static verify(token: string): void;
}
//# sourceMappingURL=jwt.d.ts.map