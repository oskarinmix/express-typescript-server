import { AuthRequest, AuthUser } from "../interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt.handler";

const checkAuth = (
  req: AuthRequest | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ").pop();
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded: any = verifyToken(token);
    const data: AuthUser = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const checkAuthWithSession = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated() || !req.user) {
    req.session.destroy();
    return res.status(401).json({ message: "NO USER AUTHENTICATED" });
  }
  next();
};

export { checkAuth, checkAuthWithSession };
