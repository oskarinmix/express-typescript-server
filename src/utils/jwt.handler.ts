import "dotenv/config";

import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";
const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
export { generateToken, verifyToken };
