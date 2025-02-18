declare namespace Express {
  export interface Request {
    user?: {
      // Make user optional
      user_id: number;
      role_id: number;
      role: string;
    };
  }
}
