import { JWTPayload, SignJWT, importJWK, jwtVerify } from "jose";

const accessToken = process.env.SECRET_KEY;
const refreshToken = process.env.REFRESH_TOKEN;

const accessEncoder = new TextEncoder().encode(accessToken);
const refreshEncoder = new TextEncoder().encode(refreshToken);

interface Payload extends JWTPayload {
  user_id: number;
  role_id?: number;
  role?: string;
}
// Access token
const generateAccessToken = async (payload: Payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(accessEncoder);
};
const verifyAccessToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, accessEncoder);
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null; // Or throw the error if you prefer
  }
};

// Refresh token
const generateRefreshToken = async (payload: Payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(refreshEncoder);
};
const verifyRefreshToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, refreshEncoder);
    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null; // Or throw the error if you prefer
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
