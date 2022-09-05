import { Model, Schema, model } from "mongoose";

import { Car } from "../interfaces/car.interface";

const itemSchema = new Schema<Car>(
  {
    name: { type: String, required: [true, "Name is required"] },
    make: { type: String, required: [true, "Make is required"] },
    model: { type: String, required: [true, "Model is required"] },
    year: { type: Number, required: [true, "year is required"] },
    color: { type: String, required: [true, "Color is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    gas: {
      type: String,
      enum: {
        values: ["gas", "diesel", "electric"],
        message: "Invalid gas type",
      },
      required: [true, "Gas type is required"],
    },
  },
  {
    collection: "items",
    timestamps: true,
    versionKey: false,
  }
);

const ItemModel = model("Item", itemSchema);
export default ItemModel;
