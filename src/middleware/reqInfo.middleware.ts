import { NextFunction, Request, Response } from "express";

const requestInfo = (req: Request | any, res: Response, next: NextFunction) => {
  if (req.session && req.user && req.isAuthenticated) {
    console.log("<<***************************>> ");
    console.log("sessionId:>> ", req.sessionID);
    console.log("userId:>> ", req.user.id);
    console.log("userAuthenticated:>> ", true);
    console.log("<<***************************>> ");
  }

  next();
};
export { requestInfo };
