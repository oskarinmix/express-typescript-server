import "dotenv/config";

import MongoDBStore from "connect-mongodb-session";
import UploadRouter from "./routes/upload.routes";
import authRouter from "./routes/auth.routes";
import configurePassport from "./config/passport";
import cors from "cors";
import dbConnection from "./config/database";
import express from "express";
import fileUpload from "express-fileupload";
import itemRouter from "./routes/items.routes";
import logger from "morgan";
import passport from "passport";
import { requestInfo } from "./middleware/reqInfo.middleware";
import session from "express-session";

const PORT = process.env.PORT || 4001;
const app = express();
const storeCreator = MongoDBStore(session);
const store = new storeCreator({
  uri: process.env.MONGO_URI || "",
  collection: "sessions",
});
// Catch errors
store.on("error", function (error: any) {
  console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./files",
  })
);
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.JWT_SECRET || "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: true,
      path: "/",
    },
    name: "cookieSession",
    // unset: "destroy",
    store: store,
  })
);
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use(requestInfo);
app.use("/items", itemRouter);
app.use("/images", UploadRouter);

dbConnection();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
