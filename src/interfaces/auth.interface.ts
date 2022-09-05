import { ObjectId } from "mongoose";
import { Request } from "express";

export interface Auth {
  email: string;
  password: string;
}
export interface User extends Auth {
  id?: string;
  name: string;
  role: "admin" | "user";
  googleId?: string;
  comparePassword(password: string): Promise<boolean>;
}
export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
}
