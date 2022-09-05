import { Auth, User } from "../interfaces/auth.interface";

import UserModel from "../models/user.model";
import convertUser from "../utils/user.handle";
import { generateToken } from "../utils/jwt.handler";

const register = async (user: User) => {
  const userExists = await UserModel.findOne({ email: user.email });
  if (userExists) throw new Error("User already exists");
  const newUser = await UserModel.create(user);
  return convertUser(newUser);
};
const login = async ({ email, password }: Auth) => {
  const userExists = await UserModel.findOne({ email: email });
  if (!userExists) throw new Error("Invalid credentials");
  const isValidPassword = await userExists.comparePassword(password);
  if (!isValidPassword) throw new Error("Invalid credentials");
  return generateToken(convertUser(userExists));
};
export { register, login };
