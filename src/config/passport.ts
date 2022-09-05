import "dotenv/config";

import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import UserModel from "../models/user.model";
import convertUser from "../utils/user.handle";

const JWT_SECRET = process.env.JWT_SECRET;
function configurePassport(passport: PassportStatic) {
  // LOCAL STRATEGY
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, convertUser(user), {
          message: "Logged In Successfully",
        });
      }
    )
  );
  // GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:4000/auth/google/callback",
        scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        if (!profile) {
          return done(null, false, { message: "Error Logging with google" });
        }
        const googleUser: any = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile._json.email,
        };
        const user = await UserModel.findOne({ email: googleUser.email });
        if (!user) {
          const newUser = await UserModel.create({
            ...googleUser,
            password: accessToken + refreshToken,
          });
          return done(null, convertUser(newUser), {
            message: "Create and Logged In with Google Successfully",
          });
        }
        return done(null, convertUser(user), {
          message: "Logged In with Google Successfully",
        });
      }
    )
  );
  // passport.use(
  //   new JWTStrategy(
  //     {
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: JWT_SECRET,
  //     },
  //     async (payload, done) => {
  //       try {
  //         const user = await UserModel.findById(payload.sub);
  //         if (!user) {
  //           return done(null, false);
  //         }
  //         done(null, user);
  //       } catch (error) {
  //         done(error, false);
  //       }
  //     }
  //   )
  // );
  // passport.serializeUser(function (user: any, done: any) {
  //   return done(null, user);
  // });
  // passport.deserializeUser(async function (user: any, done: any) {
  //   return done(null, user);
  // });
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done) => {
    UserModel.findById(id, (err: any, user: any) => {
      if (err) {
        done(null, false);
      } else {
        done(null, convertUser(user));
      }
    });
  });
}
export default configurePassport;
