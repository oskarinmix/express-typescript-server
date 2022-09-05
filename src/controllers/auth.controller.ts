import { Request, Response } from "express";

import convertUser from "../utils/user.handle";
import { generateToken } from "../utils/jwt.handler";
import { handleError } from "../utils/error.handle";
import passport from "passport";
import { register } from "../services/auth.service";

const loginUser = async (req: any, res: any) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Email or password is incorrect",
        });
      }
      req.logIn(user, (err: any) => {
        if (err) {
          return res.send(err);
        }
        const token = generateToken(convertUser(user));
        return res.status(200).json({ user: convertUser(user), token });
      });
    })(req, res);
  } catch (error) {
    handleError(res, "ERROR_LOGIN_USER", error);
  }
};
const loginWithGoogle = async (req: any, res: any) => {
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
    req.logIn(user, (err: any) => {
      if (err) {
        return res.redirect("/auth/google/failure");
      }
      const token = generateToken(convertUser(user));
      return res.status(200).json({ user: convertUser(user), token });
    });
  })(req, res);
};
const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json(convertUser(user));
  } catch (error) {
    handleError(res, "ERROR_REGISTER_USER", error);
  }
};
const logoutUser = (req: Request, res: Response) => {
  req.logout({ keepSessionInfo: false }, (err: any) => {
    if (err) {
      return res.status(400).json({ message: "Logout failed" });
    }
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(400).json({ message: "Session Destroyed failed" });
      }
      return res.status(200).json({ message: "You Logout successfully" });
    });
  });
};
export { loginUser, registerUser, loginWithGoogle, logoutUser };
