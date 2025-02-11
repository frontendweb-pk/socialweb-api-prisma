import { Request, Response, NextFunction } from "express";
/**
 * Register new user
 * @param req
 * @param res
 * @param next
 */
declare const signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Sign in user
 * @param req
 * @param res
 * @param next
 */
declare const signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const verifyMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { signIn, signUp, verifyMe };
//# sourceMappingURL=auth.d.ts.map