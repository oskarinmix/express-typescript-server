import { ObjectId } from "mongoose";

export interface Car {
  _id?: ObjectId;
  name: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  gas: "gas" | "diesel" | "electric";
}
