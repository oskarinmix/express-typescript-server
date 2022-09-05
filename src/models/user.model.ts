import { Model, Schema, model } from "mongoose";
import { compare, hash } from "bcryptjs";

import { User } from "../interfaces/auth.interface";

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Invalid role type",
      },
      default: "user",
    },
    googleId: {
      type: String,
      default: "",
    },
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);
UserSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);
  this.email = this.email.toLowerCase();
  next();
});
UserSchema.methods.comparePassword = async function (password: string) {
  return await compare(password, this.password);
};
const UserModel = model("User", UserSchema);
export default UserModel;
