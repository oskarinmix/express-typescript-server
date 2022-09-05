import { Request, Response, Router } from "express";
import {
  loginUser,
  loginWithGoogle,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";

import passport from "passport";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: true,
  })
);
router.get("/google/callback", loginWithGoogle);

router.get("/google/success", (req: Request, res: Response) => {
  res.status(200).json({ message: "Google Login ok" });
});
router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google Login Failed" });
});
// router.get(
//   "/google/callback",
//   passport.authenticate(
//     "google",
//     { failureRedirect: "/login" },
//     (err, user, info) => {
//       console.log("***USER MIDDLEWARE:>> ", user);
//     }
//   ),
//   function (req, res) {
//     console.log("SUCCESS CALLBACK :>> ", req);
//     res.status(200).json({ message: "Google Login ok" });
//   }
// );
export default router;
